import HeroSectionPage from '@/components/blocks/hero-section/hero-section'
import PopularDishes from '@/components/blocks/popular-dishes/popular-dishes'
import AboutUs from '@/components/blocks/about-us-section/about-us-page'
import Testimonials from '@/components/blocks/testimonials-section/testimonials-section'
import NewItems from '@/components/blocks/new-items-section/new-items'
import ContactUs from '@/components/blocks/contact-us-section/contact-us-page'
import Offers from '@/components/blocks/offers-section/offers-section'

import { menudata } from '@/assets/data/hero'
import { popularDishes } from '@/assets/data/popular-dishes'
import { stats } from '@/assets/data/about-us'
import { testimonials } from '@/assets/data/testimonials'
import { newItems } from '@/assets/data/new-items'
import { contactInfo } from '@/assets/data/contact-us'
import { GalleryImage } from '@/assets/data/offers'

import { getTranslation } from '@/lib/i18n'

const Home = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const { t } = await getTranslation(lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#website`,
        name: t('title'),
        description: t('description'),
        url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        inLanguage: lang === 'en' ? 'en-US' : 'fr-FR'
      }
    ]
  }

  return (
    <>
      <HeroSectionPage menudata={menudata} lng={lang} />
      <PopularDishes popularDishes={popularDishes} lng={lang} />
      <AboutUs stats={stats} lng={lang} />
      <Testimonials testimonials={testimonials} lng={lang} />
      <NewItems newItems={newItems} lng={lang} />
      <ContactUs contactInfo={contactInfo} lng={lang} />
      <Offers galleryImage={GalleryImage} lng={lang} />
      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default Home
