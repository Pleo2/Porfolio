import Link from 'next/link'
import Card from '../Card'

export default function DownloadCv() {
    return (
        <>
            <div className='shrink-0'>
                <Card>
                    <div className='w-full flex mt-1 justify-center items-center'>
                        <Link
                            href='/JoseMoreno-Full-Stack-Web-Developer.pdf'
                            target='_blank'
                            className='font-display text-xl text-zinc-200 px-2 hover:text-white duration-500 md:text-2xl'
                        >
                            Download-CV
                        </Link>
                    </div>
                </Card>
            </div>
        </>
    )
}
