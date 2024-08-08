import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {Backend_URL} from "@/lib/Constants";
import {JWT} from "next-auth/jwt";

//refresh token function
async function refreshToken(token:JWT):Promise<JWT>{
 const res = await fetch(Backend_URL + "/api/auth/refresh", {
     method: "POST",
     headers: {
         //отправляем в бекенд заголовок с токеном обновления
         authorization: `Refresh ${token.backendToken.refreshToken}`,
     }
 })

    console.log('REFRESH REFRESH REFRESH');
  const respons = await res.json()

  return {
     ...token,
      backendToken: respons,
  }
}


export const authOptions: NextAuthOptions = {
    providers: [
        //описание принципов входа
        CredentialsProvider({
            name: 'Credential',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Your name'
                },
                password: {
                    label: "Password",
                    type: 'password',
                    placeholder: 'Your password'
                }
            },
            //проверка введенных данных, если все ок, возвращаем объект с данными пользователя
            async authorize(credentials, req){
                if(!credentials?.username || !credentials?.password) return null;

                const  {username, password} = credentials;

                const res = await fetch(Backend_URL + "/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if(res.status == 401){
                    console.log(res.statusText);
                    return null
                }

                const user = await res.json();

                return user;
            }
        })
    ],


    //for correct action control (session/jwt/redirect/signIn)
    callbacks: {
        async jwt({token, user}){
           if(user) return {...token, ...user};

           if(new Date().getTime() < token.backendToken.expiresIn) return token

            return await refreshToken(token);

        },
        async session({token, session}){

            session.user = token.user;
            session.backendTokens = token.backendToken;



            return session;
        }
    }
};

//указываем, что любой запрос .api/auth/должен обробатываться кодом выше
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }