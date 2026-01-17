function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Sticky Premium Navbar – responsive padding & text size */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            FitTrack Pro
          </h1>
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            <a 
              href="/login" 
              className="px-4 py-2 sm:px-5 lg:px-6 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm sm:text-base lg:text-lg font-medium transition"
            >
              Login
            </a>
            <a 
              href="/signup" 
              className="px-4 py-2 sm:px-5 lg:px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base lg:text-lg font-medium transition shadow-lg shadow-blue-500/20"
            >
              Sign Up Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section – responsive height, text, buttons */}
      <section className="relative min-h-[70vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Track Your Fitness Journey
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-10 lg:mb-12 max-w-3xl mx-auto">
            Log workouts, track progress, get personalized plans, and connect with professional trainers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center">
            <button 
              onClick={() => window.location.href = '/signup'}
              className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-base sm:text-lg lg:text-xl font-bold shadow-xl shadow-blue-500/30 transition transform hover:scale-105"
            >
              Get Started Free
            </button>
            <button 
              onClick={() => window.location.href = '/login'}
              className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-transparent border-2 border-blue-500 hover:bg-blue-600/20 rounded-xl text-blue-400 text-base sm:text-lg lg:text-xl font-bold transition"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Features Section – responsive grid, padding, text */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
            Why Choose FitTrack Pro?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {[
              { title: "Log Workouts Easily", desc: "Track exercises, duration, and calories in seconds." },
              { title: "Progress Tracking", desc: "Charts and stats to see your improvement over time." },
              { title: "Trainer Support", desc: "Connect with professional trainers for guidance." },
              { title: "Personalized Plans", desc: "Get custom workout plans based on your goals." }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-7 lg:p-8 rounded-2xl border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105"
              >
                <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6 sm:py-8 text-center text-gray-400 text-sm sm:text-base">
        <p>© 2026 FitTrack Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;