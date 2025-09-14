export default function QuickActions() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Quick Actions
        </h3>
      </div>
      <div className="px-4 py-5 grid grid-cols-2 gap-4">
        <button className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded-md text-sm">
          New Client
        </button>
        <button className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded-md text-sm">
          Schedule Meeting
        </button>
        <button className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded-md text-sm">
          Generate Report
        </button>
        <button className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded-md text-sm">
          Upload Document
        </button>
      </div>
    </div>
  );
}
