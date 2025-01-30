const {createCandidate,getAllCandidates,updateCandidate} = require("../Controller/candidatesController");

const candidateRouter = require("express").Router();

candidateRouter.post("/candidates", createCandidate);
candidateRouter.get("/candidates", getAllCandidates);
candidateRouter.patch("/candidates/:id", updateCandidate);

module.exports = candidateRouter;
