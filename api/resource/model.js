// build your `Resource` model here
const db = require("../../data/dbConfig.js");

function getResources() {
  return db("resources").select()
}

const getResourceById = (resource_id) => {
  return db("resources").where("resource_id", resource_id).first();
}

const createResource = async (newResource) => {
  const [resource] = await db("resources").insert(newResource);
  return getResourceById(resource);
}

module.exports = {
    getResources,
    getResourceById,
    createResource
}
