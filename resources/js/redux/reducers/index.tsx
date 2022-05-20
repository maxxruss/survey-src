type ActionType = {
    type: string;
    payload: any;
};

type StateType = {} | undefined;

const reducer = (state: StateType, action: ActionType) => {
    if (state === undefined) {
        return {
            id: "",
            name: "",
            email: "",
        };
    }
    switch (action.type) {
        case "FETCH_AUTH_SUCCESS":
            return {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
            };
        case "FETCH_AUTH_FAILURE":
            return {
                id: "",
                name: "",
                email: "",
            };
        case "AUTH_LOGOUT":
            return {
                id: "",
                name: "",
                email: "",
            };
        default:
            return state;
    }
};

export default reducer;
