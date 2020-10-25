import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import * as querystring from "querystring";

export default function Login() {
  const { query } = useRouter();
  const qs = useMemo(() => querystring.stringify(query), [query]);

  const [form, setForm] = useState({ email: "jason@example.com", password: "abc123" });

  return <div>
    <p>Login Page {qs}</p>
    <form action={"/api/oauth/login?" + qs} method="POST">
      <label>
        Email
        <input type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
      </label>
      <label>
        Password
        <input type="password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}/>
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
}
