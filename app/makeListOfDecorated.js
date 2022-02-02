export default function makeListOfDecorated(dictionary) {
  const regex = new RegExp("<a class='ref' data-division=(.+?)</a>", "g");

  let list = [];
  dictionary.forEach(item => {
    if (item.text.match(regex) != null) {
      list = list.concat(item.text.match(regex));
    }
  });
  console.log("All Decorated citations as anchors without finished links");
  console.log(list);
}
