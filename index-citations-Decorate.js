import { dictionary } from "./dictionary.js";

let decorated = [...dictionary];
decorated.forEach(item => {
  // DIGHA NIKAYA
  item.text = item.text
    .replace(
      /<span class='ref'>DN\.i\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/dn' data-reference='pts-vp-pli1.$1' data-url='/en/sujato'>DN.i.$1$2</a>"
    )
    .replace(
      /<span class='ref'>DN\.ii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/dn' data-reference='pts-vp-pli2.$1' data-url='/en/sujato'>DN.ii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>DN\.iii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/dn' data-reference='pts-vp-pli3.$1' data-url='/en/sujato'>DN.iii.$1$2</a>"
    );
  // MAJJHIMA NIKAYA
  item.text = item.text
    .replace(
      /<span class='ref'>MN\.i\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/mn' data-reference='pts-vp-pli1.$1' data-url='/en/sujato'>MN.i.$1$2</a>"
    )
    .replace(
      /<span class='ref'>MN\.ii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/mn' data-reference='pts-vp-pli2.$1' data-url='/en/sujato'>MN.ii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>MN\.iii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/mn' data-reference='pts-vp-pli3.$1' data-url='/en/sujato'>MN.iii.$1$2</a>"
    );
  // SAMYUTTA NIKAYA
  item.text = item.text
    .replace(
      /<span class='ref'>SN\.i\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli1.$1' data-url='/en/sujato'>SN.i.$1$2</a>"
    )
    .replace(
      /<span class='ref'>SN\.ii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli2.$1' data-url='/en/sujato'>SN.ii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>SN\.iii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli3.$1' data-url='/en/sujato'>SN.iii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>SN\.iv\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli4.$1' data-url='/en/sujato'>SN.iv.$1$2</a>"
    )
    .replace(
      /<span class='ref'>SN\.v\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli5.$1' data-url='/en/sujato'>SN.v.$1$2</a>"
    );
  // ANGUTTARA NIKAYA
  item.text = item.text
    .replace(
      /<span class='ref'>AN\.i\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli1.$1' data-url='/en/sujato'>AN.i.$1$2</a>"
    )
    .replace(
      /<span class='ref'>AN\.ii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli2.$1' data-url='/en/sujato'>AN.ii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>AN\.iii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli3.$1' data-url='/en/sujato'>AN.iii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>AN\.iv\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli4.$1' data-url='/en/sujato'>AN.iv.$1$2</a>"
    )
    .replace(
      /<span class='ref'>AN\.v\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli5.$1' data-url='/en/sujato'>AN.v.$1$2</a>"
    );
  // DHAMMAPADA
  item.text = item.text.replace(
    /<span class='ref'>Dhp\.(\d+)(.*)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/dhp' data-reference='vnp.$1' data-url='/en/sujato'>Dhp.$1$2</a>"
  );
  // SUTTA NIPATA
  item.text = item.text.replace(
    /<span class='ref'>Snp\.(\d+)(.*)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/snp' data-reference='vnp.$1' data-url='/en/sujato'>Snp.$1$2</a>"
  );
});
console.log(decorated);
