'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Restaurant, MenuItem } from '@/types'
import { cn } from '@/lib/utils'
import MenuManagementView from './MenuManagementView'
import SettingsView from './SettingsView'
import DashboardView from './DashboardView'
import dynamic from 'next/dynamic'

const QRCodeView = dynamic(() => import('./QRCodeView'), { ssr: false })

interface AdminPanelProps {
  restaurant: Restaurant
  menuItems: MenuItem[]
  onUpdateMenuItem: (item: MenuItem) => void
  onDeleteMenuItem: (itemId: string) => void
  onAddMenuItem: (item: Omit<MenuItem, 'id' | 'restaurantId' | 'createdAt' | 'updatedAt'>) => void
  onLogout: () => void
  theme?: 'japanese' | 'italian' | 'mexican' | 'coffee'
}

type AdminView = 'dashboard' | 'menu' | 'settings' | 'qr'

export default function AdminPanel({
  restaurant,
  menuItems,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onAddMenuItem,
  onLogout,
  theme = 'japanese'
}: AdminPanelProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard')
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Theme colors
  const themeColors = {
    japanese: {
      primary: 'bg-red-600 hover:bg-red-700',
      primaryLight: 'bg-red-100 text-red-700',
      secondary: 'bg-red-50',
      accent: 'border-red-300',
      gradient: 'from-red-50 to-pink-50'
    },
    italian: {
      primary: 'bg-green-600 hover:bg-green-700',
      primaryLight: 'bg-green-100 text-green-700',
      secondary: 'bg-green-50',
      accent: 'border-green-300',
      gradient: 'from-green-50 to-yellow-50'
    },
    mexican: {
      primary: 'bg-red-600 hover:bg-red-700',
      primaryLight: 'bg-orange-100 text-red-700',
      secondary: 'bg-orange-50',
      accent: 'border-orange-300',
      gradient: 'from-orange-50 to-red-50'
    },
    coffee: {
      primary: 'bg-amber-600 hover:bg-amber-700',
      primaryLight: 'bg-amber-100 text-amber-700',
      secondary: 'bg-amber-50',
      accent: 'border-amber-300',
      gradient: 'from-amber-50 to-orange-50'
    }
  }

  const colors = themeColors[theme]

  const themeEmoji = {
    japanese: '🌸',
    italian: '🍷',
    mexican: '🌮',
    coffee: '☕'
  }

  const menuItems_byCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  const menuViews = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'menu', name: 'Menú', icon: '🍽️' },
    { id: 'qr', name: 'QR', icon: '📱' },
    { id: 'settings', name: 'Config', icon: '⚙️' }
  ] as const

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient}`}>
      {/* Header */}
      <header className={cn("sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-2", colors.accent)}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{themeEmoji[theme]}</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel Admin</h1>
                <p className="text-sm text-gray-600">{restaurant.name}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {menuViews.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setCurrentView(view.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all",
                    currentView === view.id
                      ? cn(colors.primary, "text-white")
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {view.icon} {view.name}
                </button>
              ))}
              <button
                onClick={onLogout}
                className="ml-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
              >
                🚪 Salir
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className="block w-full h-0.5 bg-gray-600"></span>
                <span className="block w-full h-0.5 bg-gray-600"></span>
                <span className="block w-full h-0.5 bg-gray-600"></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-2"
              >
                {menuViews.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => {
                      setCurrentView(view.id)
                      setShowMobileMenu(false)
                    }}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg font-medium transition-all text-left",
                      currentView === view.id
                        ? cn(colors.primary, "text-white")
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {view.icon} {view.name}
                  </button>
                ))}
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all text-left"
                >
                  🚪 Salir
                </button>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardView
                restaurant={restaurant}
                menuItems={menuItems}
                colors={colors}
                themeEmoji={themeEmoji[theme]}
                onNavigate={setCurrentView}
              />
            </motion.div>
          )}

          {currentView === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MenuManagementView
                restaurant={restaurant}
                menuItemsByCategory={menuItems_byCategory}
                onUpdateMenuItem={onUpdateMenuItem}
                onDeleteMenuItem={onDeleteMenuItem}
                onAddMenuItem={onAddMenuItem}
                colors={colors}
                themeEmoji={themeEmoji[theme]}
              />
            </motion.div>
          )}

          {currentView === 'qr' && (
            <QRCodeView
              restaurant={restaurant}
              colors={colors}
              themeEmoji={themeEmoji[theme]}
              onBack={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsView
                restaurant={restaurant}
                colors={colors}
                themeEmoji={themeEmoji[theme]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}