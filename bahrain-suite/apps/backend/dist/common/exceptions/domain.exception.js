"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
const common_1 = require("@nestjs/common");
class DomainException extends common_1.HttpException {
    constructor(message, status = common_1.HttpStatus.BAD_REQUEST, code = 'DOMAIN_ERROR', details) {
        super({ message, code, details }, status);
        this.code = code;
        this.details = details;
    }
}
exports.DomainException = DomainException;
//# sourceMappingURL=domain.exception.js.map