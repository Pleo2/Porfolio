'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar() {
    const pathname = usePathname()

    return (
        <div className=' m-auto w-full mt-8 h-auto py-1 flex justify-center gap-4 font-sans z-100' data-load-reveal>
            <Link href='/' style={{ color: pathname === '/' ? "IndianRed" : "gray"}} className='cursor-pointer'>Portfolio</Link>
            <Link href='/blog' style={{ color: pathname === '/blog' ? "IndianRed" : "gray" }} className='cursor-pointer'>Blog</Link>
        </div>
    )
}
