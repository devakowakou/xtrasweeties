import type { ComponentType } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import { getTranslation } from '@/lib/i18n'

type ContactInfo = {
  title: string
  icon: ComponentType
  description: string
}[]

const ContactUs = async ({ contactInfo, lng }: { contactInfo: ContactInfo; lng: string }) => {
  const { t } = await getTranslation(lng)

  return (
    <section
      id='contact-us'
      className='before:bg-muted relative py-8 before:absolute before:inset-0 before:-z-10 before:skew-y-3 sm:py-16 lg:py-24'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            {t('contact_us_section.badge')}
          </Badge>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{t('contact_us_section.title')}</h2>
          <p className='text-muted-foreground text-xl'>{t('contact_us_section.description')}</p>
        </div>

        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <img
            src='/images/contact-us-01.webp'
            alt='Contact illustration'
            className='size-full object-cover max-lg:max-h-70'
          />

          <div>
            <h3 className='mb-2 text-2xl'>{t('contact_us_section.sub_title')}</h3>
            <p className='text-muted-foreground mb-10 text-lg'>{t('contact_us_section.sub_description')}</p>

            {/* Contact Info Grid */}
            <div className='grid gap-6 sm:grid-cols-2'>
              {contactInfo.map((info, index) => (
                <Card
                  className='bg-background hover:border-primary rounded-none shadow-none transition-colors duration-300'
                  key={index}
                >
                  <CardContent className='flex flex-col items-center gap-4 text-center'>
                    <Avatar className='size-9 border'>
                      <AvatarFallback className='bg-transparent [&>svg]:size-5'>
                        <info.icon />
                      </AvatarFallback>
                    </Avatar>
                    <div className='space-y-3'>
                      <h4 className='text-lg font-semibold'>
                        {t(`contact_us_section.info.${['hours', 'address', 'email', 'phone'][index]}.title`)}
                      </h4>
                      <div className='text-muted-foreground text-base font-medium'>
                        {(
                          t(`contact_us_section.info.${['hours', 'address', 'email', 'phone'][index]}.description`) ||
                          info.description
                        )
                          .split('\n')
                          .map((line: string, idx: number) => (
                            <p key={idx}>{line}</p>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
