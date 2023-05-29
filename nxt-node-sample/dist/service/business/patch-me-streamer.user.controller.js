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
const logger_helper_1 = __importDefault(require("nxt-backend/dist/helpers/logger.helper"));
const error_handler_helper_1 = require("nxt-backend/dist/helpers/error-handler.helper");
const user_role_enum_1 = require("nxt-shared/dist/enums/user-role.enum");
const user_repo_1 = __importDefault(require("@service/user.repo"));
const user_controller_1 = require("@service/user.controller");
const patch_me_streamer_user_validator_1 = __importDefault(require("@service/validators/patch-me-streamer.user.validator"));
class PatchMeStreamer extends user_controller_1.UserController {
    constructor() {
        super(patch_me_streamer_user_validator_1.default);
    }
    init(me, body) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'PatchMeStreamer',
                body
            });
            body = this.isBodyValid(body);
            const user = yield user_repo_1.default.model.findById(me._id);
            if (!user) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.notFound, 'User not found');
            }
            if (user.streamerProfile &&
                user.streamerProfile.username === body.username &&
                user.streamerProfile.channel === body.channel) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.badRequest, 'No changes');
            }
            user.role = user.role === user_role_enum_1.EUserRole.admin ? user_role_enum_1.EUserRole.admin : user_role_enum_1.EUserRole.gamer;
            user.streamerProfile = body;
            yield user.save();
            return yield user_repo_1.default.findById(me._id);
        });
    }
}
exports.default = new PatchMeStreamer();
//# sourceMappingURL=patch-me-streamer.user.controller.js.map