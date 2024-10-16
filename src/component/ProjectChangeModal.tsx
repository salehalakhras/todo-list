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
      <div className="w-3/4 h-1/2 md:w-1/2 md:h-1/2 bg-blue-900 rounded-lg shadow-xl opacity-90 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 overflow-auto flex flex-col items-center">
        <div className="text-2xl md:text-3xl font-bold text-slate-200 p-4">
          Select Project
        </div>
        {projects.map((project) => {
          if (project.id === currentProject.id) return;

          return (
            <div key={project.id} className=" w-full flex justify-around items-center pb-2">
              <div className="text-sm md:text-base text-slate-300 font-bold">{project.name}</div>
              <div className="flex gap-4">
                <button
                  className="text-sm md:text-base text-slate-300 bg-blue-500 p-1 px-2 md:px-4 md:p-1 font-bold rounded-lg shadow-lg"
                  onClick={() => {
                    setProject(project);
                    setCurrentProject(project);
                    setProjectSelectModal(false);
                  }}
                >
                  Select
                </button>
                <button
                  className="text-sm md:text-base text-slate-300 bg-red-500 p-1 px-2 md:px-4 md:p-1 font-bold rounded-lg shadow-lg"
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
          className="text-sm md:text-base text-slate-300 bg-green-600 p-1 px-2 md:px-4 md:p-1 font-bold rounded-lg shadow-lg"
          onClick={() => {
            setProjectCreateModal(true);
            setProjectSelectModal(false);
          }}
        >
          Create New Project
        </button>
        <button
          className="text-sm md:text-base text-slate-300 bg-red-500 p-1 px-2 md:px-4 md:p-1 font-bold rounded-lg shadow-lg absolute bottom-0 right-0 m-6"
          onClick={() => setProjectSelectModal(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ProjectChangeModal;
