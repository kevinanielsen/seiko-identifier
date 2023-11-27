import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
