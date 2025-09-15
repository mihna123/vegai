import { NotesApiGetResponse } from "@/app/api/notes/route";
import { ClientNote } from "@/types";
import { useEffect, useState } from "react";

export default function Notes({
  userId,
  clientId,
}: {
  userId: string | null;
  clientId: string | null;
}) {
  const [notes, setNotes] = useState<ClientNote[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/notes?user=${userId}`);
      const data = (await res.json()) as NotesApiGetResponse;
      setNotes(data.notes ?? []);
    })();
  }, [userId]);

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
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Notes</h3>
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm">
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
