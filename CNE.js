import fs from "node:fs";

import { csvJSON, convertToCSV } from "./csv.js";
import { getData } from "./getData.js";

const URLBASE = "http://www.cne.gob.ve/web/registro_electoral/ce.php";
const CREATEURL = (nacionalidad, cedula) =>
  `${URLBASE}?nacionalidad=${nacionalidad}&cedula=${cedula}`;

const SELECTOR =
  "body > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > b";

export default async function scrapyCNEVData(col, csvPath, csvResultPath) {
  fs.readFile(csvPath, "utf8", async function (err, data) {
    if (err) throw err;
    var objects = csvJSON(data, ",");
    if (objects) {
      var res = [];
      for (let i = 0; i < objects.length; i++) {
        const element = objects[i];
        const url = CREATEURL(element.documento.toUpperCase(), element.cedula);
        var result = await getData(url, SELECTOR);
        if (result) {
          element[col] = result;
          res.push({ ...element });
        }
      }
      if (res.length > 0) {
        var newCSV = convertToCSV(res);
        fs.writeFileSync(csvResultPath, newCSV);
      }
    }
  });
}
