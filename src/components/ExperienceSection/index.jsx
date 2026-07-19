import Title from '../Title'

export default function ExperienceSection({experience}) {
    return (
        <section className='experience-section'>
            <Title section='Experience' />
            <div className='experience-list'>
                {experience.map(item => (
                    <article className='experience-item' data-scroll-reveal key={`${item.company}-${item.period}`}>
                        <div className='experience-role'><h3>{item.company}</h3><p>{item.role}</p></div>
                        <time>{item.period}</time>
                        <div className='experience-copy'><p>{item.summary}</p><small>{item.detail}</small></div>
                    </article>
                ))}
            </div>
        </section>
    )
}
