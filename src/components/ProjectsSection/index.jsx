import Title from '../Title'
import Articulo from '../Articulo'

export default function ProjectsSection({projects}) {
    return (
        <section className='projects-section'>
            <Title section='Projects' />
            <div className='project-list'>
                {projects.map(project => <Articulo key={project.name} project={project} />)}
            </div>
        </section>
    )
}
