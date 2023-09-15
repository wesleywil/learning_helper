import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, {type NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../prisma/client";

export const authOptions:NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string,
        }),
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        async redirect({url, baseUrl}){
            return baseUrl
        },
        async session({session, token, user}){
            session = {
                ...session,
                user:{
                id:user.id,
                    ...session.user
                }
            }
            return session;
        }
    }
};

const handler = nextAuth(authOptions);

export {handler as GET, handler as POST}