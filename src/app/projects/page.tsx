import projectsData from './data/projects.json';
import Header from '../components/header';
import styles from './projects.module.scss';

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.topline}>
          <div>
            <p className={styles.kicker}>Selected work</p>
            <h1 className={styles.title}>Projects</h1>
          </div>
          <span className={styles.hint}>Shipped with focus on clarity and delivery.</span>
        </div>
        <div className={styles.grid}>
          {projectsData.map((project) => (
            <article key={project.title} className={styles.card}>
              <div className={styles.cardHead}>
                <div>
                  <h2 className={styles.cardTitle}>{project.title}</h2>
                  <p className={styles.role}>{project.role}</p>
                </div>
                {project.is_open_source ? <span className={styles.badge}>Open Source</span> : null}
              </div>
              <p className={styles.desc}>{project.description}</p>
              <div className={styles.links}>
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
