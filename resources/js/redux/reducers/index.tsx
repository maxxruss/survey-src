type ActionType = {
    type: string;
    payload: any;
};

type StateType =
    | undefined
    | {
          id: String;
          name: String;
          email: String;
          drawerStatus: boolean;
      };

const reducer = (state: StateType, action: ActionType) => {
    if (state === undefined) {
        return {
            id: "",
            name: "",
            email: "",
            drawerStatus: false,
        };
    }
    switch (action.type) {
        case "FETCH_AUTH_SUCCESS":
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
            };
        case "FETCH_AUTH_FAILURE":
            return {
                ...state,
                id: "",
                name: "",
                email: "",
            };
        case "AUTH_LOGOUT":
            return {
                ...state,
                id: "",
                name: "",
                email: "",
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
