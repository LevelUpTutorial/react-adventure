import { useState, useEffect } from 'react';

const pulseAnimation = `
  @keyframes pulse {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
`;

const AttackCooldownWithAnimation = ({ gameState, timingWindowStart, timingWindowEnd, tickRate }) => {
  const [isTimingWindowActive, setIsTimingWindowActive] = useState(false);
  const cooldown = { current: gameState.hero.attack_cooldown, total: gameState.hero.attack_speed };

  useEffect(() => {
    const interval = setInterval(() => {
      if (cooldown.current >= timingWindowStart && cooldown.current <= timingWindowEnd) {
        setIsTimingWindowActive(true);
      } else {
        setIsTimingWindowActive(false);
      }
    }, tickRate);

    return () => clearInterval(interval);
  }, [cooldown, timingWindowStart, timingWindowEnd]);

  const widthCooldown = Math.max(0, Math.min( (cooldown.current / cooldown.total * 100), 100)); 
  const widthTimingWindowStart = (timingWindowStart / cooldown.total) * 100;
  const widthTimingWindowEnd = (timingWindowEnd / cooldown.total) * 100;
  const timingWindowWidth = widthTimingWindowEnd - widthTimingWindowStart;

  return (
    <div style={{ position: 'relative', height: '25px' }}>
      <style>{pulseAnimation}</style>

      {/* Main cooldown progress bar */}
        <div
          className="progress-bar rounded bg-primary"
          role="progressbar"
          style={{ 
            width: `${widthCooldown}%`,
            height: '100%', 
          }}
          aria-valuenow={widthCooldown}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {`${Math.max(0, (cooldown.current / 1000).toFixed(1) )}s`}
        </div>

      {/* Timing window indicator */}
      <div
        className={`progress-bar ${isTimingWindowActive ? 'bg-success' : 'bg-danger'} rounded`}
        style={{
          position: 'absolute',
          top: 0,
          left: `${widthTimingWindowStart}%`,
          width: `${timingWindowWidth}%`,
          height: '100%',
          zIndex: 1,
          animation: isTimingWindowActive ? `pulse ${timingWindowWidth}ms infinite` : 'none',
        }}
      ></div>
    </div>
  );
};

export default AttackCooldownWithAnimation;
