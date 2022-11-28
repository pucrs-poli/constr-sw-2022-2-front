import moment, { Moment } from 'moment';
import { useLayoutEffect, useRef, useState } from 'react';

export default function useTimeElapsed(
  timeLeftInSeconds: number,
  callBackZero?: () => void
): number {
  const [timeToReturn, setTimetoReturn] = useState<number>(timeLeftInSeconds);

  const [loop, setLoop] = useState<any>();
  const loopRef = useRef(loop);
  loopRef.current = loop;

  const dateRef = useRef<Moment | undefined>();

  useLayoutEffect(() => {
    if (loopRef.current) clearInterval(loopRef.current);

    const datRef = moment().add(timeLeftInSeconds, 'seconds');
    dateRef.current = datRef;

    const watch = () => {
      const seconds = parseInt(
        moment.duration(dateRef.current?.diff(moment())).asSeconds().toFixed(0)
      );
      if (seconds >= 0) {
        setTimetoReturn(seconds);
      } else if (loopRef.current) {
        if (typeof callBackZero === 'function') {
          callBackZero();
        }
        clearInterval(loopRef.current);
      }
    };

    watch();
    setLoop(setInterval(watch, 1000));

    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeftInSeconds]);

  return timeToReturn;
}
