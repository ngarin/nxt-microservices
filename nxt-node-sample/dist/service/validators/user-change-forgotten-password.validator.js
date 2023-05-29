"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.default = joi_1.default.object({
    password: joi_1.default.string().required()
});
//# sourceMappingURL=user-change-forgotten-password.validator.js.map