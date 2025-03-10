import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    teamname: string;
  }

  interface Session {
    user: User & {
      id: string;
      name: string;
      email: string;
      username: string;
      teamname: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    teamname: string;
  }
} 