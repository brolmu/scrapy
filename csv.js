export function csvJSON(csv, delimiter) {
  var lines = csv.split("\n");

  var result = [];
  var headers = lines[0].split(delimiter);
  var headers = headers.map((header) => header.replace(/"/g, "").trim());
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(delimiter);

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j].replace(/"/g, "").trim();
    }
    result.push(obj);
  }

  return result;
}

export function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr);
  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
}