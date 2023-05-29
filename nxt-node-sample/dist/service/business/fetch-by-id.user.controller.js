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
const user_controller_1 = require("@service/user.controller");
const user_repo_1 = __importDefault(require("@service/user.repo"));
class FetchByIdUser extends user_controller_1.UserController {
    init(me, id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'FetchByIdUser'
            });
            this.isObjectIdValid(id);
            const user = yield user_repo_1.default.findById(id, me._id);
            delete user.email;
            delete user.status;
            delete user.wallet;
            return user;
        });
    }
}
exports.default = new FetchByIdUser();
//# sourceMappingURL=fetch-by-id.user.controller.js.map