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
const http_status_codes_enum_1 = require("nxt-shared/dist/enums/http-status-codes.enum");
const user_status_enum_1 = require("nxt-shared/dist/enums/user-status.enum");
const logger_helper_1 = __importDefault(require("nxt-backend/dist/helpers/logger.helper"));
const error_handler_helper_1 = require("nxt-backend/dist/helpers/error-handler.helper");
const jwt_helper_1 = __importDefault(require("nxt-backend/dist/helpers/jwt.helper"));
const mailjet_helper_1 = __importDefault(require("nxt-backend/dist/helpers/mailjet.helper"));
const settings_config_1 = require("nxt-backend/dist/config/settings.config");
const app_config_1 = require("nxt-backend/dist/config/app.config");
const user_controller_1 = require("@service/user.controller");
const user_forgot_password_validator_1 = __importDefault(require("@service/validators/user-forgot-password.validator"));
const user_repo_1 = __importDefault(require("@service/user.repo"));
class ForgotPasswordUser extends user_controller_1.UserController {
    constructor() {
        super(user_forgot_password_validator_1.default);
    }
    init(email) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'ForgotPasswordUser'
            });
            this.isBodyValid({ email });
            const user = (yield user_repo_1.default.model.findOne({ email }).lean());
            if (!user) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.notFound, 'No account with this e-mail was found');
            }
            if (user.status === user_status_enum_1.EUserStatus.banned) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.forbidden, 'Banned!');
            }
            const tokenData = jwt_helper_1.default.generateJWT(user, 60 * 60 * 24 * 2);
            yield this.sendPasswordChangeLinkMail(user, tokenData.token);
            return { status: 'ok' };
        });
    }
    sendPasswordChangeLinkMail(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mailjet_helper_1.default.sendMail(settings_config_1.settingsConfig.mailSender, [{ email: user.email, name: user.username }], '[WinningBrothers] Forgot your password', {
                    webapp_url: `${app_config_1.appConfig.webappUrl.protocol}://${app_config_1.appConfig.webappUrl.host}`,
                    username: user.username,
                    change_password_link: `${app_config_1.appConfig.webappUrl.protocol}://${app_config_1.appConfig.webappUrl.host}/sign/in?password_change_token=${token}`
                }, 1751425);
            }
            catch (error) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.internalServerError, error);
            }
        });
    }
}
exports.default = new ForgotPasswordUser();
//# sourceMappingURL=forgot-password.user.controller.js.map