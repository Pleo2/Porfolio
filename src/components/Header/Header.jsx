import NavBar from './NavBar'
import AsciiHero from '../AsciiHero'
import style from './animationHeader.module.css'

export default function Header() {
    return (
        <header className={style.header}>
            <NavBar />
            <AsciiHero />
        </header>
    )
}
