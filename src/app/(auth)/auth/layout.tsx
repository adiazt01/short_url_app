export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex flex-col justify-center items-center min-h-screen">
      <div className="border p-4 shadow w-full max-w-sm">
      {children}
      </div>
    </main>
  );
}
