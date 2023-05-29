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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_enum_1 = require("nxt-shared/dist/enums/http-status-codes.enum");
const logger_helper_1 = __importDefault(require("nxt-backend/dist/helpers/logger.helper"));
const error_handler_helper_1 = require("nxt-backend/dist/helpers/error-handler.helper");
const user_controller_1 = require("@service/user.controller");
const user_change_forgotten_password_validator_1 = __importDefault(require("@service/validators/user-change-forgotten-password.validator"));
const user_repo_1 = __importDefault(require("@service/user.repo"));
class ChangeForgottenPasswordUser extends user_controller_1.UserController {
    constructor() {
        super(user_change_forgotten_password_validator_1.default);
    }
    init(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'ChangeForgottenPasswordUser'
            });
            this.isBodyValid({ password });
            const userFound = yield user_repo_1.default.model.findById(user._id);
            if (!userFound) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.notFound, 'User not found');
            }
            yield user_repo_1.default.model.update({ _id: user._id }, { password: yield bcryptjs_1.default.hash(password, 10) });
            return { status: 'ok' };
        });
    }
}
exports.default = new ChangeForgottenPasswordUser();
//# sourceMappingURL=change-forgotten-password.user.controller.js.map