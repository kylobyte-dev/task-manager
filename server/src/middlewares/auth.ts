import type { IncomingHttpHeaders } from "http";
import type { Handler } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

const jwks = createRemoteJWKSet(new URL("https://auth.kylobyte.dev/oidc/jwks"));

const extractBearerTokenFromHeaders = ({
  authorization,
}: IncomingHttpHeaders) => {
  if (!authorization) {
    throw new Error("Authorization header is missing");
  }

  if (!authorization.startsWith("Bearer")) {
    throw new Error("Authorization header is not in the Bearer scheme");
  }

  return authorization.slice(7); // The length of 'Bearer ' is 7
};

// Generate a JWKS using jwks_uri obtained from the Logto server

export const authMiddleware: Handler = async (req, res, next) => {
  try {
    // Extract the token using the helper function defined above
    const token = extractBearerTokenFromHeaders(req.headers);

    const { payload } = await jwtVerify(
      // The raw Bearer Token extracted from the request header
      token,
      jwks,
      {
        // Expected issuer of the token, issued by the Logto server
        issuer: "https://auth.kylobyte.dev/oidc",
        // Expected audience token, the resource indicator of the current API
        audience: "https://api.taskmanager.kylobyte.dev/",
      }
    );

    return next();
  } catch (error: any) {
    next({ error: error.message });
  }
};
