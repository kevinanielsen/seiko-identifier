import Navbar from "../../components/Navbar";
import getCurrentUser from "../actions/getCurrentUser";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar currentUser={currentUser} />
      <div className="h-full">{children}</div>
    </>
  );
}
