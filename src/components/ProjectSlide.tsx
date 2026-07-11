import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward, MdLock, MdLockOpen } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

interface Props {
  title: string;
  category: string;
  tools: string;
  description: string;
  image: string;
  url: string;
  demoUrl: string;
  index: number;
  totalSlides: number;
  isActive: boolean;
}

const ProjectSlide = ({
  title,
  category,
  tools,
  description,
  image,
  url,
  demoUrl,
  index,
  totalSlides,
  isActive,
}: Props) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  // Lazy-load the iframe when the slide becomes active
  useEffect(() => {
    if (isActive) {
      setShouldLoad(true);
    }
  }, [isActive]);

  // Handle iframe load timeout (4 seconds)
  useEffect(() => {
    if (!shouldLoad) return;

    const timer = setTimeout(() => {
      if (!iframeLoaded) {
        setIframeError(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [shouldLoad, iframeLoaded]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const techBadges = tools.split(",").map((tag) => tag.trim());

  // Extract domain name for the address bar
  const getDomainName = (urlString: string) => {
    try {
      return new URL(urlString).hostname;
    } catch {
      return urlString.replace("https://", "").replace("http://", "").split("/")[0];
    }
  };

  // Generate background circuit-board coordinates based on slide index
  const renderCircuitTraces = () => {
    if (index === 0) {
      return (
        <svg className="circuit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <path d="M 0,100 L 150,100 L 220,170 L 350,170" className="circuit-path gold" />
          <path d="M 150,100 L 180,70 L 320,70" className="circuit-path violet" />
          <circle cx="220" cy="170" r="4" className="circuit-node gold" />
          <circle cx="320" cy="70" r="4" className="circuit-node violet" />
          <circle cx="350" cy="170" r="4" className="circuit-node gold" />
        </svg>
      );
    } else if (index === 1) {
      return (
        <svg className="circuit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <path d="M 800,400 L 650,400 L 580,330 L 450,330" className="circuit-path violet" />
          <path d="M 650,400 L 620,430 L 480,430" className="circuit-path gold" />
          <circle cx="580" cy="330" r="4" className="circuit-node violet" />
          <circle cx="480" cy="430" r="4" className="circuit-node gold" />
          <circle cx="450" cy="330" r="4" className="circuit-node violet" />
        </svg>
      );
    } else {
      return (
        <svg className="circuit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <path d="M 800,100 L 680,100 L 610,170 L 480,170 L 430,120 L 350,120" className="circuit-path gold" />
          <path d="M 610,170 L 590,190 L 400,190" className="circuit-path violet" />
          <circle cx="610" cy="170" r="4" className="circuit-node gold" />
          <circle cx="430" cy="120" r="4" className="circuit-node gold" />
          <circle cx="400" cy="190" r="4" className="circuit-node violet" />
          <circle cx="350" cy="120" r="4" className="circuit-node gold" />
        </svg>
      );
    }
  };

  return (
    <div className="project-slide" id={`project-slide-${index}`}>
      {/* Pulse decorative circuit traces in background */}
      <div className="slide-bg">{renderCircuitTraces()}</div>

      <div className="slide-grid">
        {/* Left Side: Staggered Content Info */}
        <motion.div
          className="slide-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div
            className="slide-index"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            0{index + 1} / 0{totalSlides} — {category}
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
            }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="slide-description"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {description}
          </motion.p>

          {/* Tech badges staggered */}
          <motion.div
            className="tech-badges"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {techBadges.map((tag, badgeIdx) => (
              <motion.span
                key={badgeIdx}
                className="tech-tag"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            className="slide-actions"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn-gold" data-cursor="disable">
              Visit Live Site <MdArrowOutward />
            </a>
            {url.includes("github.com") ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="btn-violet" data-cursor="disable">
                View Code <FaGithub />
              </a>
            ) : (
              <a href="#" className="btn-violet" data-cursor="disable">
                View Code <FaGithub />
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Side: Mockup Preview Browser Card */}
        <div className="slide-right">
          <motion.div
            className={`browser-mockup ${isActive ? "active-glow" : ""}`}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Toolbar */}
            <div className="browser-header">
              <div className="browser-controls">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              <div className="browser-address">{getDomainName(demoUrl)}</div>
            </div>

            {/* Inner Content Display */}
            <div className="browser-body">
              {shouldLoad && !iframeError && (
                <>
                  {/* Loading Skeleton */}
                  {!iframeLoaded && (
                    <div className="skeleton-loader">
                      <div className="skeleton-spinner"></div>
                      <div className="skeleton-text">SECURE LINK LOADING...</div>
                    </div>
                  )}

                  {/* Dynamic Iframe */}
                  <iframe
                    className={`browser-iframe ${!isInteractive ? "auto-scrolling" : ""}`}
                    src={demoUrl}
                    title={title}
                    onLoad={handleIframeLoad}
                    style={{ pointerEvents: isInteractive ? "auto" : "none" }}
                  />

                  {/* Sandbox Overlay */}
                  {!isInteractive && (
                    <div className="iframe-overlay">
                      <button
                        className="overlay-btn"
                        onClick={() => setIsInteractive(true)}
                        data-cursor="disable"
                      >
                        <MdLockOpen /> Try Interactive Sandbox
                      </button>
                      <span className="overlay-text">
                        Locks standard page scroll to interact directly
                      </span>
                    </div>
                  )}

                  {/* Sandbox Controls (Locked Overlay Toggle) */}
                  {isInteractive && (
                    <div className="interactive-controls">
                      <button
                        className="btn-lock"
                        onClick={() => setIsInteractive(false)}
                        data-cursor="disable"
                      >
                        <MdLock /> Lock Sandbox
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Fallback to Screenshot */}
              {(iframeError || !shouldLoad) && (
                <>
                  <img
                    className="fallback-screenshot"
                    src={image}
                    alt={`${title} Preview Fallback`}
                  />
                  {iframeError && (
                    <>
                      <div className="fallback-indicator">IFRAME BLOCKED / TIMEOUT</div>
                      <div className="iframe-overlay">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="overlay-btn"
                          data-cursor="disable"
                        >
                          Visit Live Site <MdArrowOutward />
                        </a>
                        <span className="overlay-text">
                          This website blocks embed framing for security.
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSlide;
