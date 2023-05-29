"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_status_enum_1 = require("#shared/enums/user-status.enum");
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    birthdate: {
        type: String,
        trim: true
    },
    status: {
        type: user_status_enum_1.EUserStatus,
        trim: true
    }
});
//# sourceMappingURL=user.model.js.map