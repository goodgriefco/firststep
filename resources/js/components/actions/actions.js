import axios from "axios";

/*
 * These should be put in their own file.
 */
export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";

// TODO - Fix this hardcoded value.
const URL = "https://firststep.test";

export function signInAction({ email, password }, history) {
    return async dispatch => {
        try {
            const res = await axios.post(`${URL}/api/login`, {
                email,
                password
            });

            dispatch({ type: AUTHENTICATED });
            localStorage.setItem("user", res.data.token);
            history.push("/");
        } catch (error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: "Invalid email or password"
            });
        }
    };
}

export function signOutAction() {
    console.log("Signout action");
    localStorage.clear();
    return {
        type: UNAUTHENTICATED
    };
}
