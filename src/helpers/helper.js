export const setItemToLocalStorage = (key, payload) => {
    return localStorage.setItem(key, JSON.stringify(payload))
}

export const getItemFromLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return JSON.parse(data)
}

export const removeItemFromLocalStorage = () => {
    return localStorage.clear()
}