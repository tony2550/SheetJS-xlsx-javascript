const fileUpload = document.getElementById('fileUpload');
const uploadExcel = document.getElementById('uploadExcel');
const jsonData = document.getElementById('jsonData');

const handleFile = function (e) {
  let files = e.target.files;
  let i, f;

  for (let i = 0; i < files.length; ++i) {
    let reader = new FileReader();
    let name = f.name;
    reader.onload = function (e) {
      let data = e.target.result;

      let workbook = XLSX.read(data, { type: 'binary' });

      /* DO SOMETHING WITH workbook HERE */
      // .xlsx 파일의 두번째 시트 이름 정의
      let second_sheet_name = workbook.SheetNames[1];
      // worksheet 변수에 두번째 시트 저장
      let worksheet = workbook.Sheets[second_sheet_name];
      // cell 범위 Array 선박정보 D3 ~ D 13
      const address_of_cells = [
        'D3',
        'D4',
        'D5',
        'D6',
        'D7',
        'D8',
        'D9',
        'D10',
        'D11',
        'D12',
        'D13',
      ];
      //jsonObject 정의
      let jsonObject = { basicInfo: {} };
      // address_of_cells로 for문을 돌려서 데이터 하나씩 가져오기
      for (let i = 1; i < address_of_cells.length; i++) {
        let address_of_cell = 'D' + i;
        let desired_cell = worksheet[address_of_cells[i]];
        jsonObject.basicInfo[address_of_cell] = desired_cell;
      }
      // jsonObject를 stringify() 함수로 json 데이터화하기
      console.log(JSON.stringify(jsonObject));
    };
    reader.readAsBinaryString(f);
  }
};
fileUpload.addEventListener('change', handleFile, false);
