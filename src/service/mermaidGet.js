import Storage from '../repo/s3Conn.js';
import MermaidDb from '../repo/dbConn.js';
import { unlink } from 'fs/promises';
import { Readable } from "node:stream";
import { createWriteStream } from 'node:fs';

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

    async savetoDisk(data, storageDiagramName) {
        return new Promise(async (resolve, reject) => {
            const body = data.Body;
            const filePath = "./src/resources/" + storageDiagramName;
            if (body instanceof Readable) {
              const writeStream = createWriteStream(filePath);
              body
                .pipe(writeStream)
                .on("error", (err) => reject(err))
                .on("close", () => resolve(filePath));
            } else {
                resolve(false);
            }
        });
    }

    async get(articleId) {
        const diagram = await this.loadDiagramFromDb(articleId);
        const storageDiagramName = this.loadStorageDiagramName(diagram);
        const mermaidStream = await this.getDiagramFromStorage(storageDiagramName);
        const filePath = await this.savetoDisk(mermaidStream, storageDiagramName);
        return filePath;
    }
}

export default MermaidGet;