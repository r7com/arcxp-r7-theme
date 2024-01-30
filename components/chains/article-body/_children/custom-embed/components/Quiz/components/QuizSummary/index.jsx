import React from 'react'
import { SocialShare } from '@r7/ui-article-delivery'

export const QuizSummary = ({ className, primaryColor, result, reset }) => {
  const { title, text, image_url } = result
  return (
    <div className={className} style={{ borderLeft: `12px solid ${primaryColor}` }}>
      {image_url ? <img className={`${className}-image`} src={image_url} alt={title} /> : null}
      <h3 className={`${className}-title`}>{title}</h3>
      <div className={`${className}-share`}>
        <SocialShare>
          <SocialShare.List>
            <SocialShare.Item name="googleNews" link="#googlenews" title="google-news" />
            <SocialShare.Item name="facebook" link="#facebook" title="facebook" />
            <SocialShare.Item name="twitter" link="#twitter" title="twitter" />
            <SocialShare.Item name="whatsapp" link="#whatsapp" title="whatsapp" />
            <SocialShare.Item name="linkedin" link="#linkedin" title="linkedin" />
            <SocialShare.Item name="share" link="#share" title="share" />
          </SocialShare.List>
        </SocialShare>
      </div>
      <p className={`${className}-descr`}>{text}</p>
      <button
        className={`${className}-btn`}
        style={{ backgroundColor: primaryColor }}
        onClick={reset}
      >
        Refazer o Quiz
      </button>
    </div>
  )
}
