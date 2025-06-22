import axios from 'axios'
import type {
  StrapiResponse,
  StrapiSingleResponse,
  Page,
  Programme,
  SiteSettings,
  Navigation,
  StrapiMedia,
} from '@/types/strapi'

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ''

const strapiApi = axios.create({
  baseURL: `${STRAPI_API_URL}/api`,
  headers: {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

// Pages API
export async function getPages(): Promise<Page[]> {
  try {
    const response = await strapiApi.get<StrapiResponse<Page[]>>('/pages?populate=*')
    return response.data.data
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await strapiApi.get<StrapiResponse<Page[]>>(
      `/pages?filters[slug][$eq]=${slug}&populate=*`
    )
    return response.data.data[0] || null
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error)
    return null
  }
}

// Programmes API
export async function getProgrammes(): Promise<Programme[]> {
  try {
    const response = await strapiApi.get<StrapiResponse<Programme[]>>(
      '/programmes?populate=*&sort=order:asc'
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching programmes:', error)
    return []
  }
}

export async function getProgrammeBySlug(slug: string): Promise<Programme | null> {
  try {
    const response = await strapiApi.get<StrapiResponse<Programme[]>>(
      `/programmes?filters[slug][$eq]=${slug}&populate=*`
    )
    return response.data.data[0] || null
  } catch (error) {
    console.error(`Error fetching programme with slug ${slug}:`, error)
    return null
  }
}

// Site Settings API
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await strapiApi.get<StrapiSingleResponse<SiteSettings>>(
      '/site-setting?populate=*'
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// Navigation API
export async function getNavigation(): Promise<Navigation[]> {
  try {
    const response = await strapiApi.get<StrapiResponse<Navigation[]>>(
      '/navigations?populate=*&sort=order:asc'
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return []
  }
}

// Utility function to get full URL for Strapi media
export function getStrapiMediaUrl(url: string): string {
  if (url.startsWith('http')) {
    return url
  }
  return `${STRAPI_API_URL}${url}`
}

// Utility function to get optimized image URL
export function getOptimizedImageUrl(
  media: StrapiMedia | null | undefined,
  size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
): string {
  if (!media) return ''

  if (media.formats && media.formats[size]) {
    return getStrapiMediaUrl(media.formats[size].url)
  }

  return getStrapiMediaUrl(media.url)
}
