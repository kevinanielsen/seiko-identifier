import { getServerSession } from "next-auth";
import { authOptions } from "../libs/next-auth";

export default async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
