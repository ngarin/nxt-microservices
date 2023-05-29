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
const logger_helper_1 = __importDefault(require("nxt-backend/dist/helpers/logger.helper"));
const error_handler_helper_1 = require("nxt-backend/dist/helpers/error-handler.helper");
const http_status_codes_enum_1 = require("nxt-shared/dist/enums/http-status-codes.enum");
const user_role_enum_1 = require("nxt-shared/dist/enums/user-role.enum");
const mailjet_helper_1 = __importDefault(require("nxt-backend/dist/helpers/mailjet.helper"));
const settings_config_1 = require("nxt-backend/dist/config/settings.config");
const app_config_1 = require("nxt-backend/dist/config/app.config");
const user_controller_1 = require("@service/user.controller");
const user_repo_1 = __importDefault(require("@service/user.repo"));
const handle_streamer_request_user_validator_1 = __importDefault(require("@service/validators/handle-streamer-request.user.validator"));
class HandleStreamerRequest extends user_controller_1.UserController {
    constructor() {
        super(handle_streamer_request_user_validator_1.default);
    }
    init(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'HandleStreamerRequest',
                body
            });
            body = this.isBodyValid(body);
            const user = yield user_repo_1.default.model.findById(id);
            if (!user) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.notFound, 'User not found');
            }
            if (user.role === user_role_enum_1.EUserRole.streamer) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.conflict, 'Your are already a streamer');
            }
            if (!user.streamerProfile ||
                !user.streamerProfile.username ||
                !user.streamerProfile.channel) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.badRequest, 'Please specify correct information');
            }
            if (body.isAccepted) {
                user.role = user_role_enum_1.EUserRole.streamer;
                yield this.sendAcceptedMail(user);
            }
            else {
                user.streamerProfile = null;
                yield this.sendDeclinedMail(user);
            }
            yield user.save();
            return yield user_repo_1.default.findById(id);
        });
    }
    sendAcceptedMail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendMail(user, 'Your streamer request has been accepted', 4084175);
            }
            catch (error) {
                throw error;
            }
        });
    }
    sendDeclinedMail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendMail(user, 'Your streamer request has been declined', 4084192);
            }
            catch (error) {
                throw error;
            }
        });
    }
    sendMail(user, object, templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mailjet_helper_1.default.sendMail(settings_config_1.settingsConfig.mailSender, [{ email: user.email, name: user.username }], `[Winning Brothers] ${object}`, {
                    webapp_url: `${app_config_1.appConfig.webappUrl.protocol}://${app_config_1.appConfig.webappUrl.host}`,
                    username: user.username,
                }, templateId);
            }
            catch (error) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.internalServerError, error);
            }
        });
    }
}
exports.default = new HandleStreamerRequest();
//# sourceMappingURL=handle-streamer-request.user.controller.js.map