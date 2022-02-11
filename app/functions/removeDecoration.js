export default function removeDecoration(linkedDictionary) {
  let undecorated = JSON.parse(JSON.stringify(linkedDictionary));

  const regex = new RegExp("<a class='ref' data-division='.+>(.+?)</a>", "g");

  undecorated.forEach(item => {
    item.text = item.text.replaceAll(regex, "<span class='ref'>$1</span>");
  });
  return undecorated;
}
