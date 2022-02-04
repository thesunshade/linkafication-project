export default function convertMilSeconds(milSeconds) {
  if (milSeconds < 1000) {
    return `${milSeconds} Milliseconds`;
  } else if (milSeconds < 60000) {
    return `${(milSeconds / 1000).toFixed(2)} Seconds`;
  } else {
    return `${(milSeconds / 60000).toFixed(2)} minutes`;
  }
}
