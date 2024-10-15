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
    })

    setProjects(projects);
    setTaskCreateModal(false);
  };

  return (
    <div className="w-3/4 h-3/4 md:w-2/3 md:h-2/3 bg-blue-900 rounded-lg shadow-xl opacity-90 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 p-4">
      <div className="text-2xl md:text-3xl font-bold text-slate-200 p-4">
        Add Task
      </div>

      <input
        type="text"
        placeholder="Task Title"
        className="text-slate-300 bg-blue-950 px-4 py-1 font-bold rounded-lg shadow-lg border border-blue-700 w-3/4 md:w-1/3"
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <input
        placeholder="Task Due Date"
        type="text"
        onFocus={(e) => (e.target.type = "date")}
        className="text-slate-300 bg-blue-950 px-4 py-1 font-bold rounded-lg shadow-lg border border-blue-700 w-3/4 md:w-1/3"
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />

      <legend className="text-slate-300 font-bold">Task Priority</legend>

      <div className="flex gap-4">
        <label htmlFor="h-priority" className="text-red-600 font-bold">
          High
        </label>
        <input
          type="radio"
          name="priority"
          id="h-priority"
          value="High"
          className=" text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        />

        <label htmlFor="m-priority" className="text-yellow-600 font-bold">Medium</label>
        <input
          type="radio"
          name="priority"
          id="m-priority"
          value="Medium"
          className="text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        />
        <label htmlFor="l-priority" className="text-green-600 font-bold">Low</label>
        <input
          type="radio"
          name="priority"
          id="l-priority"
          value="Low"
          className="text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        />
      </div>

      <textarea
        placeholder="Task Description"
        className="text-slate-300 bg-blue-950 px-4 py-1 font-bold rounded-lg shadow-lg border border-blue-700 w-3/4 md:w-1/3 h-1/3"
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <button
        className="text-slate-300 bg-green-500 px-4 py-1 font-bold rounded-lg shadow-lg"
        onClick={handleAddTask}
      >
        Add Task
      </button>

      <button
        className="text-slate-300 bg-red-500 px-4 py-1 font-bold rounded-lg shadow-lg absolute bottom-0 right-0 m-6"
        onClick={() => setTaskCreateModal(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default TaskCreateModal;
