export default function countUniqueItems(array, booksOnly) {
  let report = [];
  let countLines = array.length;
  let arrUniqueLines = [];

  // true will make a list of only the book names, not full citations
  if (booksOnly === true) {
    for (let i = 0; i < countLines; i++) {
      array[i] = array[i].replace(/^([A-Za-zāīūṭḍḷṁṇñṅ-]+).+$/, "$1");
    }
  }

  for (let i = 0; i < countLines; i++) {
    let currentLine = array[i];
    // Count the lines
    if (!arrUniqueLines[currentLine]) {
      arrUniqueLines[currentLine] = 1;
    } else {
      arrUniqueLines[currentLine] += 1;
    }
  }

  var sortedLines = [];
  for (var i in arrUniqueLines) {
    sortedLines.push([arrUniqueLines[i], i]);
  }

  // sortedLines.sort();
  report = "";
  for (let i in sortedLines) {
    report = report + sortedLines[i][1] + " => " + sortedLines[i][0] + "\n";
  }
  return report;
}
