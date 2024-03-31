import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  publicRoutes: ["/signin"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/"],
};
