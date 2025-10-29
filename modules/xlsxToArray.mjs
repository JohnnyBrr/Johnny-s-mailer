import XLSX from 'xlsx';

//* Excel file goes here
const workbook = XLSX.readFile('addressbook/template.xlsx');
let sheets = {};
let emails = [];

//* Looping through all sheets
for (let sheetName of workbook.SheetNames) {
    sheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

//* Looping through all rows in all sheets and extracting email addresses
for (let sheetName of workbook.SheetNames) {
    for (let row of sheets[sheetName]) {
        emails.push(row["ADDRESSES"]);
    }
}

console.log('📧 ', emails.length, emails.length === 1 ? ' email address found' : ' email addresses found');

export default emails;