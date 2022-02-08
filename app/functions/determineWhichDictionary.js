export default function determineWhichDictionary(firstEntry) {
  let dictionaryName;
  switch (firstEntry) {
    case "a":
      dictionaryName = "PTS";
      break;
    case "akaniṭṭhā":
      dictionaryName = "DPPN";
      break;
    case "akka":
      dictionaryName = "Dhammika";
  }

  return dictionaryName;
}
