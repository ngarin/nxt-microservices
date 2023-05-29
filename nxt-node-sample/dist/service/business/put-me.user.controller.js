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
const put_me_user_validator_1 = __importDefault(require("@service/validators/put-me.user.validator"));
class PutMe extends user_controller_1.UserController {
    constructor() {
        super(put_me_user_validator_1.default);
    }
    init(body, me) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'PutMe',
                body
            });
            body = this.isBodyValid(body);
            const user = yield user_repo_1.default.model.findById(me._id);
            if (!user) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.notFound, 'User not found');
            }
            if (body.email && body.email !== me.email) {
                const userFoundByEmail = yield user_repo_1.default.model.findOne({ email: body.email });
                if (userFoundByEmail) {
                    throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.conflict, 'E-mail already used');
                }
                user.email = body.email;
                user.status = user_status_enum_1.EUserStatus.pending;
            }
            if (body.password && body.newPassword) {
                if (!bcryptjs_1.default.compareSync(body.password, user.password)) {
                    throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.unauthorized, 'Wrong password');
                }
                user.password = yield bcryptjs_1.default.hash(body.newPassword, 10);
            }
            user.bio = body.bio;
            yield user.save();
            if (body.email && body.email !== me.email) {
                yield this.sendConfirmationMail(user.toObject());
            }
            return yield user_repo_1.default.findById(me._id);
        });
    }
}
exports.default = new PutMe();
//# sourceMappingURL=put-me.user.controller.js.map