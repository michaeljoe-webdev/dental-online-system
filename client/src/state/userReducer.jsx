const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    username: localStorage.getItem('username') || "Guest",
    token: localStorage.getItem('token') || "",
    userId: localStorage.getItem('userId') || "",
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            localStorage.setItem('isLoggedIn', JSON.stringify(payload.isLoggedIn));
            localStorage.setItem('username', payload.username);
            localStorage.setItem('token', payload.token);
            localStorage.setItem('userId', payload.userId);
            return { ...state, ...payload };
        case "LOGOUT":
            localStorage.setItem('isLoggedIn', JSON.stringify(payload.isLoggedIn));
            localStorage.setItem('username', payload.username);
            localStorage.setItem('token', payload.token);
            localStorage.setItem('userId', payload.userId);
            return { ...state, ...payload };
        default:
            return state;
    }
}

export default userReducer;
