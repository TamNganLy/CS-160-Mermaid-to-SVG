import 'express';
import MermaidGet from '../service/mermaidGet.js';
import mermaidToSvg from '../service/svgConverting.js';

const getMermaid = async(req, res) => {
    const articleId = req.params.articleId.replace(':', '');
    const mermaidGet = new MermaidGet();

    try {
        const mermaidFileName = await mermaidGet.get(articleId);
        const svgFileName = "outputFile.svg";
        await mermaidToSvg(mermaidFileName, svgFileName);
        res.status(200).sendFile(svgFileName, { root: '.' });

    } catch (err) {
        console.error(err.message);
    }

    
}

export default getMermaid;
    