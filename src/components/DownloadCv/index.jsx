import Link from 'next/link'

export default function DownloadCv() {
    return (
        <Link
            className='download-cv'
            href='/JoseMoreno-Full-Stack-Web-Developer.pdf'
            target='_blank'
            rel='noopener noreferrer'
        >
            <span>Download CV</span>
            <span aria-hidden='true'>↗</span>
        </Link>
    )
}
