export default function countAllPotentialLinks(dictionary) {
  const regex = new RegExp("<span class='ref'>", "g");
  let totalCount = 0;
  let start1 = Date.now();
  dictionary.forEach(item => {
    const count = item.text.match(regex);
    if (count != null) {
      totalCount = totalCount + count.length;
    }
  });
  let end1 = Date.now();

  return totalCount;
}
