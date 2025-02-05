import CustomizedHeader from "@/app/Components/Onboarding/Brand/dashboard/CustomizedHeader";
import Sidebar from "@/app/Components/Onboarding/Brand/dashboard/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen flex-row md:overflow-hidden bg-background">
      <section className="md:block hidden w-full flex-none md:w-64">
        <Sidebar />
      </section>
      <section className="w-full overflow-y-auto">
        <CustomizedHeader />
        <div className="flex-grow py-6 px-2 md:px-6 md:py-6 ">
          {children}
        </div>
      </section>
    </div>
  );
}