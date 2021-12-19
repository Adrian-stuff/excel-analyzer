const crypto = require("crypto");

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(xls|XLS|xlsx|XLSX)$/)) {
    req.fileValidationError = "Only excel files are allowed!";
    return cb(new Error("Only excel files are allowed!"), false);
  }
  cb(null, true);
};

const genID = () => {
  const id = crypto.randomBytes(20).toString("hex");

  return id;
};

exports.fileFilter = fileFilter;
exports.genID = genID;
