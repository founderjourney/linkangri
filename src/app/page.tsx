import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-japanese-bg to-japanese-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-japanese-primary">LinkAngri</span>
              <br />
              <span className="text-2xl md:text-4xl font-normal text-gray-600">
                Restaurant Management Platform
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Gestiona tu restaurante desde el móvil. Menú dinámico, reservas por WhatsApp,
              y presencia web profesional en minutos.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-slide-up">
            <div className="card text-center">
              <div className="text-4xl mb-4">🍣</div>
              <h3 className="text-lg font-semibold mb-2">Templates Japonés</h3>
              <p className="text-gray-600 text-sm">Diseño elegante con motivos sakura</p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🍝</div>
              <h3 className="text-lg font-semibold mb-2">Templates Italiano</h3>
              <p className="text-gray-600 text-sm">Estilo clásico y acogedor</p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🌮</div>
              <h3 className="text-lg font-semibold mb-2">Templates Mexicano</h3>
              <p className="text-gray-600 text-sm">Colores vibrantes y festivos</p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-lg font-semibold mb-2">Templates Café</h3>
              <p className="text-gray-600 text-sm">Diseño moderno y minimalista</p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">💈</div>
              <h3 className="text-lg font-semibold mb-2">Templates Barbería</h3>
              <p className="text-gray-600 text-sm">Estilo vintage y masculino</p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">💅</div>
              <h3 className="text-lg font-semibold mb-2">Templates Salón de Uñas</h3>
              <p className="text-gray-600 text-sm">Diseño chic y moderno</p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-lg font-semibold mb-2">Templates Florería</h3>
              <p className="text-gray-600 text-sm">Elegancia floral y natural</p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-lg font-semibold mb-2">Templates Spa</h3>
              <p className="text-gray-600 text-sm">Ambiente relajante y fresco</p>
            </div>
          </div>

          {/* Demo Links */}
          <div className="space-y-4 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Ver Demos de Templates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/demo/sakura-sushi"
                className="btn-primary"
              >
                🌸 Demo Japonés
              </Link>
              <Link
                href="/demo/nonna-italiana"
                className="btn-primary bg-italian-primary hover:bg-italian-primary/90"
              >
                🍷 Demo Italiano
              </Link>
              <Link
                href="/demo/mariachi-cantina"
                className="btn-primary bg-mexican-primary hover:bg-mexican-primary/90"
              >
                🎉 Demo Mexicano
              </Link>
              <Link
                href="/demo/brew-coffee"
                className="btn-primary bg-coffee-primary hover:bg-coffee-primary/90"
              >
                ☕ Demo Café
              </Link>

              <Link
                href="/demo/the-gentleman-barber"
                className="btn-primary bg-stone-800 hover:bg-stone-700"
              >
                💈 Demo Barbería
              </Link>
              <Link
                href="/demo/nails-art-studio"
                className="btn-primary bg-pink-500 hover:bg-pink-400"
              >
                💅 Demo Uñas
              </Link>
              <Link
                href="/demo/floreria-petalos"
                className="btn-primary bg-emerald-500 hover:bg-emerald-400"
              >
                🌸 Demo Florería
              </Link>
              <Link
                href="/demo/belleza-spa"
                className="btn-primary bg-teal-500 hover:bg-teal-400"
              >
                ✨ Demo Spa
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-gray-600 mb-6">
              Crea la presencia digital de tu restaurante en menos de 5 minutos
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link href="/register" className="btn-primary">
                🚀 Registrar Restaurante
              </Link>
              <Link href="/find" className="btn-secondary">
                🔍 Buscar Restaurantes
              </Link>
              <Link href="/demo/sakura-sushi" className="btn-secondary">
                👀 Ver Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}