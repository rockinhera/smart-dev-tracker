function Stats({ habits }) {
  const completed = habits.filter((habit) => habit.completed).length;

  const completion =
    habits.length === 0
      ? 0
      : Math.round((completed / habits.length) * 100);

  const focusMinutes = habits.reduce(
    (total, habit) => total + habit.targetMinutes,
    0
  );

  const active = habits.filter((habit) => !habit.completed).length;

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-3">
      {/* Completion */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Completion</p>

        <p className="mt-2 text-3xl font-bold text-purple-400">
          {completion}%
        </p>

        <div className="mt-4 h-2 rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-purple-500"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
      </div>

      {/* Focus Minutes */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Focus Minutes</p>

        <p className="mt-2 text-3xl font-bold text-purple-400">
          {focusMinutes}
        </p>
      </div>

      {/* Active Habits */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Active Habits</p>

        <p className="mt-2 text-3xl font-bold text-purple-400">
          {active}
        </p>
      </div>
    </div>
  );
}

export default Stats;