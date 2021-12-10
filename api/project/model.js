// build your `Project` model here
const db = require("../../data/dbConfig.js");

const getProjects = async () => {
  const projects = await db("projects") // setting the database into a variable
  return projects.map((project) => { // mapping over the database 
    return ({
      ...project,
      project_completed: project.project_completed === 1
    })
  })
}

const getProjectById = async (project_id) => {
  const rows = await  db("projects").where("project_id", project_id).first();
  return ({
    ...rows,
    project_completed: rows.project_completed ? true : false
  })
};

const createProject = async (newProject) => {
  const [project] = await db("projects").insert(newProject);
  return getProjectById(project);
}

module.exports = {
  getProjects,
  getProjectById,
  createProject
};
