import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectSlide from "./ProjectSlide";
import ScrollProgressIndicator from "./ScrollProgressIndicator";
import "./styles/MyWork.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    title: "Aesthetic Sanctuary",
    category: "Client Café Website",
    tools: "HTML, CSS, React, JS",
    description: "Developed a responsive website for a café client in Hyderabad. Built visually appealing front-end components and improved overall design responsiveness.",
    image: "/images/aaromale.png",
    url: "https://aesthetic-sanctuary.preview.emergentagent.com/",
    demoUrl: "https://aesthetic-sanctuary.preview.emergentagent.com/"
  },
  {
    title: "Universal Electronic",
    category: "Electronics Catalog Platform",
    tools: "HTML, CSS, JS, Firebase Firestore, Firebase Auth, Razorpay, Twilio",
    description: "Designed and built an interactive electronic product showcase and catalog platform. Features high responsiveness, intuitive product grids, and optimized mobile layouts.",
    image: "/images/universal_electronic.png",
    url: "https://github.com/anuragbontha2507-cyber/universal-electronic-",
    demoUrl: "https://anuragbontha2507-cyber.github.io/universal-electronic-/"
  },
  {
    title: "AI Lead Qualification",
    category: "AI Automation System",
    tools: "React, AI Models, Data Processing",
    description: "Built an intelligent qualification platform leveraging machine learning models. Automates parsing, scoring, validation, and profiling of customer leads.",
    image: "/images/ai_lead.png",
    url: "https://github.com/anuragbontha2507-cyber/ai-lead-qualification-system",
    demoUrl: "https://ai-lead-qualification-system-alpha.vercel.app/"
  }
];

const MyWork = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track window resizing for layout changes
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop Pinning Timeline Setup
  useGSAP(() => {
    if (!isDesktop) return;

    const numSlides = projects.length;
    
    // We pin the wrapper and slide container vertically by translating y
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${(numSlides - 1) * 100}%`,
        scrub: true,
        pin: true,
        snap: {
          snapTo: 1 / (numSlides - 1),
          duration: { min: 0.2, max: 0.4 },
          delay: 0.1,
          ease: "power2.out",
        },
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const index = Math.round(self.progress * (numSlides - 1));
          setActiveSlide(index);
        },
        id: "work",
      },
    });

    timeline.to(".work-slides-container", {
      y: `-${(numSlides - 1) * 100}vh`,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, [isDesktop]);

  // Mobile Native Snap Navigation Observer
  useEffect(() => {
    if (isDesktop) return;

    const observers = projects.map((_, index) => {
      const el = document.getElementById(`project-slide-${index}`);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSlide(index);
            // Estimate progress based on index
            setScrollProgress(index / (projects.length - 1));
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, [isDesktop]);

  // Mobile scrolling event handler to track progress bar fill
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isDesktop) return;
    const target = e.currentTarget;
    const progress = target.scrollTop / (target.scrollHeight - target.clientHeight);
    setScrollProgress(progress);
  };

  // Jump to specific slide programmatically
  const handleJumpToSlide = (index: number) => {
    if (isDesktop) {
      const scrollTrigger = ScrollTrigger.getById("work");
      if (scrollTrigger) {
        const start = scrollTrigger.start;
        const end = scrollTrigger.end;
        const progress = index / (projects.length - 1);
        const scrollPos = start + progress * (end - start);
        window.scrollTo({
          top: scrollPos,
          behavior: "smooth",
        });
      }
    } else {
      const el = document.getElementById(`project-slide-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleArrowClick = (direction: "up" | "down") => {
    const nextIndex = direction === "up" ? activeSlide - 1 : activeSlide + 1;
    if (nextIndex >= 0 && nextIndex < projects.length) {
      handleJumpToSlide(nextIndex);
    }
  };

  return (
    <div 
      className="work-section" 
      id="work" 
      ref={sectionRef}
      onScroll={handleMobileScroll}
    >
      <div 
        className="work-slides-container" 
        ref={containerRef}
      >
        {projects.map((project, index) => (
          <ProjectSlide
            key={index}
            index={index}
            totalSlides={projects.length}
            isActive={activeSlide === index}
            title={project.title}
            category={project.category}
            tools={project.tools}
            description={project.description}
            image={project.image}
            url={project.url}
            demoUrl={project.demoUrl}
          />
        ))}
      </div>

      {/* Vertical Progress Bar & Side dots */}
      <ScrollProgressIndicator
        activeSlide={activeSlide}
        totalSlides={projects.length}
        progress={scrollProgress}
        onDotClick={handleJumpToSlide}
        onArrowClick={handleArrowClick}
      />
    </div>
  );
};

export default MyWork;
