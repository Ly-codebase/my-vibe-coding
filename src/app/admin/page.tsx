import AdminPanel from "@/components/AdminPanel";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "管理面板 | The Works of Louie Lu",
};

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <AdminPanel />
    </>
  );
}
