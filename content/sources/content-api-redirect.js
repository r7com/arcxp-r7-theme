import signImagesInANSObject from '@code-store-platform/sign-image-in-ans-object'
import signingService from '@code-store-platform/signing-service'
import axios from 'axios'
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_TOKEN_VERSION } from 'fusion:environment'

const params = [
  {
    displayName: '_id',
    name: '_id',
    type: 'text',
  },
  {
    displayName: 'website_url',
    name: 'website_url',
    type: 'text',
  },
  {
    default: '2',
    displayName: 'Themes Version',
    name: 'themes',
    type: 'text',
  },
]

const fetch = ({ _id, 'arc-site': website, website_url: websiteUrl }, { cachedCall }) => {
  const urlSearch = new URLSearchParams({
    ...(_id ? { _id } : { website_url: websiteUrl }),
    ...(website ? { website } : {}),
  })

  return axios({
    url: `${CONTENT_BASE}/content/v4/?${urlSearch.toString()}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
    method: 'GET',
  })
    .then(signImagesInANSObject(cachedCall, signingService.fetch, RESIZER_TOKEN_VERSION))
    .then(({ data }) => data)
    .catch(err => {
      if (err.statusCode === 404 || err.response?.status === 404) {
        const searchParams = new URLSearchParams({
          path: websiteUrl,
          host: website === 'r7' ? `${website}.com` : `${website}.r7.com`,
        })

        // ==== R E Q U E S T ====

        // 1 - validar se o fim da URL contem uma data antes da migração. É importante ter certeza que o 
        // artigo foi criado no Prost para evitar requisições desnecessárias

        // 2 - remover a barra final da url antes de montar a requisição para o Prost. O ARC adiciona essa barra 
        // por padrão:
        // www.r7.com/minha-materia-05022024/ remover barra e ficar assim: www.r7.com/minha-materia-05022024

        // 3 - fazer a requisição para um endpoint (a ser definido. coloca em uma config) adicionando header Host
        // para que o varnish saiba tratar
        
        // 4 - Adiciona API (ainda a ser definido, hoje nao é necessário) para autenticar na CDN

        // exemplo: curl --location 'https://entretenimento.r7.com/economia/banco-central-define-nova-taxa-basica-de-juros-nesta-quarta-feira-31012024' --header 'Host: noticias.r7.com' --header 'Authorization: Bearer MEU-TOKEN-SECRETO'

        // ==== R E S P O N S E ====
        // 200 - entregar exatamente o que for recebido. Não podemos adicionar nenhum HTML extra porque pode
        // esse tipo de resposta é de alguma aplicação legada ou de conteúdo não migrado que já deve ter todo a página
        // pronta a ser entregue

        // 302 - Pode ser um redirect do prost de uma URL antiga ou resolução de uma URL encurtada. Devemos entregar essa 
        // resposta para o usuário sem que haja auteração no payload ou cabeçalhos.

        // 404 - Adicionar o 404 do ARC no lugar do 404 do schumi. Vamos trocar a página para exibir o que quer
        // tenha sido criado na página 404 da migração
        
        // 500 - Entregar a página de erro do ARC no lugar do conteúdo vindo do schumi.
        

        return axios
          .get({
            url: `http://prost-delivery.ir7.com.br/api/resource/published_version?${searchParams.toString()}`,
            headers: {
              'Content-Type': 'application/json',
              'X-R7-APIKEY': 'fb8e85c99b703daf9d1865b0436decc4',
            },
          })
          .then(({ data }) => {
            console.log('nested', data.media)
            return data
          })
          .catch(err => {
            console.log('Nested Error', err)
            return err
          })
      }
    })
}

export default {
  fetch,
  params,
  ttl: 120,
}
