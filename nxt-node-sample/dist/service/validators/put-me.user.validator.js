"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.default = joi_1.default.object({
    email: joi_1.default.string().email(),
    password: joi_1.default.string().allow(null, ''),
    newPassword: joi_1.default.string().allow(null, ''),
    bio: joi_1.default.string()
});
//# sourceMappingURL=put-me.user.validator.js.map