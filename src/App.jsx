import { useEffect, useState } from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import HabitForm from "./components/HabitForm";
import HabitCard from "./components/HabitCard";

const defaultHabits = [
  {
    id: 1,
    title: "Studying",
    targetMinutes: 60,
    category: "Reading",
    completed: false,
    streak: 0,
    lastCompletedDate: null,
  },
  {
    id: 2,
    title: "Workout",
    targetMinutes: 45,
    category: "Health",
    completed: false,
    streak: 0,
    lastCompletedDate: null,
  },
  {
    id: 3,
    title: "Coding",
    targetMinutes: 90,
    category: "Coding",
    completed: false,
    streak: 0,
    lastCompletedDate: null,
  },
  {
    id: 4,
    title: "Journal",
    targetMinutes: 15,
    category: "Health",
    completed: false,
    streak: 0,
    lastCompletedDate: null,
  },
  {
    id: 5,
    title: "Read a Book",
    targetMinutes: 30,
    category: "Reading",
    completed: false,
    streak: 0,
    lastCompletedDate: null,
  },
  {
    id: 6,
    title: "Portfolio Work",
    targetMinutes: 60,
    category: "Career",
    completed: false,
    streak: 0,
    lastCompletedDate: null,
  },
];

function App() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("smartDevHabits");

    if (savedHabits) {
      return JSON.parse(savedHabits);
    }

    return defaultHabits;
  });

  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");
  const [category, setCategory] = useState("Coding");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMinutes, setEditMinutes] = useState("");
  const [editCategory, setEditCategory] = useState("Coding");

  // Save habits whenever they change
  useEffect(() => {
    localStorage.setItem(
      "smartDevHabits",
      JSON.stringify(habits)
    );
  }, [habits]);

  // Complete or uncomplete a habit
  const toggleHabit = (id) => {
    const today = new Date().toISOString().split("T")[0];

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayDate = yesterday
      .toISOString()
      .split("T")[0];

    setHabits(
      habits.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        // Complete habit
        if (!habit.completed) {
          let newStreak = 1;

          if (habit.lastCompletedDate === yesterdayDate) {
            newStreak = habit.streak + 1;
          }

          return {
            ...habit,
            completed: true,
            streak: newStreak,
            lastCompletedDate: today,
          };
        }

        // Uncomplete habit
        if (habit.lastCompletedDate === today) {
          return {
            ...habit,
            completed: false,
            streak: Math.max(0, habit.streak - 1),
            lastCompletedDate:
              habit.streak > 1
                ? yesterdayDate
                : null,
          };
        }

        return habit;
      })
    );
  };

  // Add a new habit
  const addHabit = () => {
    const numericMinutes = Number(minutes);

    if (
      title.trim() === "" ||
      !Number.isFinite(numericMinutes) ||
      numericMinutes < 1
    ) {
      return;
    }

    const newHabit = {
      id: Date.now(),
      title: title.trim(),
      targetMinutes: numericMinutes,
      category,
      completed: false,
      streak: 0,
      lastCompletedDate: null,
    };

    setHabits([...habits, newHabit]);

    setTitle("");
    setMinutes("");
    setCategory("Coding");
  };

  // Start editing
  const startEdit = (habit) => {
    setEditingId(habit.id);
    setEditTitle(habit.title);
    setEditMinutes(String(habit.targetMinutes));
    setEditCategory(habit.category);
  };

  // Save edited habit
  const saveEdit = (id) => {
    const numericMinutes = Number(editMinutes);

    if (
      editTitle.trim() === "" ||
      !Number.isFinite(numericMinutes) ||
      numericMinutes < 1
    ) {
      return false;
    }

    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            title: editTitle.trim(),
            targetMinutes: numericMinutes,
            category: editCategory,
          };
        }

        return habit;
      })
    );

    setEditingId(null);

    return true;
  };

  // Delete a habit
  const deleteHabit = (id) => {
    setHabits(
      habits.filter((habit) => habit.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <Header />

        <Stats habits={habits} />

        <HabitForm
          title={title}
          setTitle={setTitle}
          minutes={minutes}
          setMinutes={setMinutes}
          category={category}
          setCategory={setCategory}
          addHabit={addHabit}
        />

        <div>
          <h2 className="mb-4 text-2xl font-bold">
            My Habits
          </h2>

          {habits.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
              <p className="text-xl font-semibold">
                No habits yet
              </p>

              <p className="mt-2 text-slate-400">
                Add your first habit above to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  editingId={editingId}
                  editTitle={editTitle}
                  setEditTitle={setEditTitle}
                  editMinutes={editMinutes}
                  setEditMinutes={setEditMinutes}
                  editCategory={editCategory}
                  setEditCategory={setEditCategory}
                  startEdit={startEdit}
                  saveEdit={saveEdit}
                  deleteHabit={deleteHabit}
                  toggleHabit={toggleHabit}
                  setEditingId={setEditingId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 