import MermaidDb from "../../src/repo/dbConn.js";

describe('Article Database', () => {

    const mermaidDb = MermaidDb.getInstance();

    test("get Mermaid file by ID", async () => {       
        const articleId = 2;

        const mermaid = await mermaidDb.getMermaidById(articleId);
        console.log(mermaid);
    });
});