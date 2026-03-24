'use client'

import Image from 'next/image';
import styles from '../page.module.scss';
import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone'

// Константы для модификаторов рандома
const MEDITATION_CONFIG = {
  // Минимальная и максимальная пауза между сигналами (в миллисекундах)
  MIN_PAUSE_MS: 2000,
  MAX_PAUSE_MS: 6000,
  
  // Набор доступных сигналов (ноты и длительности)
  SIGNALS: [
    { note: 'C4', duration: '8n' },
    { note: 'E4', duration: '8n' },
    { note: 'G4', duration: '8n' },
    { note: 'C5', duration: '4n' },
    { note: 'A3', duration: '8n' },
    { note: 'F4', duration: '8n' },
  ],
  
  // Громкость сигналов (0-1)
  VOLUME: 0.3,
  
  // Случайный разброс громкости (+/-)
  VOLUME_VARIATION: 0.1,
  
  // Тип синтезатора
  SYNTH_TYPE: 'sine' as const,
}

function Meditation() {
  const [active, setActive] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const synthRef = useRef<Tone.Synth | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Получить случайную паузу
  const getRandomPause = () => {
    return Math.random() * (MEDITATION_CONFIG.MAX_PAUSE_MS - MEDITATION_CONFIG.MIN_PAUSE_MS) + MEDITATION_CONFIG.MIN_PAUSE_MS;
  }
  
  // Получить случайный сигнал
  const getRandomSignal = () => {
    const signals = MEDITATION_CONFIG.SIGNALS;
    return signals[Math.floor(Math.random() * signals.length)];
  }
  
  // Получить случайную громкость
  const getRandomVolume = () => {
    const baseVolume = MEDITATION_CONFIG.VOLUME;
    const variation = MEDITATION_CONFIG.VOLUME_VARIATION;
    return Math.max(0.1, Math.min(1, baseVolume + (Math.random() - 0.5) * variation * 2));
  }
  
  // Проиграть случайный сигнал
  const playRandomSignal = () => {
    if (!synthRef.current) return;
    
    const signal = getRandomSignal();
    const volume = getRandomVolume();
    
    synthRef.current.volume.value = -10 + (volume * 10); // Конвертируем в dB
    synthRef.current.triggerAttackRelease(signal.note, signal.duration);
  }
  
  // Запустить сессию
  const handleOn = async () => {
    setActive(true)
    
    // Запускаем аудио контекст
    await Tone.start()
    console.log('Audio context started')
    
    // Создаем синтезатор
    synthRef.current = new Tone.Synth({
      oscillator: { type: MEDITATION_CONFIG.SYNTH_TYPE },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.3,
        release: 0.8
      }
    }).toDestination()
    
    // Проигрываем первый сигнал сразу
    playRandomSignal()
    
    // Запускаем таймер сессии
    timerRef.current = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    
    // Запускаем интервал для случайных сигналов
    const scheduleNextSignal = () => {
      const pause = getRandomPause();
      intervalRef.current = setTimeout(() => {
        // Проверяем, что сессия все еще активна
        if (synthRef.current) {
          playRandomSignal();
          scheduleNextSignal();
        }
      }, pause);
    };
    
    scheduleNextSignal();
  }
  
  // Остановить сессию
  const handleOff = () => {
    setActive(false)
    
    // Очищаем интервал
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Останавливаем таймер
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Останавливаем синтезатор
    if (synthRef.current) {
      synthRef.current.dispose();
      synthRef.current = null;
    }
    
    // Сбрасываем время сессии
    setSessionTime(0)
  }
  
  // Форматирование времени
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);
  
  return (
    <div className={styles.Meditation}>
      <div className={active ? styles.ActionActive : styles.ActionDisabled} onClick={()=>{
        active ? handleOff() : handleOn()
      }}>
      <Image src="/meditation.jpg" alt="Meditation" width={400} height={400} />  
      </div>
      
      {/* Таймер сессии */}
      <div className={styles.Timer}>
        <div className={styles.TimerDisplay}>
          <span className={styles.TimeLabel}>Session Time</span>
          <span className={styles.TimeValue}>{formatTime(sessionTime)}</span>
        </div>
      </div>
      
    </div>
  )
}

export default Meditation