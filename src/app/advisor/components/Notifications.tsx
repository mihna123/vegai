import { Notification } from "@/types";

interface NotificationsProps {
  notifications?: Notification[];
}

export default function Notifications({ notifications }: NotificationsProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Notifications
        </h3>
      </div>
      {!notifications ||
        (notifications.length === 0 && <p>No notifications yet</p>)}
      <ul className="divide-y divide-gray-200">
        {notifications?.map((notification) => (
          <li key={notification._id.toString()} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-green-600 truncate">
                {notification.title}
              </p>
              <button className="ml-2 flex-shrink-0 flex">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Mark read
                </span>
              </button>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-xs text-gray-500">
                  {notification.message}
                </p>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <svg
                  className="flex-shrink-0 mr-1.5 h-3 w-3 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs whitespace-nowrap">
                  {notification._id.getTimestamp().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
