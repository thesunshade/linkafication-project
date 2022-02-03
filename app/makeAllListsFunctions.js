import { excluded } from "./excludeList.js";

export function listFinalLinksThroughDecorationOnly(decorated) {
  const regex = new RegExp("<a class='ref' href=.*?>(.+?)</a>", "g");
  let list = [];
  decorated.forEach(item => {
    if (item.text.match(regex) != null) {
      list = list.concat(item.text.match(regex));
    }
  });
  // console.log("all finished links through decoration only");
  // console.log(list);
  return list;
}

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
  // console.log("All Citations not decorated");
  // console.log(list);

  let cleanedList = [];
  list.forEach(item => {
    if (item !== null) {
      item = item.replace(regex1, "").replace(regex2, "");
      cleanedList = cleanedList.concat(item);
    }
  });
  // console.log("citations only not decorated ");
  // console.log(cleanedList);
  return cleanedList;
}

export function removeExcludedCitations(cleanedList) {
  let cleanedListString = "";
  cleanedList.forEach(item => {
    if (item.match(/^[A-Za-zāīūṭḍ-]+/)) {
      const book = item.match(/^[A-Za-zāīūṭḍ-]+/).toString();

      if (book && !excluded.includes(book)) {
        cleanedListString = cleanedListString + item + "\n";
      }
    }
  });
  return cleanedListString;
}

export function makeListOfDecorated(dictionary) {
  const regex = new RegExp("<a class='ref'(.+?)</a>", "g");
  let list = [];
  dictionary.forEach(item => {
    if (item.text.match(regex) != null) {
      list = list.concat(item.text.match(regex));
    }
  });
  // console.log("All Decorated citations as anchors including finished links");
  // console.log(list);
  return list;
}

export function listDecoratedCitationsCitationsOnly(list) {
  const regex1 = new RegExp("<a class='ref'.*?>");
  const regex2 = new RegExp("</a>");
  let cleanedList = [];
  list.forEach(item => {
    if (item !== null) {
      item = item.replace(regex1, "").replace(regex2, "");
      cleanedList = cleanedList.concat(item);
    }
  });
  // console.log("decorated citations, citations only");
  // console.log(cleanedList);
  return cleanedList.sort();
}
