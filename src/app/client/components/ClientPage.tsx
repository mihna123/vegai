"use client";

import {
  ClientsApiPostResonse,
  ClientsApiResponse,
} from "@/app/api/clients/route";
import { Client, ClientClient, Product } from "@/types";
import React, { useEffect, useState } from "react";
import ClientList from "./ClientList";
import ClientDetails from "./ClientDetails";
import ClientForm from "./ClientForm";

export default function ClientPage({ userId }: { userId: string }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/clients?user=${userId}`);
      const data = (await res.json()) as ClientsApiResponse;
      setClients(data.clients ?? []);
      setProducts(data.products ?? []);
    })();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleClientUpdate = (client: Client) => {
    setClients((prev) => {
      const newClients = prev.filter((c) => c._id !== client._id);
      return [...newClients, client];
    });
  };

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const selectedClient = clients.find(
    (c) => c._id.toString() === selectedClientId,
  );
  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
  };

  const handleNewClient = async (client: Omit<ClientClient, "_id">) => {
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        body: JSON.stringify({ client }),
      });
      if (!res.ok) {
        console.error(
          "There has been an error with client creation:",
          await res.text(),
        );
        return;
      }
      const data = (await res.json()) as ClientsApiPostResonse;
      setClients([...clients, data.client]);
    } catch (error) {
      console.error("Error while creating a task:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        className={`fixed inset-0 z-10 bg-black/60 transition-all duration-700 ${
          isModalOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`fixed inset-0 z-20 flex items-center justify-center px-4 transition-all duration-700 ${
          isModalOpen
            ? "translate-y-0 opacity-100"
            : `pointer-events-none translate-y-full opacity-0`
        }`}
        onClick={closeModal}
      >
        <ClientForm onClientSubmit={handleNewClient} userId={userId} />
      </div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Client Management
          </h2>
          <p className="text-gray-600">
            Manage your client portfolio and relationships
          </p>
        </div>
        <button
          onClick={openModal}
          className="bg-green-600 border border-black hover:scale-105 transition-all cursor-pointer hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Add New Client
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ClientList
          clients={clients}
          selectedClientId={selectedClientId}
          onClientSelect={handleClientSelect}
        />
        <ClientDetails
          onClientUpdate={handleClientUpdate}
          products={products}
          selectedClient={selectedClient}
          userId={userId}
        />
      </div>
    </main>
  );
}
