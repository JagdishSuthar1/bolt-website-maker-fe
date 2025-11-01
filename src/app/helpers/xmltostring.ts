import { Step } from "../types/user";

export default async function xmltostring(xml: string): Promise<Step[]> {
  if (!xml) return [];

  let cleaned = xml
    .replace(/^\uFEFF/, "")
    .replace(/^```xml\s*/i, "")
    .replace(/```$/i, "")
    .replace(/<\/?boltArtifact[^>]*>/gi, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

  const boltActionRegex = /<boltAction([\s\S]*?)>([\s\S]*?)<\/boltAction>/gi;

  const steps: Step[] = [];

  let match: RegExpExecArray | null;
  while ((match = boltActionRegex.exec(cleaned)) !== null) {
    let attrText = match[1] || "";
    let content = (match[2] || "").trim();

    attrText = attrText.replace(/\\"/g, '"').replace(/\\'/g, "'");

    const filePathMatch = attrText.match(/filePath\s*=\s*["']([^"']+)["']/i);
    const filePath = filePathMatch ? filePathMatch[1].trim() : "unknown";

    content = content
      .replace(/\\r\\n/g, "\r\n")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");

    steps.push({
      title: filePath,
      status: "Pending",
      content,
    });
  }

  return steps;
}
