import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Aesthetic Sanctuary",
    category: "Client Café Website",
    tools: "HTML, CSS, ReactJS, JavaScript",
    description: "Developed a responsive website for a café client in Hyderabad. Built visually appealing front-end components and improved overall design responsiveness.",
    image: "/images/aaromale.png",
    url: "https://aesthetic-sanctuary.preview.emergentagent.com/",
    demoUrl: "https://aesthetic-sanctuary.preview.emergentagent.com/"
  },
  {
    title: "Universal Electronic",
    category: "Electronics Catalog Platform",
    tools: "HTML, CSS, JavaScript, Responsive Design",
    description: "Designed and built an interactive electronic product showcase and catalog platform. Features high responsiveness, intuitive product grids, and optimized mobile layouts.",
    image: "/images/universal_electronic.png",
    url: "https://github.com/anuragbontha2507-cyber/universal-electronic-",
    demoUrl: "https://anuragbontha2507-cyber.github.io/universal-electronic-/"
  },
  {
    title: "AI Lead Qualification",
    category: "AI Automation System",
    tools: "Python, AI Models, Data Processing",
    description: "Built an intelligent qualification platform leveraging machine learning models. Automates parsing, scoring, validation, and profiling of customer leads.",
    image: "/images/ai_lead.png",
    url: "https://github.com/anuragbontha2507-cyber/ai-lead-qualification-system",
    demoUrl: "https://ai-lead-qualification-system-alpha.vercel.app/"
  }
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>
                      {project.url !== "#" ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }} data-cursor="disable">
                          {project.title} <span style={{ fontSize: "0.75em", opacity: 0.75 }}>↗</span>
                        </a>
                      ) : (
                        project.title
                      )}
                    </h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <p style={{ marginTop: "1rem", opacity: 0.85, fontSize: "0.95rem", lineHeight: "1.45" }}>
                  {project.description}
                </p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.url} demoUrl={project.demoUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
