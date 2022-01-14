import { dictionary } from "./dictionary.js";

let decorated = [...dictionary];
decorated.forEach(item => {
  // VINAYA
  //
  // Volumes 3 and 4 do not track exactly to pli-tv-bu-vb and pli-tv-bu-vb
  // ??? Will we have to do this programatically???
  ///
  item.text = item.text
    .replace(
      /<span class='ref'>Vin\.i\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/vinaya/pli-tv-kd' data-reference='pts-vp-pli1.$1' data-url='en/brahmali'>AN.i.$1$2</a>"
    )
    .replace(
      /<span class='ref'>Vin\.ii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/vinaya/pli-tv-kd' data-reference='pts-vp-pli2.$1' data-url='en/brahmali'>AN.ii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>Vin\.iii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/vinaya/XXXXXXXXX' data-reference='pts-vp-pli3.$1' data-url='en/brahmali'>AN.iii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>Vin\.iv\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/vinaya/XXXXXXXXX' data-reference='pts-vp-pli4.$1' data-url='en/brahmali'>AN.iv.$1$2</a>"
    )
    .replace(
      /<span class='ref'>Vin\.v\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/vinaya/pli-tv-pvr' data-reference='pts-vp-pli5.$1' data-url='en/brahmali'>AN.v.$1$2</a>"
    );
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
  //
  // So, I wrongly assumed that the Dhp followed the same convention as Snp. However `vnp` doesn't seem to exist in the Dhp files. So this below is wrong.
  //
  item.text = item.text.replace(
    /<span class='ref'>Dhp\.(\d+)(.*)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/dhp' data-reference='vnp.$1' data-url='/en/sujato'>Dhp.$1$2</a>"
  );
  // SUTTA NIPATA
  item.text = item.text.replace(
    /<span class='ref'>Snp\.(\d+)(.*)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/snp' data-reference='vnp.$1' data-url='/en/sujato'>Snp.$1$2</a>"
  );
  // UDANA
  item.text = item.text.replace(
    /<span class='ref'>Snp\.(\d+)(.*)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/ud' data-reference='pts-vp-pli$1' data-url='/en/sujato'>Ud.$1$2</a>"
  );
  // ITIVUTTAKA
  item.text = item.text.replace(
    /<span class='ref'>Snp\.(\d+)(.*)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/iti' data-reference='pts-vp-pli$1' data-url='/en/sujato'>Iti.$1$2</a>"
  );
  // THERAGATHA
  item.text = item.text.replace(
    /<span class='ref'>Thag\.(\d+)(.*)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/thag' data-reference='vnp.$1' data-url='/en/sujato'>Thag.$1$2</a>"
  );
  // THERIGATHA
  item.text = item.text.replace(
    /<span class='ref'>Thig\.(\d+)(.*)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/thig' data-reference='vnp.$1' data-url='/en/sujato'>Thig.$1$2</a>"
  );
  // JATAKA
  item.text = item.text
    .replace(
      /<span class='ref'>Ja\.i\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli1.$1' data-url='/pli/ms'>Ja.i.$1$2</a>"
    )
    .replace(
      /<span class='ref'>Ja\.ii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli2.$1' data-url='/pli/ms'>Ja.ii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>Ja\.iii\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli3.$1' data-url='/pli/ms'>Ja.iii.$1$2</a>"
    )
    .replace(
      /<span class='ref'>Ja\.iv\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli4.$1' data-url='/pli/ms'>Ja.iv.$1$2</a>"
    )
    .replace(
      /<span class='ref'>Ja\.v\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli5.$1' data-url='/pli/ms'>Ja.v.$1$2</a>"
    )
    .replace(
      /<span class='ref'>Ja\.vi\.(\d+)(.*)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli6.$1' data-url='/pli/ms'>Ja.vi.$1$2</a>"
    );
  // Milindapanha
  item.text = item.text.replace(
    /<span class='ref'>Mil\.(\d+)(.*)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/mil' data-reference='pts-vp-pli$1' data-url='/pli/ms'>Mil.$1$2</a>"
  );
});
console.log(decorated);
