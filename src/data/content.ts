import {
  Activity,
  Anchor,
  Armchair,
  Award,
  Baby,
  Cpu,
  Crown,
  Droplets,
  Gem,
  Heart,
  Hospital,
  Layers,
  Link2,
  Microscope,
  Monitor,
  Scan,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Site identity                                                      */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "CRAFTLAND DENTAL",
  tagline: "Where Advanced Dentistry Meets Beautiful Smiles.",
  phone: "(615) 555-0147",
  phoneHref: "tel:+16155550147",
  email: "hello@craftlanddental.example",
  address: "128 Placeholder Avenue, Suite 400, Your City",
  emergency: "(615) 555-0147",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Smile Gallery", href: "#gallery" },
  { label: "Our Team", href: "#team" },
  { label: "Patient Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const HOURS = [
  { day: "Monday – Friday", time: "08:00 – 19:00" },
  { day: "Saturday", time: "09:00 – 16:00" },
  { day: "Sunday", time: "Closed · emergency line only" },
];

/* ------------------------------------------------------------------ */
/*  Media (stock/demo assets: Pexels + generated demo illustrations)   */
/* ------------------------------------------------------------------ */

const px = (id: number, w: number, h: number, ext: "jpeg" | "png" = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&h=${h}&w=${w}`;

export const MEDIA = {
  heroPoster: "/images/hero-tooth.webp",
  heroVideo: "https://videos.pexels.com/video-files/6763242/6763242-hd_1920_1080_25fps.mp4",
  heroVideoPoster: px(6193194, 1600, 900),
  tourVideo: "https://videos.pexels.com/video-files/14934108/14934108-uhd_3840_2160_25fps.mp4",
  tourPoster: "https://images.pexels.com/videos/14934108/pexels-photo-14934108.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  techVideo: "https://videos.pexels.com/video-files/5356831/5356831-uhd_3840_2160_25fps.mp4",
  techPoster: px(7789651, 1600, 900),
  about: "/images/about.webp",
  aboutSecondary: "/images/about-secondary.webp",
  receptionPhoto: px(6193194, 1200, 900),
  treatmentRoom: px(3881468, 1200, 900),
  equipmentPhoto: px(7789651, 1200, 900),
  interiorPhoto: px(6193192, 1200, 900),
  techScanner: px(31017708, 1200, 900),
  techXray: px(6502015, 1200, 900),
  techSterile: px(6627689, 1200, 900),
  techMicroscope: px(6809648, 1200, 900),
  techPatient: px(3845759, 1200, 900),
  feature: px(5355864, 1000, 1200),
  ctaBg: px(6627668, 1800, 1000),
};

/** Before / After demo pairs (AI-generated illustrations, clearly labelled as demo). */
export const GALLERY_CASES = [
  {
    id: "case-a",
    title: "Whitening & Alignment",
    treatment: "Teeth whitening · Clear aligners",
    timeline: "Illustrative timeline · 10 weeks",
    before: "/images/gallery/before-1.webp",
    after: "/images/gallery/after-1.webp",
    note: "Brighter shade and refined alignment of the front teeth.",
  },
  {
    id: "case-b",
    title: "Restorative Refinement",
    treatment: "Dental crowns · Bonding",
    timeline: "Illustrative timeline · 6 weeks",
    before: "/images/gallery/before-2.webp",
    after: "/images/gallery/after-2.webp",
    note: "Worn and chipped edges rebuilt to natural proportions.",
  },
  {
    id: "case-c",
    title: "Gum-line & Veneer Harmony",
    treatment: "Dental veneers · Gum contouring",
    timeline: "Illustrative timeline · 8 weeks",
    before: "/images/gallery/before-3.webp",
    after: "/images/gallery/after-3.webp",
    note: "Balanced gum line with proportionate, even-toned veneers.",
  },
];

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

export const FEATURES: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Experienced Dental Professionals",
    text: "Our specialists hold advanced postgraduate training and bring decades of combined clinical experience to every case.",
    icon: Award,
  },
  {
    title: "Advanced Dental Technology",
    text: "Digital scanning, 3D imaging and chairside design let us plan with precision and show you the outcome beforehand.",
    icon: Cpu,
  },
  {
    title: "Personalized Treatment Plans",
    text: "Every smile is unique. We map a clear, step-by-step plan around your goals, timeline and comfort.",
    icon: Target,
  },
  {
    title: "Comfortable Patient Experience",
    text: "Warm lighting, gentle hands, calming audio and sedation options make even complex visits feel effortless.",
    icon: Armchair,
  },
  {
    title: "Modern Clinical Facilities",
    text: "Our studio-style suites meet the highest sterilisation and safety standards, designed for calm and clarity.",
    icon: Hospital,
  },
  {
    title: "Patient-Focused Care",
    text: "We listen first. Transparent pricing, honest advice and ongoing support keep you confident at every step.",
    icon: Heart,
  },
];

/* ------------------------------------------------------------------ */
/*  Treatments                                                         */
/* ------------------------------------------------------------------ */

export type Treatment = {
  id: string;
  title: string;
  short: string;
  details: string;
  image: string;
  icon: LucideIcon;
  duration: string;
  points: string[];
};

export const TREATMENTS: Treatment[] = [
  {
    id: "whitening",
    title: "Teeth Whitening",
    short: "Professional-grade whitening that lifts shade safely and evenly.",
    details:
      "Supervised in-chair whitening with a sensitivity-aware protocol, followed by a take-home maintenance kit for lasting brightness.",
    image: px(3845759, 1200, 900),
    icon: Sun,
    duration: "60–90 min",
    points: ["Shade assessment before treatment", "Low-sensitivity formula", "Custom take-home trays"],
  },
  {
    id: "implants",
    title: "Dental Implants",
    short: "Permanent, natural-feeling tooth replacement built to last.",
    details:
      "Guided 3D implant planning, precise placement and a custom crown that blends seamlessly with your natural teeth and bite.",
    image: px(6502305, 1200, 900),
    icon: Anchor,
    duration: "Staged · 3–6 months",
    points: ["3D guided planning", "Titanium implant systems", "Natural-looking crowns"],
  },
  {
    id: "makeovers",
    title: "Smile Makeovers",
    short: "A complete, harmonised transformation designed around your face.",
    details:
      "Combining whitening, veneers, bonding and alignment, we design the full smile on screen first so you approve the result before we begin.",
    image: px(20596945, 1200, 900),
    icon: ScanFace,
    duration: "Personalised plan",
    points: ["Digital smile design", "Facial proportion analysis", "Mock-up preview"],
  },
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry",
    short: "Subtle, elegant refinements that enhance shape, colour and balance.",
    details:
      "From bonding and contouring to tooth-coloured restorations, cosmetic care is tailored to look natural in motion as well as in photographs.",
    image: px(5355899, 1200, 900),
    icon: Gem,
    duration: "Varies by case",
    points: ["Tooth-coloured composites", "Minimal-prep options", "Shade matching by hand"],
  },
  {
    id: "aligners",
    title: "Invisalign / Clear Aligners",
    short: "Discreet, removable aligners that straighten teeth without metal brackets.",
    details:
      "Digital scans generate a precise treatment sequence. You'll see your projected result before the first aligner is made.",
    image: px(28407749, 1200, 900),
    icon: Layers,
    duration: "6–18 months",
    points: ["Virtually invisible", "Digital treatment preview", "Regular progress checks"],
  },
  {
    id: "veneers",
    title: "Dental Veneers",
    short: "Ultra-thin porcelain shells for a flawless, camera-ready smile.",
    details:
      "Conservative preparation and handcrafted porcelain veneers that mask discolouration, gaps and wear with remarkable translucency.",
    image: px(6627571, 1200, 900),
    icon: Sparkles,
    duration: "2–3 visits",
    points: ["Minimal tooth preparation", "Translucent porcelain", "Lifelike shade layering"],
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    short: "Comfortable, microscope-assisted care to save natural teeth.",
    details:
      "Under magnification, we clean and seal the root canal system to relieve pain and preserve your natural tooth for years to come.",
    image: px(4297519, 1200, 900),
    icon: Microscope,
    duration: "1–2 visits",
    points: ["Microscope-assisted", "Local anaesthetic comfort", "Restoration included"],
  },
  {
    id: "crowns",
    title: "Dental Crowns",
    short: "Durable, natural-looking caps that restore strength and shape.",
    details:
      "Precision-milled or laboratory-crafted crowns, matched to your neighbouring teeth for colour, translucency and a comfortable bite.",
    image: px(5355838, 1200, 900),
    icon: Crown,
    duration: "2 visits",
    points: ["Zirconia & porcelain options", "Same-day CAD/CAM available", "Bite-balanced fit"],
  },
  {
    id: "preventive",
    title: "Preventive Dentistry",
    short: "Early detection and proactive care that keeps problems small.",
    details:
      "Comprehensive examinations, digital imaging and personalised home-care coaching help protect your smile for the long term.",
    image: px(5622270, 1200, 900),
    icon: ShieldCheck,
    duration: "45 min",
    points: ["Digital X-rays", "Risk assessment", "Personal care plan"],
  },
  {
    id: "cleaning",
    title: "Teeth Cleaning",
    short: "Gentle professional cleaning that leaves teeth fresh and smooth.",
    details:
      "Ultrasonic and hand-instrument cleaning removes plaque and tartar, followed by polishing and a fluoride treatment.",
    image: px(5355833, 1200, 900),
    icon: Droplets,
    duration: "30–60 min",
    points: ["Ultrasonic scaling", "Air-polish finish", "Fluoride protection"],
  },
  {
    id: "bridges",
    title: "Dental Bridges",
    short: "Fixed bridgework that replaces missing teeth with confidence.",
    details:
      "Crafted to match your natural teeth in shape and shade, bridges restore chewing function and keep neighbouring teeth stable.",
    image: px(7788493, 1200, 900),
    icon: Link2,
    duration: "2–3 visits",
    points: ["Porcelain-fused options", "Shade-matched design", "Durable materials"],
  },
  {
    id: "pediatric",
    title: "Pediatric Dentistry",
    short: "Kind, playful dental care that builds healthy habits for life.",
    details:
      "Child-friendly visits in a relaxed setting, with age-appropriate education, fluoride guidance and gentle, encouraging care.",
    image: px(8260438, 1200, 900),
    icon: Baby,
    duration: "30–45 min",
    points: ["Friendly, calm environment", "Parent guidance", "Preventive focus"],
  },
];

/* ------------------------------------------------------------------ */
/*  Doctors                                                            */
/* ------------------------------------------------------------------ */

export const DOCTORS = [
  {
    id: "elena",
    name: "Dr. Elena Marchetti",
    role: "Lead Cosmetic & Restorative Dentist",
    specialty: "Cosmetic Dentistry · Smile Design",
    years: 14,
    image: px(5355860, 800, 1000),
    bio: "Elena designs every smile around facial harmony, pairing digital smile planning with meticulous, hand-finished restorations.",
  },
  {
    id: "julian",
    name: "Dr. Julian Ashford",
    role: "Implantologist & Oral Surgeon",
    specialty: "Dental Implants · Oral Surgery",
    years: 17,
    image: px(37458054, 800, 1000),
    bio: "Julian brings surgical precision and a calm chairside manner to implant care, with guided planning for predictable outcomes.",
  },
  {
    id: "priya",
    name: "Dr. Priya Raman",
    role: "Pediatric & Preventive Dentist",
    specialty: "Pediatric Dentistry · Prevention",
    years: 11,
    image: px(5355864, 800, 1000),
    bio: "Priya makes every first visit a positive one, building lifelong habits through gentle education and patient, playful care.",
  },
  {
    id: "marcus",
    name: "Dr. Marcus Holt",
    role: "Endodontist",
    specialty: "Root Canal · Micro-Endodontics",
    years: 12,
    image: px(6812464, 800, 1000),
    bio: "Marcus saves natural teeth using microscope-assisted root canal therapy, focused on comfort, precision and long-term results.",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials (sample / demo content)                              */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Amara Lindqvist",
    treatment: "Clear Aligners",
    rating: 5,
    image: px(20596945, 400, 400),
    text: "From the first consultation I felt genuinely listened to. The digital preview showed exactly what my smile could look like, and the result matched it beautifully.",
  },
  {
    id: 2,
    name: "Daniel Okafor",
    treatment: "Dental Implants",
    rating: 5,
    image: px(3845759, 400, 400),
    text: "A complex implant case handled with calm precision. The team kept me informed at every stage, and recovery was far smoother than I had expected.",
  },
  {
    id: 3,
    name: "Sofia Reyes",
    treatment: "Smile Makeover",
    rating: 5,
    image: px(34683936, 400, 400, "png"),
    text: "It feels more like a boutique design studio than a clinic. Dr. Marchetti took the time to understand what I wanted, and I smile in photos again.",
  },
  {
    id: 4,
    name: "Michael Tan",
    treatment: "Preventive Care",
    rating: 4,
    image: px(11956947, 400, 400),
    text: "Gentle, unhurried and very thorough. The hygienist explained every step, and I left with a clear plan for long-term oral health.",
  },
];

/* ------------------------------------------------------------------ */
/*  Technology                                                         */
/* ------------------------------------------------------------------ */

export const TECHNOLOGY = [
  {
    title: "Digital Intraoral Scanning",
    text: "Comfortable, powder-free 3D scans replace uncomfortable impressions and feed directly into our planning software.",
    icon: Scan,
    image: px(31017708, 1200, 900),
  },
  {
    title: "Digital Radiography",
    text: "Low-dose digital X-rays deliver sharp, instantly viewable images with significantly less radiation exposure.",
    icon: Activity,
    image: px(6502015, 1200, 900),
  },
  {
    title: "Operating Microscope",
    text: "Magnified, illuminated views allow our clinicians to treat with exceptional accuracy and minimal disruption.",
    icon: Microscope,
    image: px(6809648, 1200, 900),
  },
  {
    title: "Chairside Digital Design",
    text: "Same-day crowns and restorations designed and milled in-house, cutting waiting time without compromise.",
    icon: Monitor,
    image: px(6627689, 1200, 900),
  },
  {
    title: "Laser-Assisted Therapy",
    text: "Precise soft-tissue and whitening procedures with reduced bleeding, swelling and discomfort.",
    icon: Zap,
    image: px(6627668, 1200, 900),
  },
  {
    title: "Hospital-Grade Sterilisation",
    text: "Validated sterilisation cycles and single-use protocols give every visit an unmistakable standard of safety.",
    icon: ShieldCheck,
    image: px(6627653, 1200, 900),
  },
];

/* ------------------------------------------------------------------ */
/*  Stats (placeholder figures for demonstration)                     */
/* ------------------------------------------------------------------ */

export const STATS = [
  { value: 15, suffix: "+", label: "Years of clinical excellence" },
  { value: 12000, suffix: "+", label: "Smiles cared for (placeholder)" },
  { value: 4.9, suffix: "", label: "Average patient rating (placeholder)", decimals: 1 },
  { value: 4, suffix: "", label: "Specialist dentists on the team" },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const FAQS = [
  {
    q: "Is professional teeth whitening safe for my enamel?",
    a: "Yes. We begin with an examination to check enamel and gum health, then use a controlled concentration with a sensitivity-aware protocol. Most patients experience only mild, temporary tingling.",
  },
  {
    q: "How long do dental implants last?",
    a: "With good hygiene and regular professional reviews, implants can last for decades. Your dentist will explain the expected lifespan for your specific case during planning.",
  },
  {
    q: "Do clear aligners hurt?",
    a: "You may feel gentle pressure for a few days when switching to a new aligner set. This is a sign the teeth are moving as planned and typically eases quickly.",
  },
  {
    q: "How often should I visit for a check-up?",
    a: "Most patients benefit from a check-up and cleaning every six months. Some people need more frequent visits, and we will recommend the right rhythm for you.",
  },
  {
    q: "Do you treat children as well as adults?",
    a: "Absolutely. Our pediatric team offers gentle, age-appropriate care in a relaxed environment, with plenty of guidance for parents on brushing, diet and fluoride.",
  },
  {
    q: "What should I do in a dental emergency?",
    a: "Call our emergency line as soon as possible. We reserve same-day slots for urgent pain, trauma and broken restorations. Outside clinic hours, follow the instructions on our emergency line message.",
  },
  {
    q: "Can you help with insurance and payment plans?",
    a: "Our front desk reviews insurance coverage and flexible payment options during your consultation, so there are no surprises about costs.",
  },
];

/* ------------------------------------------------------------------ */
/*  Clinic tour                                                        */
/* ------------------------------------------------------------------ */

export const TOUR_SCENES = [
  { label: "Reception", title: "A warm, unhurried welcome", image: px(6193194, 1400, 1000) },
  { label: "Treatment Room", title: "Calm, precise treatment suites", image: px(3881468, 1400, 1000) },
  { label: "Equipment", title: "Modern dental equipment", image: px(7789651, 1400, 1000) },
  { label: "Interior", title: "Designed for comfort", image: px(6193192, 1400, 1000) },
];
