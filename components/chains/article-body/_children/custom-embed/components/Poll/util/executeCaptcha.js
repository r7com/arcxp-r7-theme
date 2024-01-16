/* eslint-disable no-undef*/
import { GOOGLE_RECAPTCHA_APIKEY } from 'fusion:environment'

export const executeCaptcha = cb => {
  grecaptcha.ready(function () {
    grecaptcha.execute(GOOGLE_RECAPTCHA_APIKEY, { action: 'submit' }).then(cb)
  })
}
