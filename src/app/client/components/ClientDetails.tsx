import { Client, Product } from "@/types";
import Notes from "./Notes";
import Tasks from "./Tasks";

export default function ClientDetails({
  selectedClient,
  products,
  userId,
}: {
  selectedClient?: Client;
  products: Product[];
  userId: string;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "prospect":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="lg:col-span-2">
      {selectedClient ? (
        <div className="space-y-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {selectedClient.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Client details and information
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-white hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md text-sm">
                  Edit
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm">
                  Contact
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedClient.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedClient.phone}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedClient.status)}`}
                    >
                      {selectedClient.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Next appointment
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(
                      selectedClient.nextAppointment,
                    ).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Client value
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    ${selectedClient.value.toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Products
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedClient.productsIds.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {products
                          .filter((p) =>
                            selectedClient.productsIds.includes(p._id),
                          )
                          .map((product, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
                            >
                              {product.name}
                            </span>
                          ))}
                      </div>
                    ) : (
                      "No products"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <Tasks clientId={selectedClient._id.toString()} userId={userId} />
          <Notes clientId={selectedClient._id.toString()} userId={userId} />
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No client selected
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a client from the list to view details
          </p>
        </div>
      )}
    </div>
  );
}
