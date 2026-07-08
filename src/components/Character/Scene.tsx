import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingProvider";
import "./styles/Scene2D.css";

const Scene = () => {
  const { setLoading } = useLoading();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Instantly resolve page loading
    setLoading(100);

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate cursor position relative to screen center (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setLoading]);

  // Rotations for the 3D-like hover tilt effect
  const rotateY = mouse.x * 15;
  const rotateX = -mouse.y * 15;
  const translateX = mouse.x * 10;
  const translateY = mouse.y * 10;

  return (
    <div className="character-container">
      <div className="character-model">
        {/* Glowing background halo */}
        <div className="avatar-glow"></div>
        
        {/* Parallax 2D floating card */}
        <div 
          className="avatar-card"
          style={{
            transform: `translate3d(calc(-50% + ${translateX}px), ${translateY}px, 0) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
        >
          <img 
            src="/images/avatar.png" 
            alt="Bontha Anurag Avatar" 
            className="avatar-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Scene;
