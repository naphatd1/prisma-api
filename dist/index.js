"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json({ limit: '50mb' }));
app.use('/', (_, res) => {
    res.status(200).json({ message: 'Express Backend API...' });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(` 🚀🚀🚀 Server is running at http://localhost:${port}`);
});
