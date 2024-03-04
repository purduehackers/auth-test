import { cookies } from "next/headers";

export default function Home() {
  const accessToken = cookies().get("phIdAccessToken");
  const tokenType = cookies().get("phIdTokenType");
  const expiresIn = cookies().get("phIdExpiresIn");
  const scopes = cookies().get("phIdScopes");

  const authObject = {
    accessToken,
    tokenType,
    expiresIn,
    scopes,
  };

  if (accessToken) {
    return (
      <main className="flex min-h-screen flex-col gap-4 items-center p-24">
        <h1 className="text-2xl font-bold">You&apos;re authenticated!</h1>
        <pre>{JSON.stringify(authObject, null, 2)}</pre>
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <a
          href="http://localhost:3001/api/authorize?client_id=auth-test&response_type=code"
          className="border-2 rounded p-2 font-bold"
        >
          Sign in with passport
        </a>
      </main>
    );
  }
}
