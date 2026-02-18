import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

import { getTranslation } from '@/lib/i18n'

type PopularDish = {
  image: string
  alt: string
  name: string
  type: string
  description: string
}[]

const PopularDishes = async ({ popularDishes, lng }: { popularDishes: PopularDish; lng: string }) => {
  const { t } = await getTranslation(lng)

  return (
    <section id='popular-dishes' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            {t('popular_dishes_section.badge')}
          </Badge>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{t('popular_dishes_section.title')}</h2>
          <p className='text-muted-foreground text-xl'>{t('popular_dishes_section.description')}</p>
        </div>

        {/* Dishes */}
        <div className='grid gap-6 md:grid-cols-2 lg:gap-y-10 xl:grid-cols-4'>
          {popularDishes.map((member, index) => (
            <Card
              key={index}
              className='hover:border-primary overflow-hidden rounded-none py-0 shadow-none transition-colors duration-300'
            >
              <CardContent className='px-0'>
                <div className='bg-muted'>
                  <img src={member.image} alt={member.alt} className='h-auto w-full' />
                </div>
                <div className='space-y-3 px-6 py-5'>
                  <CardTitle className='text-lg'>{t(`popular_dishes_section.items.${index}.name`)}</CardTitle>
                  <Separator />
                  <div className='text-muted-foreground'>
                    <p className='mb-1 text-base font-medium'>{t(`popular_dishes_section.items.${index}.type`)}</p>
                    <p>{t(`popular_dishes_section.items.${index}.description`)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularDishes
