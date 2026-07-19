'use client'

import {useRef} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import style from './ascii-hero.module.css'

gsap.registerPlugin(useGSAP)

const asciiLines = [
    '██████╗ ██╗     ███████╗ ██████╗ ██████╗ ',
    '██╔══██╗██║     ██╔════╝██╔═══██╗╚════██╗',
    '██████╔╝██║     █████╗  ██║   ██║ █████╔╝',
    '██╔═══╝ ██║     ██╔══╝  ██║   ██║██╔═══╝ ',
    '██║     ███████╗███████╗╚██████╔╝███████╗',
    '╚═╝     ╚══════╝╚══════╝ ╚═════╝ ╚══════╝',
]

const glyphs = '#+*:/[]{}<>01'

export default function AsciiHero() {
    const root = useRef(null)

    useGSAP(() => {
        const characters = gsap.utils.toArray('[data-ascii-char]')
        const animatedCharacters = characters.filter(character => character.dataset.character !== ' ')
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (reducedMotion) {
            animatedCharacters.forEach(character => { character.textContent = character.dataset.character })
            gsap.set(['[data-ascii-char]', '[data-ascii-meta]'], {autoAlpha: 1, y: 0})
            return
        }

        animatedCharacters.forEach(character => {
            character.textContent = glyphs[Math.floor(Math.random() * glyphs.length)]
        })
        gsap.set(animatedCharacters, {autoAlpha: 0, y: 12})
        gsap.set('[data-ascii-meta]', {autoAlpha: 0, y: 10})

        const intro = gsap.timeline({defaults: {ease: 'power3.out'}})
        animatedCharacters.forEach((character, index) => {
            intro.to(character, {
                autoAlpha: 1,
                y: 0,
                duration: 0.32,
                onStart: () => { character.textContent = character.dataset.character },
            }, Math.min(index * 0.006, 0.72) + Math.random() * 0.14)
        })
        intro.to('[data-ascii-meta]', {autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08}, '-=0.2')

        const signal = gsap.timeline({repeat: -1, repeatDelay: 3.2})
        signal.to('[data-ascii-ghost]', {autoAlpha: 0.28, x: 5, duration: 0.055, ease: 'none'})
            .to('[data-ascii-ghost]', {autoAlpha: 0, x: -3, duration: 0.08, ease: 'none'})
            .to('[data-ascii-art]', {x: -1.5, duration: 0.045, ease: 'none'}, '<')
            .to('[data-ascii-art]', {x: 0, duration: 0.07, ease: 'none'})

        return () => {
            intro.kill()
            signal.kill()
            animatedCharacters.forEach(character => { character.textContent = character.dataset.character })
        }
    }, {scope: root})

    return (
        <div className={style.hero} ref={root}>
            <div className={style.meta} data-ascii-meta><span>[ IDENTITY: PLEO2 ]</span><span>FRONTEND / SYSTEMS</span></div>
            <h1 className='sr-only'>Pleo2</h1>
            <div className={style.artFrame}>
                <pre className={style.ghost} data-ascii-ghost aria-hidden='true'>{asciiLines.join('\n')}</pre>
                <pre className={style.art} data-ascii-art aria-hidden='true'>
                    {asciiLines.map((line, lineIndex) => (
                        <span className={style.line} key={`line-${lineIndex}`}>
                            {[...line].map((character, characterIndex) => (
                                <span data-ascii-char data-character={character} key={`${lineIndex}-${characterIndex}`}>{character}</span>
                            ))}
                            {lineIndex < asciiLines.length - 1 ? '\n' : ''}
                        </span>
                    ))}
                </pre>
            </div>
            <div className={style.meta} data-ascii-meta><span>ASSEMBLED WITH INTENT</span><span>VZLA / REMOTE</span></div>
        </div>
    )
}
