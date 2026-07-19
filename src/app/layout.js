import './globals.css'
import Header from '@/components/Header/Header'
import {Inter, JetBrains_Mono as JetBrainsMono} from 'next/font/google'
import localFont from 'next/font/local'
import {SpeedInsights} from '@vercel/speed-insights/next'
import Particles from '@/components/Particles'
import Slider from '@/components/Slider'
import SiteFooter from '@/components/SiteFooter'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-inter',
})
const calSans = localFont({
    src: '../../public/CalSans-SemiBold.woff2',
    variable: '--font-calSans',
})
const jetBrainsMono = JetBrainsMono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
})

export const metadata = {
    title: 'José Moreno — Full-Stack Engineer & CTO',
    description: 'Full-stack engineer building secure, scalable SaaS, payment and E-commerce products with Next.js, NestJS and modern cloud infrastructure.',
}

export default function RootLayout({children}) {
    return (
        <html lang='en' className={`${calSans.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
            <head>
                <link rel='icon' href='/icon.svg' />
            </head>
            <body>
                <Header />
                <Particles />
                <main className='relative z-10 flex h-max flex-col overflow-x-hidden'>
                    <Slider />
                    <section className='flex flex-col justify-center w-[310px] m-auto md:w-[600px] lg:w-[900px]'>
                        {children}
                    </section>
                </main>
                <SiteFooter />
                <SpeedInsights />
            </body>
        </html>
    )
}
