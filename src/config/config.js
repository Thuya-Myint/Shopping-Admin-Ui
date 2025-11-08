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
    GET_ALL_ADMIN: "/user/admin",
    POST_NEW_USER: "/user/",
    UPDATE_USER_ROLE: "/user/role",

    //unit
    GET_ALL_UNIT: "/unit",
    POST_NEW_UNIT: "/unit",
    UPDATE_UNIT: "/unit",
    DELETE_UNIT: "/unit",

    //category
    GET_ALL_CATEGORY: "/category",
    POST_NEW_CATEGORY: "/category",
    UPDATE_CATEGORY: "/category/id",
    DELETE_CATEGORY: "/category/id",

    //role
    GET_ALL_ROLE: "/role",
    POST_NEW_ROLE: "/role",
    UPDATE_ROLE: "/role",

    //product
    POST_NEW_PRODUCT: "/product",
    GET_ALL_PRODUCT: "/product",
    UPDATE_PRODUCT: "/product",
    DELETE_PRODUCT: "/product"


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