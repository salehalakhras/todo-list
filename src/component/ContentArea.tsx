import React from "react";
import { getCurrentProject, getProjects } from "./storage";
import Project from "./Project";
import ProjectChangeModal from "./ProjectChangeModal";
import ProjectCreateModal from "./ProjectCreateModal";
import { Project as ProjectType } from "./types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TaskCreateModal from "./TaskCreateModal";

const ContentArea = () => {
  const [refresh, setRefresh] = React.useState(false);
  const [currentProject, setCurrentProject] = React.useState<ProjectType | undefined>();
  const [projectSelectModal, setProjectSelectModal] = React.useState(false);
  const [projectCreateModal, setProjectCreateModal] = React.useState(false);
  const [taskCreateModal, setTaskCreateModal] = React.useState(false);

  React.useEffect(() => {
    const project: ProjectType = getCurrentProject();
    const projects: ProjectType[] = getProjects();
    projects.forEach((p) => {
      if (p.id === project.id) {
        setCurrentProject(p);
      }
    });

  }, [refresh]);

  const handleChangeProject = () => {
    setProjectSelectModal(true);
  };

  return (
    <div className="w-full h-full flex flex-col p-10 md:w-3/4 lg:w-1/2">
      {currentProject ? (
        <>
          <div className="w-full h-auto p-4 bg-blue-800 shadow-lg border border-blue-700 flex items-center justify-between rounded-t-lg">
            <div className="text-3xl font-bold text-slate-200 drop-shadow-md">
              {currentProject.name}
            </div>
            <FontAwesomeIcon icon={faPlusCircle} className="text-slate-300 w-8 h-8 cursor-default hover:text-slate-400 hover:cursor-pointer hover:scale-x-110 " onClick={() => setTaskCreateModal(true)}/>
            <div className="flex gap-4 flex-col md:flex-row">
              <button
                className="text-slate-300 bg-blue-950 p-2 font-bold rounded-lg shadow-lg border border-blue-700"
                onClick={handleChangeProject}
              >
                Change Project
              </button>
            </div>
          </div>
          <Project project={currentProject} setRefresh={setRefresh} refresh={refresh} />

          {projectSelectModal && (
            <ProjectChangeModal
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              setProjectSelectModal={setProjectSelectModal}
              setProjectCreateModal={setProjectCreateModal}
            ></ProjectChangeModal>
          )}

          {projectCreateModal && (
            <ProjectCreateModal
              setCurrentProject={setCurrentProject}
              setProjectCreateModal={setProjectCreateModal}
            ></ProjectCreateModal>
          )}

          {taskCreateModal && (
            <TaskCreateModal
              project={currentProject}
              setTaskCreateModal={setTaskCreateModal}
            ></TaskCreateModal>
          )}
        </>
      ) : (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      )}
    </div>
  );
};

export default ContentArea;
