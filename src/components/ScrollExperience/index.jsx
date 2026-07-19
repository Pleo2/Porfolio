'use client'

import {useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function ScrollExperience({children}) {
    const scope = useRef(null)
    const scrollThumb = useRef(null)
    const loadVeil = useRef(null)

    useGSAP(() => {
        const media = gsap.matchMedia()

        media.add({
            desktop: '(min-width: 768px)',
            reduceMotion: '(prefers-reduced-motion: reduce)',
        }, context => {
            const {desktop, reduceMotion} = context.conditions
            const loadStages = gsap.utils.toArray('[data-load-reveal]')

            if (reduceMotion) {
                gsap.set('[data-load-reveal], [data-scroll-reveal], .project-visual, .project-content', {
                    autoAlpha: 1,
                    clearProps: 'transform',
                })
                gsap.set(loadVeil.current, {autoAlpha: 0})
                return
            }

            gsap.set(loadStages, {
                autoAlpha: 0,
                y: 14,
                willChange: 'transform,opacity',
            })

            const entrance = gsap.timeline({
                delay: .08,
                defaults: {ease: 'power3.out'},
            })

            entrance.to(loadVeil.current, {
                autoAlpha: 0,
                duration: .7,
                ease: 'power2.out',
            }).to(loadStages, {
                autoAlpha: 1,
                y: 0,
                duration: .78,
                stagger: .13,
                clearProps: 'transform,opacity,visibility,will-change',
            }, '-=.48')

            gsap.utils.toArray('[data-scroll-reveal]').forEach(element => {
                gsap.fromTo(element, {
                    autoAlpha: 0,
                    y: desktop ? 28 : 18,
                    willChange: 'transform,opacity',
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: .85,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity,visibility,will-change',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 88%',
                        once: true,
                    },
                })
            })

            gsap.utils.toArray('[data-scroll-project]').forEach(project => {
                const visual = project.querySelector('.project-visual')
                const content = project.querySelector('.project-content')
                const timeline = gsap.timeline({
                    defaults: {duration: .95, ease: 'power3.out'},
                    scrollTrigger: {
                        trigger: project,
                        start: 'top 84%',
                        once: true,
                    },
                })

                timeline.fromTo(visual, {
                    autoAlpha: 0,
                    x: desktop ? -24 : 0,
                    y: desktop ? 0 : 18,
                    willChange: 'transform,opacity',
                }, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    clearProps: 'transform,opacity,visibility,will-change',
                }, 0).fromTo(content, {
                    autoAlpha: 0,
                    x: desktop ? 24 : 0,
                    y: desktop ? 0 : 18,
                    willChange: 'transform,opacity',
                }, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    clearProps: 'transform,opacity,visibility,will-change',
                }, desktop ? .08 : .12)
            })
        })

        const thumb = scrollThumb.current
        const fadeOut = gsap.delayedCall(.7, () => {
            gsap.to(thumb, {autoAlpha: 0, duration: .25, overwrite: true})
        }).pause()

        const updateThumb = progress => {
            const viewport = window.innerHeight
            const pageHeight = document.documentElement.scrollHeight
            const thumbHeight = Math.max(44, viewport * (viewport / pageHeight))
            const travel = Math.max(0, viewport - thumbHeight - 12)

            gsap.set(thumb, {height: thumbHeight, y: 6 + (travel * progress)})
            gsap.to(thumb, {autoAlpha: .72, duration: .12, overwrite: true})
            fadeOut.restart(true)
        }

        const progressTrigger = ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: self => updateThumb(self.progress),
            onRefresh: self => updateThumb(self.progress),
        })

        return () => {
            media.revert()
            fadeOut.kill()
            progressTrigger.kill()
        }
    }, {scope})

    return (
        <div ref={scope} className='scroll-experience'>
            {children}
            <div ref={loadVeil} className='load-veil' aria-hidden='true' />
            <div ref={scrollThumb} className='ios-scroll-thumb' aria-hidden='true' />
        </div>
    )
}
