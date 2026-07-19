'use client'

import {motion} from 'framer-motion'
import Title from '../Title'

export default function ExperienceSection({experience}) {
    return (
        <motion.section className='experience-section' initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}}>
            <Title section='Experience' />
            <div className='experience-list'>
                {experience.map(item => (
                    <article className='experience-item' key={`${item.company}-${item.period}`}>
                        <div className='experience-role'><h3>{item.company}</h3><p>{item.role}</p></div>
                        <time>{item.period}</time>
                        <div className='experience-copy'><p>{item.summary}</p><small>{item.detail}</small></div>
                    </article>
                ))}
            </div>
        </motion.section>
    )
}
