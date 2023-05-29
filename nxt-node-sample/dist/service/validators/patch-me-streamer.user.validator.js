"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.default = joi_1.default.object({
    username: joi_1.default.string().required(),
    channel: joi_1.default.string().required()
});
//# sourceMappingURL=patch-me-streamer.user.validator.js.map