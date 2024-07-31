import NextAuth from "next-auth";
import {JWT} from "next-auth/jwt";

//declare db fields
declare module "next-auth" {
    interface Session {
     user: {
         id: number;
         email: string;
         name: string;
     };

     backendTokens: {
         accessToken: string;
         refreshToken: string;
     }
  }
}

declare module 'next-auth/jwt'{
  interface JWT{
      user: {
          id: number;
          email: string;
          name: string;
      };

      backendTokens: {
          accessToken: string;
          refreshToken: string;
      }
  }
}