type ActionType = {
    type: string;
    payload: {
        id: String;
        login: String;
        email: String;
        role: string;
        drawerStatus: boolean;
        company: { [v: string]: any };
    };
};

type StateType =
    | undefined
    | {
          auth: boolean;
          id: String;
          login: String;
          email: String;
          role: String;
          drawerStatus: boolean;
      };

const reducer = (state: StateType, action: ActionType) => {
    if (state === undefined) {
        return {
            auth: false,
            id: "",
            login: "",
            email: "",
            role: "",
            company: null,
            drawerStatus: false,
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
                company: "",
            };
        case "AUTH_LOGOUT":
            return {
                ...state,
                auth: false,
                id: "",
                login: "",
                email: "",
                role: "",
                company: "",
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
        default:
            return state;
    }
};

export default reducer;
