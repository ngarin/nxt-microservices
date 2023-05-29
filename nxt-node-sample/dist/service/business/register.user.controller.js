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
const user_status_enum_1 = require("nxt-shared/dist/enums/user-status.enum");
const logger_helper_1 = __importDefault(require("nxt-backend/dist/helpers/logger.helper"));
const error_handler_helper_1 = require("nxt-backend/dist/helpers/error-handler.helper");
const user_repo_1 = __importDefault(require("@service/user.repo"));
const user_controller_1 = require("@service/user.controller");
const user_registration_validator_1 = __importDefault(require("@service/validators/user-registration.validator"));
class RegisterUser extends user_controller_1.UserController {
    constructor() {
        super(user_registration_validator_1.default);
    }
    init(user) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'RegisterUser',
                user: Object.assign(Object.assign({}, user), { password: 'secret !' })
            });
            this.isBodyValid(user);
            const userFound = yield user_repo_1.default.model.findOne({
                $or: [
                    {
                        email: user.email
                    },
                    {
                        username: user.username
                    }
                ]
            });
            if (userFound) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.conflict, userFound.email === user.email ? 'E-mail already used' : 'Username already used');
            }
            user.password = yield bcryptjs_1.default.hash(user.password, 10);
            const newUser = yield user_repo_1.default.model.create(Object.assign(Object.assign({}, user), { status: user_status_enum_1.EUserStatus.pending }));
            yield this.sendConfirmationMail(newUser.toObject());
            return newUser;
        });
    }
}
exports.default = new RegisterUser();
//# sourceMappingURL=register.user.controller.js.map