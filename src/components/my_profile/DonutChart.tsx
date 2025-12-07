const DonutChart = () => {
  const data = [
    { label: "user", value: 27, color: "#2D2FF0" },
    { label: "Visitor", value: 73, color: "#EBAF29" },
  ];

  const radius = 70;
  const center = radius + 25;
  const strokeWidth = 28;
  
  let currentAngle = -90;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={center * 2} height={center * 2} className="mb-8">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E8E8E8"
          strokeWidth={strokeWidth}
        />

        {/* Data segments */}
        {data.map((segment, index) => {
          const angle = (segment.value / 100) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          
          // Convert angles to radians
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          
          // Calculate start and end points
          const x1 = center + radius * Math.cos(startRad);
          const y1 = center + radius * Math.sin(startRad);
          const x2 = center + radius * Math.cos(endRad);
          const y2 = center + radius * Math.sin(endRad);
          
          // Determine if arc should be large
          const largeArc = angle > 180 ? 1 : 0;
          
          // Create path
          const pathData = `
            M ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
          `;
          
          currentAngle += angle;

          return (
            <path
              key={index}
              d={pathData}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          );
        })}

        {/* Center text */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-medium"
          fill="#192540"
        >
          73%
        </text>
      </svg>

      {/* Legend */}
      <div className="flex gap-8">
        {data.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2">
            <div
              className="w-[27px] h-[13px] rounded-[20px]"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-[#192540] text-sm font-medium">
              {segment.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;