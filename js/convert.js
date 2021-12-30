let selectedFile;
const fileUpload = document.getElementById('fileUpload');
const uploadExcel = document.getElementById('uploadExcel');
const jsonData = document.getElementById('jsonData');

fileUpload.addEventListener('change', function (event) {
  selectedFile = event.target.files[0];
});

uploadExcel.addEventListener('click', function () {
  if (selectedFile) {
    // console.log();
    let fileReader = new FileReader();
    fileReader.onload = function (event) {
      let data = event.target.result;

      let workbook = XLSX.read(data, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        let jsonObject = JSON.stringify(rowObject);
        jsonData.innerHTML = jsonObject;
        console.log(jsonObject);
      });
    };
    fileReader.readAsBinaryString(selectedFile);
  }
});
