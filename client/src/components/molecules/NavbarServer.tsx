import { headers } from "next/headers";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
  const headersList = await headers();
  const userRole = headersList.get("x-user-role");

  return <NavbarClient userRole={userRole} />;
}
