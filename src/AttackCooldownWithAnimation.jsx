import { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

const pulseAnimation = `
  @keyframes pulse {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
`;

const AttackCooldownWithAnimation = ({ gameState, timingWindowStart, timingWindowEnd, tickRate }) => {
  const [isTimingWindowActive, setIsTimingWindowActive] = useState(false);
  const cooldown = {current: gameState.hero.attack_cooldown, total: gameState.hero.attack_speed}; 
  
  useEffect(() => {
    const timingWindowDuration = timingWindowEnd - timingWindowStart;
    const interval = setInterval(() => {
      if (cooldown.current >= timingWindowStart && cooldown.current <= timingWindowEnd) {
        setIsTimingWindowActive(true);
      } else {
        setIsTimingWindowActive(false);
      }
    }, tickRate);

    return () => clearInterval(interval);
  }, [cooldown, timingWindowStart, timingWindowEnd]);

  const widthCooldown = (cooldown.current / cooldown.total) * 100;
  const widthTimingWindowStart = (timingWindowStart / cooldown.total) * 100;
  const widthTimingWindowEnd = (timingWindowEnd / cooldown.total) * 100;

  return (
    <div>
      <ProgressBar now={widthCooldown} label={`${Math.round(widthCooldown)}%`} />
      <style>{pulseAnimation}</style>
      <ProgressBar 
        variant={isTimingWindowActive ? 'success' : 'info'} 
        now={widthTimingWindowEnd - widthTimingWindowStart} 
        style={{
          position: 'absolute',
          left: `${widthTimingWindowStart}%`,
          zIndex: 1,
          width: `${widthTimingWindowEnd - widthTimingWindowStart}%`,
          animation: isTimingWindowActive ? 'pulse 1s infinite' : 'none',
        }} 
      />
    </div>
  );
};

export default AttackCooldownWithAnimation;
