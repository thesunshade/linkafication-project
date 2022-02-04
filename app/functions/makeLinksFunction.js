//import { decoratedDictionary } from "./decoratedDictionary.js";
import countUniqueItems from "./countUniqueItems.js";
import { dnIds } from "../refs/dnIds.js";
import { mnIds } from "../refs/mnIds.js";
import { snIds } from "../refs/snIds.js";
import { anIds } from "../refs/anIds.js";
import { dhpIds } from "../refs/dhpIds.js";
import { udIds } from "../refs/udIds.js";
import { itiIds } from "../refs/itiIds.js";
import { snpIds } from "../refs/snpIds.js";
import { vvIds } from "../refs/vvIds.js";
import { pvIds } from "../refs/pvIds.js";
import { thagIds } from "../refs/thagIds.js";
import { thigIds } from "../refs/thigIds.js";
import { jaIds } from "../refs/jaIds.js";
import { bvIds } from "../refs/bvIds.js";
import { milIds } from "../refs/milIds.js";
import { mndIds } from "../refs/mndIds.js";
import { neIds } from "../refs/neIds.js";
import { peIds } from "../refs/peIds.js";
import { psIds } from "../refs/psIds.js";
import { vbIds } from "../refs/vbIds.js";
import { ppIds } from "../refs/ppIds.js";
import { kvIds } from "../refs/kvIds.js";
import { vinIds } from "../refs/vinIds.js";

export default function linkDecorated(decoratedDictionary) {
  let linked = [...decoratedDictionary];

  const regex = new RegExp(
    "<a class='ref' data-division='(.+?)' data-reference='(.+?)' data-url='(.+?)'>(.+?)</a>",
    "g"
  );

  var start = Date.now();
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
          if (
            value.split(", ").includes(item[2]) |
            value.split(", ").includes(item[2] + ".1") |
            value.split(", ").includes(item[2] + ".2") |
            value.split(", ").includes(item[2] + ".3") |
            value.split(", ").includes(item[2] + ".4") |
            value.split(", ").includes(item[2] + ".5")
          ) {
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
      } else if (item[1] === "/sutta/kn/ud") {
        for (const [key, value] of Object.entries(udIds)) {
          if (value.split(", ").includes(item[2])) {
            const parts = key.split(":");
            const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
            entry.text = entry.text.replace(item[0], link);
            break;
          }
        }
      } else if (item[1] === "/sutta/kn/iti") {
        for (const [key, value] of Object.entries(itiIds)) {
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
      } else if (item[1] === "/sutta/kn/vv") {
        for (const [key, value] of Object.entries(vvIds)) {
          if (value.split(", ").includes(item[2])) {
            const parts = key.split(":");
            const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
            entry.text = entry.text.replace(item[0], link);
            break;
          }
        }
      } else if (item[1] === "/sutta/kn/pv") {
        for (const [key, value] of Object.entries(pvIds)) {
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
      } else if (item[1] === "/sutta/kn/bv") {
        for (const [key, value] of Object.entries(bvIds)) {
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
      } else if (item[1] === "/sutta/kn/mnd") {
        for (const [key, value] of Object.entries(mndIds)) {
          if (value.split(", ").includes(item[2])) {
            const parts = key.split(":");
            const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
            entry.text = entry.text.replace(item[0], link);
            break;
          }
        }
      } else if (item[1] === "/sutta/kn/pe") {
        for (const [key, value] of Object.entries(peIds)) {
          if (value.split(", ").includes(item[2])) {
            const parts = key.split(":");
            const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
            entry.text = entry.text.replace(item[0], link);
            break;
          }
        }
      } else if (item[1] === "/sutta/kn/ne") {
        for (const [key, value] of Object.entries(neIds)) {
          if (value.split(", ").includes(item[2])) {
            const parts = key.split(":");
            const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
            entry.text = entry.text.replace(item[0], link);
            break;
          }
        }
      } else if (item[1] === "/sutta/kn/ps") {
        for (const [key, value] of Object.entries(psIds)) {
          if (value.split(", ").includes(item[2])) {
            const parts = key.split(":");
            const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
            entry.text = entry.text.replace(item[0], link);
            break;
          }
        }
      } else if (item[1] === "/abhidhamma/pli-tv-ab/vb") {
        for (const [key, value] of Object.entries(vbIds)) {
          if (value.split(", ").includes(item[2])) {
            const parts = key.split(":");
            const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
            entry.text = entry.text.replace(item[0], link);
            break;
          }
        }
      } else if (item[1] === "/abhidhamma/pli-tv-ab/kv") {
        for (const [key, value] of Object.entries(kvIds)) {
          if (value.split(", ").includes(item[2])) {
            const parts = key.split(":");
            const link = `<a class='ref' href='https://suttacentral.net/${parts[0]}${item[3]}#${parts[1]}'>${item[4]}</a>`;
            entry.text = entry.text.replace(item[0], link);
            break;
          }
        }
      } else if (item[1] === "/abhidhamma/pli-tv-ab/pp") {
        for (const [key, value] of Object.entries(ppIds)) {
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
  var end = Date.now();
  console.log(`Execution time: ${(end - start) / 1000} seconds`);

  return linked;
}
