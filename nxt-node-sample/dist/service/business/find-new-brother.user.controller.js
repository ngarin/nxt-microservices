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
const internal_request_helper_1 = __importDefault(require("nxt-backend/dist/helpers/internal-request.helper"));
const app_config_1 = require("nxt-backend/dist/config/app.config");
const user_controller_1 = require("@service/user.controller");
const user_repo_1 = __importDefault(require("@service/user.repo"));
const mongoose_1 = require("mongoose");
class FindNeBrotherUser extends user_controller_1.UserController {
    init(me, page, search) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'FetchUser'
            });
            const myBrothersIds = yield internal_request_helper_1.default.get(`${app_config_1.appConfig.brotherUrl.protocol}://${app_config_1.appConfig.brotherUrl.host}/fr/internal/${me._id}/my-brothers-ids`);
            const collection = yield user_repo_1.default.findNewBrothers([...myBrothersIds.map(bro => mongoose_1.Types.ObjectId(bro)), mongoose_1.Types.ObjectId(me._id)], page, search);
            return collection;
        });
    }
}
exports.default = new FindNeBrotherUser();
//# sourceMappingURL=find-new-brother.user.controller.js.map