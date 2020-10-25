import crypto from "crypto";
import { useRouter } from "next/router";
import querystring from "querystring";
import { createContext, useContext } from "react";
import { base64urlencode } from "@jmondi/oauth2-server";

import { sampleClient, sampleScope1, sampleScope2 } from "./oauth/database";

// @ts-ignore
const AuthContext = createContext<UseAuth>();

export enum COOKIE {
  accessToken = "access_token",
  refreshToken = "refresh_token",
  auth = "auth",
}

function createOAuthSecurity() {
  const state = base64urlencode(crypto.randomBytes(5));
  const codeVerifier = base64urlencode(crypto.randomBytes(40));
  const codeChallenge = base64urlencode(crypto.createHash("sha256").update(codeVerifier).digest("hex"));
  return { state, codeVerifier, codeChallenge };
}

function AuthProvider(props: any) {
  const router = useRouter();

  const handleLoginRedirect = async () => {
    const { state, codeVerifier, codeChallenge } = createOAuthSecurity();
    const redirectQuery = {
      client_id: sampleClient.id,
      redirect_uri: sampleClient.redirectUris[0],
      response_type: "code",
      scope: [
        sampleScope1.name,
        sampleScope2.name
      ],
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    };

    const oauth = {
      codeVerifier,
      state,
    };

    localStorage.setItem("app__oauth", JSON.stringify(oauth));

    const redirectTo = "/api/oauth/authorize" + "?" + querystring.stringify(redirectQuery);

    await router.push(redirectTo);
  };

  return <AuthContext.Provider value={{
    handleLoginRedirect,
  }} {...props} />;
}

type UseAuth = {
  handleLoginRedirect(): Promise<void>;
}

const useAuth = () => useContext<UseAuth>(AuthContext);

export { AuthProvider, useAuth };
