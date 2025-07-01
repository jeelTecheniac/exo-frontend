import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isMobileOpen: boolean;
  activeItem: string | null;
  toggleMobileSidebar: () => void;
  setActiveItem: (item: string | null) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        isMobileOpen,
        activeItem,
        toggleMobileSidebar,
        setActiveItem,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
