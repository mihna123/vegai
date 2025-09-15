import { ClientNoteType } from "@/types";
import { useState } from "react";

const allTypes: ClientNoteType[] = ["note", "email", "call", "meeting"];

export default function NotesForm({
  edit,
  onNotesSubmit,
}: {
  edit: boolean;
  onNotesSubmit: (task: { content: string; type: ClientNoteType }) => void;
}) {
  const [content, setContent] = useState("");
  const [type, setType] = useState<ClientNoteType>("note");

  const resetValues = () => {
    setContent("");
    setType("note");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNotesSubmit({ content, type });
    resetValues();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-slate-200 sm:rounded-lg sm:p-4"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg">{edit ? "Edit Note" : "New Note"}</h2>
        <textarea
          value={content}
          cols={40}
          rows={3}
          onChange={(e) => setContent(e.target.value)}
          className="h-10 w-full bg-white border rounded-lg p-2"
          placeholder="Note text"
          required
        />
        <label className="text-xs text-gray-400">Note Type</label>
        <select
          value={type}
          className="h-10 w-full bg-white border rounded-lg px-2"
          required
          onChange={(e) => setType(e.target.value as ClientNoteType)}
        >
          {allTypes.map((t, ind) => (
            <option key={ind} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition-all hover:scale-105 border border-black cursor-pointer text-white font-medium py-2 px-4 rounded-md text-sm"
        >
          {edit ? "Edit note" : "Save note"}
        </button>
      </form>
    </div>
  );
}
