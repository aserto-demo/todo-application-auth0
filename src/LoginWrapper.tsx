import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { App } from "./App";
import TodoService from "./todoService";

export function LoginWrapper() {
  const {
    isLoading,
    error,
    user,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        setToken(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  //Only load the app if the user is logged in, and user data is available
  if (isAuthenticated && token && user && user.email && user.sub) {
    return (
      <TodoService token={token}>
        <App
          user={{
            email: user.email,
            sub: user.sub,
          }}
        ></App>
      </TodoService>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}
