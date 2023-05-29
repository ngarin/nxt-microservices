"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_helper_1 = __importDefault(require("nxt-backend/dist/helpers/jwt.helper"));
const user_role_enum_1 = require("nxt-shared/dist/enums/user-role.enum");
const ip_range_check_middleware_helper_1 = require("nxt-backend/dist/helpers/ip-range-check-middleware.helper");
const user_handler_1 = require("./user.handler");
const router = express_1.Router({ mergeParams: true });
router.get('/me', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handleFetchMe);
router.get('/', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handleFetch);
router.get('/new-brother', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handleFindNewBrother);
router.get('/validation-email', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handleGetValidationEmailUser);
router.get('/:id', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handleFetchById);
router.get('/internal/:id', ip_range_check_middleware_helper_1.ipRangeCheckMiddleware, user_handler_1.handleFetchByIdInternal);
router.post('/login', user_handler_1.handleLogin);
router.post('/', user_handler_1.handleRegister);
router.post('/forgot-password', user_handler_1.handleForgotPassword);
router.post('/change-forgotten-password', jwt_helper_1.default.middleware(), user_handler_1.handleChangeForgottenPassword);
router.post('/push-notification-subscription', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handleAddPushNotificationSubscription);
router.post('/validate-email', jwt_helper_1.default.middleware(), user_handler_1.handleValidateEmailUser);
router.delete('/me', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handleDeleteMe);
router.put('/favorites', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handlePutFavorites);
router.put('/me', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handlePutMe);
router.patch('/me/streamer', jwt_helper_1.default.middleware(true), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handlePatchMeStreamer);
router.patch('/streamer/request/:id', jwt_helper_1.default.middleware(), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin]), user_handler_1.handlePatchStreamerById);
router.delete('/me/streamer', jwt_helper_1.default.middleware(true), jwt_helper_1.default.checkForRoles([user_role_enum_1.EUserRole.admin, user_role_enum_1.EUserRole.streamer, user_role_enum_1.EUserRole.gamer]), user_handler_1.handleDeleteMeStreamer);
exports.default = router;
//# sourceMappingURL=user.route.js.map