import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import './css/AddBooksPage.css';
import constans from '../../utilities/constans';


function AddBooksPage() {
  const navigate = useNavigate();
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const [excelData, setExcelData] = useState(null);

  const handleFile=(e) =>{
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0]
    if(selectedFile){
      if(selectedFile && fileTypes.includes(selectedFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFile(e.target.result);
        }
      } 
      else{
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    } 
    else{
      console.log('please select your file');
    }
  }

  const handleFileSubmit=(e)=>{
    e.preventDefault();
    if(excelFile !== null){
      const workBook = XLSX.read(excelFile,{type: 'buffer'});
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      setExcelData(data.slice(0,10));
    }
  }


  const handleSaveBookList = async () => {
    const url = constans.API_URL_BOOK_ADD_LIST;
    if (excelData) {
      const excelToJsonData = excelData.map((item) => ({
        bookName: item.bookName,
        authorName: item.authorName,
        printingHouse: item.printingHouse,
        image: "admin resim eklemedi",
        price: item.price
      }));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(excelToJsonData)
    });
    const responseData = await response.json();

    if (response.status !== 200) {
        console.log(responseData.message);
        return;
    }

    alert('Veri kaydedildi: ');
    // navigate('/setimagepage');
    }
  };


  return (

    <div className="wrapper">
      <h3>Excel Dosyanızı 'Dosya Seç' tuşuna basarak Yükledikten sonra, yüklenen verileri görmek için Sayfada Gör tuşuna basınız. <br /> Sonrasında Kaydet tuşuna basarak
      kalıcı olarak kayıt edebilirsiniz. Kaydet tuşuna bastıktan sonra, kitapların resimlerini eklemek için bir sayfaya yönlendirileceksiniz.</h3>

      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input type="file" className="form-control" required onChange={handleFile}/>
        <button className="seen-btn">Sayfada Gör</button>
        <button className="save-btn" onClick={handleSaveBookList}>Kaydet</button>
        {typeError&&(
          <div className="alert alert-danger" role='alert'>{typeError}</div>
        )}
      </form>

      <div className="viewer">
        {excelData?(
            <div className="table-responsive">
              <table className="table">

                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key)=>(
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {excelData.map((individualExcelData, index)=>(
                    <tr key={index}>
                      {Object.keys(individualExcelData).map((key)=>(
                        <td key={key}>{individualExcelData[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ):(
            <div>Dosya Henüz Seçilmedi!</div>
          )}
      </div>


    </div>

  );
}

export default AddBooksPage