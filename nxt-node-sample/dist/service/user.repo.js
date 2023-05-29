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
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("nxt-shared/dist/schemas/user.schema");
const file_manager_schema_1 = require("nxt-shared/dist/schemas/file-manager.schema");
const follow_schema_1 = require("nxt-shared/dist/schemas/follow.schema");
const brother_schema_1 = require("nxt-shared/dist/schemas/brother.schema");
const repo_helper_1 = require("nxt-backend/dist/helpers/repo.helper");
const user_pipeline_1 = require("nxt-shared/dist/pipelines/user.pipeline");
class UserRepo extends repo_helper_1.Repo {
    findById(id, meId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = (yield this.model.aggregate(user_pipeline_1.userMiniPipeline(id, meId)));
            if (!user.favorites[0].games.length && (!user.favorites[0].platform || !user.favorites[0].platform._id)) {
                user.favorites = [];
            }
            return user;
        });
    }
    find(meId, page, search, onlyStreamersRequests = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let pipelines = [];
            if (search) {
                pipelines.push({
                    $match: { username: new RegExp(search, 'gi') }
                });
            }
            if (onlyStreamersRequests) {
                pipelines.push({
                    $match: {
                        streamerProfile: {
                            $exists: true,
                            $ne: null
                        },
                        role: 'gamer'
                    }
                });
            }
            pipelines = [...pipelines, ...user_pipeline_1.userMiniPipeline(null, meId), ...this.getCollectionPipeline(page, 20)];
            const [collection] = (yield this.model.aggregate(pipelines));
            return collection;
        });
    }
    findNewBrothers(myBrothersIds, page, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let pipelines = [];
            if (search) {
                pipelines.push({
                    $match: {
                        $and: [{ username: new RegExp(search, 'gi') }, { _id: { $nin: myBrothersIds } }]
                    }
                });
            }
            else {
                pipelines.push({
                    $match: {
                        $and: [{ _id: { $nin: myBrothersIds } }]
                    }
                });
            }
            const [collection] = (yield this.model.aggregate([
                ...pipelines,
                ...user_pipeline_1.userMiniPipeline(),
                ...this.getCollectionPipeline(page, 20)
            ]));
            return collection;
        });
    }
    canIGet(level, value) {
        const hierarchy = {
            [EUserLevel.small]: [],
            [EUserLevel.medium]: [EUserLevel.small],
            [EUserLevel.full]: [EUserLevel.small, EUserLevel.medium]
        };
        return hierarchy[value].some(l => l === level);
    }
}
var EUserLevel;
(function (EUserLevel) {
    EUserLevel["small"] = "small";
    EUserLevel["medium"] = "medium";
    EUserLevel["full"] = "full";
})(EUserLevel || (EUserLevel = {}));
exports.default = new UserRepo('User', user_schema_1.UserSchema, 'user', [
    { name: 'FileManager', schema: file_manager_schema_1.FileManagerSchema, collection: 'file-manager' },
    { name: 'Follow', schema: follow_schema_1.FollowSchema, collection: 'follow' },
    { name: 'Brother', schema: brother_schema_1.BrotherSchema, collection: 'brother' }
]);
//# sourceMappingURL=user.repo.js.map