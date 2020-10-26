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
  password: "abc123"
}

export const sampleScope1: OAuthScope = {
  name: "contacts.read",
  description: "Allow read access to contacts",
};

export const sampleScope2: OAuthScope = {
  name: "contacts.write",
  description: "Allow write access to contacts",
};

export const sampleClient: OAuthClient = {
  allowedGrants: ["authorization_code"],
  redirectUris: ["http://localhost:3000/oauth/callback"],
  scopes: [sampleScope1, sampleScope2],
  id: "abc123",
  name: "Example Client"
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
    [sampleUser.email]: sampleUser
  },
};
