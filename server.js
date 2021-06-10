const express = require("express");
const app = express();
const port = 8000;
const NotesData = require("./database");
const cors = require("cors");

app.set("view engine", "pug");
app.use("/static", express.static("static"));
app.use(express.urlencoded());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000/show",
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/createNote", async (req, res) => {
  let body = req.body;
  // console.log(body);
  let d = new Date();
  let result = await new NotesData(body);
  result.date = d.toDateString();
  result.save();
  res.redirect("/show");
});

app.get("/show", async (req, res) => {
  res.render("show");
});

app.get("/getData", async (req, res) => {
  let result = await NotesData.find();
  res.json(result);
});

app.delete("/show/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await NotesData.findById(id);
    await NotesData.findByIdAndDelete(id);
    res.json(data);
    res.redirect('/show');
  } catch (error) {
    res.send({message : error.message});
  }
});


app.listen(port, () => {
  console.log(`Started on http://localhost:${port}`);
});
