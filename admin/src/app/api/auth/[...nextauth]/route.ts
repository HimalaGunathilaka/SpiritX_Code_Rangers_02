import Admin from '@/models/admin';
import connectMongo from '@/lib/dbconfig';
import clientPromise from '@/lib/mongodb';
import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcryptjs';

interface Credentials {
  username: string;
  password: string;
}

interface UserType {
  _id: string;
  email: string;
  username: string;
  password: string;
  name: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
    };
  }
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined) {
        await connectMongo();
        const user = await Admin.findOne({ username: credentials?.username }) as UserType | null;

        if (!user) {
          throw new Error('No user found.');
        }

        if (user && credentials?.password) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordValid) {
            return {
              id: user._id.toString(),
              email: user.email,
              username: user.username,
              name: user.name,
            };
          }

          throw new Error('Invalid password');
        }

        throw new Error('Invalid username or password');
      },
    }),
  ],
  // adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // token.role = (user as unknown as UserType).role;
        token.name = (user as unknown as UserType).name;
        token.email = (user as unknown as UserType).email;
        token.username = (user as unknown as UserType).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        //session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(options);
export { handler as GET, handler as POST, options as authOptions };