import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#05050a] text-white">
      {/* Sidebar - fixed on the left */}
      <DashboardSidebar />
      
      {/* Main Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <DashboardHeader />
        
        {/* Page Content */}
        <main className="w-full flex-1">
          <div className="p-8 md:p-12 lg:p-16 w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
