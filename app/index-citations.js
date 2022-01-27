import { dictionary } from "./dictionary.js";

const regex = new RegExp("<span class='ref'>(.+?)</span>", "g");
const regex1 = new RegExp("<span class='ref'>");
const regex2 = new RegExp("</span>");
const excludedDhammika = ["Bcv", "Jm", "Vism", "Bc", "Mvu"];
const excludedDPPN = ["CAGI", "Cyp", "DhSA", "Dpv", "Mbv", "MT", "Sp", "Mhv"];
const excludedCommentary = [
  "DN-a",
  "MN-a",
  "SN-a",
  "AN-a",
  "Kh-a",
  "Ud-a",
  "Pv-a",
  "Dhp-a",
  "Vv-a",
  "Kp-a",
  "Snp-a",
  "Sn-a",
  "Thag-a",
  "Thig-a",
  "Ja-a",
  "Vb-a",
  "Kv-a",
  "Kvu-a",
  "Ne-a",
  "Dhs-a",
  "Pp-a", "Bu-a", "Nid-a"
];
const excludedPED = [
  "Duka-pa", // Doesn't have PTS numbers in ms
  "Tikp", // Doesn't have PTS numbers in ms
  "Abhp",
  "Anvs",
  "Asl", // possibly Aṭṭhasālinī??
  "Avs",
  "Bdhd",
  "Dhtm", // 130 citations Unsure what they are
  "Dhtp",
  "Divy", // Divyavadana
  "Dpvs",
  "Davs",
  "Ds", // citations are to paragraph numbers not in manuscript TODO
  "Jtm",
  "Kacc",
  "Khus",
  "Lal",
  "MBh", // occurs twice in same word
  "Mhbv", // Mahabodhivamsa ??
  "Mbhv", // Mahabodhivamsa ??
  "Mbvs", // Mahabodhivamsa ??
  "Mhvs",
  "Pgdp",
  "Saddhp",
  "Sāsv",
  "Sdhf",
  "Sdhp", // 1414 citations. Unsure what they are
  "Sddp",
  "Shhp",
  "Mvst",
];
const cannotFigureOutPED = [
  "Cnd", // numbers don't match anything in ms
  "Dhvs", // only one
  "Dukp", // Only one
  "Kvn", // Possible typo in printed book. See notes
  "Kvu", // Possible typo in printed book. See notes
];
const excluded = [...excludedDhammika, ...excludedDPPN, ...excludedCommentary, ...excludedPED, ...cannotFigureOutPED];

let list = [];
dictionary.forEach(item => {
  if (list.concat(item.text.match(regex)) != null) {
    list = list.concat(item.text.match(regex));
  }
});
console.log("All Citations not decorated")
console.log(list)

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
