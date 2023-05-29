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
exports.UserController = void 0;
const controller_helper_1 = require("nxt-backend/dist/helpers/controller.helper");
const mailjet_helper_1 = __importDefault(require("nxt-backend/dist/helpers/mailjet.helper"));
const settings_config_1 = require("nxt-backend/dist/config/settings.config");
const app_config_1 = require("nxt-backend/dist/config/app.config");
const http_status_codes_enum_1 = require("nxt-shared/dist/enums/http-status-codes.enum");
const error_handler_helper_1 = require("nxt-backend/dist/helpers/error-handler.helper");
const jwt_helper_1 = __importDefault(require("nxt-backend/dist/helpers/jwt.helper"));
class UserController extends controller_helper_1.ControllerHelper {
    sendConfirmationMail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = jwt_helper_1.default.generateJWT(user, 60 * 60 * 24 * 7);
            try {
                yield mailjet_helper_1.default.sendMail(settings_config_1.settingsConfig.mailSender, [{ email: user.email, name: user.username }], '[WinningBrothers] Confirm your email address', {
                    webapp_url: `${app_config_1.appConfig.webappUrl.protocol}://${app_config_1.appConfig.webappUrl.host}`,
                    username: user.username,
                    confirmation_link: `${app_config_1.appConfig.webappUrl.protocol}://${app_config_1.appConfig.webappUrl.host}?email_confirmation_token=${tokenData.token}`
                }, 1347928);
            }
            catch (error) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.internalServerError, error);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map