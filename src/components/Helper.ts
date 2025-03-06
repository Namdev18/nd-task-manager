import { API_URL, RequestType } from "../types/tasks";

export const taskAPIManager = (
    requestType: string,
    payload: any
): { url: string; options: RequestInit } => {
    let url = API_URL;
    let options: RequestInit = {};

    switch (requestType) {
        case RequestType.GET:
            break;
        case RequestType.POST:
            url += "/add";
            options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            };
            break;
        case RequestType.PUT:
            url += `/${payload.id}`;
            options = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            };
            break;
        case RequestType.DELETE:
            url += `/${payload}`;
            options = { method: "DELETE" };
            break;
        default:
            return { url: "", options: {} };
    }

    return { url, options };
};