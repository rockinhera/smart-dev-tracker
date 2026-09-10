import { useState } from "react";

function HabitForm({
  title,
  setTitle,
  minutes,
  setMinutes,
  category,
  setCategory,
  addHabit,
}) {
  const [showError, setShowError] = useState(false);
  const [minutesError, setMinutesError] = useState(false);

  const handleAdd = () => {
    const numericMinutes = Number(minutes);

    if (title.trim() === "") {
      setShowError(true);
    } else {
      setShowError(false);
    }

    if (
      !Number.isFinite(numericMinutes) ||
      numericMinutes < 1
    ) {
      setMinutesError(true);
    } else {
      setMinutesError(false);
    }

    if (
      title.trim() === "" ||
      !Number.isFinite(numericMinutes) ||
      numericMinutes < 1
    ) {
      return;
    }

    addHabit();
  };

  return (
    <div className="mb-8 border border-slate-800 bg-slate-900 p-5 rounded-xl">
      <h2 className="mb-4 text-xl font-semibold">
        Add a new habit
      </h2>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <input
            type="text"
            placeholder="Habit name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setShowError(false);
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-purple-500"
          />

          {showError && (
            <p className="mt-1 text-sm text-red-400">
              You need to fill this out.
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            min="1"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => {
              setMinutes(e.target.value);
              setMinutesError(false);
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-purple-500"
          />

          {minutesError && (
            <p className="mt-1 text-sm text-red-400">
              Please enter a valid number of minutes.
            </p>
          )}
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none focus:border-purple-500"
        >
          <option value="Coding">Coding</option>
          <option value="Health">Health</option>
          <option value="Reading">Reading</option>
          <option value="Career">Career</option>
        </select>
      </div>

      <button
        onClick={handleAdd}
        className="mt-4 rounded-lg bg-purple-600 px-5 py-2 font-medium transition hover:bg-purple-500"
      >
        + Add Habit
      </button>
    </div>
  );
}

export default HabitForm;