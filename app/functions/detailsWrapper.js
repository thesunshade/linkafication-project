export default function detailsWrapper(content) {
  return `
<details><summary>Show full list</summary>

\`\`\`html
${content}
\`\`\`
</details>
    `;
}
