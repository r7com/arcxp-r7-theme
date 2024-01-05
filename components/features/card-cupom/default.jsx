import React, { useEffect } from 'react'
import { ARC_ACCESS_TOKEN } from 'fusion:environment'
import { CardCupom } from '@r7/ui-card'
import { useContent } from 'fusion:content'
import axios from 'axios'
import { Typography, ConditionalLink } from '@r7/ui-base-components'
import PropTypes from '@arc-fusion/prop-types'
// import { useContent } from 'fusion:content'

const CardCupomBlock = ({ customFields }) => {
  const { category } = customFields

  const cupomData = useContent({
    source: 'cupom-api',
    query: { _id: 's' },
  })

  console.log(category)
  console.log(cupomData)
  useEffect(async () => {
    const result = await axios({
      url: `https://cms-coupons-api-qa.ir7.com.br/v1/shops?categories=moda`,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
      method: 'GET',
    })
    console.log(result)
  }, [])

  return (
    <CardCupom>
      <Typography primaryTitle as="span">
        r7 Cupons
      </Typography>
      <CardCupom.List>
        <CardCupom.Item>
          <ConditionalLink href="link">
            <CardCupom.Content>R7 Cupons</CardCupom.Content>
          </ConditionalLink>
        </CardCupom.Item>
      </CardCupom.List>
    </CardCupom>
  )
}

CardCupomBlock.propTypes = {
  customFields: PropTypes.shape({
    category: PropTypes.oneOf([
      'tecnologia',
      'moda',
      'beleza-e-saude',
      'departamento',
      'esportes',
      'viagens',
    ]).tag({
      group: 'Configure Cupom Content',
      label: 'Categosrias',
      defaultValue: 'departamento',
    }),
  }),
}

CardCupomBlock.label = 'Card Cupom - R7 Block'

export default CardCupomBlock
