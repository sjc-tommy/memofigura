import { PageRoute, SeoMetadata } from '../types';
import { FAQ_ITEMS } from '../data/mockData';

const BASE_URL = 'https://memofigura.com';

export function getSeoMetadata(route: string): SeoMetadata {
  switch (route) {
    case '/':
      return {
        title: 'Custom 3D Figurines From Your Photos | MemoFigura',
        description: 'Turn a favorite photo of someone you love into a one-of-a-kind 3D keepsake. Handcrafted and sculpted to display, gift, and treasure. Preview before production.',
        canonical: `${BASE_URL}/`,
        ogTitle: 'Custom 3D Figurines From Your Photos | MemoFigura',
        ogDescription: 'Turn meaningful photographs into tactile 3D keepsakes you can hold, display, and treasure. 100% photo privacy guaranteed.',
        ogImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'MemoFigura',
            url: BASE_URL,
            logo: `${BASE_URL}/assets/logo.png`,
            description: 'Artisan custom 3D keepsakes and figurines sculpted directly from customer photographs.',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-800-555-MEMO',
              contactType: 'Customer Care & Design Concierge',
              email: 'care@memofigura.com',
              availableLanguage: ['English'],
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'MemoFigura',
            url: BASE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${BASE_URL}/gallery?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
        ],
      };

    case '/custom-3d-figurine':
      return {
        title: 'Custom 3D Figurine From Photo | Handcrafted Keepsake | MemoFigura',
        description: 'Create your custom 3D figurine from any photograph. Digital 3D proof approval included before crafting. Natural walnut base and fine ceramic finish.',
        canonical: `${BASE_URL}/custom-3d-figurine`,
        ogTitle: 'Custom 3D Figurine From Photo — Handcrafted Keepsake',
        ogDescription: 'Upload your photo. Approve your 3D digital proof. Receive a stunning tangible keepsake crafted with heirloom precision.',
        ogImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Custom 3D Figurine From Photo',
            image: [
              'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
              'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85'
            ],
            description: 'Custom sculpted 3D keepsake figurine made from your personal photograph. Features customer digital approval, premium tactile ceramic matte finish, and solid walnut base options.',
            sku: 'MF-3D-FIG-001',
            brand: {
              '@type': 'Brand',
              name: 'MemoFigura',
            },
            offers: {
              '@type': 'Offer',
              url: `${BASE_URL}/custom-3d-figurine`,
              priceCurrency: 'USD',
              price: '129.00',
              priceValidUntil: '2027-12-31',
              itemCondition: 'https://schema.org/NewCondition',
              availability: 'https://schema.org/InStock',
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'US',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 30,
              }
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.95',
              reviewCount: '128',
              bestRating: '5',
              worstRating: '1',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Custom 3D Figurine', item: `${BASE_URL}/custom-3d-figurine` },
            ],
          },
        ],
      };

    case '/custom-pet-figurine':
      return {
        title: 'Custom Pet Figurines From Photos | Dogs, Cats & Companions | MemoFigura',
        description: 'Honor your beloved dog, cat, or furry best friend with a lifelike custom 3D sculpture. Preserving playful smiles and unique coat markings with touching accuracy.',
        canonical: `${BASE_URL}/custom-pet-figurine`,
        ogTitle: 'Custom Pet 3D Figurines From Photos | MemoFigura',
        ogDescription: 'Turn photos of your dog, cat, or companion into a tactile 3D keepsake you can touch and display forever.',
      };

    case '/custom-couple-figurine':
      return {
        title: 'Custom Couple 3D Figurines | Anniversary & Wedding Keepsakes | MemoFigura',
        description: 'Celebrate your love story with a handcrafted 3D couple figurine sculpted from your favorite photo together. Ideal for anniversaries, proposals, and weddings.',
        canonical: `${BASE_URL}/custom-couple-figurine`,
        ogTitle: 'Custom Couple 3D Figurines — Anniversaries & Weddings',
        ogDescription: 'From your favorite candid photo into a three-dimensional keepsake that stands forever on your mantle.',
      };

    case '/custom-family-figurine':
      return {
        title: 'Custom Family 3D Figurines | Multi-Generational Keepsakes | MemoFigura',
        description: 'Transform multi-generational family photos into heirloom 3D sculptures. Preserve parents, grandparents, and children in physical form.',
        canonical: `${BASE_URL}/custom-family-figurine`,
      };

    case '/gifts':
    case '/wedding-gifts':
    case '/anniversary-gifts':
    case '/birthday-gifts':
      return {
        title: 'Meaningful Personalized Photo Gifts & Keepsakes | MemoFigura',
        description: 'Looking for a gift they will never expect? Explore one-of-a-kind custom 3D keepsakes made from their most cherished photos.',
        canonical: `${BASE_URL}${route}`,
      };

    case '/pet-memorial':
      return {
        title: 'Custom Pet Memorial Keepsakes & Figurines | Rainbow Bridge | MemoFigura',
        description: 'A comforting physical tribute to celebrate and remember your beloved companion. Carefully sculpted from your memories with gentle dignity.',
        canonical: `${BASE_URL}/pet-memorial`,
      };

    case '/how-it-works':
      return {
        title: 'How It Works | 5 Simple Steps From Photo to 3D Keepsake | MemoFigura',
        description: 'See how MemoFigura transforms your photograph into a physical keepsake: Photo Upload, Artisan 3D Sculpting, Digital Proof Approval, Precision Crafting, & Delivery.',
        canonical: `${BASE_URL}/how-it-works`,
      };

    case '/gallery':
      return {
        title: 'Real Customer Photo to 3D Figurine Gallery | MemoFigura',
        description: 'Explore real before-and-after transformations: original customer photos alongside their completed 3D handcrafted figurines and emotional stories.',
        canonical: `${BASE_URL}/gallery`,
      };

    case '/reviews':
      return {
        title: 'Customer Reviews & Real Stories | MemoFigura 3D Keepsakes',
        description: 'Read authentic verified customer reviews and heartfelt stories from people who turned cherished memories into tangible 3D keepsakes.',
        canonical: `${BASE_URL}/reviews`,
      };

    case '/faq':
      return {
        title: 'Frequently Asked Questions | Photos, Proofs, Crafting & Privacy | MemoFigura',
        description: 'Have questions about photo requirements, digital proof revisions, material feel, or turnaround times? Find detailed answers here.',
        canonical: `${BASE_URL}/faq`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${BASE_URL}/faq` },
            ],
          },
        ],
      };

    case '/about':
      return {
        title: 'About MemoFigura | Custom 3D Keepsakes Made To Stay Close',
        description: 'MemoFigura turns meaningful photographs into custom 3D keepsakes. Learn about our story, how each piece is designed and produced, and how we handle your photos.',
        canonical: `${BASE_URL}/about`,
      };

    case '/photo-privacy':
      return {
        title: 'Photo Privacy & Data Security Policy | MemoFigura',
        description: 'Your memories are sacred. We never share, publish, or use your uploaded photos for public marketing without explicit written consent.',
        canonical: `${BASE_URL}/photo-privacy`,
      };

    case '/shipping':
      return {
        title: 'Shipping, Delivery Timelines & Packaging | MemoFigura',
        description: 'Learn about our insured white-glove packaging, international courier delivery, and production turnaround times.',
        canonical: `${BASE_URL}/shipping`,
      };

    case '/returns':
      return {
        title: 'Satisfaction Guarantee & Preview Approval Policy | MemoFigura',
        description: 'Our 100% digital proof approval guarantee. How we ensure you love your design before it is physically produced.',
        canonical: `${BASE_URL}/returns`,
      };

    case '/contact':
      return {
        title: 'Contact Us | MemoFigura Customer Service',
        description: 'Questions about your MemoFigura order, photos, production, shipping, or product quality? Email service@memofigura.com or use our contact form.',
        canonical: `${BASE_URL}/contact`,
      };

    case '/blog':
      return {
        title: 'Stories, Memory Preservation & Gift Guides | MemoFigura Journal',
        description: 'Reflections on memory, photography, heirloom gifting, and the cognitive value of tangible keepsakes in an ephemeral digital age.',
        canonical: `${BASE_URL}/blog`,
      };

    case '/refer':
      return {
        title: 'Refer & Earn Keepsake Credit | MemoFigura',
        description: 'Share your MemoFigura referral link. Your friend saves on their first custom 3D figurine and you earn keepsake credit once their order ships.',
        canonical: `${BASE_URL}/refer`,
        ogTitle: 'Refer & Earn — MemoFigura',
        ogDescription: 'Give a discount on a first custom keepsake, earn credit for your next one.',
        ogImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
      };

    default:
      return {
        title: 'MemoFigura | Custom 3D Figurines From Your Photos',
        description: 'Turn a favorite photo of someone you love into a one-of-a-kind 3D keepsake. Handcrafted to display, gift, and treasure.',
        canonical: `${BASE_URL}${route}`,
      };
  }
}

export function updatePageHead(route: string) {
  const meta = getSeoMetadata(route);
  if (typeof document === 'undefined') return;

  // Title
  document.title = meta.title;

  // Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', meta.description);
  }

  // Canonical
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', meta.canonical);
  }

  // OG Title & Desc
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', meta.ogTitle || meta.title);
  }
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', meta.ogDescription || meta.description);
  }

  // JSON-LD Script update
  const existingScript = document.getElementById('dynamic-jsonld-schema');
  if (existingScript) {
    existingScript.remove();
  }

  if (meta.jsonLd) {
    const script = document.createElement('script');
    script.id = 'dynamic-jsonld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(meta.jsonLd);
    document.head.appendChild(script);
  }
}
