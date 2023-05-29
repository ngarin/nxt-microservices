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
exports.handleFetch = void 0;
const logger_helper_1 = __importDefault(require("nxt-backend/dist/helpers/logger.helper"));
const fetch_node_sample_controller_1 = __importDefault(require("@service/business/fetch.node-sample.controller"));
function handleFetch(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_helper_1.default.info({
                service: 'node-sample',
                handler: 'handleFetch'
            });
            const results = yield fetch_node_sample_controller_1.default.init();
            res.send(results);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.handleFetch = handleFetch;
//# sourceMappingURL=node-sample.handler.js.map