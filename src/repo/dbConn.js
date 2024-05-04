import prismaClient from './db.js';

class MermaidDb {
    static instance;
    db = prismaClient;

    constructor() {
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new MermaidDb();
        }
        return this.instance;
    }

    async getMermaidById(articleId) {
        const diagram = await this.db.diagram.findUnique({
            "where": {
                "ArticleID": articleId
            }
        });
        return diagram;
    }
}

export default MermaidDb;
