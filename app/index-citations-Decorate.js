import { dhammikaDictionary } from "./dictionaries/dhammika-dictionary.js";
import { dppnDictionary } from "./dictionaries/dppn-dictionary.js";
import { ptsDictionary } from "./dictionaries/pts-dictionary.js";
import linkDecorated from "./functions/makeLinksFunction.js";
import countUniqueItems from "./functions/countUniqueItems.js";
import determineWhichDictionary from "./functions/determineWhichDictionary.js";
import convertMilSeconds from "./functions/convertMilSeconds.js";
import countAllPotentialLinks from "./functions/countAllPotentialLinks.js";
import {
  makeListOfUndecorated,
  makeListOfDecorated,
  listFinalLinksThroughDecorationOnly,
  listDecoratedCitationsCitationsOnly,
  removeExcludedCitations,
} from "./functions/makeAllListsFunctions.js";
import doTheDecoratingOfDictionary from "./functions/doTheDecoratingOfDictionary.js";
import { makeListOfLinkedCitations, makeListOfUnLinkedCitations } from "./functions/makeLinkedListsFunctions.js";

let dictionarySelector = document.getElementById("dictionaries");
let messageArea = document.getElementById("message");
let listMessageArea = document.getElementById("list-message");
let linkMessageArea = document.getElementById("link-message");
let linkListMessageArea = document.getElementById("link-list-message-area");
let resultsArea = document.getElementById("results-area");
let linkListArea = document.getElementById("link-list-area");
let linksArea = document.getElementById("link-area");
let decoratedDictionaryCopyButton = document.getElementById("copy-decorated-dictionary");
let linkedDictionaryCopyButton = document.getElementById("copy-linked-dictionary");
let decoratedListCitationsCopyButton = document.getElementById("copy-decorated-list-citations");
let dictionary;
switch (dictionarySelector.value) {
  case "dhammika":
    dictionary = dhammikaDictionary;
    break;
  case "dppn":
    dictionary = dppnDictionary;
    break;
  case "pts":
    dictionary = ptsDictionary;
    break;
}

dictionarySelector.addEventListener("change", event => {
  console.log(event.target.value);
  switch (event.target.value) {
    case "dhammika":
      dictionary = dhammikaDictionary;
      break;
    case "dppn":
      dictionary = dppnDictionary;
      break;
    case "pts":
      dictionary = ptsDictionary;
      break;
  }
  let needsDecorationElements = document.getElementsByClassName("needs-decoration");
  for (let i = 0; i < needsDecorationElements.length; i++) {
    console.log(needsDecorationElements[i]);
    needsDecorationElements[i].classList.add("hidden");
  }
});

messageArea.innerHTML = "Please click";
listMessageArea.innerHTML = "Please decorate first";

let decorated;
function decorate(dictionary) {
  messageArea.innerHTML = "Please wait...";
  let start = Date.now();
  decorated = doTheDecoratingOfDictionary(dictionary);
  console.log("decorated code");
  console.log(decorated);
  numberOfPotentialCitations = countAllPotentialLinks(dictionary);
  let end = Date.now();
  // console.log(`Execution time: ${convertMilSeconds(end - start)}`);
  messageArea.innerHTML = `${determineWhichDictionary(dictionary[0].word)} decorated in ${convertMilSeconds(
    end - start
  )}!<br>
  ${numberOfPotentialCitations} potential citations`;

  listMessageArea.innerHTML = "";
  decoratedDictionaryCopyButton.classList.remove("hidden");
  resultsArea.classList.remove("hidden");
  linksArea.classList.remove("hidden");
}

let decorateButton = document.getElementById("decorate");
decorateButton.addEventListener("click", () => decorate(dictionary));

function copyDecorated() {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(JSON.stringify(decorated, null, 4));
  return Promise.reject("The Clipboard API is not available.");
}
decoratedDictionaryCopyButton.addEventListener("click", copyDecorated);

//
// Making of Decorated lists
//
let listOfFinalLinksThroughDecorationOnly;
let listOfAllDecorated;
let cleanedListOfDecoratedCitations;
let cleanedListOfDecoratedCitationsString;
let listOfAllUndecorated;
let listOfNonExcludedUndecorated;
let decorationReport;
let numberOfPotentialCitations;

function makeDecoratedLists(decorated) {
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
  console.log(`Execution time: ${convertMilSeconds(end - start)}`);
  let linkCountMessage;
  let linkCountDiscrepency = numberOfPotentialCitations - listOfAllDecorated.length - listOfAllUndecorated.length;
  if (linkCountDiscrepency > 0) {
    linkCountMessage = linkCountDiscrepency + " unaccounted for links";
  } else if (linkCountDiscrepency === 0) {
    linkCountMessage = "No links unacconted for!";
  } else if (linkCountDiscrepency < 0) {
    linkCountMessage = "links are off by " + linkCountDiscrepency;
  }
  listMessageArea.innerHTML = `Lists made in ${convertMilSeconds(
    end - start
  )}.<br>Please check the console for your lists!<br><br>
  ${listOfFinalLinksThroughDecorationOnly.length} citations with complete links.<br>
  ${listOfAllDecorated.length - listOfFinalLinksThroughDecorationOnly.length} citations decorated.<br>
  ${listOfAllUndecorated.length} undecorated citations<br>
  ${linkCountMessage}`;

  decorationReport = `# ${determineWhichDictionary(dictionary[0].word)} decorating report

  * [Raw Cleaned up dictionary file](https://raw.githubusercontent.com/thesunshade/linkafication-project/main/${determineWhichDictionary(
    dictionary[0].word
  )}/pli2en_${determineWhichDictionary(dictionary[0].word).toLowerCase()}.json)
  * [Raw Decorated Dictionary File](https://raw.githubusercontent.com/thesunshade/linkafication-project/main/${determineWhichDictionary(
    dictionary[0].word
  )}/${determineWhichDictionary(dictionary[0].word)}-Decorated-pli2en_${determineWhichDictionary(
    dictionary[0].word
  ).toLowerCase()}.json)

  * ${listOfFinalLinksThroughDecorationOnly.length} citations with complete links.<br>
  * ${listOfAllDecorated.length - listOfFinalLinksThroughDecorationOnly.length} citations decorated.

  ## Links made through decoration process

  Some citations match the refrence ids enough that it is possible to create the final link at the decoration stage. This is them.

<details><summary>Show full list</summary>

\`\`\`html
${countUniqueItems(listOfFinalLinksThroughDecorationOnly)}
\`\`\`
</details>

## List of all decorated citations

This includes both those that are final links as well as those only decorated.

<details><summary>Show full list</summary>

\`\`\`html
${countUniqueItems(listOfAllDecorated)}
\`\`\`
</details>

## List of all decorated citations without html markup

Just the citations from the list above

<details><summary>Show full list</summary>

\`\`\`html
${countUniqueItems(cleanedListOfDecoratedCitations)}
\`\`\`
</details>

## List of all not decorated citations

<details><summary>Show full list</summary>

\`\`\`html
${countUniqueItems(listOfAllUndecorated)}
\`\`\`
</details>

## List of all non decorated citations that we are not ignoring

This means that for some reason they *should* be decorated, but something is wrong with them. To see the list of those citations that are being ignored (either because we can't figure out how to turn them into links or because they aren't present on SC) you can check [this file](https://github.com/thesunshade/linkafication-project/blob/main/app/excludeList.js).

<details><summary>Show full list</summary>

\`\`\`html
${countUniqueItems(listOfNonExcludedUndecorated)}
\`\`\`
</details>
`;

  decorationReportButton.classList.remove("hidden");
}

let decorationReportButton = document.getElementById("copy-decoration-report");
decorationReportButton.addEventListener("click", () => navigator.clipboard.writeText(decorationReport));

let listButton = document.getElementById("make-decorated-lists");
listButton.addEventListener("click", () => makeDecoratedLists(decorated));

let linkedDictionary;
function doTheLinkingUp() {
  linkMessageArea.innerHTML = "Please wait for your linked dictionary";
  let start = Date.now();
  linkedDictionary = linkDecorated(dictionary);
  let end = Date.now();
  console.log(`Execution time: ${convertMilSeconds(end - start)}`);
  linkMessageArea.innerHTML = `Linked dictionary made in ${convertMilSeconds(end - start)}.`;
  linkedDictionaryCopyButton.classList.remove("hidden");
  makeLinkedListButton.classList.remove("hidden");
  linkListArea.classList.remove("hidden");
}

let linkButton = document.getElementById("link-all-things");
linkButton.addEventListener("click", () => doTheLinkingUp());

linkedDictionaryCopyButton.addEventListener("click", () =>
  navigator.clipboard.writeText(JSON.stringify(linkedDictionary, null, 4))
);

let listOfUnLinkedCitations;
let listOfLinkedCitations;
let linkingReport;

function makelinkedLists(linkedDictionary) {
  let start = Date.now();
  listOfLinkedCitations = makeListOfLinkedCitations(linkedDictionary);
  console.log(listOfLinkedCitations.sort().join("\n"));
  console.log(listOfLinkedCitations.length);
  console.log("%c☝🏻 string of all citations", "color:green;background:black;font-weight:bold");

  listOfUnLinkedCitations = makeListOfUnLinkedCitations(linkedDictionary);
  console.log(listOfUnLinkedCitations.sort().join("\n"));
  console.log(listOfUnLinkedCitations.length);
  console.log("%c☝🏻 string of all unlinked citations", "color:red;background:black;font-weight:bold");
  let end = Date.now();
  console.log(`Execution time: ${convertMilSeconds(end - start)}`);
  linkListMessageArea.innerHTML = `Linked lists made in ${convertMilSeconds(end - start)}.`;
  linkingReportButton.classList.remove("hidden");

  linkingReport = `# ${determineWhichDictionary(dictionary[0].word)} linking report

  
  * [Raw Linked Up Dictionary File](https://raw.githubusercontent.com/thesunshade/linkafication-project/main/${determineWhichDictionary(
    dictionary[0].word
  )}/${determineWhichDictionary(dictionary[0].word)}-LinkedUp-pli2en_${determineWhichDictionary(
    dictionary[0].word
  ).toLowerCase()}.json)

  * ${listOfLinkedCitations.length} citations with complete links.<br>
  * ${listOfUnLinkedCitations.length} unlinked citations.

  ## All Links made through both decoration and linking process

<details><summary>Show full list</summary>

\`\`\`html
${listOfLinkedCitations.join("\n")}
\`\`\`
</details>

## List of all unlinked citations

<details><summary>Show full list</summary>

\`\`\`html
${listOfUnLinkedCitations.sort().join("\n")}
\`\`\`
</details>


`;
}

let makeLinkedListButton = document.getElementById("make-linked-lists");
makeLinkedListButton.addEventListener("click", () => makelinkedLists(linkedDictionary));

let linkingReportButton = document.getElementById("copy-linking-report");
linkingReportButton.addEventListener("click", () => navigator.clipboard.writeText(linkingReport));
