// Database connection and utilities for Digitaliza
import { PrismaClient } from '@prisma/client'
import type { OrderItem } from '@/types'

// Global Prisma instance for connection pooling
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize Prisma with performance optimizations
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'minimal',
})

// Prevent multiple Prisma instances in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Database utility functions
export const db = {
  // Restaurant operations
  restaurant: {
    async findBySlug(slug: string) {
      return prisma.restaurant.findUnique({
        where: { slug },
        include: {
          menuItems: {
            where: { available: true },
            orderBy: [{ category: 'asc' }, { order: 'asc' }]
          }
        }
      })
    },

    async create(data: {
      name: string
      phone: string
      whatsapp: string
      address: string
      hours: string
      theme?: string
      password: string
      logoUrl?: string
      description?: string
    }) {
      // Generate unique slug from restaurant name
      const baseSlug = data.name.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      let slug = baseSlug
      let counter = 1

      // Ensure unique slug
      while (await prisma.restaurant.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`
        counter++
      }

      return prisma.restaurant.create({
        data: {
          ...data,
          slug,
          theme: data.theme || 'japanese'
        }
      })
    },

    async updateById(id: string, data: Partial<{
      name: string
      phone: string
      whatsapp: string
      address: string
      hours: string
      theme: string
      logoUrl: string
      description: string
      colors: string
    }>) {
      return prisma.restaurant.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date()
        }
      })
    }
  },

  // Menu operations
  menu: {
    async getByRestaurantSlug(slug: string) {
      const restaurant = await prisma.restaurant.findUnique({
        where: { slug },
        select: { id: true }
      })

      if (!restaurant) return []

      return prisma.menuItem.findMany({
        where: { restaurantId: restaurant.id },
        orderBy: [{ category: 'asc' }, { order: 'asc' }]
      })
    },

    async create(data: {
      name: string
      price: string
      category: string
      description?: string
      restaurantId: string
      imageUrl?: string
    }) {
      // Get next order number for category
      const lastItem = await prisma.menuItem.findFirst({
        where: {
          restaurantId: data.restaurantId,
          category: data.category
        },
        orderBy: { order: 'desc' }
      })

      return prisma.menuItem.create({
        data: {
          ...data,
          order: (lastItem?.order || 0) + 1
        }
      })
    },

    async updateById(id: string, data: Partial<{
      name: string
      price: string
      category: string
      description: string
      available: boolean
      imageUrl: string
      order: number
    }>) {
      return prisma.menuItem.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date()
        }
      })
    },

    async toggleAvailability(id: string) {
      const item = await prisma.menuItem.findUnique({
        where: { id },
        select: { available: true }
      })

      if (!item) throw new Error('Menu item not found')

      return prisma.menuItem.update({
        where: { id },
        data: {
          available: !item.available,
          updatedAt: new Date()
        }
      })
    },

    async deleteById(id: string) {
      return prisma.menuItem.delete({
        where: { id }
      })
    }
  },

  // Order operations (for analytics)
  order: {
    async create(data: {
      customerName: string
      customerPhone: string
      items: OrderItem[] // Will be JSON stringified
      total: string
      deliveryType: string
      preferredTime?: string
      notes?: string
      restaurantId: string
    }) {
      return prisma.order.create({
        data: {
          ...data,
          items: JSON.stringify(data.items)
        }
      })
    },

    async getByRestaurantId(restaurantId: string, limit = 50) {
      return prisma.order.findMany({
        where: { restaurantId },
        orderBy: { createdAt: 'desc' },
        take: limit
      })
    }
  },

  // Analytics operations
  analytics: {
    async trackPageView(data: {
      restaurantId: string
      userAgent?: string
      ip?: string
      referrer?: string
    }) {
      return prisma.pageView.create({
        data
      })
    },

    async getStats(restaurantId: string) {
      const [menuItemsCount, availableItemsCount, ordersCount, viewsCount] = await Promise.all([
        prisma.menuItem.count({ where: { restaurantId } }),
        prisma.menuItem.count({ where: { restaurantId, available: true } }),
        prisma.order.count({ where: { restaurantId } }),
        prisma.pageView.count({ where: { restaurantId } })
      ])

      return {
        totalMenuItems: menuItemsCount,
        availableItems: availableItemsCount,
        totalOrders: ordersCount,
        totalViews: viewsCount
      }
    }
  }
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})