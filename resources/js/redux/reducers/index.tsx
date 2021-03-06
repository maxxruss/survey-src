type ActionType = {
    type: string;
    payload: {
        id: String;
        name: String;
        email: String;
        role_id: Number;
    };
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
            let role = "";
            
            switch (action.payload.role_id) {
                case 1:
                    role = "admin";
                    break;
                case 2:
                    role = "asker";
                    break;
                case 3:
                    role = "responder";
            }

            return {
                ...state,
                auth: true,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                role,
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
