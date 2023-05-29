"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_sample_handler_1 = require("./node-sample.handler");
const router = (0, express_1.Router)({ mergeParams: true });
router.get('/', node_sample_handler_1.handleFetch);
exports.default = router;
//# sourceMappingURL=node-sample.route.js.map