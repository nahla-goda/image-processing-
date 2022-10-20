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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const checkfile_1 = __importDefault(require("../../sharpresized/checkfile"));
const resized_1 = __importDefault(require("../../sharpresized/resized"));
const param = express_1.default.Router();
//check paramters vailation
param.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagename = req.query.imagename;
    const widthh = req.query.width;
    const heightt = req.query.height;
    const height = parseInt(heightt);
    const width = parseInt(widthh);
    //in this case  http://localhoast/api/images
    if (!('imagename' in req.query) && !('width' in req.query) && (!(height in req.query))) {
        res.send('please enter your api paramteres imagename & width& height');
        return;
    }
    //in this case  http://localhoast/api/images?imagename=(string)&width= (number)
    else if (!('width' in req.query) && ('imagename' in req.query)) {
        res.status(400).send('missing your correct width');
        return;
    }
    else if ((width <= 0) || (isNaN(width))) {
        res.status(400).send('width should be number');
        return;
    }
    //in this case  http://localhoast/api/images?imagename=(string)&width=(number)&height=(number)
    else if (!('height' in req.query)) {
        res.status(400).send('missing your correct height');
        return;
    }
    else if ((height <= 0) || (isNaN(height))) {
        res.status(400).send('height should be number');
        return;
    }
    // check fileexitand cached and calling resized function 
    try {
        const imagePath = `${imagename}${width}x${height}.jpg`;
        const resizePath = `./dist/${imagename}${width}x${height}.jpg`;
        const imagePathExists = yield (0, checkfile_1.default)(path_1.default.join("dist", imagePath));
        if (imagePathExists) {
            res.sendFile(path_1.default.join(__dirname, '../', '../', '../', 'dist/' + imagePath));
        }
        else {
            // call resized function and pass 3 parmemter   
            const response = yield (0, resized_1.default)(imagename, width, height);
            response.toFile(resizePath, (error) => {
                if (error) {
                    res.status(403).send({
                        ok: "failed",
                        message: error.message,
                    });
                }
                else {
                    res.sendFile(path_1.default.join(__dirname, '../', '../', '../', 'dist/' + imagePath));
                }
            });
        }
    }
    catch (e) {
        console.log(e);
    }
}));
exports.default = param;
