'use client'

import {motion} from 'framer-motion'
import Title from '../Title'

export default function SkillsSection({skills}) {
    return (
        <motion.article className='skills-section' initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}}>
            <Title section='Capabilities' />
            <div className='capability-grid'>
                {skills.map(group => (
                    <section className='capability-group' key={group.group}>
                        <h3>{group.group}</h3>
                        <ul aria-label={`${group.group} technologies`}>
                            {group.items.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </section>
                ))}
            </div>
        </motion.article>
    )
}
