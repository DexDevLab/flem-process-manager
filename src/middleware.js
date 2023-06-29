import { NextResponse } from "next/server";

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("Access-Control-Allow-Credentials", true);
  requestHeaders.set("Access-Control-Allow-Origin", "*");
  requestHeaders.set(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  requestHeaders.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (request.method === "OPTIONS") {
    return NextResponse.status(200).end();
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
