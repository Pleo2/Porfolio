export default function SiteFooter() {
    return (
        <footer className='site-footer'>
            <div className='site-footer-inner'>
                <div>
                    <strong>José Moreno / Pleo2</strong>
                    <p>Full-Stack Engineer · Co-Founder &amp; CTO</p>
                </div>
                <nav aria-label='Footer links'>
                    <a href='mailto:leooel23m@gmail.com'>Email ↗</a>
                    <a href='https://github.com/Pleo2' target='_blank' rel='noopener noreferrer'>GitHub ↗</a>
                    <a href='https://www.linkedin.com/in/pleo2/' target='_blank' rel='noopener noreferrer'>LinkedIn ↗</a>
                </nav>
                <p className='site-footer-meta'>Venezuela · Remote<br />© {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}
