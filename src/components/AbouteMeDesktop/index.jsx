'use client'

import {motion} from 'framer-motion'

export default function AbouteMeDesktop() {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3}}
        >
            <p className='hidden lg:flex lg:mt-8 lg:text-zinc-400 lg:font-sans lg:text-xl lg:leading-loose'>
                With more than three years of experience transforming ideas
                into digital solutions, I am a software developer with a deep
                enthusiasm for the IT world. My experience covers full-stack
                web development with React and Node.js, creating high-quality
                web applications focused on design and performance. In recent
                months, I have focused on implementing AI-related services such
                as Microsoft Azure AI, GoAPI, Midjourney, Clipdrop, ChatGPT,
                ElevenLabs, and Eden AI.
            </p>
        </motion.div>
    )
}
