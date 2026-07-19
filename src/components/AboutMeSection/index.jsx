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
                    I&apos;m a full-stack engineer and Co-Founder &amp; CTO at
                    Cobrix, building multi-tenant SaaS and payment infrastructure
                    for companies in Venezuela and LATAM. I design products
                    end-to-end with Next.js, NestJS, PostgreSQL, Redis and
                    Docker, with a strong focus on security, performance and
                    maintainable architecture. My background also spans
                    E-commerce, Flutter applications, cloud infrastructure and
                    applied AI integrations.
                </p>
            </motion.div>
        </>
    )
}
