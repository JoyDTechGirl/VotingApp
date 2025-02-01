const { candidates } = require("../models");
const { votes } = require("../models");
const { v4: uuidv4 } = require("uuid");

// console.log(votes);

exports.addVote = async (req, res) => {
  try {
    const candidateId = req.body.id;
    const candidate = await candidates.findByPk(candidateId);

    if (!candidate) {
      return res.status(404).json("Candidate not found");
    }

    const regVote = await votes.create({
      id: uuidv4(),
      candidatesId: candidateId,
      NoOfVotes: 1,
    });

    candidate.votes += 0; 
    await candidate.save();

    const updatedCandidate = await candidates.findByPk(candidateId);

    res.status(200).json({
      message: "Vote added successfully",
      candidate: {
        id: updatedCandidate.id,
        name: updatedCandidate.name,
        totalVotes: updatedCandidate.votes,
      },
      vote: regVote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



exports.getAllVotes = async (req, res) => {
  try {
    const allCandidates = await candidates.findAll({
      attributes: ["id", "candidatesName", "votes"],
    });

    if (!allCandidates) {
      return res.status(404).json({ error: "No candidates found"});
    }

    res.status(200).json({
      message: "Votes retrieved successfully",
      candidates: allCandidates,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTotalVotes = async (req, res) => {
  try {
    const totalVotes = await candidates.sum("votes");

    if (totalVotes === null || totalVotes === 0) {
      return res.status(404).json({ error: "No votes found" });
    }

    res.status(200).json({
      message: `Total votes cast: ${totalVotes}`,
      totalVotes: totalVotes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



exports.getWinner = async (req, res) => {
  try {
    const topCandidate = await candidates.findOne({
      order: [["votes", "DESC"]],
    });

    if (!topCandidate) {
      return res.status(404).json({ error: "No candidates found" });
    }

    const highestVotes = topCandidate.votes;

    const tiedCandidates = await candidates.findAll({
      where: { votes: highestVotes },
      order: [["createdAt", "ASC"]],
    });

    const winner = tiedCandidates[0];

    if (tiedCandidates.length > 1) {
      return res.status(200).json({
        message:
          "A tie occurred. The first registered candidate is declared the winner.",
        winner: {
          name: winner.name,
          NoOfVotes: winner.votes,
        },
        tiedCandidates,
      });
    }

    res.status(200).json({
      message: `The winner is: ${winner.name}, with ${winner.votes} votes.`,
      winner: {
        name: winner.name,
        NoOfVotes: winner.votes,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
