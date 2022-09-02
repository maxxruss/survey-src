// reducer - должен быть чистой функцией (pure function):
// 1. Возвращаемое значение зависит только от переданных аргументов
// 2. не имеет побочных эффектов - не изменяет глобальные переменные или не записывает в БД

type ActionType = {
    type: string;
    payload: {
        auth: boolean;
        id: string;
        login: string;
        email: string;
        role: string;
        company: { [v: string]: any } | {};
        drawerStatus: boolean;
        lang: string;
    } ;
};

type StateType =
    | undefined
    | {
        auth: boolean;
        id: string;
        login: string;
        email: string;
        role: string;
        company: { [v: string]: any } | {},
        drawerStatus: boolean;
        lang: string;
    };

const reducer = (state: StateType, action: ActionType) => {
    if (state === undefined) {
        return {
            auth: false,
            id: "",
            login: "",
            email: "",
            role: "",
            company: {},
            drawerStatus: false,
            lang: '',
        };
    }
    switch (action.type) {
        case "FETCH_AUTH_SUCCESS":
            return {
                ...state,
                auth: true,
                id: action.payload.id,
                login: action.payload.login,
                email: action.payload.email,
                role: action.payload.role,
                company: action.payload.company,
            };
        case "FETCH_AUTH_FAILURE":
            return {
                ...state,
                auth: false,
                id: "",
                login: "",
                email: "",
                role: "",
                company: {},
            };
        case "AUTH_LOGOUT":
            return {
                ...state,
                auth: false,
                id: "",
                login: "",
                email: "",
                role: "",
                company: {},
            };
        case "DRAWER_TOGGLE":
            return {
                ...state,
                drawerStatus: action.payload.drawerStatus,
            };
        case "SET_COMPANY":
            return {
                ...state,
                company: action.payload.company,
            };
        case "SET_USER":
            return {
                ...state,
                login: action.payload.login,
            };
        case "SET_LANGUAGE":
            return {
                ...state,
                lang: action.payload.lang,
            };
        default:
            return state;
    }
};

export default reducer;
