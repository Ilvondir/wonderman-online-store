import store from "../store/store";

export const headers = () => {
    const user = store.getState().user;

    return {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user?.jwt
    };
}

export const imgUrl = (url: string) => {
    if (url.startsWith("/")) return "http://" + window.location.hostname + ":8000" + url;
    else return url;
}