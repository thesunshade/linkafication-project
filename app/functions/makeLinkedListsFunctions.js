export function makeListOfLinkedCitations(linkedDictionary) {
  const regexunlinked = new RegExp("<a class='ref' href(.+?)</a>", "g");
  let list = [];
  linkedDictionary.forEach(item => {
    if (item.text.match(regexunlinked) != null) {
      list = list.concat(item.text.match(regexunlinked));
    }
  });
  return list;
}

export function makeListOfUnLinkedCitations(linkedDictionary) {
  // not linked up
  const regexunlinked = new RegExp("<a class='ref' data-division=(.+?)</a>", "g");
  let list = [];
  linkedDictionary.forEach(item => {
    if (item.text.match(regexunlinked) != null) {
      list = list.concat(item.text.match(regexunlinked));
    }
  });
  //   console.log("All Citations not linkedup");
  //   console.log(list);
  return list;
}

export function tobefiguredoutfunctions() {
  const regex1 = new RegExp("<a class='ref' data-division=.+?>");
  const regex2 = new RegExp("</a>");
  let cleanedList = [];
  list.forEach(item => {
    if (item !== null) {
      item = item.replace(regex1, "").replace(regex2, "");
      cleanedList = cleanedList.concat(item);
    }
  });
  console.log(countUniqueItems(cleanedList, true));
  // console.log(cleanedList);

  const excluded = ["Ja"];
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
  console.log("%c☝🏻 not linked up citations only  ", "color:green;background:black;font-weight:bold");
}
