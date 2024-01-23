import { JSDOM } from "jsdom";

export async function getData(url,selector) {
  try {
    const a = await fetch(url);
    const body = await a.text();

    const {
      window: { document },
    } = new JSDOM(body);

    var res = [];
    document
      .querySelectorAll(selector)
      .forEach((element) => res.push(element.textContent));

    if (res) return res[0];
    else return null;
  } catch (error) {
    console.error(error);
  }
}