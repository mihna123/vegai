import { PerformanceMetric } from "@/types";

interface StatsGridProps {
  metrics: Omit<PerformanceMetric, "_id">[];
}

export default function StatsGrid({ metrics }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <div
                  className={`h-6 w-6 text-${metric.trend === "up" ? "green" : metric.trend === "down" ? "red" : "gray"}-600`}
                >
                  {metric.trend === "up"
                    ? "↗"
                    : metric.trend === "down"
                      ? "↘"
                      : "→"}
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {metric.name}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {metric.name === "Revenue"
                        ? `$${metric.value.toLocaleString()}`
                        : metric.value}
                      <span className="text-xs text-gray-500 ml-1">
                        /{" "}
                        {metric.name === "Revenue"
                          ? `$${metric.target.toLocaleString()}`
                          : metric.target}
                      </span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
