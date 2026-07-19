import Link from 'next/link'
import Card from '../Card'

export default function DownloadCv() {
    return (
        <>
            <div className='shrink-0'>
                <Card>
                    <div className='flex h-12 w-full items-center justify-center'>
                        <Link
                            href='/JoseMoreno-Full-Stack-Web-Developer.pdf'
                            target='_blank'
                            className='inline-flex h-full items-center px-2 font-display text-xl leading-none text-zinc-200 duration-500 hover:text-white md:text-2xl'
                        >
                            Download CV
                        </Link>
                    </div>
                </Card>
            </div>
        </>
    )
}
