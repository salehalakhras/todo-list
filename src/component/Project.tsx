import React from "react";
import { Project as ProjectType } from "./types/types";
import Task from "./Task";
import TaskCreateModal from "./TaskCreateModal";

const Project = ({
  project,
  refresh,
  setRefresh,
}: {
  project: ProjectType;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [taskCreateModal, setTaskCreateModal] = React.useState(false);

  const handleTaskCreate = () => {
    setTaskCreateModal(true);
  };

  React.useEffect(() => {
    project.tasks.sort((a, b) => {
      if (a.dueDate < b.dueDate) {
        return -1;
      }
      if (a.dueDate > b.dueDate) {
        return 1;
      }
      return 0;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.tasks]);

  return (
    <>
      {project.tasks.length == 0 ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full pt-2 text-center text-2xl font-bold text-slate-300">
            No Tasks for this Project
          </div>
          <button
            className="rounded-lg border border-blue-700 bg-blue-950 px-4 py-1 font-bold text-slate-300 shadow-lg"
            onClick={handleTaskCreate}
          >
            Add Task
          </button>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2 overflow-auto pt-2">
          {project.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              setRefresh={setRefresh}
              refresh={refresh}
            ></Task>
          ))}
        </div>
      )}

      {taskCreateModal && (
        <TaskCreateModal
          project={project}
          setTaskCreateModal={setTaskCreateModal}
        ></TaskCreateModal>
      )}
    </>
  );
};

export default Project;
