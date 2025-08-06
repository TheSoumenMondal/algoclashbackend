import { marked } from "marked";
import sanitize from "sanitize-html";

export async function sanitizeMarkdown(input: string) {
  const convertedHTML = await marked.parse(input);
  const sanitizedHtml = sanitize(convertedHTML, {
    allowedTags: sanitize.defaults.allowedTags.concat(['img']),
  });
  return sanitizedHtml;
}