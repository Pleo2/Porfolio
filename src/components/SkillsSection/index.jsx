import Title from '../Title'

export default function SkillsSection({skills}) {
    return (
        <article className='skills-section'>
            <Title section='Capabilities' />
            <div className='capability-grid' data-scroll-reveal>
                {skills.map(group => (
                    <section className='capability-group' key={group.group}>
                        <h3>{group.group}</h3>
                        <ul aria-label={`${group.group} technologies`}>
                            {group.items.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </section>
                ))}
            </div>
        </article>
    )
}
