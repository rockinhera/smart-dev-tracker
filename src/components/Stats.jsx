function Stats({ habits }) {
  const completedHabits = habits.filter(
    (habit) => habit.completed
  );

  const completionPercentage =
    habits.length === 0
      ? 0
      : Math.round(
          (completedHabits.length / habits.length) * 100
        );

  const totalFocusMinutes = habits.reduce(
    (total, habit) => total + habit.targetMinutes,
    0
  );

  const activeHabits = habits.filter(
    (habit) => !habit.completed
  ).length;

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-3">

      <div className="rounded-2xl border border-purple-500/20 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Completion
        </p>

        <p className="mt-2 text-3xl font-bold text-purple-400">
          {completionPercentage}%
        </p>

        <div className="mt-4 h-2 rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-purple-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-500/20 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Focus Minutes
        </p>

        <p className="mt-2 text-3xl font-bold text-purple-400">
          {totalFocusMinutes}
        </p>
      </div>

      <div className="rounded-2xl border border-green-500/20 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">
          Active Habits
        </p>

        <p className="mt-2 text-3xl font-bold text-purple-400">
          {activeHabits}
        </p>
      </div>

    </div>
  );
}

export default Stats; 