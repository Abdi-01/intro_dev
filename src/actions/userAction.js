
export const loginAction = (data) => {
    console.log("Data masuk action :", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}