import Storage from "../../src/repo/s3Conn.js";
import {jest} from '@jest/globals'

jest.useFakeTimers();

describe('Article Database', () => {

    const storage = Storage.getInstance();

    test("get Mermaid file by key", async () => {       
        const articleId = 'mermaid.mmd';

        const mermaidFile = await storage.getMermaid(articleId);
    });
});