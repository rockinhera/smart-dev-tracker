import { useState } from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import HabitForm from "./components/HabitForm";
import HabitCard from "./components/HabitCard";

function App() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      title: "Studying",
      targetMinutes: 60,
      category: "Reading",
      completed: false,
      streak: 0,
    },
    {
      id: 2,
      title: "Workout",
      targetMinutes: 45,
      category: "Health",
      completed: false,
      streak: 0,
    },
    {
      id: 3,
      title: "Coding",
      targetMinutes: 90,
      category: "Coding",
      completed: false,
      streak: 0,
    },
    {
      id: 4,
      title: "Journal",
      targetMinutes: 15,
      category: "Health",
      completed: false,
      streak: 0,
    },
    {
      id: 5,
      title: "Read a Book",
      targetMinutes: 30,
      category: "Reading",
      completed: false,
      streak: 0,
    },
    {
      id: 6,
      title: "Portfolio Work",
      targetMinutes: 60,
      category: "Career",
      completed: false,
      streak: 0,
    },
  ]);

  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");
  const [category, setCategory] = useState("Coding");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMinutes, setEditMinutes] = useState("");
  const [editCategory, setEditCategory] = useState("Coding");

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            completed: !habit.completed,
            streak: habit.completed
              ? Math.max(0, habit.streak - 1)
              : habit.streak + 1,
          };
        }

        return habit;
      })
    );
  };

  const addHabit = () => {
    if (title.trim() === "" || Number(minutes) < 1) {
      return;
    }

    const newHabit = {
      id: Date.now(),
      title: title.trim(),
      targetMinutes: Number(minutes),
      category: category,
      completed: false,
      streak: 0,
    };

    setHabits([...habits, newHabit]);

    setTitle("");
    setMinutes("");
    setCategory("Coding");
  };

  const startEdit = (habit) => {
    setEditingId(habit.id);
    setEditTitle(habit.title);
    setEditMinutes(habit.targetMinutes);
    setEditCategory(habit.category);
  };

  const saveEdit = (id) => {
    if (editTitle.trim() === "" || Number(editMinutes) < 1) {
      return;
    }

    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            title: editTitle.trim(),
            targetMinutes: Number(editMinutes),
            category: editCategory,
          };
        }

        return habit;
      })
    );

    setEditingId(null);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
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