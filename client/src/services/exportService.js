
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { Notification, Message } from 'element-ui'

export default {
  toXLS: (JSONData, ReportTitle) => {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var table =  document.createElement('table')
    var thead = document.createElement('thead')
    thead.style.backgroundColor = 'red'
    var head = document.createElement('tr')
    var tbody = document.createElement('tbody')
    for(let prop in arrData[0]){
        var th = document.createElement('th')
        th.innerHTML = prop
        head.appendChild(th)
    }
    thead.appendChild(head)
    table.appendChild(thead)
    for(let prop in arrData){
        var row = document.createElement('tr')
        for(let prop2 in arrData[prop]){
            var td = document.createElement('td')
            td.innerHTML = arrData[prop][prop2]
            row.appendChild(td)
        }
        tbody.appendChild(row)
    }

    table.appendChild(tbody)

   console.log(table)
 

    
    tableToExcel(table, ReportTitle);
    








     /* var CSV = '';    
      //Set Report title in first row or line
      
      CSV += ReportTitle + '\r\n\n';
  
      //This condition will generate the Label/Header
      if (ShowLabel) {
          var row = "";
          
          //This loop will extract the label from 1st index of on array
          for (var index in arrData[0]) {
              
              //Now convert each value to string and comma-seprated
              row += index + ',';
          }
  
          row = row.slice(0, -1);
          
          //append Label row with line break
          CSV += row + '\r\n';
      }
      
      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
          var row = "";
          
          //2nd loop will extract each column and convert it in string comma-seprated
          for (var index in arrData[i]) {
              row += '"' + arrData[i][index] + '",';
          }
  
          row.slice(0, row.length - 1);
          
          //add a line break after each row
          CSV += row + '\r\n';
      }
  
      if (CSV == '') {        
          alert("Invalid data");
          return;
      }   
      
      //Generate a file name
      var fileName = "MyReport_";
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName = ReportTitle.replace(/ /g,"_");   
      
      //Initialize file format you want csv or xls
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
      
      // Now the little tricky part.
      // you can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension    
      
      //this trick will generate a temp <a /> tag
      var link = document.createElement("a");    
      link.href = uri;
      
      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";
      
      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);*/
  },

    
}
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
return function (table, name) {
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
    var blob = new Blob([format(template, ctx)]);
    var blobURL = window.URL.createObjectURL(blob);
     //this trick will generate a temp <a /> tag
     var link = document.createElement("a");    
     link.href = uri + base64(format(template, ctx))
     
     //set the visibility hidden so it will not effect on your web-layout
     link.style = "visibility:hidden";
     link.download = name + ".xls";
     
     //this part will append the anchor tag and remove it after automatic click
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
   
    
}
    
     
    

})();