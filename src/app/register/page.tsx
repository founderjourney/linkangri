'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RegistrationData, CuisineType } from '@/types'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: '',
    phone: '',
    whatsapp: '',
    address: '',
    hours: '',
    cuisineType: 'general',
    description: ''
  })
  const [slug, setSlug] = useState('')
  const [success, setSuccess] = useState(false)

  const cuisineOptions: { value: CuisineType; label: string; emoji: string; description: string }[] = [
    { value: 'japanese', label: 'Japonés', emoji: '🍜', description: 'Sushi, ramen, estética zen' },
    { value: 'italian', label: 'Italiano', emoji: '🍝', description: 'Pasta, pizza, ambiente cálido' },
    { value: 'mexican', label: 'Mexicano', emoji: '🌮', description: 'Tacos, colores vibrantes' },
    { value: 'coffee', label: 'Cafetería', emoji: '☕', description: 'Café, repostería, minimalista' },
    { value: 'general', label: 'General', emoji: '🍽️', description: 'Estilo personalizable' }
  ]

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-generate slug from restaurant name
    if (field === 'name') {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      setSlug(generatedSlug)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...registrationData,
          slug,
          password: 'admin123' // Default password - should be changed after first login
        })
      })

      if (response.ok) {
        const data = await response.json();
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          // Fallback if redirectUrl is not provided
          setSuccess(true);
          setStep(4);
        }
      } else {
        const error = await response.json()
        alert(`Error: ${error.error || 'Ocurrió un problema con el registro.'}`)
      }
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Error en el registro. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

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
            🚀 Únete a Digitaliza
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Crea tu menú digital en minutos. Gestión móvil, QR codes, integración WhatsApp.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= stepNumber
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Step 1: Restaurant Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📍 Información del Restaurante
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Restaurante *
                  </label>
                  <input
                    type="text"
                    value={registrationData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Sakura Sushi"
                    required
                  />
                  {slug && (
                    <p className="text-sm text-gray-500 mt-1">
                      URL: digitaliza.com/demo/{slug}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={registrationData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+34 912 345 678"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={registrationData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+34 612 345 678"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    value={registrationData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Calle Serrano 45, Madrid"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horarios *
                  </label>
                  <input
                    type="text"
                    value={registrationData.hours}
                    onChange={(e) => handleInputChange('hours', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Lun-Dom: 13:00-16:00, 20:00-00:00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción (opcional)
                  </label>
                  <textarea
                    value={registrationData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe tu restaurante en pocas palabras..."
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setStep(2)}
                  disabled={!registrationData.name || !registrationData.phone || !registrationData.whatsapp || !registrationData.address || !registrationData.hours}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Template Selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎨 Elige tu Template
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cuisineOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleInputChange('cuisineType', option.value)}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                      registrationData.cuisineType === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{option.emoji}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Siguiente →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                ✅ Confirma tu Registro
              </h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Resumen:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Restaurante:</strong> {registrationData.name}</p>
                  <p><strong>URL:</strong> digitaliza.com/demo/{slug}</p>
                  <p><strong>Template:</strong> {cuisineOptions.find(opt => opt.value === registrationData.cuisineType)?.label}</p>
                  <p><strong>WhatsApp:</strong> {registrationData.whatsapp}</p>
                  <p><strong>Dirección:</strong> {registrationData.address}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">🔐 Acceso Administrativo:</h4>
                <p className="text-sm text-blue-800">
                  Password inicial: <code className="bg-blue-100 px-2 py-1 rounded">admin123</code>
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Cámbiala después del primer acceso en {slug}/admin
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Anterior
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Enviando...' : '🚀 Enviar Datos'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Success Step */}
          {success && step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Restaurante Creado!
              </h2>
              <p className="text-gray-600 mb-8">
                Tu menú digital está listo. Empieza a agregar platos y comparte el QR con tus clientes.
              </p>

              <div className="space-y-4">
                <a
                  href={`/demo/${slug}`}
                  className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  👀 Ver mi Menú Digital
                </a>
                <a
                  href={`/${slug}/admin`}
                  className="block w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  ⚙️ Ir al Panel Admin
                </a>
                <a
                  href="/"
                  className="block w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  🏠 Volver al Inicio
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}