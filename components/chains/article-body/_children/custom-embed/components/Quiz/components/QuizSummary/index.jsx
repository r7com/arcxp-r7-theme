import React from 'react'
import { SocialShare } from '@r7/ui-article-delivery'

export const QuizSummary = ({ className, primaryColor, result, reset, urlForShare }) => {
  const { title, text, image_url } = result
  return (
    <div className={className} style={{ borderLeft: `12px solid ${primaryColor}` }}>
      {image_url ? <img className={`${className}-image`} src={image_url} alt={title} /> : null}
      <h3 className={`${className}-title`}>{title}</h3>
      <div className={`${className}-share`}>
        <SocialShare>
          <SocialShare.List>
            <SocialShare.Item
              name="googleNews"
              link={urlForShare}
              title="google-news"
              position="quiz"
            />
            <SocialShare.Item name="facebook" link={urlForShare} title="facebook" position="quiz" />
            <SocialShare.Item name="twitter" link={urlForShare} title="twitter" position="quiz" />
            <SocialShare.Item name="whatsapp" link={urlForShare} title="whatsapp" position="quiz" />
            <SocialShare.Item name="linkedin" link={urlForShare} title="linkedin" position="quiz" />
            <SocialShare.Item name="share" link={urlForShare} title="share" position="quiz" />
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
