"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const joi_date_1 = __importDefault(require("@hapi/joi-date"));
const user_gender_enum_1 = require("nxt-shared/dist/enums/user-gender.enum");
exports.default = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    birthday: joi_1.default.extend(joi_date_1.default)
        .date()
        .format('YYYY-MM-DD')
        .required(),
    gender: joi_1.default.string()
        .valid(...Object.values(user_gender_enum_1.EUserGender))
        .required(),
    bio: joi_1.default.string()
});
//# sourceMappingURL=user-registration.validator.js.map