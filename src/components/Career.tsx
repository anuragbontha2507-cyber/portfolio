import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My education <span>&</span>
          <br /> strengths
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>Aurora Deemed University</h5>
              </div>
              <h3>2025 - 2029</h3>
            </div>
            <p>
              Specializing in Full Stack Development. Gaining deep knowledge in algorithm design, object-oriented programming, data structures, database management, and modern web application development.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Technical Learning & Skills</h4>
                <h5>Self-Directed & Academic Projects</h5>
              </div>
              <h3>2025 - 2029</h3>
            </div>
            <p>
              Building practical projects using HTML, CSS, ReactJS, Python, Java, and SQL. Focus on writing clean code, interactive interfaces, and responsive web design.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Core Strengths</h4>
                <h5>Personal & Professional Attributes</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Self-motivated and disciplined team player. Quick learner with high adaptability to new technologies, a strong problem-solving attitude, and the ability to work under pressure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
