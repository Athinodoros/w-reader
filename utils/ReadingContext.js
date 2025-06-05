"use strict";
exports.__esModule = true;
exports.EnclosureSymbol = exports.ReadingStatus = void 0;
var ReadingStatus;
(function (ReadingStatus) {
    ReadingStatus[ReadingStatus["READING"] = 0] = "READING";
    ReadingStatus[ReadingStatus["PAUSED"] = 1] = "PAUSED";
})(ReadingStatus = exports.ReadingStatus || (exports.ReadingStatus = {}));
var EnclosureSymbol;
(function (EnclosureSymbol) {
    EnclosureSymbol["NULL"] = "";
    EnclosureSymbol["PARENTHESIS"] = "()";
    EnclosureSymbol["DIAMOND_BRACKETS"] = "<>";
    EnclosureSymbol["SQUARE_BRACKETS"] = "[]";
    EnclosureSymbol["DOUBLE_QUOTES"] = "\"\"";
    EnclosureSymbol["SINGLE_QUOTES"] = "''";
    EnclosureSymbol["BACKTICKS"] = "``";
})(EnclosureSymbol = exports.EnclosureSymbol || (exports.EnclosureSymbol = {}));
var ReadingContext = /** @class */ (function () {
    function ReadingContext(joystickX, joysticY, status, text) {
        this.joystickX = joystickX;
        this.joysticY = joysticY;
        this.status = status;
        //
        this.allEnclosureTester = new RegExp(/[`()\[\]{}'"<>]/, "g");
        this.wordList = [];
        this.wordList = this.getWordSegments(text);
    }
    Object.defineProperty(ReadingContext.prototype, "wordlist", {
        get: function () {
            return this.wordList;
        },
        enumerable: false,
        configurable: true
    });
    ReadingContext.prototype.extractEnclosureParts = function (sentence) {
        var matches = sentence.matchAll(this.allEnclosureTester);
        var segments = [];
        // for(var find in matches){
        //     find[0].
        //     segments.push(find)
        // }
        console.log(matches);
        return matches;
    };
    ReadingContext.prototype.checkEnclosure = function (sentence) {
        if (this.allEnclosureTester.test(sentence)) {
            this.extractEnclosureParts(sentence);
        }
        else {
            return [sentence];
        }
    };
    ReadingContext.prototype.getWordSegments = function (text) {
        var sentences = text.split(".");
        var enclosureCheckedSentences = sentences.map(this.checkEnclosure);
        return enclosureCheckedSentences;
    };
    return ReadingContext;
}());
exports["default"] = ReadingContext;
