import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Props {
  activeSlide: number;
  totalSlides: number;
  progress: number; // 0 to 1
  onDotClick: (index: number) => void;
  onArrowClick: (direction: "up" | "down") => void;
}

const ScrollProgressIndicator = ({
  activeSlide,
  totalSlides,
  progress,
  onDotClick,
  onArrowClick,
}: Props) => {
  return (
    <>
      <div className="indicator-container" data-cursor="disable">
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ height: `${progress * 100}%` }}
          ></div>
        </div>
        
        <div className="dots-nav">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              className={`dot-btn ${activeSlide === idx ? "active" : ""}`}
              onClick={() => onDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div className="dot-inner"></div>
            </button>
          ))}
        </div>
      </div>

      <div className="chevron-nav" data-cursor="disable">
        {activeSlide > 0 && (
          <button
            className="arrow-btn"
            onClick={() => onArrowClick("up")}
            aria-label="Previous Project"
          >
            <FaChevronUp />
          </button>
        )}
        {activeSlide < totalSlides - 1 && (
          <button
            className={`arrow-btn ${activeSlide === 0 ? "bounce-anim" : ""}`}
            onClick={() => onArrowClick("down")}
            aria-label="Next Project"
          >
            <FaChevronDown />
          </button>
        )}
      </div>
    </>
  );
};

export default ScrollProgressIndicator;
