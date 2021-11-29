import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //token iwll exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  //allow requests if the following is true:
  // 1) its a request from next-auth session & provider fetching
  // 2) the token exists

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //redirect tem to login if they don't have token and are requesting a protected route.
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
