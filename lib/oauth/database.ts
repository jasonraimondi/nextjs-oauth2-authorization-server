import { OAuthAuthCode, OAuthClient, OAuthScope, OAuthToken, OAuthUser } from "@jmondi/oauth2-server";

export interface InMemory {
  users: { [email: string]: OAuthUser };
  clients: { [id: string]: OAuthClient };
  authCodes: { [id: string]: OAuthAuthCode };
  tokens: { [id: string]: OAuthToken };
  scopes: { [id: string]: OAuthScope };
}

export const sampleUser: OAuthUser = {
  id: "abc123",
  email: "jason@example.com",
  password: "abc123",
};

export const sampleScope1: OAuthScope = {
  name: "contacts.read",
  description: "Allow read access to contacts",
};

export const sampleScope2: OAuthScope = {
  name: "contacts.write",
  description: "Allow write access to contacts",
};

const url = process.env.NODE_ENV === "production"
  ? "https://nextjs-oauth2-authorization-server.vercel.app/oauth/callback"
  : "http://localhost:3000/oauth/callback";

export const sampleClient: OAuthClient = {
  allowedGrants: ["authorization_code"],
  redirectUris: [url],
  scopes: [sampleScope1, sampleScope2],
  id: "abc123",
  name: "Example Client",
};

export const inMemoryDatabase: InMemory = {
  clients: {
    [sampleClient.id]: sampleClient,
  },
  authCodes: {},
  tokens: {},
  scopes: {
    [sampleScope1.name]: sampleScope1,
    [sampleScope2.name]: sampleScope2,
  },
  users: {
    [sampleUser.email]: sampleUser,
  },
};
