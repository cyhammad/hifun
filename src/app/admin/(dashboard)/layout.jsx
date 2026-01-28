import Image from "next/image";
import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import {
  Bricolage_Grotesque,
  Nunito_Sans,
  Red_Hat_Display,
} from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat-display",
});

const AdminDashboardLayout = ({ children }) => {
  return (
    <div
      className={`${bricolage.variable} ${nunitoSans.variable} ${redHatDisplay.variable} flex h-screen overflow-hidden relative`}
    >
      {/* Background Image */}
      <Image
        src="/login.png"
        alt="Background"
        fill
        className="object-cover pointer-events-none -z-10"
        priority
      />

      {/* Sidebar - Make transparent/glass to see bg or keep white as per design? User said 'sidebar is transparent' earlier */}
      <div className="relative z-10 flex h-full w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
