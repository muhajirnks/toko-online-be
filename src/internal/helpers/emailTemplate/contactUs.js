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
const dotenv_1 = require("dotenv");
const smtp_1 = __importDefault(require("../../../internal/config/smtp"));
(0, dotenv_1.config)({ path: '.env' });
const contactUs = (name, email, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    const template = `
        <div style="background-color: #182a46; padding: 20px; border-radius: 10px; border: none;">
            <div style="margin-bottom: 10px;">
                <h1 style="text-align: center; font-weight: bold; color: #89e0d1;">Email from Portfolio</h1>
            </div>
            <div style="margin-bottom: 10px;">
                <h2 style="color: #c2cded; font-weight: bold;">Message: </h2>
                <div style="border-radius: 10px; padding: 10px; background-color: white;">
                    <p style="font-size: 15px; color: black; white-space: pre-wrap;">${message}</p>
                </div>
            </div>
            <div>
                <p style="font-size: 15px; margin: 0; color: #c2cded;">from ${name},<br>${email}</p>
            </div>
        </div>
    `;
    // send mail with defined transport object
    yield smtp_1.default.sendMail({
        from: { address: email, name }, // sender address
        to: process.env.DESTINATION_EMAIL, // list of receivers
        subject: `${subject}`, // Subject line
        html: template // html body
    });
});
exports.default = contactUs;
