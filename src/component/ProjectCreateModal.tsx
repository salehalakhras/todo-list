import React from "react";
import { Project as ProjectType } from "./types/types";
import { getProjects, setProjects } from "./storage";

const ProjectCreateModal = ({
  setCurrentProject,
  setProjectCreateModal,
}: {
  setCurrentProject: React.Dispatch<
    React.SetStateAction<ProjectType | undefined>
  >;
  setProjectCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [projectName, setProjectName] = React.useState("");

  const handleCreateProject = () => {
    const projects: ProjectType[] = getProjects();

    const project: ProjectType = {
      id: projects.length.toString(),
      name: projectName,
      tasks: [],
    };

    setCurrentProject(project);
    setProjectCreateModal(false);

    projects.push(project);

    setProjects(projects);
  };

  return (
    <div className="absolute left-1/2 top-1/2 z-10 flex h-2/5 w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 rounded-lg bg-blue-900 opacity-90 shadow-xl md:h-1/3 md:w-2/5 lg:w-1/3">
      <div className="p-4 text-center text-2xl font-bold text-slate-200 md:text-left md:text-3xl">
        Create New Project
      </div>
      <input
        type="text"
        placeholder="Project Name"
        className="w-3/4 rounded-lg border border-blue-700 bg-blue-950 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:p-1 md:px-4 md:text-base"
        onChange={(e) => setProjectName(e.target.value)}
        value={projectName}
      />
      <button
        className="rounded-lg bg-blue-500 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:p-1 md:px-4 md:text-base"
        onClick={handleCreateProject}
      >
        Create Project
      </button>

      <button
        className="absolute bottom-0 right-0 m-6 rounded-lg bg-red-500 p-1 px-2 text-sm font-bold text-slate-300 shadow-lg md:p-1 md:px-4 md:text-base"
        onClick={() => setProjectCreateModal(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default ProjectCreateModal;
