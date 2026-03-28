"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_ROLES = exports.UserRole = void 0;
exports.parseUserRole = parseUserRole;
exports.roleHasAccess = roleHasAccess;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["PLATFORM_SUPER_ADMIN"] = "platform_super_admin";
    UserRole["ACCOUNTANT"] = "accountant";
    UserRole["HR"] = "hr";
    UserRole["DEVELOPER"] = "developer";
    UserRole["STAFF"] = "staff";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.ALL_ROLES = Object.values(UserRole);
function parseUserRole(value) {
    if (!value)
        return UserRole.STAFF;
    const v = String(value).toLowerCase().trim();
    if (exports.ALL_ROLES.includes(v)) {
        return v;
    }
    return UserRole.STAFF;
}
function roleHasAccess(userRole, allowed) {
    if (userRole === UserRole.ADMIN)
        return true;
    return allowed.includes(userRole);
}
//# sourceMappingURL=user-role.enum.js.map