// Strapi API response types
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: T
  meta: Record<string, never>
}

export interface StrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  formats?: {
    thumbnail?: StrapiImageFormat
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  provider: string
  createdAt: string
  updatedAt: string
}

export interface StrapiImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path?: string
  size: number
  width: number
  height: number
}

// Content types
export interface Page {
  id: number
  documentId: string
  title: string
  slug: string
  content: string
  hero_image?: StrapiMedia
  meta_description?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Programme {
  id: number
  documentId: string
  title: string
  slug: string
  age_range: string
  description: string
  key_features: string[]
  registration_link?: string
  sample_materials_link?: string
  images?: StrapiMedia[]
  testimonials?: Array<{
    quote: string
    author: string
    location?: string
  }>
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface SiteSettings {
  id: number
  documentId: string
  site_title: string
  contact_email: string
  contact_phone: string
  address: string
  social_facebook?: string
  social_twitter?: string
  social_linkedin?: string
  camp_registration_url: string
  hero_quote: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Navigation {
  id: number
  documentId: string
  title: string
  url: string
  parent?: Navigation
  order: number
  external: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}
