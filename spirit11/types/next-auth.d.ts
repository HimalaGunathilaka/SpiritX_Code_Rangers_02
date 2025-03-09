import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    teamname: string;
  }

  interface Session {
    user: User & {
      username: string;
      teamname: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    teamname: string;
  }
} 