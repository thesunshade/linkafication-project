import { dhammikaDictionary } from "./dictionaries/dhammika-dictionary.js";
import { dppnDictionary } from "./dictionaries/dppn-dictionary.js";
import { ptsDictionary } from "./dictionaries/pts-dictionary.js";
import linkDecorated from "./functions/makeLinksFunction.js";
import countUniqueItems from "./functions/countUniqueItems.js";
import determineWhichDictionary from "./functions/determineWhichDictionary.js";
import convertMilSeconds from "./functions/convertMilSeconds.js";
import countAllPotentialLinks from "./functions/countAllPotentialLinks.js";
import doTheDecoratingOfDictionary from "./functions/doTheDecoratingOfDictionary.js";
import {
  makeListOfLinkedCitations,
  makeListOfUnLinkedCitations,
  removeJatakaFromUnlinkedList,
} from "./functions/makeLinkedListsFunctions.js";
import { excluded } from "./functions/excludeList.js";
import detailsWrapper from "./functions/detailsWrapper.js";
import {
  makeListOfUndecorated,
  makeListOfDecorated,
  listFinalLinksThroughDecorationOnly,
  listDecoratedCitationsCitationsOnly,
  removeExcludedCitations,
} from "./functions/makeDecoratedListsFunctions.js";

let dictionarySelector = document.getElementById("dictionaries");
let decorateArea = document.getElementById("decorate-area");
let messageArea = document.getElementById("message");
let listMessageArea = document.getElementById("list-message");
let linkMessageArea = document.getElementById("link-message");
let linkListMessageArea = document.getElementById("link-list-message-area");
let resultsArea = document.getElementById("results-area");
let linkListArea = document.getElementById("link-list-area");
let linksArea = document.getElementById("link-area");
let decoratedDictionaryCopyButton = document.getElementById("copy-decorated-dictionary");
let linkedDictionaryCopyButton = document.getElementById("copy-linked-dictionary");
let dictionary;

let copyFinalLinksHtml = document.getElementById("copy-final-links-html");
let copyDecoratedHtml = document.getElementById("copy-decorated-html");
let copyDecoratedCitations = document.getElementById("copy-decorated-citations");
let copyDecoratedBooks = document.getElementById("copy-decorated-books");
let copyAllUndecoratedCitations = document.getElementById("copy-all-undecorated");
let copyUndecoratedBooks = document.getElementById("copy-undecorated-books");
let copyAllNonexcludedUndecoratedCitations = document.getElementById("copy-nonexcluded-undecorated");
let copyExcluded = document.getElementById("copy-excluded");

let copyCompletedLinkingHtml = document.getElementById("copy-completed-linking-html");
let copyDecoratedUnlinked = document.getElementById("copy-decorated-unlinked");

// initialize dictionary
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

// When dictionary changes
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
    needsDecorationElements[i].classList.add("hidden");
  }
  // reset variables etc
  decorated = [];
  linkedDictionary = [];
  linkListMessageArea.innerHTML = "";
  listMessageArea.innerHTML = "";
  linkMessageArea.innerHTML = "";
  message.innerHTML = "";
});

//
// Decorate
//
let decorated;
let numberOfPotentialCitations;
function decorate(dictionary) {
  let start = Date.now();
  decorated = doTheDecoratingOfDictionary(dictionary);
  numberOfPotentialCitations = countAllPotentialLinks(dictionary);
  let end = Date.now();
  messageArea.innerHTML = `<span class="time">${determineWhichDictionary(
    dictionary[0].word
  )} decorated in ${convertMilSeconds(end - start)}.</span><br>
  ${numberOfPotentialCitations.toLocaleString()} potential citations`;

  decoratedDictionaryCopyButton.classList.remove("hidden");
  resultsArea.classList.remove("hidden");
  linksArea.classList.remove("hidden");
}

let decorateButton = document.getElementById("decorate");
decorateButton.addEventListener("click", () => decorate(dictionary));

decoratedDictionaryCopyButton.addEventListener("click", () =>
  navigator.clipboard.writeText(JSON.stringify(decorated, null, 4))
);

//
// Making of Decorated lists
//
let listOfFinalLinksThroughDecorationOnly;
let listOfAllDecorated;
let cleanedListOfDecoratedCitations;
let listOfAllUndecorated;
let listOfNonExcludedUndecorated;
let decorationReport;

function makeDecoratedLists(decorated) {
  let start = Date.now();

  listOfFinalLinksThroughDecorationOnly = listFinalLinksThroughDecorationOnly(decorated);
  listOfAllDecorated = makeListOfDecorated(decorated);
  listOfAllUndecorated = makeListOfUndecorated(decorated);
  listOfNonExcludedUndecorated = removeExcludedCitations(listOfAllUndecorated);
  cleanedListOfDecoratedCitations = listDecoratedCitationsCitationsOnly(listOfAllDecorated);

  // reveal available areas and buttons
  let needsListElements = document.getElementsByClassName("list-buttons");
  for (let i = 0; i < needsListElements.length; i++) {
    needsListElements[i].classList.remove("hidden");
  }

  let end = Date.now();
  let linkCountMessage;
  let linkCountDiscrepency = numberOfPotentialCitations - listOfAllDecorated.length - listOfAllUndecorated.length;
  if (linkCountDiscrepency > 0) {
    linkCountMessage = "<b>" + linkCountDiscrepency + " unaccounted for links</b>";
  } else if (linkCountDiscrepency === 0) {
    linkCountMessage = "No links unacconted for!";
  } else if (linkCountDiscrepency < 0) {
    linkCountMessage = "<b>links are off by " + linkCountDiscrepency + "</b>";
  }
  listMessageArea.innerHTML = `<span class="time">Lists made in ${convertMilSeconds(
    end - start
  )}.</span><br><div class="count-messages">
  <b>${listOfFinalLinksThroughDecorationOnly.length.toLocaleString()}</b> citations with complete links.<br>
  <b>${(
    listOfAllDecorated.length - listOfFinalLinksThroughDecorationOnly.length
  ).toLocaleString()}</b> citations decorated.<br>
  <b>${listOfAllUndecorated.length.toLocaleString()}</b> undecorated citations<br>
  ${linkCountMessage}</div>`;

  //
  //DECORATION REPORT
  decorationReport = `# ${determineWhichDictionary(dictionary[0].word)} decorating report ${Date().toLocaleString()}
  <br><br>
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

  ## Links made through decoration process<br><br>
  Some citations match the refrence ids enough that it is possible to create the final link at the decoration stage. This is them.
${detailsWrapper(countUniqueItems(listOfFinalLinksThroughDecorationOnly))}

## List of all decorated citations<br><br>
This includes both those that are final links as well as those only decorated.
${detailsWrapper(countUniqueItems(listOfAllDecorated.sort()))}

## List of all decorated citations without html markup<br><br>
Just the citations from the list above
${detailsWrapper(countUniqueItems(cleanedListOfDecoratedCitations))}

## List of all not decorated citations<br><br>
${detailsWrapper(countUniqueItems(listOfAllUndecorated.sort()))}

## List of all non decorated citations that we are not ignoring<br><br>
This means that for some reason they *should* be decorated, but something is wrong with them. To see the list of those citations that are being ignored (either because we can't figure out how to turn them into links or because they aren't present on SC) you can check [this file](https://github.com/thesunshade/linkafication-project/blob/main/app/excludeList.js).
${detailsWrapper(countUniqueItems(listOfNonExcludedUndecorated.sort()))}
`;
  // end of decoration report
  decorationReportButton.classList.remove("hidden");
}

function saveFile(file, fileName) {
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(new Blob([file], { type: "text/plain;charset=utf-8" }));
  a.download = `${determineWhichDictionary(dictionary[0].word)}-${fileName}.txt`;
  a.click();
  navigator.clipboard.writeText(file);
}

let decorationReportButton = document.getElementById("copy-decoration-report");
decorationReportButton.addEventListener("click", () => saveFile(decorationReport, "decorationReport.txt"));

let listButton = document.getElementById("make-decorated-lists");
listButton.addEventListener("click", () => makeDecoratedLists(decorated));

copyFinalLinksHtml.addEventListener("click", () =>
  saveFile(
    listOfFinalLinksThroughDecorationOnly.sort().join("\n"),
    "Decoration-List_of_final_links_made_through_decoration_only"
  )
);

copyDecoratedHtml.addEventListener("click", () =>
  saveFile(listOfAllDecorated.sort().join("\n"), "Decoration-List_of_all_decorated_citations_with_markup")
);

copyDecoratedCitations.addEventListener("click", () =>
  saveFile(cleanedListOfDecoratedCitations.join("\n"), "Decoration-Citations_Only_list_of_all_decorated_citations")
);
copyDecoratedBooks.addEventListener("click", () =>
  saveFile(
    countUniqueItems(cleanedListOfDecoratedCitations, true),
    "Decoration-Book_Names_Only_list_of_all_decorated_citations"
  )
);

copyAllUndecoratedCitations.addEventListener("click", () =>
  saveFile(listOfAllUndecorated.sort().join("\n"), "Decoration-List_of_all_Undecorated_citations")
);
copyUndecoratedBooks.addEventListener("click", () =>
  saveFile(countUniqueItems(listOfAllUndecorated, true), "Decoration-Books_only_List_of_all_Undecorated_citations")
);
copyAllNonexcludedUndecoratedCitations.addEventListener("click", () =>
  navigator.clipboard.writeText(
    listOfNonExcludedUndecorated.join("\n"),
    "Decoration-List_of_all_Undecorated_citations_not_excluded"
  )
);
copyExcluded.addEventListener("click", () => saveFile(excluded.sort().join("\n"), "All_books_being_excluded"));

//
// Link up
//
let linkedDictionary;
function doTheLinkingUp(decorated) {
  let start = Date.now();
  linkedDictionary = linkDecorated(decorated);
  let end = Date.now();
  linkMessageArea.innerHTML = `<span class="time">Linked dictionary made in ${convertMilSeconds(end - start)}.</span>`;
  linkedDictionaryCopyButton.classList.remove("hidden");
  makeLinkedListButton.classList.remove("hidden");
  linkListArea.classList.remove("hidden");
}

let linkButton = document.getElementById("link-all-things");
linkButton.addEventListener("click", () => doTheLinkingUp(decorated));

linkedDictionaryCopyButton.addEventListener("click", () =>
  navigator.clipboard.writeText(JSON.stringify(linkedDictionary, null, 4))
);

let listOfUnLinkedCitations;
let listWithoutJataka;
let listOfLinkedCitations;
let linkingReport;

function makelinkedLists(linkedDictionary) {
  let start = Date.now();
  listOfLinkedCitations = makeListOfLinkedCitations(linkedDictionary);
  listOfUnLinkedCitations = makeListOfUnLinkedCitations(linkedDictionary);
  listWithoutJataka = removeJatakaFromUnlinkedList(listOfUnLinkedCitations);
  let end = Date.now();

  listOfAllUndecorated = makeListOfUndecorated(decorated);
  let linkCountMessage;
  let linkCountDiscrepency =
    numberOfPotentialCitations -
    listOfLinkedCitations.length -
    listOfUnLinkedCitations.length -
    listOfAllUndecorated.length;
  if (linkCountDiscrepency > 0) {
    linkCountMessage = "<b>" + linkCountDiscrepency + " unaccounted for links</b>";
  } else if (linkCountDiscrepency === 0) {
    linkCountMessage = "No links unacconted for!";
  } else if (linkCountDiscrepency < 0) {
    linkCountMessage = "<b>links are off by " + linkCountDiscrepency + "</b>";
  }

  linkListMessageArea.innerHTML = `<span class="time">Linked lists made in ${convertMilSeconds(
    end - start
  )}.</span><div class="count-messages">
  <b>${listOfLinkedCitations.length.toLocaleString()}</b> citations with complete links.<br>
  <b>${listOfUnLinkedCitations.length.toLocaleString()}</b> decorated citations unlinked<br>
  <b>${listOfAllUndecorated.length.toLocaleString()}</b> undecorated citations<br>
  <b>${listOfUnLinkedCitations.length - listWithoutJataka.length}</b> undecorated Jataka<br>
  ${linkCountMessage}
  `;

  linkingReportButton.classList.remove("hidden");

  linkingReport = `# ${determineWhichDictionary(dictionary[0].word)} linking report ${Date().toLocaleString()}
  <br><br>
  * [Raw Linked Up Dictionary File](https://raw.githubusercontent.com/thesunshade/linkafication-project/main/${determineWhichDictionary(
    dictionary[0].word
  )}/${determineWhichDictionary(dictionary[0].word)}-LinkedUp-pli2en_${determineWhichDictionary(
    dictionary[0].word
  ).toLowerCase()}.json)

  * ${listOfLinkedCitations.length} citations with complete links.<br>
  * ${listOfUnLinkedCitations.length} unlinked citations.

  ## All ${listOfLinkedCitations.length} links made through both decoration and linking process<br><br>
${detailsWrapper(countUniqueItems(listOfLinkedCitations))}

## List of all ${listWithoutJataka.length} unlinked citations excluding Jataka citations<br><br>
There are ${listOfUnLinkedCitations.length - listWithoutJataka.length} unlinked Jataka citations not included.

${detailsWrapper(countUniqueItems(listWithoutJataka.sort()))}
`;

  // reveal available areas and buttons
  let needsListElements = document.getElementsByClassName("link-buttons");
  for (let i = 0; i < needsListElements.length; i++) {
    needsListElements[i].classList.remove("hidden");
  }
}

let makeLinkedListButton = document.getElementById("make-linked-lists");
makeLinkedListButton.addEventListener("click", () => makelinkedLists(linkedDictionary));

let linkingReportButton = document.getElementById("copy-linking-report");
linkingReportButton.addEventListener("click", () => navigator.clipboard.writeText(linkingReport));

copyCompletedLinkingHtml.addEventListener("click", () =>
  navigator.clipboard.writeText(listOfLinkedCitations.join("\n"))
);
copyDecoratedUnlinked.addEventListener("click", () =>
  navigator.clipboard.writeText(listOfUnLinkedCitations.sort().join("\n"))
);

// this keeps you from clicking until page is loaded
decorateArea.classList.remove("hidden");
