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
exports.handleDeleteMeStreamer = exports.handlePatchStreamerById = exports.handlePatchMeStreamer = exports.handleDeleteMe = exports.handlePutMe = exports.handlePutFavorites = exports.handleValidateEmailUser = exports.handleAddPushNotificationSubscription = exports.handleChangeForgottenPassword = exports.handleForgotPassword = exports.handleRegister = exports.handleLogin = exports.handleFetchByIdInternal = exports.handleGetValidationEmailUser = exports.handleFindNewBrother = exports.handleFetch = exports.handleFetchById = exports.handleFetchMe = void 0;
const logger_helper_1 = __importDefault(require("nxt-backend/dist/helpers/logger.helper"));
const http_status_codes_enum_1 = require("nxt-shared/dist/enums/http-status-codes.enum");
const fetch_me_user_controller_1 = __importDefault(require("@service/business/fetch-me.user.controller"));
const fetch_user_controller_1 = __importDefault(require("@service/business/fetch.user.controller"));
const find_new_brother_user_controller_1 = __importDefault(require("@service/business/find-new-brother.user.controller"));
const get_validation_email_user_controller_1 = __importDefault(require("@service/business/get-validation-email.user.controller"));
const fetch_by_id_user_controller_1 = __importDefault(require("@service/business/fetch-by-id.user.controller"));
const fetch_by_id_user_internal_1 = __importDefault(require("@service/internal/fetch-by-id.user.internal"));
const register_user_controller_1 = __importDefault(require("@service/business/register.user.controller"));
const login_user_controller_1 = __importDefault(require("@service/business/login.user.controller"));
const forgot_password_user_controller_1 = __importDefault(require("@service/business/forgot-password.user.controller"));
const change_forgotten_password_user_controller_1 = __importDefault(require("@service/business/change-forgotten-password.user.controller"));
const put_favorites_user_1 = __importDefault(require("@service/business/put-favorites.user"));
const add_push_notification_subscription_user_controller_1 = __importDefault(require("@service/business/add-push-notification-subscription.user.controller"));
const validate_email_user_controller_1 = __importDefault(require("@service/business/validate-email.user.controller"));
const put_me_user_controller_1 = __importDefault(require("@service/business/put-me.user.controller"));
const delete_me_user_controller_1 = __importDefault(require("@service/business/delete-me.user.controller"));
const patch_me_streamer_user_controller_1 = __importDefault(require("@service/business/patch-me-streamer.user.controller"));
const delete_me_streamer_user_controller_1 = __importDefault(require("@service/business/delete-me-streamer.user.controller"));
const handle_streamer_request_user_controller_1 = __importDefault(require("@service/business/handle-streamer-request.user.controller"));
function handleFetchMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleFetchMe'
            });
            const results = yield fetch_me_user_controller_1.default.init(req.params.lang, res['locals'].user);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleFetchMe = handleFetchMe;
function handleFetchById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleFetchById'
            });
            const results = yield fetch_by_id_user_controller_1.default.init(res['locals'].user, req.params.id);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleFetchById = handleFetchById;
function handleFetch(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleFetch'
            });
            const { search, onlyStreamersRequests, page = '1' } = req.query;
            const results = yield fetch_user_controller_1.default.init(res['locals'].user, parseInt(page), { search: search, onlyStreamersRequests: !!onlyStreamersRequests });
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleFetch = handleFetch;
function handleFindNewBrother(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleFindNewBrother'
            });
            const { search, page = '1' } = req.query;
            const results = yield find_new_brother_user_controller_1.default.init(res['locals'].user, parseInt(page), search);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleFindNewBrother = handleFindNewBrother;
function handleGetValidationEmailUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleGetValidationEmailUser'
            });
            const results = yield get_validation_email_user_controller_1.default.init(req.params.lang, res['locals'].user);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleGetValidationEmailUser = handleGetValidationEmailUser;
function handleFetchByIdInternal(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleFetchByIdInternal'
            });
            const results = yield fetch_by_id_user_internal_1.default.init(req.params.id);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleFetchByIdInternal = handleFetchByIdInternal;
function handleLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleLogin'
            });
            const { email, password } = req.body;
            const results = yield login_user_controller_1.default.init(email, password);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleLogin = handleLogin;
function handleRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleRegister'
            });
            const user = req.body;
            const results = yield register_user_controller_1.default.init(user);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleRegister = handleRegister;
function handleForgotPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleForgotPassword'
            });
            const { email } = req.body;
            const results = yield forgot_password_user_controller_1.default.init(email);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleForgotPassword = handleForgotPassword;
function handleChangeForgottenPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleChangeForgottenPassword'
            });
            const { password } = req.body;
            const results = yield change_forgotten_password_user_controller_1.default.init(res['locals'].user, password);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleChangeForgottenPassword = handleChangeForgottenPassword;
function handleAddPushNotificationSubscription(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleAddPushNotificationSubscription'
            });
            const results = yield add_push_notification_subscription_user_controller_1.default.init(res['locals'].user, req.body);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleAddPushNotificationSubscription = handleAddPushNotificationSubscription;
function handleValidateEmailUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleValidateEmailUser'
            });
            const results = yield validate_email_user_controller_1.default.init(res['locals'].user);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleValidateEmailUser = handleValidateEmailUser;
function handlePutFavorites(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handlePutFavorite'
            });
            const results = yield put_favorites_user_1.default.init(req.body, res['locals'].user);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handlePutFavorites = handlePutFavorites;
function handlePutMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handlePutMe'
            });
            const results = yield put_me_user_controller_1.default.init(req.body, res['locals'].user);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handlePutMe = handlePutMe;
function handleDeleteMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleDeleteMe'
            });
            yield delete_me_user_controller_1.default.init(res['locals'].user);
            res.status(http_status_codes_enum_1.EHttpStatusCodes.noContent).send();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleDeleteMe = handleDeleteMe;
function handlePatchMeStreamer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handlePatchMeStreamer'
            });
            const results = yield patch_me_streamer_user_controller_1.default.init(res['locals'].user, req.body);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handlePatchMeStreamer = handlePatchMeStreamer;
function handlePatchStreamerById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handlePatchStreamerById'
            });
            const { id } = req.params;
            const results = yield handle_streamer_request_user_controller_1.default.init(id, req.body);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handlePatchStreamerById = handlePatchStreamerById;
function handleDeleteMeStreamer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'user',
                handler: 'handleDeleteMeStreamer'
            });
            const results = yield delete_me_streamer_user_controller_1.default.init(res['locals'].user);
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleDeleteMeStreamer = handleDeleteMeStreamer;
//# sourceMappingURL=user.handler.js.map