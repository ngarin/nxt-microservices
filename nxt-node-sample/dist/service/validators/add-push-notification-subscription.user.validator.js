"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.default = joi_1.default.object({
    endpoint: joi_1.default.string().required(),
    expirationTime: joi_1.default.any(),
    keys: joi_1.default.any()
});
//# sourceMappingURL=add-push-notification-subscription.user.validator.js.map