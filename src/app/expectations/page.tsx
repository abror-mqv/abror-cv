import styles from './Expectations.module.scss';
import Header from '../components/header';
import Quote from '../components/homepage/quote';
import Link from 'next/link';

export default function Expectations() {
  return (
    <main className={styles.page}>
      <Header title="About me" />
      <div className={styles.content}>
        <article>
          <h2 className={styles.heading} tabIndex={0}>
            <span className={styles.headingMain}>Who I am</span>
            <span className={styles.headingHelp}>I forgot to introduce myself</span>
          </h2>
          <p>
            I’m a frontend-first engineer with a strong product mindset.
            I focus mostly on UI, UX, and how things actually feel for users, while backend and business logic are more like a <Link href="/certificates" className={styles.link}>solid bonus</Link> I bring to the table.<br />
            <br />

            I’ve worked on <Link href="/projects" className={styles.link}>different products</Link> and also tried building my own things — not all of them worked, but this experience shaped how I think about software, decisions, and trade-offs. I’m more about understanding the problem than just adding features.
          </p>

        </article>
        <article>
          <h2 className={styles.heading} tabIndex={0}>
            <span className={styles.headingMain}>How I work</span>
            <span className={styles.headingHelp}>How we would actually collaborate</span>
          </h2>
          <p>
            I usually prefer to think and plan first, then write code.
            Not everything can be planned, but having a clear direction helps a lot.
            <br />
            <br />
            I care about structure, maintainability, and simple solutions. Feedback is important for me - I work better when I know what’s working and what’s not. In general, I stay focused on the product and try to be easy to work with, even when things are not perfect.
          </p>
        </article>
        <article>
          <h2 className={styles.heading} tabIndex={0}>
            <span className={styles.headingMain}>What I'm open to</span>
            <span className={styles.headingHelp}>Let’s see if our expectations match</span>
          </h2>
          <p>
            Right now, I’m open to different formats: full-time roles, long-term contracts, or well-defined projects.
            What matters more to me is a clear role and a real product, not just “a position”.<br />
            <br />
            <br />
            Ideally, I want to work as part of a team, but I’m also comfortable taking ownership when needed. If the product is interesting and expectations are clear, I’m always open to talk.
          </p>
        </article>
      </div>

    </main>
  );
}