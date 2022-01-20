import { dictionary } from "./dictionary.js";

let decorated = [...dictionary];
decorated.forEach(item => {
  // VINAYA
  //
  // Volumes 3 and 4 do not track exactly to pli-tv-bu-vb and pli-tv-bu-vb
  // ??? Will we have to do this programatically???
  ///
  item.text = item.text
    .replaceAll(
      /<span class='ref'>Vin\.i\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/vinaya' data-reference='pts-vp-pli1.$1' data-url='en/brahmali'>Vin.i.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Vin\.ii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/vinaya' data-reference='pts-vp-pli2.$1' data-url='en/brahmali'>Vin.ii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Vin\.iii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/vinaya' data-reference='pts-vp-pli3.$1' data-url='en/brahmali'>Vin.iii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Vin\.iv\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/vinaya' data-reference='pts-vp-pli4.$1' data-url='en/brahmali'>Vin.iv.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Vin\.v\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/vinaya' data-reference='pts-vp-pli5.$1' data-url='en/brahmali'>Vin.v.$1$2</a>"
    );
  // DIGHA NIKAYA
  item.text = item.text
    .replaceAll(
      /<span class='ref'>DN\.i\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/dn' data-reference='pts-vp-pli1.$1' data-url='/en/sujato'>DN.i.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>DN\.ii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/dn' data-reference='pts-vp-pli2.$1' data-url='/en/sujato'>DN.ii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>DN\.iii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/dn' data-reference='pts-vp-pli3.$1' data-url='/en/sujato'>DN.iii.$1$2</a>"
    );
  // MAJJHIMA NIKAYA
  item.text = item.text
    .replaceAll(
      /<span class='ref'>MN\.i\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/mn' data-reference='pts-vp-pli1.$1' data-url='/en/sujato'>MN.i.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>MN\.ii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/mn' data-reference='pts-vp-pli2.$1' data-url='/en/sujato'>MN.ii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>MN\.iii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/mn' data-reference='pts-vp-pli3.$1' data-url='/en/sujato'>MN.iii.$1$2</a>"
    );
  // SAMYUTTA NIKAYA
  item.text = item.text
    .replaceAll(
      /<span class='ref'>SN\.i\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli1.$1' data-url='/en/sujato'>SN.i.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>SN\.ii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli2.$1' data-url='/en/sujato'>SN.ii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>SN\.iii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli3.$1' data-url='/en/sujato'>SN.iii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>SN\.iv\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli4.$1' data-url='/en/sujato'>SN.iv.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>SN\.v\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/sn' data-reference='pts-vp-pli5.$1' data-url='/en/sujato'>SN.v.$1$2</a>"
    );
  // ANGUTTARA NIKAYA
  item.text = item.text
    .replaceAll(
      /<span class='ref'>AN\.i\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli1.$1' data-url='/en/sujato'>AN.i.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>AN\.ii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli2.$1' data-url='/en/sujato'>AN.ii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>AN\.iii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli3.$1' data-url='/en/sujato'>AN.iii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>AN\.iv\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli4.$1' data-url='/en/sujato'>AN.iv.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>AN\.v\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/an' data-reference='pts-vp-pli5.$1' data-url='/en/sujato'>AN.v.$1$2</a>"
    );
  // DHAMMAPADA
  item.text = item.text.replaceAll(
    /<span class='ref'>Dhp\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/dhp' data-reference='vnp.$1' data-url='/en/sujato'>Dhp.$1$2</a>"
  );
  // SUTTA NIPATA
  item.text = item.text.replaceAll(
    /<span class='ref'>Snp\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/snp' data-reference='vnp.$1' data-url='/en/sujato'>Snp.$1$2</a>"
  );
  // UDANA
  item.text = item.text.replaceAll(
    /<span class='ref'>Ud\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/ud' data-reference='pts-vp-pli$1' data-url='/en/sujato'>Ud.$1$2</a>"
  );
  // ITIVUTTAKA
  item.text = item.text.replaceAll(
    /<span class='ref'>It\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/iti' data-reference='pts-vp-pli$1' data-url='/en/sujato'>Iti.$1$2</a>"
  );
  // THERAGATHA
  item.text = item.text.replaceAll(
    /<span class='ref'>Thag\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/thag' data-reference='vnp.$1' data-url='/en/sujato'>Thag.$1$2</a>"
  );
  // THERIGATHA
  item.text = item.text.replaceAll(
    /<span class='ref'>Thig\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/thig' data-reference='vnp.$1' data-url='/en/sujato'>Thig.$1$2</a>"
  );
  // VIMANAVATTHU
  //
  // This code actually generates the final link. It also depends on the citation
  //being strictly Vv.##.##. Nothing else will be found.
  //
  item.text = item.text.replaceAll(
    /<span class='ref'>Vv\.(\d+?)\.(\d+?)<\/span>/g,
    "<a class='ref' href='https://suttacentral.net/vv$1/pli/ms#$2.1'>Vv.$1.$2</a>"
  );
  // PETAVATTHU
  //
  // This code actually generates the final link. It also depends on the citation
  //being strictly Pv.##.##. Nothing else will be found.
  //
  item.text = item.text.replaceAll(
    /<span class='ref'>Pv\.(\d+?)\.(\d+?)<\/span>/g,
    "<a class='ref' href='https://suttacentral.net/pv$1/pli/ms#$2.1'>Pv.$1.$2</a>"
  );
  // JATAKA
  item.text = item.text
    .replaceAll(
      /<span class='ref'>Ja\.i\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli1.$1' data-url='/pli/ms'>Ja.i.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ja\.ii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli2.$1' data-url='/pli/ms'>Ja.ii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ja\.iii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli3.$1' data-url='/pli/ms'>Ja.iii.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ja\.iv\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli4.$1' data-url='/pli/ms'>Ja.iv.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ja\.v\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli5.$1' data-url='/pli/ms'>Ja.v.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ja\.vi\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/ja' data-reference='pts-vp-pli6.$1' data-url='/pli/ms'>Ja.vi.$1$2</a>"
    );

  // Buddhavamsa
  //
  // creates final link. Takes Bv.dd.dd and turns it into chapter and verse first id
  item.text = item.text.replaceAll(
    /<span class='ref'>Bv\.(\d+?)\.(\d+?)(.+?)<\/span>/g,
    "<a class='ref' href='https://suttacentral.net/bv$1/pli/ms#$2.1'>Bv.$1.$2$3</a>"
  );

  // Milindapanha
  item.text = item.text.replaceAll(
    /<span class='ref'>Mil\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/mil' data-reference='pts-vp-pli$1' data-url='/pli/ms'>Mil.$1$2</a>"
  );
  // NETTI
  item.text = item.text.replaceAll(
    /<span class='ref'>Ne\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/sutta/kn/ne' data-reference='pts-vp-pli$1' data-url='/pli/ms'>Ne.$1$2</a>"
  );

  // UDANA SPECIAL FOR DPPN
  //
  // This code actually generates the final link. It also depends on the citation
  //being strictly VV.##.##. Nothing else will be found.
  //
  item.text = item.text
    .replaceAll(
      /<span class='ref'>Ud\.i\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' href='https://suttacentral.net/ud1.$1/en/sujato'>Ud.1.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ud\.ii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' href='https://suttacentral.net/ud2.$1/en/sujato'>Ud.2.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ud\.iii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' href='https://suttacentral.net/ud3.$1/en/sujato'>Ud.3.$1</a>"
    )
    .replaceAll(
      /<span class='ref'>Ud\.iv\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' href='https://suttacentral.net/ud4.$1/en/sujato'>Ud.4.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ud\.v\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' href='https://suttacentral.net/ud5.$1/en/sujato'>Ud.5.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ud\.vi\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' href='https://suttacentral.net/ud6.$1/en/sujato'>Ud.6.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ud\.vii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' href='https://suttacentral.net/ud7.$1/en/sujato'>Ud.7.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ud\.viii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' href='https://suttacentral.net/ud8.$1/en/sujato'>Ud.8.$1$2</a>"
    );

  /// SPECIAL FOR PED
  // VIMANAVATTHU SPECIAL FOR PED
  //
  // This code actually generates the final link. It also depends on the citation
  //being strictly VV.dd#dd. Nothing else will be found.
  //
  item.text = item.text.replaceAll(
    /<span class='ref'>Vv\.(\d+?)#(\d+?)<\/span>/g,
    "<a class='ref' href='https://suttacentral.net/vv$1/pli/ms#$2.1'>Vv.$1.$2</a>"
  );
  // PETAVATTHU  SPECIAL FOR PED
  //
  // This code actually generates the final link. It also depends on the citation
  //being strictly PV.dd#dd. Nothing else will be found.
  //
  item.text = item.text.replaceAll(
    /<span class='ref'>Pv\.(\d+?)#(\d+?)<\/span>/g,
    "<a class='ref' href='https://suttacentral.net/pv$1/pli/ms#$2.1'>Pv.$1.$2</a>"
  );
  // SECOND WAY TO CREATE PETAVATTHU LINKS
  // This way relies on the citation being in roman numerals such as Vv.iii.4 for the 4th sutta in the 3rd chapter.

  // Paṭisambhidāmagga
  item.text = item.text
    .replaceAll(
      /<span class='ref'>Ps\.i\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/ps' data-reference='pts-vp-pli1.$1' data-url='/pli/ms'>Ps.i.$1$2</a>"
    )
    .replaceAll(
      /<span class='ref'>Ps\.ii\.(\d+?)(.*?)<\/span>/g,
      "<a class='ref' data-division='/sutta/ps' data-reference='pts-vp-pli2.$1' data-url='/pli/ms'>Ps.ii.$1$2</a>"
    );
  // Puggalapaññatti
  item.text = item.text.replaceAll(
    /<span class='ref'>Pp\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/abhidhamma/pli-tv-ab/pp' data-reference='pts-vp-pli$1' data-url='/pli/ms'>Pp.$1$2</a>"
  );
  // Kathāvatthu -- Single volume
  item.text = item.text.replaceAll(
    /<span class='ref'>Kv\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/abhidhamma/pli-tv-ab/kv' data-reference='pts-vp-pli$1' data-url='/pli/ms'>Kv.$1$2</a>"
  );
  // Vibhaṅga
  item.text = item.text.replaceAll(
    /<span class='ref'>Vb\.(\d+?)(.*?)<\/span>/g,
    "<a class='ref' data-division='/abhidhamma/pli-tv-ab/vb' data-reference='pts-vp-pli$1' data-url='/pli/ms'>Vb.$1$2</a>"
  );
});
console.log("decorated code");
console.log(decorated);
