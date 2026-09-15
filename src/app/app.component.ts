import { Component, signal } from '@angular/core';
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
  ['✦', 'AI Solutions', 'Smart AI tools to automate and grow your business.'],
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
    id: 'ai-small-business',
    title: 'How AI is Changing Small Businesses',
    date: 'Aug 29, 2026',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    excerpt:
      'Practical ways intelligent tools are helping teams do more with less.',
  },
  {
    id: 'web-trends',
    title: 'Top Web Development Trends in 2026',
    date: 'Aug 20, 2026',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
    excerpt:
      'The practices shaping fast, thoughtful, future-ready experiences.',
  },
  {
    id: 'mobile-growth',
    title: 'Why Mobile Apps are Important for Business Growth',
    date: 'Aug 16, 2026',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
    excerpt:
      'A mobile-first relationship can make every customer moment count.',
  },
  {
    id: 'automation',
    title: 'Automation: Work Smarter, Not Harder',
    date: 'Aug 10, 2026',
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Where to streamline operations without losing the human touch.',
  },
];
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `<header [class.homebar]="home">
    <a routerLink="/" class="logo header-logo" aria-label="Build4Big home"><span class="brand-image"><img src="/build4big-logo.png" alt="Build4Big 4B logo" /></span><span>Build4Big</span></a
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
      ><a
        routerLink="/ai-solutions"
        routerLinkActive="active"
        (click)="open.set(false)"
        >AI Solutions</a
      ><a routerLink="/blog" routerLinkActive="active" (click)="open.set(false)"
        >Blog</a
      ><a
        routerLink="/contact"
        routerLinkActive="active"
        (click)="open.set(false)"
        >Contact</a
      ><a
        routerLink="/about"
        routerLinkActive="active"
        (click)="open.set(false)"
        >About</a
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
    }
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
        <a class="logo" routerLink="/"><img src="/build4big-logo.png" alt="Build4Big logo" /> Build4Big</a>
        <h2>Innovate Today<br />Build a Better Tomorrow</h2>
        <p>
          A startup software company helping businesses grow with modern
          technology and innovative solutions.
        </p>
        <div class="social">in　◎　𝕏　▶</div>
      </section>
      <section>
        <h4>Quick Links</h4>
        <a routerLink="/">Home</a><a routerLink="/about">About Us</a
        ><a routerLink="/services">Services</a
        ><a routerLink="/ai-solutions">AI Solutions</a
        ><a routerLink="/blog">Blog</a>
      </section>
      <section>
        <h4>Our Services</h4>
        <a>Web Development</a><a>Mobile Apps</a><a>Software Development</a
        ><a>AI Solutions</a><a>Automation</a><a>IT Consulting</a>
      </section>
      <section>
        <h4>Contact Info</h4>
        <p>⌖ Plot No. 2, Thirunagar, Madurai</p>
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
      grid-template-columns: 2.1fr 1fr 1.25fr 1.3fr;
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
      font-size: 13px;
    }
    .foot p,
    .foot section > a {
      display: block;
      color: #b9c0dc;
      font-size: 12px;
      line-height: 1.7;
      margin: 0 0 9px;
    }
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
@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  template: `<app-header></app-header>
    <main class="page container">
      <div class="page-head">
        <div class="eyebrow">Our services</div>
        <h1>Technology Solutions<br />for Your Business</h1>
        <p>
          We help you build, scale and transform your business with custom
          software solutions.
        </p>
      </div>
      <div class="service-grid">
        <article class="service card" *ngFor="let s of items">
          <i>{{ s.icon }}</i>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </article>
      </div>
      <section class="cta">
        <div>
          <b>Have a project in mind?</b
          ><span>Let's build something amazing together.</span>
        </div>
        <a routerLink="/contact" class="btn">Contact Us　→</a>
      </section>
    </main>
    <app-footer></app-footer>`,
  styles: `
    .service-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      max-width: 850px;
      margin: auto;
    }
    .service {
      padding: 28px;
      min-height: 170px;
    }
    .service i {
      color: #3159f5;
      background: #eef1ff;
      border-radius: 12px;
      padding: 11px;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
    }
    .service h3 {
      font-size: 17px;
      margin: 22px 0 8px;
    }
    .service p {
      color: #69708a;
      font-size: 13px;
      line-height: 1.6;
      margin: 0;
    }
    .cta {
      max-width: 850px;
      margin: 28px auto 0;
      background: linear-gradient(100deg, #eef1ff, #f7f8ff);
      padding: 22px 25px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .cta b,
    .cta span {
      display: block;
    }
    .cta span {
      font-size: 12px;
      color: #69708a;
      margin-top: 5px;
    }
    .cta .btn {
      padding: 11px 17px;
      font-size: 12px;
    }
    @media (max-width: 600px) {
      .service-grid {
        grid-template-columns: 1fr;
      }
      .cta {
        align-items: flex-start;
        gap: 15px;
        flex-direction: column;
      }
    }
  `,
})
export class ServicesComponent {
  items = services;
}
@Component({
  selector: 'app-about',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `<app-header></app-header>
    <main class="page container">
      <div class="about">
        <section>
          <div class="eyebrow">Our story</div>
          <h1>About Us</h1>
          <h3>A passionate team building technology for a better tomorrow.</h3>
          <p>
            Build4Big is a startup software and technology company focused on
            delivering innovative digital solutions to businesses, startups, and
            enterprises. We combine creativity, technology and strategy to build
            products that make an impact.
          </p>
        </section>
        <div class="idea">
          <span>Ideas<br />Code<br />Create<br /><b>Grow</b></span>
        </div>
      </div>
      <div class="values">
        <div *ngFor="let v of values">
          <i>{{ v[0] }}</i
          ><b>{{ v[1] }}</b>
        </div>
      </div>
      <div class="statbar">
        <div *ngFor="let s of stats">
          <b>{{ s[0] }}</b
          ><span>{{ s[1] }}</span>
        </div>
      </div>
      <section class="mission">
        <div class="team">◌　◉　◌</div>
        <div>
          <div class="eyebrow">Our mission</div>
          <p>
            To empower businesses with technology that simplifies, automates and
            accelerates growth.
          </p>
          <button class="btn">Learn More</button>
        </div>
      </section>
    </main>
    <app-footer></app-footer>`,
  styles: `
    .about {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 70px;
      align-items: center;
      max-width: 850px;
      margin: auto;
    }
    .about h1 {
      font-size: 42px;
      margin: 12px 0;
    }
    .about h3 {
      font-size: 16px;
      letter-spacing: -0.02em;
    }
    .about p {
      color: #69708a;
      line-height: 1.7;
      font-size: 13px;
    }
    .idea {
      height: 275px;
      border-radius: 20px;
      background:
        linear-gradient(#dce0e5aa, #7f8a91cc),
        url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=650&q=80')
          center/cover;
      display: grid;
      place-items: center;
    }
    .idea span {
      font: 700 25px Manrope;
      text-align: center;
    }
    .idea b {
      color: #3159f5;
    }
    .values,
    .statbar {
      max-width: 850px;
      margin: 45px auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      text-align: center;
    }
    .values i {
      display: block;
      color: #3159f5;
      background: #eff2ff;
      border-radius: 50%;
      width: 42px;
      height: 42px;
      padding-top: 12px;
      margin: auto auto 9px;
      font-style: normal;
    }
    .values b {
      font-size: 11px;
    }
    .statbar {
      background: #080f2b;
      color: white;
      border-radius: 15px;
      padding: 20px 28px;
      text-align: left;
    }
    .statbar b,
    .statbar span {
      display: block;
    }
    .statbar b {
      font: 800 22px Manrope;
    }
    .statbar span {
      font-size: 10px;
      color: #c1c9e6;
    }
    .mission {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 35px;
      align-items: center;
      max-width: 850px;
      margin: auto;
    }
    .team {
      height: 185px;
      border-radius: 17px;
      background: linear-gradient(135deg, #becbff, #eef1ff);
      font-size: 70px;
      display: grid;
      place-items: center;
      color: #3159f5;
    }
    .mission p {
      font: 700 17px Manrope;
      line-height: 1.5;
    }
    .mission .btn {
      font-size: 12px;
    }
    @media (max-width: 650px) {
      .about,
      .mission {
        grid-template-columns: 1fr;
        gap: 25px;
      }
      .values,
      .statbar {
        grid-template-columns: repeat(2, 1fr);
        gap: 22px;
      }
      .mission .team {
        order: 2;
      }
    }
  `,
})
export class AboutComponent {
  values = [
    ['✦', 'Innovation First'],
    ['◉', 'Client Focused'],
    ['◈', 'Quality Driven'],
    ['◎', 'Long Term Partnerships'],
  ];
  stats = [
    ['50+', 'Happy Clients'],
    ['100+', 'Projects Delivered'],
    ['3+', 'Years of Vision'],
    ['24/7', 'Support'],
  ];
}
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
  selector: 'app-detail',
  imports: [RouterLink, HeaderComponent, FooterComponent],
  template: `<app-header></app-header>
    <main class="page container detail">
      <div class="eyebrow">Build4Big journal</div>
      <h1>Ideas that turn technology into impact</h1>
      <img
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80"
      />
      <p>
        Modern technology becomes powerful when it helps people solve real
        problems. In this journal, we share practical perspectives on building
        smarter, more meaningful digital products.
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
    }
    .detail img {
      width: 100%;
      height: 330px;
      object-fit: cover;
      border-radius: 17px;
      margin: 25px 0;
    }
    .detail p {
      font-size: 16px;
      line-height: 1.9;
      color: #555d75;
    }
  `,
})
export class BlogDetailComponent {}
@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, FooterComponent],
  template: `
    <div id="home">
      <header class="one-nav">
        <a href="#home" class="menu-logo" aria-label="Build4Big home"><span class="brand-image"><img src="/build4big-mark.svg" alt="Build4Big 4B logo" /></span><span>Build4Big</span></a>
        <nav><a href="#home">Home</a><a routerLink="/about">About</a><a routerLink="/services">Services</a><a routerLink="/ai-solutions">AI Solutions</a><a routerLink="/blog">Blog</a><a routerLink="/contact">Contact</a></nav>
        <a href="#contact">Get Started</a>
      </header>
      <div class="hero-land">
        <div class="container hero-content">
          <div class="hero-copy"><div class="tag">● Innovate　•　Build　•　Grow</div>
          <h1>Transforming<br />Ideas into <em>Digital Reality</em></h1>
          <p>
            We are a startup software company helping businesses build modern
            digital products, websites, mobile apps, AI solutions and automation
            systems.
          </p>
          <a href="#contact" class="go">Get Started　→</a
          ><a href="#about" class="watch">▷ Watch Our Story</a></div>
          <div class="hero-logo"><img src="/build4big-logo.png" alt="Build4Big 4B logo" /><i></i><i></i><i></i></div>
        </div>
      </div>
    </div>
    <section id="about" class="landing-section">
      <div class="container split">
        <div>
          <div class="eyebrow">Our Story</div>
          <h2>About Us</h2>
          <h3>A passionate team building technology for a better tomorrow.</h3>
          <p>
            Build4Big delivers innovative digital solutions for businesses,
            startups and enterprises. We combine creativity, technology and
            strategy to build products that make an impact.
          </p>
        </div>
        <div class="idea-box">Ideas<br />Code<br />Create<br /><b>Grow</b></div>
      </div>
      <div class="container metrics">
        <b>50+<small>Happy Clients</small></b
        ><b>100+<small>Projects Delivered</small></b
        ><b>3+<small>Years of Vision</small></b
        ><b>24/7<small>Support</small></b>
      </div>
    </section>
    <section id="services" class="landing-section light">
      <div class="heading">
        <div class="eyebrow">Our Services</div>
        <h2>Technology Solutions<br />for Your Business</h2>
        <p>
          We help you build, scale and transform your business with custom
          software solutions.
        </p>
      </div>
      <div class="container tiles">
        <article *ngFor="let s of services">
          <i>{{ s.icon }}</i>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </article>
      </div>
    </section>
    <section id="ai" class="landing-section">
      <div class="container split">
        <div>
          <div class="eyebrow">Powered by AI</div>
          <h2>Smarter Solutions<br />with Artificial Intelligence</h2>
          <p>
            We build AI-powered tools to help businesses automate processes and
            make data-driven decisions.
          </p>
          <div class="list" *ngFor="let x of ai">
            <b>{{ x[0] }}</b
            ><span
              ><strong>{{ x[1] }}</strong
              >{{ x[2] }}</span
            >
          </div>
        </div>
        <div class="robot">●　●<span>◉</span></div>
      </div>
    </section>
    <section id="careers" class="landing-section light">
      <div class="container split">
        <div>
          <div class="eyebrow">Join Our Team</div>
          <h2>Build Your Future<br />with Build4Big</h2>
          <p>
            We're always looking for passionate, talented and curious people to
            join our journey.
          </p>
          <div class="benefits">
            ⌂ Flexible Work　　✦ Innovative Projects<br />▣ Learning &
            Growth　　☻ Supportive Team
          </div>
        </div>
        <div class="person">👨🏽‍💻</div>
      </div>
    </section>
    <section id="blog" class="landing-section">
      <div class="heading">
        <div class="eyebrow">Our Blog</div>
        <h2>Insights, Ideas and Innovation</h2>
        <p>
          Stay updated with technology, AI, business and digital transformation.
        </p>
      </div>
      <div class="container tiles blogtiles">
        <article *ngFor="let p of posts">
          <img [src]="p.image" /><small>{{ p.date }}</small>
          <h3>{{ p.title }}</h3>
          <p>{{ p.excerpt }}</p>
          <a href="#contact">Read More →</a>
        </article>
      </div>
    </section>
    <section id="contact" class="landing-section light">
      <div class="heading">
        <div class="eyebrow">Get In Touch</div>
        <h2>Let's Work Together</h2>
        <p>Have a project in mind? We'd love to hear from you.</p>
      </div>
      <div class="container split contact">
        <div>
          <h3>Contact Information</h3>
          <p>
            ⌖ Plot No. 2, Mahatma Gandhi 11th Street,<br />Thirunagar, Madurai -
            625006
          </p>
          <p>
            ☎ +91 96777 45205<br />◉ +91 70106 68560<br />✉
            info@build4big.com<br />◷ Mon - Sun: 10 AM - 7 PM
          </p>
        </div>
        <div class="form">
          <h3>Send us a message</h3>
          <input placeholder="Your Name" /><input
            placeholder="Your Email"
          /><textarea placeholder="Your Message"></textarea
          ><button>Send Message　→</button>
        </div>
      </div>
    </section>
    <app-footer></app-footer>
  `,
  styles: `
    .one-nav{height:76px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 max(24px,calc((100vw - 1120px)/2));background:#fff;position:sticky;top:0;z-index:9}.one-nav>a{font:800 16px Manrope;color:#080f2b;text-decoration:none}.one-nav>a:last-child{background:#3159f5;color:#fff;padding:12px 18px;border-radius:10px;font:700 12px 'DM Sans'}.one-nav nav{display:flex;gap:18px}.one-nav nav a{font-size:12px;font-weight:700;color:#111936;text-decoration:none}.one-nav nav a:hover{color:#3159f5}
    .hero-land {
      background: radial-gradient(circle at 72% 50%, #263f9d, #080f2b 62%);
      color: #fff;
      padding: 135px 0;
    }
    .hero-land h1 {
      font: 800 55px/1.12 Manrope;
      margin: 18px 0;
    }
    .hero-land em {
      font-style: normal;
      color: #4e70ff;
    }
    .hero-land p {
      max-width: 560px;
      line-height: 1.8;
    }
    .tag {
      font-size: 11px;
      color: #c5d1ff;
    }
    .go,
    .watch {
      display: inline-block;
      margin: 20px 12px 0 0;
      padding: 14px 20px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: bold;
      text-decoration: none;
    }
    .go {
      background: #3159f5;
      color: white;
    }
    .watch {
      color: white;
      border: 1px solid #ffffff55;
    }
    .landing-section {
      padding: 85px 0;
      scroll-margin-top: 76px;
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
      .hero-land {
        padding: 90px 0;
      }
      .hero-land h1 {
        font-size: 39px;
      }
      .one-nav{height:auto;padding:16px 18px;align-items:flex-start}.one-nav nav{flex-wrap:wrap;gap:10px}.one-nav>a:last-child{display:none}
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
  ai = [
    ['◌', 'AI Chatbots', 'Automate customer support and engagement.'],
    ['◇', 'AI for Business', 'Intelligent solutions for smarter decisions.'],
    ['⌁', 'Data Analysis', 'Turn your data into valuable insights.'],
    ['✦', 'Custom AI Solutions', 'Tailored AI tools for your unique needs.'],
  ];
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
  { path: 'ai-solutions', component: AiComponent },
  simple(
    'contact',
    'Get in touch',
    "Let's Work Together",
    "Have a project in mind? We'd love to hear from you. Send us a message and we'll get back soon.",
  ),
  simple(
    'careers',
    'Join our team',
    'Build Your Future with Build4Big',
    "We're always looking for passionate, talented and curious people to join our journey.",
  ),
  simple(
    'blog',
    'Our blog',
    'Insights, Ideas and Innovation',
    'Stay updated with the latest trends in technology, AI, business and digital transformation.',
  ),
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: '**', redirectTo: '' },
];
