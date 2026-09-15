import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppComponent, routes } from './app/app.component';
bootstrapApplication(AppComponent, {providers:[provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration:'top'}))]}).catch(err => console.error(err));
