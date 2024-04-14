import mermaidToSvg from "../../src/service/svgConverting.js";
import {jest} from '@jest/globals'

jest.useFakeTimers();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Controller", () => {

    test("Get mermaid from storage and convert to svg", async () => {
        expect(async () => {
            await mermaidToSvg("mermaid.mmd", "output.svg");
        }).not.toThrow();
    });
});