type AuthParamsTypes = {
    method: string;
    headers: any;
};

interface HeadersTypes {
    method: string;
    headers: {
        "X-CSRF-TOKEN": any;
        "X-Requested-With": string;
        "Content-Type": string;
        Accept: string;
    };
    body: any;
}

const _BASE_URL = "/api";

export const auth = (params: AuthParamsTypes) => {
    const payload: HeadersTypes = {
        method: "post",
        headers: {
            "X-CSRF-TOKEN": document
                .querySelector(`meta[name="csrf-token"]`)
                ?.getAttribute("content"),
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(params),
    };

    return fetch(`${_BASE_URL}/${params.method}`, payload).then((data) =>
        data.json()
    );
};

type Params = {
    params: {
        [v: string]: string | number;
    };
    url: string;
    method: "post" | "get";
};

export const request = ({ url, params, method = "post" }: Params) => {
    return fetch(`${_BASE_URL}/${url}`, {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "x-xsrf-token": token,
        },
        body: method == "post" ? JSON.stringify(params) : null,
    }).then((data) => data.json());
};
