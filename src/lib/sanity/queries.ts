export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    businessName,
    tagline,
    "logoUrl": logo.asset->url,
    phone,
    whatsappNumber,
    email,
    hoursText,
    addressLine1,
    addressLine2,
    city,
    region,
    postalCode,
    country,
    mapsEmbedUrl,
    mapsUrl,
    socialLinks[] {
      platform,
      label,
      url
    },
    "featuredClients": coalesce(featuredClients, []),
    defaultSeo {
      title,
      description
    }
  }
`;

export const HOME_PAGE_QUERY = `
  *[_type == "homePage"][0] {
    heroBadge,
    heroHeadline,
    heroHighlight,
    heroSubheadline,
    heroPrimaryCta {
      label,
      href
    },
    heroSecondaryCta {
      label,
      href
    },
    "heroStats": coalesce(heroStats, []),
    aboutEyebrow,
    aboutTitle,
    aboutDescription,
    aboutSecondaryDescription,
    "aboutFeatures": coalesce(aboutFeatures, []),
    aboutBadge,
    "aboutImageUrl": aboutImage.asset->url,
    seo {
      title,
      description
    }
  }
`;

export const STUDIO_NAV_QUERY = `
  *[_type == "studio" && defined(slug.current) && coalesce(isActive, true)]
    | order(coalesce(order, 999) asc, name asc) {
    _id,
    "title": name,
    "slug": slug.current
  }
`;

export const STUDIO_SLUGS_QUERY = `
  *[_type == "studio" && defined(slug.current) && coalesce(isActive, true)]
    | order(coalesce(order, 999) asc, name asc) {
    "slug": slug.current
  }
`;

export const STUDIO_CARD_QUERY = `
  *[_type == "studio" && defined(slug.current) && coalesce(isActive, true)]
    | order(coalesce(order, 999) asc, name asc) {
    _id,
    "title": name,
    "slug": slug.current,
    tagline,
    size,
    capacity,
    icon,
    accentColor,
    gradient,
    "suitableFor": coalesce(suitable_for, []),
    "heroImage": heroImage.asset->url,
    "featured": coalesce(featured, false)
  }
`;

export const STUDIO_DETAIL_QUERY = `
  *[_type == "studio" && slug.current == $slug && coalesce(isActive, true)][0] {
    _id,
    "title": name,
    "slug": slug.current,
    tagline,
    description,
    size,
    height,
    capacity,
    rateHourly,
    rateUnit,
    ratePerDay,
    ratePerShift,
    minBookingHours,
    parking,
    powerCapacity,
    icon,
    accentColor,
    gradient,
    "suitableFor": coalesce(suitable_for, []),
    "facilities": coalesce(facilities, []),
    "productions": coalesce(productions, []),
    "heroImage": heroImage.asset->url,
    "galleryImages": coalesce(galleryImages[].asset->url, []),
    "setPdfUrl": setPDF.asset->url,
    "setLayoutImage": setLayoutImage.asset->url,
    setLayoutDescription,
    "layoutZones": coalesce(layoutZones, []),
    "featured": coalesce(featured, false),
    "order": coalesce(order, 999),
    seo {
      title,
      description
    }
  }
`;

export const PRODUCTIONS_QUERY = `
  *[_type == "production" && coalesce(isActive, true)]
    | order(year desc, coalesce(order, 999) asc, title asc) {
    _id,
    title,
    type,
    year,
    network,
    description,
    "posterImage": posterImage.asset->url,
    "featured": coalesce(featured, false),
    "order": coalesce(order, 999)
  }
`;

export const HOME_PRODUCTIONS_QUERY = `
  *[_type == "production" && coalesce(isActive, true) && coalesce(showOnHome, true)]
    | order(coalesce(order, 999) asc, year desc, title asc) {
    _id,
    title,
    type,
    year,
    network,
    description,
    "posterImage": posterImage.asset->url,
    "featured": coalesce(featured, false),
    "order": coalesce(order, 999)
  }
`;

export const FEATURED_PRODUCTION_QUERY = `
  *[_type == "production" && coalesce(isActive, true) && featured == true]
    | order(coalesce(order, 999) asc, year desc)[0] {
    _id,
    title,
    type,
    year,
    network,
    description,
    "posterImage": posterImage.asset->url,
    "featured": coalesce(featured, false),
    "order": coalesce(order, 999)
  }
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && coalesce(isActive, true) && coalesce(featured, true)]
    | order(coalesce(order, 999) asc, clientName asc) {
    _id,
    clientName,
    role,
    productionHouse,
    production,
    network,
    quote,
    "image": image.asset->url,
    "featured": coalesce(featured, true),
    "order": coalesce(order, 999)
  }
`;

export const FACILITIES_QUERY = `
  *[_type == "facility" && coalesce(isActive, true)]
    | order(coalesce(order, 999) asc, name asc) {
    _id,
    name,
    icon,
    shortDescription,
    "features": coalesce(features, []),
    note,
    accentColor,
    gradient,
    "order": coalesce(order, 999)
  }
`;

export const FAQS_BY_PLACEMENT_QUERY = `
  *[_type == "faq" && coalesce(isActive, true) && $placement in coalesce(placements, [])]
    | order(coalesce(order, 999) asc, question asc) {
    _id,
    question,
    answer,
    "placements": coalesce(placements, []),
    "order": coalesce(order, 999)
  }
`;
