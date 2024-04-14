import Storage from '../repo/s3Conn.js';
import MermaidDb from '../repo/dbConn.js';
import { unlink } from 'fs/promises';

class MermaidGet {
    storage = Storage.getInstance();
    db = MermaidDb.getInstance();

    constructor() {}

    async loadDiagramFromDb(articleId) {
        articleId = parseInt(articleId);
        return await this.db.getMermaidById(articleId);
    }
    
    loadStorageDiagramName(diagram) {
        return diagram.StorageDiagramName;
    }
    
    async getDiagramFromStorage(storageDiagramName) {
        return await this.storage.getMermaid(storageDiagramName);
    }

    async deleteFromDisk(filePath) {
        await unlink(filePath);
    }

    async get(articleId) {
        const diagram = await this.loadDiagramFromDb(articleId);
        const storageDiagramName = this.loadStorageDiagramName(diagram);
        const finish = await this.getDiagramFromStorage(storageDiagramName);
        return "./src/resources/" + storageDiagramName;
    }
}

export default MermaidGet;