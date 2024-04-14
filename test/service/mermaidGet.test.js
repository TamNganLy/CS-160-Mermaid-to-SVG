import MermaidGet from "../../src/service/mermaidGet.js";
import {jest} from '@jest/globals'

jest.useFakeTimers();

describe("Article Get Service", () => {
    const mermaidGet = new MermaidGet();
    const articleId = 2;
    beforeEach(() => {
        jest.resetAllMocks();
      });

    test("Get Mermaid", async () => {
        expect(async () => {
            await mermaidGet.get(articleId);
        }).not.toThrow();
    });
    
});