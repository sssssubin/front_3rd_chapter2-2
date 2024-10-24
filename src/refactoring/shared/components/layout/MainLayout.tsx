interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="min-h-screen bg-gray-100">
    <main className="container mx-auto mt-6">{children}</main>
  </div>
);
