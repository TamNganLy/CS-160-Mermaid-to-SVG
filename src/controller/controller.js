import 'express';
import MermaidGet from '../service/mermaidGet.js';
import mermaidToSvg from '../service/svgConverting.js';

const getMermaid = async(req, res) => {
    const articleId = req.params.articleId.replace(':', '');
    const mermaidGet = new MermaidGet();

    try {
        const mermaidFileName = await mermaidGet.get(articleId);
        const svgFileName = await mermaidToSvg(mermaidFileName, articleId);
        res.status(200).sendFile(svgFileName);
        await mermaidGet.deleteFromDisk(mermaidFileName);
        await mermaidGet.deleteFromDisk(svgFileName);

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }  
}

export default getMermaid;
    
