import Image from "next/image"

export default function Article({ project }) {
    return (
        <a
            target='_blank'
            rel='noopener noreferrer'
            href={`${project.link}`}
            aria-label={`Open ${project.name} project`}
        >
            <article className='p-4 md:p-8'>
                <h2 className='z-50 text-2xl text-zinc-200 font-medium duration-500 sm:text-zinc-200 md:text-4xl lg:text-4xl group-hover:text-white font-display'>
                    {project.name}
                </h2>
                <p className='z-20 mt-4 h-36 leading-loose text-sm duration-500 text-zinc-400 group-hover:text-zinc-200  md:text-xl md:leading-relaxed lg:text-lg lg:mt-4'>
                    {project.description}
                </p>
                <Image
                    className="mt-4 rounded cover w-96 h-50 aspect-video "
                    src={project.img}
                    width={350}
                    height={200}
                    alt={`${project.name} project preview`}
                >
                </Image>
            </article>
        </a>
    )
}
