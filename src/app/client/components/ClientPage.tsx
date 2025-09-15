"use client";

import { ClientsApiResponse } from "@/app/api/clients/route";
import { Client, ClientNote, Product, Task } from "@/types";
import React, { useEffect, useState } from "react";
import ClientList from "./ClientList";
import ClientDetails from "./ClientDetails";

export default function ClientPage({ userId }: { userId: string }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientNotes, setClientNotes] = useState<ClientNote[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/clients?user=${userId}`);
      const data = (await res.json()) as ClientsApiResponse;
      setClients(data.clients ?? []);
      setClientNotes(data.clientNotes ?? []);
      setTasks(data.tasks ?? []);
      setProducts(data.products ?? []);
    })();
  }, []);

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const selectedClient = clients.find(
    (c) => c._id.toString() === selectedClientId,
  );
  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Client Management
          </h2>
          <p className="text-gray-600">
            Manage your client portfolio and relationships
          </p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md">
          Add New Client
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client List */}
        <ClientList
          clients={clients}
          selectedClientId={selectedClientId}
          onClientSelect={handleClientSelect}
        />
        {/* Client Details */}
        <ClientDetails
          clientNotes={clientNotes}
          products={products}
          tasks={tasks}
          selectedClient={selectedClient}
          userId={userId}
        />
      </div>
    </main>
  );
}
