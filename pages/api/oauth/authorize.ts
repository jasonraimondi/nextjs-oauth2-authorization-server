import type { Request, Response } from "express";
import { OAuthException, OAuthRequest } from "@jmondi/oauth2-server";

import { inMemoryAuthorizationServer } from "../../../lib/oauth/oauth_authorization_server";
import * as querystring from "querystring";

const authorizationServer = inMemoryAuthorizationServer;

export default async function(req: Request, res: Response) {
  const request = new OAuthRequest(req);

  try {
    // Validate the HTTP request and return an AuthorizationRequest.
    const authRequest = await authorizationServer.validateAuthorizationRequest(request);

    // You will probably redirect the user to a login endpoint.
    if (!req.cookies.user) {
      res.redirect("/login?" + querystring.stringify(req.query as any ?? {}))
      return;
    }
    // After login, the user should be redirected back with user in the session.
    // You will need to manage the authorization query on the round trip.
    // The auth request object can be serialized and saved into a user's session.

    // Once the user has logged in set the user on the AuthorizationRequest
    authRequest.user = JSON.parse(req.cookies.user);

    // Once the user has approved or denied the client update the status
    // (true = approved, false = denied)
    // authRequest.isAuthorizationApproved = getIsAuthorizationApprovedFromSession();
    authRequest.isAuthorizationApproved = true;

    // If the user has not approved the client's authorization request,
    // the user should be redirected to the approval screen.
    if (!authRequest.isAuthorizationApproved) {
      // This form will ask the user to approve the client and the scopes requested.
      // "Do you authorize Jason to: read contacts? write contacts?"
      res.redirect("/scopes?" + querystring.stringify(req.query as any ?? {}))
      return;
    }

    // At this point the user has approved the client for authorization.
    // Any last authorization requests such as Two Factor Authentication (2FA) can happen here.


    // Redirect back to redirect_uri with `code` and `state` as url query params.
    const response = await authorizationServer.completeAuthorizationRequest(authRequest);
    res.status(response.status);
    res.redirect(response.headers.location);
  } catch (e) {
    handleError(e, res);
  }
}

function handleError(e: any, res: Response) {
  if (e instanceof OAuthException) {
    res.status(e.status);
    res.send({
      status: e.status,
      message: e.message,
    });
    return;
  }
  throw e;
}
