import React from 'react'
import { CardCoupon } from '@r7/ui-card'
import { useContent } from 'fusion:content'
import { Typography, ConditionalLink } from '@r7/ui-base-components'
import { useFusionContext } from 'fusion:context'

const CardCouponBlock = () => {
  const { globalContent } = useFusionContext()
  const siteId = globalContent?.canonical_website
  const sectionId = globalContent?.taxonomy?.primary_section?._id

  if (!sectionId && !siteId) return

  const sectionContent = useContent({
    source: 'custom-site-service-hierarchy',
    query: { sectionId, siteId },
  })

  const category = sectionContent?.site?.coupon_categories

  if (!category) return <div>Nenhuma categoria selecionada para cupons</div>

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

CardCouponBlock.label = 'Cupons - R7 Block'

export default CardCouponBlock
