import { decoratedDictionary } from "./decoratedDictionary.js";
import { dnIds } from "./dnIds.js";
import { mnIds } from "./mnIds.js";
import { snIds } from "./snIds.js";
import { anIds } from "./anIds.js";
import { dhpIds } from "./dhpIds.js";
import { snpIds } from "./snpIds.js";
import { thagIds } from "./thagIds.js";
import { thigIds } from "./thigIds.js";
import { jaIds } from "./jaIds.js";
import { milIds } from "./milIds.js";
import { vinIds } from "./vinIds.js";

let linked = [...decoratedDictionary];

const regex = new RegExp("<a class='ref' data-division='(.+?)' data-reference='(.+?)' data-url='(.+?)'>(.+?)</a>", "g");

linked.forEach(entry => {
  let array = [...entry.text.matchAll(regex)];
  array.forEach(item => {
    if (item[1] === "/sutta/dn") {
      for (const [key, value] of Object.entries(dnIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/sutta/mn") {
      for (const [key, value] of Object.entries(mnIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/sutta/sn") {
      for (const [key, value] of Object.entries(snIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/sutta/an") {
      for (const [key, value] of Object.entries(anIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/sutta/kn/dhp") {
      for (const [key, value] of Object.entries(dhpIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/sutta/kn/snp") {
      for (const [key, value] of Object.entries(snpIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/sutta/kn/thag") {
      for (const [key, value] of Object.entries(thagIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/sutta/kn/thig") {
      for (const [key, value] of Object.entries(thigIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/sutta/kn/ja") {
      for (const [key, value] of Object.entries(jaIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/sutta/kn/mil") {
      for (const [key, value] of Object.entries(milIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    } else if (item[1] === "/vinaya") {
      for (const [key, value] of Object.entries(vinIds)) {
        if (value.split(", ").includes(item[2])) {
          const parts = key.split(":");
          const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
          entry.text = entry.text.replace(item[0], link);
          break;
        }
      }
    }
  });
});
console.log(linked);
