import { useEffect, useState } from "react";

import { useAuth } from "../lib/use_auth";

export default function Home() {
  const { getLoginUrl, accessToken } = useAuth();
  const [loginUrl, setLoginUrl] = useState<string>();

  useEffect(() => {
    setLoginUrl(getLoginUrl());
  }, []);

  return <div>
    <p>AccessToken: {JSON.stringify(accessToken)}</p>
    <a href={loginUrl}>Redirect to Login</a>
  </div>;
}
