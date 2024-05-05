import { run } from "@mermaid-js/mermaid-cli";
import { fileURLToPath } from "url";
import path from "path";

const getTempOutputFilePath = (articleId) => {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentFolder = path.dirname(currentFilePath);
  const tempStoragePath = path.resolve(currentFolder, '../../src');
  return path.join(tempStoragePath, articleId + ".svg");
}

const mermaidToSvg = async (mermaidCode, articleId) => {
  try {
    const outputFile = await getTempOutputFilePath(articleId);
    await run(mermaidCode, outputFile);
    return outputFile;
  } catch (error) {
    return null;
  }
}

export default mermaidToSvg;