import { Children, FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';

type SliderProps = {
  children: ReactNode;
  config?: {
    slidesToShow: number;
    gap?: number;
  };
};

const Slider: FC<SliderProps> = ({ children, config }) => {
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [trackWidth, setTrackWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const moveToTheNextSlide = () => {
    if (!trackRef.current) return;

    if (currentSlide < Children.count(children) - (config?.slidesToShow || 1)) {
      trackRef.current.style.transform = `translateX(-${slideWidth * (currentSlide + 1)}px)`;
      setCurrentSlide(currentSlide + 1);
    }
  };

  const moveToThePrevSlide = () => {
    if (!trackRef.current) return;

    if (currentSlide > 0) {
      trackRef.current.style.transform = `translateX(-${slideWidth * (currentSlide - 1)}px)`;
      setCurrentSlide(currentSlide - 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      moveToTheNextSlide();
    }

    if (touchStart - touchEnd < -150) {
      moveToThePrevSlide();
    }
  };

  useEffect(() => {
    if (slidesContainerRef.current) {
      const slideWidth = slidesContainerRef.current.offsetWidth / (config?.slidesToShow || 1);
      const trackWidth = slideWidth * Children.count(children);

      setSlideWidth(slideWidth);
      setTrackWidth(trackWidth);
    }
  }, [children, config?.gap, config?.slidesToShow]);

  return (
    <div className={styles.slider}>
      <div ref={slidesContainerRef} className={styles['slides-container']}>
        <div
          ref={trackRef}
          className={styles['track']}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            gap: `${config?.gap || 0}px`,
            width: `${trackWidth}px`,
          }}
        >
          {children}
        </div>
      </div>

      <div className={styles['controls-container']}>
        <button onClick={moveToThePrevSlide}>Prev</button>
        <button onClick={moveToTheNextSlide}>Next</button>
      </div>
    </div>
  );
};

export default Slider;
