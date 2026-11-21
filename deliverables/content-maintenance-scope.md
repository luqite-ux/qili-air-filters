# Qili Air Filters content maintenance scope

Tenant: `967a7fc2-7c38-49a9-a629-86cb7e5c8445`
Formal domain: `qiliairfilters.com`
Default locale: `en`

## Existing structured editors

- Product categories: name, description, sorting and visibility; authoritative source is the tenant-scoped category repository.
- Products: name, category, summary, description, specifications, gallery, sorting and visibility; authoritative source is the tenant-scoped product repository.
- News/articles: title, summary, body, cover, sorting and publication state; no demonstration article is published.
- Site settings: legal identity, logo/favicon, contact details, address, languages and notification address.
- Inquiries: tenant-scoped inquiry records; every public entry point uses its own generated CAPTCHA scope and server-side atomic challenge consumption.

## Website Content v3 fixed-layout modules

| Page | Module | Maintainable fields | Source | Frontend consumer |
| --- | --- | --- | --- | --- |
| `/` | `hero` | Three slide labels, headings, copy, CTA labels/links and tenant-owned banner images | Supplied banner folder and verified English copy | `HeroCarousel` |
| `/` | `faq` | Buyer FAQ group, question and answer, stable row ID and order | Verified product/company facts | `FaqSection` |
| `/` | `seo` | Homepage SEO title and description | Verified company/product facts | Next.js homepage metadata |

Layout, responsive breakpoints, animation, component order and CSS remain code-owned. The editor does not accept HTML, CSS, arbitrary modules or drag-and-drop layout. Product/article fields remain in their dedicated editors and are not duplicated in Website Content.

## Assets registered for fixed content

- Official logo: 1 tenant-owned R2 media asset.
- Homepage banners: 3 tenant-owned R2 media assets.
- Facility views: 7 tenant-owned R2 media assets, retained for later fixed-section adoption.
- ISO certificate collection: 1 tenant-owned R2 media asset.

All assets are registered under the same tenant; no local path, temporary URL or cross-tenant asset is allowed.
