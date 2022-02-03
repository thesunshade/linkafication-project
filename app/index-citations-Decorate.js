import { dictionary } from "./dictionary.js";
import linkDecorated from "./makeLinksFunction.js";
import determineWhichDictionary from "./determineWhichDictionary.js";
import {
  makeListOfUndecorated,
  makeListOfDecorated,
  listFinalLinksThroughDecorationOnly,
  listDecoratedCitationsCitationsOnly,
  removeExcludedCitations,
} from "./makeAllListsFunctions.js";
import doTheDecoratingOfDictionary from "./doTheDecoratingOfDictionary.js";
import { makeListOfUnLinkedCitations } from "./makeLinkedListsFunction.js";

let messageArea = document.getElementById("message");
let listMessageArea = document.getElementById("list-message");
let linkMessageArea = document.getElementById("link-message");
let resultsArea = document.getElementById("results-area");
let linksArea = document.getElementById("link-area");
let decoratedDictionaryCopyButton = document.getElementById("copy-decorated-dictionary");
let linkedDictionaryCopyButton = document.getElementById("copy-linked-dictionary");
let decoratedListCitationsCopyButton = document.getElementById("copy-decorated-list-citations");
let decoratedDictionaryBox = document.getElementById("decorated-dictionary-box");
decoratedDictionaryBox.value = "";
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
  linksArea.classList.remove("hidden");
}

let decorateButton = document.getElementById("decorate");
decorateButton.addEventListener("click", decorate);

function copyDecorated() {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(decoratedDictionaryBox.value);
  return Promise.reject("The Clipboard API is not available.");
}
decoratedDictionaryCopyButton.addEventListener("click", copyDecorated);

let listOfFinalLinksThroughDecorationOnly;
let listOfAllDecorated;
let cleanedListOfDecoratedCitations;
let cleanedListOfDecoratedCitationsString;
let listOfAllUndecorated;
let listOfNonExcludedUndecorated;
let report;

function makeLists(decorated) {
  let start = Date.now();

  listOfFinalLinksThroughDecorationOnly = listFinalLinksThroughDecorationOnly(decorated);
  console.log(listOfFinalLinksThroughDecorationOnly.sort().join("\n"));
  console.log(
    "%c☝🏻 string of all final links through decoration only",
    "color:green;background:black;font-weight:bold"
  );

  listOfAllDecorated = makeListOfDecorated(decorated);
  console.log(listOfAllDecorated.sort().join("\n"));
  console.log("%c☝🏻 string of all decorated including final links", "color:green;background:black;font-weight:bold");

  listOfAllUndecorated = makeListOfUndecorated(decorated);
  console.log(listOfAllUndecorated.sort().join("\n"));
  console.log("%c☝🏻 string of all undecorated citations", "color:green;background:black;font-weight:bold");

  listOfNonExcludedUndecorated = removeExcludedCitations(listOfAllUndecorated);
  console.log(listOfNonExcludedUndecorated);
  console.log("%c☝🏻 string of all Non-Excluded undecorated citations", "color:green;background:black;font-weight:bold");

  cleanedListOfDecoratedCitations = listDecoratedCitationsCitationsOnly(listOfAllDecorated);
  console.log(cleanedListOfDecoratedCitations.sort().join("\n"));
  console.log("%c☝🏻 string of decorated citations", "color:green;background:black;font-weight:bold");

  let end = Date.now();
  console.log(`Execution time: ${(end - start) / 1000} seconds`);
  listMessageArea.innerHTML = `Lists made in ${
    (end - start) / 1000
  } seconds.<br>Please check the console for your lists!`;

  report = `# ${determineWhichDictionary(dictionary[0].word)} decorating report

  * [Raw Cleaned up dictionary file](https://raw.githubusercontent.com/thesunshade/linkafication-project/main/DPPN/pli2en_dppn.json)
  * [Raw Decorated Dictionary File](https://raw.githubusercontent.com/thesunshade/linkafication-project/main/DPPN/DPPN-Decorated-pli2en_dppn.json)

  ## Links made through decoration process

  Some citations match the refrence ids enough that it is possible to create the final link at the decoration stage. This is them.

<details><summary>Show full list</summary>

\`\`\`html
${listOfFinalLinksThroughDecorationOnly.join("\n")}
\`\`\`
</details>

## List of all decorated citations

This includes both those that are final links as well as those only decorated.

<details><summary>Show full list</summary>

\`\`\`html
${listOfAllDecorated.sort().join("\n")}
\`\`\`
</details>

## List of all decorated citations without html markup

Just the citations from the list above

<details><summary>Show full list</summary>

\`\`\`html
${cleanedListOfDecoratedCitations.sort().join("\n")}
\`\`\`
</details>

## List of all not decorated citations

<details><summary>Show full list</summary>

\`\`\`html
${listOfAllUndecorated.sort().join("\n")}
\`\`\`
</details>

## List of all non decorated citations that we are not ignoring

This means that for some reason they *should* be decorated, but something is wrong with them. To see the list of those citations that are being ignored (either because we can't figure out how to turn them into links or because they aren't present on SC) you can check [this file](https://github.com/thesunshade/linkafication-project/blob/main/app/excludeList.js).

<details><summary>Show full list</summary>

\`\`\`html
${listOfNonExcludedUndecorated}
\`\`\`
</details>
`;
  console.log(report);
  decorationReportButton.classList.remove("hidden");
}

let decorationReportButton = document.getElementById("copy-decoration-report");
decorationReportButton.addEventListener("click", () => navigator.clipboard.writeText(report));

let listButton = document.getElementById("make-decorated-lists");
listButton.addEventListener("click", () => makeLists(decorated));

let linkedDictionary;
function doTheLinkingUp() {
  linkMessageArea.innerHTML = "Please wait for your linked dictionary";
  let start = Date.now();
  linkedDictionary = linkDecorated(dictionary);
  let end = Date.now();
  console.log(`Execution time: ${(end - start) / 1000} seconds`);
  linkMessageArea.innerHTML = `Check console for  your linked dictionary<br>Lists made in ${
    (end - start) / 1000
  } seconds.`;
  linkedDictionaryCopyButton.classList.remove("hidden");

  let listOfUnLinkedCitations;
  function makeTheLinkedLists(linkedDictionary) {
    listOfUnLinkedCitations = makeListOfUnLinkedCitations(linkedDictionary);
    return listOfUnLinkedCitations;
  }
  console.log(makeTheLinkedLists(linkedDictionary));
}

let linkButton = document.getElementById("link-all-things");
linkButton.addEventListener("click", () => doTheLinkingUp());

function copyLinkedDictionary() {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(JSON.stringify(linkedDictionary, null, 4));
  return Promise.reject("The Clipboard API is not available.");
}
linkedDictionaryCopyButton.addEventListener("click", copyLinkedDictionary);
