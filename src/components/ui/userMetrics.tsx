import React from 'react';

const UserMetrics = ({
  title = 'trainer',
  value = 0,
  unit = 'kcal',
  isLast = false,
}) => {
  const isPlus = unit === '+';

  return (
    <section className="font-light">
      <h2 className="text-gray-5 text-xl">{title}</h2>
      <div className="flex items-center gap-15">
        <p className="text-[3.25rem]">
          {value.toLocaleString()}
          <span
            className={`text-gray-8 ${isPlus ? 'text-[3.25rem]' : 'text-[1.5rem] ml-2'}`}
          >
            {unit}
          </span>
        </p>
        {!isLast && <div className="w-0.25 h-[2rem] bg-gray-9" />}
      </div>
    </section>
  );
};

const MetricsContainer = () => {
  const metricsData = [
    { title: 'Trainer', value: 1111, unit: '+' },
    { title: 'Member', value: 2222, unit: '+' },
    { title: 'total', value: 3333, unit: 'kcal' },
  ];

  return (
    <div className="flex gap-15">
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

export default MetricsContainer;
