import type { ReactNode } from "react";
import { Navbar } from "../components/navigation/Navbar";
import { Footer } from "../components/layout/Footer";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div
      id="topo"
      className="min-h-screen flex flex-col bg-legendarios-charcoal text-white font-body"
    >
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

