import AdminSidebar from "@/components/molecules/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-primary">
      <aside className="fixed inset-y-0 left-0 z-50">
        <AdminSidebar />
      </aside>

      <main className="flex-1 lg:ml-72 min-h-screen focus:outline-none">
        <div className="p-4 md:p-8 lg:p-12">{children}</div>
      </main>
    </div>
  );
}
