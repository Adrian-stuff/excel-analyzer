const xlsx = require("node-xlsx");

module.exports = class ExcelParser {
  init(fileDir) {
    this.worksheet = xlsx.parse(fileDir, {
      raw: false,
    });
  }

  excelJson(name) {
    // console.log(
    //   "here",
    //   this.worksheet.find((x) => x.name === name)
    // );
    return this.worksheet.find((x) => x.name === name);
  }

  worksheets() {
    const arrayNames = this.worksheet.map((i) => i.name);
    return arrayNames;
  }

  getColumns(name) {
    console.log("====================================");
    console.log(this.excelJson(name));
    console.log("====================================");
    return this.excelJson(name).data[0].map((x) => x);
  }

  getColumn(name) {
    let parentArray = {};
    this.excelJson(name).data[0].map((y, n) => {
      let childArray = this.excelJson(name).data.map((x) => x[n]);
      let copyArr = childArray.slice();
      parentArray[copyArr[0]] = childArray.filter((x) => x !== copyArr[0]);
    });
    return parentArray;
  }
};
