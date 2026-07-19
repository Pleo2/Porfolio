'use client'

import {useRef} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import CssLogo from '../Logos/Csslogo'
import Githublogo from '../Logos/Githublogo'
import GitLogo from '../Logos/Gitlogo'
import HtmlLogo from '../Logos/Htmllogo'
import JestLogo from '../Logos/Jestlogo'
import JsLogo from '../Logos/Jslogo'
import LinuxLogo from '../Logos/Linuxlogo'
import NextLogo from '../Logos/Nextlogo'
import ReactLogo from '../Logos/Reactlogo'
import SassLogo from '../Logos/Sasslogo'
import TailwindLogo from '../Logos/Tailwindlogo'
import TestingLibraryLogo from '../Logos/TestingLibrarylogo'
import TsLogo from '../Logos/Tslogo'
import style from './animation-slider.module.css'

gsap.registerPlugin(useGSAP)

const logos = [CssLogo, Githublogo, GitLogo, HtmlLogo, JestLogo, JsLogo, LinuxLogo, NextLogo, ReactLogo, SassLogo, TailwindLogo, TestingLibraryLogo, TsLogo]

function LogoGroup({hidden = false}) {
    return (
        <div className={style.group} aria-hidden={hidden || undefined}>
            {logos.map((Logo, index) => <div className={style.slide} key={index}><Logo /></div>)}
        </div>
    )
}

export default function Slider() {
    const root = useRef(null)
    const track = useRef(null)

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const loop = gsap.fromTo(track.current, {xPercent: 0}, {xPercent: -50, duration: 24, ease: 'none', repeat: -1})
        const observer = new IntersectionObserver(([entry]) => entry.isIntersecting ? loop.play() : loop.pause())
        observer.observe(root.current)
        return () => { observer.disconnect(); loop.kill() }
    }, {scope: root})

    return (
        <section className={style.slider} ref={root} aria-label='Technology stack'>
            <div className={style.track} ref={track}><LogoGroup /><LogoGroup hidden /></div>
        </section>
    )
}
