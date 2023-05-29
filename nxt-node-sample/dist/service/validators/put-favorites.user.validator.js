"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.default = joi_1.default.array().items({
    platformUsername: joi_1.default.string().required(),
    platform: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    games: joi_1.default.array().items(joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required())
});
//# sourceMappingURL=put-favorites.user.validator.js.map