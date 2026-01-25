/**
 * Données du CV / profil – Baklioun ESSAID
 * Toutes les données affichées dans le portfolio proviennent d’ici.
 */

export default {
  hero: {
    name: 'Baklioun ESSAID',
    role: 'Développeur Web',
    tagline: 'Software Engineer combining analytical thinking and a strong mathematical mindset to turn complex problems into scalable solutions that reduce costs, improve performance, and deliver measurable business value.',
  },
  about: {
    summary: 'Software Engineer and Backend Web Developer with a strong analytical and mathematical mindset. Experienced in building scalable, efficient, and maintainable web applications using modern backend technologies. Skilled in API development, database design, and system architecture, with a focus on delivering high-impact solutions that improve performance, reduce costs, and create real business value. Proficient in AI-assisted development to accelerate delivery while maintaining code quality and reliability.',
    highlights: [],
  },
  contact: {
    email: 'bakliounessaid25@gmail.com',
    phone: '+33753479349',
    location: 'Paris',
    linkedin: 'https://www.linkedin.com/in/baklioun-essaid',
    github: 'https://github.com/baklioun-essaid',
    cv: 'https://drive.google.com/file/d/1w2ZsGJageqwimhxGTCn06nEt26eoUitJ/view?usp=sharing',
  },
  skills: {
    backend: ['Laravel', 'CodeIgniter', 'PHP', 'API REST', 'Livewire'],
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
    {
      id: 'delivery-platform',
      title: 'Plateforme de livraison',
      description: 'Plateforme de livraison pour le marché algérien : backend Laravel & Livewire, applis Flutter pour livreurs et transporteurs.',
      fullDescription: 'I worked on the development of a comprehensive delivery platform tailored for the Algerian market, including two mobile applications for delivery personnel and transporters. The platform allows businesses to manage deliveries efficiently, track orders in real-time, and integrate with e-commerce websites for seamless order fulfillment. The system was developed using Laravel and Livewire for the backend and Flutter for the mobile applications, enabling a cross-platform, responsive, and performant solution. Key features include: delivery management (assign, track, and optimize delivery routes); transporter app for drivers to receive orders, update status, and communicate in real-time; integration with e-commerce platforms to automatically sync orders; and support for multiple delivery solutions, allowing collaboration with other logistics providers. From a business perspective, the platform streamlines operations, reduces delivery errors, and improves customer satisfaction. This project demonstrates my ability to develop full-stack systems, integrate mobile and web solutions, and adapt platforms to local logistical constraints while providing measurable operational improvements.',
      image: '/images/delivery-platform.png',
      images: ['/images/delivery-platform.png'],
      technologies: ['Laravel', 'Livewire', 'Flutter', 'API REST', 'MySQL'],
    },
    {
      id: 'alluqat',
      title: 'Alluqat',
      description: 'Plateforme Lost & Found pour signaler et retrouver objets, animaux ou argent. Laravel & Livewire.',
      fullDescription: 'I developed Alluqat, a comprehensive Lost & Found platform designed to help people report and recover lost items, animals, or money. The platform allows users to: report lost items or animals with details, photos, and location; browse found items and connect with the owners; track the status of their reports; and communicate securely with the person who found or lost the item. The project was built using Laravel and Livewire, enabling a dynamic, reactive interface that works smoothly without full page reloads. Key features include: user-friendly dashboard for reporting lost or found items; categorization for different item types (animals, money, personal belongings, electronics); search and filter functionality to help users quickly find relevant reports; notification system for updates and matching items; and secure communication between users. From a community perspective, the platform helps people recover lost belongings, connects finders with owners efficiently, and reduces the stress and time lost when items go missing. This project demonstrates my ability to build user-focused applications, implement reactive and maintainable interfaces, and create meaningful solutions with Laravel and Livewire.',
      image: '/images/alluqat.png',
      images: ['/images/alluqat.png'],
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
