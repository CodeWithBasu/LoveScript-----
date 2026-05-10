const fs = require('fs');
const xlsx = require('xlsx');

try {
  console.log("Reading the dataset...");
  // Load the file (xlsx handles zipped xlsx formats natively even if improperly named .csv)
  const workbook = xlsx.readFile('./lib/Quotes.csv');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert to JSON
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  console.log(`Successfully loaded ${data.length} rows from the Excel doc.`);

  // Preview the first 5 rows so I can see what columns the user provided
  console.log("--- DATA PREVIEW ---");
  console.log(JSON.stringify(data.slice(0, 5), null, 2));

} catch (error) {
  console.error("Failed to read the file:", error.message);
}
