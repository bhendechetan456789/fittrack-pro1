import { motion } from 'framer-motion';

function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white min-h-screen overflow-x-hidden">
      {/* Floating Particles – mobile pe light opacity */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-50 md:opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.08),transparent_50%)]" />
      </div>

      {/* Navbar – mobile pe compact */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight"
          >
            FitTrack Pro
          </motion.h1>

          <div className="flex items-center gap-3 sm:gap-5">
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              className="px-4 sm:px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm sm:text-base font-medium transition-all duration-300"
            >
              Login
            </motion.a>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.08 }}
              className="px-5 sm:px-7 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm sm:text-base font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
            >
              Start Free
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Hero Section – mobile pe compact */}
      <section className="relative min-h-[70vh] sm:min-h-screen flex items-center justify-center pt-16 sm:pt-0 px-4 sm:px-6 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 sm:opacity-40 scale-110"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black" />
        </div>

        {/* Floating blobs – mobile pe chhote */}
        <motion.div
          className="absolute top-10 sm:top-20 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-br from-cyan-500/15 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-blue-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"
          animate={{ y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Hero Content – responsive text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-8 leading-tight bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Transform Your Body
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-10 text-gray-200">
            With Intelligence & Precision
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            AI-powered tracking • Real-time progress analytics • Elite trainer guidance • Personalized plans that actually work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/signup'}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-full text-white text-lg sm:text-xl font-bold shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-500"
            >
              Start Your Free Journey
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/login'}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-transparent border-2 border-cyan-500/60 text-cyan-400 rounded-full text-lg sm:text-xl font-bold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-500"
            >
              Already a Member? Login
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features – mobile pe 1 column, tablet 2, desktop 4 */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-12 sm:mb-20 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Built for Serious Results
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {[
              { icon: "📊", title: "Smart Tracking", desc: "Log workouts in seconds with AI suggestions & voice input." },
              { icon: "📈", title: "Real Progress", desc: "Advanced analytics, body composition, strength curves & trends." },
              { icon: "🏋️‍♂️", title: "Pro Trainers", desc: "1-on-1 coaching, form checks, custom programming from experts." },
              { icon: "🧬", title: "Personalized AI", desc: "Workout & nutrition plans that adapt to your recovery & goals." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ scale: 1.04, rotateX: 4, rotateY: 4, boxShadow: "0 20px 40px rgba(59,130,246,0.2)" }}
                className="relative bg-gray-900/50 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/5 hover:border-cyan-500/40 transition-all duration-500 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{feature.icon}</div>
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">{feature.title}</h4>
                <p className="text-gray-300 text-base sm:text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA – mobile pe compact */}
      <section className="py-16 sm:py-32 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.15),transparent_50%)]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Your Transformation Starts Today
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto"
          >
            Join the elite who train smarter, not harder.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(59,130,246,0.6)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/signup'}
            className="px-8 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-full text-white text-lg sm:text-2xl lg:text-3xl font-bold shadow-2xl shadow-purple-600/40 hover:shadow-purple-600/70 transition-all duration-500"
          >
            Claim Your Free Account Now
          </motion.button>
        </div>
      </section>

      {/* Footer – mobile pe simple */}
      <footer className="bg-black py-8 sm:py-12 border-t border-gray-800/50 text-center text-gray-500 text-sm sm:text-base">
        <p>© {new Date().getFullYear()} FitTrack Pro • Built for Champions</p>
        <p className="mt-2">Made with ❤️ in India • All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;