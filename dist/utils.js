"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeHtmlTags = void 0;
const removeHtmlTags = (input) => {
    return input.replace(/<[^>]*>/g, "");
};
exports.removeHtmlTags = removeHtmlTags;
