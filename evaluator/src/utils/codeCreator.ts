export default function codeCreator(
  startingCode: string,
  userCode: string,
  endCode: string
): string {
  return `
    ${startingCode}

    ${userCode}

    ${endCode}
    `;
}
