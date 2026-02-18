import { ArrowRightIcon } from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card'

import { getTranslation } from '@/lib/i18n'

type NewItem = {
  img: string
  alt: string
  title: string
  description: string
  blogLink: string
}[]

const NewItems = async ({ newItems, lng }: { newItems: NewItem; lng: string }) => {
  const { t } = await getTranslation(lng)

  return (
    <section id='new-items' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            {t('new_items_section.badge')}
          </Badge>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{t('new_items_section.title')}</h2>
          <p className='text-muted-foreground text-xl'>{t('new_items_section.description')}</p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {newItems.map((item, index) => (
            <Card
              className='hover:border-primary rounded-none pt-0 shadow-none transition-colors duration-300 max-lg:last:col-span-full'
              key={index}
            >
              <CardContent className='px-0'>
                <img src={item.img} alt={item.alt} className='aspect-video h-60 w-full object-cover' />
              </CardContent>
              <CardHeader className='mb-2 gap-3'>
                <CardTitle className='text-xl'>
                  <Link href='#'>{t(`new_items_section.items.${index}.title`)}</Link>
                </CardTitle>
                <CardDescription className='text-base'>
                  {t(`new_items_section.items.${index}.description`)}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className='group bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm has-[>svg]:px-6'
                  size='lg'
                  asChild
                >
                  <Link href={item.blogLink}>
                    {t('new_items_section.full_menu')}
                    <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewItems
