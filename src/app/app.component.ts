import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Service = { icon: string; title: string; text: string };
type Post = {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
  categoryBg: string;
  categoryColor: string;
  featured?: boolean;
  readTime?: string;
  author?: string;
};
const services: Service[] = [
  ['⌘', 'Web Development', 'Modern, responsive and scalable websites.'],
  [
    '▣',
    'Mobile App Development',
    'Android & iOS applications for your business.',
  ],
  [
    '</>',
    'Software Development',
    'Custom software solutions tailored to your needs.',
  ],
  ['✦', 'UI/UX Design', 'Modern, intuitive and engaging user experience design.'],
  [
    '⚙',
    'Automation Solutions',
    'Automate repetitive tasks and improve efficiency.',
  ],
  [
    '♟',
    'IT Consulting',
    'Strategic technology advice for your business growth.',
  ],
].map(([icon, title, text]) => ({ icon, title, text }));
const posts: Post[] = [
  {
    id: 'tech-changing-small-businesses',
    title: 'How Technology is Changing Small Businesses',
    date: 'Aug 14, 2025',
    category: 'Technology',
    categoryBg: '#eff6ff',
    categoryColor: '#2563eb',
    featured: true,
    readTime: '6 min read',
    author: 'Build4Big Team',
    image:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
    excerpt:
      'Explore how modern technology is helping small businesses work smarter, reach more customers and create new opportunities.',
  },
  {
    id: 'ai-everyday-work',
    title: 'Practical Ways to Use AI in Everyday Work',
    date: 'Aug 10, 2025',
    category: 'AI & Automation',
    categoryBg: '#dbeafe',
    categoryColor: '#1d4ed8',
    readTime: '4 min read',
    author: 'Build4Big Team',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Discover actionable strategies for integrating AI tools into daily workflows to boost efficiency.',
  },
  {
    id: 'web-trends-2026',
    title: 'Top Web Development Trends in 2026',
    date: 'Aug 08, 2025',
    category: 'Web Development',
    categoryBg: '#ede9fe',
    categoryColor: '#6d28d9',
    readTime: '6 min read',
    author: 'Build4Big Team',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Next-generation frameworks, edge rendering, and responsive design systems dominating web development.',
  },
  {
    id: 'turning-ideas-into-products',
    title: 'Turning Ideas into Real Products',
    date: 'Aug 05, 2025',
    category: 'Business',
    categoryBg: '#fef3c7',
    categoryColor: '#b45309',
    readTime: '4 min read',
    author: 'Build4Big Team',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'A step-by-step roadmap from initial conceptualization and UX wireframing to launching a viable software product.',
  },
  {
    id: 'mobile-apps-business-growth',
    title: 'Why Mobile Apps are Important for Business Growth',
    date: 'Aug 03, 2025',
    category: 'Mobile & Apps',
    categoryBg: '#fce7f3',
    categoryColor: '#be185d',
    readTime: '5 min read',
    author: 'Build4Big Team',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Why mobile-first presence is essential for client retention, direct notifications, and brand loyalty.',
  },
  {
    id: 'turn-idea-successful-product',
    title: 'How to Turn Your Idea into a Successful Product',
    date: 'Jul 28, 2025',
    category: 'Business',
    categoryBg: '#fef3c7',
    categoryColor: '#b45309',
    readTime: '5 min read',
    author: 'Build4Big Team',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Validation techniques, iterative prototyping, and building lean feedback loops for sustainable startup growth.',
  },
  {
    id: 'ui-ux-digital-success',
    title: 'The Role of UI/UX in Digital Success',
    date: 'Jul 20, 2025',
    category: 'Web Development',
    categoryBg: '#ede9fe',
    categoryColor: '#6d28d9',
    readTime: '6 min read',
    author: 'Build4Big Team',
    image:
      'https://images.unsplash.com/photo-1581291518655-9523b932edd8?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Intuitive navigation, frictionless checkout flows, and clean visual hierarchies directly drive conversions.',
  },
  {
    id: 'real-world-ai-in-action',
    title: '5 Real-World Examples of AI in Action',
    date: 'Jul 15, 2025',
    category: 'AI & Automation',
    categoryBg: '#dbeafe',
    categoryColor: '#1d4ed8',
    readTime: '4 min read',
    author: 'Build4Big Team',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'From automated customer response bots to intelligent predictive analytics in manufacturing and retail.',
  },
];
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `<header [class.homebar]="home">
    <a routerLink="/" class="logo header-logo" aria-label="Build4Big home"><span class="brand-image"><img src="build4big-logo.png" alt="Build4Big" /></span><span>Build4Big</span></a
    ><button class="menu" (click)="open.set(!open())">
      {{ open() ? '×' : '☰' }}
    </button>
    <nav [class.show]="open()">
      <a
        routerLink="/"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        (click)="open.set(false)"
        >Home</a
      ><a
        routerLink="/services"
        routerLinkActive="active"
        (click)="open.set(false)"
        >Services</a
      ><a routerLink="/blog" routerLinkActive="active" (click)="open.set(false)"
        >Blog</a
      ><a
        routerLink="/about"
        routerLinkActive="active"
        (click)="open.set(false)"
        >About</a
      ><a
        routerLink="/contact"
        routerLinkActive="active"
        (click)="open.set(false)"
        >Contact</a
      >
    </nav>
    <a routerLink="/contact" class="start">Get Started</a>
  </header>`,
  styles: `
    header {
      height: 78px;
      display: flex;
      align-items: center;
      gap: 30px;
      max-width: 1180px;
      margin: auto;
      padding: 0 24px;
      background: #fff;
    }
    .logo {
      font-weight: 800;
      font-family: Manrope;
      font-size: 18px;
    }
    .logo b {
      color: #3159f5;
    }
    nav {
      display: flex;
      gap: 23px;
      margin-left: auto;
      font-size: 12px;
      font-weight: 600;
    }
    nav a {
      padding: 8px 0;
      border-bottom: 2px solid transparent;
      transition: color 0.2s ease, border-color 0.2s ease;
    }
    nav a:hover { color: #3159f5; }
    .active {
      color: #3159f5;
      border-color: #3159f5 !important;
    }
    .start {
      font-size: 12px;
      font-weight: 700;
      background: #3159f5;
      color: white;
      padding: 11px 16px;
      border-radius: 10px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .start:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px #3159f540;
    }
    .homebar {
      background: transparent;
      color: white;
    }
    .menu {
      display: none;
      background: none;
      border: 0;
      font-size: 24px;
      color: inherit;
      margin-left: auto;
    }
    @media (max-width: 760px) {
      header {
        height: 68px;
        padding: 0 18px;
      }
      .start {
        display: none;
      }
      .menu {
        display: block;
      }
      nav {
        display: none;
        position: absolute;
        z-index: 4;
        top: 62px;
        left: 16px;
        right: 16px;
        margin: 0;
        padding: 15px;
        background: #fff;
        color: #080f2b;
        border-radius: 14px;
        box-shadow: 0 18px 40px #0002;
        flex-direction: column;
        gap: 3px;
      }
      nav.show {
        display: flex;
      }
      .homebar nav {
        color: #080f2b;
      }
    }
  `,
})
export class HeaderComponent {
  home = false;
  open = signal(false);
}
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `<footer>
    <div class="foot container">
      <section>
        <a class="logo" routerLink="/"><img src="build4big-logo.png" alt="Build4Big" /> Build4Big</a>
        <h2>Innovate Today<br />Build a Better Tomorrow</h2>
        <p>
          A startup software company helping businesses grow with modern
          technology and innovative solutions.
        </p>
        <div class="social">in　◎　𝕏　▶</div>
      </section>
      <section>
        <h4>Quick Links</h4>
        <nav class="foot-nav">
          <a routerLink="/">Home</a>
          <a routerLink="/about">About Us</a>
          <a routerLink="/services">Services</a>
          <a routerLink="/blog">Blog</a>
          <a routerLink="/contact">Contact</a>
        </nav>
      </section>
      <section>
        <h4>Our Services</h4>
        <nav class="foot-nav">
          <a routerLink="/services">Web Development</a>
          <a routerLink="/services">Mobile Apps</a>
          <a routerLink="/services">Software Development</a>
          <a routerLink="/services">UI/UX Design</a>
          <a routerLink="/services">Automation</a>
          <a routerLink="/services">IT Consulting</a>
        </nav>
      </section>
      <section>
        <h4>Contact Info</h4>
        <p>⌖ Plot No. 2, Mahatma Gandhi 11th St, Thirunagar, Madurai</p>
        <p>☎ +91 96777 45205</p>
        <p>◉ +91 70106 68560</p>
        <p>✉ info@build4big.com</p>
      </section>
    </div>
    <div class="copyright container">
      © 2026 Build4Big. All rights reserved.
      <span>Privacy Policy　 Terms & Conditions</span>
    </div>
  </footer>`,
  styles: `
    footer {
      background: #080f2b;
      color: #eef1ff;
      padding-top: 64px;
    }
    .foot {
      display: grid;
      grid-template-columns: 2fr 1fr 1.3fr 1.3fr;
      gap: 40px;
    }
    .logo {
      font: 800 18px Manrope;
    }
    .logo b,
    .social {
      color: #6681ff;
    }
    .foot h2 {
      font-size: 22px;
      line-height: 1.35;
      margin: 20px 0 12px;
    }
    .foot h4 {
      margin: 3px 0 18px;
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.3px;
    }
    .foot-nav {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .foot p,
    .foot-nav a,
    .foot section > a {
      display: block;
      color: #b9c0dc;
      font-size: 13px;
      line-height: 1.6;
      margin: 0;
      width: fit-content;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .foot-nav a:hover,
    .foot section > a:hover { color: #ffffff; }
    .social {
      margin-top: 20px;
      font-size: 18px;
    }
    .copyright {
      border-top: 1px solid #ffffff17;
      margin-top: 48px;
      padding: 19px 24px;
      color: #aab2d3;
      font-size: 11px;
    }
    .copyright span {
      float: right;
    }
    @media (max-width: 760px) {
      .foot {
        grid-template-columns: 1fr 1fr;
      }
      .foot section:first-child {
        grid-column: span 2;
      }
      .copyright span {
        float: none;
        display: block;
        margin-top: 8px;
      }
    }
  `,
})
export class FooterComponent {}
@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, HeaderComponent],
  template: `<div class="hero">
    <app-header></app-header>
    <main class="hero-body container">
      <div class="copy">
        <div class="badge">● Innovate　•　Build　•　Grow</div>
        <h1>Transforming<br />Ideas into <em>Digital Reality</em></h1>
        <p>
          We are a startup software company helping businesses build modern
          digital products, websites, mobile apps, AI solutions and automation
          systems.
        </p>
        <div class="actions">
          <a routerLink="/contact" class="btn">Get Started　→</a
          ><button class="btn ghost">▷　Watch Video</button>
        </div>
      </div>
      <div class="product">
        <div class="orbit"></div>
        <div class="screen">
          <span>Build Smarter</span><b>Grow Faster</b>
          <div class="chart">▂ ▅ ▇</div>
        </div>
        <div class="mini top">
          ◈　Analytics<br /><small>+28.4% this month</small>
        </div>
        <div class="mini side">✦<br /><small>Smart automation</small></div>
      </div>
    </main>
    <div class="stats container">
      <div *ngFor="let s of stats">
        <b>{{ s[0] }}</b
        ><span>{{ s[1] }}</span>
      </div>
    </div>
  </div>`,
  styles: `
    :host { display: block; animation: pageEnter 0.42s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes pageEnter { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    .hero {
      min-height: 650px;
      overflow: hidden;
      background: radial-gradient(
        circle at 73% 55%,
        #243e9f 0,
        #101c52 22%,
        #080f2b 57%
      );
      color: white;
    }
    .hero-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 490px;
      align-items: center;
    }
    .badge {
      font-size: 10px;
      color: #b9c9ff;
      background: #ffffff12;
      border-radius: 16px;
      padding: 7px 11px;
      width: max-content;
    }
    .copy h1 {
      font-size: 52px;
      line-height: 1.13;
      margin: 17px 0;
    }
    .copy em {
      font-style: normal;
      color: #4e6dff;
    }
    .copy p {
      font-size: 14px;
      line-height: 1.7;
      max-width: 475px;
      color: #d4daf2;
    }
    .actions {
      display: flex;
      gap: 13px;
      margin-top: 28px;
    }
    .product {
      height: 405px;
      position: relative;
    }
    .orbit {
      position: absolute;
      inset: 15px 10px 0;
      border: 1px solid #899fff2e;
      border-radius: 50%;
      transform: rotate(-25deg);
    }
    .screen {
      position: absolute;
      right: 35px;
      top: 133px;
      width: 275px;
      height: 185px;
      transform: rotate(-8deg);
      padding: 40px 30px;
      border-radius: 15px;
      background: linear-gradient(145deg, #f9faff, #d7ddff);
      box-shadow: -25px 25px 50px #02061688;
      color: #0a1130;
    }
    .screen span,
    .screen b {
      display: block;
      font-size: 15px;
    }
    .screen b {
      margin-top: 6px;
    }
    .chart {
      font-size: 42px;
      color: #4366fa;
      margin-top: 15px;
      letter-spacing: 8px;
    }
    .mini {
      position: absolute;
      background: #15245caa;
      backdrop-filter: blur(9px);
      border: 1px solid #6a81e466;
      border-radius: 12px;
      padding: 13px;
      font-size: 13px;
    }
    .mini small {
      color: #b7c5fb;
    }
    .top {
      right: 245px;
      top: 70px;
    }
    .side {
      right: 7px;
      bottom: 55px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding-bottom: 28px;
    }
    .stats b,
    .stats span {
      display: block;
    }
    .stats b {
      font: 800 25px Manrope;
    }
    .stats span {
      font-size: 11px;
      color: #c5cce6;
    }
    @media (max-width: 760px) {
      .hero {
        min-height: auto;
      }
      .hero-body {
        grid-template-columns: 1fr;
        padding-top: 44px;
      }
      .copy h1 {
        font-size: 40px;
      }
      .product {
        height: 310px;
        transform: scale(0.85);
        transform-origin: center;
      }
      .stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        padding-bottom: 35px;
      }
    }
    /* Hover + entrance animations */
    .copy .badge { animation: fadeUp 0.5s 0.05s cubic-bezier(0.22,1,0.36,1) both; }
    .copy h1     { animation: fadeUp 0.6s 0.12s cubic-bezier(0.22,1,0.36,1) both; }
    .copy p      { animation: fadeUp 0.55s 0.22s cubic-bezier(0.22,1,0.36,1) both; }
    .actions     { animation: fadeUp 0.5s 0.32s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
    .mini { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .mini:hover { transform: translateY(-4px); box-shadow: 0 12px 28px #06082055; }
    .orbit { animation: orbit-spin 20s linear infinite; }
    @keyframes orbit-spin { to { transform: rotate(360deg); } }
    .stats > div { transition: transform 0.2s ease; }
    .stats > div:hover { transform: translateY(-3px); }
    @media (prefers-reduced-motion: reduce) {
      .copy .badge,.copy h1,.copy p,.actions { animation: none; opacity: 1; }
      .mini, .orbit, .stats > div { animation: none; transition: none; }
    }
  `,
})
export class HomeComponent {
  stats = [
    ['50+', 'Happy Clients'],
    ['100+', 'Projects Delivered'],
    ['3+', 'Years of Vision'],
    ['24/7', 'Support'],
  ];
}
interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  iconType: 'cloud' | 'mobile' | 'web' | 'ai' | 'custom' | 'consulting' | 'design';
  bubbleBg: string;
  glowColor: string;
}

const serviceShowcaseList: ServiceCardItem[] = [
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description: 'Scalable, secure, and reliable cloud infrastructure.',
    iconType: 'cloud',
    bubbleBg: 'linear-gradient(135deg, #60a5fa, #2563eb)',
    glowColor: 'rgba(37, 99, 235, 0.35)',
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Modern mobile applications for Android & iOS.',
    iconType: 'mobile',
    bubbleBg: 'linear-gradient(135deg, #c084fc, #7c3aed)',
    glowColor: 'rgba(124, 58, 237, 0.35)',
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'High-performance websites and web applications.',
    iconType: 'web',
    bubbleBg: 'linear-gradient(135deg, #38bdf8, #2563eb)',
    glowColor: 'rgba(37, 99, 235, 0.45)',
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    description: 'Intelligent solutions to automate and grow.',
    iconType: 'ai',
    bubbleBg: 'linear-gradient(135deg, #f472b6, #9333ea)',
    glowColor: 'rgba(147, 51, 234, 0.35)',
  },
  {
    id: 'custom',
    title: 'Custom Software Solutions',
    description: 'Tailored software to fit your business needs.',
    iconType: 'custom',
    bubbleBg: 'linear-gradient(135deg, #34d399, #059669)',
    glowColor: 'rgba(5, 150, 105, 0.35)',
  },
  {
    id: 'consulting',
    title: 'Digital Consulting',
    description: 'Strategic guidance for your digital transformation.',
    iconType: 'consulting',
    bubbleBg: 'linear-gradient(135deg, #fbbf24, #ea580c)',
    glowColor: 'rgba(234, 88, 12, 0.35)',
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description: 'Modern, intuitive and engaging user experience design.',
    iconType: 'design',
    bubbleBg: 'linear-gradient(135deg, #818cf8, #4f46e5)',
    glowColor: 'rgba(79, 70, 229, 0.35)',
  },
];

const servicePillars = [
  {
    iconType: 'approach',
    title: 'Innovative Approach',
    subtitle: 'Fresh ideas, modern solutions',
  },
  {
    iconType: 'quality',
    title: 'Quality Driven',
    subtitle: 'Focused on long-term value',
  },
  {
    iconType: 'client',
    title: 'Client-Centric',
    subtitle: 'Your goals, our priority',
  },
  {
    iconType: 'future',
    title: 'Future Ready',
    subtitle: "Technology for what's next",
  },
];

@Component({
  selector: 'app-services-showcase',
  imports: [CommonModule, RouterLink],
  template: `
    <div #showcaseRoot class="services-showcase" [class.is-visible]="isVisible()">
      <!-- Ambient decorative orbs & background elements -->
      <div class="ambient-orb orb-tl" aria-hidden="true"></div>
      <div class="ambient-orb orb-tr" aria-hidden="true"></div>
      <div class="ambient-orb orb-bl" aria-hidden="true"></div>
      <div class="ambient-orb orb-br" aria-hidden="true"></div>
      <div class="mesh-network" aria-hidden="true"></div>

      <!-- Handwritten annotations & whimsical arrows -->
      <div class="scribble scribble-tl" aria-hidden="true">
        <div class="scribble-box">
          <span class="scribble-text">Your<br />Vision</span>
          <svg class="scribble-arrow" viewBox="0 0 70 70" fill="none">
            <path d="M54 12 C36 10 18 20 18 34 C18 44 28 48 36 40 C42 32 36 18 22 24 C10 30 8 48 6 62" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 52 L6 64 L16 58" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="scribble scribble-tr" aria-hidden="true">
        <div class="scribble-box">
          <span class="scribble-text">Ideas<br />To Impact</span>
          <svg class="scribble-arrow" viewBox="0 0 85 35" fill="none">
            <path d="M8 24 Q45 30 74 12" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M60 7 L76 12 L65 22" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="scribble scribble-br" aria-hidden="true">
        <div class="scribble-box">
          <span class="scribble-text">Solutions<br />For Tomorrow</span>
          <svg class="scribble-arrow" viewBox="0 0 65 65" fill="none">
            <path d="M12 52 Q35 40 52 14" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M38 12 L54 12 L54 28" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Section Header -->
      <div class="showcase-head container">
        <div class="services-pill-badge">OUR SERVICES</div>
        <h2 class="showcase-title">Complete <span class="gradient-text">Digital Solutions</span></h2>
        <p class="showcase-sub">
          We offer a wide range of technology services to help businesses turn ideas into powerful digital experiences.
        </p>
      </div>

      <!-- 3D Coverflow Carousel Stage -->
      <div
        class="stage-container"
        (mouseenter)="stopAutoplay()"
        (mouseleave)="startAutoplay()"
        (touchstart)="onTouchStart($event)"
        (touchend)="onTouchEnd($event)"
      >
        <!-- Nav button left -->
        <button class="nav-arrow nav-prev" (click)="prev()" aria-label="Previous Service">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <!-- Coverflow track -->
        <div class="coverflow-stage">
          <article
            *ngFor="let card of servicesList; let i = index"
            class="service-card"
            [class.is-active]="isCenter(i)"
            [ngStyle]="getCardStyle(i)"
            (click)="selectCard(i)"
            [attr.aria-selected]="isCenter(i)"
          >
            <!-- Card 3D Bubble Icon -->
            <div class="icon-bubble" [style.background]="card.bubbleBg" [style.box-shadow]="'0 14px 30px ' + card.glowColor">
              <ng-container [ngSwitch]="card.iconType">
                <!-- Cloud -->
                <svg *ngSwitchCase="'cloud'" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                </svg>
                <!-- Mobile -->
                <svg *ngSwitchCase="'mobile'" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="14" height="20" x="5" y="2" rx="3" ry="3"></rect>
                  <path d="M12 18h.01"></path>
                </svg>
                <!-- Web (3D Glass Monitor) -->
                <div *ngSwitchCase="'web'" class="web-monitor-glyph">
                  <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                    <line x1="8" x2="16" y1="21" y2="21"></line>
                    <line x1="12" x2="12" y1="17" y2="21"></line>
                    <polyline points="7 9 12 13 17 9" stroke-width="2"></polyline>
                  </svg>
                </div>
                <!-- AI & Automation -->
                <svg *ngSwitchCase="'ai'" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.3 4.7 3.2 6 .3.2.5.6.5 1v2c0 .6.4 1 1 1h4.6c.6 0 1-.4 1-1v-2c0-.4.2-.8.5-1A7 7 0 0 0 12 2z"></path>
                  <path d="M9 22h6"></path>
                  <path d="M10 9a2 2 0 1 1 4 0c0 1.5-2 1.5-2 3"></path>
                </svg>
                <!-- Custom Software -->
                <svg *ngSwitchCase="'custom'" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <!-- Digital Consulting -->
                <svg *ngSwitchCase="'consulting'" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                  <circle cx="19" cy="9" r="1.5" fill="#fff"></circle>
                </svg>
                <!-- UI/UX Design -->
                <svg *ngSwitchCase="'design'" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="13.5" cy="6.5" r=".5" fill="#fff"></circle>
                  <circle cx="17.5" cy="10.5" r=".5" fill="#fff"></circle>
                  <circle cx="8.5" cy="7.5" r=".5" fill="#fff"></circle>
                  <circle cx="6.5" cy="12.5" r=".5" fill="#fff"></circle>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"></path>
                </svg>
              </ng-container>
            </div>

            <!-- Card Content -->
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>

            <!-- Card Action: "Learn More →" on Center, circle arrow on sides -->
            <div class="card-action">
              <a *ngIf="isCenter(i)" routerLink="/contact" class="btn-learn-more">
                Learn More <span>→</span>
              </a>
              <span *ngIf="!isCenter(i)" class="btn-circle-arrow">→</span>
            </div>
          </article>
        </div>

        <!-- Nav button right -->
        <button class="nav-arrow nav-next" (click)="next()" aria-label="Next Service">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <!-- Pagination Indicators -->
      <div class="carousel-indicators" role="tablist">
        <button
          *ngFor="let s of servicesList; let i = index"
          class="indicator-dot"
          [class.active]="i === activeIndex()"
          (click)="goTo(i)"
          [attr.aria-label]="'Go to ' + s.title"
        ></button>
      </div>

      <!-- Bottom Feature Pillars Bar -->
      <div class="pillars-container container">
        <div class="pillars-strip">
          <div class="pillar-item" *ngFor="let p of pillars">
            <div class="pillar-icon-box">
              <ng-container [ngSwitch]="p.iconType">
                <!-- Lightning -->
                <svg *ngSwitchCase="'approach'" viewBox="0 0 24 24" width="22" height="22" fill="#2563eb" stroke="#2563eb" stroke-width="1.2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
                <!-- Shield -->
                <svg *ngSwitchCase="'quality'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <!-- Client / People -->
                <svg *ngSwitchCase="'client'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <!-- Future / Rocket -->
                <svg *ngSwitchCase="'future'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
              </ng-container>
            </div>
            <div class="pillar-text">
              <h4>{{ p.title }}</h4>
              <p>{{ p.subtitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
    .services-showcase {
      position: relative;
      overflow: hidden;
      padding: 72px 16px 88px;
      background: radial-gradient(circle at 18% 20%, #eef5ff 0%, transparent 42%),
                  radial-gradient(circle at 82% 80%, #f5edff 0%, transparent 45%),
                  #f8faff;
      color: #080f2b;
    }

    /* Ambient decorative orbs */
    .ambient-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
    }
    .orb-tl {
      top: 60px;
      left: 18%;
      width: 20px;
      height: 20px;
      background: #3b82f6;
      opacity: 0.7;
      box-shadow: 0 0 25px #3b82f6;
      animation: floatOrb 6s ease-in-out infinite alternate;
    }
    .orb-tr {
      top: 240px;
      right: 5%;
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, #a855f7, #6366f1);
      opacity: 0.6;
      box-shadow: 0 0 35px #a855f7;
      animation: floatOrb 7s 1s ease-in-out infinite alternate-reverse;
    }
    .orb-bl {
      bottom: 230px;
      left: 3%;
      width: 12px;
      height: 12px;
      background: #8b5cf6;
      opacity: 0.6;
      animation: floatOrb 5s 2s ease-in-out infinite alternate;
    }
    .orb-br {
      bottom: 220px;
      right: 25%;
      width: 16px;
      height: 16px;
      background: #2563eb;
      opacity: 0.75;
      box-shadow: 0 0 20px #2563eb;
      animation: floatOrb 8s ease-in-out infinite alternate;
    }
    @keyframes floatOrb {
      0% { transform: translateY(0) scale(1); }
      100% { transform: translateY(-16px) scale(1.15); }
    }

    /* Handwritten scribble annotations */
    .scribble {
      position: absolute;
      z-index: 4;
      pointer-events: none;
      user-select: none;
    }
    .scribble-box {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
    }
    .scribble-text {
      font-family: 'Caveat', cursive, sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: #2563eb;
      line-height: 1.05;
      white-space: nowrap;
    }
    .scribble-tl {
      top: 175px;
      left: 4%;
      transform: rotate(-14deg);
    }
    .scribble-tl .scribble-arrow {
      width: 65px;
      height: 65px;
      margin-top: -6px;
      margin-left: 30px;
    }
    .scribble-tr {
      top: 135px;
      right: 7%;
      transform: rotate(-10deg);
    }
    .scribble-tr .scribble-arrow {
      width: 82px;
      height: 32px;
      margin-top: 4px;
    }
    .scribble-br {
      bottom: 165px;
      right: 5%;
      transform: rotate(-10deg);
    }
    .scribble-br .scribble-arrow {
      width: 58px;
      height: 58px;
      margin-top: 2px;
      margin-left: 20px;
    }

    /* Showcase Head */
    .showcase-head {
      text-align: center;
      max-width: 820px;
      margin: 0 auto 30px;
      position: relative;
      z-index: 3;
    }
    .services-pill-badge {
      display: inline-flex;
      align-items: center;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #2563eb;
      background: #eef4ff;
      border: 1.5px solid #c7d8fe;
      border-radius: 9999px;
      padding: 6px 20px;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);
      margin-bottom: 14px;
    }
    .showcase-title {
      font: 800 clamp(36px, 4.4vw, 54px)/1.15 Manrope, sans-serif;
      letter-spacing: -0.04em;
      margin: 0 0 14px;
      color: #0a1128;
    }
    .gradient-text {
      background: linear-gradient(135deg, #1d68ff 0%, #8b28f8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .showcase-sub {
      font-size: clamp(14px, 1.2vw, 16px);
      color: #55617d;
      line-height: 1.65;
      max-width: 630px;
      margin: 0 auto;
    }

    /* 3D Coverflow Stage */
    .stage-container {
      position: relative;
      max-width: 1260px;
      margin: 25px auto 10px;
      min-height: 485px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .coverflow-stage {
      position: relative;
      width: 100%;
      height: 470px;
      perspective: 1200px;
      transform-style: preserve-3d;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    /* Navigation Arrows */
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: #2563eb;
      color: #fff;
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 25;
      box-shadow: 0 10px 24px rgba(37, 99, 235, 0.38);
      transition: all 0.25s ease;
    }
    .nav-arrow:hover {
      transform: translateY(-50%) scale(1.1);
      background: #1d4ed8;
      box-shadow: 0 12px 28px rgba(37, 99, 235, 0.5);
    }
    .nav-prev {
      left: 12px;
    }
    .nav-next {
      right: 12px;
    }

    /* Service Card */
    .service-card {
      position: absolute;
      width: clamp(260px, 23vw, 320px);
      min-height: 380px;
      padding: 34px 24px 28px;
      border-radius: 28px;
      background: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.95);
      box-shadow: 0 18px 45px rgba(22, 45, 96, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                  opacity 0.65s ease,
                  filter 0.65s ease,
                  box-shadow 0.65s ease;
      will-change: transform, opacity;
      user-select: none;
    }
    .service-card.is-active {
      box-shadow: 0 32px 65px -12px rgba(37, 99, 235, 0.25),
                  0 0 0 1.5px rgba(255, 255, 255, 0.95) inset;
      background: linear-gradient(180deg, #ffffff, #f7faff);
      cursor: default;
    }

    /* Icon Bubble */
    .icon-bubble {
      width: 74px;
      height: 74px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 22px;
      transition: all 0.35s ease;
    }
    .service-card.is-active .icon-bubble {
      width: 86px;
      height: 86px;
      border-radius: 28px;
      transform: translateY(-3px);
    }

    /* Card Typography */
    .service-card h3 {
      font: 800 21px/1.25 Manrope, sans-serif;
      color: #081236;
      margin: 0 0 12px;
      transition: font-size 0.3s ease;
    }
    .service-card.is-active h3 {
      font-size: 24px;
    }
    .service-card p {
      font-size: 13.5px;
      line-height: 1.6;
      color: #63708f;
      margin: 0 0 24px;
      flex-grow: 1;
      max-width: 250px;
    }

    /* Card Action Buttons */
    .card-action {
      margin-top: auto;
    }
    .btn-learn-more {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: linear-gradient(110deg, #2563eb, #3b82f6);
      color: #ffffff;
      padding: 13px 32px;
      border-radius: 9999px;
      font: 700 14px 'DM Sans', sans-serif;
      text-decoration: none;
      box-shadow: 0 10px 24px rgba(37, 99, 235, 0.38);
      transition: all 0.25s ease;
    }
    .btn-learn-more:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px rgba(37, 99, 235, 0.48);
    }
    .btn-learn-more span {
      font-size: 18px;
      transition: transform 0.2s ease;
    }
    .btn-learn-more:hover span {
      transform: translateX(3px);
    }
    .btn-circle-arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #ffffff;
      color: #2563eb;
      font-size: 19px;
      font-weight: 800;
      box-shadow: 0 6px 16px rgba(24, 60, 138, 0.12);
      border: 1px solid #eef2ff;
      transition: all 0.25s ease;
    }
    .service-card:hover .btn-circle-arrow {
      background: #2563eb;
      color: #fff;
      transform: scale(1.08);
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
    }

    /* Indicators */
    .carousel-indicators {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      margin-top: 15px;
      margin-bottom: 45px;
      position: relative;
      z-index: 5;
    }
    .indicator-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 0;
      background: #cbd5e1;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
      padding: 0;
    }
    .indicator-dot.active {
      width: 26px;
      border-radius: 9999px;
      background: #2563eb;
      box-shadow: 0 3px 10px rgba(37, 99, 235, 0.35);
    }

    /* Bottom Pillars Bar */
    .pillars-container {
      position: relative;
      z-index: 5;
    }
    .pillars-strip {
      max-width: 1140px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(220, 232, 255, 0.9);
      border-radius: 24px;
      box-shadow: 0 16px 36px rgba(25, 52, 114, 0.06);
      padding: 22px 34px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      gap: 20px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .pillars-strip:hover {
      box-shadow: 0 22px 45px rgba(25, 52, 114, 0.1);
    }
    .pillar-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 4px 10px;
    }
    .pillar-item:not(:last-child) {
      border-right: 1px solid #e3ebfa;
    }
    .pillar-icon-box {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #eff6ff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2563eb;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12);
      transition: transform 0.25s ease;
    }
    .pillar-item:hover .pillar-icon-box {
      transform: scale(1.1);
      background: #dbeafe;
    }
    .pillar-text h4 {
      font: 800 15px Manrope, sans-serif;
      color: #081236;
      margin: 0 0 3px;
    }
    .pillar-text p {
      font-size: 12px;
      color: #626e8c;
      margin: 0;
      line-height: 1.35;
    }

    /* Scroll reveal animations */
    .showcase-head, .stage-container, .carousel-indicators, .pillars-strip {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .is-visible .showcase-head {
      opacity: 1;
      transform: none;
    }
    .is-visible .stage-container {
      opacity: 1;
      transform: none;
      transition-delay: 0.12s;
    }
    .is-visible .carousel-indicators {
      opacity: 1;
      transform: none;
      transition-delay: 0.2s;
    }
    .is-visible .pillars-strip {
      opacity: 1;
      transform: none;
      transition-delay: 0.26s;
    }

    /* Responsive adjustments */
    @media (max-width: 1040px) {
      .scribble-tl { left: 1%; }
      .scribble-tr { right: 2%; }
      .scribble-br { right: 1%; }
      .pillars-strip {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        padding: 24px;
      }
      .pillar-item:nth-child(2) {
        border-right: none;
      }
    }
    @media (max-width: 768px) {
      .scribble {
        display: none;
      }
      .services-showcase {
        padding: 55px 12px 65px;
      }
      .stage-container {
        min-height: 440px;
      }
      .coverflow-stage {
        height: 430px;
      }
      .service-card {
        width: clamp(260px, 78vw, 300px);
        min-height: 350px;
        padding: 26px 18px 22px;
      }
      .nav-arrow {
        width: 40px;
        height: 40px;
      }
      .nav-prev { left: 4px; }
      .nav-next { right: 4px; }
      .pillars-strip {
        grid-template-columns: 1fr;
        gap: 14px;
        padding: 20px;
      }
      .pillar-item:not(:last-child) {
        border-right: none;
        border-bottom: 1px solid #e3ebfa;
        padding-bottom: 12px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .showcase-head, .stage-container, .carousel-indicators, .pillars-strip {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .service-card {
        transition: none !important;
      }
      .ambient-orb {
        animation: none !important;
      }
    }
  `,
})
export class ServicesShowcaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('showcaseRoot') showcaseRoot?: ElementRef<HTMLElement>;
  isVisible = signal(false);
  activeIndex = signal(2); // Starts on Web Development (index 2), matching the screenshot!
  servicesList = serviceShowcaseList;
  pillars = servicePillars;

  private autoplayTimer: any = null;
  private observer?: IntersectionObserver;
  private touchStartX = 0;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible.set(true);
          this.observer?.disconnect();
        }
      }, { threshold: 0.08 });
      if (this.showcaseRoot) this.observer.observe(this.showcaseRoot.nativeElement);
    } else {
      this.isVisible.set(true);
    }
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.observer?.disconnect();
  }

  getOffset(index: number): number {
    let offset = index - this.activeIndex();
    const total = this.servicesList.length;
    while (offset > total / 2) offset -= total;
    while (offset < -total / 2) offset += total;
    return offset;
  }

  isCenter(index: number): boolean {
    return this.getOffset(index) === 0;
  }

  getCardStyle(index: number): { [key: string]: string | number } {
    const offset = this.getOffset(index);
    let translateX = 0;
    let translateZ = 0;
    let scale = 1;
    let rotateY = 0;
    let opacity = 1;
    let zIndex = 1;
    let filter = 'none';
    let pointerEvents = 'auto';

    if (offset === 0) {
      translateX = 0;
      translateZ = 70;
      scale = 1.15;
      rotateY = 0;
      opacity = 1;
      zIndex = 12;
      filter = 'none';
    } else if (offset === -1) {
      translateX = -64;
      translateZ = 15;
      scale = 0.92;
      rotateY = 7;
      opacity = 0.93;
      zIndex = 8;
      filter = 'blur(0.3px)';
    } else if (offset === 1) {
      translateX = 64;
      translateZ = 15;
      scale = 0.92;
      rotateY = -7;
      opacity = 0.93;
      zIndex = 8;
      filter = 'blur(0.3px)';
    } else if (offset === -2) {
      translateX = -120;
      translateZ = -45;
      scale = 0.8;
      rotateY = 13;
      opacity = 0.76;
      zIndex = 5;
      filter = 'blur(0.8px)';
    } else if (offset === 2) {
      translateX = 120;
      translateZ = -45;
      scale = 0.8;
      rotateY = -13;
      opacity = 0.76;
      zIndex = 5;
      filter = 'blur(0.8px)';
    } else if (offset === -3) {
      translateX = -168;
      translateZ = -105;
      scale = 0.68;
      rotateY = 18;
      opacity = 0.45;
      zIndex = 3;
      filter = 'blur(1.6px)';
    } else if (offset === 3) {
      translateX = 168;
      translateZ = -105;
      scale = 0.68;
      rotateY = -18;
      opacity = 0.45;
      zIndex = 3;
      filter = 'blur(1.6px)';
    } else {
      translateX = offset > 0 ? 210 : -210;
      translateZ = -200;
      scale = 0.5;
      opacity = 0;
      zIndex = 1;
      filter = 'blur(3px)';
      pointerEvents = 'none';
    }

    return {
      transform: `translate3d(${translateX}%, 0, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      'z-index': zIndex,
      filter,
      'pointer-events': pointerEvents,
    };
  }

  prev(): void {
    const total = this.servicesList.length;
    this.activeIndex.update((i) => (i - 1 + total) % total);
  }

  next(): void {
    const total = this.servicesList.length;
    this.activeIndex.update((i) => (i + 1) % total);
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  selectCard(index: number): void {
    if (!this.isCenter(index)) {
      this.activeIndex.set(index);
    }
  }

  startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, 4500);
  }

  stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  onTouchStart(e: TouchEvent): void {
    this.stopAutoplay();
    if (e.changedTouches.length > 0) {
      this.touchStartX = e.changedTouches[0].screenX;
    }
  }

  onTouchEnd(e: TouchEvent): void {
    if (e.changedTouches.length > 0) {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - this.touchStartX;
      if (diff > 45) {
        this.prev();
      } else if (diff < -45) {
        this.next();
      }
    }
    this.startAutoplay();
  }
}

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent, ServicesShowcaseComponent],
  template: `
    <app-header></app-header>
    <main class="services-page-wrap">
      <app-services-showcase></app-services-showcase>
      <section class="services-cta-banner container">
        <div class="cta-inner">
          <div class="cta-copy">
            <h3>Have a project in mind?</h3>
            <p>Let's build something extraordinary together.</p>
          </div>
          <a routerLink="/contact" class="btn cta-btn">Get in Touch　→</a>
        </div>
      </section>
    </main>
    <app-footer></app-footer>
  `,
  styles: `
    .services-page-wrap {
      padding-top: 10px;
      padding-bottom: 70px;
      min-height: 80vh;
      background: #f8faff;
    }
    .services-cta-banner {
      margin-top: 45px;
      max-width: 1080px;
    }
    .cta-inner {
      background: linear-gradient(110deg, #081132, #17327f);
      color: #fff;
      padding: 36px 44px;
      border-radius: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 20px 48px rgba(8, 17, 50, 0.16);
    }
    .cta-copy h3 {
      font: 800 25px Manrope, sans-serif;
      margin: 0 0 6px;
    }
    .cta-copy p {
      color: #b7c8fb;
      margin: 0;
      font-size: 15px;
    }
    .cta-btn {
      background: #2563eb;
      padding: 15px 30px;
      font-size: 14px;
      border-radius: 12px;
      white-space: nowrap;
    }
    .cta-btn:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(37, 99, 235, 0.4);
    }
    @media (max-width: 680px) {
      .cta-inner {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        padding: 26px 22px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host { animation: none !important; }
    }
  `,
})
export class ServicesComponent {}
const aboutCards = [
  { title: 'Ideas', description: 'Every great product starts with a meaningful idea.', icon: '💡' },
  { title: 'Design', description: 'We turn ideas into clean and engaging experiences.', icon: '🎨' },
  { title: 'Code', description: 'We build reliable and scalable software with modern technology.', icon: '</>' },
  { title: 'Create', description: 'We transform concepts into working digital products.', icon: '▱' },
  { title: 'Innovate', description: 'We explore better ways to solve real-world problems.', icon: '✦' },
  { title: 'Grow', description: 'We continuously improve products and create new possibilities.', icon: '↗' },
  { title: 'Build', description: 'We build technology with purpose, quality and long-term vision.', icon: '🚀' },
];

const aboutFeatures = [
  { title: 'Innovate', description: 'Turning ideas into possibilities', icon: '💡' },
  { title: 'Develop', description: 'Building modern software', icon: '</>' },
  { title: 'Transform', description: 'Improving digital experiences', icon: '☁' },
  { title: 'Automate', description: 'Making work smarter', icon: '⚙' },
  { title: 'Grow', description: 'Creating scalable solutions', icon: '↗' },
  { title: 'Build', description: 'Technology with purpose', icon: '🚀' },
  { title: 'Create', description: 'From concept to product', icon: '✦' },
  { title: 'Scale', description: 'Ready for future growth', icon: '⤢' },
  { title: 'Technology', description: 'Modern tools and platforms', icon: '◈' },
  { title: 'Digital Experiences', description: 'Simple, useful and engaging', icon: '◎' },
];

@Component({
  selector: 'app-home-about-preview',
  imports: [CommonModule, RouterLink],
  template: `
    <section #section id="about" class="about-page" [class.is-visible]="isVisible()">
      <section class="about-hero container">
        <div class="story-copy reveal-left">
          <span class="story-badge">Our Story</span>
          <h1>Building Ideas into<br /><em>Digital Experiences</em></h1>
          <h2>We are a new technology company focused on turning ideas into modern digital solutions.</h2>
          <p>Build4Big is our own technology venture, created with a passion for software, design and innovation. We are starting our journey by building useful, scalable and meaningful digital experiences for businesses and people.</p>
          <p>Our goal is simple — understand real problems, create smart solutions and continuously improve the way technology works for people.</p>
          <div class="story-actions"><a href="#about-features" class="primary-action">Explore Our Journey <span>→</span></a><a routerLink="/services" class="secondary-action"><i>▶</i> See What We Build</a></div>
        </div>
        <div class="card-marquee reveal-right" aria-label="Build4Big values">
          <div class="edge edge-left"></div><div class="edge edge-right"></div>
          <div class="card-track">
            <div class="card-set" *ngFor="let _ of [0, 1]">
              <article class="story-card" *ngFor="let card of aboutCards; let i = index">
                <span class="card-count">0{{ i + 1 }}</span><span class="card-icon">{{ card.icon }}</span>
                <h3>{{ card.title }}</h3><p>{{ card.description }}</p><span class="card-arrow">→</span>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section id="about-features" class="feature-area reveal-bottom" aria-label="What Build4Big does">
        <div class="feature-track">
          <div class="feature-set" *ngFor="let _ of [0, 1]">
            <article class="feature" *ngFor="let feature of features"><span class="feature-icon">{{ feature.icon }}</span><div><h3>{{ feature.title }}</h3><p>{{ feature.description }}</p></div></article>
          </div>
        </div>
      </section>
    </section>
  `,
  styles: `
    :host{display:block}
    .about-page{scroll-margin-top:76px;overflow:hidden;background:radial-gradient(circle at 78% 10%,#edf4ff 0,transparent 25%),#fff;color:#07133d}
    .about-hero{min-height:590px;display:grid;grid-template-columns:minmax(320px,.9fr) minmax(0,1.1fr);gap:70px;align-items:center;padding-top:84px;padding-bottom:74px}
    .story-badge{display:inline-block;padding:7px 15px;border-radius:20px;background:linear-gradient(100deg,#eff3ff,#fff);color:#265df6;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:800;box-shadow:0 8px 25px #2457b218}
    .story-copy h1{font:800 clamp(40px,4vw,61px)/1.08 Manrope;margin:18px 0}
    .story-copy h1 em{font-style:normal;color:#1f61fa}
    .story-copy h2{max-width:590px;font:600 clamp(20px,2vw,28px)/1.35 Manrope;letter-spacing:-.04em;margin:0 0 22px}
    .story-copy p{color:#63708d;font-size:16px;line-height:1.75;margin:11px 0}
    .story-actions{display:flex;flex-wrap:wrap;align-items:center;gap:19px;margin-top:30px}
    .primary-action,.secondary-action{text-decoration:none;font-weight:800;font-size:14px}
    .primary-action{padding:15px 21px;border-radius:13px;color:#fff;background:linear-gradient(110deg,#1558ff,#3e58f5);box-shadow:0 14px 28px #2458f04a}
    .primary-action span{font-size:20px;margin-left:13px}
    .secondary-action{color:#101a41;display:flex;align-items:center;gap:10px}
    .secondary-action i{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;font-style:normal;font-size:12px;color:#3263f8;background:#fff;box-shadow:0 4px 15px #2446812b}
    .card-marquee{position:relative;overflow:hidden;padding:40px 0;width:100%;mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
    .card-track,.card-set{display:flex;gap:18px;width:max-content}
    .card-track{animation:about-cards 30s linear infinite}
    .card-marquee:hover .card-track{animation-play-state:paused}
    .story-card{position:relative;flex:0 0 285px;min-height:275px;padding:30px;border:1px solid #ffffffc9;border-radius:24px;background:linear-gradient(145deg,#f8fbffcf,#dbe7ffcc);box-shadow:0 20px 44px #1b478c19;backdrop-filter:blur(12px);transition:transform .25s ease,box-shadow .25s ease}
    .story-card:hover{transform:translateY(-8px);box-shadow:0 28px 48px #1c4baa34}
    .card-count{color:#6276ae;font-size:13px}
    .card-icon{float:right;display:grid;place-items:center;width:54px;height:54px;border-radius:17px;background:linear-gradient(145deg,#725aff,#06c8e9);color:#fff;font-size:25px;box-shadow:0 10px 22px #3b66e555}
    .story-card h3{font:800 30px Manrope;letter-spacing:-.06em;margin:60px 0 10px}
    .story-card p{color:#58698f;font-size:14px;line-height:1.6;margin:0;max-width:205px}
    .card-arrow{position:absolute;bottom:25px;left:28px;display:grid;place-items:center;width:39px;height:39px;border-radius:50%;color:#2660f9;background:#fff;box-shadow:0 5px 12px #27428624;font-size:21px}
    .edge{position:absolute;top:0;bottom:0;width:65px;z-index:2;pointer-events:none}
    .edge-left{left:0;background:linear-gradient(90deg,#fff,transparent)}
    .edge-right{right:0;background:linear-gradient(270deg,#fff,transparent)}
    .feature-area{position:relative;overflow:hidden;padding:29px 0;border-top:2px solid #4a68ff;border-bottom:2px solid #4a68ff;background:linear-gradient(100deg,#f2f6ff,#fff 50%,#eef5ff);box-shadow:0 0 35px #5f7aff20}
    .feature-track,.feature-set{display:flex;gap:0;width:max-content}
    .feature-track{animation:feature-strip 32s linear infinite}
    .feature-area:hover .feature-track{animation-play-state:paused}
    .feature{width:245px;min-height:105px;display:flex;gap:14px;align-items:flex-start;padding:8px 23px;border-right:1px solid #cfd8ef}
    .feature-icon{font-size:27px;line-height:1;color:#245af7}
    .feature h3{font:800 17px Manrope;margin:0 0 5px}
    .feature p{font-size:12px;line-height:1.45;color:#63708d;margin:0}
    .reveal-left,.reveal-right,.reveal-bottom{opacity:0;will-change:transform,opacity}
    .is-visible .reveal-left{animation:reveal-left .7s cubic-bezier(.22,1,.36,1) both}
    .is-visible .reveal-right{animation:reveal-right .7s .12s cubic-bezier(.22,1,.36,1) both}
    .is-visible .reveal-bottom{animation:reveal-bottom .7s .18s cubic-bezier(.22,1,.36,1) both}
    @keyframes about-cards{to{transform:translateX(-50%)}}
    @keyframes feature-strip{from{transform:translateX(-50%)}to{transform:translateX(0)}}
    @keyframes reveal-left{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}
    @keyframes reveal-right{from{opacity:0;transform:translateX(26px)}to{opacity:1;transform:none}}
    @keyframes reveal-bottom{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
    @media(max-width:850px){.about-hero{grid-template-columns:1fr;gap:18px;padding-top:65px}.card-marquee{width:calc(100% + 48px);margin-left:-24px}.story-copy p{font-size:15px}}
    @media(max-width:560px){.about-hero{padding-bottom:44px}.story-copy h1{font-size:40px}.story-copy h2{font-size:20px}.story-actions{gap:13px}.primary-action{padding:13px 16px}.story-card{flex-basis:270px;min-height:260px;padding:25px}.feature{width:230px;padding:8px 17px}.card-marquee{mask-image:none}.edge{display:none}}
    @media(prefers-reduced-motion:reduce){.reveal-left,.reveal-right,.reveal-bottom{opacity:1!important;transform:none!important;animation:none!important}.card-track,.feature-track{animation:none}.story-card{transition:none}}
  `,
})
export class HomeAboutPreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('section') section?: ElementRef<HTMLElement>;
  isVisible = signal(false);
  private observer?: IntersectionObserver;
  aboutCards = aboutCards;
  features = aboutFeatures;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible.set(true);
          this.observer?.disconnect();
        }
      }, { threshold: 0.1 });
      if (this.section) this.observer.observe(this.section.nativeElement);
    } else {
      this.isVisible.set(true);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

@Component({
  selector: 'app-about',
  imports: [CommonModule, HomeAboutPreviewComponent],
  template: `<main><app-home-about-preview></app-home-about-preview></main>`,
  styles: `:host { display:block; animation: pageEnter 0.42s cubic-bezier(0.22,1,0.36,1) both; }
           @keyframes pageEnter { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
           @media(prefers-reduced-motion:reduce){:host{animation:none}}`,
})
export class AboutComponent {}
@Component({
  selector: 'app-ai',
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  template: `<app-header></app-header>
    <main class="page container">
      <div class="ai-head">
        <div>
          <div class="eyebrow">Powered by AI</div>
          <h1>Smarter Solutions<br />with Artificial Intelligence</h1>
          <p>
            We build AI-powered tools to help businesses automate processes,
            improve customer experience and make data-driven decisions.
          </p>
          <div class="ai-list">
            <div *ngFor="let x of items">
              <i>{{ x[0] }}</i
              ><span
                ><b>{{ x[1] }}</b
                ><small>{{ x[2] }}</small></span
              >
            </div>
          </div>
        </div>
        <div class="robot">
          <div class="antenna">⌁</div>
          <div class="face">●　●</div>
          <div class="body">◉</div>
        </div>
      </div>
      <section class="dark-cta">
        <div>
          <b>Let's bring AI to your business</b
          ><span>Transform your ideas with the power of AI.</span>
        </div>
        <a routerLink="/contact" class="btn">Get in Touch　→</a>
      </section>
    </main>
    <app-footer></app-footer>`,
  styles: `
    .ai-head {
      max-width: 900px;
      margin: auto;
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      align-items: center;
      gap: 25px;
    }
    .ai-head h1 {
      font-size: 37px;
      margin: 12px 0;
    }
    .ai-head p {
      font-size: 13px;
      color: #69708a;
      line-height: 1.7;
    }
    .ai-list {
      margin-top: 25px;
    }
    .ai-list > div {
      display: flex;
      gap: 14px;
      align-items: center;
      margin: 17px 0;
    }
    .ai-list i {
      font-style: normal;
      color: #3159f5;
      border: 1px solid #e3e8fc;
      border-radius: 50%;
      width: 39px;
      height: 39px;
      display: grid;
      place-items: center;
    }
    .ai-list b,
    .ai-list small {
      display: block;
    }
    .ai-list b {
      font-size: 13px;
    }
    .ai-list small {
      font-size: 11px;
      color: #69708a;
      margin-top: 3px;
    }
    .robot {
      height: 370px;
      position: relative;
      display: grid;
      place-content: center;
      filter: drop-shadow(0 20px 25px #6380ff55);
    }
    .face {
      width: 170px;
      height: 135px;
      border-radius: 48%;
      background: radial-gradient(
        circle at 30% 35%,
        #1d50e8 0 10%,
        #071337 12% 34%,
        #dce5ff 36%
      );
      color: #7c9cff;
      padding: 54px 33px;
      font-size: 20px;
      letter-spacing: 15px;
      white-space: nowrap;
    }
    .body {
      width: 115px;
      height: 150px;
      border-radius: 45px;
      background: linear-gradient(120deg, #f3f6ff, #8da3e9);
      margin: -12px auto 0;
      text-align: center;
      padding-top: 60px;
      color: #071337;
    }
    .antenna {
      text-align: center;
      color: #3159f5;
      font-size: 42px;
    }
    .dark-cta {
      max-width: 900px;
      margin: 25px auto;
      background: linear-gradient(100deg, #080f2b, #173b92);
      color: #fff;
      padding: 25px 30px;
      border-radius: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dark-cta b,
    .dark-cta span {
      display: block;
    }
    .dark-cta span {
      font-size: 12px;
      color: #c9d2f5;
      margin-top: 5px;
    }
    .dark-cta .btn {
      font-size: 12px;
      background: #3159f5;
    }
    @media (max-width: 650px) {
      .ai-head {
        grid-template-columns: 1fr;
      }
      .robot {
        height: 240px;
        transform: scale(0.7);
      }
      .dark-cta {
        align-items: flex-start;
        flex-direction: column;
        gap: 16px;
      }
    }
  `,
})
export class AiComponent {
  items = [
    ['◌', 'AI Chatbots', 'Automate customer support and engagement.'],
    ['◈', 'AI for Business', 'Intelligent solutions for smarter decisions.'],
    ['⌁', 'Data Analysis', 'Turn your data into valuable insights.'],
    ['✦', 'Custom AI Solutions', 'Tailored AI tools for your unique needs.'],
  ];
}
@Component({
  selector: 'app-simple',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    HeaderComponent,
    FooterComponent,
  ],
  template: `<app-header></app-header>
    <main class="page container">
      <div class="page-head">
        <div class="eyebrow">{{ label }}</div>
        <h1>{{ title }}</h1>
        <p>{{ intro }}</p>
      </div>
      <ng-container [ngSwitch]="kind"
        ><section *ngSwitchCase="'contact'" class="two">
          <div>
            <h3>Contact Information</h3>
            <p class="copytext">
              ⌖ Plot No. 2, Mahatma Gandhi 11th Street,<br />Thirunagar, Madurai
              - 625006
            </p>
            <p class="copytext">
              ☎ +91 96777 45205<br />◉ +91 70106 68560<br />✉
              info@build4big.com<br />◷ Mon - Sun: 10 AM - 7 PM
            </p>
          </div>
          <form class="card form">
            <h3>Send us a message</h3>
            <input placeholder="Your Name" /><input
              placeholder="Your Email"
            /><textarea placeholder="Your Message"></textarea
            ><button class="btn">Send Message　→</button>
          </form>
        </section>
        <section *ngSwitchCase="'careers'" class="two">
          <div>
            <h2>Great People Build Great Things</h2>
            <div class="pill">⌂ Flexible Work　　▰ Learning & Growth</div>
            <div class="pill">✦ Innovative Projects　　☻ Supportive Team</div>
          </div>
          <div class="illustration">👨🏽‍💻</div>
        </section>
        <section *ngSwitchCase="'careers'" class="jobs">
          <h2>Open Positions</h2>
          <article *ngFor="let j of jobs">
            <span
              ><b>{{ j }}</b
              ><small>Madurai | Full-time</small></span
            ><button>Apply Now</button>
          </article>
        </section>
        <section *ngSwitchCase="'blog'" class="blog-grid">
          <article class="blog card" *ngFor="let p of posts">
            <img [src]="p.image" />
            <div>
              <small>{{ p.date }}</small>
              <h3>{{ p.title }}</h3>
              <p>{{ p.excerpt }}</p>
              <a [routerLink]="['/blog', p.id]">Read More　→</a>
            </div>
          </article>
        </section></ng-container
      >
    </main>
    <app-footer></app-footer>`,
  styles: `
    .two {
      max-width: 860px;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    .copytext {
      font-size: 14px;
      color: #535d77;
      line-height: 2.1;
    }
    .form {
      padding: 25px;
      display: grid;
      gap: 12px;
    }
    .form input,
    .form textarea {
      padding: 13px;
      border: 0;
      border-radius: 8px;
      background: #f4f6fc;
    }
    .form textarea {
      height: 100px;
    }
    .illustration {
      font-size: 165px;
      text-align: center;
      background: #edf1ff;
      border-radius: 20px;
      padding: 35px;
    }
    .pill {
      padding: 14px;
      background: #f4f6ff;
      margin: 12px 0;
      border-radius: 10px;
      font-size: 13px;
      color: #3159f5;
    }
    .jobs {
      max-width: 860px;
      margin: 42px auto;
    }
    .jobs article {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      border: 1px solid #e5e9f4;
      border-radius: 10px;
      margin: 10px 0;
    }
    .jobs b,
    .jobs small {
      display: block;
    }
    .jobs small {
      font-size: 11px;
      color: #69708a;
      margin-top: 4px;
    }
    .jobs button {
      border: 1px solid #3159f5;
      border-radius: 7px;
      color: #3159f5;
      background: #fff;
    }
    .blog-grid {
      max-width: 860px;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .blog {
      overflow: hidden;
    }
    .blog img {
      width: 100%;
      height: 170px;
      object-fit: cover;
    }
    .blog > div {
      padding: 17px;
    }
    .blog small,
    .blog p {
      color: #69708a;
      font-size: 11px;
    }
    .blog h3 {
      font-size: 16px;
      margin: 8px 0;
    }
    .blog a {
      font-size: 12px;
      color: #3159f5;
      font-weight: bold;
    }
    @media (max-width: 650px) {
      .two,
      .blog-grid {
        grid-template-columns: 1fr;
      }
      .illustration {
        font-size: 110px;
      }
    }
    :host { display: block; animation: pageEnter 0.42s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes pageEnter { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    .blog.card { transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease; }
    .blog.card:hover { transform: translateY(-6px); box-shadow: 0 18px 42px rgba(22,32,80,0.12); }
    .jobs article { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .jobs article:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(22,32,80,0.08); }
    @media (prefers-reduced-motion: reduce) { :host{animation:none} .blog.card,.jobs article{transition:none} }
  `,
})
export class SimpleComponent {
  kind = '';
  label = '';
  title = '';
  intro = '';
  jobs = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer'];
  posts = posts;
  constructor(route: ActivatedRoute) {
    const d = route.snapshot.data;
    this.kind = d['kind'] as string;
    this.label = d['label'] as string;
    this.title = d['title'] as string;
    this.intro = d['intro'] as string;
  }
}
@Component({
  selector: 'app-blog-showcase',
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div #blogRoot class="blog-showcase-container" [class.is-visible]="isVisible()">
      <!-- Ambient Glow and Floating Shapes -->
      <div class="glow-orb glow-top-left" aria-hidden="true"></div>
      <div class="glow-orb glow-top-right" aria-hidden="true"></div>
      <div class="glow-orb glow-center" aria-hidden="true"></div>

      <!-- HERO SECTION -->
      <div class="blog-hero container">
        <div class="hero-left">
          <div class="badge-eyebrow">OUR BLOG</div>
          <h1 class="hero-heading">
            Discover Ideas<br />
            for a <span class="gradient-text">Smarter Tomorrow.</span>
          </h1>
          <p class="hero-subtitle">
            Explore expert insights, practical guides, and real stories on
            technology, AI, business and digital transformation.
          </p>

          <!-- Search Bar -->
          <div class="search-bar-wrap">
            <span class="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              class="search-input"
              placeholder="Search articles, topics or keywords..."
              [(ngModel)]="searchQuery"
            />
            <button class="search-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Hero Right: 3D Illustration Graphic with Book, Bulb, Floating Badges & Scribbles -->
        <div class="hero-right" aria-hidden="true">
          <!-- Handwritten Scribble Top -->
          <div class="handwritten-scribble scribble-top">
            <span>Better<br />Ideas<br />Brighter<br />Tomorrow</span>
            <svg class="scribble-curve" viewBox="0 0 50 40" fill="none">
              <path d="M10 5 C25 25, 30 35, 42 30" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" fill="none"/>
              <polyline points="35 30 43 30 40 22" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <!-- Handwritten Scribble Right -->
          <div class="handwritten-scribble scribble-right">
            <span>Knowledge<br />for a<br />Bigger Impact</span>
            <svg class="scribble-curve-right" viewBox="0 0 60 40" fill="none">
              <path d="M45 5 C30 25, 20 30, 8 32" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" fill="none"/>
              <polyline points="15 26 7 32 14 38" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <!-- Floating Badges -->
          <div class="floating-badge badge-grow">
            <span class="badge-icon">📖</span>
            <span class="badge-txt">Grow</span>
          </div>
          <div class="floating-badge badge-share">
            <span class="badge-icon">🔗</span>
            <span class="badge-txt">Share</span>
          </div>
          <div class="floating-badge badge-innovate">
            <span class="badge-icon">🚀</span>
            <span class="badge-txt">Innovate</span>
          </div>

          <!-- Book & Glowing Idea Bulb Illustration -->
          <div class="illustration-stage">
            <div class="bulb-halo"></div>
            <div class="bulb-graphic">
              <div class="bulb-glow">💡</div>
              <div class="bulb-rays">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
            <div class="open-book-graphic">
              <div class="book-pages left-page"></div>
              <div class="book-spine"></div>
              <div class="book-pages right-page"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- FILTER PILLS & SORT ROW -->
      <div class="filter-sort-row container">
        <div class="category-pills">
          <button
            class="pill-btn"
            [class.active]="selectedCategory === 'All Posts'"
            (click)="setCategory('All Posts')"
          >
            All Posts
          </button>
          <button
            class="pill-btn"
            [class.active]="selectedCategory === 'Technology'"
            (click)="setCategory('Technology')"
          >
            <span class="pill-icon">💻</span> Technology
          </button>
          <button
            class="pill-btn"
            [class.active]="selectedCategory === 'AI & Automation'"
            (click)="setCategory('AI & Automation')"
          >
            <span class="pill-icon">🤖</span> AI & Automation
          </button>
          <button
            class="pill-btn"
            [class.active]="selectedCategory === 'Web Development'"
            (click)="setCategory('Web Development')"
          >
            <span class="pill-icon">&lt;/&gt;</span> Web Development
          </button>
          <button
            class="pill-btn"
            [class.active]="selectedCategory === 'Business'"
            (click)="setCategory('Business')"
          >
            <span class="pill-icon">📊</span> Business
          </button>
          <button
            class="pill-btn"
            [class.active]="selectedCategory === 'Productivity'"
            (click)="setCategory('Productivity')"
          >
            <span class="pill-icon">💡</span> Productivity
          </button>
          <button
            class="pill-btn"
            [class.active]="selectedCategory === 'Tips & Guides'"
            (click)="setCategory('Tips & Guides')"
          >
            <span class="pill-icon">📝</span> Tips & Guides
          </button>
        </div>

        <div class="sort-dropdown">
          <span class="sort-label">Sort by:</span>
          <select [(ngModel)]="sortBy" class="sort-select">
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      <!-- MAIN CONTENT SPLIT: FEATURED + LATEST (LEFT) & TRENDING + NEWSLETTER (RIGHT) -->
      <div class="main-content-split container">
        <!-- LEFT COLUMN: Featured Article & Latest Articles -->
        <div class="content-left">
          <!-- Featured Article Banner -->
          <article class="featured-card" *ngIf="featuredPost">
            <div class="featured-img-wrap">
              <img [src]="featuredPost.image" [alt]="featuredPost.title" loading="lazy" />
              <div class="featured-chip">
                <span>★ Featured Article</span>
              </div>
              <div class="laptop-overlay">
                <div class="overlay-text">
                  <span>Ideas<br />Build<br />Better<br />Tomorrows</span>
                  <small>Build4Big</small>
                </div>
              </div>
            </div>

            <div class="featured-body">
              <div class="meta-row">
                <span class="category-tag-blue">{{ featuredPost.category | uppercase }}</span>
                <span class="meta-time">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {{ featuredPost.date }}
                </span>
              </div>

              <h2 class="featured-title">{{ featuredPost.title }}</h2>
              <p class="featured-desc">{{ featuredPost.excerpt }}</p>

              <div class="featured-footer">
                <div class="author-badge">
                  <div class="avatar-stack">
                    <span class="avatar-icon">👨‍💻</span>
                  </div>
                  <span class="author-name">By {{ featuredPost.author || 'Build4Big Team' }}</span>
                </div>
                <a [routerLink]="['/blog', featuredPost.id]" class="btn-read-full">
                  Read Full Article <span>→</span>
                </a>
              </div>
            </div>
          </article>

          <!-- Latest Articles Section -->
          <div class="latest-section">
            <div class="latest-header">
              <div>
                <h3 class="latest-title">Latest Articles</h3>
                <p class="latest-subtitle">Fresh insights, practical guides and stories to fuel your growth.</p>
              </div>
              <a routerLink="/blog" class="view-all-link">View All Articles <span>→</span></a>
            </div>

            <div class="latest-cards-grid">
              <article class="mini-article-card" *ngFor="let p of filteredPosts">
                <div class="mini-img-wrap">
                  <img [src]="p.image" [alt]="p.title" loading="lazy" />
                  <span class="mini-category-badge">{{ p.category | uppercase }}</span>
                </div>
                <div class="mini-body">
                  <div class="mini-meta-row">
                    <span class="mini-cat-name">{{ p.category | uppercase }}</span>
                    <span class="mini-date">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {{ p.date }}
                    </span>
                  </div>
                  <h4 class="mini-title">{{ p.title }}</h4>
                  <div class="mini-footer">
                    <span class="read-time-pill">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {{ p.readTime || '5 min read' }}
                    </span>
                    <a [routerLink]="['/blog', p.id]" class="mini-arrow-btn" [attr.aria-label]="'Read ' + p.title">
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Trending Posts & Stay Updated Card -->
        <aside class="content-right">
          <!-- Trending Posts Card -->
          <div class="sidebar-card trending-card">
            <div class="sidebar-header">
              <div class="trending-title-wrap">
                <span class="fire-icon">🔥</span>
                <h3 class="sidebar-title">Trending Posts</h3>
              </div>
              <a routerLink="/blog" class="sidebar-link">View All <span>→</span></a>
            </div>

            <div class="trending-list">
              <article class="trending-item" *ngFor="let t of trendingPosts; let i = index">
                <span class="item-rank">0{{ i + 1 }}</span>
                <div class="trending-thumb">
                  <img [src]="t.image" [alt]="t.title" loading="lazy" />
                </div>
                <div class="trending-details">
                  <h4 class="trending-headline">
                    <a [routerLink]="['/blog', t.id]">{{ t.title }}</a>
                  </h4>
                  <div class="trending-meta">
                    <span>{{ t.date }}</span>
                    <span class="dot">•</span>
                    <span>{{ t.readTime || '4 min read' }}</span>
                  </div>
                </div>
                <a [routerLink]="['/blog', t.id]" class="trending-arrow" aria-label="Read article">
                  <span>→</span>
                </a>
              </article>
            </div>
          </div>

          <!-- Stay Updated (Newsletter) Card -->
          <div class="sidebar-card newsletter-card">
            <div class="newsletter-icon-wrap">
              <div class="paper-airplane" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </div>
              <div class="mail-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
            </div>

            <h3 class="newsletter-title">Stay Updated</h3>
            <p class="newsletter-desc">
              Get the latest articles, insights and resources delivered to your inbox.
            </p>

            <form class="newsletter-form" (submit)="subscribe($event)">
              <input
                type="email"
                placeholder="Enter your email address"
                [(ngModel)]="subscriberEmail"
                name="email"
                class="newsletter-input"
                required
              />
              <button type="submit" class="btn-subscribe">
                <span>{{ subscribed ? 'Subscribed! 🎉' : 'Subscribe →' }}</span>
              </button>
            </form>

            <p class="newsletter-footnote">No spam. Just valuable content.</p>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .blog-showcase-container {
      position: relative;
      overflow: hidden;
      padding: 60px 16px 85px;
      background: linear-gradient(180deg, #f8faff 0%, #f1f5fd 50%, #f8faff 100%);
      color: #0f172a;
    }

    /* Staggered Scroll Reveal */
    .blog-hero, .filter-sort-row, .featured-card, .latest-section, .trending-card, .newsletter-card {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .is-visible .blog-hero {
      opacity: 1;
      transform: none;
      transition-delay: 0.05s;
    }
    .is-visible .filter-sort-row {
      opacity: 1;
      transform: none;
      transition-delay: 0.15s;
    }
    .is-visible .featured-card {
      opacity: 1;
      transform: none;
      transition-delay: 0.22s;
    }
    .is-visible .latest-section {
      opacity: 1;
      transform: none;
      transition-delay: 0.3s;
    }
    .is-visible .trending-card {
      opacity: 1;
      transform: none;
      transition-delay: 0.24s;
    }
    .is-visible .newsletter-card {
      opacity: 1;
      transform: none;
      transition-delay: 0.34s;
    }

    /* Ambient Glow Circles */
    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
      opacity: 0.55;
    }
    .glow-top-left {
      width: 380px;
      height: 380px;
      background: radial-gradient(circle, #bfdbfe, #93c5fd);
      top: -120px;
      left: -80px;
      animation: floatGlow 9s ease-in-out infinite alternate;
    }
    .glow-top-right {
      width: 440px;
      height: 440px;
      background: radial-gradient(circle, #ddd6fe, #bfdbfe);
      top: 40px;
      right: -100px;
      animation: floatGlow 11s 1s ease-in-out infinite alternate-reverse;
    }
    .glow-center {
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, #e0e7ff, #ede9fe);
      bottom: 200px;
      left: 30%;
      animation: floatGlow 13s ease-in-out infinite alternate;
    }
    @keyframes floatGlow {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(25px, -20px) scale(1.08); }
    }

    /* HERO SECTION */
    .blog-hero {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 40px;
      align-items: center;
      position: relative;
      z-index: 1;
      padding-top: 10px;
      margin-bottom: 45px;
    }

    .badge-eyebrow {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #2563eb;
      margin-bottom: 14px;
    }

    .hero-heading {
      font: 800 clamp(38px, 4.4vw, 56px)/1.12 Manrope, sans-serif;
      color: #0a1128;
      margin: 0 0 16px;
      letter-spacing: -0.04em;
    }

    .gradient-text {
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: 16px;
      line-height: 1.65;
      color: #475569;
      max-width: 520px;
      margin: 0 0 28px;
    }

    /* Search Bar */
    .search-bar-wrap {
      display: flex;
      align-items: center;
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 9999px;
      padding: 6px 8px 6px 18px;
      box-shadow: 0 8px 24px rgba(37, 99, 235, 0.08);
      max-width: 480px;
      transition: border-color 0.25s, box-shadow 0.25s;
    }
    .search-bar-wrap:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 10px 28px rgba(37, 99, 235, 0.16);
    }
    .search-icon {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14.5px;
      color: #0f172a;
      background: transparent;
    }
    .search-input::placeholder {
      color: #94a3b8;
    }
    .search-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #2563eb;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s, background 0.2s;
    }
    .search-btn:hover {
      background: #1d4ed8;
      transform: scale(1.05);
    }

    /* HERO RIGHT ILLUSTRATION */
    .hero-right {
      position: relative;
      height: 330px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .handwritten-scribble {
      position: absolute;
      font-family: 'Caveat', cursive;
      font-size: 19px;
      font-weight: 700;
      color: #2563eb;
      line-height: 1.1;
      pointer-events: none;
    }
    .scribble-top {
      top: 15px;
      left: 15px;
      transform: rotate(-10deg);
    }
    .scribble-top .scribble-curve {
      width: 36px;
      height: 30px;
      margin-top: 2px;
      margin-left: 15px;
    }
    .scribble-right {
      top: 45px;
      right: 5px;
      transform: rotate(8deg);
      text-align: right;
    }
    .scribble-right .scribble-curve-right {
      width: 45px;
      height: 28px;
      margin-top: 2px;
      margin-left: auto;
    }

    /* Floating Badges */
    .floating-badge {
      position: absolute;
      background: #ffffff;
      padding: 7px 16px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      box-shadow: 0 8px 22px rgba(37, 99, 235, 0.12);
      border: 1px solid #e2e8f0;
      font-size: 12.5px;
      font-weight: 700;
      color: #0f172a;
      z-index: 4;
      animation: badgeFloat 5s ease-in-out infinite alternate;
    }
    .badge-grow {
      top: 85px;
      left: 55px;
      animation-delay: 0s;
    }
    .badge-share {
      top: 50px;
      right: 90px;
      animation-delay: 1.2s;
    }
    .badge-innovate {
      bottom: 75px;
      right: 35px;
      animation-delay: 2.2s;
    }
    @keyframes badgeFloat {
      0% { transform: translateY(0); }
      100% { transform: translateY(-8px); }
    }

    /* Open Book & Glowing Bulb */
    .illustration-stage {
      position: relative;
      width: 280px;
      height: 220px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
    }
    .bulb-halo {
      position: absolute;
      top: 15px;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(147, 197, 253, 0) 70%);
      animation: bulbBreathe 3.5s ease-in-out infinite alternate;
    }
    @keyframes bulbBreathe {
      0% { transform: scale(0.9); opacity: 0.6; }
      100% { transform: scale(1.15); opacity: 1; }
    }
    .bulb-graphic {
      position: absolute;
      top: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 56px;
      z-index: 3;
      filter: drop-shadow(0 0 16px rgba(59, 130, 246, 0.7));
      animation: bulbGlowPulse 4s ease-in-out infinite alternate;
    }
    @keyframes bulbGlowPulse {
      0% { transform: translateY(0); filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.5)); }
      100% { transform: translateY(-6px); filter: drop-shadow(0 0 24px rgba(59, 130, 246, 0.95)); }
    }
    .open-book-graphic {
      width: 220px;
      height: 70px;
      position: relative;
      display: flex;
      perspective: 600px;
      filter: drop-shadow(0 14px 22px rgba(37, 99, 235, 0.22));
    }
    .book-pages {
      flex: 1;
      height: 100%;
      background: linear-gradient(135deg, #ffffff 0%, #dbeafe 100%);
      border: 2px solid #2563eb;
    }
    .left-page {
      border-radius: 12px 0 0 12px;
      transform: rotateY(18deg) skewY(-4deg);
      border-right: none;
    }
    .right-page {
      border-radius: 0 12px 12px 0;
      transform: rotateY(-18deg) skewY(4deg);
      border-left: none;
    }
    .book-spine {
      width: 14px;
      background: #1d4ed8;
      border-radius: 4px;
    }

    /* FILTER & SORT ROW */
    .filter-sort-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 36px;
      position: relative;
      z-index: 2;
    }
    .category-pills {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .pill-btn {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 9999px;
      padding: 9px 18px;
      font-size: 13.5px;
      font-weight: 600;
      color: #334155;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      transition: all 0.22s ease;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
    }
    .pill-btn:hover {
      border-color: #93c5fd;
      background: #eff6ff;
      color: #1d4ed8;
      transform: translateY(-2px);
    }
    .pill-btn.active {
      background: #2563eb;
      border-color: #2563eb;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
    }
    .pill-icon {
      font-size: 13px;
    }

    .sort-dropdown {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      color: #64748b;
    }
    .sort-select {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 9999px;
      padding: 7px 14px;
      font-size: 13px;
      font-weight: 600;
      color: #0f172a;
      outline: none;
      cursor: pointer;
    }

    /* MAIN CONTENT SPLIT */
    .main-content-split {
      display: grid;
      grid-template-columns: 1.8fr 1fr;
      gap: 32px;
      position: relative;
      z-index: 2;
    }

    /* FEATURED ARTICLE BANNER */
    .featured-card {
      background: #ffffff;
      border-radius: 24px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      box-shadow: 0 10px 32px rgba(37, 99, 235, 0.07);
      margin-bottom: 40px;
      transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease;
    }
    .featured-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 18px 44px rgba(37, 99, 235, 0.13);
    }
    .featured-img-wrap {
      position: relative;
      min-height: 270px;
      overflow: hidden;
    }
    .featured-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .featured-card:hover .featured-img-wrap img {
      transform: scale(1.04);
    }
    .featured-chip {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(124, 58, 237, 0.92);
      backdrop-filter: blur(8px);
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 9999px;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
    }
    .laptop-overlay {
      position: absolute;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: rgba(15, 23, 42, 0.78);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      padding: 14px 16px;
      color: #ffffff;
    }
    .overlay-text span {
      display: block;
      font: 700 13px/1.3 Manrope;
      color: #ffffff;
    }
    .overlay-text small {
      display: block;
      font-size: 10.5px;
      color: #93c5fd;
      margin-top: 4px;
      letter-spacing: 0.05em;
    }

    .featured-body {
      padding: 30px 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .meta-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 14px;
      font-size: 12px;
    }
    .category-tag-blue {
      color: #2563eb;
      font-weight: 800;
      letter-spacing: 0.08em;
    }
    .meta-time {
      color: #64748b;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .featured-title {
      font: 800 24px/1.25 Manrope, sans-serif;
      color: #0a1128;
      margin: 0 0 12px;
      letter-spacing: -0.03em;
    }
    .featured-desc {
      font-size: 14px;
      line-height: 1.6;
      color: #64748b;
      margin: 0 0 24px;
    }
    .featured-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin-top: auto;
    }
    .author-badge {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .avatar-stack {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
    .author-name {
      font-size: 13px;
      font-weight: 600;
      color: #334155;
    }
    .btn-read-full {
      background: #2563eb;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.22s ease;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.28);
    }
    .btn-read-full:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.36);
    }

    /* LATEST ARTICLES SECTION */
    .latest-section {
      margin-top: 10px;
    }
    .latest-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 22px;
    }
    .latest-title {
      font: 800 24px Manrope;
      color: #0a1128;
      margin: 0 0 4px;
    }
    .latest-subtitle {
      font-size: 13.5px;
      color: #64748b;
      margin: 0;
    }
    .view-all-link {
      font-size: 13px;
      font-weight: 700;
      color: #2563eb;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: color 0.2s;
    }
    .view-all-link:hover {
      color: #1d4ed8;
    }

    .latest-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .mini-article-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.05);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .mini-article-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 14px 30px rgba(37, 99, 235, 0.12);
    }
    .mini-img-wrap {
      position: relative;
      height: 140px;
      overflow: hidden;
    }
    .mini-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .mini-article-card:hover .mini-img-wrap img {
      transform: scale(1.05);
    }
    .mini-category-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(6px);
      color: #ffffff;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 0.06em;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .mini-body {
      padding: 16px 14px 14px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .mini-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 11px;
    }
    .mini-cat-name {
      color: #2563eb;
      font-weight: 800;
      letter-spacing: 0.05em;
    }
    .mini-date {
      color: #94a3b8;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .mini-title {
      font: 700 15px/1.3 Manrope;
      color: #0f172a;
      margin: 0 0 14px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .mini-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 10px;
      border-top: 1px solid #f1f5f9;
    }
    .read-time-pill {
      font-size: 11.5px;
      color: #64748b;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .mini-arrow-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #eff6ff;
      color: #2563eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      transition: all 0.2s;
    }
    .mini-article-card:hover .mini-arrow-btn {
      background: #2563eb;
      color: #ffffff;
      transform: translateX(3px);
    }

    /* RIGHT SIDEBAR COLUMN */
    .sidebar-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
      padding: 24px;
      box-shadow: 0 6px 24px rgba(15, 23, 42, 0.05);
      margin-bottom: 26px;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .sidebar-card:hover {
      box-shadow: 0 12px 32px rgba(37, 99, 235, 0.09);
    }
    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .trending-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .fire-icon {
      font-size: 18px;
    }
    .sidebar-title {
      font: 800 18px Manrope;
      color: #0a1128;
      margin: 0;
    }
    .sidebar-link {
      font-size: 12.5px;
      font-weight: 700;
      color: #2563eb;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    /* Trending List Items */
    .trending-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .trending-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 14px;
      border-bottom: 1px solid #f1f5f9;
      transition: transform 0.2s ease;
    }
    .trending-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .trending-item:hover {
      transform: translateX(4px);
    }
    .item-rank {
      font: 800 16px Manrope;
      color: #94a3b8;
      width: 24px;
      flex-shrink: 0;
    }
    .trending-thumb {
      width: 54px;
      height: 54px;
      border-radius: 12px;
      overflow: hidden;
      flex-shrink: 0;
    }
    .trending-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .trending-details {
      flex: 1;
      min-width: 0;
    }
    .trending-headline {
      font: 700 13px/1.3 Manrope;
      margin: 0 0 4px;
    }
    .trending-headline a {
      color: #0f172a;
      transition: color 0.2s;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .trending-headline a:hover {
      color: #2563eb;
    }
    .trending-meta {
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .trending-arrow {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f8fafc;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .trending-item:hover .trending-arrow {
      background: #2563eb;
      color: #ffffff;
    }

    /* NEWSLETTER CARD */
    .newsletter-card {
      background: linear-gradient(145deg, #ffffff 0%, #f0f6ff 100%);
      border: 1.5px solid #dbeafe;
      position: relative;
    }
    .newsletter-icon-wrap {
      position: relative;
      width: 52px;
      height: 52px;
      margin-bottom: 14px;
    }
    .mail-badge {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .paper-airplane {
      position: absolute;
      top: -10px;
      right: -240px;
      opacity: 0.65;
      animation: planeSway 4s ease-in-out infinite alternate;
    }
    @keyframes planeSway {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(-6px) rotate(4deg); }
    }
    .newsletter-title {
      font: 800 20px Manrope;
      color: #0a1128;
      margin: 0 0 6px;
    }
    .newsletter-desc {
      font-size: 13px;
      line-height: 1.55;
      color: #64748b;
      margin: 0 0 18px;
    }
    .newsletter-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .newsletter-input {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 9999px;
      padding: 12px 18px;
      font-size: 13.5px;
      outline: none;
      color: #0f172a;
      transition: border-color 0.2s;
    }
    .newsletter-input:focus {
      border-color: #2563eb;
    }
    .btn-subscribe {
      background: #2563eb;
      color: #ffffff;
      border: none;
      border-radius: 9999px;
      padding: 12px 20px;
      font: 700 13.5px 'DM Sans';
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
    }
    .btn-subscribe:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.38);
    }
    .newsletter-footnote {
      font-size: 11.5px;
      color: #94a3b8;
      margin: 12px 0 0;
      text-align: center;
    }

    /* RESPONSIVE DESIGN */
    @media (max-width: 1024px) {
      .blog-hero {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      .hero-right {
        height: 260px;
      }
      .main-content-split {
        grid-template-columns: 1fr;
      }
      .featured-card {
        grid-template-columns: 1fr;
      }
      .featured-img-wrap {
        min-height: 220px;
      }
    }

    @media (max-width: 768px) {
      .latest-cards-grid {
        grid-template-columns: 1fr;
      }
      .filter-sort-row {
        flex-direction: column;
        align-items: flex-start;
      }
      .hero-heading {
        font-size: 34px;
      }
      .hero-right {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .blog-showcase-container, .blog-hero, .filter-sort-row, .featured-card, .latest-section, .trending-card, .newsletter-card {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .floating-badge, .glow-orb, .bulb-graphic, .bulb-halo, .paper-airplane {
        animation: none !important;
      }
      .featured-card, .mini-article-card, .trending-item {
        transition: none !important;
      }
    }
  `,
})
export class BlogShowcaseComponent implements AfterViewInit {
  @ViewChild('blogRoot') blogRoot?: ElementRef<HTMLElement>;
  isVisible = signal(false);

  searchQuery = '';
  selectedCategory = 'All Posts';
  sortBy = 'latest';
  subscribed = false;
  subscriberEmail = '';

  postsList: Post[] = posts;

  private observer?: IntersectionObserver;

  get featuredPost(): Post | undefined {
    return this.postsList.find((p) => p.featured) || this.postsList[0];
  }

  get trendingPosts(): Post[] {
    return this.postsList.slice(1, 5);
  }

  get filteredPosts(): Post[] {
    let list = this.postsList.filter((p) => !p.featured);

    if (this.selectedCategory !== 'All Posts') {
      list = list.filter(
        (p) => p.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return list.slice(0, 3);
  }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible.set(true);
            this.observer?.disconnect();
          }
        },
        { threshold: 0.08 }
      );
      if (this.blogRoot) this.observer.observe(this.blogRoot.nativeElement);
    } else {
      this.isVisible.set(true);
    }
  }

  setCategory(cat: string): void {
    this.selectedCategory = cat;
  }

  subscribe(e: Event): void {
    e.preventDefault();
    if (!this.subscriberEmail) return;
    this.subscribed = true;
    setTimeout(() => {
      this.subscribed = false;
      this.subscriberEmail = '';
    }, 4000);
  }
}

@Component({
  selector: 'app-blog',
  imports: [CommonModule, HeaderComponent, FooterComponent, BlogShowcaseComponent],
  template: `
    <app-header></app-header>
    <main class="blog-page-wrap">
      <app-blog-showcase></app-blog-showcase>
    </main>
    <app-footer></app-footer>
  `,
  styles: `
    :host { display: block; animation: pageEnter 0.42s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes pageEnter { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    .blog-page-wrap {
      background: #f8faff;
      min-height: 80vh;
    }
    @media (prefers-reduced-motion: reduce) { :host{animation:none} }
  `,
})
export class BlogComponent {
  posts = posts;
}

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  template: `<app-header></app-header>
    <main class="page container detail">
      <div class="eyebrow">{{ post?.category || 'Build4Big Journal' }}</div>
      <h1>{{ post?.title || 'Ideas that turn technology into impact' }}</h1>
      <p class="detail-meta-line">{{ post?.date }}</p>
      <img
        [src]="post?.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80'"
        [alt]="post?.title || 'Article Image'"
      />
      <p class="lead-excerpt">
        {{ post?.excerpt }}
      </p>
      <p>
        Modern technology becomes powerful when it helps people solve real
        problems. In this journal, we share practical perspectives on building
        smarter, more meaningful digital products.
      </p>
      <p>
        As we continue to build scalable digital solutions, staying at the forefront of modern engineering practices, user experience architecture, and intelligent automation enables forward-thinking companies to lead their industries.
      </p>
      <a routerLink="/blog" class="btn">← Back to Journal</a>
    </main>
    <app-footer></app-footer>`,
  styles: `
    .detail {
      max-width: 760px;
    }
    .detail h1 {
      font-size: 45px;
      line-height: 1.15;
      margin: 12px 0 6px;
    }
    .detail-meta-line {
      font-size: 13px;
      color: #7b88a8;
      margin-bottom: 20px;
    }
    .detail img {
      width: 100%;
      height: 360px;
      object-fit: cover;
      border-radius: 20px;
      margin: 15px 0 25px;
      box-shadow: 0 16px 36px rgba(12, 28, 64, 0.12);
    }
    .detail p {
      font-size: 16px;
      line-height: 1.9;
      color: #555d75;
      margin-bottom: 20px;
    }
    .detail p.lead-excerpt {
      font-size: 18px;
      font-weight: 500;
      color: #1a2542;
      line-height: 1.75;
    }
    .detail .btn {
      margin-top: 15px;
    }
    :host { display: block; animation: pageEnter 0.42s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes pageEnter { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    .detail-hero-img { animation: imgReveal 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes imgReveal { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
    .detail h1 { animation: fadeUp 0.6s 0.15s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
    @media (prefers-reduced-motion: reduce) { :host,.detail-hero-img,.detail h1{animation:none;opacity:1} }
  `,
})
export class BlogDetailComponent {
  post?: Post;
  constructor(route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id');
    this.post = posts.find((p) => p.id === id) || posts[0];
  }
}
const contactPillars = [
  { icon: '🚀', title: 'New Projects', text: "We're excited to hear your ideas." },
  { icon: '🤝', title: 'Collaborations', text: "Let's create something great together." },
  { icon: '💬', title: 'Quick Response', text: "We'll get back to you soon." },
  { icon: '💙', title: 'Long-term Partnerships', text: 'Building better tomorrows together.' },
];
@Component({
  selector: 'app-contact-showcase',
  imports: [CommonModule, FormsModule],
  template: `
    <div #contactRoot class="contact-showcase" [class.is-visible]="isVisible()">
      <!-- Background orbs -->
      <div class="orb orb1" aria-hidden="true"></div>
      <div class="orb orb2" aria-hidden="true"></div>
      <div class="orb orb3" aria-hidden="true"></div>
      <!-- Scribble notes -->
      <div class="scribble scribble-left" aria-hidden="true">Great Ideas<br/>Start with a<br/>Conversation</div>
      <div class="scribble scribble-right" aria-hidden="true">Let's<br/>Build<br/>Something<br/>Amazing</div>
      <!-- Paper plane -->
      <div class="plane-wrap" aria-hidden="true">
        <svg class="paper-plane" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 70 L70 10 L30 40 Z" fill="#3159f5" opacity="0.85"/>
          <path d="M30 40 L70 10 L50 55 Z" fill="#6183ff" opacity="0.7"/>
          <path d="M30 40 L50 55 L35 65 Z" fill="#3159f5" opacity="0.6"/>
        </svg>
        <svg class="plane-trail" viewBox="0 0 120 60" fill="none">
          <path d="M10 50 Q40 10 110 5" stroke="#3159f5" stroke-width="1.5" stroke-dasharray="6 5" fill="none" opacity="0.5"/>
          <circle cx="110" cy="5" r="3" fill="#8b5cf6"/>
        </svg>
      </div>
      <!-- Header -->
      <div class="contact-header">
        <div class="contact-badge">GET IN TOUCH</div>
        <h2 class="contact-title">Let's Work <span class="grad">Together</span></h2>
        <p class="contact-sub">Have a project in mind? We'd love to hear from you. Send us a message<br/>and we'll get back soon.</p>
      </div>
      <!-- Main panel -->
      <!-- Main panel: 3 columns -->
      <div class="contact-main">
        <!-- Left: Info -->
        <div class="contact-info-col">
          <div class="info-accent"></div>
          <h3 class="info-title">Contact Information</h3>
          <p class="info-sub">Reach out to us anytime. We're always open<br/>to new ideas, collaborations and opportunities.</p>
          <div class="info-list">
            <div class="info-item">
              <div class="info-icon">📍</div>
              <div>
                <div class="info-label">Our Location</div>
                <div class="info-val">Plot No. 2, Mahatma Gandhi 11th Street,<br/>Thirunagar, Madurai – 625006</div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">📞</div>
              <div>
                <div class="info-label">Call Us</div>
                <div class="info-val">+91 96777 45205<br/>+91 70106 68560</div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">✉️</div>
              <div>
                <div class="info-label">Email Us</div>
                <div class="info-val">info&#64;build4big.com</div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">🕐</div>
              <div>
                <div class="info-label">Working Hours</div>
                <div class="info-val">Mon – Sun: 10 AM – 7 PM</div>
              </div>
            </div>
          </div>
          <div class="social-row">
            <span class="social-label">Follow Us</span>
            <a class="social-btn" href="https://linkedin.com" target="_blank" aria-label="LinkedIn">in</a>
            <a class="social-btn" href="https://twitter.com" target="_blank" aria-label="Twitter">𝕏</a>
            <a class="social-btn" href="https://instagram.com" target="_blank" aria-label="Instagram">◎</a>
            <a class="social-btn" href="https://youtube.com" target="_blank" aria-label="YouTube">▷</a>
          </div>
        </div>
        <!-- Center: Interactive Live Map Card with Design Chips -->
        <div class="contact-center-col">
          <div class="map-blob-container">
            <div class="float-chip chip1">💡 Ideas</div>
            <div class="float-chip chip2">👥 Collaboration</div>
            <div class="float-chip chip3">🚀 Opportunities</div>

            <div class="map-blob">
              <iframe
                class="live-map-iframe"
                title="Build4Big Office Location Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.0536,9.8587,78.0936,9.8987&layer=mapnik&marker=9.8787,78.0736"
                loading="lazy"
              ></iframe>
              <div class="map-pin-overlay">
                <div class="map-pin">
                  <div class="pin-head"></div>
                  <div class="pin-stem"></div>
                </div>
              </div>
              <a
                class="map-badge"
                href="https://maps.google.com/?q=Plot+No.+2,+Mahatma+Gandhi+11th+Street,+Thirunagar,+Madurai+-+625006"
                target="_blank"
                rel="noopener noreferrer"
                title="Open in Google Maps"
              >
                <span>Let'sConnect</span>
              </a>
            </div>
          </div>
        </div>
        <!-- Right: Form card -->
        <div class="contact-form-card">
          <div class="info-accent"></div>
          <h3 class="form-title">Send us a message</h3>
          <p class="form-sub">Tell us about your project or idea. We'll get back to you soon.</p>
          <div class="contact-form">
            <div class="field-wrap">
              <span class="field-icon">👤</span>
              <input class="field" type="text" placeholder="Your Name" [(ngModel)]="name" />
            </div>
            <div class="field-wrap">
              <span class="field-icon">✉</span>
              <input class="field" type="email" placeholder="Your Email" [(ngModel)]="email" />
            </div>
            <div class="field-wrap msg-wrap">
              <span class="field-icon top">💬</span>
              <textarea class="field" placeholder="Your Message" rows="4" [(ngModel)]="message"></textarea>
            </div>
            <button class="send-btn" (click)="send()">
              <span>{{ sent ? 'Message Sent! 🎉' : 'Send Message' }}</span>
              <span *ngIf="!sent" class="send-arrow">→</span>
            </button>
          </div>
          <div class="privacy-note">🔒 We respect your privacy. Your information is safe with us.</div>
        </div>
      </div>
      <!-- Bottom pillars -->
      <div class="contact-pillars">
        <div class="cpillar" *ngFor="let p of pillars">
          <div class="cpillar-icon">{{ p.icon }}</div>
          <div class="cpillar-body">
            <div class="cpillar-title">{{ p.title }}</div>
            <div class="cpillar-text">{{ p.text }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .contact-showcase {
      position: relative;
      overflow: hidden;
      padding: 80px 24px 60px;
      background: linear-gradient(160deg, #f0f4ff 0%, #fafbff 55%, #eef1ff 100%);
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .contact-showcase.is-visible { opacity: 1; transform: none; }
    /* Orbs */
    .orb { position: absolute; border-radius: 50%; filter: blur(55px); opacity: 0.35; pointer-events: none; }
    .orb1 { width: 320px; height: 320px; background: radial-gradient(circle, #c7d7ff, #7ca4ff); top: -100px; left: -80px; animation: orbFloat 8s ease-in-out infinite; }
    .orb2 { width: 220px; height: 220px; background: radial-gradient(circle, #d4b8ff, #9f7cff); bottom: 60px; right: -60px; animation: orbFloat 11s ease-in-out infinite reverse; }
    .orb3 { width: 130px; height: 130px; background: radial-gradient(circle, #ff9fcf, #f472b6); top: 45%; left: 50%; animation: orbFloat 7s ease-in-out infinite 2s; }
    @keyframes orbFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-22px) scale(1.06)} }
    /* Scribbles */
    .scribble {
      position: absolute;
      font-family: 'Caveat', cursive;
      font-size: 14px;
      color: #3159f5;
      line-height: 1.5;
      pointer-events: none;
      opacity: 0.75;
    }
    .scribble-left { top: 80px; left: 32px; transform: rotate(-5deg); }
    .scribble-right { top: 80px; right: 32px; transform: rotate(4deg); text-align: center; }
    /* Paper plane */
    .plane-wrap { position: absolute; top: 45px; right: 120px; pointer-events: none; animation: planeDrift 5s ease-in-out infinite; }
    .paper-plane { width: 52px; height: 52px; filter: drop-shadow(0 4px 10px #3159f535); }
    .plane-trail { width: 120px; height: 60px; position: absolute; top: 10px; right: 40px; }
    @keyframes planeDrift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
    /* Header */
    .contact-header { text-align: center; margin-bottom: 52px; position: relative; z-index: 1; }
    .contact-badge {
      display: inline-block;
      border: 1.5px solid #b4c4f4;
      border-radius: 30px;
      padding: 6px 18px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: #3159f5;
      margin-bottom: 18px;
      background: #fff;
    }
    .contact-title { font: 800 44px/1.1 Manrope; color: #080f2b; margin: 0 0 14px; }
    .grad { background: linear-gradient(135deg, #3159f5, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .contact-sub { font-size: 14px; color: #69708a; line-height: 1.8; }
    /* Main layout */
    .contact-main {
      display: grid;
      grid-template-columns: 1fr 1.1fr 1fr;
      gap: 24px;
      max-width: 1160px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      align-items: center;
    }
    /* Center column */
    .contact-center-col {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    /* Info col */
    .contact-info-col {
      background: #fff;
      border-radius: 24px;
      padding: 32px 28px 24px;
      box-shadow: 0 4px 24px rgba(49,89,245,0.08);
      border: 1px solid #e8edff;
    }
    .info-accent { width: 40px; height: 3px; background: #3159f5; border-radius: 2px; margin-bottom: 18px; }
    .info-title { font: 700 22px/1.2 Manrope; color: #080f2b; margin: 0 0 8px; }
    .info-sub { font-size: 13px; color: #69708a; line-height: 1.7; margin-bottom: 24px; }
    .info-list { display: flex; flex-direction: column; gap: 18px; }
    .info-item { display: flex; gap: 14px; align-items: flex-start; }
    .info-icon {
      width: 40px; height: 40px; border-radius: 50%;
      background: #f0f4ff;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
    }
    .info-label { font: 700 13px Manrope; color: #080f2b; margin-bottom: 2px; }
    .info-val { font-size: 12px; color: #69708a; line-height: 1.6; }
    .social-row { display: flex; align-items: center; gap: 10px; margin: 22px 0 0; }
    .social-label { font: 700 12px Manrope; color: #080f2b; }
    .social-btn {
      width: 34px; height: 34px; border-radius: 8px;
      border: 1px solid #dde4f5;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: #3159f5;
      text-decoration: none;
      transition: background 0.2s, color 0.2s;
    }
    .social-btn:hover { background: #3159f5; color: #fff; }
    /* Map blob container & Floating chips */
    .map-blob-container {
      position: relative;
      width: 100%;
      max-width: 320px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .map-blob {
      width: 290px;
      height: 290px;
      background: linear-gradient(135deg, #dbe7ff 0%, #c4d7ff 50%, #ebf2ff 100%);
      border-radius: 42px;
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 24px;
      box-shadow: 0 16px 44px rgba(49, 89, 245, 0.18);
      overflow: hidden;
      border: 2px solid #ffffff;
    }
    .live-map-iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
      opacity: 0.88;
      border-radius: 40px;
      filter: saturate(1.1) contrast(1.02);
      transition: opacity 0.3s ease;
    }
    .map-blob:hover .live-map-iframe {
      opacity: 1;
    }
    .map-pin-overlay {
      position: absolute;
      top: 36px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 2;
    }
    .map-pin {
      animation: pinBounce 2s ease-in-out infinite;
    }
    .pin-head {
      width: 32px;
      height: 32px;
      background: #2563eb;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      margin: auto;
      box-shadow: 0 6px 16px rgba(37, 99, 235, 0.45);
    }
    .pin-stem {
      width: 4px;
      height: 18px;
      background: #2563eb;
      margin: 2px auto 0;
      border-radius: 0 0 4px 4px;
    }
    @keyframes pinBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-9px); }
    }
    .map-badge {
      position: relative;
      z-index: 3;
      background: linear-gradient(135deg, #4338ca, #6366f1);
      color: #ffffff;
      font: 700 13px Manrope, sans-serif;
      padding: 10px 22px;
      border-radius: 20px;
      text-align: center;
      text-decoration: none;
      box-shadow: 0 6px 20px rgba(67, 56, 202, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.3px;
    }
    .map-badge:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 10px 24px rgba(67, 56, 202, 0.5);
    }
    .float-chip {
      position: absolute;
      background: #ffffff;
      border-radius: 14px;
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 700;
      color: #080f2b;
      box-shadow: 0 6px 20px rgba(49, 89, 245, 0.16);
      white-space: nowrap;
      animation: chipFloat 3.2s ease-in-out infinite;
      z-index: 4;
      border: 1px solid #edf2f7;
    }
    .chip1 { top: -14px; left: -24px; animation-delay: 0s; }
    .chip2 { bottom: 18px; right: -32px; animation-delay: 1.1s; }
    .chip3 { bottom: -14px; left: 6px; animation-delay: 0.6s; }
    @keyframes chipFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    /* Form card */
    .contact-form-card {
      background: #fff;
      border-radius: 24px;
      padding: 32px 28px 24px;
      box-shadow: 0 4px 24px rgba(49,89,245,0.08);
      border: 1px solid #e8edff;
    }
    .form-title { font: 700 22px/1.2 Manrope; color: #080f2b; margin: 18px 0 6px; }
    .form-sub { font-size: 13px; color: #69708a; line-height: 1.6; margin-bottom: 22px; }
    .contact-form { display: flex; flex-direction: column; gap: 14px; }
    .field-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #f5f7ff;
      border-radius: 12px;
      padding: 0 14px;
      border: 1px solid #e8edff;
      transition: border-color 0.2s;
    }
    .field-wrap:focus-within { border-color: #3159f5; }
    .field-wrap.msg-wrap { align-items: flex-start; padding-top: 12px; }
    .field-icon { font-size: 15px; color: #9aabd4; flex-shrink: 0; }
    .field-icon.top { margin-top: 2px; }
    .field {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font: 14px 'DM Sans', sans-serif;
      color: #080f2b;
      padding: 13px 0;
    }
    textarea.field { resize: none; line-height: 1.6; }
    .send-btn {
      background: linear-gradient(135deg, #3159f5, #5b7fff);
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 15px 24px;
      font: 700 14px 'DM Sans';
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 6px 20px #3159f535;
    }
    .send-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px #3159f540; }
    .send-arrow { font-size: 18px; }
    .privacy-note { font-size: 11px; color: #9aabd4; text-align: center; margin-top: 14px; }
    /* Pillars */
    .contact-pillars {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
      max-width: 1080px;
      margin: 40px auto 0;
      position: relative;
      z-index: 1;
    }
    .cpillar {
      background: #fff;
      border-radius: 16px;
      padding: 18px 16px;
      border: 1px solid #e8edff;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      box-shadow: 0 2px 12px rgba(49,89,245,0.06);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cpillar:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(49,89,245,0.12); }
    .cpillar-icon {
      width: 44px; height: 44px;
      background: #f0f4ff;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }
    .cpillar-title { font: 700 13px Manrope; color: #080f2b; margin-bottom: 4px; }
    .cpillar-text { font-size: 11px; color: #69708a; line-height: 1.6; }
    @media (max-width: 1100px) {
      .contact-main { grid-template-columns: 1fr; gap: 36px; }
      .map-blob-container { margin: 20px auto; }
    }
    @media (max-width: 900px) {
      .contact-pillars { grid-template-columns: repeat(2, 1fr); }
      .scribble { display: none; }
      .plane-wrap { display: none; }
    }
    @media (max-width: 500px) {
      .map-blob { width: 260px; height: 260px; }
      .chip1 { left: -10px; }
      .chip2 { right: -15px; }
      .chip3 { left: 0; }
      .contact-pillars { grid-template-columns: 1fr; }
      .contact-title { font-size: 32px; }
    }
  `,
})
export class ContactShowcaseComponent implements AfterViewInit {
  @ViewChild('contactRoot') rootEl!: ElementRef<HTMLElement>;
  isVisible = signal(false);
  pillars = contactPillars;
  name = ''; email = ''; message = ''; sent = false;
  private observer?: IntersectionObserver;
  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { this.isVisible.set(true); this.observer?.disconnect(); } },
      { threshold: 0.1 }
    );
    this.observer.observe(this.rootEl.nativeElement);
  }
  send() {
    if (!this.name || !this.email || !this.message) return;
    this.sent = true;
    setTimeout(() => { this.sent = false; this.name = ''; this.email = ''; this.message = ''; }, 3500);
  }
}
@Component({
  selector: 'app-contact',
  imports: [CommonModule, HeaderComponent, FooterComponent, ContactShowcaseComponent],
  template: `<app-header></app-header>
    <main>
      <app-contact-showcase></app-contact-showcase>
    </main>
    <app-footer></app-footer>`,
  styles: `:host{display:block;animation:pageEnter 0.42s cubic-bezier(0.22,1,0.36,1) both}
           @keyframes pageEnter{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
           @media(prefers-reduced-motion:reduce){:host{animation:none}}`,
})
export class ContactComponent {}
@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, FooterComponent, HomeAboutPreviewComponent, ServicesShowcaseComponent, BlogShowcaseComponent, ContactShowcaseComponent],
  template: `
    <div id="home">
      <header class="one-nav">
        <a href="#home" class="menu-logo" aria-label="Build4Big home"><span class="brand-image"><img src="/build4big-mark.svg" alt="Build4Big 4B logo" /></span><span>Build4Big</span></a>
        <nav><a href="#home">Home</a><a routerLink="/about">About</a><a href="#services">Services</a><a routerLink="/blog">Blog</a><a routerLink="/contact">Contact</a></nav>
        <a href="#contact">Get Started</a>
      </header>
      <!-- Interactive 3D Hero Section matching image -->
      <div class="hero-land-glow" (mousemove)="onHeroMouseMove($event)" (mouseleave)="onHeroMouseLeave()">
        <!-- Dynamic ambient cursor lighting & tech grid -->
        <div class="hero-ambient-lights">
          <div class="ambient-orb orb-cyan" [style.transform]="'translate(' + heroMouseX * -25 + 'px, ' + heroMouseY * -25 + 'px)'"></div>
          <div class="ambient-orb orb-blue" [style.transform]="'translate(' + heroMouseX * 30 + 'px, ' + heroMouseY * 30 + 'px)'"></div>
          <div class="ambient-orb orb-purple" [style.transform]="'translate(' + heroMouseX * -15 + 'px, ' + heroMouseY * 20 + 'px)'"></div>
          <div class="hero-cyber-grid"></div>
          <div class="hero-flow-wave"></div>
        </div>

        <!-- Main Hero Stage: Left Copy & Right 3D Visual -->
        <div class="container hero-interactive-stage">
          <!-- Left Column -->
          <div class="hero-text-col" [style.transform]="'translate3d(' + heroMouseX * 10 + 'px, ' + heroMouseY * 10 + 'px, 0)'">
            <div class="hero-pill-badge">
              <span class="pill-dot"></span>
              <span>Innovate</span>
              <span class="pill-sep">•</span>
              <span>Build</span>
              <span class="pill-sep">•</span>
              <span>Grow</span>
            </div>

            <h1 class="hero-headline">
              Transforming<br />
              Ideas into<br />
              <span class="text-gradient">Digital Reality</span>
            </h1>

            <p class="hero-subtext">
              We are a startup software company helping businesses build modern digital products, websites, mobile apps and automation systems.
            </p>

            <div class="hero-cta-btns">
              <a href="#contact" class="btn-hero-gradient">Get Started →</a>
              <a href="#about" class="btn-hero-glass">
                <span class="play-arrow">▷</span> Watch Our Story
              </a>
            </div>
          </div>

          <!-- Right Column: 3D Holographic Sphere with Floating Glass Cards -->
          <div class="hero-visual-col" [style.transform]="'perspective(1000px) rotateY(' + heroMouseX * 12 + 'deg) rotateX(' + heroMouseY * -12 + 'deg)'">
            <!-- Central Holographic Globe & Orbits -->
            <div class="globe-system-wrap">
              <div class="orbit-ring ring-1"></div>
              <div class="orbit-ring ring-2"></div>
              <div class="orbit-ring ring-3"></div>

              <div class="hologram-globe">
                <div class="globe-energy-grid"></div>
                <!-- Original Build4Big 3D Brand Logo Inside Globe -->
                <div class="globe-core-mark">
                  <img src="build4big-logo-cutout.png" alt="Build4Big 4B" class="mark-img-4b" />
                </div>
              </div>


              <!-- Satellite Radar Nodes -->
              <div class="orbit-node node-1" title="Targeted Solutions">🎯</div>
              <div class="orbit-node node-2" title="Automation">⚙️</div>
              <div class="orbit-node node-3" title="Security">🛡️</div>
              <div class="orbit-node node-4" title="Growth Analytics">📈</div>
            </div>

            <!-- Floating Glass Card 1: AI Solutions -->
            <div class="glass-chip chip-ai" [style.transform]="'translate3d(' + heroMouseX * -18 + 'px, ' + heroMouseY * -18 + 'px, 35px)'">
              <div class="chip-icon icon-bulb">💡</div>
              <div class="chip-text">
                <strong>AI Solutions</strong>
                <small>Turn Ideas into Intelligence</small>
              </div>
            </div>

            <!-- Floating Glass Card 2: Product Innovation -->
            <div class="glass-chip chip-innovation" [style.transform]="'translate3d(' + heroMouseX * 20 + 'px, ' + heroMouseY * -15 + 'px, 45px)'">
              <div class="chip-icon icon-rocket">🚀</div>
              <div class="chip-text">
                <strong>Product Innovation</strong>
                <small>Build What Matters</small>
              </div>
            </div>

            <!-- Floating Glass Card 3: Business Strategy -->
            <div class="glass-chip chip-strategy" [style.transform]="'translate3d(' + heroMouseX * -22 + 'px, ' + heroMouseY * 18 + 'px, 30px)'">
              <div class="chip-icon icon-bar">📊</div>
              <div class="chip-text">
                <strong>Business Strategy</strong>
                <small>Plan for a Bigger Future</small>
              </div>
            </div>

            <!-- Floating Glass Card 4: Dedicated Support -->
            <div class="glass-chip chip-support" [style.transform]="'translate3d(' + heroMouseX * 18 + 'px, ' + heroMouseY * 22 + 'px, 25px)'">
              <div class="chip-icon icon-users">👥</div>
              <div class="chip-text">
                <strong>Dedicated Support</strong>
                <small>Your Growth Our Priority</small>
              </div>
            </div>

            <!-- Handwritten Script Badge ("Ideas Build Better Tomorrows") -->
            <div class="script-badge-quote" [style.transform]="'translate3d(' + heroMouseX * 8 + 'px, ' + heroMouseY * 8 + 'px, 0)'">
              <span>Ideas</span>
              <span>Build</span>
              <span>Better</span>
              <span>Tomorrows</span>
              <svg class="quote-underline" width="95" height="20" viewBox="0 0 100 20" fill="none">
                <path d="M5 14C30 3 70 3 95 14" stroke="#4fc3f7" stroke-width="2.4" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Bottom Glass Workflow Process Bar -->
        <div class="container hero-workflow-container">
          <div class="hero-workflow-bar">
            <!-- Step 1 -->
            <div class="workflow-item">
              <div class="wf-icon">💡</div>
              <div class="wf-content">
                <span class="wf-index">01</span>
                <strong class="wf-title">Innovate</strong>
                <span class="wf-sub">Turn Ideas into Solutions</span>
              </div>
            </div>
            <div class="wf-sep"></div>

            <!-- Step 2 -->
            <div class="workflow-item">
              <div class="wf-icon code-style">&lt;/&gt;</div>
              <div class="wf-content">
                <span class="wf-index">02</span>
                <strong class="wf-title">Build</strong>
                <span class="wf-sub">Modern Digital Products</span>
              </div>
            </div>
            <div class="wf-sep"></div>

            <!-- Step 3 -->
            <div class="workflow-item">
              <div class="wf-icon">🚀</div>
              <div class="wf-content">
                <span class="wf-index">03</span>
                <strong class="wf-title">Deliver</strong>
                <span class="wf-sub">Real Business Impact</span>
              </div>
            </div>
            <div class="wf-sep"></div>

            <!-- Step 4 -->
            <div class="workflow-item">
              <div class="wf-icon">📈</div>
              <div class="wf-content">
                <span class="wf-index">04</span>
                <strong class="wf-title">Grow</strong>
                <span class="wf-sub">Together for a Better Tomorrow</span>
              </div>
            </div>

            <!-- Scroll to Explore -->
            <a href="#services" class="wf-scroll-indicator" aria-label="Scroll to Explore">
              <div class="mouse-shape">
                <span class="mouse-dot"></span>
              </div>
              <span class="scroll-label">Scroll to Explore</span>
              <span class="scroll-arrow">⌄</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <app-home-about-preview></app-home-about-preview>
    <section id="services" class="landing-services-wrap">
      <app-services-showcase></app-services-showcase>
    </section>
    <section id="blog" class="landing-blog-wrap">
      <app-blog-showcase></app-blog-showcase>
    </section>
    <section id="contact" class="landing-contact-wrap">
      <app-contact-showcase></app-contact-showcase>
    </section>
    <app-footer></app-footer>
  `,
  styles: `
    .one-nav{height:76px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 max(24px,calc((100vw - 1120px)/2));background:#fff;position:sticky;top:0;z-index:9}.one-nav>a{font:800 16px Manrope;color:#080f2b;text-decoration:none}.one-nav>a:last-child{background:#3159f5;color:#fff;padding:12px 18px;border-radius:10px;font:700 12px 'DM Sans'}.one-nav nav{display:flex;gap:18px}.one-nav nav a{font-size:12px;font-weight:700;color:#111936;text-decoration:none}.one-nav nav a:hover{color:#3159f5}

    /* Interactive 3D Hero Section matching image */
    .hero-land-glow {
      position: relative;
      background: radial-gradient(circle at 75% 40%, #092265 0%, #030d30 45%, #010619 100%);
      color: #ffffff;
      padding: 50px 0 45px;
      overflow: hidden;
      min-height: calc(100vh - 76px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Ambient Cursor Lighting & Background Grid */
    .hero-ambient-lights {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }
    .ambient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(95px);
      opacity: 0.5;
      transition: transform 0.22s cubic-bezier(0.1, 0.9, 0.2, 1);
    }
    .orb-cyan {
      top: -10%;
      left: 22%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(0, 150, 255, 0.45), transparent 70%);
    }
    .orb-blue {
      top: 10%;
      right: -8%;
      width: 650px;
      height: 650px;
      background: radial-gradient(circle, rgba(0, 190, 255, 0.35), rgba(79, 70, 229, 0.25) 50%, transparent 75%);
    }
    .orb-purple {
      bottom: -15%;
      left: -5%;
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.3), transparent 70%);
    }
    .hero-cyber-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 55px 55px;
      opacity: 0.75;
    }
    .hero-flow-wave {
      position: absolute;
      bottom: -40px;
      left: 0;
      width: 100%;
      height: 380px;
      background: radial-gradient(ellipse at 50% 100%, rgba(0, 140, 255, 0.2), transparent 70%);
      opacity: 0.85;
    }

    /* Main Stage Layout */
    .hero-interactive-stage {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1.05fr 1.15fr;
      align-items: center;
      gap: 36px;
      width: 100%;
      margin: auto 0;
    }

    /* Left Text Column */
    .hero-text-col {
      transition: transform 0.2s cubic-bezier(0.1, 0.9, 0.2, 1);
    }
    .hero-pill-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(0, 70, 180, 0.32);
      border: 1px solid rgba(0, 180, 255, 0.4);
      padding: 6px 18px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 700;
      color: #cde6ff;
      margin-bottom: 22px;
      box-shadow: 0 0 20px rgba(0, 130, 255, 0.25);
    }
    .pill-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00e1ff;
      box-shadow: 0 0 10px #00e1ff;
    }
    .pill-sep {
      color: rgba(255, 255, 255, 0.35);
    }
    .hero-headline {
      font: 800 60px/1.08 Manrope, sans-serif;
      letter-spacing: -0.035em;
      color: #ffffff;
      margin: 0 0 20px;
      text-shadow: 0 4px 28px rgba(0, 0, 0, 0.5);
    }
    .text-gradient {
      background: linear-gradient(135deg, #00e1ff 0%, #3a88ff 50%, #9066ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline-block;
    }
    .hero-subtext {
      font-size: 16px;
      line-height: 1.75;
      color: #a7bedd;
      max-width: 500px;
      margin: 0 0 32px;
    }
    .hero-cta-btns {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .btn-hero-gradient {
      background: linear-gradient(135deg, #0066ff, #00b4ff);
      color: #ffffff;
      font: 700 15px Manrope, sans-serif;
      padding: 14px 28px;
      border-radius: 28px;
      text-decoration: none;
      box-shadow: 0 8px 30px rgba(0, 110, 255, 0.55);
      transition: all 0.25s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-hero-gradient:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 38px rgba(0, 160, 255, 0.75);
    }
    .btn-hero-glass {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.22);
      backdrop-filter: blur(12px);
      color: #ffffff;
      font: 700 15px Manrope, sans-serif;
      padding: 14px 26px;
      border-radius: 28px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: all 0.25s ease;
    }
    .btn-hero-glass:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(0, 190, 255, 0.5);
      transform: translateY(-3px);
    }
    .play-arrow {
      color: #00e1ff;
      font-size: 13px;
    }

    /* Right Visual Column */
    .hero-visual-col {
      position: relative;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-style: preserve-3d;
      transition: transform 0.2s cubic-bezier(0.1, 0.9, 0.2, 1);
    }

    /* Globe & Holographic Orbits */
    .globe-system-wrap {
      position: relative;
      width: 320px;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .orbit-ring {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    .ring-1 {
      width: 440px;
      height: 230px;
      transform: rotate(-24deg);
      border: 1px dashed rgba(0, 200, 255, 0.4);
      animation: orbitSpinRing1 22s linear infinite;
    }
    .ring-2 {
      width: 450px;
      height: 200px;
      transform: rotate(34deg);
      border: 1px dashed rgba(100, 130, 255, 0.4);
      animation: orbitSpinRing2 28s linear infinite reverse;
    }
    .ring-3 {
      width: 370px;
      height: 370px;
      border: 1px solid rgba(0, 220, 255, 0.22);
      animation: pulseGlobeGlow 4s ease-in-out infinite;
    }
    @keyframes orbitSpinRing1 {
      from { transform: rotate(-24deg) rotate(0deg); }
      to { transform: rotate(-24deg) rotate(360deg); }
    }
    @keyframes orbitSpinRing2 {
      from { transform: rotate(34deg) rotate(0deg); }
      to { transform: rotate(34deg) rotate(360deg); }
    }
    @keyframes pulseGlobeGlow {
      0%, 100% { transform: scale(1); opacity: 0.45; }
      50% { transform: scale(1.05); opacity: 0.75; }
    }

    .hologram-globe {
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #00a8ff 0%, #0047cc 45%, #021142 85%);
      box-shadow: 
        0 0 55px rgba(0, 160, 255, 0.7),
        inset 0 0 45px rgba(0, 220, 255, 0.75),
        inset -10px -10px 40px rgba(0, 20, 80, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      animation: globeDrift 5s ease-in-out infinite;
    }
    .globe-energy-grid {
      position: absolute;
      inset: -50%;
      background: conic-gradient(from 0deg at 50% 50%, rgba(0, 220, 255, 0.45) 0deg, transparent 60deg, transparent 300deg, rgba(0, 220, 255, 0.45) 360deg);
      animation: sweepRadar 8s linear infinite;
      pointer-events: none;
    }
    @keyframes sweepRadar {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes globeDrift {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-9px) scale(1.02); }
    }

    .globe-core-mark {
      position: relative;
      z-index: 2;
      width: 125px;
      height: 125px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: markBob 4s ease-in-out infinite;
    }
    .mark-img-4b {
      width: 140px;
      height: 140px;
      object-fit: contain;
      filter: drop-shadow(0 0 25px rgba(0, 210, 255, 0.85)) drop-shadow(0 0 10px rgba(0, 102, 255, 0.9));
      user-select: none;
      pointer-events: none;
    }
    @keyframes markBob {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-5px) scale(1.04); }
    }

    /* Satellite Mini Radar Nodes */
    .orbit-node {
      position: absolute;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(6, 24, 78, 0.88);
      border: 1px solid rgba(0, 200, 255, 0.55);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      box-shadow: 0 0 16px rgba(0, 180, 255, 0.45);
      z-index: 3;
      animation: nodeFloat 3.5s ease-in-out infinite;
    }
    .node-1 { top: 10px; left: 60px; animation-delay: 0.2s; }
    .node-2 { top: 25px; right: 35px; animation-delay: 1.1s; }
    .node-3 { bottom: 30px; left: 45px; animation-delay: 0.7s; }
    .node-4 { bottom: 35px; right: 45px; animation-delay: 1.6s; }
    @keyframes nodeFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-7px); }
    }

    /* Floating Glass Cards */
    .glass-chip {
      position: absolute;
      background: rgba(8, 26, 78, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid rgba(0, 180, 255, 0.35);
      border-radius: 20px;
      padding: 15px 18px;
      display: flex;
      align-items: center;
      gap: 13px;
      min-width: 215px;
      box-shadow: 
        0 14px 35px rgba(0, 10, 45, 0.65),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
      z-index: 4;
      cursor: default;
      transition: transform 0.22s cubic-bezier(0.1, 0.9, 0.2, 1), box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .glass-chip:hover {
      border-color: #00e1ff;
      box-shadow: 
        0 18px 45px rgba(0, 140, 255, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    .chip-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      flex-shrink: 0;
    }
    .icon-bulb {
      background: linear-gradient(135deg, rgba(140, 70, 255, 0.4), rgba(80, 20, 200, 0.2));
      border: 1px solid rgba(170, 100, 255, 0.5);
      box-shadow: 0 0 14px rgba(150, 70, 255, 0.4);
    }
    .icon-rocket {
      background: linear-gradient(135deg, rgba(0, 140, 255, 0.4), rgba(0, 70, 180, 0.2));
      border: 1px solid rgba(0, 180, 255, 0.5);
      box-shadow: 0 0 14px rgba(0, 150, 255, 0.4);
    }
    .icon-bar {
      background: linear-gradient(135deg, rgba(0, 220, 255, 0.4), rgba(0, 120, 180, 0.2));
      border: 1px solid rgba(0, 220, 255, 0.5);
      box-shadow: 0 0 14px rgba(0, 220, 255, 0.4);
    }
    .icon-users {
      background: linear-gradient(135deg, rgba(90, 100, 255, 0.4), rgba(50, 60, 190, 0.2));
      border: 1px solid rgba(120, 130, 255, 0.5);
      box-shadow: 0 0 14px rgba(100, 110, 255, 0.4);
    }
    .chip-text {
      display: flex;
      flex-direction: column;
    }
    .chip-text strong {
      font: 700 14.5px Manrope, sans-serif;
      color: #ffffff;
      margin-bottom: 2px;
    }
    .chip-text small {
      font-size: 11.5px;
      color: #a8c2ea;
      line-height: 1.35;
    }

    .chip-ai { top: 25px; left: 10px; }
    .chip-innovation { top: 35px; right: 0; }
    .chip-strategy { bottom: 55px; left: 5px; }
    .chip-support { bottom: 70px; right: 15px; }

    /* Quote Badge */
    .script-badge-quote {
      position: absolute;
      right: 30px;
      bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: 'Caveat', cursive;
      font-size: 20px;
      line-height: 1.15;
      color: #bde4ff;
      transform: rotate(5deg);
      pointer-events: none;
      text-shadow: 0 0 10px rgba(0, 190, 255, 0.6);
    }
    .quote-underline {
      margin-top: -2px;
      filter: drop-shadow(0 0 6px #00d2ff);
    }

    /* Bottom Workflow Bar */
    .hero-workflow-container {
      position: relative;
      z-index: 5;
      width: 100%;
      margin-top: 15px;
    }
    .hero-workflow-bar {
      background: rgba(5, 18, 56, 0.72);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 170, 255, 0.3);
      border-radius: 24px;
      padding: 16px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      box-shadow: 0 16px 40px rgba(1, 6, 24, 0.65);
    }
    .workflow-item {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
    }
    .wf-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(0, 110, 255, 0.18);
      border: 1px solid rgba(0, 180, 255, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      color: #00d2ff;
      flex-shrink: 0;
      box-shadow: 0 0 12px rgba(0, 140, 255, 0.25);
    }
    .wf-icon.code-style {
      font-family: monospace;
      font-weight: 800;
      font-size: 15px;
      letter-spacing: -1px;
    }
    .wf-content {
      display: flex;
      flex-direction: column;
    }
    .wf-index {
      font-size: 11px;
      font-weight: 700;
      color: #4fc3f7;
      letter-spacing: 0.5px;
    }
    .wf-title {
      font: 700 14px Manrope, sans-serif;
      color: #ffffff;
      margin: 1px 0;
    }
    .wf-sub {
      font-size: 11.5px;
      color: #8ca3c8;
      white-space: nowrap;
    }
    .wf-sep {
      width: 1px;
      height: 38px;
      background: rgba(255, 255, 255, 0.12);
    }

    /* Scroll Indicator */
    .wf-scroll-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      padding-left: 10px;
      color: #8ba8d4;
      transition: color 0.2s ease;
    }
    .wf-scroll-indicator:hover {
      color: #00d2ff;
    }
    .mouse-shape {
      width: 18px;
      height: 28px;
      border: 2px solid currentColor;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      padding-top: 5px;
    }
    .mouse-dot {
      width: 3px;
      height: 6px;
      background: currentColor;
      border-radius: 2px;
      animation: wheelBounce 1.6s ease-in-out infinite;
    }
    .scroll-label {
      font-size: 10.5px;
      font-weight: 600;
      white-space: nowrap;
    }
    .scroll-arrow {
      font-size: 12px;
      margin-top: -3px;
      animation: arrowBounce 1.6s ease-in-out infinite;
    }
    @keyframes arrowBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(3px); }
    }

    /* Responsiveness */
    @media (max-width: 1180px) {
      .hero-workflow-bar {
        flex-wrap: wrap;
        gap: 20px;
      }
      .wf-sep { display: none; }
      .workflow-item { min-width: 45%; }
      .wf-scroll-indicator { width: 100%; flex-direction: row; justify-content: center; margin-top: 8px; }
    }
    @media (max-width: 980px) {
      .hero-interactive-stage {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .hero-subtext { margin: 0 auto 32px; }
      .hero-cta-btns { justify-content: center; }
      .hero-visual-col { height: 460px; margin-top: 15px; }
      .chip-ai { left: 0; }
      .chip-innovation { right: 0; }
      .chip-strategy { left: 0; }
      .chip-support { right: 0; }
    }
    @media (max-width: 768px) {
      .hero-headline { font-size: 38px; }
      .hero-visual-col { height: 390px; transform: none !important; }
      .hologram-globe { width: 220px; height: 220px; }
      .glass-chip { min-width: 155px; padding: 10px 14px; }
      .glass-chip strong { font-size: 12.5px; }
      .glass-chip small { display: none; }
      .chip-icon { width: 34px; height: 34px; font-size: 16px; }
      .workflow-item { min-width: 100%; }
    }

    /* Remaining Section Styles */
    .landing-section,
    .landing-services-wrap,
    .landing-blog-wrap {
      scroll-margin-top: 76px;
    }
    .landing-section {
      padding: 85px 0;
    }
    .light {
      background: #f6f8ff;
    }
    .split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 70px;
      align-items: center;
      max-width: 930px;
    }
    .split h2,
    .heading h2 {
      font: 800 40px/1.15 Manrope;
      margin: 13px 0;
    }
    .split p,
    .heading p,
    .tiles p {
      font-size: 13px;
      color: #69708a;
      line-height: 1.8;
    }
    .idea-box,
    .person {
      min-height: 260px;
      border-radius: 20px;
      background: #dce5ff;
      display: grid;
      place-content: center;
      text-align: center;
      font: 800 28px/1.25 Manrope;
    }
    .idea-box b {
      color: #3159f5;
    }
    .metrics {
      margin-top: 50px;
      max-width: 930px;
      background: #080f2b;
      color: white;
      padding: 22px 30px;
      border-radius: 15px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    .metrics b {
      font: 800 23px Manrope;
    }
    .metrics small {
      display: block;
      color: #c5cce6;
      font: 11px 'DM Sans';
      margin-top: 4px;
    }
    .heading {
      text-align: center;
      max-width: 700px;
      margin: 0 auto 42px;
    }
    .tiles {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      max-width: 900px;
    }
    .tiles article {
      background: #fff;
      border: 1px solid #e8ebf5;
      border-radius: 16px;
      padding: 26px;
    }
    .tiles i {
      font-style: normal;
      color: #3159f5;
      font-size: 20px;
    }
    .tiles h3 {
      font-size: 17px;
      margin: 18px 0 7px;
    }
    .list {
      display: flex;
      gap: 13px;
      margin: 16px 0;
      color: #69708a;
      font-size: 12px;
    }
    .list b {
      color: #3159f5;
      font-size: 22px;
    }
    .list strong {
      display: block;
      color: #080f2b;
      font-size: 13px;
    }
    .robot {
      height: 290px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #2d57ed, #e6ecff 47%);
      font-size: 34px;
      padding-top: 96px;
      text-align: center;
      letter-spacing: 18px;
    }
    .robot span {
      display: block;
      margin: 28px auto;
      color: #071337;
      background: #a9b9ee;
      width: 100px;
      height: 90px;
      padding: 25px;
      border-radius: 40px;
      letter-spacing: 0;
    }
    .benefits {
      padding: 16px;
      background: #e9edff;
      color: #3159f5;
      font-size: 12px;
      line-height: 2.5;
      border-radius: 12px;
    }
    .person {
      font-size: 150px;
    }
    .blogtiles img {
      width: 100%;
      height: 145px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 13px;
    }
    .blogtiles small,
    .blogtiles a {
      font-size: 11px;
      color: #3159f5;
    }
    .contact p {
      line-height: 2;
      font-size: 13px;
    }
    .form {
      display: grid;
      gap: 12px;
      background: white;
      padding: 25px;
      border-radius: 16px;
    }
    .form input,
    .form textarea {
      border: 0;
      background: #f4f6fc;
      padding: 13px;
      border-radius: 8px;
    }
    .form textarea {
      height: 100px;
    }
    .form button {
      background: #3159f5;
      color: white;
      border: 0;
      padding: 13px;
      border-radius: 8px;
      font-weight: bold;
    }
    @media (max-width: 700px) {
      .split {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      .tiles {
        grid-template-columns: 1fr;
      }
      .metrics {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
      .split h2,
      .heading h2 {
        font-size: 31px;
      }
    }
  `,
})
export class LandingComponent {
  services = services;
  posts = posts;

  // Interactive mouse move parallax state
  heroMouseX = 0;
  heroMouseY = 0;

  onHeroMouseMove(e: MouseEvent): void {
    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;
    this.heroMouseX = (e.clientX - width / 2) / (width / 2);
    this.heroMouseY = (e.clientY - height / 2) / (height / 2);
  }

  onHeroMouseLeave(): void {
    this.heroMouseX = 0;
    this.heroMouseY = 0;
  }
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `<app-header></app-header><router-outlet></router-outlet><app-footer></app-footer>`,
})
export class AppComponent {}
const simple = (kind: string, label: string, title: string, intro: string) => ({
  path: kind,
  component: SimpleComponent,
  data: { kind, label, title, intro },
});
export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'ai-solutions', redirectTo: 'services' },
  { path: 'contact', component: ContactComponent },
  { path: 'careers', redirectTo: '' },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: '**', redirectTo: '' },
];
