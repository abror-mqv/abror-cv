import styles from '../projects.module.scss'
import Image from 'next/image'

const ProjectCard = ({ project }: { project: any }) => {
    return (
        <article key={project.title} className={styles.card}>
            <Image src={project.image} alt={project.title} width={440} height={248} />
        </article>
    )
}

export default ProjectCard