import Link from 'next/dist/client/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { getTranslation } from '@/lib/i18n'

type GalleryImage = {
  src: string
  alt: string
  className?: string
  offerText: {
    text: string
    className?: string
  }
  offerButton: {
    text: string
    link: string
    className?: string
  }
}[]

const Gallery = async ({ galleryImage, lng }: { galleryImage: GalleryImage; lng: string }) => {
  const { t } = await getTranslation(lng)

  return (
    <section id='offers' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            {t('offers_section.badge')}
          </Badge>

          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{t('offers_section.title')}</h2>

          <p className='text-muted-foreground text-xl'>{t('offers_section.description')}</p>
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          {galleryImage.map((image, index) => (
            <div key={index} className={cn('group relative overflow-hidden rounded-lg', image.className)}>
              <img
                src={image.src}
                alt={image.alt}
                className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
              />

              {image.offerText && (
                <div className={cn('absolute', image.offerText.className)}>
                  <p className='font-(family-name:--font-kaushan-script) text-lg text-white md:text-xl lg:text-2xl xl:text-3xl'>
                    {t(`offers_section.items.${index}.text`)}
                  </p>
                </div>
              )}

              {image.offerButton && (
                <div className={cn('absolute', image.offerButton.className)}>
                  <Button
                    size='lg'
                    asChild
                    className={cn(
                      'relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 group-hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 max-lg:px-3 max-sm:px-2.5 max-sm:text-sm dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
                    )}
                  >
                    <Link href='#'>{t(`offers_section.items.${index}.button`)}</Link>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
