import { Children, FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Slider.module.css';

function splitAnArrayByChunks<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  const arrayCopy = [...array];

  while (arrayCopy.length) {
    chunks.push(arrayCopy.splice(0, chunkSize));
  }
  return chunks;
}

type SliderProps = {
  children: ReactNode;
  config?: {
    slidesToShow: number;
    gap?: number;
  };
};

const Slider: FC<SliderProps> = ({ children, config }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<ReactNode[]>([]);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);

  const moveToTheNextSlide = () => {
    const currentSlideElement = trackRef.current?.children[currentSlide];

    if (currentSlideElement instanceof HTMLElement) {
      const firstItemInCurrentSlide = currentSlideElement.children[0];

      if (firstItemInCurrentSlide instanceof HTMLElement) {
        const itemWidth = firstItemInCurrentSlide.offsetWidth + (config?.gap || 0);

        if (currentSlide < slides.length) {
          setCurrentSlide(currentSlide + 1);

          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(-${itemWidth * (currentSlide + 1)}px)`;
          }
        }
      }
    }
  };

  const moveToThePrevSlide = () => {
    const firstSlide = trackRef.current?.firstChild;
    const firstChildOfFirstSlide = firstSlide?.firstChild;

    if (firstChildOfFirstSlide instanceof HTMLElement) {
      const firstChildWidth = firstChildOfFirstSlide.offsetWidth + (config?.gap || 0);

      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${
            firstChildWidth * (currentSlide - 1)
          }px)`;
        }
      }
    }
  };

  // Touch events
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

  // Drag and drop
  const onDragStart = (e: React.DragEvent) => setDragStart(e.clientX);
  const onDragOver = (e: React.DragEvent) => setDragEnd(e.clientX);
  const onDragEnd = () => {
    if (dragStart - dragEnd > 150) {
      moveToTheNextSlide();
    }

    if (dragStart - dragEnd < -150) {
      moveToThePrevSlide();
    }
  };

  // Splitting children into slides by chunks
  useEffect(() => {
    if (children) {
      const slides = splitAnArrayByChunks(Children.toArray(children), config?.slidesToShow || 1);
      setSlides(slides);
    }
  }, [children, config?.slidesToShow]);

  const renderSlide = (slide: ReactNode, index: number): ReactNode => {
    return (
      <div
        key={index}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${config?.slidesToShow || 1}, 1fr)`,
          gap: `${config?.gap || 0}px`,
          width: slideContainerRef.current ? `${slideContainerRef.current.clientWidth}px` : '100%',
        }}
      >
        {slide}
      </div>
    );
  };

  return (
    <div className={styles.slider}>
      <div ref={slideContainerRef} className={styles['slides-container']}>
        <div
          ref={trackRef}
          className={styles['track']}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          style={{
            gap: `${config?.gap || 0}px`,
          }}
        >
          {slides.map((slide, index) => renderSlide(slide, index))}
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
