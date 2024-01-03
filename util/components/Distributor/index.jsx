import './index.scss'
import React from 'react'
import { DISTRIBUTORS } from './constants/distributors'
import { formatDate } from './helper/formatDate'

export const Distributor = ({ publishDate, storyDistributor }) => {
  const distributorData = DISTRIBUTORS.find(
    distributor => storyDistributor?.name.toLowerCase() === distributor.agency_name.toLowerCase(),
  )

  return (
    <div className="distributor">
      {distributorData ? (
        <>
          <a
            className="distributor__link"
            href={distributorData.agency_url}
            target="_blank"
            rel="noreferrer"
          >
            <img src={distributorData.agency_image} alt={distributorData.agency_name} />
            <span>{distributorData.agency_name}</span>
          </a>
          <span>/</span>
        </>
      ) : null}

      <time className="distributor__time" dateTime={publishDate}>
        {formatDate(publishDate)}
      </time>
    </div>
  )
}
