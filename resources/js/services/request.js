export default class RequestService {
    _BASE_URL = "/api";
    auth(params) {
        return new Promise((resolve) => {
            // const body = new URLSearchParams();
            // body.append("params", JSON.stringify(params));
            fetch(`${this._BASE_URL}/${params.method}`, {
                method: "post",
                headers: {
                    'X-CSRF-TOKEN': document.querySelector(`meta[name="csrf-token"]`).getAttribute("content"),
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(params),
            }).then((data) => {
                resolve(data.json());
            });
        });
    }
    request({ action, userParams: { id, role, token }, requestParams = {} }) {
        return new Promise((resolve) => {
            // const body = new URLSearchParams();
            // body.append("action", action);
            // body.append("params", JSON.stringify(requestParams));
            // body.append("id", id);
            // body.append("role", role);
            fetch(`${this._BASE_URL}/${params.method}`, {
                method: "post",
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector(`meta[name="csrf-token"]`).getAttribute("content"),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(params),
            }).then((data) => {
                resolve(data.json());
            });
        });
    }
}
