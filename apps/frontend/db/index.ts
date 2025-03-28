import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const postgres = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
const db = drizzle({ client: postgres });

export default db;
