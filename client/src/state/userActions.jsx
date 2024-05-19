export const loginAction = (username, token, userId ) => {
    return {
        type: "LOGIN",
        payload: { isLoggedIn: true, username, token, userId }
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT",
        payload: { isLoggedIn: false, username: "Guest", token: "", userId: "", expiration: "" }
    }
}