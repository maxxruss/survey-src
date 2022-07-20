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

    const data = fetch(`${_BASE_URL}/${params.method}`, payload)
        .then((data) => data.json())
        .then((data) => data);

    return data;
};

type Params = {
    params: {
        [v: string]: string | number;
    };
    url: string;
};

export const request = ({ url, params }: Params) => {
    return new Promise((resolve) => {
        const body = new URLSearchParams();
        body.append("params", JSON.stringify(params));

        fetch(`${_BASE_URL}/${url}`, {
            method: "post",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                // "x-xsrf-token": token,
            },
            body,
        })
            .then((data) => {
                resolve(data.json());
            })
            .then((data) => data);
    });
};

// export const request = ({ action, userParams: { id, role, token }, requestParams = {} }) => {
//     return new Promise((resolve) => {
//         // const body = new URLSearchParams();
//         // body.append("action", action);
//         // body.append("params", JSON.stringify(requestParams));
//         // body.append("id", id);
//         // body.append("role", role);
//         fetch(`${_BASE_URL}/${params.method}`, {
//             method: "post",
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest',
//                 'X-CSRF-TOKEN': document.querySelector<HTMLInputElement>(`meta[name="csrf-token"]`).getAttribute("content"),
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify(params),
//         }).then((data) => {
//             resolve(data.json());
//         });
//     });
// }
