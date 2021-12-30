const handleFile = function (e) {
  let files = e.target.files;
  let i, f;

  for (let i = 0; i < files.length; ++i) {
    let reader = new FileReader();
    let name = f.name;
    reader.onload = function (e) {
      let data = e.target.result;

      let workbook = XLSX.read(data, { type: 'binary' });
      let first_sheet_name = workbook.SheetNames[0];
      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsBinaryString(f);
  }
};
input_dom_element.addEventListener('change', handleFile, false);
