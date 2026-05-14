import React from 'react';

interface UsageSparklineProps {
  color?: string;
  height?: number;
  width?: number;
}

export const UsageSparkline: React.FC<UsageSparklineProps> = ({ 
  color = "currentColor", 
  height = 40, 
  width = 200 
}) => {
  // Generate a smooth random-looking path that fits the aesthetic
  const points = [
    [0, 35], [20, 30], [40, 38], [60, 20], [80, 25], 
    [100, 10], [120, 22], [140, 15], [160, 30], [180, 28], [200, 32]
  ];
  
  const d = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point[0]},${point[1]}`;
    
    // Create a smooth curve
    const prev = a[i - 1];
    const cp1x = prev[0] + (point[0] - prev[0]) / 2;
    return `${acc} C ${cp1x},${prev[1]} ${cp1x},${point[1]} ${point[0]},${point[1]}`;
  }, "");

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      className="w-full h-full opacity-20"
      preserveAspectRatio="none"
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
