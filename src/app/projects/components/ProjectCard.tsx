import styles from '../projects.module.scss'
import Image from 'next/image'

const ProjectCard = ({ project }: { project: any }) => {
    return (
        <article key={project.title} className={styles.card}>
            <Image 
                src={project.image} 
                alt={project.title} 
                width={660} 
                height={371} 
                style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
                priority 
            />
        </article>
    )
}

export default ProjectCard
