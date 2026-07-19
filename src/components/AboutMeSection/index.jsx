'use client'

import {motion} from 'framer-motion'
import Title from '../Title'

export default function AboutMe() {
    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
                className='lg:hidden'
            >
                <Title section={'About Me'} />
                {/* // remember this section exist the mobile and desktop version */}
                <p className='text-zinc-400 font-sans mt-4 leading-8 md:text-xl md:leading-relaxed'>
                    With more than three years of experience transforming ideas
                    into digital solutions, I am a software developer with a
                    deep enthusiasm for the IT world. My experience covers
                    full-stack web development with React and Node.js, creating
                    high-quality web applications focused on design and
                    performance. In recent months, I have focused on
                    implementing AI-related services such as Microsoft Azure
                    AI, GoAPI, Midjourney, Clipdrop, ChatGPT, ElevenLabs, and
                    Eden AI.
                </p>
            </motion.div>
        </>
    )
}
