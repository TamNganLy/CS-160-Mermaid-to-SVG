import { run } from "@mermaid-js/mermaid-cli"

const mermaidToSvg = async (mermaidCode, outputFile) => {
   try {
     await run(mermaidCode, outputFile);
     return outputFile;
   } catch (error) {
     return null;
   }
}

export default mermaidToSvg;