"use server";

import { cookies } from "next/headers";

export async function clearCookies() {
  cookies().delete("phIdAccessToken");
  cookies().delete("phIdTokenType");
  cookies().delete("phIdExpiresIn");
  cookies().delete("phIdScopes");
}
