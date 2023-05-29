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
const jwt_helper_1 = __importDefault(require("nxt-backend/dist/helpers/jwt.helper"));
const user_controller_1 = require("@service/user.controller");
const user_login_validator_1 = __importDefault(require("@service/validators/user-login.validator"));
const user_repo_1 = __importDefault(require("@service/user.repo"));
class LoginUser extends user_controller_1.UserController {
    constructor() {
        super(user_login_validator_1.default);
    }
    init(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'LoginUser'
            });
            this.isBodyValid({ email, password });
            const user = (yield user_repo_1.default.model.findOne({ email }).lean());
            if (!user) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.unauthorized, 'Wrong email');
            }
            if (!bcryptjs_1.default.compareSync(password, user.password)) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.unauthorized, 'Wrong password');
            }
            if (user.status === user_status_enum_1.EUserStatus.banned) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.forbidden, 'Banned!');
            }
            const tokenData = jwt_helper_1.default.generateJWT(user);
            return tokenData;
        });
    }
}
exports.default = new LoginUser();
//# sourceMappingURL=login.user.controller.js.map