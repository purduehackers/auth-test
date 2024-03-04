import { NextResponse } from "next/server";

export interface IDAuthResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  scope: string;
}

export async function GET(req: Request) {
  const code = req.url.split("=")[1];
  const destinationUrl = new URL("/", new URL(req.url).origin);
  const response = NextResponse.redirect(destinationUrl);

  if (code && code !== "") {
    console.log({ code2: code });
    const resp = await fetch("http://localhost:3001/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: "auth-test",
        redirect_uri: "http://localhost:3000/callback",
      }).toString(),
    }).then((r) => r.json());
    console.log({ resp });

    if (resp["access_token"]) {
      const authDetails = resp as IDAuthResponse;
      response.cookies.set("phIdAccessToken", authDetails.access_token);
      response.cookies.set("phIdTokenType", authDetails.token_type);
      response.cookies.set("phIdExpiresIn", String(authDetails.expires_in));
      response.cookies.set("phIdScopes", authDetails.scope);

      return response;
    } else {
      return response;
    }
  } else {
    return response;
  }
}
