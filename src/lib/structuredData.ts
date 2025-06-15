
// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nexus Software Development Agency",
  "description": "Custom software development agency specializing in web apps, mobile apps, APIs, and cloud solutions",
  "url": "https://nexus-agency.com",
  "logo": "https://nexus-agency.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-NEXUS-1",
    "contactType": "Customer Service",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Tech Avenue",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94105",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://twitter.com/nexus_dev",
    "https://linkedin.com/company/nexus-dev",
    "https://github.com/nexus-dev"
  ]
};

// Service Schema
export const createServiceSchema = (serviceName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "Nexus Software Development Agency"
  },
  "serviceType": "Software Development",
  "category": "Technology Services"
});

// Review Schema for testimonials
export const createReviewSchema = (reviewText: string, authorName: string, rating: number) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewBody": reviewText,
  "author": {
    "@type": "Person",
    "name": authorName
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": rating,
    "bestRating": 5
  },
  "itemReviewed": {
    "@type": "Organization",
    "name": "Nexus Software Development Agency"
  }
});

// Breadcrumb Schema
export const createBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// FAQ Schema
export const createFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
