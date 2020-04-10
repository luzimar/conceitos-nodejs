const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const {
  validateRepositoryId,
  checkRepositoryExists,
} = require("./middlewares/validateRepository");
const repositories = require("./repositories");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/repositories/:id", validateRepositoryId, checkRepositoryExists);

function getRepositoryIndex(id) {
  return repositories.findIndex((repository) => repository.id == id);
}

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = getRepositoryIndex(id);
  const { likes } = repositories[repositoryIndex];
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = getRepositoryIndex(id);
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = getRepositoryIndex(id);
  const repository = repositories[repositoryIndex];
  repository.likes += 1;
  return response.json(repository);
});

module.exports = app;
