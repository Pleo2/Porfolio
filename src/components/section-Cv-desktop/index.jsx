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
                className='absolute inset-x-0 top-[16.25rem] z-20 flex items-center justify-center gap-3 md:top-[17.5rem] lg:top-[17.5rem] lg:gap-8'
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
