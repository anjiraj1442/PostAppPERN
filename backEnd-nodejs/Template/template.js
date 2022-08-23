console.log("hello world");
const XlsxPopulate = require('xlsx-populate');

var prepareTemplateSheet = function main(){
    XlsxPopulate.fromBlankAsync()
    .then(workbook => {
        // Modify the workbook.
        workbook.sheet("Sheet1").cell("A1").value("This is neat!");
 
        // Write to file.
        return workbook.toFileAsync("./out.xlsx");
    });   
}
 module.exports = prepareTemplateSheet;

