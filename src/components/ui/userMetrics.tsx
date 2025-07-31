import React from 'react';

const UserMetrics = ({
  title = 'trainer',
  value = 0,
  unit = 'kcal',
  isLast = false,
}) => {
  const isPlus = unit === '+';

  return (
    <div className="">
      <h2 className="text-gray-5 text-[20px]">{title}</h2>
      <div className="flex">
        <p className="text-[52px]">
          {value.toLocaleString()}
          <span
            className={`text-gray-8 ${isPlus ? 'text-[52px]' : 'text-[24px]'}`}
          >
            {unit}
          </span>
        </p>
        {!isLast && <div className="w-[1px] h-[32px] bg-gray-9" />}
      </div>
    </div>
  );
};

const App = () => {
  const metricsData = [
    { title: 'trainer', value: 1111, unit: '+' },
    { title: 'member', value: 2222, unit: '+' },
    { title: 'total', value: 3333, unit: 'kcal' },
  ];

  return (
    <div className="flex">
      {metricsData.map((metric, index) => (
        <UserMetrics
          key={index}
          title={metric.title}
          value={metric.value}
          unit={metric.unit}
          isLast={index === metricsData.length - 1}
        />
      ))}
    </div>
  );
};

export default App;
