const {addVote,getAllVotes,getTotalVotes,getWinner} = require("../Controller/votesController");

const voteRouter = require("express").Router();

voteRouter.post("/vote/:id", addVote);

voteRouter.get("/vote",getAllVotes);
voteRouter.get("/vote", getTotalVotes);
voteRouter.get("/winner", getWinner);

module.exports = voteRouter;
