import cne from "./CNE.js";


const CSVPATH = "./data.csv";
const CSVRESULTPATH = "./dataresult.csv";
const COL = "nombre";


async function main() {
  try
  {
    await cne(COL, CSVPATH, CSVRESULTPATH);
  } catch (error) {
    console.error(error);
  }
}

main();