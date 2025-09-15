import { Client, ClientStatus } from "@/types";
import { useState } from "react";

export default function ClientList({
  clients,
  onClientSelect,
  selectedClientId,
}: {
  clients: Client[];
  onClientSelect: (clientId: string) => void;
  selectedClientId: string | null;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "all">("all");
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    <div className="lg:col-span-1">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Clients
          </h3>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md text-sm ${statusFilter === "all" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${statusFilter === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setStatusFilter("active")}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${statusFilter === "prospect" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setStatusFilter("prospect")}
            >
              Prospects
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${statusFilter === "inactive" ? "bg-gray-100 text-gray-800" : "bg-gray-100 text-gray-800"}`}
              onClick={() => setStatusFilter("inactive")}
            >
              Inactive
            </button>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 max-h-[calc(100vh-22rem)] overflow-y-auto">
          {filteredClients.map((client) => (
            <li
              key={client._id.toString()}
              className={`px-4 py-4 sm:px-6 cursor-pointer hover:bg-gray-50 ${selectedClientId === client._id.toString() ? "bg-blue-50" : ""}`}
              onClick={() => onClientSelect(client._id.toString())}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-green-600 truncate">
                  {client.name}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(client.status)}`}
                  >
                    {client.status}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 truncate">{client.email}</p>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Last contact:{" "}
                  {new Date(client.lastContact).toLocaleDateString()}
                </p>
                <p className="text-sm font-medium">
                  ${client.value.toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
