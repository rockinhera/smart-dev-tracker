import { Flame } from "lucide-react";
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
  return (
    <div
      className={`rounded-2xl border p-5 ${
        habit.completed
          ? "border-green-500/30 bg-green-500/10"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      {editingId === habit.id ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-purple-500"
          />

          <input
            type="number"
            min="1"
            value={editMinutes}
            onChange={(e) => setEditMinutes(e.target.value)}
            className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-purple-500"
          />

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
              onClick={() => saveEdit(habit.id)}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm hover:bg-green-500"
            >
              Save
            </button>

            <button
              onClick={() => setEditingId(null)}
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
                  habit.completed
                    ? "text-green-400"
                    : "text-white"
                }`}
              >
                {habit.title}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    habit.category === "Coding"
                      ? "bg-purple-500/20 text-purple-400"
                      : habit.category === "Health"
                      ? "bg-purple-500/20 text-purple-400"
                      : habit.category === "Reading"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {habit.category}
                </span>

                <span className="text-sm text-slate-400">
                  · {habit.targetMinutes} minutes
                </span>
              </div>
            </div>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
               <Flame size={16} />
               {habit.streak}
            </span>
          </div>

          {habit.completed && (
            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div className="h-2 w-full rounded-full bg-green-500"></div>
            </div>
          )}

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => toggleHabit(habit.id)}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium hover:bg-purple-500"
            >
              {habit.completed
                ? "Completed ✓"
                : "Mark Complete"}
            </button>

            <button
              onClick={() => startEdit(habit)}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
            >
              Edit
            </button>

            <button
         onClick={() => {
         const answer = window.confirm(
        "Are you sure you want to delete this habit?"
       );

           if (answer) {
           deleteHabit(habit.id);
         }
         }}
             className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-500"
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