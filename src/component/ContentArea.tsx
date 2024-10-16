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
  const [currentProject, setCurrentProject] = React.useState<
    ProjectType | undefined
  >();
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
    <div className="flex h-full w-full flex-col p-10 md:w-3/4 lg:w-1/2">
      {currentProject ? (
        <>
          <div className="flex h-auto w-full items-center justify-between rounded-t-lg border border-blue-700 bg-blue-800 p-2 px-4 shadow-lg md:p-4">
            <div className="text-2xl font-bold text-slate-200 drop-shadow-md md:text-3xl">
              {currentProject.name}
            </div>
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="h-6 w-6 cursor-default text-slate-300 hover:scale-x-110 hover:cursor-pointer hover:text-slate-400 md:h-8 md:w-8"
              onClick={() => setTaskCreateModal(true)}
            />
            <div className="flex flex-col gap-4 md:flex-row">
              <button
                className="rounded-lg border border-blue-700 bg-blue-950 p-2 text-sm font-bold text-slate-300 shadow-lg md:text-base"
                onClick={handleChangeProject}
              >
                Change Project
              </button>
            </div>
          </div>
          <Project
            project={currentProject}
            setRefresh={setRefresh}
            refresh={refresh}
          />

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
