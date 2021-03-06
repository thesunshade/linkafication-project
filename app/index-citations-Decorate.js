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
import removeDecoration from "./functions/removeDecoration.js";

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

function saveFile(file, fileName, extension) {
  if (!extension) {
    extension = "txt";
  }
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(new Blob([file], { type: "text/plain;charset=utf-8" }));
  a.download = `${determineWhichDictionary(dictionary[0].word)}-${fileName}.${extension}`;
  a.click();
  navigator.clipboard.writeText(file);
}

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
  saveFile(
    JSON.stringify(decorated, null, 4),
    "Decorated-pli2en_" + determineWhichDictionary(dictionary[0].word).toLowerCase(),
    "json"
  )
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

function reportLinkWrapper(dictionaryName, fileName, extension) {
  if (!extension) {
    extension = "txt";
  }
  return `* [${dictionaryName}-${fileName}.${extension}](https://github.com/thesunshade/linkafication-project/blob/main/${dictionaryName}/Reports/${dictionaryName}-${fileName}.${extension})<br>`;
}

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
  const currentDictionary = determineWhichDictionary(dictionary[0].word);
  //
  //DECORATION REPORT
  decorationReport = `# ${determineWhichDictionary(dictionary[0].word)} decorating report ${Date().toLocaleString()}
  
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
  * ${listOfAllUndecorated.length} citations undecorated
  * ${listOfNonExcludedUndecorated.length} undecorated that should have been

### Links made through decoration process
  Some citations match the refrence ids enough that it is possible to create the final link at the decoration stage. This is them.
${reportLinkWrapper(currentDictionary, "Decor-List_of_final_links_made_through_decoration_only")}

### List of all decorated citations
This includes both those that are final links as well as those only decorated.
${reportLinkWrapper(currentDictionary, "Decor-All_decorated_citations_with_markup")}

### List of all decorated citations without html markup
Just the citations from the list above
${reportLinkWrapper(currentDictionary, "Decor-Citations_Only_all_decorated_citations")}

### Count of books decorated
Just the frequency of individual books from list above.
${reportLinkWrapper(currentDictionary, "Decor-Book_Names_Only_all_decorated_citations")}

### List of all not decorated citations
${reportLinkWrapper(currentDictionary, "Decor-All_Undecorated_citations")}

### Count of books Undecorated
Just the frequency of individual books from list above.
${reportLinkWrapper(currentDictionary, "Decor-Books_only_all_Undecorated_citations")}

### List of all non decorated citations that we are not ignoring
This means that for some reason they *should* be decorated, but something is wrong with them. To see the list of those citations that are being ignored (either because we can't figure out how to turn them into links or because they aren't present on SC) you can check [this file](https://github.com/thesunshade/linkafication-project/blob/main/app/functions/excludeList.js).
${reportLinkWrapper(currentDictionary, "Decor-All_Undecorated_citations_not_excluded")}
`;
  // end of decoration report
  decorationReportButton.classList.remove("hidden");
}

let decorationReportButton = document.getElementById("copy-decoration-report");
decorationReportButton.addEventListener("click", () => saveFile(decorationReport, "DecorationReport", "md"));

let listButton = document.getElementById("make-decorated-lists");
listButton.addEventListener("click", () => makeDecoratedLists(decorated));

copyFinalLinksHtml.addEventListener("click", () =>
  saveFile(
    listOfFinalLinksThroughDecorationOnly.sort().join("\n"),
    "Decor-List_of_final_links_made_through_decoration_only"
  )
);

copyDecoratedHtml.addEventListener("click", () =>
  saveFile(listOfAllDecorated.sort().join("\n"), "Decor-All_decorated_citations_with_markup")
);

copyDecoratedCitations.addEventListener("click", () =>
  saveFile(cleanedListOfDecoratedCitations.join("\n"), "Decor-Citations_Only_all_decorated_citations")
);
copyDecoratedBooks.addEventListener("click", () =>
  saveFile(countUniqueItems(cleanedListOfDecoratedCitations, true), "Decor-Book_Names_Only_all_decorated_citations")
);

copyAllUndecoratedCitations.addEventListener("click", () =>
  saveFile(listOfAllUndecorated.sort().join("\n"), "Decor-All_Undecorated_citations")
);
copyUndecoratedBooks.addEventListener("click", () =>
  saveFile(countUniqueItems(listOfAllUndecorated, true), "Decor-Books_only_all_Undecorated_citations")
);
copyAllNonexcludedUndecoratedCitations.addEventListener("click", () =>
  saveFile(listOfNonExcludedUndecorated.join("\n"), "Decor-All_Undecorated_citations_not_excluded")
);
copyExcluded.addEventListener("click", () => saveFile(excluded.sort().join("\n"), "All_books_being_excluded"));

//
// Link up
//
let linkedDictionary;
let undecoratedLinkedDictionary;
function doTheLinkingUp(decorated) {
  let start = Date.now();
  linkedDictionary = linkDecorated(decorated);
  let end = Date.now();
  linkMessageArea.innerHTML = `<span class="time">Linked dictionary made in ${convertMilSeconds(end - start)}.</span>`;
  linkedDictionaryCopyButton.classList.remove("hidden");
  makeLinkedListButton.classList.remove("hidden");
  linkListArea.classList.remove("hidden");
  undecoratedLinkedDictionary = removeDecoration(linkedDictionary);
  console.log("undecorated Linked dictionary????????");
  console.log(undecoratedLinkedDictionary);
}

let linkButton = document.getElementById("link-all-things");
linkButton.addEventListener("click", () => doTheLinkingUp(decorated));

linkedDictionaryCopyButton.addEventListener("click", () =>
  saveFile(
    JSON.stringify(linkedDictionary, null, 4),
    "LinkedUp-pli2en_" + determineWhichDictionary(dictionary[0].word).toLowerCase(),
    "json"
  )
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
  const currentDictionary = determineWhichDictionary(dictionary[0].word);

  // LINKING REPORT
  linkingReport =
    decorationReport +
    `# ${determineWhichDictionary(dictionary[0].word)} linking report ${Date().toLocaleString()}

  * [Raw Linked Up Dictionary File](https://raw.githubusercontent.com/thesunshade/linkafication-project/main/${determineWhichDictionary(
    dictionary[0].word
  )}/${determineWhichDictionary(dictionary[0].word)}-LinkedUp-pli2en_${determineWhichDictionary(
      dictionary[0].word
    ).toLowerCase()}.json)

  * ${listOfLinkedCitations.length} citations with complete links.<br>
  * ${listOfUnLinkedCitations.length} unlinked citations.

### All ${listOfLinkedCitations.length} links made through both decoration and linking process
${reportLinkWrapper(currentDictionary, "Linking-All_linked_citations")}

### List of all ${listWithoutJataka.length} unlinked citations excluding Jataka citations<br><br>
There are ${listOfUnLinkedCitations.length - listWithoutJataka.length} unlinked Jataka citations not included.

${reportLinkWrapper(currentDictionary, "Linking-Unlinked_citations_without_Jataka")}
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
linkingReportButton.addEventListener("click", () => saveFile(linkingReport, "readMe", "md"));

copyCompletedLinkingHtml.addEventListener("click", () =>
  saveFile(listOfLinkedCitations.join("\n"), "Linking-All_linked_citations")
);
copyDecoratedUnlinked.addEventListener("click", () =>
  saveFile(listWithoutJataka.sort().join("\n"), "Linking-Unlinked_citations_without_Jataka")
);

// this keeps you from clicking until page is loaded
decorateArea.classList.remove("hidden");
