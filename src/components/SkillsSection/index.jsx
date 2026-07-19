'use client'
import {motion} from 'framer-motion'
import Title from '../Title'

export default function SkillsSection({skills}) {
    return (
        <>
            <motion.article
                className='skills-section'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}} // 2.2 delay
            >
                <Title section={'Skills'} />
                <ul className='skills-grid' aria-label='Technical skills'>
                    {skills.map((item, index) => {
                        return (
                            <li
                                key={item.skill + index}
                                className='skill-chip'
                            >
                                {item.skill}
                            </li>
                        )
                    })}
                </ul>
            </motion.article>
        </>
    )
}
