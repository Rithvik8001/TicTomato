"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pause, Play, RotateCcw } from "lucide-react";
import { ThemeProvider, useTheme } from "@/app/context/ThemeContext";
import { Navbar } from "@/components/NavBar";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

function TicTomatoContent() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const { theme } = useTheme();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  const setTimer = (minutes: number) => {
    setIsActive(false);
    setTime(minutes * 60);
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div
          className={`p-8 rounded-3xl shadow-md w-96 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="mb-8">
            <div
              className={`text-6xl font-bold text-center mb-4 ${
                theme === "dark" ? "text-gray-100" : "text-gray-700"
              }`}
            >
              {formatTime(time)}
            </div>
            <div className="flex justify-center space-x-2 mb-4">
              <Button
                onClick={() => setTimer(5)}
                variant="outline"
                className={
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
              >
                5min
              </Button>
              <Button
                onClick={() => setTimer(15)}
                variant="outline"
                className={
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
              >
                15min
              </Button>
              <Button
                onClick={() => setTimer(25)}
                variant="outline"
                className={
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
              >
                25min
              </Button>
            </div>
            <div className="flex justify-center space-x-2">
              {!isActive ? (
                <Button
                  onClick={handleStart}
                  className={
                    theme === "dark"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }
                >
                  <Play className="mr-2 h-4 w-4" /> Start
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  className={
                    theme === "dark"
                      ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  }
                >
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </Button>
              )}
              <Button
                onClick={handleReset}
                variant="outline"
                className={
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>

          {/* Todo List */}
          <div>
            <h2
              className={`text-xl font-semibold mb-2 ${
                theme === "dark" ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Tasks
            </h2>
            <form onSubmit={addTask} className="flex mb-4">
              <Input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className={`flex-grow mr-2 ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-100 placeholder-gray-400"
                    : "bg-white text-gray-900 placeholder-gray-500"
                }`}
              />
              <Button
                type="submit"
                className={
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }
              >
                Add
              </Button>
            </form>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between p-2 rounded ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className={`rounded ${
                        theme === "dark"
                          ? "bg-gray-600 border-gray-500"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    <span
                      className={
                        task.completed
                          ? `line-through ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`
                          : `${
                              theme === "dark"
                                ? "text-gray-100"
                                : "text-gray-700"
                            }`
                      }
                    >
                      {task.text}
                    </span>
                  </div>
                  <Button
                    onClick={() => removeTask(task.id)}
                    variant="ghost"
                    size="sm"
                    className={
                      theme === "dark"
                        ? "text-gray-300 hover:text-gray-100 hover:bg-gray-600"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                    }
                    aria-label="Delete task"
                  >
                    &times;
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TicTomato() {
  return (
    <ThemeProvider>
      <TicTomatoContent />
    </ThemeProvider>
  );
}
