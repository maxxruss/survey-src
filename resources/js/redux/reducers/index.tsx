type ActionType = {
    type: string;
    payload: any;
};

type StateType =
    | undefined
    | {
          auth: boolean;
          id: String;
          name: String;
          email: String;
          role: String;
          drawerStatus: boolean;
      };

const reducer = (state: StateType, action: ActionType) => {
    if (state === undefined) {
        return {
            auth: false,
            id: "",
            name: "",
            email: "",
            role: "",
            drawerStatus: false,
        };
    }
    switch (action.type) {
        case "FETCH_AUTH_SUCCESS":
            return {
                ...state,
                auth: true,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role,
            };
        case "FETCH_AUTH_FAILURE":
            return {
                ...state,
                auth: false,
                id: "",
                name: "",
                email: "",
                role: "",
            };
        case "AUTH_LOGOUT":
            return {
                ...state,
                auth: false,
                id: "",
                name: "",
                email: "",
                role: "",
            };
        case "DRAWER_TOGGLE":
            return {
                ...state,
                drawerStatus: !state.drawerStatus,
            };
        default:
            return state;
    }
};

export default reducer;
