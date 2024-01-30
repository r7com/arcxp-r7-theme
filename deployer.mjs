import axios from 'axios'
import { exec } from 'child_process'
import 'dotenv/config'
import FormData from 'form-data'
import fs from 'fs'
// import { uid } from 'uid/secure'
import util from 'util'
import path from 'path';
const execPromisified = util.promisify(exec)
const readDirPromisified = util.promisify(fs.readdir)
const { ARC_ACCESS_TOKEN, CONTENT_BASE } = process.env

deploy()
async function getUploadMetadata(fileName) {
  return axios.get(
    `${CONTENT_BASE}/themesettings/api/presigned-bundle-upload?name=${fileName}&fileType=application%2Fzip`,
    {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    },
  )
}
async function buildFormData(fields, fileName) {
  if (!fs.existsSync(`./dist/${fileName}`)) {
    throw new Error(`Bundle ${fileName} does not exist`)
  }
  const form = new FormData()
  Object.entries(fields).forEach(([key, value]) => {
    form.append(key, value)
  })
  console.log()
  form.append('file', fs.createReadStream(`./dist/${fileName}`))
  return form
}
async function uploadFile(url, form) {
  return axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
      'Content-Length': await util.promisify(form.getLength.bind(form))(),
    },
  })
}
async function deploy() {
  const rootDir = process.cwd();
  console.log('rootDir', rootDir);

// Read the contents of the root directory
const filesAndFolders = fs.readdirSync(rootDir);

// Print each file and folder
filesAndFolders.forEach(item => {
  // Construct the full path
  const fullPath = path.join(rootDir, item);

  // Check if it's a file or a directory
  const type = fs.statSync(fullPath).isDirectory() ? 'Directory' : 'File';

  // Print the result
  console.log(`${item} (${type})`);
});
  try {
    try {
      if (!fs.existsSync('./dist')) {
        fs.mkdirSync('./dist')
        console.log(`Folder './dist' created successfully.`)
      }
      console.log('Create bundle: start')
      const { stdout, stderr } = await execPromisified(`npx fusion zip --force`)
      console.log('Create bundle: result', { stdout, stderr })
    } catch (err) {
      console.error('Create bundle: error', err)
      throw new Error(err)
    }
    // get created file name
    const getFileName = fs.readdirSync('./dist')[0]
    console.log('getFileName', fs.readdirSync('./dist'));

    // Parse command line arguments
    const argv = process.argv.slice(2)
    const getNameParam = argv.find(el => el.includes('-name='))
    console.log('getNameParam',getNameParam);
    const customName = getNameParam ? getNameParam.split('=')[1] : ''
    console.log('customName',customName);

    // rename file
    // const [fileName, extension] = getFileName.split('.')
    // const newName = customName ? `${fileName}-${customName}.${extension}` : getFileName
    const newName =  getFileName
    // fs.renameSync(`./dist/${getFileName}`, `./dist/${newName}`)

    // get renamed fileName
    const getRenamedFileName = fs.readdirSync('./dist')[0]

    const { status: apiStatus, data: apiData } = await getUploadMetadata(getRenamedFileName)
    console.log('apiData', apiData)
    console.log(`API reponse status: ${apiStatus}`)
    const form = await buildFormData(apiData.fields, getRenamedFileName)
    const { status: s3Status } = await uploadFile(apiData.url, form)

    fs.unlinkSync(`./dist/${getRenamedFileName}`);
    console.log(`S3 upload complete: status code ${s3Status}`)
  } catch (err) {
    if (err.isAxiosError && err.response.status) {
      console.error(
        `Request failed with status ${err.response.status} $
{err.response.statusText}: ${err.response.data}`,
      )
    } else {
      console.error('Deploy error', err.message)
    }
    throw new Error(err)
  }
}
