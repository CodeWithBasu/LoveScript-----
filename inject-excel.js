const fs = require('fs');
const xlsx = require('xlsx');

try {
  console.log("Reading the excel dataset...");
  const workbook = xlsx.readFile('./lib/Quotes.csv');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert to JSON
  const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
  // Remove the header row
  const data = rows.slice(1).filter(row => row.length > 0);
  
  console.log(`Successfully parsed ${data.length} quotes.`);

  // Build the massive new TypeScript string that matches your Velora JSON format
  let tsOutput = `import { ReactNode } from "react";\n\n`;
  
  tsOutput += `export interface Book {\n`;
  tsOutput += `  amazon_in_product_url: string;\n`;
  tsOutput += `  title: string;\n`;
  tsOutput += `  author: string;\n`;
  tsOutput += `  published_date: string | null;\n`;
  tsOutput += `  mrp: number | null;\n`;
  tsOutput += `  genre: string;\n`;
  tsOutput += `  amazon_in_customer_rating: number;\n`;
  tsOutput += `  total_reviews: number;\n`;
  tsOutput += `  book_cover_image_url: string;\n`;
  tsOutput += `  content: string[];\n`;
  tsOutput += `}\n\n`;

  tsOutput += `export const bookData = {\n`;
  tsOutput += `  bookTitle: "LoveScript: Words of Wisdom",\n`;
  tsOutput += `  totalChapters: ${data.length},\n`;
  tsOutput += `  parts: [\n`;
  tsOutput += `    {\n`;
  tsOutput += `      part: "Part 1: Timeless Quotes",\n`;
  tsOutput += `      chapters: [\n`;

  data.forEach((row, index) => {
    const author = String(row[0] || "Unknown").replace(/"/g, "'");
    const quote = String(row[1] || "").replace(/"/g, '\\"').replace(/\n/g, " ");
    const tags = String(row[3] || "").replace(/[^a-zA-Z, ]/g, ''); // Extract nice tags

    tsOutput += `        {\n`;
    tsOutput += `          id: ${index + 1},\n`;
    tsOutput += `          title: "Quote by ${author}",\n`;
    tsOutput += `          author: "${author}",\n`;
    tsOutput += `          tags: "${tags}",\n`;
    tsOutput += `          image: "love_quotes",\n`;
    // Split the quote roughly into 2 or 3 lines for the flipbook format
    tsOutput += `          content: ["${quote}"]\n`;
    tsOutput += `        }${(index < data.length - 1) ? ',' : ''}\n`;
  });

  tsOutput += `      ]\n    }\n  ]\n};\n\n`;

  // Attach the standard `books` flat-map for BookViewer
  tsOutput += `export const books: Book[] = [];\n`;
  tsOutput += `bookData.parts.forEach((partObj) => {\n`;
  tsOutput += `  partObj.chapters.forEach((chapter) => {\n`;
  tsOutput += `    books.push({\n`;
  tsOutput += `      amazon_in_product_url: "#",\n`;
  tsOutput += `      title: \`\${chapter.id}. \${chapter.title}\`,\n`;
  tsOutput += `      author: chapter.author,\n`;
  tsOutput += `      published_date: "Timeless",\n`;
  tsOutput += `      mrp: null,\n`;
  tsOutput += `      genre: \`Quote | \${chapter.tags.split(',')[0] || "Wisdom"}\`,\n`;
  tsOutput += `      amazon_in_customer_rating: 5.0,\n`;
  tsOutput += `      total_reviews: 1000 + chapter.id * 100,\n`;
  tsOutput += `      book_cover_image_url: "/images/love_quotes.png",\n`;
  tsOutput += `      content: chapter.content\n`;
  tsOutput += `    });\n`;
  tsOutput += `  });\n`;
  tsOutput += `});\n\n`;

  tsOutput += `export const genres = [...new Set(books.map((book) => book.genre))];\n`;

  // Overwrite the actual books-data.ts programmatically
  fs.writeFileSync('./lib/books-data.ts', tsOutput);
  console.log("SUCCESS: Replaced the entire flipbook dynamically with your Excel data!");

} catch (error) {
  console.error("Failed to read the file:", error.message);
}
