import React from "react";
import { Task as TaskType } from "./types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faExclamationCircle,
  faSpinner,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { getProjects, setProjects } from "./storage";
import { Project as ProjectType } from "./types/types";

const Task = ({
  task,
  setRefresh,
  refresh,
}: {
  task: TaskType;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}) => {
  const handleDeleteTask = () => {
    const projects: ProjectType[] = getProjects();
    projects[task.project].tasks = projects[task.project].tasks.filter(
      (t) => t.id !== task.id,
    );
    setProjects(projects);
    setRefresh(!refresh);
  };

  const handleCompleteTask = () => {
    const projects: ProjectType[] = getProjects();
    projects[task.project].tasks = projects[task.project].tasks.map((t) => {
      if (t.id === task.id) {
        if (t.state === "Pending") {
          t.state = "Completed";
        } else {
          t.state = "Pending";
        }
      }
      return t;
    });

    setProjects(projects);
    setRefresh(!refresh);
  };
  return (
    <div className="w-full rounded-lg border border-blue-700 bg-blue-800 p-4">
      <div className="text-xl font-bold text-slate-300 md:text-2xl">
        {task.title}
      </div>
      <div className="pt-4 text-sm font-bold text-slate-300 md:text-base">
        Description:{" "}
      </div>
      <div className="pb-4 text-sm text-slate-300 md:text-base">
        {task.description}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon className="text-slate-300" icon={faCalendar} />
            <div className="text-sm font-bold text-slate-300 md:text-base">
              {task.dueDate}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              className="text-slate-300"
              icon={faExclamationCircle}
            />
            <div className="text-sm font-bold text-slate-300 md:text-base">
              {task.priority}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {task.state === "Pending" && (
              <FontAwesomeIcon
                className="text-slate-300"
                icon={faSpinner}
                spin
              />
            )}
            {task.state === "Completed" && (
              <FontAwesomeIcon
                className="text-slate-300"
                icon={faCircleCheck}
              />
            )}
            <div className="text-sm font-bold text-slate-300 md:text-base">
              {task.state}
            </div>
          </div>
        </div>
        <div className="flex gap-2 md:flex-row">
          <button
            className="rounded-lg bg-green-600 p-1 px-2 font-bold text-slate-300 shadow-lg md:p-2 md:px-4"
            onClick={handleCompleteTask}
          >
            {task.state === "Pending" ? "Complete" : "Reopen"}
          </button>
          <button
            className="rounded-lg bg-red-600 p-1 px-2 font-bold text-slate-300 shadow-lg md:p-2 md:px-4"
            onClick={handleDeleteTask}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
