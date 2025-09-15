import { ClientClient, ClientStatus } from "@/types";
import { useState } from "react";

const allStatuses: ClientStatus[] = ["prospect", "active", "inactive"];

export default function ClientForm({
  userId,
  editClient,
  onClientSubmit,
}: {
  userId: string;
  editClient?: ClientClient;
  onClientSubmit: (client: Omit<ClientClient, "_id">) => void;
}) {
  const [name, setName] = useState(editClient?.name ?? "");
  const [status, setStatus] = useState<ClientStatus>(
    editClient?.status ?? "prospect",
  );
  const [lastContact, setLastContact] = useState(
    editClient?.lastContact ?? new Date().toISOString().slice(0, 16),
  );
  const [nextAppointment, setNextAppointment] = useState(
    editClient?.nextAppointment ?? new Date().toISOString().slice(0, 16),
  );
  const [value, setValue] = useState(editClient?.value ?? 0);
  const [productsIds, setProducsIds] = useState<string[]>(
    editClient?.productsIds ?? [],
  );
  const [email, setEmail] = useState(editClient?.email ?? "");
  const [phone, setPhone] = useState(editClient?.phone ?? "");
  const resetValues = () => {
    setName("");
    setStatus("prospect");
    setLastContact(new Date().toISOString().slice(0, 16));
    setNextAppointment(new Date().toISOString().slice(0, 16));
    setValue(0);
    setProducsIds([]);
    setEmail("");
    setPhone("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClientSubmit({
      name,
      status,
      lastContact,
      nextAppointment,
      value,
      productsIds,
      email,
      phone,
      advisorId: userId,
    });
    resetValues();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-slate-200 sm:rounded-lg sm:p-4"
    >
      <form onSubmit={handleSubmit} className="flex min-w-md flex-col gap-4">
        <h2 className="text-lg">{editClient ? "Edit Client" : "New Client"}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10 w-full bg-white border rounded-lg px-2"
          placeholder="Client name"
          required
        />
        <label className="text-xs text-gray-400 -mb-2">Status</label>
        <select
          value={status}
          className="h-10 w-full bg-white border rounded-lg px-2"
          onChange={(e) => setStatus(e.target.value as ClientStatus)}
        >
          {allStatuses.map((s, ind) => (
            <option key={ind} value={s}>
              {s}
            </option>
          ))}
        </select>
        <label className="text-xs text-gray-400 -mb-2">Last contact</label>
        <input
          type="datetime-local"
          value={lastContact}
          onChange={(e) => setLastContact(e.target.value)}
          className="h-10 w-full bg-white border rounded-lg px-2"
          placeholder="Last contact"
          required
        />
        <label className="text-xs text-gray-400 -mb-2">Next appointment</label>
        <input
          type="datetime-local"
          value={nextAppointment}
          onChange={(e) => setNextAppointment(e.target.value)}
          className="h-10 w-full bg-white border rounded-lg px-2"
          placeholder="Next appointment"
          required
        />
        <label className="text-xs text-gray-400 -mb-2">Client value</label>
        <input
          type="number"
          value={value.toString()}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className="h-10 w-full bg-white border rounded-lg px-2"
          placeholder="Client value"
          required
        />
        {/* TODO: add product ids */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 w-full bg-white border rounded-lg px-2"
          placeholder="Client email"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-10 w-full bg-white border rounded-lg px-2"
          placeholder="Client phone"
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition-all hover:scale-105 border border-black cursor-pointer text-white font-medium py-2 px-4 rounded-md text-sm"
        >
          {editClient ? "Edit client" : "Save client"}
        </button>
      </form>
    </div>
  );
}
