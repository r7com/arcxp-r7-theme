import { SocialShare } from '@r7/ui-article-delivery'
import React from 'react'

export const QuizSummary = ({ className, title }) => {
  return (
    <div className={className}>
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
      <p className={`${className}-descr`}>
        Obrigado (a) por sua participação, logo teremos mais perguntas que desafiaram seus
        conhecimentos.
      </p>
      <button className={`${className}-btn`}>Refazer o Quiz</button>
    </div>
  )
}
