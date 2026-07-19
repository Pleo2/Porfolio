'use client'

import {useEffect, useRef, useState} from 'react'
import {
    Handle,
    MarkerType,
    Position,
    ReactFlow,
    useNodesState,
} from '@xyflow/react'
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

const positions = {
    core: {x: 355, y: 155},
    Frontend: {x: 30, y: 38},
    Backend: {x: 680, y: 38},
    Architecture: {x: 30, y: 310},
    Delivery: {x: 680, y: 310},
}

const edgeHandles = {
    Frontend: 'left-top',
    Backend: 'right-top',
    Architecture: 'left-bottom',
    Delivery: 'right-bottom',
}

function CapabilityNode({data}) {
    if (data.kind === 'core') {
        return (
            <div className={`${style.flowNode} ${style.coreNode}`} data-capability-node>
                <Handle className={style.handle} id='left-top' type='source' position={Position.Left} style={{top: '32%'}} />
                <Handle className={style.handle} id='left-bottom' type='source' position={Position.Left} style={{top: '68%'}} />
                <Handle className={style.handle} id='right-top' type='source' position={Position.Right} style={{top: '32%'}} />
                <Handle className={style.handle} id='right-bottom' type='source' position={Position.Right} style={{top: '68%'}} />
                <span>PLEO2</span>
                <strong>Product<br />Engineering</strong>
            </div>
        )
    }

    return (
        <div
            className={`${style.flowNode} ${style.categoryNode} ${data.active ? style.categoryNodeActive : ''}`}
            data-capability-node
            data-capability-active={data.active || undefined}
        >
            <Handle
                className={style.handle}
                type='target'
                position={data.side === 'left' ? Position.Right : Position.Left}
            />
            <span>{data.label}</span>
            <small>{data.description}</small>
            <em>{data.active ? 'Active' : 'Drag / explore'}</em>
        </div>
    )
}

const nodeTypes = {capability: CapabilityNode}

const createNodes = skills => [
    {
        id: 'core',
        type: 'capability',
        position: positions.core,
        draggable: false,
        selectable: false,
        data: {kind: 'core'},
    },
    ...skills.map((group, index) => ({
        id: group.group,
        type: 'capability',
        position: positions[group.group],
        data: {
            label: group.group,
            description: groupsMeta[group.group].description,
            side: groupsMeta[group.group].side,
            active: index === 0,
        },
    })),
]

const createEdges = (skills, activeGroup) => skills.map(group => {
    const active = group.group === activeGroup

    return {
        id: `core-${group.group}`,
        source: 'core',
        sourceHandle: edgeHandles[group.group],
        target: group.group,
        type: 'bezier',
        animated: active,
        focusable: false,
        selectable: false,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 14,
            height: 14,
            color: active ? '#c55e58' : '#42424a',
        },
        style: {
            stroke: active ? '#c55e58' : '#383840',
            strokeWidth: active ? 1.4 : 1,
            opacity: active ? .95 : .62,
        },
    }
})

export default function SkillsSection({skills}) {
    const root = useRef(null)
    const cycleTimer = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [nodes, setNodes, onNodesChange] = useNodesState(createNodes(skills))
    const activeGroup = skills[activeIndex]
    const activeMeta = groupsMeta[activeGroup.group]
    const edges = createEdges(skills, activeGroup.group)

    useEffect(() => {
        setNodes(currentNodes => currentNodes.map(node => {
            if (node.id === 'core') return node
            return {...node, data: {...node.data, active: node.id === activeGroup.group}}
        }))
    }, [activeGroup.group, setNodes])

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
        <article className='skills-section' ref={root}>
            <Title section='Capabilities' />
            <div className={style.system}>
                <div className={style.flowCanvas} aria-label='Interactive draggable capability graph'>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onNodeClick={(_, node) => selectGroup(node.id)}
                        onNodeMouseEnter={(_, node) => selectGroup(node.id)}
                        onNodeDragStart={(_, node) => selectGroup(node.id)}
                        nodesConnectable={false}
                        nodesDraggable
                        nodesFocusable
                        edgesFocusable={false}
                        elementsSelectable
                        deleteKeyCode={null}
                        nodeExtent={[[0, 0], [900, 440]]}
                        fitView
                        fitViewOptions={{padding: .1, minZoom: .68, maxZoom: 1}}
                        minZoom={.62}
                        maxZoom={1.15}
                        zoomOnScroll={false}
                        zoomOnDoubleClick={false}
                        preventScrolling={false}
                        panOnScroll={false}
                        proOptions={{hideAttribution: true}}
                    />
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
