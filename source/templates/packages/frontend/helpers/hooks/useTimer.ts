import { intervalToDuration } from 'date-fns';
import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  duration: number; // in seconds
}

interface UseTimerReturn {
  remaining: number;
  formattedRemaining: string;
  startTimer: () => void;
}

const useTimer = ({ duration }: UseTimerProps): UseTimerReturn => {
  const [remaining, setRemaining] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current !== null) return;

    setRemaining(duration);

    timerRef.current = setInterval(() => {
      setRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          timerRef.current = null;
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const formattedRemaining = (() => {
    const { hours, minutes, seconds } = intervalToDuration({
      start: 0,
      end: remaining * 1000,
    });

    const h = hours ? `${hours}:` : '';
    const m = minutes ? `${minutes}:` : hours ? '00' : '';
    const s = seconds ? `${seconds}` : minutes ? '00' : '';

    return `${h}${m}${s}` || '0';
  })();

  useEffect(() => {
    return () => {
      // Comment out because useEffect triggers twice on dev mode, so the timer is cleared immediately when started
      // Already handle cleanup in the startTimer function
      // if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { remaining, formattedRemaining, startTimer };
};

export default useTimer;
