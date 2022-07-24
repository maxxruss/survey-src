export interface Props {
    authLogOut: () => void;
    requestService: {
        auth: (method: object) => {
            result: string;
            data: { [v: string]: string | number };
        };
    };
    authDataLoaded: (data: { [v: string]: string | number }) => void;
}