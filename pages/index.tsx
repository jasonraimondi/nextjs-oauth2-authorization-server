import { useAuth } from "../lib/use_auth";

export default function Home() {
  const { handleLoginRedirect } = useAuth();
  return <div>
    <button onClick={() => handleLoginRedirect()}>Redirect to Login</button>
  </div>;
}
