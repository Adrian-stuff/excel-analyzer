require("dotenv").config();
const express = require("express");
const multer = require("multer");
const bodyparser = require("body-parser");
const helpers = require("./helpers");
const options = require("./options");
const ExcelParser = require("./excelHandler");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser());
app.use(express.static(__dirname + "/public"));

const userExcels = new Map();

app.post("/upload-file", (req, res) => {
  let upload = multer({
    storage: options.storage,
    fileFilter: helpers.fileFilter,
  }).single("excel-file");

  upload(req, res, (err) => {
    if (req.fileValidationError) {
      return res.json({ error: req.fileValidationError });
    } else if (!req.file) {
      return res.json({ error: "no file selected" });
    } else if (err instanceof multer.MulterError) {
      return res.json({ error: err });
    } else if (err) {
      return res.json({ error: err });
    }
    const id = helpers.genID();
    // console.log(id);
    userExcels.set(id, new ExcelParser());
    userExcels.get(id).init(`${req.file.destination}${req.file.filename}`);
    // console.log(`${req.file.destination}${req.file.filename}`);
    const data = { id: id, workSheets: userExcels.get(id).worksheets() };
    res.send(data);
  });
});

app.get("/get-worksheets", (req, res) => {
  const id = req.query.id;
  console.log("heres the query id", id);
  res.json(userExcels.get(id).worksheets());
});

app.get("/get-worksheet", (req, res) => {
  const { id, name } = req.query;

  console.log("heres the query id", id, name);

  res.json(userExcels.get(id).excelJson(name));
});

app.get("/get-column", (req, res) => {
  const { id, name } = req.query;

  console.log("heres the query id", id, name);

  res.json(userExcels.get(id).getColumn(name));
});

app.get("/get-columns", (req, res) => {
  const { id, name } = req.query;
  console.log("heres the query id", id, name);

  res.json(userExcels.get(id).getColumns(name));
});

app.get("/download", function (req, res) {
  const file = `${__dirname}/SampleData.xlsx`;
  res.download(file); // Set disposition and send it.
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
