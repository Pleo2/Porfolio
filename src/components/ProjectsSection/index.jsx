'use client'

import {motion} from 'framer-motion'
import Title from '../Title'
import Articulo from '../Articulo'

export default function ProjectsSection({projects}) {
    return (
        <motion.section className='projects-section' initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}}>
            <Title section='Projects' />
            <div className='project-list'>
                {projects.map(project => <Articulo key={project.name} project={project} />)}
            </div>
        </motion.section>
    )
}
