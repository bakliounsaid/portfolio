/**
 * Données du CV / profil – Baklioun ESSAID
 * Toutes les données affichées dans le portfolio proviennent d’ici.
 */

export default {
  hero: {
    name: 'Baklioun ESSAID',
    role: 'Développeur Web',
    tagline: 'I am a web developer with a mathematical vision. I design performant and scalable solutions to help you reduce costs and improve performance.',
  },
  about: {
    summary: 'I am a software engineer and web developer with a mathematical and analytical vision. I model your complex problems, develop APIs and scalable systems using Laravel, PHP, and optimized databases. If you are seeking reliable, performant, and cost-effective solutions built with rigor and optimization, I can help you transform your technical challenges into competitive advantages.',
    highlights: [],
  },
  contact: {
    email: 'bakliounessaid25@gmail.com',
    phone: '+33753479349',
    location: 'Paris',
    linkedin: 'https://www.linkedin.com/in/baklioun-essaid',
    github: 'https://github.com/baklioun-essaid',
    cv: 'https://drive.google.com/file/d/1bwxwhTHEzcawU5g73jAyGizSvDaGANyC/view?usp=drive_link',
  },
  skills: {
    backend: ['Java', 'Spring Boot', 'Laravel', 'CodeIgniter', 'PHP', 'API REST', 'Livewire'],
    databases: ['MySQL', 'PostgreSQL', 'SQLite'],
    tools: ['Git', 'Docker', 'Déploiement & maintenance', 'Sécurité & performance'],
    ai: ['LLMs', 'Outils d\'IA pour la conception et l\'optimisation'],
  },
  experience: [
    {
      title: 'Développeur web',
      company: 'Autoentrepreneur',
      period: '2024 – 2025',
      location: 'Algérie',
      points: [
        'Développement d\'applications web en freelance avec une spécialisation Laravel.',
        'Réalisation de projets back-end : conception, développement, déploiement.',
        'Création d\'API sécurisées et maintenance technique.',
      ],
    },
    {
      title: 'Développeur Back-end',
      company: 'FB-Technologies',
      period: '2021 – 2024',
      location: 'Algérie',
      points: [
        'Développement et maintenance d\'applications web pour des clients de FB.',
        'Laravel, Livewire, architectures MVC, POO, APIs REST.',
        'Gestion de bases de données relationnelles dans un environnement agile.',
      ],
    },
    {
      title: 'Stagiaire Développeur Web',
      company: 'CDTA',
      period: '2019',
      location: 'Algérie',
      points: [
        'Développement d\'applications web dynamiques.',
        'Interfaces avec Laravel, HTML, CSS, Bootstrap4.',
        'Application de visioconférence temps réel multi-utilisateurs (WebRTC, Node.js, CodeIgniter, MySQL, Ajax).',
      ],
    },
    {
      title: 'Enseignant informatique',
      company: 'Collège',
      period: '2019',
      location: 'Algérie',
      points: [
        'Enseignement de l\'informatique bureautique au cycle moyen.',
        'Initiation Word, Excel, PowerPoint.',
      ],
    },
  ],
  projects: [
    {
      id: 'correxia',
      title: 'Correxia',
      description: 'Plateforme de correction automatique des copies d\'examens pour les matières scientifiques, avec OCR et IA. Python & Next.js.',
      fullDescription: 'I developed Correxia, an AI-assisted platform for science teachers to automatically correct handwritten exam papers. The system uses OCR to read students\' handwritten answers, then analyzes them against the teacher\'s grading rubric while keeping the teacher in control of final validation. Built with a Python backend and a Next.js frontend, the platform helps educators save significant time on grading while maintaining accuracy and pedagogical oversight. Key features include: upload and processing of handwritten exam sheets via OCR; rubric-based automated analysis for scientific subjects; teacher review workflow with final validation and decision; and a modern, responsive interface for schools and educators. This project demonstrates my ability to combine AI/OCR technologies with full-stack development to solve real educational challenges.',
      image: '/images/correxia.png',
      images: ['/images/correxia.png'],
      technologies: ['Python', 'Next.js', 'OCR', 'IA'],
    },
    {
      id: 'nft-landing',
      title: 'NFT Landing',
      description: 'Site vitrine pour l\'exposition d\'une œuvre d\'art numérique, avec mint NFT. Next.js.',
      fullDescription: 'I designed and developed NFT Landing, an elegant showcase website built with Next.js to present and exhibit a digital artwork. The site offers an immersive, premium experience with a dark aesthetic and gold accents, guiding visitors through the artwork\'s story and enabling NFT minting. Key features include: a refined landing page with hero section and artistic messaging; navigation for story and contact; multilingual support (FR/EN); and a Mint call-to-action for acquiring the digital artwork. This project demonstrates my ability to create visually striking front-end experiences with Next.js, tailored to the art and NFT space.',
      image: '/images/nft-landing.png',
      images: ['/images/nft-landing.png'],
      technologies: ['Next.js', 'React', 'NFT'],
    },
    {
      id: 'curtain-rdv',
      title: 'Application rideaux & RDV',
      description: 'Prise de rendez-vous en ligne et e-commerce pour une entreprise de rideaux. Laravel & Livewire.',
      fullDescription: 'I worked on the design and development of a full-featured appointment booking and e-commerce web application for a curtain installation company. The platform allows customers to schedule installation appointments online, browse available curtain products, and purchase items directly through the application. The system was built using Laravel and Livewire, enabling a dynamic, reactive user experience with real-time interactions and minimal page reloads. Beyond core booking and sales features, I implemented order management workflows, customer data handling, and admin-side tools to help the business manage appointments, products, and orders efficiently. I also integrated local delivery solutions in Algeria, ensuring that online purchases could be shipped reliably while respecting local logistics constraints and payment workflows. From a business perspective, this solution helped the company automate manual processes, reduce scheduling errors, expand its sales channels, and offer a modern digital experience to its customers. This project demonstrates my ability to analyze real-world business needs, design scalable backend-driven systems, and deliver practical, high-impact solutions using modern web technologies.',
      image: '/images/curtain-app.png',
      images: ['/images/curtain-app.png', '/images/curtain-app-rdv.png', '/images/curtain-app-products.png'],
      technologies: ['Laravel', 'Livewire', 'MySQL'],
    },
    {
      id: 'football-club',
      title: 'Football Club',
      description: 'Plateforme de gestion pour club de football : joueurs, entraînements, matchs. Laravel, Livewire, PHP.',
      fullDescription: 'I worked on the development of a comprehensive management platform for a football team, designed to centralize and manage all club-related information. The platform enables staff members to manage players, organize training sessions, schedule matches, and track all essential data related to the club\'s activities in one centralized system. The solution was developed using Laravel, Livewire, and PHP, allowing real-time interactions and a smooth user experience for coaches and administrators without full page reloads. Key features include player profiles, training and attendance management, match scheduling, and administrative tools to ensure accurate and up-to-date information across the club. From an operational standpoint, the platform helps the coaching and management staff reduce manual work, improve organization, and gain better visibility into player development and team performance. This project highlights my ability to analyze domain-specific needs, design structured backend systems, and build practical management tools that support real-world sports operations.',
      image: '/images/football-club.png',
      images: ['/images/football-club.png'],
      technologies: ['Laravel', 'Livewire', 'PHP', 'MySQL'],
    },
  ],
  education: [
    {
      title: '4e Année Programme Grande École',
      school: 'Hetic',
      period: 'Depuis octobre 2025',
      location: 'France',
    },
    {
      title: 'Mastère en Génie Logiciel',
      school: 'Université de Boumerdès',
      period: '2015 – 2019',
      location: 'Algérie',
    },
  ],
  interests: [
    { label: 'Teaching & Math', description: 'I love sharing my knowledge and helping others understand complex concepts.' },
    { label: 'Creating Hope', description: 'I enjoy motivating and inspiring people to achieve their goals.' },
    { label: 'Animation, presentation & public speaking', description: 'I enjoy facilitating sessions, designing presentations, and public speaking to share ideas clearly.' },
  ],
  languages: ['Arabe', 'Anglais', 'Français'],
}
