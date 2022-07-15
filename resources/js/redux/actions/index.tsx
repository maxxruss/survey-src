export const authDataLoaded = (data: any) => {
    return {
        type: "FETCH_AUTH_SUCCESS",
        payload: data,
    };
};

export const authDataError = (error: any) => {
    return {
        type: "FETCH_AUTH_FAILURE",
        payload: error,
    };
};

export const setAuth = () => {
    return {
        type: "AUTH_SET",
    };
};

export const authLogOut = () => {
    return {
        type: "AUTH_LOGOUT",
    };
};

export const toggleDrawer = () => {
    return {
        type: "DRAWER_TOGGLE",
    };
};
