import React from "react";
import { Project as ProjectType } from "./types/types";
import { Task as TaskType } from "./types/types";
import { getProjects, setProjects } from "./storage";

const TaskCreateModal = ({
  project,
  setTaskCreateModal,
}: {
  project: ProjectType;
  setTaskCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [task, setTask] = React.useState({} as TaskType);

  const handleAddTask = () => {
    const projects: ProjectType[] = getProjects();

    const t: TaskType = {
      id: Math.random().toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      state: "Pending",
      project: parseInt(project.id),
    };

    project.tasks.push(t);

    projects.forEach((p) => {
      if (p.id === project.id) {
        p.tasks = project.tasks;
      }
    });

    setProjects(projects);
    setTaskCreateModal(false);
  };

  return (
    <div className="absolute left-1/2 top-1/2 z-10 flex h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded-lg bg-blue-900 p-4 opacity-90 shadow-xl md:h-2/3 md:w-2/3">
      <div className="p-4 text-2xl font-bold text-slate-200 md:text-3xl">
        Add Task
      </div>

      <input
        type="text"
        placeholder="Task Title"
        className="w-3/4 rounded-lg border border-blue-700 bg-blue-950 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:w-1/3 md:p-1 md:px-4 md:text-base"
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <input
        placeholder="Task Due Date"
        type="text"
        onFocus={(e) => (e.target.type = "date")}
        className="w-3/4 rounded-lg border border-blue-700 bg-blue-950 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:w-1/3 md:p-1 md:px-4 md:text-base"
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />

      <legend className="text-sm font-bold text-slate-300 md:text-base">
        Task Priority
      </legend>

      <div className="flex gap-4">
        <label
          htmlFor="h-priority"
          className="text-sm font-bold text-red-600 md:text-base"
        >
          High
        </label>
        <input
          type="radio"
          name="priority"
          id="h-priority"
          value="High"
          className="border-gray-300 bg-gray-100 text-red-600 focus:ring-2 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-red-600"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        />

        <label
          htmlFor="m-priority"
          className="text-sm font-bold text-yellow-600 md:text-base"
        >
          Medium
        </label>
        <input
          type="radio"
          name="priority"
          id="m-priority"
          value="Medium"
          className="border-gray-300 bg-gray-100 text-yellow-400 focus:ring-2 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-yellow-600"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        />
        <label
          htmlFor="l-priority"
          className="text-sm font-bold text-green-600 md:text-base"
        >
          Low
        </label>
        <input
          type="radio"
          name="priority"
          id="l-priority"
          value="Low"
          className="border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        />
      </div>

      <textarea
        placeholder="Task Description"
        className="h-1/3 w-3/4 rounded-lg border border-blue-700 bg-blue-950 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:w-1/3 md:p-1 md:px-4 md:text-base"
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <button
        className="rounded-lg bg-green-500 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:p-1 md:px-4 md:text-base"
        onClick={handleAddTask}
      >
        Add Task
      </button>

      <button
        className="absolute bottom-0 right-0 m-6 rounded-lg bg-red-500 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:p-1 md:px-4 md:text-base"
        onClick={() => setTaskCreateModal(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default TaskCreateModal;
