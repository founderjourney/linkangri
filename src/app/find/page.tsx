'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Restaurant {
  id: string
  slug: string
  name: string
  theme: string
  description?: string
  address: string
}

export default function FindRestaurantPage() {
  const [search, setSearch] = useState('')
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const themeEmojis = {
    japanese: '🍜',
    italian: '🍝',
    mexican: '🌮',
    coffee: '☕',
    general: '🍽️'
  }

  const themeColors = {
    japanese: 'from-red-500 to-pink-500',
    italian: 'from-green-500 to-red-500',
    mexican: 'from-yellow-500 to-red-500',
    coffee: 'from-amber-600 to-orange-600',
    general: 'from-blue-500 to-purple-500'
  }

  const searchRestaurants = async (query: string) => {
    if (query.length < 2) {
      setRestaurants([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setRestaurants(data.restaurants || [])
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      searchRestaurants(search)
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [search])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            🔍 Encuentra tu Restaurante
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Busca empresas registradas en Digitaliza
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Busca por nombre o tipo de cocina..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto">
          {search.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Escribe para buscar restaurantes
              </h3>
              <p className="text-gray-500">
                Encuentra menús digitales de restaurantes cerca de ti
              </p>
            </motion.div>
          )}

          {search.length >= 2 && restaurants.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No encontramos restaurantes
              </h3>
              <p className="text-gray-500 mb-6">
                Intenta con otros términos de búsqueda
              </p>
              <Link
                href="/register"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🚀 ¿Quieres registrar tu restaurante?
              </Link>
            </motion.div>
          )}

          {restaurants.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {restaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-16 bg-gradient-to-r ${themeColors[restaurant.theme as keyof typeof themeColors] || themeColors.general}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="text-3xl mr-3">
                        {themeEmojis[restaurant.theme as keyof typeof themeEmojis] || themeEmojis.general}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {restaurant.theme} • {restaurant.address}
                        </p>
                      </div>
                    </div>

                    {restaurant.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {restaurant.description}
                      </p>
                    )}

                    <div className="flex space-x-2">
                      <Link
                        href={`/demo/${restaurant.slug}`}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors text-center"
                      >
                        👀 Ver Menú
                      </Link>
                      <Link
                        href={`/${restaurant.slug}/admin`}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        ⚙️ Admin
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer CTA */}
        {restaurants.length > 0 && (
          <div className="text-center mt-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ¿Tienes un restaurante?
              </h3>
              <p className="text-gray-600 mb-6">
                Únete a Digitaliza y crea tu página de links en minutos
              </p>
              <Link
                href="/register"
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
              >
                🚀 Registrar mi Restaurante
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}