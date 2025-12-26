'use client';

import { useEffect, useState } from 'react';
import quotes from './quotes.json';
import styles from './quote.module.scss';

const BASE_TYPING_SPEED = 25;
const PAUSE_AFTER_TYPED = 1000;
const CURSOR_BLINK = 550;
const PUNCTUATION_PAUSE = 220;
const MID_WORD_VARIANCE = 70;
const WORD_END_VARIANCE = 130;
const THINK_PAUSE_CHANCE = 0.16;
const THINK_PAUSE_MIN = 320;
const THINK_PAUSE_MAX = 760;
const TYPO_CHANCE = 0.08;
const BACKSPACE_DELAY = 120;

export default function Quote() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteText, setQuoteText] = useState('');
  const [authorText, setAuthorText] = useState('');
  const [stage, setStage] = useState<'quote' | 'author' | 'pause'>('quote');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typo, setTypo] = useState<{
    active: boolean;
    phase: 'wrong' | 'backspace' | null;
    target: 'quote' | 'author' | null;
  }>({ active: false, phase: null, target: null });

  const currentQuote = quotes[quoteIndex];

  const nextDelay = (fullText: string, currentLength: number) => {
    const nextChar = fullText[currentLength];
    if (!nextChar) return BASE_TYPING_SPEED;

    const isPunctuation = /[.,!?]/.test(nextChar);
    const isSpace = nextChar === ' ';
    const variance = isSpace ? WORD_END_VARIANCE : MID_WORD_VARIANCE;
    const randomness = Math.random() * variance;
    const base = BASE_TYPING_SPEED + randomness + (isPunctuation ? PUNCTUATION_PAUSE : 0);

    // случайная «задумчивость» как у живого человека
    const shouldPause = Math.random() < THINK_PAUSE_CHANCE && (isSpace || isPunctuation);
    if (shouldPause) {
      const thinkDelay = THINK_PAUSE_MIN + Math.random() * (THINK_PAUSE_MAX - THINK_PAUSE_MIN);
      return base + thinkDelay;
    }

    return base;
  };

  const randomWrongChar = (correct: string) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let candidate = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (candidate === correct.toLowerCase()) {
      candidate = alphabet[(alphabet.indexOf(candidate) + 1) % alphabet.length];
    }
    return candidate;
  };

  useEffect(() => {
    const fullQuote = currentQuote.quote;
    const fullAuthor = `- ${currentQuote.author}`;
    const targetStage = stage === 'quote' ? 'quote' : stage === 'author' ? 'author' : null;
    const fullText = stage === 'quote' ? fullQuote : fullAuthor;
    const typedText = stage === 'quote' ? quoteText : authorText;
    const setText = stage === 'quote' ? setQuoteText : setAuthorText;
    let timer: NodeJS.Timeout;

    if (stage === 'pause') {
      timer = setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setQuoteText('');
        setAuthorText('');
        setTypo({ active: false, phase: null, target: null });
        setStage('quote');
      }, PAUSE_AFTER_TYPED);
      return () => clearTimeout(timer);
    }

    if (typo.active && targetStage && typo.target !== targetStage) {
      setTypo({ active: false, phase: null, target: null });
    }

    if (typo.active && typo.phase === 'wrong') {
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setTypo((prev) => ({ ...prev, phase: 'backspace' }));
      }, BACKSPACE_DELAY);
    } else if (typo.active && typo.phase === 'backspace') {
      timer = setTimeout(() => {
        setTypo({ active: false, phase: null, target: targetStage });
      }, BACKSPACE_DELAY);
    } else if (stage === 'quote' || stage === 'author') {
      const typedLength = stage === 'quote' ? quoteText.length : authorText.length;
      const nextLength = typedLength + 1;
      const targetLength = stage === 'quote' ? fullQuote.length : fullAuthor.length;

      if (nextLength <= targetLength) {
        const makeTypo =
          Math.random() < TYPO_CHANCE &&
          typedLength > 2 &&
          targetLength - typedLength > 3 &&
          !typo.active;

        if (makeTypo) {
          const wrongChar = randomWrongChar(fullText[typedLength]);
          timer = setTimeout(() => {
            setText((prev) => prev + wrongChar);
            setTypo({ active: true, phase: 'wrong', target: targetStage });
          }, nextDelay(fullText, typedLength));
        } else {
          timer = setTimeout(
            () => setText(fullText.slice(0, typedLength + 1)),
            nextDelay(fullText, typedLength),
          );
        }
      } else {
        timer =
          stage === 'quote'
            ? setTimeout(() => setStage('author'), PAUSE_AFTER_TYPED)
            : setTimeout(() => setStage('pause'), PAUSE_AFTER_TYPED);
      }
    } else {
      timer = setTimeout(() => setStage('pause'), PAUSE_AFTER_TYPED);
    }

    return () => clearTimeout(timer);
  }, [
    authorText.length,
    currentQuote.author,
    currentQuote.quote,
    quoteText.length,
    stage,
    typo.active,
    typo.phase,
    typo.target,
  ]);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), CURSOR_BLINK);
    return () => clearInterval(blink);
  }, []);

  return (
    <blockquote className={styles.quote}>
      <p className={styles.quoteText}>
        {quoteText}
        {cursorVisible && (stage === 'quote' || stage === 'author') ? <span>|</span> : <span className={styles.invisibleCursor}>|</span>}
      </p>
      <p className={styles.authorText}>{authorText}</p>
    </blockquote>
  );
}