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
          <div className="w-full pt-2 text-2xl text-slate-300 font-bold text-center">
            No Tasks for this Project
          </div>
          <button
            className="text-slate-300 bg-blue-950 px-4 py-1 font-bold rounded-lg shadow-lg border border-blue-700"
            onClick={handleTaskCreate}
          >
            Add Task
          </button>
        </div>
      ) : (
        <div className="w-full pt-2 flex flex-col gap-2 overflow-auto">
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
