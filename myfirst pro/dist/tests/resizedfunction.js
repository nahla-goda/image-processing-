"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resized_1 = require("../sharpresized/resized");
describe('testing image resized function', () => {
    it('by passing correct patamter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resized_1.resized)('fjord', 400, 405)).toBeRejectedWithError(Error, 'Input file is missing');
    }));
});
