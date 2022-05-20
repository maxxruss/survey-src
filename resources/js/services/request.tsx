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
    return new Promise((resolve) => {
        // const body = new URLSearchParams();
        // body.append("params", JSON.stringify(params));
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

        fetch(`${_BASE_URL}/${params.method}`, payload).then((data) => {
            resolve(data.json());
        });
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
