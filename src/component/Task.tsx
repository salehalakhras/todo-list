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
  refresh
}: {
  task: TaskType;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}) => {


  const handleDeleteTask = () => {
    const projects: ProjectType[] = getProjects();
    projects[task.project].tasks = projects[task.project].tasks.filter(
      (t) => t.id !== task.id
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
  }
  return (
    <div className="w-full bg-blue-800 rounded-lg p-4 border border-blue-700">
      <div className="text-2xl font-bold text-slate-300">{task.title}</div>
      <div className="text-slate-300 pt-4 font-bold">Description: </div>
      <div className="text-slate-300 pb-4">{task.description}</div>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon className="text-slate-300" icon={faCalendar} />
            <div className="text-slate-300 font-bold">{task.dueDate}</div>
          </div>
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon
              className="text-slate-300"
              icon={faExclamationCircle}
            />
            <div className="text-slate-300 font-bold">{task.priority}</div>
          </div>
          <div className="flex gap-4 items-center">
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
            <div className="text-slate-300 font-bold">{task.state}</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <button className="p-2 px-4 bg-green-600 text-slate-300 rounded-lg shadow-lg font-bold"
          onClick={handleCompleteTask}>
            {task.state === "Pending" ? "Complete Task" : "Reopen Task"}
          </button>
          <button
            className="ml-4 p-2 px-4 bg-red-600 text-slate-300 rounded-lg shadow-lg font-bold"
            onClick={handleDeleteTask}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
