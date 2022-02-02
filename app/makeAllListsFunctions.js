import { excluded } from "./excludeList.js";

export function makeListOfUndecorated(dictionary) {
  const regex = new RegExp("<span class='ref'>(.+?)</span>", "g");
  const regex1 = new RegExp("<span class='ref'>");
  const regex2 = new RegExp("</span>");

  let list = [];
  dictionary.forEach(item => {
    if (item.text.match(regex) != null) {
      list = list.concat(item.text.match(regex));
    }
  });
  console.log("All Citations not decorated");
  console.log(list);

  let cleanedList = [];
  list.forEach(item => {
    if (item !== null) {
      item = item.replace(regex1, "").replace(regex2, "");
      cleanedList = cleanedList.concat(item);
    }
  });
  console.log("citations only not decorated ");
  console.log(cleanedList);

  let cleanedListString = "";
  cleanedList.forEach(item => {
    if (item.match(/^[A-Za-zāīūṭḍ-]+/)) {
      const book = item.match(/^[A-Za-zāīūṭḍ-]+/).toString();

      if (book && !excluded.includes(book)) {
        cleanedListString = cleanedListString + item + "\n";
      }
    }
  });
  console.log(cleanedListString);
  return cleanedListString;
}

export function makeListOfDecorated(dictionary) {
  const regex = new RegExp("<a class='ref' data-division=(.+?)</a>", "g");

  let list = [];
  dictionary.forEach(item => {
    if (item.text.match(regex) != null) {
      list = list.concat(item.text.match(regex));
    }
  });
  console.log("All Decorated citations as anchors without finished links");
  console.log(list);
}
