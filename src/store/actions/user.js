export const ADDUSER = Symbol("add-user");
export const DELUSER = Symbol("del-user");

// 刷线用户信息
export function addUserAction(user) {
    return {
        type: ADDUSER,
        payload: user
    }
};

// 删除用户信息
export function delUserAction() {
    return {
        type: DELUSER
    }
}