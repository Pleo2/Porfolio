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
                I&apos;m a full-stack engineer and Co-Founder &amp; CTO at Cobrix,
                building multi-tenant SaaS and payment infrastructure for
                companies in Venezuela and LATAM. I design products end-to-end
                with Next.js, NestJS, PostgreSQL, Redis and Docker, balancing
                security, performance, usability and maintainable architecture.
                My experience also spans E-commerce, Flutter applications,
                cloud infrastructure and applied AI integrations.
            </p>
        </motion.div>
    )
}
