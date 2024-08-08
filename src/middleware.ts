export {default} from 'next-auth/middleware';

//protect dashboard and all children subpage
export const config = { matcher: ['/dashboard/:path*']}
