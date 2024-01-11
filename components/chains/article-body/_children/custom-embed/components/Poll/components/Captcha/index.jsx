import React from 'react'

export const Captcha = ({ className }) => {
  return (
    <div className={`${className}-grecaptcha-container`}>
      <div className={`${className}-grecaptcha`}>
        <div className={`${className}-grecaptcha__left`}>
          <div className={`${className}-grecaptcha__left-image`}></div>
          <p className={`${className}-grecaptcha__left-links`}>
            <a
              href="https://www.google.com/intl/en/policies/privacy/"
              target="_blank"
              rel="noreferrer"
            >
              Privacy
            </a>
            <span> - </span>
            <a
              href="https://www.google.com/intl/en/policies/terms/"
              target="_blank"
              rel="noreferrer"
            >
              Terms
            </a>
          </p>
        </div>
        <div className={`${className}-grecaptcha__right`}>
          <p className={`${className}-grecaptcha__right-title`}>
            protected by <strong>reCAPTCHA</strong>
          </p>
          <p className={`${className}-grecaptcha__right-links`}>
            <a
              href="https://www.google.com/intl/en/policies/privacy/"
              target="_blank"
              rel="noreferrer"
            >
              Privacy
            </a>
            <span> - </span>
            <a
              href="https://www.google.com/intl/en/policies/terms/"
              target="_blank"
              rel="noreferrer"
            >
              Terms
            </a>
          </p>
        </div>
      </div>
      <div id="grecaptcha-container"></div>
    </div>
  )
}
