'use client'

import {useRef, useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'
import Title from '../Title'
import style from './capability-map.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const groupsMeta = {
    Frontend: {description: 'Interfaces and product surfaces', side: 'left'},
    Backend: {description: 'Services, data and APIs', side: 'right'},
    Architecture: {description: 'Boundaries, scale and security', side: 'left'},
    Delivery: {description: 'Automation, reliability and reach', side: 'right'},
}

const nodePositionClasses = {
    Frontend: 'nodeFrontend',
    Backend: 'nodeBackend',
    Architecture: 'nodeArchitecture',
    Delivery: 'nodeDelivery',
}

const connections = {
    Frontend: 'M 355 196 C 300 196, 285 84, 220 84',
    Backend: 'M 545 196 C 600 196, 615 84, 680 84',
    Architecture: 'M 355 242 C 300 242, 285 356, 220 356',
    Delivery: 'M 545 242 C 600 242, 615 356, 680 356',
}

export default function SkillsSection({skills}) {
    const root = useRef(null)
    const cycleTimer = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const activeGroup = skills[activeIndex]
    const activeMeta = groupsMeta[activeGroup.group]

    useGSAP(() => {
        const media = gsap.matchMedia()

        media.add('(prefers-reduced-motion: no-preference)', () => {
            const entrance = gsap.timeline({
                scrollTrigger: {
                    trigger: root.current,
                    start: 'top 82%',
                    once: true,
                },
            })

            entrance.fromTo('[data-capability-node]', {
                autoAlpha: 0,
                scale: .92,
            }, {
                autoAlpha: 1,
                scale: 1,
                duration: .65,
                stagger: .08,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility',
            }).fromTo('[data-map-detail]', {
                autoAlpha: 0,
                y: 12,
            }, {
                autoAlpha: 1,
                y: 0,
                duration: .55,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility',
            }, .25)

            cycleTimer.current = gsap.delayedCall(4.8, () => {
                setActiveIndex(index => (index + 1) % skills.length)
                cycleTimer.current?.restart(true)
            }).pause()

            const visibilityTrigger = ScrollTrigger.create({
                trigger: root.current,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => cycleTimer.current?.restart(true),
                onEnterBack: () => cycleTimer.current?.restart(true),
                onLeave: () => cycleTimer.current?.pause(),
                onLeaveBack: () => cycleTimer.current?.pause(),
            })

            return () => {
                cycleTimer.current?.kill()
                visibilityTrigger.kill()
            }
        })

        return () => media.revert()
    }, {scope: root})

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        gsap.fromTo('[data-capability-active]', {
            filter: 'brightness(1.28)',
        }, {
            filter: 'brightness(1)',
            duration: .65,
            ease: 'power2.out',
            clearProps: 'filter',
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
    }, {dependencies: [activeIndex], scope: root, revertOnUpdate: true})

    const selectGroup = groupId => {
        if (groupId === 'core') return
        const index = skills.findIndex(group => group.group === groupId)
        if (index < 0) return
        setActiveIndex(index)
        cycleTimer.current?.restart(true)
    }

    return (
        <article className='skills-section' id='capabilities' ref={root}>
            <Title section='Capabilities' />
            <div className={style.system}>
                <div className={style.flowCanvas} aria-label='Interactive capability graph'>
                    <svg className={style.connections} viewBox='0 0 900 440' preserveAspectRatio='none' aria-hidden='true'>
                        <defs>
                            <marker id='capability-arrow' markerWidth='8' markerHeight='8' refX='6.5' refY='4' orient='auto' markerUnits='strokeWidth'>
                                <path d='M 0 0 L 8 4 L 0 8 Z' fill='#42424a' />
                            </marker>
                            <marker id='capability-arrow-active' markerWidth='8' markerHeight='8' refX='6.5' refY='4' orient='auto' markerUnits='strokeWidth'>
                                <path d='M 0 0 L 8 4 L 0 8 Z' fill='#c55e58' />
                            </marker>
                        </defs>
                        {skills.map(group => (
                            <path
                                className={group.group === activeGroup.group ? style.connectionActive : style.connection}
                                d={connections[group.group]}
                                key={group.group}
                                markerEnd={group.group === activeGroup.group ? 'url(#capability-arrow-active)' : 'url(#capability-arrow)'}
                                vectorEffect='non-scaling-stroke'
                            />
                        ))}
                    </svg>

                    <div className={`${style.flowNode} ${style.coreNode}`} data-capability-node>
                        <i className={`${style.port} ${style.portLeftTop}`} />
                        <i className={`${style.port} ${style.portLeftBottom}`} />
                        <i className={`${style.port} ${style.portRightTop}`} />
                        <i className={`${style.port} ${style.portRightBottom}`} />
                        <span>PLEO2</span>
                        <strong>Product<br />Engineering</strong>
                    </div>

                    {skills.map(group => {
                        const active = group.group === activeGroup.group
                        return (
                            <button
                                className={`${style.flowNode} ${style.categoryNode} ${style[nodePositionClasses[group.group]]} ${active ? style.categoryNodeActive : ''}`}
                                type='button'
                                onClick={() => selectGroup(group.group)}
                                onMouseEnter={() => selectGroup(group.group)}
                                data-capability-node
                                data-capability-active={active || undefined}
                                aria-pressed={active}
                                key={group.group}
                            >
                                <i className={`${style.port} ${groupsMeta[group.group].side === 'left' ? style.portRight : style.portLeft}`} />
                                <span>{group.group}</span>
                                <small>{groupsMeta[group.group].description}</small>
                                <em>{active ? 'Active' : 'Explore'}</em>
                            </button>
                        )
                    })}
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
                            <button type='button' aria-expanded={index === activeIndex} onClick={() => selectGroup(group.group)}>
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
