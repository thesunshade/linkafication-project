import { dictionary } from "./dictionary.js";
import linkDecorated from "./makeLinksFunction.js";
import determineWhichDictionary from "./determineWhichDictionary.js";
import { makeListOfUndecorated, makeListOfDecorated } from "./makeAllListsFunctions.js";
import doTheDecoratingOfDictionary from "./doTheDecoratingOfDictionary.js";

let messageArea = document.getElementById("message");
let listMessageArea = document.getElementById("list-message");
let linkMessageArea = document.getElementById("link-message");
let resultsArea = document.getElementById("results-area");
let decoratedDictionaryCopyButton = document.getElementById("copy-decorated-dictionary");
let decoratedListCitationsCopyButton = document.getElementById("copy-decorated-list-citations");
let decoratedDictionaryBox = document.getElementById("decorated-dictionary-box");
messageArea.innerHTML = "Please click";
listMessageArea.innerHTML = "Please decorate first";

let currentDictionaryName = document.getElementById("current-dictionary-name");
currentDictionaryName.innerHTML = determineWhichDictionary(dictionary[0].word);
let decorated;
function decorate() {
  messageArea.innerHTML = "Please wait...";
  let start = Date.now();
  decorated = doTheDecoratingOfDictionary(dictionary);
  console.log("decorated code");
  console.log(decorated);
  let end = Date.now();
  console.log(`Execution time: ${(end - start) / 1000} seconds`);
  messageArea.innerHTML = `Decorated in ${(end - start) / 1000} seconds!<br>Check console`;
  decoratedDictionaryBox.value = JSON.stringify(decorated, null, 4);
  listMessageArea.innerHTML = "NOW you can make lists";
  resultsArea.classList.remove("hidden");
}

let decorateButton = document.getElementById("decorate");
decorateButton.addEventListener("click", decorate);

function copyDecorated() {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(decoratedDictionaryBox.value);
  return Promise.reject("The Clipboard API is not available.");
}
decoratedDictionaryCopyButton.addEventListener("click", copyDecorated);

function makeLists(decorated) {
  makeListOfDecorated(decorated);
  makeListOfUndecorated(decorated);
  let start = Date.now();
  listMessageArea.innerHTML = "Please wait for your lists...";
  const regex = new RegExp("<a class='ref'.*?>(.+?)</a>", "g");
  let list = [];
  decorated.forEach(item => {
    if (item.text.match(regex) != null) {
      list = list.concat(item.text.match(regex));
    }
  });
  console.log("all decorated citations and finished links");
  console.log(list);

  const regex1 = new RegExp("<a class='ref'.*?>");
  const regex2 = new RegExp("</a>");

  let cleanedList = [];
  list.forEach(item => {
    if (item !== null) {
      item = item.replace(regex1, "").replace(regex2, "");
      cleanedList = cleanedList.concat(item);
    }
  });

  cleanedList.sort();
  console.log("decorated citations, citations only");
  console.log(cleanedList);

  let cleanedListString = "";
  cleanedList.forEach(item => {
    if (item.match(/^[A-Za-z-]+/)) {
      cleanedListString = cleanedListString + item + "\n";
    }
  });
  console.log(cleanedListString);

  console.log("%c☝🏻 string of decorated citations", "color:green;background:black;font-weight:bold");
  let end = Date.now();
  console.log(`Execution time: ${(end - start) / 1000} seconds`);
  listMessageArea.innerHTML = `Lists made in ${
    (end - start) / 1000
  } seconds.<br>Please check the console for your lists!`;
}

let listButton = document.getElementById("make-decorated-lists");
listButton.addEventListener("click", () => makeLists(decorated));

function doTheLinkingUp() {
  linkMessageArea.innerHTML = "Please wait for your linked dictionary";
  let start = Date.now();
  linkDecorated(dictionary);
  let end = Date.now();
  console.log(`Execution time: ${(end - start) / 1000} seconds`);
  linkMessageArea.innerHTML = `Check console for  your linked dictionary<br>Lists made in ${
    (end - start) / 1000
  } seconds.`;
}

let linkButton = document.getElementById("link-all-things");
linkButton.addEventListener("click", () => doTheLinkingUp());
