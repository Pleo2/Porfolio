import AboutMeSection from '@/components/AboutMeSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import SectionCvDesktop from '@/components/section-Cv-desktop'
import LinkSocialIcons from '@/components/LinkSocialIcons'
import {projects} from '@/mock/projects'
import {skills} from '@/mock/skills'
import AbouteMeDesktop from '../components/AbouteMeDesktop'

export default function Home() {
    return (
        <>
            <SectionCvDesktop />
            <AboutMeSection />
            <AbouteMeDesktop />
            <LinkSocialIcons />
            <ProjectsSection projects={projects} />
            <SkillsSection skills={skills} />
        </>
    )
}
