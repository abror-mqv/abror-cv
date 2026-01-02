'use client'

import { useEffect, useRef, useState } from 'react';
import projectsData from './data/projects.json';
import Header from '../components/header';
import styles from './projects.module.scss';
import ProjectCard from './components/ProjectCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import Info from './components/Info';

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const currentProject = projectsData[activeIndex];
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollThreshold = 12; 

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    event.preventDefault();
    if (Math.abs(event.deltaY) < scrollThreshold) return;
    const dir = event.deltaY > 0 ? 'next' : 'prev';
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (dir === 'next') swiper.slideNext();
    else swiper.slidePrev();
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const swiper = swiperRef.current;
      if (!swiper) return;
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        swiper.slideNext();
      } else if (['ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        swiper.slidePrev();
      }
    };
    window.addEventListener('keydown', handler, { passive: false });
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main} onWheel={handleWheel}>
        <div className={styles.topline}>
          <div>
            {/* <p className={styles.kicker}>Selected work</p> */}
            <h1 className={styles.title}>Projects</h1>
          </div>
          {/* <span className={styles.hint}>Shipped with focus on clarity and delivery.</span> */}
        </div>
        <div className={styles.content}>
          <Info data={currentProject}/>
         
          <div className={styles.swiperWrap}>
            {!isReady ? (
              <div className={styles.swiperPlaceholder}>
                <div className={styles.shimmer} />
              </div>
            ) : null}
            <Swiper
              modules={[Mousewheel, EffectCoverflow]}
              direction="vertical"
              loop
              slidesPerView="auto"
              // spaceBetween={80}
              centeredSlides
              effect="coverflow"
              coverflowEffect={{
                rotate: 8,
                stretch: 2,
                depth: 200,
                modifier: 4,
                slideShadows: true,
              }}
              mousewheel={false}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsReady(true);
              }}
            >
              {projectsData.map((project) => (
                <SwiperSlide key={project.title} className={styles.slide}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* currentProject is available for neighbor components if needed */}
      </main>
    </div>
  );
}
