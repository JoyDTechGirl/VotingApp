const { candidates } = require("../models");

const { v4: uuidv4 } = require("uuid");

exports.createCandidate = async (req, res) => {
  try {
    const data = {
      id: uuidv4(),
      candidateName: req.body.candidatesName,
      candidateParty: req.body.candidatesParty,
      Email: req.body.Email,
      votes: req.body.votes,
    };
    const newCandidates = await candidates.create(data);
    res.status(201).json({
      message: `Candidates created successfully`,
      data: newCandidates,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error creating candidate`, error: err.message });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const candidate = await candidates.findAll();
    res
      .status(200)
      .json({
        message: `Kindly Get All Candidates`,
        "total number of candidates": candidate.length,
        data: candidate,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error fetching Candidates`, error: err.message });
  }
};

exports.updateCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidates.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    const newInfo = await candidates.update({
      CandidatesName: req.body.CandidatesName,
      CandidatesParty: req.body.CandidatesParty,
    });
    res.status(200).json({
      message: `Kindly find the candidates with the above id`,
      data: candidate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating candidate", error: error.message });
  }
};
