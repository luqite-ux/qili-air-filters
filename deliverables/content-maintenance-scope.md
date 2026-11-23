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

## Website Content v11 fixed-layout modules

The v5 definition updated the homepage hero title's measured typography defaults to 41.6 px on desktop and 30.4 px at 390 px. The customer admin save, reopen and restore roundtrip for the three hero headings passed. Version 6 is now published with the same homepage content; full five-group typography and frontend style adoption remain pending.

Version 6 adds a tenant-owned Applications catalog with 14 preserved records. Application names, summaries, considerations and category links are editable in Website Content; the public application list and detail pages read the published snapshot. Version 7 adds the four group headings and descriptions, page introductions, guidance labels and inquiry copy. The homepage application group labels use the same published snapshot. The source-coded application records and copy fallbacks were removed; layout and category alias mapping remain code-owned.

Version 8 adds the Contact page headings, field labels, introduction and SEO title/description. The published site setting remains the source for the email, phone and address values. The form and CAPTCHA remain code-owned.

Version 9 adds 19 About page copy and SEO fields. Legal company name, brand and address still come from site settings; product scope entries come from the product category repository. The About image file remains a code asset pending media-slot reconciliation.

Version 10 adds the Quality page headings, certificate field labels, inspection steps, registration guidance, CTA and SEO copy. Certificate data and scans remain in the published certificates module. Unused hidden certificate placeholder markup was removed.

Version 11 adds the Capabilities page headings, process steps, equipment and gallery guidance, CTA and SEO copy. The 52 factory images, six equipment groups and facility overview remain in their existing published modules. Public page source fallbacks for equipment and gallery were removed.

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
| `/contact` | `page_copy` | Hero, details and form headings, contact labels and SEO copy | Existing published Contact page copy | Contact page and metadata |
| `/about` | `page_copy` | Hero, company introduction, fact labels, image caption and alt text, product scope, CTA and SEO copy | Existing published About page copy | About page and metadata |
| `/quality` | `page_copy` | Hero, certificate field labels, four inspection steps, registration guidance, CTA and SEO copy | Existing published Quality page copy | Quality page and metadata |
| `/capabilities` | `page_copy` | Hero, four production stages, equipment and gallery guidance, CTA and SEO copy | Existing published Capabilities page copy | Capabilities page and metadata |

Layout, responsive breakpoints, animation, component order and CSS remain code-owned. The editor does not accept HTML, CSS, arbitrary modules or drag-and-drop layout. Product/article fields remain in their dedicated editors and are not duplicated in Website Content.

## Assets registered for fixed content

- Official logo: 1 tenant-owned R2 media asset.
- Homepage banners: 3 tenant-owned R2 media assets.
- Facility views: all 52 source images registered and used in the factory gallery.
- ISO certificate collection: original PDF retained; six complete page renders and twelve embedded objects registered. Public certificate scans are bound by certificate number rather than array position.
- Workbook logo and business licence: both retained in tenant-owned media; licence linked on Quality.

All assets are registered under the same tenant; no local path, temporary URL or cross-tenant asset is allowed.

## Remaining maintenance review

The entries above describe implemented modules, not a blanket backend acceptance. Other fixed copy still requires scope reconciliation; customer-role editing of the v7 copy module, publication adoption and full five-group typography verification remain tracked separately. Do not mark the entire maintenance gate PASS from this inventory alone.
