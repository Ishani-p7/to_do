function Layout({ children }) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 space-y-6">
            {children}
          </div>
        </div>
      </div>
    );
  }
  
  export default Layout;
  