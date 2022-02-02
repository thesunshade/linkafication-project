export default function determineWhichDictionary(firstEntry) {
  let dictionaryName;
  switch (firstEntry) {
    case "a":
      dictionaryName = "PED";
      break;
    case "akaniṭṭhā":
      dictionaryName = "DPPN";
      break;
    case "akka":
      dictionaryName = "Nature";
  }

  return dictionaryName;
}
