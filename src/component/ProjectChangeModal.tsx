import React from "react";
import {
  getProjects,
  setProjects as setStorageProjects,
  setCurrentProject as setProject,
} from "./storage";
import { Project as ProjectType } from "./types/types";

const ProjectChangeModal = ({
  currentProject,
  setCurrentProject,
  setProjectSelectModal,
  setProjectCreateModal,
}: {
  currentProject: ProjectType;
  setCurrentProject: React.Dispatch<
    React.SetStateAction<ProjectType | undefined>
  >;
  setProjectSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [projects, setProjects] = React.useState<ProjectType[]>([]);

  React.useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleDeleteProject = (id: string) => {
    const projects: ProjectType[] = getProjects();
    const newProjects = projects.filter((project) => project.id !== id);
    setStorageProjects(newProjects);
    setProjects(newProjects);
  };

  return (
    <>
      <div className="absolute left-1/2 top-1/2 z-10 flex h-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-auto rounded-lg bg-blue-900 p-4 opacity-90 shadow-xl md:h-1/2 md:w-1/2">
        <div className="p-4 text-2xl font-bold text-slate-200 md:text-3xl">
          Select Project
        </div>
        {projects.map((project) => {
          if (project.id === currentProject.id) return;

          return (
            <div
              key={project.id}
              className="flex w-full items-center justify-around pb-2"
            >
              <div className="text-sm font-bold text-slate-300 md:text-base">
                {project.name}
              </div>
              <div className="flex gap-4">
                <button
                  className="rounded-lg bg-blue-500 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:p-1 md:px-4 md:text-base"
                  onClick={() => {
                    setProject(project);
                    setCurrentProject(project);
                    setProjectSelectModal(false);
                  }}
                >
                  Select
                </button>
                <button
                  className="rounded-lg bg-red-500 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:p-1 md:px-4 md:text-base"
                  onClick={() => {
                    handleDeleteProject(project.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <button
          className="rounded-lg bg-green-600 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:p-1 md:px-4 md:text-base"
          onClick={() => {
            setProjectCreateModal(true);
            setProjectSelectModal(false);
          }}
        >
          Create New Project
        </button>
        <button
          className="absolute bottom-0 right-0 m-6 rounded-lg bg-red-500 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:p-1 md:px-4 md:text-base"
          onClick={() => setProjectSelectModal(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ProjectChangeModal;
