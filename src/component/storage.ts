import { Project } from "./types/types";

export const initStorage = () => {
  if (localStorage.getItem("projects") === null) {
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("currentProject", JSON.stringify(projects[0]));
  }
};

export const getCurrentProject = (): Project => {
  return JSON.parse(localStorage.getItem("currentProject")!);
};

export const setCurrentProject = (project: Project) => {
  localStorage.setItem("currentProject", JSON.stringify(project));
};

export const getProjects = (): Project[] => {
  return JSON.parse(localStorage.getItem("projects")!);
};

export const setProjects = (projects: Project[]) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

export const projects: Project[] = [
  {
    id: "0",
    name: "Project 1",
    tasks: [
      {
        id: "1",
        title: "Task 1",
        description:
          '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        dueDate: "2022-01-01",
        priority: "High",
        state: "Pending",
        project: 0,
      },
      {
        id: "2",
        title: "Task 2",
        description:
          '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        dueDate: "2022-01-01",
        priority: "High",
        state: "Pending",
        project: 0,
      },
      {
        id: "3",
        title: "Task 3",
        description:
          '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        dueDate: "2022-01-01",
        priority: "High",
        state: "Pending",
        project: 0,
      },
    ],
  },
];
