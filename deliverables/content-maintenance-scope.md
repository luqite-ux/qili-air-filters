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

## Website Content v4 fixed-layout modules

| Page | Module | Maintainable fields | Source | Frontend consumer |
| --- | --- | --- | --- | --- |
| `/` | `hero` | Three slide labels, headings, copy, CTA labels/links and tenant-owned banner images | Supplied banner folder and verified English copy | `HeroCarousel` |
| `/` | `faq` | Buyer FAQ group, question and answer, stable row ID and order | Verified product/company facts | `FaqSection` |
| `/` | `seo` | Homepage SEO title and description | Verified company/product facts | Next.js homepage metadata |
| `/` | `selection`, `airflow_layers`, `equipment`, `process`, `lead_times` | Existing homepage selection, filtration layers, equipment, process and lead-time copy and links | Existing verified homepage content; v4 migration and publication readback | Fixed homepage modules; 63-field desktop/mobile adoption report |
| `/` and `/quality` | `home.certificates` | Certificate standard, number, dates, English/Chinese scans | Six-page customer certificate PDF, mapped by certificate number | Home certification cards and Quality page |
| `/capabilities` | `gallery` | All 52 factory images, captions, business groups and ordering | Complete customer factory-photo folder | Grouped factory gallery |
| `/capabilities` | `equipment` | Six equipment groups and their machine counts | Excel company worksheet C17 | Production equipment list |
| `/capabilities` | `overview` | Factory description, area and workshop count | Excel C16 | Capability introduction and statistics |
| `/quality` | `registration` | Business licence image and heading | Excel embedded business licence | Company registration document link |

Layout, responsive breakpoints, animation, component order and CSS remain code-owned. The editor does not accept HTML, CSS, arbitrary modules or drag-and-drop layout. Product/article fields remain in their dedicated editors and are not duplicated in Website Content.

## Assets registered for fixed content

- Official logo: 1 tenant-owned R2 media asset.
- Homepage banners: 3 tenant-owned R2 media assets.
- Facility views: all 52 source images registered and used in the factory gallery.
- ISO certificate collection: original PDF retained; six complete page renders and twelve embedded objects registered. Public certificate scans are bound by certificate number rather than array position.
- Workbook logo and business licence: both retained in tenant-owned media; licence linked on Quality.

All assets are registered under the same tenant; no local path, temporary URL or cross-tenant asset is allowed.

## Remaining maintenance review

The entries above describe implemented modules, not a blanket backend acceptance. Other fixed copy and application-page content still require scope reconciliation; customer-role editing, publication adoption and typography verification remain tracked separately. Do not mark the entire maintenance gate PASS from this inventory alone.
