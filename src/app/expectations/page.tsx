import styles from './Expectations.module.scss';
import Header from '../components/header';

export default function Expectations() {
  return (
    <main className={styles.page}>
      <Header />
      <div className={styles.content}>
        <article>
          <h2>
            Who i am
          </h2>
          <p>
            I’m a full-stack software engineer with a strong focus on building practical, production-ready systems.
            Over the years, I’ve worked on CRM, ERP, marketplaces, and internal tools — from early architecture to real users in production.
            <br/>
            I’m most effective in environments where engineering decisions are driven by clarity, responsibility, and long-term value rather than short-term fixes.
          </p>
        </article>
        <article>
          <h2>
            How i work
          </h2>
          <p>
            I approach development as a problem-solving process, not just code delivery.
            I value clear requirements, thoughtful planning, and open communication — especially early in the process.
            <br/>
            I care about maintainability, system design, and real-world constraints. My goal is always the same: deliver solutions that are reliable, understandable, and actually useful to the business.
          </p>
        </article>
        <article>
          <h2>
            What I'm open to
          </h2>
          <p>
            At the moment, I’m open to full-time roles, long-term contracts, or well-defined project-based collaboration.
            I’m particularly interested in work where I can contribute beyond implementation — helping shape architecture, workflows, or technical direction.
            <br/>
            If our expectations align, I’m always open to starting a conversation.
          </p>
        </article>
      </div>
    </main>
  );
}