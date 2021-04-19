const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const Author = require("./models/Author");

app.use(bodyParser.json());

app.get("/authors", async (req, res) => {
  const authors = await Author.gerAll();

  res.status(200).json(authors);
});

app.get("/authors/:id", async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);

  if (!author) return res.status(404).json({ message: "Author not found" });
  res.status(200).json(author);
});

app.post("/authors", async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  const author = await Author.findByName(first_name, middle_name, last_name);

  console.log(author);

  if (author)
    return res
      .status(404)
      .json(`${author.fullName} já existe no banco de dados!`);

  await Author.create(first_name, middle_name, last_name);

  res.status(201).json({ message: "Author criado com sucesso!" });
});

app.listen(port, () => console.log("listening on port 3000"));
