import { bookingInquirySchema } from './bookingInquiry';
import { facilitySchema } from './facility';
import { faqSchema } from './faq';
import { homePageSchema } from './homePage';
import { productionSchema } from './production';
import { siteSettingsSchema } from './siteSettings';
import { studioSchema } from './studio';
import { testimonialSchema } from './testimonial';
import { ctaLinkSchema } from './objects/ctaLink';
import { heroStatSchema } from './objects/heroStat';
import { seoSchema } from './objects/seo';
import { socialLinkSchema } from './objects/socialLink';

export const schemaTypes = [
  siteSettingsSchema,
  homePageSchema,
  studioSchema,
  productionSchema,
  testimonialSchema,
  facilitySchema,
  faqSchema,
  bookingInquirySchema,
  ctaLinkSchema,
  heroStatSchema,
  seoSchema,
  socialLinkSchema,
];
