'use client'

import {motion} from 'framer-motion'
import DownloadCv from '../DownloadCv'
import Githublogo from '../Logos/Githublogo'

export default function SectionCvDesktop() {
    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3 }}
                className='absolute top-0 left-24 md:top-12 md:left-[22rem] lg:flex lg:m-auto lg:justify-center lg:gap-8 lg:mt-[32rem] xl:left-1/2 xl:-translate-x-1/2 xl:item-center'
            >
                <DownloadCv />
                <a
                    className='hidden sm:hidden md:hidden lg:flex lg:items-center w-40px h-40px'
                    href='https://github.com/Pleo2'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='GitHub profile'
                >
                    <Githublogo width='40px' height='40px' fill='white' />
                </a>
            </motion.div>
        </>
    )
}
