import 'express';
import MermaidGet from '../service/mermaidGet.js';
import mermaidToSvg from '../service/svgConverting.js';

const getMermaid = async(req, res) => {
    const articleId = req.params.articleId.replace(':', '');
    const mermaidGet = new MermaidGet();

    try {
        const mermaidFileName = await mermaidGet.get(articleId);
        const svgFileName = "./src/resources/outputFile.svg";
        await mermaidToSvg(mermaidFileName, svgFileName);
        res.status(200).sendFile(svgFileName, { root: '.' });
        await mermaidGet.deleteFromDisk(mermaidFileName);
        await mermaidGet.deleteFromDisk(svgFileName);

    } catch (err) {
        console.error("Something went wrong. Try later!");
    }

    
}

export default getMermaid;
    