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
const user_repo_1 = __importDefault(require("@service/user.repo"));
const user_controller_1 = require("@service/user.controller");
const add_push_notification_subscription_user_validator_1 = __importDefault(require("@service/validators/add-push-notification-subscription.user.validator"));
class AddPushNotificationSubscription extends user_controller_1.UserController {
    constructor() {
        super(add_push_notification_subscription_user_validator_1.default);
    }
    init(me, pushSubscription) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_helper_1.default.info({
                manager: 'user-business',
                handler: 'AddPushNotificationSubscription'
            });
            pushSubscription = this.isBodyValid(pushSubscription);
            const user = yield user_repo_1.default.model.findById(me._id);
            if (!user) {
                throw new error_handler_helper_1.ErrorHandler(http_status_codes_enum_1.EHttpStatusCodes.notFound, 'User not found');
            }
            const pushSubscriptionFound = user.pushSubscriptions && user.pushSubscriptions.length
                ? user.pushSubscriptions.find(push => push.endpoint === pushSubscription.endpoint)
                : null;
            if (pushSubscriptionFound) {
                return yield user_repo_1.default.findById(me._id);
            }
            user.pushSubscriptions = [...user.pushSubscriptions, pushSubscription];
            yield user.save();
            return yield user_repo_1.default.findById(me._id);
        });
    }
}
exports.default = new AddPushNotificationSubscription();
//# sourceMappingURL=add-push-notification-subscription.user.controller.js.map