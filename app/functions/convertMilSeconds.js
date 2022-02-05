export default function convertMilSeconds(milSeconds) {
  if (milSeconds < 1000) {
    return `${milSeconds} ms`;
  } else if (milSeconds < 60000) {
    return `${(milSeconds / 1000).toFixed(2)} sec`;
  } else {
    return `${(milSeconds / 60000).toFixed(2)} min`;
  }
}
