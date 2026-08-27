import React, { useEffect, useRef } from 'react';

interface StarfieldBackgroundProps {
  isWarpSpeed?: boolean;
  onStarClick?: () => void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({
  isWarpSpeed = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 420 stars (a nod to 42!)
    const numStars = 420;
    const stars: Star[] = [];
    const starColors = ['#ffffff', '#e0f2fe', '#bae6fd', '#38bdf8', '#c084fc', '#fef08a'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    const maxShootingStars = 3;
    for (let i = 0; i < maxShootingStars; i++) {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * (height / 2),
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 0,
        active: false,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      const speed = isWarpSpeed ? 28 : 0.8;

      // Deep space black canvas with nebula gradient overlay
      ctx.fillStyle = isWarpSpeed ? 'rgba(7, 8, 15, 0.25)' : 'rgba(7, 8, 15, 0.95)';
      ctx.fillRect(0, 0, width, height);

      // Render subtle nebula clouds
      const grad1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.3,
        10,
        width * 0.2,
        height * 0.3,
        width * 0.5
      );
      grad1.addColorStop(0, 'rgba(56, 189, 248, 0.04)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        10,
        width * 0.8,
        height * 0.7,
        width * 0.6
      );
      grad2.addColorStop(0, 'rgba(168, 85, 247, 0.035)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw and update 3D starfield
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthAlpha = Math.min(1, Math.max(0.1, (1 - star.z / width) * 1.2));
          const twinkle = 0.7 + 0.3 * Math.sin(time * star.twinkleSpeed * 50 + star.twinklePhase);
          const finalAlpha = depthAlpha * (isWarpSpeed ? 1 : twinkle);

          ctx.fillStyle = star.color;
          ctx.globalAlpha = finalAlpha;

          if (isWarpSpeed) {
            // Draw warp speed streak lines
            const prevK = 250 / (star.z + speed * 2.5);
            const prevPx = star.x * prevK + cx;
            const prevPy = star.y * prevK + cy;

            ctx.beginPath();
            ctx.strokeStyle = star.color;
            ctx.lineWidth = star.size * (1 - star.z / width) * 2;
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.stroke();
          } else {
            const rad = Math.max(0.8, star.size * (1 - star.z / width) * 1.8);
            ctx.beginPath();
            ctx.arc(px, py, rad, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1;

      // Shooting stars animation (when not in full warp)
      if (!isWarpSpeed) {
        if (Math.random() < 0.015) {
          const inactive = shootingStars.find((s) => !s.active);
          if (inactive) {
            inactive.x = Math.random() * (width * 0.8);
            inactive.y = Math.random() * (height * 0.4);
            inactive.opacity = 1;
            inactive.active = true;
          }
        }

        shootingStars.forEach((star) => {
          if (star.active) {
            ctx.save();
            ctx.strokeStyle = `rgba(186, 230, 253, ${star.opacity})`;
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            const tailX = star.x - Math.cos(star.angle) * star.length;
            const tailY = star.y - Math.sin(star.angle) * star.length;
            ctx.lineTo(tailX, tailY);
            ctx.stroke();
            ctx.restore();

            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;
            star.opacity -= 0.018;

            if (star.opacity <= 0 || star.x > width || star.y > height) {
              star.active = false;
            }
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWarpSpeed]);

  return (
    <canvas
      id="space-starfield-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
