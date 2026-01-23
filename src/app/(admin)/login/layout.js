"use client";
// export const metadata = {
//   title: "Login | Admin Panel",
//   description: "Secure login to access the admin dashboard",
// };

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen  flex flex-col bg-primary">
      {/* Header */}
      <header className="w-full bg-primary border-b-4 border-red-500   shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex justify-center items-center">
            <img alt="Logo" src="/assets/Logo.png" className="w-24" />
            <h1 className="text-xl font-bold text-red-600">
              🎙️ Adil cast Admin
            </h1>
          </div>
          <span className="text-sm text-gray-500">Secure Access</span>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex flex-1 items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}
