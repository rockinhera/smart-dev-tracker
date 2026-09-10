import { useState } from "react";
import { Flame } from "lucide-react";

const categoryStyles = {
  Coding: "bg-purple-500/20 text-purple-400",
  Health: "bg-purple-500/20 text-purple-400",
  Reading: "bg-purple-500/20 text-purple-400",
  Career: "bg-purple-500/20 text-purple-400",
};

function HabitCard({
  habit,
  editingId,
  editTitle,
  setEditTitle,
  editMinutes,
  setEditMinutes,
  editCategory,
  setEditCategory,
  startEdit,
  saveEdit,
  deleteHabit,
  toggleHabit,
  setEditingId,
}) {
  const [editError, setEditError] = useState("");

  const handleSave = () => {
    const numericMinutes = Number(editMinutes);

    if (editTitle.trim() === "") {
      setEditError("You need to fill this out.");
      return;
    }

    if (!Number.isFinite(numericMinutes) || numericMinutes < 1) {
      setEditError("Please enter a valid number of minutes.");
      return;
    }

    const saved = saveEdit(habit.id);

    if (saved) {
      setEditError("");
    }
  };

  const handleDelete = () => {
    const answer = window.confirm(
      "Are you sure you want to delete this habit?"
    );

    if (answer) {
      deleteHabit(habit.id);
    }
  };

  return (
    <div
      className={`rounded-xl border p-5 ${
        habit.completed
          ? "border-purple-500/30 bg-purple-500/10"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      {editingId === habit.id ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              setEditError("");
            }}
            className="mb-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-purple-500"
          />

          {editError && editTitle.trim() === "" && (
            <p className="mb-3 text-sm text-red-400">
              You need to fill this out.
            </p>
          )}

          <input
            type="number"
            min="1"
            value={editMinutes}
            onChange={(e) => {
              setEditMinutes(e.target.value);
              setEditError("");
            }}
            className="mb-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-purple-500"
          />

          {editError && editTitle.trim() !== "" && (
            <p className="mb-3 text-sm text-red-400">
              {editError}
            </p>
          )}

          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-purple-500"
          >
            <option value="Coding">Coding</option>
            <option value="Health">Health</option>
            <option value="Reading">Reading</option>
            <option value="Career">Career</option>
          </select>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm hover:bg-purple-500"
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditingId(null);
                setEditError("");
              }}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`text-xl font-semibold ${
                  habit.completed ? "text-purple-400" : "text-white"
                }`}
              >
                {habit.title}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    categoryStyles[habit.category] ||
                    "bg-slate-500/20 text-slate-400"
                  }`}
                >
                  {habit.category}
                </span>

                <span className="text-sm text-slate-400">
                  · {habit.targetMinutes} minutes
                </span>
              </div>
            </div>

            <span className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1 text-sm">
              <Flame size={16} />
              {habit.streak}
            </span>
          </div>

          {habit.completed && (
            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div className="h-2 w-full rounded-full bg-purple-500"></div>
            </div>
          )}

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => toggleHabit(habit.id)}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium hover:bg-purple-500"
            >
              {habit.completed ? "Completed ✓" : "Mark Complete"}
            </button>

            <button
              onClick={() => {
                startEdit(habit);
                setEditError("");
              }}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="rounded-lg border border-purple-500 px-4 py-2 text-sm text-purple-400 hover:bg-purple-500/10"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HabitCard; 