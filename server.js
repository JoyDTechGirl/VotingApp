const express = require("express");
const cors = require("cors");
const candidateRouter = require("./Router/candidatesRouter");
const votesRouter = require("./Router/votesRouter");

const PORT = 7070;

const app = express();

app.use(express.json());
app.use(cors());

app.use(candidateRouter);
app.use(votesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
