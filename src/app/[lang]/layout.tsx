import type { ReactNode } from 'react'

import { Geist_Mono, Merriweather, Outfit, Kaushan_Script } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'

import { cn } from '@/lib/utils'

import '../globals.css'

const outfitSans = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin']
})

const merriweatherSerif = Merriweather({
  variable: '--font-merriweather-serif',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const kaushanScript = Kaushan_Script({
  weight: '400',
  variable: '--font-kaushan-script',
  subsets: ['latin']
})

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const { t } = await getTranslation(lang)

  return {
    manifest: '/manifest.json',
    title: {
      template: `%s - ${t('title')} | Shadcn Studio`,
      default: `${t('title')} - Restaurant Landing Page | Shadcn Studio`
    },
    description: t('description'),
    robots: 'index,follow',
    keywords: ['Restaurant', 'Dining', 'Food'],
    icons: {
      icon: [
        {
          url: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          url: '/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          url: '/favicon/favicon.ico',
          sizes: '48x48',
          type: 'image/x-icon'
        }
      ],
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ],
      other: [
        {
          url: '/favicon/android-chrome-192x192.png',
          rel: 'icon',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          url: '/favicon/android-chrome-512x512.png',
          rel: 'icon',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`),
    openGraph: {
      title: {
        template: `%s - ${t('title')} | Shadcn Studio`,
        default: `${t('title')} - Restaurant Landing Page | Shadcn Studio`
      },
      description: t('description'),
      type: 'website',
      siteName: t('title'),
      url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`,
      images: [
        {
          url: '/images/og-image.png',
          type: 'image/png',
          width: 1200,
          height: 630,
          alt: 'Template Slogan'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        template: `%s - ${t('title')} | Shadcn Studio`,
        default: `${t('title')} - Restaurant Landing Page | Shadcn Studio`
      },
      description: t('description')
    },
    alternates: {
      canonical: '/'
    }
  }
}

import { languages } from '@/lib/i18n/settings'

export async function generateStaticParams() {
  return languages.map(lang => ({ lang }))
}

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { navigationData } from '@/assets/data/header'

import { getTranslation } from '@/lib/i18n'

const RootLayout = async ({
  children,
  params
}: Readonly<{
  children: ReactNode
  params: Promise<{ lang: string }>
}>) => {
  const { lang } = await params
  const { t } = await getTranslation(lang)

  const translatedNavigationData = navigationData.map(item => ({
    ...item,
    title: t(`nav_${item.title.toLowerCase().replace(/\s+/g, '_')}`)
  }))

  return (
    <html
      lang={lang}
      className={cn(
        outfitSans.variable,
        merriweatherSerif.variable,
        geistMono.variable,
        kaushanScript.variable,
        'flex min-h-full w-full scroll-smooth antialiased'
      )}
      suppressHydrationWarning
    >
      <body className='flex min-h-full w-full flex-auto flex-col'>
        <ThemeProvider attribute='class' enableSystem={false} disableTransitionOnChange>
          <div className='flex flex-col'>
            {/* Header Section */}
            <Header navigationData={translatedNavigationData} currentLang={lang} />

            {/* Main Content */}
            <main className='flex flex-col pt-17.5 *:scroll-mt-16'>{children}</main>

            {/* Footer Section */}
            <Footer lng={lang} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
