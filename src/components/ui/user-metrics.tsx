const UserMetrics = ({
  title = 'trainer',
  value = 0,
  unit = 'kcal',
  isLast = false,
}) => {
  const isPlus = unit === '+';

  return (
    <section className="font-light">
      <h2 className="text-sm text-gray-2 md:text-xl">{title}</h2>
      <div className="flex items-center gap-15">
        <p className="text-[2rem] md:text-[3.25rem]">
          {value.toLocaleString()}
          <span className={`text-black ${isPlus ? '' : 'ml-2 text-base'}`}>
            {unit}
          </span>
        </p>
        {!isLast && <div className="h-[2rem] w-0.25 bg-gray-3" />}
      </div>
    </section>
  );
};

const MetricsContainer = ({ trainer = 0, member = 0, total = 0 }) => {
  const metricsData = [
    { title: 'Trainer', value: trainer, unit: '+' },
    { title: 'Member', value: member, unit: '+' },
    { title: 'Total', value: total, unit: 'kcal' },
  ];

  return (
    <div className="flex flex-wrap gap-5 md:gap-15">
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
