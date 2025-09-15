import {
  NotesApiGetResponse,
  NotesApiPostResponse,
} from "@/app/api/notes/route";
import { ClientNote, ClientNoteClient, ClientNoteType } from "@/types";
import { useEffect, useState } from "react";
import NotesForm from "./NotesForm";

export default function Notes({
  userId,
  clientId,
}: {
  userId: string | null;
  clientId: string | null;
}) {
  const [notes, setNotes] = useState<ClientNote[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/notes?user=${userId}`);
      const data = (await res.json()) as NotesApiGetResponse;
      setNotes(data.notes ?? []);
    })();
  }, [userId]);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleNoteAdded = async (props: {
    content: string;
    type: ClientNoteType;
  }) => {
    if (!clientId || !userId) {
      console.error("No client id or user id!");
      return;
    }
    try {
      const newNote: Omit<ClientNoteClient, "_id"> = {
        ...props,
        clientId,
        ownerId: userId,
      };
      const res = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ note: newNote }),
      });
      if (!res.ok) {
        console.error(
          "There has been an error with note creation:",
          await res.text(),
        );
        return;
      }
      const data = (await res.json()) as NotesApiPostResponse;
      setNotes([...notes, data.note]);
    } catch (error) {
      console.error("Error while creating a task:", error);
    } finally {
      closeModal();
    }
  };

  const notesFiltered = userId
    ? notes.filter((note) => note.clientId.toString() === clientId)
    : [];

  const getNoteTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "👥";
      case "call":
        return "📞";
      case "email":
        return "✉️";
      case "note":
        return "📝";
      default:
        return "📝";
    }
  };
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
        <NotesForm onNotesSubmit={handleNoteAdded} edit={false} />
      </div>
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Notes</h3>
        <button
          className="bg-green-600 border border-black hover:scale-105 transition-all cursor-pointer hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm"
          onClick={openModal}
        >
          Add Note
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {notesFiltered.length > 0 ? (
          notesFiltered.map((note) => (
            <li key={note._id.toString()} className="px-4 py-4 sm:px-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-xl">{getNoteTypeIcon(note.type)}</span>
                </div>
                <p className="text-sm text-gray-500">{note.content}</p>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
            No notes for this client
          </li>
        )}
      </ul>
    </div>
  );
}
