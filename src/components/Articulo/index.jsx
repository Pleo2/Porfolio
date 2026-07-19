import Image from 'next/image'

export default function Article({project}) {
    return (
        <a className='project-case' target='_blank' rel='noopener noreferrer' href={project.link} aria-label={`Open ${project.name} project`}>
            <div className='project-visual'>
                <Image src={project.img} fill sizes='(max-width: 767px) 100vw, 55vw' alt={`${project.name} project preview`} />
            </div>
            <div className='project-content'>
                <div className='project-meta'><span>Selected work</span><span>Open ↗</span></div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
            </div>
        </a>
    )
}
