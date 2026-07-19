import './globals.css'
import Header from '@/components/Header/Header'
import {Inter} from 'next/font/google'
import localFont from 'next/font/local'
import {SpeedInsights} from '@vercel/speed-insights/next'
import Particles from '@/components/Particles'
import Slider from '@/components/Slider'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-inter',
})
const calSans = localFont({
    src: '../../public/CalSans-SemiBold.woff2',
    variable: '--font-calSans',
})

export const metadata = {
    title: 'Pleo2 Portfolio',
    description: 'My personal Portfolio Web developer',
}

export default function RootLayout({children}) {
    return (
        <html lang='en' className={`${calSans.variable} ${inter.variable}`}>
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
                <SpeedInsights />
            </body>
        </html>
    )
}
