'use client'

import {useRef, useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'
import Title from '../Title'
import style from './capability-map.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const mapNodes = [
    {x: 14, y: 22, point: [126, 97], description: 'Interfaces and product surfaces'},
    {x: 86, y: 22, point: [774, 97], description: 'Services, data and APIs'},
    {x: 14, y: 78, point: [126, 343], description: 'Boundaries, scale and security'},
    {x: 86, y: 78, point: [774, 343], description: 'Automation, reliability and reach'},
]

const connection = ([x, y]) => {
    const direction = x < 450 ? -1 : 1
    return `M 450 220 C ${450 + (direction * 115)} 220, ${x - (direction * 95)} ${y}, ${x} ${y}`
}

export default function SkillsSection({skills}) {
    const root = useRef(null)
    const cycleTimer = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const activeGroup = skills[activeIndex]
    const activeMeta = mapNodes[activeIndex]

    useGSAP(() => {
        const media = gsap.matchMedia()

        media.add('(prefers-reduced-motion: no-preference)', () => {
            const paths = gsap.utils.toArray('[data-map-path]')
            const nodes = gsap.utils.toArray('[data-map-node]')
            const pathLengths = paths.map(path => path.getTotalLength())

            paths.forEach((path, index) => {
                gsap.set(path, {
                    strokeDasharray: pathLengths[index],
                    strokeDashoffset: pathLengths[index],
                })
            })

            const timeline = gsap.timeline({
                defaults: {ease: 'power3.out'},
                scrollTrigger: {
                    trigger: root.current,
                    start: 'top 82%',
                    once: true,
                },
            })

            const breathing = gsap.fromTo(nodes, {
                scale: .985,
            }, {
                scale: index => index % 2 === 0 ? 1.025 : 1.018,
                duration: index => 2.7 + (index * .3),
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: .18,
                paused: true,
            })

            cycleTimer.current = gsap.delayedCall(4.8, () => {
                setActiveIndex(index => (index + 1) % skills.length)
                cycleTimer.current?.restart(true)
            }).pause()

            timeline.fromTo('[data-map-core]', {
                autoAlpha: 0,
                scale: .88,
            }, {
                autoAlpha: 1,
                scale: 1,
                duration: .7,
            }).to(paths, {
                strokeDashoffset: 0,
                duration: .9,
                stagger: .08,
            }, .12).fromTo('[data-map-node]', {
                scale: .9,
            }, {
                scale: 1,
                duration: .55,
                stagger: .08,
            }, .3).fromTo('[data-map-detail]', {
                autoAlpha: 0,
                y: 12,
            }, {
                autoAlpha: 1,
                y: 0,
                duration: .6,
                clearProps: 'transform,opacity,visibility',
            }, .5).eventCallback('onComplete', () => breathing.play())

            const visibilityTrigger = ScrollTrigger.create({
                trigger: root.current,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => cycleTimer.current?.restart(true),
                onEnterBack: () => {
                    breathing.play()
                    cycleTimer.current?.restart(true)
                },
                onLeave: () => {
                    breathing.pause()
                    cycleTimer.current?.pause()
                },
                onLeaveBack: () => {
                    breathing.pause()
                    cycleTimer.current?.pause()
                },
            })

            return () => {
                breathing.kill()
                cycleTimer.current?.kill()
                visibilityTrigger.kill()
            }
        })

        return () => media.revert()
    }, {scope: root})

    useGSAP(() => {
        const signals = gsap.utils.toArray('[data-map-signal]')
        const activeSignal = signals[activeIndex]

        gsap.to(signals, {autoAlpha: 0, duration: .2, overwrite: true})
        gsap.to(activeSignal, {autoAlpha: 1, duration: .35, overwrite: true})

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.fromTo(activeSignal, {strokeDashoffset: 0}, {
                strokeDashoffset: -52,
                duration: 2.4,
                ease: 'none',
                repeat: -1,
            })

            gsap.fromTo('[data-map-skill]', {
                autoAlpha: 0,
                y: 8,
            }, {
                autoAlpha: 1,
                y: 0,
                duration: .38,
                stagger: .035,
                ease: 'power2.out',
                clearProps: 'transform,opacity,visibility',
            })
        }
    }, {dependencies: [activeIndex], scope: root, revertOnUpdate: true})

    const selectGroup = index => {
        setActiveIndex(index)
        cycleTimer.current?.restart(true)
    }

    return (
        <article className='skills-section' ref={root}>
            <Title section='Capabilities' />
            <div className={style.system}>
                <div className={style.desktopMap} aria-label='Interactive capability system map'>
                    <svg className={style.connections} viewBox='0 0 900 440' preserveAspectRatio='none' aria-hidden='true'>
                        {mapNodes.map((node, index) => (
                            <g key={skills[index].group}>
                                <path className={style.basePath} data-map-path d={connection(node.point)} />
                                <path className={`${style.signalPath} ${index === activeIndex ? style.signalPathActive : ''}`} data-map-signal d={connection(node.point)} />
                            </g>
                        ))}
                    </svg>

                    <div className={style.core} data-map-core>
                        <span>PLEO2</span>
                        <strong>Product<br />Engineering</strong>
                    </div>

                    {skills.map((group, index) => (
                        <button
                            className={`${style.mapNode} ${index === activeIndex ? style.mapNodeActive : ''}`}
                            data-map-node
                            key={group.group}
                            type='button'
                            style={{'--node-x': `${mapNodes[index].x}%`, '--node-y': `${mapNodes[index].y}%`}}
                            aria-pressed={index === activeIndex}
                            onClick={() => selectGroup(index)}
                            onFocus={() => selectGroup(index)}
                            onMouseEnter={() => selectGroup(index)}
                        >
                            <span>{group.group}</span>
                            <small>{mapNodes[index].description}</small>
                            <em>{index === activeIndex ? 'Active' : 'Explore'}</em>
                        </button>
                    ))}
                </div>

                <div className={style.detail} data-map-detail aria-live='polite'>
                    <div className={style.detailHeading}>
                        <span>Active cluster</span>
                        <h3>{activeGroup.group}</h3>
                        <p>{activeMeta.description}</p>
                    </div>
                    <ul className={style.skillList} key={activeGroup.group} aria-label={`${activeGroup.group} technologies`}>
                        {activeGroup.items.map(item => <li data-map-skill key={item}>{item}</li>)}
                    </ul>
                </div>

                <div className={style.mobileRoutes} aria-label='Capability groups'>
                    {skills.map((group, index) => (
                        <section className={`${style.mobileRoute} ${index === activeIndex ? style.mobileRouteActive : ''}`} key={group.group}>
                            <button type='button' aria-expanded={index === activeIndex} onClick={() => selectGroup(index)}>
                                <span>{group.group}</span>
                                <small>{index === activeIndex ? 'Close' : 'Explore'}</small>
                            </button>
                            {index === activeIndex && (
                                <ul aria-label={`${group.group} technologies`}>
                                    {group.items.map(item => <li data-map-skill key={item}>{item}</li>)}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </article>
    )
}
