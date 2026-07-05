import { MetadataRoute } from 'next'
import { postsQuery } from '@/services/api/posts.query'
import { transportCategoriesQuery } from '@/services/api/transportCategories.query'
import { vehicleQuery } from '@/services/api/vehicle.query'
import { formatURL } from '@/lib/helpers/formatURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://autobusesdecolombia.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/empresas-de-transporte`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // empresas-fabricantes, destinos, rutas-de-transporte, terminales-de-transporte
    // y comunidad se excluyen del sitemap: son páginas "en construcción" sin
    // contenido propio todavía (marcadas noindex). Volver a agregarlas cuando
    // tengan contenido real.
    {
      url: `${baseUrl}/destinos/medellin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic route elements
  const dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    const [postsResult, categoriesResult, vehiclesResult] = await Promise.allSettled([
      postsQuery(),
      transportCategoriesQuery(),
      vehicleQuery(1, 200) // fetch up to 200 vehicles for the sitemap
    ])

    // 1. News Posts
    if (postsResult.status === 'fulfilled' && Array.isArray(postsResult.value)) {
      postsResult.value.forEach((post) => {
        if (post && post.post_id) {
          dynamicRoutes.push({
            url: `${baseUrl}/noticias/${post.post_id}`,
            lastModified: new Date(post.created_at || new Date()),
            changeFrequency: 'weekly',
            priority: 0.7,
          })
        }
      })
    }

    // 2. Transport Categories
    if (categoriesResult.status === 'fulfilled' && Array.isArray(categoriesResult.value)) {
      categoriesResult.value.forEach((category) => {
        if (category && category.transport_category_id) {
          dynamicRoutes.push({
            url: `${baseUrl}/transport-category/${category.transport_category_id}`,
            lastModified: new Date(category.created_at || new Date()),
            changeFrequency: 'monthly',
            priority: 0.6,
          })
        }
      })
    }

    // 3. Vehicles
    if (vehiclesResult.status === 'fulfilled' && vehiclesResult.value && Array.isArray(vehiclesResult.value.data)) {
      vehiclesResult.value.data.forEach((vehicle) => {
        if (vehicle && vehicle.vehicle_id) {
          const modelName = vehicle.model?.model_name || 'desconocido'
          const companyName = vehicle.company?.company_name || ''
          const serialCode = vehicle.companySerial?.company_serial_code || ''

          const slug = `${formatURL(modelName)}${
            companyName ? `-${formatURL(companyName)}` : ''
          }${
            serialCode ? `-${formatURL(serialCode)}` : ''
          }`

          dynamicRoutes.push({
            url: `${baseUrl}/vehiculo/${vehicle.vehicle_id}/${slug}`,
            lastModified: new Date(vehicle.created_at || new Date()),
            changeFrequency: 'weekly',
            priority: 0.6,
          })
        }
      })
    }
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error)
  }

  return [...staticRoutes, ...dynamicRoutes]
}
