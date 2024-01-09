import React, { useEffect, useState } from 'react'
import { CardCoupon } from '@r7/ui-card'
import { Typography, ConditionalLink } from '@r7/ui-base-components'
import PropTypes from '@arc-fusion/prop-types'

const CardCouponBlock = ({ customFields }) => {
  const [data, setData] = useState([])
  const { category } = customFields

  useEffect(async () => {
    const response = await fetch(
      `https://cms-coupons-api-qa.ir7.com.br/v1/shops?categories=${category}`,
    )
    const couponData = await response.json()
    setData(couponData)
  }, [category])

  return (
    <CardCoupon>
      <Typography primaryTitle as="span">
        r7 Cupons
      </Typography>
      <CardCoupon.List>
        {data.length > 0 &&
          data.map(({ id, name, url, logo, best_offer_text, anchor_text }) => (
            <CardCoupon.Item key={id}>
              <ConditionalLink target="_blank" title={anchor_text} href={url}>
                <CardCoupon.Content>
                  <img
                    className="card-mr-xxxs card-rounded-md card-h-lg card-w-lg"
                    src={logo}
                    alt={anchor_text}
                    loading="lazy"
                    height={58}
                    width={58}
                  />
                  <div>
                    <Typography className="uppercase" fontSize="little" color="neutralLow">
                      {name}
                    </Typography>
                    <Typography fontSize="xxxs" fontWeight="bold">
                      {best_offer_text}
                    </Typography>
                  </div>
                </CardCoupon.Content>
              </ConditionalLink>
            </CardCoupon.Item>
          ))}
      </CardCoupon.List>
    </CardCoupon>
  )
}

CardCouponBlock.propTypes = {
  customFields: PropTypes.shape({
    category: PropTypes.oneOf([
      'tecnologia',
      'moda',
      'beleza-e-saude',
      'departamento',
      'esportes',
      'viagens',
    ]).tag({
      group: 'Configure Coupon Content',
      label: 'Categorias',
      defaultValue: 'departamento',
    }),
  }),
}

CardCouponBlock.label = 'Card Coupon - R7 Block'

export default CardCouponBlock
