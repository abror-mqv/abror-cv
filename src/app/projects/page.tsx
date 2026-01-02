'use client'

import { useRef, useState } from 'react';
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
  const currentProject = projectsData[activeIndex];
  const swiperRef = useRef<SwiperType | null>(null);

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    event.preventDefault();
    const dir = event.deltaY > 0 ? 'next' : 'prev';
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (dir === 'next') swiper.slideNext();
    else swiper.slidePrev();
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main} onWheel={handleWheel}>
        <div className={styles.topline}>
          <div>
            <p className={styles.kicker}>Selected work</p>
            <h1 className={styles.title}>Projects</h1>
          </div>
          {/* <span className={styles.hint}>Shipped with focus on clarity and delivery.</span> */}
        </div>
        <div className={styles.content}>
          <Info data={currentProject}/>
         
          <div className={styles.swiperWrap}>
            <Swiper
              modules={[Mousewheel, EffectCoverflow]}
              direction="vertical"
              loop
              slidesPerView="auto"
              // spaceBetween={80}
              centeredSlides
              effect="coverflow"
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 200,
                modifier: 2,
                slideShadows: true,
              }}
              mousewheel={false}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
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
