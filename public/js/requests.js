const requestWorksheet = (name) => {
  fetch(`/get-worksheet?id=${id}&name=${name}`)
    .then((res) => res.json())
    .then((res) => {
      excelJson = res;
      console.log(res);
      graphDiv.hidden = false;
      // showTable();
    });
};

const getWorksheets = () => {
  console.log(localStorage.getItem("id"));
  fetch(`/get-worksheets?id=${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};

const upload = (file) => {
  console.log(file);
  fetch("/upload-file", {
    method: "POST",
    body: file,
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("id", res.id);
      workSheets = res.workSheets;
      console.log(res);
      worksheet.hidden = false;
      showWorksheets();
    });
};

const getColumns = (name) => {
  fetch(`/get-columns?id=${id}&name=${name}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      columns = res;
      showSelectionsCol();
    });
  fetch(`/get-column?id=${id}&name=${name}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      columnJson = res;
    });
};
