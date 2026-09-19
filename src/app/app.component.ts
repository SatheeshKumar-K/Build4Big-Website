import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Router,
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
  imports: [],
  template: `<header>
    <a href="#home" (click)="scrollTo('home', $event)" class="logo header-logo" aria-label="Build4Big home">
      <span class="brand-image"><img src="build4big-logo-cutout.png" alt="Build4Big" /></span>
      <span class="brand-title">Build4Big</span>
    </a>
    <button class="menu" (click)="open.set(!open())" aria-label="Toggle navigation">
      {{ open() ? '✕' : '☰' }}
    </button>
    <nav [class.show]="open()">
      <a
        href="#home"
        [class.active]="activeSection() === 'home'"
        (click)="scrollTo('home', $event)"
        >Home</a
      >
      <a
        href="#about"
        [class.active]="activeSection() === 'about'"
        (click)="scrollTo('about', $event)"
        >About</a
      >
      <a
        href="#services"
        [class.active]="activeSection() === 'services'"
        (click)="scrollTo('services', $event)"
        >Product</a
      >
      <a
        href="#solutions"
        [class.active]="activeSection() === 'solutions'"
        (click)="scrollTo('solutions', $event)"
        >Solutions</a
      >
      <!-- <a
        href="#blog"
        [class.active]="activeSection() === 'blog'"
        (click)="scrollTo('blog', $event)"
        >Blog</a
      > -->
      <a
        href="#contact"
        [class.active]="activeSection() === 'contact'"
        (click)="scrollTo('contact', $event)"
        >Contact</a
      >
      <a
        href="#contact"
        class="start-btn-mobile"
        (click)="scrollTo('contact', $event)"
        >Get Started &rarr;</a
      >
    </nav>
    <a href="#contact" (click)="scrollTo('contact', $event)" class="start-btn">Get Started &rarr;</a>
  </header>`,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      width: 100%;
    }
    header {
      height: 76px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 32px;
      color: #ffffff;
      box-sizing: border-box;
    }
    .logo {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .brand-title {
      font-weight: 800;
      font-family: 'Manrope', sans-serif;
      font-size: 22px;
      letter-spacing: -0.03em;
      color: #ffffff !important;
    }
    nav {
      display: flex;
      align-items: center;
      gap: 30px;
      margin-left: auto;
      margin-right: 32px;
      font-size: 15px;
      font-weight: 600;
      font-family: 'DM Sans', sans-serif;
    }
    nav a {
      color: #9cb3d5;
      text-decoration: none;
      padding: 10px 0;
      position: relative;
      transition: color 0.22s ease;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }
    nav a:hover {
      color: #ffffff;
    }
    nav a.active {
      color: #ffffff;
      font-weight: 700;
    }
    nav a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2.5px;
      background: linear-gradient(90deg, #00d2ff, #0066ff);
      border-radius: 4px;
      box-shadow: 0 0 10px rgba(0, 210, 255, 0.7);
    }
    .start-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      background: linear-gradient(135deg, #0062ff 0%, #00c6ff 100%);
      color: #ffffff !important;
      padding: 10px 24px;
      border-radius: 25px;
      text-decoration: none;
      white-space: nowrap;
      flex-shrink: 0;
      box-shadow: 0 4px 18px rgba(0, 110, 255, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
    }
    .start-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 198, 255, 0.5);
      filter: brightness(1.08);
    }
    .menu {
      display: none;
      background: none;
      border: 0;
      font-size: 26px;
      color: #ffffff;
      margin-left: auto;
      cursor: pointer;
      padding: 6px 10px;
    }
    .start-btn-mobile {
      display: none;
    }
    @media (max-width: 1024px) {
      nav {
        gap: 20px;
        margin-right: 22px;
      }
      .start-btn {
        padding: 9px 18px;
        font-size: 13.5px;
      }
    }
    @media (max-width: 860px) {
      header {
        height: 68px;
        padding: 0 20px;
      }
      .brand-title {
        font-size: 19px;
      }
      .start-btn {
        display: none;
      }
      .start-btn-mobile {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-align: center;
        margin-top: 8px;
        padding: 12px 20px;
        border-radius: 25px;
        background: linear-gradient(135deg, #0062ff 0%, #00c6ff 100%);
        color: #ffffff !important;
        font-weight: 700;
        font-size: 15px;
        box-shadow: 0 4px 18px rgba(0, 110, 255, 0.4);
      }
      .menu {
        display: block;
      }
      nav {
        display: none;
        position: absolute;
        z-index: 1001;
        top: 68px;
        left: 16px;
        right: 16px;
        margin: 0;
        padding: 20px 24px;
        background: #061138;
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #ffffff;
        border-radius: 16px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      nav.show {
        display: flex;
      }
      nav a {
        color: #b2c5e5;
        font-size: 16px;
        width: 100%;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      nav a:last-child {
        border-bottom: none;
      }
      nav a.active {
        color: #00d2ff;
      }
      nav a.active::after {
        display: none;
      }
    }
  `,
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  open = signal(false);
  activeSection = signal('home');
  private router = inject(Router);
  private scrollListener?: () => void;

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const updateActive = () => {
        const sections = ['home', 'about', 'services', 'solutions', 'contact'];
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        const triggerPos = currentScrollY + 140;
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el) {
            const top = el.getBoundingClientRect().top + currentScrollY;
            if (top <= triggerPos) {
              this.activeSection.set(sections[i]);
              return;
            }
          }
        }
        this.activeSection.set('home');
      };

      this.scrollListener = updateActive;
      window.addEventListener('scroll', updateActive, { passive: true });
      updateActive();
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined' && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  scrollTo(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.open.set(false);
    this.activeSection.set(sectionId);

    const performScroll = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        const headerEl = document.querySelector('app-header header, app-header, header');
        const headerHeight = headerEl ? (headerEl as HTMLElement).offsetHeight : 76;
        const extraGap = 8;
        const rect = el.getBoundingClientRect();
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        const top = rect.top + currentScrollY;
        const targetScrollY = Math.max(0, Math.round(top - (headerHeight + extraGap)));

        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });

        if (typeof history !== 'undefined' && history.pushState) {
          history.pushState(null, '', '#' + id);
        }
      }
    };

    const el = document.getElementById(sectionId);
    if (el) {
      performScroll(sectionId);
    } else {
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => {
          performScroll(sectionId);
        }, 120);
      });
    }
  }
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
          <a href="#home" (click)="scrollTo('home', $event)">Home</a>
          <a href="#about" (click)="scrollTo('about', $event)">About Us</a>
          <a href="#services" (click)="scrollTo('services', $event)">Product</a>
          <a href="#solutions" (click)="scrollTo('solutions', $event)">Solutions</a>
          <!-- <a href="#blog" (click)="scrollTo('blog', $event)">Blog</a> -->
          <a href="#contact" (click)="scrollTo('contact', $event)">Contact</a>
        </nav>
      </section>
      <section>
        <h4>Our Services</h4>
        <nav class="foot-nav">
          <a href="#services" (click)="scrollTo('services', $event)">Web Development</a>
          <a href="#services" (click)="scrollTo('services', $event)">Mobile Apps</a>
          <a href="#services" (click)="scrollTo('services', $event)">Software Development</a>
          <a href="#services" (click)="scrollTo('services', $event)">UI/UX Design</a>
          <a href="#services" (click)="scrollTo('services', $event)">Automation</a>
          <a href="#services" (click)="scrollTo('services', $event)">IT Consulting</a>
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
    @media (max-width: 960px) {
      .foot {
        grid-template-columns: repeat(2, 1fr);
        gap: 32px;
      }
    }
    @media (max-width: 580px) {
      .foot {
        grid-template-columns: 1fr;
        gap: 28px;
      }
      .foot section:first-child {
        grid-column: span 1;
      }
      .copyright span {
        float: none;
        display: block;
        margin-top: 8px;
      }
    }
  `,
})
export class FooterComponent {
  private router = inject(Router);

  scrollTo(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const performScroll = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        const headerEl = document.querySelector('app-header header, app-header, header');
        const headerHeight = headerEl ? (headerEl as HTMLElement).offsetHeight : 76;
        const extraGap = 8;
        const rect = el.getBoundingClientRect();
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        const top = rect.top + currentScrollY;
        const targetScrollY = Math.max(0, Math.round(top - (headerHeight + extraGap)));

        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });

        if (typeof history !== 'undefined' && history.pushState) {
          history.pushState(null, '', '#' + id);
        }
      }
    };

    const el = document.getElementById(sectionId);
    if (el) {
      performScroll(sectionId);
    } else {
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => {
          performScroll(sectionId);
        }, 120);
      });
    }
  }
}
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
  imports: [CommonModule],
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
              <a *ngIf="isCenter(i)" href="#contact" class="btn-learn-more">
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
      padding: 32px 16px 44px;
      background: radial-gradient(circle at 18% 20%, #eef5ff 0%, transparent 42%),
                  radial-gradient(circle at 82% 80%, #f5edff 0%, transparent 45%),
                  #f8faff;
      color: #080f2b;
      min-height: 100vh;
      box-sizing: border-box;
    }

    /* Ambient decorative orbs */
    .ambient-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
    }
    .orb-tl {
      top: 30px;
      left: 18%;
      width: 18px;
      height: 18px;
      background: #3b82f6;
      opacity: 0.7;
      box-shadow: 0 0 25px #3b82f6;
      animation: floatOrb 6s ease-in-out infinite alternate;
    }
    .orb-tr {
      top: 140px;
      right: 5%;
      width: 26px;
      height: 26px;
      background: linear-gradient(135deg, #a855f7, #6366f1);
      opacity: 0.6;
      box-shadow: 0 0 35px #a855f7;
      animation: floatOrb 7s 1s ease-in-out infinite alternate-reverse;
    }
    .orb-bl {
      bottom: 120px;
      left: 3%;
      width: 12px;
      height: 12px;
      background: #8b5cf6;
      opacity: 0.6;
      animation: floatOrb 5s 2s ease-in-out infinite alternate;
    }
    .orb-br {
      bottom: 110px;
      right: 25%;
      width: 14px;
      height: 14px;
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
      font-size: 24px;
      font-weight: 700;
      color: #2563eb;
      line-height: 1.05;
      white-space: nowrap;
    }
    .scribble-tl {
      top: 85px;
      left: 3.5%;
      transform: rotate(-14deg);
    }
    .scribble-tl .scribble-arrow {
      width: 52px;
      height: 52px;
      margin-top: -6px;
      margin-left: 24px;
    }
    .scribble-tr {
      top: 65px;
      right: 6%;
      transform: rotate(-10deg);
    }
    .scribble-tr .scribble-arrow {
      width: 68px;
      height: 28px;
      margin-top: 4px;
    }
    .scribble-br {
      bottom: 80px;
      right: 4%;
      transform: rotate(-10deg);
    }
    .scribble-br .scribble-arrow {
      width: 48px;
      height: 48px;
      margin-top: 2px;
      margin-left: 16px;
    }

    /* Showcase Head */
    .showcase-head {
      text-align: center;
      max-width: 820px;
      margin: 0 auto 12px;
      position: relative;
      z-index: 3;
    }
    .services-pill-badge {
      display: inline-flex;
      align-items: center;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #2563eb;
      background: #eef4ff;
      border: 1.5px solid #c7d8fe;
      border-radius: 9999px;
      padding: 4px 16px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.07);
      margin-bottom: 8px;
    }
    .showcase-title {
      font: 800 clamp(28px, 3.2vw, 40px)/1.15 Manrope, sans-serif;
      letter-spacing: -0.04em;
      margin: 0 0 8px;
      color: #0a1128;
    }
    .gradient-text {
      background: linear-gradient(135deg, #1d68ff 0%, #8b28f8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .showcase-sub {
      font-size: clamp(13px, 1.05vw, 15px);
      color: #55617d;
      line-height: 1.5;
      max-width: 580px;
      margin: 0 auto;
    }

    /* 3D Coverflow Stage */
    .stage-container {
      position: relative;
      max-width: 1240px;
      margin: 10px auto 4px;
      min-height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .coverflow-stage {
      position: relative;
      width: 100%;
      height: 365px;
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
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #2563eb;
      color: #fff;
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 25;
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
      transition: all 0.25s ease;
    }
    .nav-arrow:hover {
      transform: translateY(-50%) scale(1.08);
      background: #1d4ed8;
      box-shadow: 0 10px 24px rgba(37, 99, 235, 0.45);
    }
    .nav-prev {
      left: 14px;
    }
    .nav-next {
      right: 14px;
    }

    /* Service Card */
    .service-card {
      position: absolute;
      width: clamp(230px, 20vw, 275px);
      min-height: 300px;
      max-height: 325px;
      padding: 22px 18px 20px;
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.95);
      box-shadow: 0 14px 36px rgba(22, 45, 96, 0.08);
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
      box-shadow: 0 24px 50px -10px rgba(37, 99, 235, 0.22),
                  0 0 0 1.5px rgba(255, 255, 255, 0.95) inset;
      background: linear-gradient(180deg, #ffffff, #f7faff);
      cursor: default;
    }

    /* Icon Bubble */
    .icon-bubble {
      width: 58px;
      height: 58px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      transition: all 0.35s ease;
    }
    .service-card.is-active .icon-bubble {
      width: 66px;
      height: 66px;
      border-radius: 20px;
      transform: translateY(-2px);
    }

    /* Card Typography */
    .service-card h3 {
      font: 800 18px/1.2 Manrope, sans-serif;
      color: #081236;
      margin: 0 0 8px;
      transition: font-size 0.3s ease;
    }
    .service-card.is-active h3 {
      font-size: 20px;
    }
    .service-card p {
      font-size: 12.5px;
      line-height: 1.5;
      color: #63708f;
      margin: 0 0 14px;
      flex-grow: 1;
      max-width: 220px;
    }

    /* Card Action Buttons */
    .card-action {
      margin-top: auto;
    }
    .btn-learn-more {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: linear-gradient(110deg, #2563eb, #3b82f6);
      color: #ffffff;
      padding: 9px 24px;
      border-radius: 9999px;
      font: 700 13px 'DM Sans', sans-serif;
      text-decoration: none;
      box-shadow: 0 6px 16px rgba(37, 99, 235, 0.32);
      transition: all 0.25s ease;
    }
    .btn-learn-more:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 22px rgba(37, 99, 235, 0.42);
    }
    .btn-learn-more span {
      font-size: 16px;
      transition: transform 0.2s ease;
    }
    .btn-learn-more:hover span {
      transform: translateX(3px);
    }
    .btn-circle-arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #ffffff;
      color: #2563eb;
      font-size: 16px;
      font-weight: 800;
      box-shadow: 0 4px 12px rgba(24, 60, 138, 0.1);
      border: 1px solid #eef2ff;
      transition: all 0.25s ease;
    }
    .service-card:hover .btn-circle-arrow {
      background: #2563eb;
      color: #fff;
      transform: scale(1.06);
      box-shadow: 0 6px 16px rgba(37, 99, 235, 0.26);
    }

    /* Indicators */
    .carousel-indicators {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 8px;
      margin-bottom: 24px;
      position: relative;
      z-index: 5;
    }
    .indicator-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      border: 0;
      background: #cbd5e1;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
      padding: 0;
    }
    .indicator-dot.active {
      width: 22px;
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
      max-width: 1120px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(220, 232, 255, 0.9);
      border-radius: 20px;
      box-shadow: 0 12px 30px rgba(25, 52, 114, 0.05);
      padding: 14px 24px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      gap: 16px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .pillars-strip:hover {
      box-shadow: 0 16px 36px rgba(25, 52, 114, 0.08);
    }
    .pillar-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 2px 8px;
    }
    .pillar-item:not(:last-child) {
      border-right: 1px solid #e3ebfa;
    }
    .pillar-icon-box {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #eff6ff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2563eb;
      flex-shrink: 0;
      box-shadow: 0 3px 10px rgba(37, 99, 235, 0.1);
      transition: transform 0.25s ease;
    }
    .pillar-item:hover .pillar-icon-box {
      transform: scale(1.08);
      background: #dbeafe;
    }
    .pillar-text h4 {
      font: 800 14px Manrope, sans-serif;
      color: #081236;
      margin: 0 0 2px;
    }
    .pillar-text p {
      font-size: 11px;
      color: #626e8c;
      margin: 0;
      line-height: 1.3;
    }

    /* Scroll reveal animations */
    .showcase-head, .stage-container, .carousel-indicators, .pillars-strip {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .is-visible .showcase-head {
      opacity: 1;
      transform: none;
    }
    .is-visible .stage-container {
      opacity: 1;
      transform: none;
      transition-delay: 0.1s;
    }
    .is-visible .carousel-indicators {
      opacity: 1;
      transform: none;
      transition-delay: 0.16s;
    }
    .is-visible .pillars-strip {
      opacity: 1;
      transform: none;
      transition-delay: 0.22s;
    }

    /* Responsive adjustments */
    @media (max-width: 1040px) {
      .scribble-tl { left: 1%; }
      .scribble-tr { right: 2%; }
      .scribble-br { right: 1%; }
      .pillars-strip {
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
        padding: 16px 20px;
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
        padding: 24px 10px 36px;
      }
      .stage-container {
        min-height: 330px;
      }
      .coverflow-stage {
        height: 320px;
      }
      .service-card {
        width: clamp(230px, 72vw, 270px);
        min-height: 275px;
        padding: 18px 14px 16px;
      }
      .nav-arrow {
        width: 36px;
        height: 36px;
      }
      .nav-prev { left: 4px; }
      .nav-next { right: 4px; }
      .pillars-strip {
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 14px;
      }
      .pillar-item:not(:last-child) {
        border-right: none;
        border-bottom: 1px solid #e3ebfa;
        padding-bottom: 10px;
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
  isVisible = signal(true);
  activeIndex = signal(2); // Starts on Web Development (index 2), matching the screenshot!
  servicesList = serviceShowcaseList;
  pillars = servicePillars;

  private autoplayTimer: any = null;
  private observer?: IntersectionObserver;
  private touchStartX = 0;

  ngAfterViewInit(): void {
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
      translateZ = 45;
      scale = 1.05;
      rotateY = 0;
      opacity = 1;
      zIndex = 12;
      filter = 'none';
    } else if (offset === -1) {
      translateX = -62;
      translateZ = 10;
      scale = 0.88;
      rotateY = 6;
      opacity = 0.93;
      zIndex = 8;
      filter = 'blur(0.2px)';
    } else if (offset === 1) {
      translateX = 62;
      translateZ = 10;
      scale = 0.88;
      rotateY = -6;
      opacity = 0.93;
      zIndex = 8;
      filter = 'blur(0.2px)';
    } else if (offset === -2) {
      translateX = -116;
      translateZ = -30;
      scale = 0.76;
      rotateY = 12;
      opacity = 0.75;
      zIndex = 5;
      filter = 'blur(0.6px)';
    } else if (offset === 2) {
      translateX = 116;
      translateZ = -30;
      scale = 0.76;
      rotateY = -12;
      opacity = 0.75;
      zIndex = 5;
      filter = 'blur(0.6px)';
    } else if (offset === -3) {
      translateX = -162;
      translateZ = -80;
      scale = 0.65;
      rotateY = 16;
      opacity = 0.42;
      zIndex = 3;
      filter = 'blur(1.2px)';
    } else if (offset === 3) {
      translateX = 162;
      translateZ = -80;
      scale = 0.65;
      rotateY = -16;
      opacity = 0.42;
      zIndex = 3;
      filter = 'blur(1.2px)';
    } else {
      translateX = offset > 0 ? 200 : -200;
      translateZ = -160;
      scale = 0.5;
      opacity = 0;
      zIndex = 1;
      filter = 'blur(2px)';
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
    }, 3000);
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

interface AutomationNode {
  id: string;
  name: string;
  category: string;
  description: string;
  angle: number; // 0, 60, 120, 180, 240, 300
  color: string;
  glowColor: string;
  iconBg: string;
}

const AUTOMATION_NODES: AutomationNode[] = [
  {
    id: 'social',
    name: 'Social Media Automation',
    category: 'Social Channels',
    description: 'Auto reply, DM automation, comment management',
    angle: 0,
    color: '#e1306c',
    glowColor: 'rgba(225, 48, 108, 0.45)',
    iconBg: '#fdf2f8',
  },
  {
    id: 'chatbot',
    name: 'AI Chatbot Solution',
    category: 'Support & Sales',
    description: 'Intelligent chatbots for support, sales and engagement',
    angle: 60,
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    iconBg: '#f5f3ff',
  },
  {
    id: 'document',
    name: 'Document Automation',
    category: 'Paperless Docs',
    description: 'Auto-generate, process and manage documents',
    angle: 120,
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    iconBg: '#faf5ff',
  },
  {
    id: 'business',
    name: 'Business Process Automation',
    category: 'Operations',
    description: 'Streamline operations and increase productivity',
    angle: 180,
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    iconBg: '#ecfdf5',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Automation',
    category: 'Online Commerce',
    description: 'Automate orders, inventory and customer updates',
    angle: 240,
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    iconBg: '#fff7ed',
  },
  {
    id: 'cloud',
    name: 'Cloud Automation',
    category: 'Infrastructure',
    description: 'Automate cloud infrastructure and deployments',
    angle: 300,
    color: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    iconBg: '#f0f9ff',
  },
];

@Component({
  selector: 'app-solutions-showcase',
  imports: [CommonModule],
  template: `
    <div class="solutions-showcase-section">
      <!-- Ambient background glow -->
      <div class="ambient-glow glow-blue" aria-hidden="true"></div>
      <div class="ambient-glow glow-purple" aria-hidden="true"></div>
      <div class="ambient-glow glow-mint" aria-hidden="true"></div>

      <div class="container sol-main-container">
        <!-- 3-Column Layout: Left Cards | Center Orbital Stage | Right Cards -->
        <div class="sol-ecosystem-row">
          <!-- LEFT SIDE: 3 Cards (Cloud, E-commerce, Business Process) -->
          <div class="sol-cards-col sol-left-col">
            <div
              *ngFor="let card of leftCards"
              class="sol-feature-card"
              [class.is-active]="hoveredId() === card.id"
              [style.--card-accent]="card.color"
              [style.--card-glow]="card.glowColor"
              (mouseenter)="onCardHover(card.id)"
              (mouseleave)="onCardLeave()"
            >
              <div class="card-icon-squircle" [style.background]="card.iconBg" [style.color]="card.color">
                <!-- Icon based on card.id -->
                <ng-container [ngSwitch]="card.id">
                  <!-- Cloud -->
                  <svg *ngSwitchCase="'cloud'" viewBox="0 0 32 32" class="card-svg">
                    <path d="M8 22a6 6 0 0 1 0-12 7.5 7.5 0 0 1 14.5-2.5A6.5 6.5 0 0 1 25 22H8z" fill="#0284c7" />
                  </svg>
                  <!-- E-commerce -->
                  <svg *ngSwitchCase="'ecommerce'" viewBox="0 0 32 32" class="card-svg">
                    <path d="M4 6h3l3.5 13a2 2 0 0 0 2 1.5h10a2 2 0 0 0 2-1.5l2.8-7.5H8.5" fill="none" stroke="#f97316" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="13" cy="24" r="2.2" fill="#f97316" />
                    <circle cx="22" cy="24" r="2.2" fill="#f97316" />
                  </svg>
                  <!-- Business Process -->
                  <svg *ngSwitchCase="'business'" viewBox="0 0 32 32" class="card-svg">
                    <rect x="6" y="18" width="4.5" height="9" rx="1.5" fill="#10b981" />
                    <rect x="13.5" y="12" width="4.5" height="15" rx="1.5" fill="#10b981" />
                    <rect x="21" y="7" width="4.5" height="20" rx="1.5" fill="#10b981" />
                    <path d="M7 14 L14 8 L19 12 L25 5" fill="none" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22 5h3v3" fill="none" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </ng-container>
              </div>
              <div class="card-copy-wrap">
                <h4 class="card-heading">{{ card.name }}</h4>
                <p class="card-desc">{{ card.description }}</p>
              </div>
              <a href="#contact" class="card-chevron-btn" aria-label="Learn more">
                <span class="chevron-glyph">›</span>
              </a>
            </div>
          </div>

          <!-- CENTER: Orbital System (Fixed Hub + 6 Orbiting Nodes) -->
          <div
            class="sol-orbital-col"
            (mouseenter)="isPaused.set(true)"
            (mouseleave)="isPaused.set(false)"
          >
            <div class="orbital-stage">
              <!-- Ambient soft aura behind stage -->
              <div class="stage-aura-blur" aria-hidden="true"></div>

              <!-- Central Fixed AI Automation Hub (DOES NOT ROTATE) -->
              <div class="center-ai-core">
                <div class="center-pulse-ring ring-1"></div>
                <div class="center-pulse-ring ring-2"></div>
                <div class="center-core-body">
                  <!-- Cute Robot Avatar -->
                  <div class="robot-avatar-wrap">
                    <svg viewBox="0 0 100 80" class="robot-svg">
                      <circle cx="50" cy="8" r="5" fill="#00e5ff" class="antenna-glow" />
                      <rect x="48" y="12" width="4" height="10" rx="2" fill="#7dd3fc" />
                      <rect x="14" y="32" width="8" height="18" rx="4" fill="#0ea5e9" />
                      <rect x="78" y="32" width="8" height="18" rx="4" fill="#0ea5e9" />
                      <rect x="20" y="20" width="60" height="42" rx="18" fill="#ffffff" stroke="#38bdf8" stroke-width="2.5" />
                      <rect x="26" y="27" width="48" height="28" rx="13" fill="#061849" />
                      <ellipse cx="38" cy="41" rx="6" ry="7" fill="#00e5ff" class="robot-eye" />
                      <ellipse cx="62" cy="41" rx="6" ry="7" fill="#00e5ff" class="robot-eye" />
                      <circle cx="36" cy="39" r="2" fill="#ffffff" />
                      <circle cx="60" cy="39" r="2" fill="#ffffff" />
                      <path d="M44 48 Q50 52 56 48" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" fill="none" />
                    </svg>
                  </div>
                  <div class="core-text-group">
                    <span class="core-ai-text">AI</span>
                    <span class="core-auto-text">Automation</span>
                    <span class="core-infinity-glyph">∞</span>
                  </div>
                </div>
              </div>

              <!-- Continuous Rotating Orbital Track (360° rotation) -->
              <div class="orbit-rotator" [class.is-paused]="isPaused()">
                <!-- SVG Canvas with Dashed Rings and Connecting Rays -->
                <svg class="orbit-rays-canvas" viewBox="0 0 520 520">
                  <circle cx="260" cy="260" r="195" class="orbit-dashed-track" />
                  <circle cx="260" cy="260" r="130" class="orbit-sub-track" />
                  <ng-container *ngFor="let node of nodes">
                    <line
                      [attr.x1]="260"
                      [attr.y1]="260"
                      [attr.x2]="getRayX(node.angle, 195)"
                      [attr.y2]="getRayY(node.angle, 195)"
                      [attr.stroke]="node.color"
                      stroke-width="1.8"
                      stroke-dasharray="4 4"
                      class="ray-line"
                    />
                    <circle
                      [attr.cx]="getRayX(node.angle, 195)"
                      [attr.cy]="getRayY(node.angle, 195)"
                      r="4.5"
                      [attr.fill]="node.color"
                      class="ray-dot"
                    />
                  </ng-container>
                </svg>

                <!-- 6 Orbiting Automation Nodes -->
                <div
                  *ngFor="let node of nodes"
                  class="orbit-node-slot"
                  [style.--node-angle]="node.angle + 'deg'"
                >
                  <!-- Counter-rotation keeps icons and labels upright while orbiting -->
                  <div class="counter-rotate-wrap" [class.is-paused]="isPaused()">
                    <div
                      class="orbit-pod-bubble"
                      [class.is-hovered]="hoveredId() === node.id"
                      (mouseenter)="onNodeHover(node.id)"
                      (mouseleave)="onNodeLeave()"
                      [style.--node-color]="node.color"
                      [style.--node-glow]="node.glowColor"
                    >
                      <div class="pod-icon-wrap">
                        <!-- Icon per node -->
                        <ng-container [ngSwitch]="node.id">
                          <!-- Social Media / Instagram -->
                          <svg *ngSwitchCase="'social'" viewBox="0 0 32 32" class="pod-svg">
                            <defs>
                              <linearGradient id="smGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#ffb900" />
                                <stop offset="35%" stop-color="#ff0040" />
                                <stop offset="70%" stop-color="#d300c5" />
                                <stop offset="100%" stop-color="#7638fa" />
                              </linearGradient>
                            </defs>
                            <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#smGrad)" />
                            <rect x="7" y="7" width="18" height="18" rx="5" fill="none" stroke="#fff" stroke-width="2" />
                            <circle cx="16" cy="16" r="4.2" fill="none" stroke="#fff" stroke-width="2" />
                            <circle cx="21" cy="11" r="1.2" fill="#fff" />
                          </svg>

                          <!-- AI Chatbot -->
                          <svg *ngSwitchCase="'chatbot'" viewBox="0 0 32 32" class="pod-svg">
                            <rect x="4" y="9" width="18" height="14" rx="5" fill="#8b5cf6" />
                            <circle cx="9" cy="15" r="2" fill="#fff" />
                            <circle cx="17" cy="15" r="2" fill="#fff" />
                            <path d="M10 19 Q13 21 16 19" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" />
                            <circle cx="13" cy="5" r="1.8" fill="#a78bfa" />
                            <rect x="12" y="6" width="2" height="3" fill="#a78bfa" />
                            <rect x="23" y="10" width="8" height="6" rx="2" fill="#8b5cf6" />
                            <circle cx="25.5" cy="13" r="0.8" fill="#fff" />
                            <circle cx="27" cy="13" r="0.8" fill="#fff" />
                            <circle cx="28.5" cy="13" r="0.8" fill="#fff" />
                          </svg>

                          <!-- Document -->
                          <svg *ngSwitchCase="'document'" viewBox="0 0 32 32" class="pod-svg">
                            <path d="M7 4h12l6 6v17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#a855f7" />
                            <polygon points="19,4 19,10 25,10" fill="#f5d0fe" />
                            <line x1="10" y1="15" x2="20" y2="15" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                            <line x1="10" y1="19" x2="20" y2="19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                            <line x1="10" y1="23" x2="16" y2="23" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                          </svg>

                          <!-- Business Process -->
                          <svg *ngSwitchCase="'business'" viewBox="0 0 32 32" class="pod-svg">
                            <rect x="6" y="18" width="4.5" height="9" rx="1.5" fill="#10b981" />
                            <rect x="13.5" y="12" width="4.5" height="15" rx="1.5" fill="#10b981" />
                            <rect x="21" y="7" width="4.5" height="20" rx="1.5" fill="#10b981" />
                            <path d="M7 14 L14 8 L19 12 L25 5" fill="none" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 5h3v3" fill="none" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>

                          <!-- E-commerce -->
                          <svg *ngSwitchCase="'ecommerce'" viewBox="0 0 32 32" class="pod-svg">
                            <path d="M4 6h3l3.5 13a2 2 0 0 0 2 1.5h10a2 2 0 0 0 2-1.5l2.8-7.5H8.5" fill="none" stroke="#f97316" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="13" cy="24" r="2.2" fill="#f97316" />
                            <circle cx="22" cy="24" r="2.2" fill="#f97316" />
                          </svg>

                          <!-- Cloud -->
                          <svg *ngSwitchCase="'cloud'" viewBox="0 0 32 32" class="pod-svg">
                            <path d="M8 22a6 6 0 0 1 0-12 7.5 7.5 0 0 1 14.5-2.5A6.5 6.5 0 0 1 25 22H8z" fill="#0284c7" />
                          </svg>
                        </ng-container>
                      </div>
                      <span class="pod-label">{{ node.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT SIDE: 3 Cards (Social Media, AI Chatbot, Document) -->
          <div class="sol-cards-col sol-right-col">
            <div
              *ngFor="let card of rightCards"
              class="sol-feature-card"
              [class.is-active]="hoveredId() === card.id"
              [style.--card-accent]="card.color"
              [style.--card-glow]="card.glowColor"
              (mouseenter)="onCardHover(card.id)"
              (mouseleave)="onCardLeave()"
            >
              <div class="card-icon-squircle" [style.background]="card.iconBg" [style.color]="card.color">
                <ng-container [ngSwitch]="card.id">
                  <!-- Social Media -->
                  <svg *ngSwitchCase="'social'" viewBox="0 0 32 32" class="card-svg">
                    <defs>
                      <linearGradient id="smGradR" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#ffb900" />
                        <stop offset="35%" stop-color="#ff0040" />
                        <stop offset="70%" stop-color="#d300c5" />
                        <stop offset="100%" stop-color="#7638fa" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#smGradR)" />
                    <rect x="7" y="7" width="18" height="18" rx="5" fill="none" stroke="#fff" stroke-width="2" />
                    <circle cx="16" cy="16" r="4.2" fill="none" stroke="#fff" stroke-width="2" />
                    <circle cx="21" cy="11" r="1.2" fill="#fff" />
                  </svg>
                  <!-- AI Chatbot -->
                  <svg *ngSwitchCase="'chatbot'" viewBox="0 0 32 32" class="card-svg">
                    <rect x="4" y="9" width="18" height="14" rx="5" fill="#8b5cf6" />
                    <circle cx="9" cy="15" r="2" fill="#fff" />
                    <circle cx="17" cy="15" r="2" fill="#fff" />
                    <path d="M10 19 Q13 21 16 19" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" />
                    <circle cx="13" cy="5" r="1.8" fill="#a78bfa" />
                    <rect x="12" y="6" width="2" height="3" fill="#a78bfa" />
                    <rect x="23" y="10" width="8" height="6" rx="2" fill="#8b5cf6" />
                    <circle cx="25.5" cy="13" r="0.8" fill="#fff" />
                    <circle cx="27" cy="13" r="0.8" fill="#fff" />
                    <circle cx="28.5" cy="13" r="0.8" fill="#fff" />
                  </svg>
                  <!-- Document -->
                  <svg *ngSwitchCase="'document'" viewBox="0 0 32 32" class="card-svg">
                    <path d="M7 4h12l6 6v17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#a855f7" />
                    <polygon points="19,4 19,10 25,10" fill="#f5d0fe" />
                    <line x1="10" y1="15" x2="20" y2="15" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                    <line x1="10" y1="19" x2="20" y2="19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                    <line x1="10" y1="23" x2="16" y2="23" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </ng-container>
              </div>
              <div class="card-copy-wrap">
                <h4 class="card-heading">{{ card.name }}</h4>
                <p class="card-desc">{{ card.description }}</p>
              </div>
              <a href="#contact" class="card-chevron-btn" aria-label="Learn more">
                <span class="chevron-glyph">›</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .solutions-showcase-section {
      position: relative;
      padding: 24px 0 36px 0;
      overflow: hidden;
      min-height: calc(100vh - 62px);
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }

    /* Ambient background lighting */
    .ambient-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      pointer-events: none;
      z-index: 0;
      opacity: 0.55;
    }
    .glow-blue {
      top: 5%;
      left: 10%;
      width: 480px;
      height: 480px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, transparent 70%);
    }
    .glow-purple {
      top: 30%;
      right: 5%;
      width: 520px;
      height: 520px;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%);
    }
    .glow-mint {
      bottom: 10%;
      left: 30%;
      width: 460px;
      height: 460px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%);
    }

    .sol-main-container {
      position: relative;
      z-index: 1;
      max-width: 1260px;
      margin: 0 auto;
      padding: 0 24px;
      width: 100%;
      box-sizing: border-box;
    }

    /* 3-Column Ecosystem Layout */
    .sol-ecosystem-row {
      display: grid;
      grid-template-columns: 290px 450px 290px;
      gap: 28px;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    /* Side Cards Column */
    .sol-cards-col {
      display: flex;
      flex-direction: column;
      gap: 18px;
      justify-content: center;
    }

    /* Horizontal Card Item matching image */
    .sol-feature-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.95);
      border-radius: 16px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02);
      transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
      cursor: pointer;
      position: relative;
    }
    .sol-feature-card:hover,
    .sol-feature-card.is-active {
      transform: translateY(-3px);
      border-color: var(--card-accent);
      box-shadow: 0 14px 30px -6px var(--card-glow), 0 0 0 1px var(--card-accent);
    }
    .card-icon-squircle {
      width: 44px;
      height: 44px;
      border-radius: 13px;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
    }
    .card-svg {
      width: 24px;
      height: 24px;
      display: block;
    }
    .card-copy-wrap {
      flex: 1;
      min-width: 0;
    }
    .card-heading {
      font: 700 14px/1.25 'Plus Jakarta Sans', 'Manrope', sans-serif;
      color: #0f172a;
      margin: 0 0 2px 0;
    }
    .card-desc {
      font: 400 11.5px/1.4 'Inter', sans-serif;
      color: #64748b;
      margin: 0;
      white-space: normal;
    }
    .card-chevron-btn {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      display: grid;
      place-items: center;
      text-decoration: none;
      flex-shrink: 0;
      transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    }
    .chevron-glyph {
      font: 700 15px/1 'Manrope', sans-serif;
      color: #94a3b8;
      margin-top: -2px;
      transition: transform 0.2s ease, color 0.2s ease;
    }
    .sol-feature-card:hover .card-chevron-btn {
      background: #ffffff;
      border-color: var(--card-accent);
    }
    .sol-feature-card:hover .chevron-glyph {
      color: var(--card-accent);
      transform: translateX(2px);
    }

    /* CENTER: Orbital Stage (downscaled slightly as requested) */
    .sol-orbital-col {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .orbital-stage {
      position: relative;
      width: 440px;
      height: 440px;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }

    .stage-aura-blur {
      position: absolute;
      width: 410px;
      height: 410px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%);
      filter: blur(32px);
      pointer-events: none;
      z-index: 0;
      animation: auraPulse 6s ease-in-out infinite;
    }
    @keyframes auraPulse {
      0%, 100% { transform: scale(0.95); opacity: 0.6; }
      50% { transform: scale(1.05); opacity: 0.95; }
    }

    /* Central Fixed AI Core (Fixed in center, DOES NOT ROTATE) */
    .center-ai-core {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 132px;
      height: 132px;
      z-index: 15;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .center-core-body {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 32%, #0e2a6d 0%, #06194b 55%, #020b22 100%);
      border: 2.5px solid #00d2ff;
      box-shadow: 0 0 30px rgba(0, 195, 255, 0.55),
                  inset 0 0 20px rgba(0, 225, 255, 0.3),
                  0 12px 28px rgba(2, 9, 30, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 8px;
      box-sizing: border-box;
      z-index: 2;
    }
    .center-pulse-ring {
      position: absolute;
      inset: -10px;
      border-radius: 50%;
      border: 1.5px solid rgba(0, 210, 255, 0.45);
      animation: hubWavePulse 3.5s ease-out infinite;
      pointer-events: none;
    }
    .center-pulse-ring.ring-2 {
      animation-delay: 1.75s;
      border-color: rgba(168, 85, 247, 0.4);
    }
    @keyframes hubWavePulse {
      0% { transform: scale(0.92); opacity: 0.85; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .robot-avatar-wrap {
      width: 38px;
      height: 30px;
      margin-bottom: 2px;
      filter: drop-shadow(0 2px 7px rgba(0, 210, 255, 0.5));
    }
    .robot-svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .antenna-glow {
      animation: antennaPulse 2s ease-in-out infinite;
    }
    @keyframes antennaPulse {
      0%, 100% { fill: #00e5ff; filter: drop-shadow(0 0 3px #00e5ff); }
      50% { fill: #7dd3fc; filter: drop-shadow(0 0 8px #38bdf8); }
    }
    .robot-eye {
      animation: blinkEye 4.5s infinite;
      transform-origin: center;
    }
    @keyframes blinkEye {
      0%, 96%, 100% { transform: scaleY(1); }
      98% { transform: scaleY(0.1); }
    }

    .core-text-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.1;
    }
    .core-ai-text {
      font: 900 17px/1 'Plus Jakarta Sans', sans-serif;
      background: linear-gradient(180deg, #ffffff 0%, #7dd3fc 60%, #00e5ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.05em;
    }
    .core-auto-text {
      font: 700 10px 'Manrope', sans-serif;
      color: #ffffff;
      letter-spacing: 0.04em;
      margin-top: 1px;
      text-shadow: 0 0 8px rgba(0, 195, 255, 0.6);
    }
    .core-infinity-glyph {
      font: 700 14px/1 'Inter', sans-serif;
      color: #00e5ff;
      margin-top: 1px;
      text-shadow: 0 0 8px #00e5ff;
      animation: infinityPulse 2.4s ease-in-out infinite;
    }
    @keyframes infinityPulse {
      0%, 100% { opacity: 0.7; transform: scale(0.95); }
      50% { opacity: 1; transform: scale(1.15); filter: drop-shadow(0 0 8px #00e5ff); }
    }

    /* CONTINUOUS ORBITAL TRACK ROTATION (22s linear infinite) */
    .orbit-rotator {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      animation: spinOrbit 22s linear infinite;
      transform-origin: center center;
    }
    .orbit-rotator.is-paused {
      animation-play-state: paused;
    }
    @keyframes spinOrbit {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* SVG Canvas with Concentric dashed tracks & connecting rays */
    .orbit-rays-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
    }
    .orbit-dashed-track {
      fill: none;
      stroke: rgba(148, 163, 184, 0.32);
      stroke-width: 1.5;
      stroke-dasharray: 5 6;
    }
    .orbit-sub-track {
      fill: none;
      stroke: rgba(56, 189, 248, 0.28);
      stroke-width: 1.2;
      stroke-dasharray: 4 6;
    }
    .ray-line {
      opacity: 0.75;
    }
    .ray-dot {
      filter: drop-shadow(0 0 4px currentColor);
    }

    /* Orbiting Node Slots */
    .orbit-node-slot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      transform: rotate(var(--node-angle)) translateY(-165px);
      z-index: 5;
    }

    /* Counter-spin container keeps cards upright at all times */
    .counter-rotate-wrap {
      width: 92px;
      height: 92px;
      margin-left: -46px;
      margin-top: -46px;
      animation: counterSpin 22s linear infinite;
      transform-origin: center center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .counter-rotate-wrap.is-paused {
      animation-play-state: paused;
    }
    @keyframes counterSpin {
      from { transform: rotate(calc(-1 * var(--node-angle))); }
      to { transform: rotate(calc(-1 * var(--node-angle) - 360deg)); }
    }

    /* Circular Node Bubble matching image */
    .orbit-pod-bubble {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid var(--node-color);
      box-shadow: 0 0 18px var(--node-glow), 0 8px 16px rgba(15, 23, 42, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 5px 3px;
      box-sizing: border-box;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
      user-select: none;
    }
    .orbit-pod-bubble:hover,
    .orbit-pod-bubble.is-hovered {
      transform: scale(1.06);
      box-shadow: 0 0 26px var(--node-color), 0 10px 20px rgba(15, 23, 42, 0.14);
    }
    .pod-icon-wrap {
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pod-svg {
      width: 24px;
      height: 24px;
      display: block;
    }
    .pod-label {
      font: 700 9px/1.15 'Manrope', sans-serif;
      text-align: center;
      color: #0f172a;
      max-width: 72px;
      margin-top: 3px;
      display: block;
    }

    .mobile-break {
      display: none;
    }

    /* RESPONSIVE LAYOUT */
    @media (max-width: 1180px) {
      .sol-ecosystem-row {
        grid-template-columns: 270px 410px 270px;
        gap: 18px;
      }
      .orbital-stage {
        width: 410px;
        height: 410px;
      }
      .orbit-node-slot {
        transform: rotate(var(--node-angle)) translateY(-154px);
      }
      .counter-rotate-wrap {
        width: 86px;
        height: 86px;
        margin-left: -43px;
        margin-top: -43px;
      }
      .orbit-pod-bubble {
        width: 82px;
        height: 82px;
      }
      .pod-label {
        font-size: 8.5px;
      }
    }

    @media (max-width: 1024px) {
      .sol-ecosystem-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
      }
      .sol-cards-col {
        display: grid;
        grid-template-columns: repeat(2, 300px);
        gap: 16px;
        width: auto;
      }
      .sol-left-col {
        order: 2;
      }
      .sol-right-col {
        order: 3;
      }
      .sol-orbital-col {
        order: 1;
      }
      .orbital-stage {
        width: 390px;
        height: 390px;
      }
      .orbit-node-slot {
        transform: rotate(var(--node-angle)) translateY(-146px);
      }
      .counter-rotate-wrap {
        width: 82px;
        height: 82px;
        margin-left: -41px;
        margin-top: -41px;
      }
      .orbit-pod-bubble {
        width: 78px;
        height: 78px;
      }
    }

    @media (max-width: 768px) {
      .solutions-showcase-section {
        padding: 24px 0 40px 0;
      }
      .sol-cards-col {
        grid-template-columns: 1fr;
        width: 100%;
        max-width: 360px;
      }
      .orbital-stage {
        width: 310px;
        height: 310px;
      }
      .orbit-node-slot {
        transform: rotate(var(--node-angle)) translateY(-116px);
      }
      .counter-rotate-wrap {
        width: 72px;
        height: 72px;
        margin-left: -36px;
        margin-top: -36px;
      }
      .orbit-pod-bubble {
        width: 70px;
        height: 70px;
        padding: 3px;
      }
      .pod-svg {
        width: 20px;
        height: 20px;
      }
      .pod-label {
        font-size: 7.5px;
        max-width: 58px;
      }
      .center-ai-core {
        width: 100px;
        height: 100px;
      }
      .core-ai-text {
        font-size: 15px;
      }
      .core-auto-text {
        font-size: 8.5px;
      }
      .robot-avatar-wrap {
        width: 30px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .orbit-rotator,
      .counter-rotate-wrap,
      .center-pulse-ring,
      .stage-aura-blur {
        animation: none !important;
      }
    }
  `,
})
export class SolutionsShowcaseComponent {
  nodes = AUTOMATION_NODES;
  isPaused = signal<boolean>(false);
  hoveredId = signal<string | null>(null);

  // Left 3 Cards matching image: Cloud, E-commerce, Business Process
  leftCards = [
    this.nodes.find((n) => n.id === 'cloud')!,
    this.nodes.find((n) => n.id === 'ecommerce')!,
    this.nodes.find((n) => n.id === 'business')!,
  ];

  // Right 3 Cards matching image: Social Media, AI Chatbot, Document
  rightCards = [
    this.nodes.find((n) => n.id === 'social')!,
    this.nodes.find((n) => n.id === 'chatbot')!,
    this.nodes.find((n) => n.id === 'document')!,
  ];

  onNodeHover(id: string): void {
    this.isPaused.set(true);
    this.hoveredId.set(id);
  }

  onNodeLeave(): void {
    this.isPaused.set(false);
    this.hoveredId.set(null);
  }

  onCardHover(id: string): void {
    this.hoveredId.set(id);
  }

  onCardLeave(): void {
    this.hoveredId.set(null);
  }

  selectNode(id: string): void {
    this.hoveredId.set(id);
  }

  // Trigonometry helper for SVG rays from center (260, 260)
  getRayX(angleDegrees: number, radius: number): number {
    const rad = (angleDegrees * Math.PI) / 180;
    return Math.round(260 + radius * Math.sin(rad));
  }

  getRayY(angleDegrees: number, radius: number): number {
    const rad = (angleDegrees * Math.PI) / 180;
    return Math.round(260 - radius * Math.cos(rad));
  }
}



const aboutCards = [
  { title: 'Ideas', description: 'Every great product starts with a meaningful idea.', icon: '💡' },
  { title: 'Design', description: 'We turn ideas into clean and engaging experiences.', icon: '🎨' },
  { title: 'Code', description: 'We build reliable and scalable software with modern technology.', icon: '</>' },
  { title: 'Create', description: 'We transform concepts into working digital products.', icon: '▱' },
  { title: 'Innovate', description: 'We explore better ways to solve real-world problems.', icon: '✦' },
  { title: 'Grow', description: 'We continuously improve products and create new possibilities.', icon: '↗' },
  { title: 'Build', description: 'We build technology with purpose, quality and long-term vision.', icon: '🚀' },
];

const heroFeatures = [
  { title: 'Scale', description: 'Ready for future growth', icon: '↗' },
  { title: 'Technology', description: 'Modern tools and platforms', icon: '◈' },
  { title: 'Digital Experiences', description: 'Simple, useful and engaging', icon: '◎' },
  { title: 'Innovate', description: 'Turning ideas into possibilities', icon: '💡' },
  { title: 'Develop', description: 'Building modern software', icon: '</>' },
  { title: 'Transform', description: 'Improving digital experiences', icon: '☁' },
  { title: 'Automate', description: 'Making work smarter', icon: '⚙' },
  { title: 'Grow', description: 'Creating scalable solutions', icon: '↗' },
  { title: 'Build', description: 'Technology with purpose', icon: '🚀' },
  { title: 'Create', description: 'From concept to product', icon: '✦' },
];
const aboutFeatures = heroFeatures;

@Component({
  selector: 'app-home-about-preview',
  imports: [CommonModule],
  template: `
    <section #section id="about" class="about-page" [class.is-visible]="isVisible()">
      <section class="about-hero container">
        <div class="story-copy reveal-left">
          <span class="story-badge">Our Story</span>
          <h1>Building Ideas into<br /><em>Digital Experiences</em></h1>
          <h2>We are a new technology company focused on turning ideas into modern digital solutions.</h2>
          <p>Build4Big is our own technology venture, created with a passion for software, design and innovation. We are starting our journey by building useful, scalable and meaningful digital experiences for businesses and people.</p>
          <p>Our goal is simple — understand real problems, create smart solutions and continuously improve the way technology works for people.</p>
          <div class="story-actions"><a href="#services" class="primary-action">Explore Our Journey <span>→</span></a><a href="#services" class="secondary-action"><i>▶</i> See What We Build</a></div>
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
    </section>
  `,
  styles: `
    :host{display:block}
    .about-page{overflow:hidden;background:radial-gradient(circle at 18% 20%,#eef5ff 0,transparent 42%),radial-gradient(circle at 82% 80%,#f5edff 0,transparent 45%),radial-gradient(circle at 78% 10%,#edf4ff 0,transparent 30%),#f8faff;color:#07133d;min-height:100vh;box-sizing:border-box}
    .about-hero{min-height:520px;display:grid;grid-template-columns:minmax(320px,.9fr) minmax(0,1.1fr);gap:50px;align-items:center;padding-top:36px;padding-bottom:45px}
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
    .edge-left{left:0;background:linear-gradient(90deg,#f8faff,transparent)}
    .edge-right{right:0;background:linear-gradient(270deg,#f8faff,transparent)}
    .reveal-left,.reveal-right,.reveal-bottom{opacity:0;will-change:transform,opacity}
    .is-visible .reveal-left{animation:reveal-left .7s cubic-bezier(.22,1,.36,1) both}
    .is-visible .reveal-right{animation:reveal-right .7s .12s cubic-bezier(.22,1,.36,1) both}
    .is-visible .reveal-bottom{animation:reveal-bottom .7s .18s cubic-bezier(.22,1,.36,1) both}
    @keyframes about-cards{to{transform:translateX(-50%)}}
    @keyframes reveal-left{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}
    @keyframes reveal-right{from{opacity:0;transform:translateX(26px)}to{opacity:1;transform:none}}
    @keyframes reveal-bottom{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
    @media(max-width:850px){.about-hero{grid-template-columns:1fr;gap:18px;padding-top:28px}.card-marquee{width:calc(100% + 48px);margin-left:-24px}.story-copy p{font-size:15px}}
    @media(max-width:560px){.about-hero{padding-bottom:44px}.story-copy h1{font-size:40px}.story-copy h2{font-size:20px}.story-actions{gap:13px}.primary-action{padding:13px 16px}.story-card{flex-basis:270px;min-height:260px;padding:25px}.card-marquee{mask-image:none}.edge{display:none}}
    @media(prefers-reduced-motion:reduce){.reveal-left,.reveal-right,.reveal-bottom{opacity:1!important;transform:none!important;animation:none!important}.card-track{animation:none}.story-card{transition:none}}
  `,
})
export class HomeAboutPreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('section') section?: ElementRef<HTMLElement>;
  isVisible = signal(false);
  private observer?: IntersectionObserver;
  aboutCards = aboutCards;

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
        <!-- LEFT COLUMN: Latest Articles & Featured Article -->
        <div class="content-left">
          <!-- Latest Articles Section (First) -->
          <div class="latest-section">
            <div class="latest-header">
              <div>
                <h3 class="latest-title">Latest Articles</h3>
                <p class="latest-subtitle">Fresh insights, practical guides and stories to fuel your growth.</p>
              </div>
              <a href="#blog" class="view-all-link">View All Articles <span>→</span></a>
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

          <!-- Featured Article Banner (Second) -->
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
              <a href="#blog" class="sidebar-link">View All <span>→</span></a>
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
      padding: 32px 16px 55px;
      background: linear-gradient(180deg, #f8faff 0%, #f1f5fd 50%, #f8faff 100%);
      color: #0f172a;
      min-height: 100vh;
      box-sizing: border-box;
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
      gap: 36px;
      align-items: center;
      position: relative;
      z-index: 1;
      padding-top: 0;
      margin-bottom: 30px;
    }

    .badge-eyebrow {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #2563eb;
      margin-bottom: 10px;
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
      margin-top: 36px;
      margin-bottom: 20px;
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
      right: -12px;
      opacity: 0.75;
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
      .blog-showcase-container {
        padding: 24px 12px 45px;
      }
      .latest-cards-grid {
        grid-template-columns: 1fr;
      }
      .filter-sort-row {
        flex-direction: column;
        align-items: stretch;
        gap: 14px;
      }
      .category-pills {
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 6px;
        -webkit-overflow-scrolling: touch;
      }
      .pill-btn {
        white-space: nowrap;
        flex-shrink: 0;
      }
      .sort-dropdown {
        justify-content: flex-end;
      }
      .hero-heading {
        font-size: clamp(28px, 6.8vw, 34px);
      }
      .hero-right {
        display: none;
      }
      .search-bar-wrap {
        max-width: 100%;
        width: 100%;
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
    <div class="contact-showcase">
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
      padding: 24px 20px 32px;
      background: linear-gradient(160deg, #f0f4ff 0%, #fafbff 55%, #eef1ff 100%);
      opacity: 1;
      min-height: 100vh;
      box-sizing: border-box;
    }
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
      font-size: 13px;
      color: #3159f5;
      line-height: 1.4;
      pointer-events: none;
      opacity: 0.75;
    }
    .scribble-left { top: 60px; left: 24px; transform: rotate(-5deg); }
    .scribble-right { top: 60px; right: 24px; transform: rotate(4deg); text-align: center; }
    /* Paper plane */
    .plane-wrap { position: absolute; top: 35px; right: 90px; pointer-events: none; animation: planeDrift 5s ease-in-out infinite; }
    .paper-plane { width: 44px; height: 44px; filter: drop-shadow(0 4px 10px #3159f535); }
    .plane-trail { width: 100px; height: 50px; position: absolute; top: 8px; right: 35px; }
    @keyframes planeDrift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
    /* Header */
    .contact-header { text-align: center; margin-bottom: 20px; position: relative; z-index: 1; }
    .contact-badge {
      display: inline-block;
      border: 1.5px solid #b4c4f4;
      border-radius: 30px;
      padding: 4px 14px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.2px;
      color: #3159f5;
      margin-bottom: 8px;
      background: #fff;
    }
    .contact-title { font: 800 clamp(26px, 3.2vw, 36px)/1.15 Manrope; color: #080f2b; margin: 0 0 8px; }
    .grad { background: linear-gradient(135deg, #3159f5, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .contact-sub { font-size: 13px; color: #69708a; line-height: 1.5; margin: 0; }
    /* Main layout */
    .contact-main {
      display: grid;
      grid-template-columns: 1fr 1.05fr 1fr;
      gap: 20px;
      max-width: 1160px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      align-items: stretch;
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
      border-radius: 20px;
      padding: 22px 20px 18px;
      box-shadow: 0 4px 20px rgba(49,89,245,0.07);
      border: 1px solid #e8edff;
      display: flex;
      flex-direction: column;
    }
    .info-accent { width: 34px; height: 3px; background: #3159f5; border-radius: 2px; margin-bottom: 12px; }
    .info-title { font: 700 19px/1.2 Manrope; color: #080f2b; margin: 0 0 6px; }
    .info-sub { font-size: 12px; color: #69708a; line-height: 1.5; margin-bottom: 16px; }
    .info-list { display: flex; flex-direction: column; gap: 12px; flex: 1; }
    .info-item { display: flex; gap: 12px; align-items: flex-start; }
    .info-icon {
      width: 34px; height: 34px; border-radius: 50%;
      background: #f0f4ff;
      display: flex; align-items: center; justify-content: center;
      font-size: 15px; flex-shrink: 0;
    }
    .info-label { font: 700 12.5px Manrope; color: #080f2b; margin-bottom: 2px; }
    .info-val { font-size: 11.5px; color: #69708a; line-height: 1.5; }
    .social-row { display: flex; align-items: center; gap: 8px; margin: 16px 0 0; }
    .social-label { font: 700 12px Manrope; color: #080f2b; }
    .social-btn {
      width: 30px; height: 30px; border-radius: 8px;
      border: 1px solid #dde4f5;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 700; color: #3159f5;
      text-decoration: none;
      transition: background 0.2s, color 0.2s;
    }
    .social-btn:hover { background: #3159f5; color: #fff; }
    /* Map blob container & Floating chips */
    .map-blob-container {
      position: relative;
      width: 100%;
      max-width: 290px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .map-blob {
      width: 250px;
      height: 250px;
      background: linear-gradient(135deg, #dbe7ff 0%, #c4d7ff 50%, #ebf2ff 100%);
      border-radius: 36px;
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 18px;
      box-shadow: 0 14px 36px rgba(49, 89, 245, 0.16);
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
      border-radius: 34px;
      filter: saturate(1.1) contrast(1.02);
      transition: opacity 0.3s ease;
    }
    .map-blob:hover .live-map-iframe {
      opacity: 1;
    }
    .map-pin-overlay {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 2;
    }
    .map-pin {
      animation: pinBounce 2s ease-in-out infinite;
    }
    .pin-head {
      width: 28px;
      height: 28px;
      background: #2563eb;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      margin: auto;
      box-shadow: 0 6px 14px rgba(37, 99, 235, 0.45);
    }
    .pin-stem {
      width: 4px;
      height: 16px;
      background: #2563eb;
      margin: 2px auto 0;
      border-radius: 0 0 4px 4px;
    }
    @keyframes pinBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .map-badge {
      position: relative;
      z-index: 3;
      background: linear-gradient(135deg, #4338ca, #6366f1);
      color: #ffffff;
      font: 700 12px Manrope, sans-serif;
      padding: 8px 18px;
      border-radius: 18px;
      text-align: center;
      text-decoration: none;
      box-shadow: 0 5px 16px rgba(67, 56, 202, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.3px;
    }
    .map-badge:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 8px 20px rgba(67, 56, 202, 0.5);
    }
    .float-chip {
      position: absolute;
      background: #ffffff;
      border-radius: 12px;
      padding: 6px 12px;
      font-size: 11px;
      font-weight: 700;
      color: #080f2b;
      box-shadow: 0 5px 16px rgba(49, 89, 245, 0.14);
      white-space: nowrap;
      animation: chipFloat 3.2s ease-in-out infinite;
      z-index: 4;
      border: 1px solid #edf2f7;
    }
    .chip1 { top: -12px; left: -18px; animation-delay: 0s; }
    .chip2 { bottom: 14px; right: -24px; animation-delay: 1.1s; }
    .chip3 { bottom: -12px; left: 8px; animation-delay: 0.6s; }
    @keyframes chipFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-7px); }
    }
    /* Form card */
    .contact-form-card {
      background: #fff;
      border-radius: 20px;
      padding: 22px 20px 18px;
      box-shadow: 0 4px 20px rgba(49,89,245,0.07);
      border: 1px solid #e8edff;
      display: flex;
      flex-direction: column;
    }
    .form-title { font: 700 19px/1.2 Manrope; color: #080f2b; margin: 0 0 6px; }
    .form-sub { font-size: 12px; color: #69708a; line-height: 1.5; margin-bottom: 14px; }
    .contact-form { display: flex; flex-direction: column; gap: 10px; }
    .field-wrap {
      display: flex;
      align-items: center;
      gap: 9px;
      background: #f5f7ff;
      border-radius: 10px;
      padding: 0 12px;
      border: 1px solid #e8edff;
      transition: border-color 0.2s;
    }
    .field-wrap:focus-within { border-color: #3159f5; }
    .field-wrap.msg-wrap { align-items: flex-start; padding-top: 10px; }
    .field-icon { font-size: 14px; color: #9aabd4; flex-shrink: 0; }
    .field-icon.top { margin-top: 2px; }
    .field {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font: 13.5px 'DM Sans', sans-serif;
      color: #080f2b;
      padding: 10px 0;
    }
    textarea.field { resize: none; line-height: 1.5; }
    .send-btn {
      background: linear-gradient(135deg, #3159f5, #5b7fff);
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 12px 20px;
      font: 700 13.5px 'DM Sans';
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 5px 16px #3159f535;
    }
    .send-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px #3159f540; }
    .send-arrow { font-size: 16px; }
    .privacy-note { font-size: 11px; color: #9aabd4; text-align: center; margin-top: 10px; }
    /* Pillars */
    .contact-pillars {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      max-width: 1080px;
      margin: 22px auto 0;
      position: relative;
      z-index: 1;
    }
    .cpillar {
      background: #fff;
      border-radius: 14px;
      padding: 12px 14px;
      border: 1px solid #e8edff;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      box-shadow: 0 2px 10px rgba(49,89,245,0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cpillar:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(49,89,245,0.1); }
    .cpillar-icon {
      width: 36px; height: 36px;
      background: #f0f4ff;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 17px;
      flex-shrink: 0;
    }
    .cpillar-title { font: 700 12.5px Manrope; color: #080f2b; margin-bottom: 2px; }
    .cpillar-text { font-size: 11px; color: #69708a; line-height: 1.5; }
    @media (max-width: 1100px) {
      .contact-main { grid-template-columns: 1fr; gap: 24px; }
      .map-blob-container { margin: 10px auto; }
    }
    @media (max-width: 900px) {
      .contact-showcase { padding: 22px 14px 28px; }
      .contact-pillars { grid-template-columns: repeat(2, 1fr); gap: 10px; }
      .scribble { display: none; }
      .plane-wrap { display: none; }
    }
    @media (max-width: 500px) {
      .contact-showcase { padding: 18px 10px 24px; }
      .map-blob { width: 230px; height: 230px; }
      .map-blob-container { max-width: 260px; }
      .float-chip { font-size: 10.5px; padding: 4px 8px; }
      .chip1 { left: 0; top: -8px; }
      .chip2 { right: 0; bottom: 8px; }
      .chip3 { left: 6px; bottom: -8px; }
      .contact-pillars { grid-template-columns: 1fr; }
      .contact-title { font-size: clamp(24px, 6.5vw, 30px); }
      .contact-info-col, .contact-form-card { padding: 18px 14px 16px; }
    }
  `,
})
export class ContactShowcaseComponent {
  pillars = contactPillars;
  name = ''; email = ''; message = ''; sent = false;
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
  imports: [CommonModule, FooterComponent, HomeAboutPreviewComponent, ServicesShowcaseComponent, SolutionsShowcaseComponent, ContactShowcaseComponent],
  template: `
    <div id="home">
      <header class="one-nav">
        <a href="#home" class="menu-logo" aria-label="Build4Big home"><span class="brand-image"><img src="/build4big-mark.svg" alt="Build4Big 4B logo" /></span><span>Build4Big</span></a>
        <nav><a href="#home">Home</a><a href="#about">About</a><a href="#services">Product</a><a href="#solutions">Solutions</a><!-- <a href="#blog">Blog</a> --><a href="#contact">Contact</a></nav>
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
          <div class="hero-visual-col" [style.transform]="'perspective(1100px) rotateY(' + heroMouseX * 10 + 'deg) rotateX(' + heroMouseY * -10 + 'deg)'">
            <!-- Central Holographic Globe & Orbits -->
            <div class="globe-system-wrap">
              <div class="orbit-glow-behind"></div>
              <div class="orbit-ring ring-1"></div>
              <div class="orbit-ring ring-2"></div>
              <div class="orbit-ring ring-3"></div>

              <div class="hologram-globe">
                <div class="globe-shimmer"></div>
                <div class="globe-energy-grid"></div>
                <!-- Original Build4Big 3D Brand Logo Inside Globe -->
                <div class="globe-core-mark">
                  <img src="build4big-logo-cutout.png" alt="Build4Big 4B" class="mark-img-4b" />
                </div>
              </div>

              <!-- Satellite Radar Nodes (Exact matching icons: Target, Gear, Shield, Growth) -->
              <div class="orbit-node node-1" title="Target">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <div class="orbit-node node-2" title="Innovation">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
              <div class="orbit-node node-3" title="Security">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div class="orbit-node node-4" title="Analytics">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
            </div>

            <!-- Floating Glass Card 1: AI Solutions (Top Left) -->
            <div class="glass-chip chip-ai" [style.transform]="'translate3d(' + heroMouseX * -15 + 'px, ' + heroMouseY * -15 + 'px, 35px)'">
              <div class="chip-icon icon-bulb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 3.03 1.8 5.65 4.38 6.78.38.16.62.54.62.95V18h4v-1.27c0-.41.24-.79.62-.95C17.2 14.65 19 12.03 19 9a7 7 0 0 0-7-7z"/></svg>
              </div>
              <div class="chip-text">
                <strong>AI Solutions</strong>
                <small>Turn Ideas into Intelligence</small>
              </div>
            </div>

            <!-- Floating Glass Card 2: Product Innovation (Top Right) -->
            <div class="glass-chip chip-innovation" [style.transform]="'translate3d(' + heroMouseX * 18 + 'px, ' + heroMouseY * -12 + 'px, 45px)'">
              <div class="chip-icon icon-rocket">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4.5c1.45-1.47 4.5-2 4.5-2"/><path d="M12 15v5s3.03-.55 4.5-2c1.47-1.45 2-4.5 2-4.5"/></svg>
              </div>
              <div class="chip-text">
                <strong>Product Innovation</strong>
                <small>Build What Matters</small>
              </div>
            </div>

            <!-- Floating Glass Card 3: Business Strategy (Bottom Left) -->
            <div class="glass-chip chip-strategy" [style.transform]="'translate3d(' + heroMouseX * -18 + 'px, ' + heroMouseY * 15 + 'px, 30px)'">
              <div class="chip-icon icon-bar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/><path d="M4 8l6-4 7 3 4-4"/></svg>
              </div>
              <div class="chip-text">
                <strong>Business Strategy</strong>
                <small>Plan for a Bigger Future</small>
              </div>
            </div>

            <!-- Floating Glass Card 4: Dedicated Support (Bottom Right) -->
            <div class="glass-chip chip-support" [style.transform]="'translate3d(' + heroMouseX * 16 + 'px, ' + heroMouseY * 18 + 'px, 25px)'">
              <div class="chip-icon icon-users">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
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
              <svg class="quote-underline" width="110" height="24" viewBox="0 0 110 24" fill="none">
                <path d="M4 16C35 4 80 4 106 18" stroke="#38bdf8" stroke-width="2.6" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>


        <!-- Bottom Glass Running Marquee Bar matching Image 1 & 2 -->
        <div class="container hero-workflow-container">
          <div class="hero-marquee-bar" aria-label="Build4Big Core Features">
            <div class="marquee-edge edge-left"></div>
            <div class="marquee-edge edge-right"></div>
            <div class="hero-marquee-track">
              <div class="hero-marquee-set" *ngFor="let _ of [0, 1]">
                <div class="marquee-item" *ngFor="let item of features">
                  <div class="wf-icon" [ngClass]="{'icon-bulb': item.title === 'Innovate', 'icon-cloud': item.title === 'Transform', 'icon-gear': item.title === 'Automate', 'icon-exp': item.title === 'Digital Experiences'}">
                    <span class="wf-symbol">{{ item.icon }}</span>
                  </div>
                  <div class="wf-content">
                    <strong class="wf-title">{{ item.title }}</strong>
                    <span class="wf-sub">{{ item.description }}</span>
                  </div>
                  <div class="wf-sep"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <app-home-about-preview></app-home-about-preview>
    <section id="services" class="landing-services-wrap">
      <app-services-showcase></app-services-showcase>
    </section>
    <section id="solutions" class="landing-solutions-wrap">
      <app-solutions-showcase></app-solutions-showcase>
    </section>
    <!-- <section id="blog" class="landing-blog-wrap">
      <app-blog-showcase></app-blog-showcase>
    </section> -->
    <section id="contact" class="landing-contact-wrap">
      <app-contact-showcase></app-contact-showcase>
    </section>
    <app-footer></app-footer>
  `,
  styles: `
    .one-nav{height:76px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 max(24px,calc((100vw - 1120px)/2));background:#fff;position:sticky;top:0;z-index:9}.one-nav>a{font:800 16px Manrope;color:#080f2b;text-decoration:none;flex-shrink:0}.one-nav>a:last-child{background:#3159f5;color:#fff;padding:12px 18px;border-radius:10px;font:700 12px 'DM Sans';white-space:nowrap}.one-nav nav{display:flex;gap:18px;flex-wrap:wrap;justify-content:center}.one-nav nav a{font-size:12px;font-weight:700;color:#111936;text-decoration:none;white-space:nowrap}.one-nav nav a:hover{color:#3159f5}
    @media (max-width: 768px) {
      .one-nav { height: 64px; padding: 0 16px; gap: 12px; }
      .one-nav > a.menu-logo span:last-child { font-size: 15px; }
      .one-nav nav { gap: 12px; }
      .one-nav nav a { font-size: 11.5px; }
      .one-nav > a:last-child { padding: 9px 14px; font-size: 11.5px; }
    }
    @media (max-width: 580px) {
      .one-nav nav { display: none; }
      .one-nav { justify-content: space-between; }
    }

    /* Interactive 3D Hero Section matching image */
    .hero-land-glow {
      position: relative;
      background: radial-gradient(circle at 74% 38%, #0d2876 0%, #041038 42%, #02071b 100%);
      color: #ffffff;
      padding: 44px 0 38px;
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
      filter: blur(100px);
      opacity: 0.55;
      transition: transform 0.22s cubic-bezier(0.1, 0.9, 0.2, 1);
    }
    .orb-cyan {
      top: -12%;
      left: 18%;
      width: 520px;
      height: 520px;
      background: radial-gradient(circle, rgba(0, 160, 255, 0.45), transparent 70%);
    }
    .orb-blue {
      top: 12%;
      right: -5%;
      width: 680px;
      height: 680px;
      background: radial-gradient(circle, rgba(0, 210, 255, 0.38), rgba(65, 80, 250, 0.28) 45%, transparent 75%);
    }
    .orb-purple {
      bottom: -15%;
      left: -8%;
      width: 580px;
      height: 580px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.28), transparent 70%);
    }
    .hero-cyber-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 55px 55px;
      opacity: 0.7;
    }
    .hero-flow-wave {
      position: absolute;
      bottom: -30px;
      left: 0;
      width: 100%;
      height: 420px;
      background: 
        radial-gradient(ellipse at 8% 85%, rgba(0, 140, 255, 0.38) 0%, transparent 55%),
        radial-gradient(ellipse at 40% 95%, rgba(0, 80, 220, 0.22) 0%, transparent 60%);
      opacity: 0.9;
    }

    /* Main Stage Layout */
    .hero-interactive-stage {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1.02fr 1.18fr;
      align-items: center;
      gap: 32px;
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
      border: 1px solid rgba(0, 180, 255, 0.45);
      padding: 6px 18px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 700;
      color: #cde6ff;
      margin-bottom: 22px;
      box-shadow: 0 0 22px rgba(0, 140, 255, 0.3);
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
      font: 800 62px/1.06 Manrope, sans-serif;
      letter-spacing: -0.038em;
      color: #ffffff;
      margin: 0 0 22px;
      text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
    }
    .text-gradient {
      background: linear-gradient(135deg, #00d9ff 0%, #3a88ff 55%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline-block;
    }
    .hero-subtext {
      font-size: 16px;
      line-height: 1.75;
      color: #a3bddf;
      max-width: 480px;
      margin: 0 0 34px;
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
      padding: 14px 30px;
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
      border: 1px solid rgba(255, 255, 255, 0.24);
      backdrop-filter: blur(12px);
      color: #ffffff;
      font: 700 15px Manrope, sans-serif;
      padding: 14px 28px;
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
      height: 520px;
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
    .orbit-glow-behind {
      position: absolute;
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 170, 255, 0.35) 0%, rgba(0, 90, 255, 0.15) 50%, transparent 70%);
      filter: blur(28px);
      pointer-events: none;
    }
    .orbit-ring {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    .ring-1 {
      width: 460px;
      height: 250px;
      transform: rotate(-25deg);
      border: 1.5px solid rgba(0, 210, 255, 0.45);
      box-shadow: 0 0 16px rgba(0, 190, 255, 0.28);
      animation: orbitSpinRing1 24s linear infinite;
    }
    .ring-2 {
      width: 480px;
      height: 220px;
      transform: rotate(32deg);
      border: 1px solid rgba(60, 130, 255, 0.42);
      box-shadow: 0 0 16px rgba(40, 120, 255, 0.22);
      animation: orbitSpinRing2 30s linear infinite reverse;
    }
    .ring-3 {
      width: 380px;
      height: 380px;
      border: 1px solid rgba(0, 230, 255, 0.24);
      animation: pulseGlobeGlow 4.5s ease-in-out infinite;
    }
    @keyframes orbitSpinRing1 {
      from { transform: rotate(-25deg) rotate(0deg); }
      to { transform: rotate(-25deg) rotate(360deg); }
    }
    @keyframes orbitSpinRing2 {
      from { transform: rotate(32deg) rotate(0deg); }
      to { transform: rotate(32deg) rotate(360deg); }
    }
    @keyframes pulseGlobeGlow {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.04); opacity: 0.85; }
    }

    /* 3D Holographic Sphere */
    .hologram-globe {
      width: 290px;
      height: 290px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 28%, #0099ff 0%, #004ecc 45%, #021142 85%);
      box-shadow: 
        0 0 65px rgba(0, 170, 255, 0.85),
        inset 0 0 50px rgba(0, 230, 255, 0.8),
        inset -12px -12px 45px rgba(0, 20, 90, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      animation: globeDrift 5s ease-in-out infinite;
    }
    .globe-shimmer {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle at 75% 80%, rgba(0, 240, 255, 0.45) 0%, transparent 50%);
      pointer-events: none;
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
      50% { transform: translateY(-8px) scale(1.02); }
    }

    .globe-core-mark {
      position: relative;
      z-index: 2;
      width: 155px;
      height: 155px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: markBob 4s ease-in-out infinite;
    }
    .mark-img-4b {
      width: 155px;
      height: 155px;
      object-fit: contain;
      filter: drop-shadow(0 0 28px rgba(0, 220, 255, 0.95)) drop-shadow(0 0 12px rgba(0, 110, 255, 0.95));
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
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(7, 24, 75, 0.92);
      border: 1.5px solid rgba(0, 210, 255, 0.65);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #38bdf8;
      box-shadow: 0 0 18px rgba(0, 190, 255, 0.55);
      z-index: 3;
      animation: nodeFloat 3.5s ease-in-out infinite;
    }
    .orbit-node svg {
      width: 18px;
      height: 18px;
    }
    .node-1 { top: 12px; left: 65px; animation-delay: 0.2s; }
    .node-2 { top: 28px; right: 40px; animation-delay: 1.1s; }
    .node-3 { bottom: 32px; left: 52px; animation-delay: 0.7s; }
    .node-4 { bottom: 38px; right: 48px; animation-delay: 1.6s; }
    @keyframes nodeFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-7px); }
    }

    /* Floating Glass Cards */
    .glass-chip {
      position: absolute;
      background: rgba(10, 28, 80, 0.78);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1.5px solid rgba(0, 190, 255, 0.42);
      border-radius: 20px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 220px;
      box-shadow: 
        0 14px 40px rgba(0, 8, 38, 0.7),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      z-index: 4;
      cursor: default;
      transition: transform 0.22s cubic-bezier(0.1, 0.9, 0.2, 1), box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .glass-chip:hover {
      border-color: #00e1ff;
      box-shadow: 
        0 18px 48px rgba(0, 150, 255, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }
    .chip-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .chip-icon svg {
      width: 22px;
      height: 22px;
    }
    .icon-bulb {
      background: linear-gradient(135deg, rgba(130, 60, 255, 0.45), rgba(70, 15, 180, 0.25));
      border: 1px solid rgba(160, 90, 255, 0.55);
      color: #c084fc;
      box-shadow: 0 0 14px rgba(150, 70, 255, 0.4);
    }
    .icon-rocket {
      background: linear-gradient(135deg, rgba(0, 150, 255, 0.45), rgba(0, 80, 200, 0.25));
      border: 1px solid rgba(0, 190, 255, 0.55);
      color: #38bdf8;
      box-shadow: 0 0 14px rgba(0, 160, 255, 0.4);
    }
    .icon-bar {
      background: linear-gradient(135deg, rgba(0, 210, 255, 0.45), rgba(0, 110, 180, 0.25));
      border: 1px solid rgba(0, 230, 255, 0.55);
      color: #22d3ee;
      box-shadow: 0 0 14px rgba(0, 220, 255, 0.4);
    }
    .icon-users {
      background: linear-gradient(135deg, rgba(90, 100, 255, 0.45), rgba(50, 60, 190, 0.25));
      border: 1px solid rgba(120, 140, 255, 0.55);
      color: #818cf8;
      box-shadow: 0 0 14px rgba(100, 120, 255, 0.4);
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
      color: #9bb7e3;
      line-height: 1.35;
    }

    .chip-ai { top: 25px; left: 10px; }
    .chip-innovation { top: 35px; right: 0; }
    .chip-strategy { bottom: 55px; left: 5px; }
    .chip-support { bottom: 70px; right: 15px; }

    /* Quote Badge */
    .script-badge-quote {
      position: absolute;
      right: 32px;
      bottom: 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: 'Caveat', cursive;
      font-size: 21px;
      line-height: 1.15;
      color: #bae6fd;
      transform: rotate(5deg);
      pointer-events: none;
      text-shadow: 0 0 12px rgba(0, 190, 255, 0.65);
    }
    .quote-underline {
      margin-top: -3px;
      filter: drop-shadow(0 0 8px #00d2ff);
    }

    /* Bottom Glass Running Marquee Bar in Hero Section */
    .hero-workflow-container {
      position: relative;
      z-index: 5;
      width: 100%;
      margin-top: 18px;
    }
    .hero-marquee-bar {
      position: relative;
      background: rgba(5, 18, 56, 0.78);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 170, 255, 0.32);
      border-radius: 24px;
      padding: 13px 0;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(1, 6, 24, 0.7);
      user-select: none;
    }
    .marquee-edge {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50px;
      z-index: 3;
      pointer-events: none;
    }
    .marquee-edge.edge-left {
      left: 0;
      background: linear-gradient(90deg, rgba(4, 15, 48, 0.95), transparent);
    }
    .marquee-edge.edge-right {
      right: 0;
      background: linear-gradient(270deg, rgba(4, 15, 48, 0.95), transparent);
    }
    .hero-marquee-track {
      display: flex;
      width: max-content;
      animation: heroMarqueeScroll 30s linear infinite;
      will-change: transform;
    }
    .hero-marquee-bar:hover .hero-marquee-track {
      animation-play-state: paused;
    }
    .hero-marquee-set {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
    .marquee-item {
      display: flex;
      align-items: center;
      gap: 13px;
      padding: 0 20px;
      flex-shrink: 0;
      transition: transform 0.22s ease;
    }
    .marquee-item:hover {
      transform: translateY(-2px);
    }
    .wf-icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: rgba(0, 110, 255, 0.2);
      border: 1px solid rgba(0, 180, 255, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00d2ff;
      flex-shrink: 0;
      box-shadow: 0 0 14px rgba(0, 140, 255, 0.3);
      transition: transform 0.22s ease, box-shadow 0.22s ease;
    }
    .wf-symbol {
      font-size: 19px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .marquee-item:hover .wf-icon {
      transform: scale(1.08);
      box-shadow: 0 0 20px rgba(0, 210, 255, 0.6);
    }
    .wf-icon.icon-bulb {
      color: #facc15;
      background: rgba(234, 179, 8, 0.18);
      border-color: rgba(250, 204, 21, 0.45);
      box-shadow: 0 0 14px rgba(234, 179, 8, 0.3);
    }
    .marquee-item:hover .wf-icon.icon-bulb {
      box-shadow: 0 0 20px rgba(250, 204, 21, 0.65);
    }
    .wf-icon.icon-cloud {
      color: #38bdf8;
    }
    .wf-icon.icon-gear {
      color: #00e5ff;
    }
    .wf-content {
      display: flex;
      flex-direction: column;
    }
    .wf-title {
      font: 700 14px Manrope, sans-serif;
      color: #ffffff;
      margin: 0 0 2px;
      white-space: nowrap;
    }
    .wf-sub {
      font-size: 11.5px;
      color: #94a9cc;
      white-space: nowrap;
    }
    .wf-sep {
      width: 1px;
      height: 30px;
      background: rgba(255, 255, 255, 0.12);
      margin-left: 18px;
      flex-shrink: 0;
    }
    @keyframes heroMarqueeScroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @media (max-width: 992px) {
      .hero-interactive-stage {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 24px;
      }
      .hero-subtext {
        margin: 0 auto 30px;
      }
      .hero-cta-btns {
        justify-content: center;
      }
      .hero-visual-col {
        height: 480px;
        margin-top: 10px;
      }
      .chip-ai { top: 15px; left: 2%; }
      .chip-innovation { top: 25px; right: 2%; }
      .chip-strategy { bottom: 45px; left: 2%; }
      .chip-support { bottom: 55px; right: 2%; }
      .script-badge-quote { right: 8%; bottom: 5px; }
    }
    @media (max-width: 768px) {
      .hero-land-glow {
        padding: 30px 0 25px;
        min-height: auto;
      }
      .hero-headline {
        font-size: clamp(32px, 7vw, 40px);
        line-height: 1.15;
      }
      .hero-subtext {
        font-size: 15px;
      }
      .hero-cta-btns {
        flex-wrap: wrap;
      }
      .hero-visual-col {
        height: 410px;
        transform: none !important;
      }
      .globe-system-wrap {
        width: 250px;
        height: 250px;
      }
      .hologram-globe {
        width: 220px;
        height: 220px;
      }
      .globe-core-mark, .mark-img-4b {
        width: 120px;
        height: 120px;
      }
      .ring-1 { width: 340px; height: 190px; }
      .ring-2 { width: 360px; height: 170px; }
      .ring-3 { width: 270px; height: 270px; }
      .orbit-glow-behind { width: 280px; height: 280px; }
      .glass-chip {
        min-width: 160px;
        padding: 10px 12px;
        gap: 10px;
        border-radius: 14px;
      }
      .glass-chip strong {
        font-size: 13px;
      }
      .glass-chip small {
        display: none;
      }
      .chip-icon {
        width: 36px;
        height: 36px;
      }
      .chip-icon svg {
        width: 18px;
        height: 18px;
      }
      .chip-ai { top: 10px; left: 0; }
      .chip-innovation { top: 15px; right: 0; }
      .chip-strategy { bottom: 35px; left: 0; }
      .chip-support { bottom: 45px; right: 0; }
      .script-badge-quote {
        font-size: 17px;
        right: 15px;
        bottom: 0;
      }
      .orbit-node {
        width: 32px;
        height: 32px;
      }
      .orbit-node svg {
        width: 15px;
        height: 15px;
      }
      .node-1 { top: 5px; left: 40px; }
      .node-2 { top: 20px; right: 25px; }
      .node-3 { bottom: 25px; left: 35px; }
      .node-4 { bottom: 25px; right: 35px; }
      .hero-marquee-bar {
        padding: 10px 0;
        border-radius: 18px;
      }
      .marquee-item {
        padding: 0 14px;
        gap: 9px;
      }
      .wf-icon {
        width: 34px;
        height: 34px;
      }
      .wf-symbol {
        font-size: 16px;
      }
      .wf-title {
        font-size: 13px;
      }
      .wf-sub {
        font-size: 10.5px;
      }
      .wf-sep {
        margin-left: 14px;
        height: 24px;
      }
    }
    @media (max-width: 480px) {
      .hero-headline {
        font-size: 30px;
      }
      .hero-visual-col {
        height: 350px;
      }
      .globe-system-wrap {
        width: 200px;
        height: 200px;
      }
      .hologram-globe {
        width: 180px;
        height: 180px;
      }
      .globe-core-mark, .mark-img-4b {
        width: 100px;
        height: 100px;
      }
      .ring-1 { width: 280px; height: 160px; }
      .ring-2 { width: 290px; height: 140px; }
      .ring-3 { width: 220px; height: 220px; }
      .glass-chip {
        min-width: 135px;
        padding: 8px 10px;
      }
      .glass-chip strong {
        font-size: 11.5px;
      }
      .chip-icon {
        width: 30px;
        height: 30px;
      }
      .chip-icon svg {
        width: 15px;
        height: 15px;
      }
      .btn-hero-gradient, .btn-hero-glass {
        width: 100%;
        justify-content: center;
      }
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
  features = heroFeatures;

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
  { path: 'about', redirectTo: '' },
  { path: 'services', redirectTo: '' },
  { path: 'solutions', redirectTo: '' },
  { path: 'ai-solutions', redirectTo: '' },
  { path: 'contact', redirectTo: '' },
  { path: 'careers', redirectTo: '' },
  { path: 'blog', redirectTo: '' },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: '**', redirectTo: '' },
];
