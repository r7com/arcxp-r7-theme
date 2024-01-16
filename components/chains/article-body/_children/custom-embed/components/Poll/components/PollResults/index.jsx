import React from 'react'
import { Title } from './Title'
import { Option } from './Option'
import { SocialShare } from '@r7/ui-article-delivery'

export const PollResults = ({ className, voted, options, setShowResults }) => {
  const totalVotesAmount = options.reduce((sum, option) => (sum += option.votes), 0)
  return (
    <div className={`${className}-content-results`}>
      <Title voted={voted} className={`${className}-content-results-title`} />
      <div className={`${className}-content-results-share`}>
        <SocialShare>
          <SocialShare.List>
            <SocialShare.Item name="googleNews" link="#googlenews" title="google-news" />
            <SocialShare.Item name="facebook" link="#facebook" title="facebook" />
            <SocialShare.Item name="twitter" link="#twitter" title="twitter" />
            <SocialShare.Item name="whatsapp" link="#whatsapp" title="whatsapp" />
            <SocialShare.Item name="share" link="#share" title="share" />
          </SocialShare.List>
        </SocialShare>
      </div>
      <ul className={`${className}-content-results-options`}>
        {options.map(option => (
          <Option
            key={`results-${option._id}`}
            className={`${className}-content-results-option`}
            optionText={option.text}
            optionVotesPercentage={((option.votes / totalVotesAmount) * 100).toFixed(2)}
          />
        ))}
      </ul>
      <p className={`${className}-content-results-total`}>Total de {totalVotesAmount} votos</p>
      <div className={`${className}-content-results-btns`}>
        <button
          onClick={() => {
            setShowResults(false)
          }}
        >
          {voted ? 'Votar Novamente' : 'Voltar para as alternativas'}
        </button>
      </div>
    </div>
  )
}
