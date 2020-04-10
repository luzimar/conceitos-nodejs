const { isUuid } = require("uuidv4");
const repositories = require("../repositories");

function checkRepositoryExists(request, response, next) {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id == id
  );
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }
  return next();
}

function validateRepositoryId(request, response, next) {
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid repository ID" });
  }
  return next();
}

module.exports = { checkRepositoryExists, validateRepositoryId };
