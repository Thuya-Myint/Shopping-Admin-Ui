export const STORAGE_KEYS = {
    USER_DATA: "user-data",
    TOKEN: "x-access-token",
    CLICKED_TAB: "clickedTab"

}

export const API_ROUTES = {
    DEPLOY_BASE_URL: "https://shopping-server-qfaw.onrender.com/api/v1",
    LOCAL_BASE_URL: "http://localhost:8080/api/v1",

    //user auth
    USER_LOGIN: "/user/login",
    UPDATE_USER: "/user",

    //unit
    GET_ALL_UNIT: "/unit",
    POST_NEW_UNIT: "/unit",
    UPDATE_UNIT: "/unit",
    DELETE_UNIT: "/unit",

    //category
    GET_ALL_CATEGORY: "/category",
    POST_NEW_CATEGORY: "/category",
    UPDATE_CATEGORY: "/category/id",
    DELETE_CATEGORY: "/category/id"

}

// export const light = {
//     primary: "#fff"
// }
// export const dark = {
//     primary: "#000"
// }

// export const myTheme = {
//     lightTheme,
//     darkTheme
// }