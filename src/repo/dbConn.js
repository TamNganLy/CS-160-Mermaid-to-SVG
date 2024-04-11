import { PrismaClient } from '@prisma/client'

class MermaidDb {
    static instance;
    db;

    constructor() {
        this.db = new PrismaClient()
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

    async getArticles(limit = 10) {
        return await this.db.articles.findMany({
            take: limit
        });
    }
}

export default MermaidDb;
