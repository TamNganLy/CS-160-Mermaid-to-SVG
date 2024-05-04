import 'express';
import MermaidGet from '../service/mermaidGet.js';
import mermaidToSvg from '../service/svgConverting.js';
import CheckUserAccess from "../service/checkUserAccess.js";
import RestResponseMaker from './tools/responseMaker.js';

const getMermaid = async(req, res) => {
    const articleId = req.params.articleId;
    const mermaidGet = new MermaidGet();
    const userId = req.userId;

    try {
        const checkAccessService = new CheckUserAccess(parseInt(articleId), userId);
        const checkAccess = await checkAccessService.checkAccess();

        if (checkAccess) {
            const mermaidFileName = await mermaidGet.get(parseInt(articleId));
            const svgFileName = await mermaidToSvg(mermaidFileName, articleId);
            res.status(200).sendFile(svgFileName);

            await mermaidGet.deleteFromDisk(mermaidFileName);
            await mermaidGet.deleteFromDisk(svgFileName);
        } else {
            const response = RestResponseMaker.makeErrorResponse(["ArticleId not found"]);
            res.status(404).send(response);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }  
}

export default getMermaid;
    
