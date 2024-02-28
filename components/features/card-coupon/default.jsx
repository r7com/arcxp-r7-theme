import React from 'react'
import { CardCoupon } from '@r7/ui-card'
import { useContent } from 'fusion:content'
import { Typography, ConditionalLink } from '@r7/ui-base-components'
import PropTypes from '@arc-fusion/prop-types'

const CardCouponBlock = ({ customFields }) => {
  const { category } = customFields

  const data = useContent({
    source: 'coupon-api',
    query: { category },
  })

  return (
    <CardCoupon>
      <Typography primaryTitle as="span">
        r7 Cupons
      </Typography>
      <CardCoupon.List>
        {data?.length > 0 &&
          data?.map(({ id, name, url, logo, best_offer_text, anchor_text }) => (
            <CardCoupon.Item key={id}>
              <ConditionalLink target="_blank" title={anchor_text} href={url}>
                <CardCoupon.Content>
                  <CardCoupon.Image logo={logo} alt={anchor_text} />
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

CardCouponBlock.label = 'Cupons - R7 Block'

export default CardCouponBlock
