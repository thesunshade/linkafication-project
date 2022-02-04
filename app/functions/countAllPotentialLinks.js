export default function countAllPotentialLinks(dictionary) {
  const regex = new RegExp("<span class='ref'>", "g");
  let totalCount = 0;

  dictionary.forEach(item => {
    const count = item.text.match(regex);
    if (count != null) {
      //console.log(item);
      //console.log(count);
      //console.log(count.length);
      totalCount = totalCount + count.length;
      //console.log(totalCount);
    }
  });
  return totalCount;
}
