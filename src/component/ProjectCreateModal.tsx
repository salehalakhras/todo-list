import React from "react";
import { Project as ProjectType } from "./types/types";
import { getProjects, setProjects } from "./storage";

const ProjectCreateModal = ({
  setCurrentProject,
  setProjectCreateModal,
}: {
  setCurrentProject: React.Dispatch<React.SetStateAction<ProjectType | undefined>>;
  setProjectCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [projectName, setProjectName] = React.useState("");

  const handleCreateProject = () => {
    const projects: ProjectType[] = getProjects();

    const project: ProjectType = {
      id: (projects.length).toString(),
      name: projectName,
      tasks: [],
    };

    setCurrentProject(project);
    setProjectCreateModal(false);

    projects.push(project);

    setProjects(projects);
  };

  return (
    <div className="w-1/2 h-2/5  md:w-2/5 md:h-1/3 lg:w-1/3 bg-blue-900 rounded-lg shadow-xl opacity-90 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
      <div className="text-center md:text-left text-2xl md:text-3xl font-bold text-slate-200 p-4">
        Create New Project
      </div>
      <input
        type="text"
        placeholder="Project Name"
        className="text-sm md:text-base text-slate-300 bg-blue-950 p-1 px-2 md:px-4 md:p-1 font-bold rounded-lg shadow-lg border border-blue-700 w-3/4"
        onChange={(e) => setProjectName(e.target.value)}
        value={projectName}
      />
      <button className="text-sm md:text-base text-slate-300 bg-blue-500 p-1 px-2 md:px-4 md:p-1 font-bold rounded-lg shadow-lg"
      onClick={handleCreateProject}
      >Create Project</button>

      <button
        className="text-sm md:text-base text-slate-300 bg-red-500 p-1 px-2 md:px-4 md:p-1 font-bold rounded-lg shadow-lg absolute bottom-0 right-0 m-6"
        onClick={() => setProjectCreateModal(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default ProjectCreateModal;
