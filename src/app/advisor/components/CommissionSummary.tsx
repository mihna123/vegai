interface CommissionSummaryProps {
  data?: {
    period: string;
    amount: number;
    status: string;
  }[];
}

export default function CommissionSummary({ data }: CommissionSummaryProps) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Commission Summary
          </h3>
        </div>
        {!data || (data.length === 0 && <p>No commissions yet</p>)}
        <ul className="divide-y divide-gray-200">
          {data?.map((commission, index) => (
            <li key={index}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-green-600 truncate">
                    {commission.period}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {commission.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Commission earned
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>${commission.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
