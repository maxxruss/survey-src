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

export const toggleDrawer = (drawerStatus: boolean) => {
    return {
        type: "DRAWER_TOGGLE",
        payload: { drawerStatus },
    };
};

export const setCompany = (data: any) => {
    return {
        type: "SET_COMPANY",
        payload: data,
    };
};

export const setUser = (login: string) => {
    return {
        type: "SET_USER",
        payload: login,
    };
};
