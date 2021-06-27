
import React,{useContext, useEffect} from "react";
import { useState } from "react";
import { Route } from "react-router";
import { Redirect } from "react-router";
import { AuthContext } from "../context/authContext";
export function PrivateRoute({children, isAuthenticated ,...rest}) {
    const {authState} = useContext(AuthContext);
    const [auth,setAuth] = useState(authState.isAuthenticated);

    useEffect(() => {
       setAuth(authState.isAuthenticated)
    }, [authState.isAuthenticated])
    return (
        <Route
            {...rest}
            render={({location}) =>
            auth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}



