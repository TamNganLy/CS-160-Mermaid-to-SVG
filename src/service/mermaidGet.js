import Storage from '../repo/s3Conn.js';
import MermaidDb from '../repo/dbConn.js';
import { unlink } from 'fs/promises';
import { Readable } from "node:stream";
import { createWriteStream } from 'node:fs';
import { fileURLToPath } from "url";
import path from "path";

class MermaidGet {
    storage = Storage.getInstance();
    db = MermaidDb.getInstance();

    constructor() {}

    async loadDiagramFromDb(articleId) {
        return await this.db.getMermaidById(articleId);
    }
    
    loadStorageDiagramName(diagram) {
        return diagram.StorageDiagramUUID + ".mmd";
    }
    
    async getDiagramFromStorage(storageDiagramUUID) {
        return await this.storage.getMermaid(storageDiagramUUID);
    }

    async deleteFromDisk(filePath) {
        await unlink(filePath);
    }

    getTempMermaidFilePath(articleId) {
        const currentFilePath = fileURLToPath(import.meta.url);
        const currentFolder = path.dirname(currentFilePath);
        const tempStoragePath = path.resolve(currentFolder, '../../src/resources');
        return path.join(tempStoragePath, articleId);
      }

    async savetoDisk(data, articleId) {
        return new Promise(async (resolve, reject) => {
            const body = data.Body;
            const filePath = await this.getTempMermaidFilePath(articleId);
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
        const storageDiagramUUID = this.loadStorageDiagramName(diagram);

        const mermaidStream = await this.getDiagramFromStorage(storageDiagramUUID);
        const filePath = await this.savetoDisk(mermaidStream, storageDiagramUUID);
        return filePath;
    }
}

export default MermaidGet;