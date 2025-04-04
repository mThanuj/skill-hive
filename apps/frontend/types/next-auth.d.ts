import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      email: string;
      name: string;
      isOAuth?: boolean;
      image: string;
      provider?: string;
    };
    accessToken?: string;
  }
}
