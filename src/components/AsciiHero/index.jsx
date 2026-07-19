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
            gsap.set('[data-ascii-char]', {autoAlpha: 1, y: 0})
            return
        }

        animatedCharacters.forEach(character => {
            character.textContent = glyphs[Math.floor(Math.random() * glyphs.length)]
        })
        gsap.set(animatedCharacters, {autoAlpha: 0, y: 12})

        const intro = gsap.timeline({delay: .18, defaults: {ease: 'power3.out'}})
        animatedCharacters.forEach((character, index) => {
            intro.to(character, {
                autoAlpha: 1,
                y: 0,
                duration: 0.32,
                onStart: () => { character.textContent = character.dataset.character },
            }, Math.min(index * 0.006, 0.72) + Math.random() * 0.14)
        })
        return () => {
            intro.kill()
            animatedCharacters.forEach(character => { character.textContent = character.dataset.character })
        }
    }, {scope: root})

    return (
        <div className={style.hero} ref={root}>
            <h1 className='sr-only'>Pleo2</h1>
            <div className={style.artFrame}>
                <pre className={style.art} aria-hidden='true'>
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
        </div>
    )
}
