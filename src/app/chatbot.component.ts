import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  chips?: { label: string; action: string }[];
  isQuoteSummary?: boolean;
  quoteData?: {
    name: string;
    email: string;
    projectType: string;
    requirement: string;
  };
}

interface QuoteFormState {
  active: boolean;
  step: 'name' | 'email' | 'projectType' | 'requirement' | 'done';
  name: string;
  email: string;
  projectType: string;
  requirement: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Launcher Button -->
    <div class="chatbot-floating-wrapper" [class.open]="isOpen()">
      <!-- Subtle Attention Notification Badge -->
      <button
        *ngIf="!isOpen() && hasUnread()"
        class="chatbot-unread-pill"
        (click)="openChat()"
        aria-label="New message from Build4Big Assistant"
      >
        <span class="pill-dot"></span>
        <span>AI Voice Assistant Online</span>
      </button>

      <!-- Main Floating Circle Button -->
      <button
        class="chatbot-launcher-btn"
        (click)="toggleChat()"
        [attr.aria-label]="isOpen() ? 'Close AI Assistant' : 'Open Build4Big AI Voice Assistant'"
        [attr.aria-expanded]="isOpen()"
      >
        <!-- Notification Dot when closed -->
        <span *ngIf="!isOpen()" class="launcher-beacon">
          <span class="beacon-pulse"></span>
          <span class="beacon-core"></span>
        </span>

        <!-- Robot Icon when Closed -->
        <div class="icon-state robot-state" [class.visible]="!isOpen()">
          <svg class="launcher-robot-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Antenna -->
            <path d="M18 3V7" stroke="#00d2ff" stroke-width="2" stroke-linecap="round" />
            <circle cx="18" cy="3" r="2.5" fill="#00d2ff" class="antenna-glow" />
            <!-- Head -->
            <rect x="6" y="7" width="24" height="20" rx="6" fill="url(#botHeadGrad)" stroke="#00d2ff" stroke-width="1.6" />
            <!-- Visor Screen -->
            <rect x="9.5" y="11" width="17" height="11" rx="3.5" fill="#050e26" stroke="rgba(0, 210, 255, 0.4)" stroke-width="1" />
            <!-- Glowing Eyes -->
            <ellipse cx="14" cy="16.5" rx="2" ry="2.5" fill="#00f2fe" class="robot-eye left-eye" />
            <ellipse cx="22" cy="16.5" rx="2" ry="2.5" fill="#00f2fe" class="robot-eye right-eye" />
            <!-- Mouth / Audio Wave Line -->
            <path d="M14 20C15.3 20.8 16.7 21 18 21C19.3 21 20.7 20.8 22 20" stroke="#00f2fe" stroke-width="1.2" stroke-linecap="round" />
            <!-- Side Ear Nodes -->
            <rect x="3.5" y="14" width="2.5" height="6" rx="1.2" fill="#00d2ff" />
            <rect x="30" y="14" width="2.5" height="6" rx="1.2" fill="#00d2ff" />
            <!-- Body Neck -->
            <path d="M14 27H22L20 31H16L14 27Z" fill="#0088ff" opacity="0.8" />
            <!-- Gradient Definition -->
            <defs>
              <linearGradient id="botHeadGrad" x1="6" y1="7" x2="30" y2="27" gradientUnits="userSpaceOnUse">
                <stop stop-color="#0a1a44" />
                <stop offset="1" stop-color="#030a1c" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <!-- Close 'X' Icon when Open -->
        <div class="icon-state close-state" [class.visible]="isOpen()">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </button>
    </div>

    <!-- Chatbot Window Panel -->
    <div
      class="chatbot-panel"
      [class.active]="isOpen()"
      role="dialog"
      aria-labelledby="chatbot-heading"
      [attr.aria-hidden]="!isOpen()"
    >
      <!-- Header -->
      <header class="chatbot-header">
        <div class="header-bot-profile">
          <div class="bot-avatar-ring">
            <svg class="header-robot-svg" viewBox="0 0 32 32" fill="none">
              <rect x="5" y="6" width="22" height="18" rx="5" fill="#0b1e48" stroke="#00d2ff" stroke-width="1.4" />
              <rect x="8" y="9.5" width="16" height="10" rx="3" fill="#020818" />
              <circle cx="12" cy="14.5" r="1.8" fill="#00f2fe" class="avatar-eye" />
              <circle cx="20" cy="14.5" r="1.8" fill="#00f2fe" class="avatar-eye" />
              <path d="M16 2V6" stroke="#00d2ff" stroke-width="1.6" stroke-linecap="round" />
              <circle cx="16" cy="2" r="1.6" fill="#00f2fe" />
              <path d="M12.5 17.5Q16 19 19.5 17.5" stroke="#00d2ff" stroke-width="1" stroke-linecap="round" />
            </svg>
            <span class="online-status-dot" title="AI Online"></span>
          </div>
          <div class="bot-header-text">
            <div class="bot-name" id="chatbot-heading">
              Build4Big Assistant
              <span class="ai-pill">AI VOICE</span>
            </div>
            <div class="bot-status">
              <span *ngIf="isSpeaking()" class="status-speaking">
                <span class="voice-mini-wave">
                  <span></span><span></span><span></span>
                </span>
                Speaking...
              </span>
              <span *ngIf="isListening()" class="status-listening">
                <span class="mic-live-dot"></span>
                Listening to you...
              </span>
              <span *ngIf="!isSpeaking() && !isListening()">
                ● Online | Fast Tech Advisor
              </span>
            </div>
          </div>
        </div>

        <!-- Header Actions -->
        <div class="header-controls">
          <!-- Voice Mute / Unmute Toggle -->
          <button
            class="ctrl-action-btn"
            [class.muted]="isMuted()"
            (click)="toggleMute()"
            [title]="isMuted() ? 'Unmute voice output' : 'Mute voice output'"
            aria-label="Toggle voice output"
          >
            <svg *ngIf="!isMuted()" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <svg *ngIf="isMuted()" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          </button>

          <!-- Reset / Clear Chat -->
          <button
            class="ctrl-action-btn"
            (click)="resetConversation()"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
            </svg>
          </button>

          <!-- Close / Minimize -->
          <button
            class="ctrl-action-btn close-panel-btn"
            (click)="closeChat()"
            title="Close chatbot"
            aria-label="Close chatbot"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <!-- Live Voice Visualizer Bar (Shown when speaking or listening) -->
      <div *ngIf="isSpeaking() || isListening()" class="voice-activity-banner" [class.listening]="isListening()">
        <div class="voice-wave-bars">
          <span class="vbar"></span>
          <span class="vbar"></span>
          <span class="vbar"></span>
          <span class="vbar"></span>
          <span class="vbar"></span>
          <span class="vbar"></span>
          <span class="vbar"></span>
        </div>
        <span class="voice-activity-text">
          {{ isListening() ? 'Listening... (Speak clearly into your microphone)' : 'Speaking answer out loud...' }}
        </span>
        <button *ngIf="isSpeaking()" (click)="stopSpeech()" class="stop-speech-pill" title="Stop speech">
          Stop ⏹
        </button>
      </div>

      <!-- Messages Scroll Area -->
      <div class="chatbot-messages" #messagesContainer>
        <div class="chat-day-divider">
          <span>Today • Build4Big AI Voice Assistant</span>
        </div>

        <!-- Render Messages -->
        <div
          *ngFor="let msg of messages()"
          class="chat-row"
          [class.bot-row]="msg.sender === 'bot'"
          [class.user-row]="msg.sender === 'user'"
        >
          <!-- Bot Avatar on left -->
          <div *ngIf="msg.sender === 'bot'" class="msg-bot-avatar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <rect x="3" y="4" width="18" height="15" rx="4" fill="#091b42" stroke="#00d2ff" stroke-width="1.3"/>
              <circle cx="8.5" cy="11.5" r="1.5" fill="#00f2fe"/>
              <circle cx="15.5" cy="11.5" r="1.5" fill="#00f2fe"/>
              <path d="M12 1V4" stroke="#00d2ff" stroke-width="1.3" stroke-linecap="round"/>
              <path d="M9 16Q12 17.5 15 16" stroke="#00d2ff" stroke-width="1" stroke-linecap="round"/>
            </svg>
          </div>

          <!-- Bubble -->
          <div class="msg-bubble-wrap">
            <div class="msg-bubble" [innerHTML]="formatMessageText(msg.text)"></div>

            <!-- Quote Summary Card if completed -->
            <div *ngIf="msg.isQuoteSummary && msg.quoteData" class="quote-summary-card">
              <div class="quote-card-header">
                <span class="badge-icon">📋</span>
                <strong>Quote Request Summary</strong>
              </div>
              <div class="quote-card-details">
                <div class="quote-row"><span class="lbl">Client:</span> <span class="val">{{ msg.quoteData.name }}</span></div>
                <div class="quote-row"><span class="lbl">Email:</span> <span class="val">{{ msg.quoteData.email }}</span></div>
                <div class="quote-row"><span class="lbl">Service:</span> <span class="val highlight">{{ msg.quoteData.projectType }}</span></div>
                <div class="quote-row"><span class="lbl">Requirement:</span> <span class="val">{{ msg.quoteData.requirement }}</span></div>
              </div>
              <div class="quote-card-footer">
                <span>⏱ Response SLA: Within 24 hours</span>
              </div>
            </div>

            <!-- Contextual Quick Action Chips -->
            <div *ngIf="msg.chips && msg.chips.length > 0" class="msg-chips-container">
              <button
                *ngFor="let chip of msg.chips"
                class="quick-action-chip"
                (click)="onChipClick(chip)"
              >
                {{ chip.label }}
              </button>
            </div>

            <div class="msg-meta">
              <span class="msg-time">{{ msg.time }}</span>
              <button
                *ngIf="msg.sender === 'bot' && !isMuted()"
                class="replay-voice-btn"
                (click)="speakText(msg.text)"
                title="Read message aloud"
                aria-label="Read message aloud"
              >
                🔊
              </button>
            </div>
          </div>
        </div>

        <!-- Typing / Processing Indicator -->
        <div *ngIf="isTyping()" class="chat-row bot-row typing-row">
          <div class="msg-bot-avatar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <rect x="3" y="4" width="18" height="15" rx="4" fill="#091b42" stroke="#00d2ff" stroke-width="1.3"/>
              <circle cx="8.5" cy="11.5" r="1.5" fill="#00f2fe"/>
              <circle cx="15.5" cy="11.5" r="1.5" fill="#00f2fe"/>
            </svg>
          </div>
          <div class="typing-bubble">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>

        <!-- Persistent Quick Action Pills (shown after greeting or when idle) -->
        <div *ngIf="showPersistentQuickActions() && !isTyping() && !quoteForm.active" class="persistent-actions-tray">
          <div class="tray-label">⚡ Quick Options</div>
          <div class="tray-buttons">
            <button class="tray-btn" (click)="handleAction('services')">💼 Our Services</button>
            <button class="tray-btn quote-highlight" (click)="handleAction('quote')">📊 Get a Quote</button>
            <button class="tray-btn" (click)="handleAction('company')">🏢 Company Info</button>
            <button class="tray-btn" (click)="handleAction('meeting')">📅 Book a Meeting</button>
            <button class="tray-btn" (click)="handleAction('human')">👤 Talk to a Human</button>
          </div>
        </div>
      </div>

      <!-- Footer Input Area -->
      <footer class="chatbot-input-footer">
        <!-- Error notification if mic or speech recognition unsupported/denied -->
        <div *ngIf="micError()" class="mic-error-toast">
          {{ micError() }}
          <button (click)="micError.set('')" class="toast-close">✕</button>
        </div>

        <!-- Form Bar -->
        <form class="chat-input-form" (ngSubmit)="sendUserText()">
          <!-- Speech-to-Text Microphone Button -->
          <button
            type="button"
            class="mic-btn"
            [class.recording]="isListening()"
            [class.unsupported]="!speechRecognitionSupported"
            (click)="toggleListening()"
            [title]="
              !speechRecognitionSupported
                ? 'Voice input not supported in this browser'
                : isListening()
                ? 'Stop listening'
                : 'Click to speak using your microphone'
            "
            [attr.aria-label]="isListening() ? 'Stop voice recording' : 'Start voice recording'"
          >
            <div class="mic-pulse-ring" *ngIf="isListening()"></div>
            <svg *ngIf="!isListening()" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            <svg *ngIf="isListening()" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ff3366" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="#ff3366"></rect>
            </svg>
          </button>

          <!-- Input Text Field -->
          <input
            #userInputField
            type="text"
            [(ngModel)]="userMessageInput"
            name="chatMessage"
            [placeholder]="isListening() ? 'Listening... speak now' : 'Ask anything or type details...'"
            autocomplete="off"
            [disabled]="isListening()"
            (keydown.enter)="sendUserText()"
          />

          <!-- Send Button -->
          <button
            type="submit"
            class="send-btn"
            [disabled]="!userMessageInput.trim() || isListening()"
            title="Send message"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>

        <div class="chat-footer-brand">
          <span>Powered by <strong>Build4Big AI</strong></span>
          <span class="dot-sep">•</span>
          <span>Web Speech Voice Engine</span>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        --cb-primary: #0066ff;
        --cb-cyan: #00d2ff;
        --cb-cyan-glow: rgba(0, 210, 255, 0.45);
        --cb-dark: #04091e;
        --cb-dark-card: rgba(6, 14, 38, 0.94);
        --cb-border: rgba(0, 210, 255, 0.22);
        --cb-text: #eaf1fb;
        --cb-muted: #8ea3c7;
      }

      /* ==========================================================================
         1. FLOATING LAUNCHER BUTTON (Bottom-Right)
         ========================================================================== */
      .chatbot-floating-wrapper {
        position: fixed;
        bottom: 26px;
        right: 26px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
        pointer-events: auto;
      }

      /* Attention Pill Badge */
      .chatbot-unread-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(4, 13, 38, 0.92);
        color: #eaf1fb;
        border: 1px solid rgba(0, 210, 255, 0.35);
        border-radius: 999px;
        padding: 8px 16px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(0, 210, 255, 0.25);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        animation: pillFloat 3.5s ease-in-out infinite;
        white-space: nowrap;
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
      .chatbot-unread-pill:hover {
        transform: translateY(-3px);
        border-color: #00d2ff;
      }
      .pill-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00ff88;
        box-shadow: 0 0 8px #00ff88;
        animation: beaconGlow 1.8s ease-in-out infinite;
      }

      /* Main Launcher Circle Button */
      .chatbot-launcher-btn {
        position: relative;
        width: 62px;
        height: 62px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0052e0 0%, #0099ff 50%, #00d2ff 100%);
        border: 2px solid rgba(255, 255, 255, 0.3);
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        box-shadow: 0 10px 28px rgba(0, 102, 255, 0.45), 0 0 20px rgba(0, 210, 255, 0.35);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
      }
      .chatbot-launcher-btn:hover {
        transform: scale(1.08) translateY(-2px);
        box-shadow: 0 14px 36px rgba(0, 102, 255, 0.6), 0 0 28px rgba(0, 210, 255, 0.5);
      }
      .chatbot-launcher-btn:active {
        transform: scale(0.96);
      }

      /* Notification Pulse Dot */
      .launcher-beacon {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .beacon-core {
        width: 10px;
        height: 10px;
        background: #00ff88;
        border-radius: 50%;
        border: 1.5px solid #040d26;
        box-shadow: 0 0 8px #00ff88;
      }
      .beacon-pulse {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(0, 255, 136, 0.6);
        animation: pulseRing 2s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
      }

      /* Icons Inside Launcher Button */
      .icon-state {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: scale(0.6) rotate(-30deg);
        transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        pointer-events: none;
      }
      .icon-state.visible {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
      .launcher-robot-svg {
        width: 34px;
        height: 34px;
        filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));
      }
      .antenna-glow {
        animation: beaconGlow 1.6s ease-in-out infinite alternate;
      }
      .robot-eye {
        animation: robotBlink 4s infinite ease-in-out;
      }

      /* ==========================================================================
         2. CHATBOT WINDOW CONTAINER
         ========================================================================== */
      .chatbot-panel {
        position: fixed;
        bottom: 100px;
        right: 26px;
        width: 400px;
        max-width: calc(100vw - 32px);
        height: 610px;
        max-height: calc(100vh - 120px);
        background: var(--cb-dark-card);
        border: 1px solid var(--cb-border);
        border-radius: 24px;
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.65), 0 0 35px rgba(0, 210, 255, 0.15);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 99998;
        opacity: 0;
        transform: scale(0.85) translateY(24px);
        transform-origin: bottom right;
        pointer-events: none;
        visibility: hidden;
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
          transform 0.34s cubic-bezier(0.16, 1, 0.3, 1),
          visibility 0.3s;
      }
      .chatbot-panel.active {
        opacity: 1;
        transform: scale(1) translateY(0);
        pointer-events: auto;
        visibility: visible;
      }

      /* ==========================================================================
         3. CHATBOT HEADER
         ========================================================================== */
      .chatbot-header {
        padding: 14px 18px;
        background: linear-gradient(180deg, rgba(8, 20, 52, 0.95) 0%, rgba(4, 11, 30, 0.9) 100%);
        border-bottom: 1px solid rgba(0, 210, 255, 0.18);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }
      .header-bot-profile {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .bot-avatar-ring {
        position: relative;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: radial-gradient(circle, #0b225c 0%, #030a1c 100%);
        border: 1.5px solid rgba(0, 210, 255, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 14px rgba(0, 210, 255, 0.3);
      }
      .header-robot-svg {
        width: 28px;
        height: 28px;
      }
      .online-status-dot {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #00ff88;
        border: 2px solid #04091e;
        box-shadow: 0 0 8px #00ff88;
      }
      .bot-header-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .bot-name {
        font-family: 'Manrope', sans-serif;
        font-size: 15px;
        font-weight: 800;
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .ai-pill {
        font-size: 9.5px;
        font-weight: 800;
        color: #00d2ff;
        background: rgba(0, 210, 255, 0.12);
        border: 1px solid rgba(0, 210, 255, 0.3);
        padding: 1.5px 6px;
        border-radius: 6px;
        letter-spacing: 0.04em;
      }
      .bot-status {
        font-size: 11.5px;
        color: var(--cb-muted);
        font-weight: 500;
      }
      .status-speaking {
        color: #00e5ff;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .voice-mini-wave {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        height: 10px;
      }
      .voice-mini-wave span {
        width: 2px;
        height: 100%;
        background: #00e5ff;
        border-radius: 1px;
        animation: miniWave 0.8s ease-in-out infinite alternate;
      }
      .voice-mini-wave span:nth-child(2) {
        animation-delay: 0.2s;
      }
      .voice-mini-wave span:nth-child(3) {
        animation-delay: 0.4s;
      }

      .status-listening {
        color: #ff3366;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .mic-live-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #ff3366;
        animation: pulseRed 1s infinite alternate;
      }

      /* Header Controls */
      .header-controls {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .ctrl-action-btn {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #a6c0e8;
        width: 32px;
        height: 32px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .ctrl-action-btn:hover {
        background: rgba(0, 210, 255, 0.15);
        border-color: rgba(0, 210, 255, 0.4);
        color: #ffffff;
      }
      .ctrl-action-btn.muted {
        color: #ff5e7e;
        border-color: rgba(255, 94, 126, 0.35);
      }
      .close-panel-btn:hover {
        background: rgba(255, 50, 80, 0.2);
        border-color: rgba(255, 50, 80, 0.5);
        color: #ffffff;
      }

      /* ==========================================================================
         4. VOICE ACTIVITY BANNER
         ========================================================================== */
      .voice-activity-banner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        background: linear-gradient(90deg, rgba(0, 102, 255, 0.22) 0%, rgba(0, 210, 255, 0.18) 100%);
        border-bottom: 1px solid rgba(0, 210, 255, 0.2);
        font-size: 12px;
        color: #c9e2ff;
        font-weight: 600;
        animation: bannerSlideDown 0.3s ease;
      }
      .voice-activity-banner.listening {
        background: linear-gradient(90deg, rgba(255, 51, 102, 0.22) 0%, rgba(255, 102, 0, 0.18) 100%);
        border-color: rgba(255, 51, 102, 0.3);
        color: #ffccd7;
      }
      .voice-wave-bars {
        display: flex;
        align-items: center;
        gap: 3px;
        height: 14px;
      }
      .vbar {
        width: 3px;
        height: 6px;
        border-radius: 2px;
        background: #00d2ff;
        animation: vbarDance 0.75s ease-in-out infinite alternate;
      }
      .voice-activity-banner.listening .vbar {
        background: #ff3366;
      }
      .vbar:nth-child(1) { animation-delay: 0.05s; }
      .vbar:nth-child(2) { animation-delay: 0.15s; }
      .vbar:nth-child(3) { animation-delay: 0.3s; }
      .vbar:nth-child(4) { animation-delay: 0.45s; }
      .vbar:nth-child(5) { animation-delay: 0.25s; }
      .vbar:nth-child(6) { animation-delay: 0.35s; }
      .vbar:nth-child(7) { animation-delay: 0.1s; }

      .stop-speech-pill {
        background: rgba(0, 0, 0, 0.35);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #ffffff;
        font-size: 11px;
        font-weight: 700;
        border-radius: 6px;
        padding: 3px 8px;
        cursor: pointer;
        transition: background 0.2s;
      }
      .stop-speech-pill:hover {
        background: rgba(255, 51, 80, 0.4);
      }

      /* ==========================================================================
         5. MESSAGES SCROLL AREA
         ========================================================================== */
      .chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        scroll-behavior: smooth;
      }
      .chatbot-messages::-webkit-scrollbar {
        width: 5px;
      }
      .chatbot-messages::-webkit-scrollbar-thumb {
        background: rgba(0, 210, 255, 0.2);
        border-radius: 10px;
      }

      .chat-day-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2px 0 8px;
      }
      .chat-day-divider span {
        font-size: 11px;
        font-weight: 600;
        color: #5d7499;
        background: rgba(255, 255, 255, 0.04);
        padding: 3px 12px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .chat-row {
        display: flex;
        gap: 10px;
        animation: msgEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .user-row {
        flex-direction: row-reverse;
      }

      .msg-bot-avatar {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        background: #061536;
        border: 1px solid rgba(0, 210, 255, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 2px;
        box-shadow: 0 0 8px rgba(0, 210, 255, 0.2);
      }

      .msg-bubble-wrap {
        display: flex;
        flex-direction: column;
        max-width: 82%;
      }
      .user-row .msg-bubble-wrap {
        align-items: flex-end;
      }

      .msg-bubble {
        padding: 11px 14px;
        border-radius: 16px;
        font-size: 13.5px;
        line-height: 1.48;
        word-break: break-word;
      }
      .bot-row .msg-bubble {
        background: rgba(10, 22, 54, 0.85);
        border: 1px solid rgba(0, 210, 255, 0.2);
        border-top-left-radius: 4px;
        color: #eaf1fb;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
      }
      .user-row .msg-bubble {
        background: linear-gradient(135deg, #005ce6 0%, #0099ff 100%);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-top-right-radius: 4px;
        color: #ffffff;
        box-shadow: 0 4px 14px rgba(0, 102, 255, 0.35);
      }

      .msg-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
        padding: 0 4px;
      }
      .msg-time {
        font-size: 10.5px;
        color: #647d9e;
      }
      .replay-voice-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 11px;
        opacity: 0.65;
        padding: 0;
        transition: opacity 0.2s, transform 0.2s;
      }
      .replay-voice-btn:hover {
        opacity: 1;
        transform: scale(1.15);
      }

      /* Quote Summary Card */
      .quote-summary-card {
        margin-top: 10px;
        background: rgba(3, 11, 30, 0.9);
        border: 1px solid rgba(0, 255, 136, 0.35);
        border-radius: 12px;
        padding: 12px;
        font-size: 12.5px;
        color: #d8e8ff;
      }
      .quote-card-header {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #00ff88;
        font-weight: 700;
        margin-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 6px;
      }
      .quote-row {
        display: flex;
        gap: 6px;
        margin: 4px 0;
      }
      .quote-row .lbl {
        color: #7b93b8;
        width: 80px;
        flex-shrink: 0;
      }
      .quote-row .val {
        font-weight: 600;
        color: #ffffff;
      }
      .quote-row .val.highlight {
        color: #00d2ff;
      }
      .quote-card-footer {
        margin-top: 8px;
        font-size: 11px;
        color: #00ff88;
        font-weight: 600;
      }

      /* Quick Action Chips attached to message */
      .msg-chips-container {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
      }
      .quick-action-chip {
        background: rgba(0, 102, 255, 0.14);
        border: 1px solid rgba(0, 210, 255, 0.3);
        color: #bde4ff;
        border-radius: 20px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
      }
      .quick-action-chip:hover {
        background: rgba(0, 210, 255, 0.25);
        border-color: #00d2ff;
        color: #ffffff;
        transform: translateY(-1.5px);
        box-shadow: 0 4px 12px rgba(0, 210, 255, 0.25);
      }

      /* Typing Bubble */
      .typing-row {
        margin-top: 2px;
      }
      .typing-bubble {
        padding: 10px 16px;
        background: rgba(10, 22, 54, 0.85);
        border: 1px solid rgba(0, 210, 255, 0.2);
        border-radius: 16px;
        border-top-left-radius: 4px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .typing-bubble .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #00d2ff;
        animation: typingDot 1.4s infinite ease-in-out;
      }
      .typing-bubble .dot:nth-child(2) { animation-delay: 0.2s; }
      .typing-bubble .dot:nth-child(3) { animation-delay: 0.4s; }

      /* Persistent Actions Tray */
      .persistent-actions-tray {
        margin-top: 6px;
        background: rgba(2, 7, 22, 0.6);
        border: 1px dashed rgba(0, 210, 255, 0.2);
        border-radius: 14px;
        padding: 10px;
      }
      .tray-label {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #6480a8;
        margin-bottom: 8px;
      }
      .tray-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .tray-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #c0d8f8;
        border-radius: 8px;
        padding: 6px 11px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tray-btn:hover {
        background: rgba(0, 102, 255, 0.25);
        border-color: rgba(0, 210, 255, 0.5);
        color: #ffffff;
        transform: translateY(-1px);
      }
      .tray-btn.quote-highlight {
        background: rgba(0, 210, 255, 0.15);
        border-color: rgba(0, 210, 255, 0.4);
        color: #00d2ff;
      }

      /* ==========================================================================
         6. CHATBOT INPUT FOOTER
         ========================================================================== */
      .chatbot-input-footer {
        padding: 12px 16px 14px;
        background: linear-gradient(180deg, rgba(4, 11, 30, 0.9) 0%, rgba(2, 6, 18, 0.98) 100%);
        border-top: 1px solid rgba(0, 210, 255, 0.15);
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex-shrink: 0;
      }

      .mic-error-toast {
        background: rgba(255, 51, 80, 0.2);
        border: 1px solid rgba(255, 51, 80, 0.4);
        color: #ffccd7;
        font-size: 11.5px;
        border-radius: 8px;
        padding: 6px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .toast-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 12px;
        cursor: pointer;
      }

      .chat-input-form {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(10, 22, 54, 0.85);
        border: 1px solid rgba(0, 210, 255, 0.25);
        border-radius: 14px;
        padding: 5px 6px 5px 8px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .chat-input-form:focus-within {
        border-color: #00d2ff;
        box-shadow: 0 0 14px rgba(0, 210, 255, 0.25);
      }

      /* Microphone Voice Button */
      .mic-btn {
        position: relative;
        background: rgba(0, 210, 255, 0.1);
        border: 1px solid rgba(0, 210, 255, 0.3);
        color: #00d2ff;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }
      .mic-btn:hover:not(.unsupported) {
        background: rgba(0, 210, 255, 0.25);
        border-color: #00d2ff;
        color: #ffffff;
      }
      .mic-btn.recording {
        background: rgba(255, 51, 102, 0.25);
        border-color: #ff3366;
        color: #ff3366;
      }
      .mic-btn.unsupported {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .mic-pulse-ring {
        position: absolute;
        inset: -4px;
        border-radius: 12px;
        border: 2px solid #ff3366;
        animation: pulseRing 1.4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
      }

      .chat-input-form input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: #ffffff;
        font-size: 13.5px;
        font-family: inherit;
        padding: 4px 6px;
      }
      .chat-input-form input::placeholder {
        color: #5e779e;
      }

      .send-btn {
        background: linear-gradient(135deg, #0066ff 0%, #00c6ff 100%);
        border: none;
        color: #ffffff;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }
      .send-btn:hover:not(:disabled) {
        transform: scale(1.06);
        box-shadow: 0 0 14px rgba(0, 210, 255, 0.5);
      }
      .send-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }

      .chat-footer-brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-size: 10.5px;
        color: #4f688e;
        margin-top: 2px;
      }
      .chat-footer-brand strong {
        color: #8db5e8;
      }
      .dot-sep {
        opacity: 0.5;
      }

      /* ==========================================================================
         7. ANIMATIONS
         ========================================================================== */
      @keyframes pillFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes beaconGlow {
        0% { opacity: 0.7; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1.1); }
      }
      @keyframes pulseRing {
        0% { transform: scale(0.95); opacity: 0.8; }
        100% { transform: scale(1.6); opacity: 0; }
      }
      @keyframes robotBlink {
        0%, 94%, 98% { transform: scaleY(1); }
        96% { transform: scaleY(0.1); }
      }
      @keyframes miniWave {
        0% { height: 3px; }
        100% { height: 11px; }
      }
      @keyframes pulseRed {
        0% { transform: scale(0.9); opacity: 0.6; }
        100% { transform: scale(1.3); opacity: 1; }
      }
      @keyframes bannerSlideDown {
        from { opacity: 0; transform: translateY(-6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes vbarDance {
        0% { height: 3px; }
        100% { height: 14px; }
      }
      @keyframes msgEnter {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes typingDot {
        0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
        40% { transform: scale(1.15); opacity: 1; }
      }

      /* ==========================================================================
         8. RESPONSIVENESS (Desktop, Tablet, Mobile)
         ========================================================================== */
      @media (max-width: 480px) {
        .chatbot-floating-wrapper {
          bottom: 16px;
          right: 16px;
        }
        .chatbot-unread-pill {
          display: none; /* Hide large pill on tiny mobile to save screen space */
        }
        .chatbot-launcher-btn {
          width: 56px;
          height: 56px;
        }
        .chatbot-panel {
          bottom: 0 !important;
          right: 0 !important;
          width: 100vw !important;
          max-width: 100vw !important;
          height: 86vh !important;
          max-height: 86vh !important;
          border-radius: 20px 20px 0 0 !important;
          border-bottom: none !important;
          transform-origin: bottom center;
        }
        .chatbot-panel.active {
          transform: translateY(0) !important;
        }
        .chatbot-header {
          padding: 12px 14px;
        }
        .chatbot-messages {
          padding: 12px;
          gap: 12px;
        }
        .chatbot-input-footer {
          padding: 10px 12px 12px;
        }
      }
    `,
  ],
})
export class ChatbotComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainerRef?: ElementRef;
  @ViewChild('userInputField') private userInputFieldRef?: ElementRef;

  // State Signals
  isOpen = signal<boolean>(false);
  hasUnread = signal<boolean>(true);
  isSpeaking = signal<boolean>(false);
  isListening = signal<boolean>(false);
  isMuted = signal<boolean>(false);
  isTyping = signal<boolean>(false);
  showPersistentQuickActions = signal<boolean>(false);
  micError = signal<string>('');

  userMessageInput = '';
  speechRecognitionSupported = false;

  private recognitionInstance: any = null;
  private autoGreetingPlayed = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private shouldScrollToBottom = false;

  // Quote Collector In-Chat Flow
  quoteForm: QuoteFormState = {
    active: false,
    step: 'name',
    name: '',
    email: '',
    projectType: '',
    requirement: '',
  };

  // Chat message list
  messages = signal<ChatMessage[]>([]);

  ngOnInit(): void {
    this.initSpeechRecognition();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    this.stopSpeech();
    this.stopListening();
  }

  /* ==========================================================================
     OPEN / CLOSE & GREETING UX
     ========================================================================== */
  openChat(): void {
    if (this.isOpen()) return;
    this.isOpen.set(true);
    this.hasUnread.set(false);

    // Initial greeting trigger when opened for the first time
    if (!this.autoGreetingPlayed) {
      this.autoGreetingPlayed = true;
      this.triggerInitialVoiceGreeting();
    }

    setTimeout(() => {
      this.focusInput();
      this.scrollToBottom();
    }, 250);
  }

  closeChat(): void {
    this.isOpen.set(false);
    this.stopSpeech();
    this.stopListening();
  }

  toggleChat(): void {
    if (this.isOpen()) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  private triggerInitialVoiceGreeting(): void {
    const greetingText = "Hi! Welcome to Build4Big. How can I help you today?";

    // Add initial message
    this.addBotMessage(greetingText, [
      { label: '💼 Our Services', action: 'services' },
      { label: '📊 Get a Quote', action: 'quote' },
      { label: '🏢 Company Information', action: 'company' },
      { label: '📅 Book a Meeting', action: 'meeting' },
      { label: '👤 Talk to a Human', action: 'human' },
    ]);

    // Automatically speak the greeting using Text-to-Speech API
    this.speakText(greetingText, () => {
      // After speech finishes, ensure persistent quick actions are prominent
      this.showPersistentQuickActions.set(true);
    });
  }

  resetConversation(): void {
    this.stopSpeech();
    this.stopListening();
    this.messages.set([]);
    this.quoteForm = {
      active: false,
      step: 'name',
      name: '',
      email: '',
      projectType: '',
      requirement: '',
    };
    this.showPersistentQuickActions.set(false);

    // Replay greeting
    this.triggerInitialVoiceGreeting();
  }

  /* ==========================================================================
     TEXT-TO-SPEECH (TTS) ENGINE
     ========================================================================== */
  speakText(text: string, onEndCallback?: () => void): void {
    if (this.isMuted()) {
      onEndCallback?.();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEndCallback?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // Clean HTML tags and markdown symbols before feeding to TTS synthesizer
      const cleanText = text
        .replace(/<[^>]*>/g, ' ')
        .replace(/[*#_~`]/g, '')
        .replace(/https?:\/\/\S+/g, 'link')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      this.currentUtterance = utterance;

      // Select high quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Google') ||
              v.name.includes('Natural') ||
              v.name.includes('Samantha') ||
              v.name.includes('Daniel') ||
              v.name.includes('Karen') ||
              v.name.includes('Zira'))
        ) || voices.find((v) => v.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.isSpeaking.set(true);
      };

      utterance.onend = () => {
        this.isSpeaking.set(false);
        this.currentUtterance = null;
        onEndCallback?.();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        this.isSpeaking.set(false);
        this.currentUtterance = null;
        onEndCallback?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis exception:', err);
      this.isSpeaking.set(false);
      onEndCallback?.();
    }
  }

  stopSpeech(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking.set(false);
    this.currentUtterance = null;
  }

  toggleMute(): void {
    const nextState = !this.isMuted();
    this.isMuted.set(nextState);
    if (nextState) {
      this.stopSpeech();
    }
  }

  /* ==========================================================================
     SPEECH-TO-TEXT (STT) ENGINE (Web Speech Recognition API)
     ========================================================================== */
  private initSpeechRecognition(): void {
    if (typeof window === 'undefined') return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.speechRecognitionSupported = true;
      try {
        this.recognitionInstance = new SpeechRec();
        this.recognitionInstance.continuous = false;
        this.recognitionInstance.interimResults = false;
        this.recognitionInstance.lang = 'en-US';

        this.recognitionInstance.onstart = () => {
          this.isListening.set(true);
          this.micError.set('');
          this.stopSpeech(); // Stop bot voice while user speaks
        };

        this.recognitionInstance.onresult = (event: any) => {
          this.isListening.set(false);
          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript && transcript.trim()) {
            this.handleVoiceRecognized(transcript.trim());
          }
        };

        this.recognitionInstance.onerror = (event: any) => {
          this.isListening.set(false);
          if (event.error === 'not-allowed') {
            this.micError.set('Microphone access was denied. Please allow microphone permission in your browser.');
          } else if (event.error === 'no-speech') {
            this.micError.set('No speech detected. Please try clicking the microphone again.');
          } else {
            this.micError.set(`Voice error: ${event.error || 'Check microphone settings'}`);
          }
        };

        this.recognitionInstance.onend = () => {
          this.isListening.set(false);
        };
      } catch (err) {
        console.warn('Failed to initialize SpeechRecognition:', err);
        this.speechRecognitionSupported = false;
      }
    } else {
      this.speechRecognitionSupported = false;
    }
  }

  toggleListening(): void {
    if (!this.speechRecognitionSupported) {
      this.micError.set('Voice recognition is not supported in this browser. You can type your question in the text box!');
      return;
    }

    if (this.isListening()) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening(): void {
    if (!this.recognitionInstance) return;
    try {
      this.stopSpeech();
      this.micError.set('');
      this.recognitionInstance.start();
    } catch (e: any) {
      // If already started, stop and restart
      try {
        this.recognitionInstance.stop();
        setTimeout(() => this.recognitionInstance.start(), 150);
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  }

  stopListening(): void {
    if (this.recognitionInstance && this.isListening()) {
      try {
        this.recognitionInstance.stop();
      } catch (e) {
        // ignore
      }
      this.isListening.set(false);
    }
  }

  private handleVoiceRecognized(text: string): void {
    this.addUserMessage(text);
    this.processUserQuery(text);
  }

  /* ==========================================================================
     USER TEXT INPUT & SEND
     ========================================================================== */
  sendUserText(): void {
    const text = this.userMessageInput.trim();
    if (!text) return;

    this.userMessageInput = '';
    this.addUserMessage(text);
    this.processUserQuery(text);
    this.focusInput();
  }

  /* ==========================================================================
     INTERACTIVE QUICK ACTIONS & CHIP HANDLERS
     ========================================================================== */
  onChipClick(chip: { label: string; action: string }): void {
    this.addUserMessage(chip.label);
    this.handleAction(chip.action);
  }

  handleAction(action: string): void {
    switch (action) {
      case 'services':
        this.showServicesFlow();
        break;
      case 'quote':
        this.startQuoteFlow();
        break;
      case 'company':
        this.showCompanyInfoFlow();
        break;
      case 'meeting':
        this.showMeetingFlow();
        break;
      case 'human':
        this.showHumanSupportFlow();
        break;
      case 'quote_web':
        this.continueQuoteWithPreset('Web Development');
        break;
      case 'quote_mobile':
        this.continueQuoteWithPreset('Mobile App Development');
        break;
      case 'quote_ai':
        this.continueQuoteWithPreset('Automation & AI Solutions');
        break;
      case 'quote_software':
        this.continueQuoteWithPreset('Custom Software Development');
        break;
      case 'scroll_contact':
        this.scrollToContactSection();
        break;
      case 'whatsapp':
        window.open('https://wa.me/919677745205', '_blank');
        break;
      default:
        this.processUserQuery(action);
        break;
    }
  }

  /* --------------------------------------------------------------------------
     1. "Our Services" Flow
     -------------------------------------------------------------------------- */
  private showServicesFlow(): void {
    this.simulateTyping(() => {
      const response =
        "At **Build4Big**, we empower businesses with modern software and innovative technology:<br/><br/>" +
        "1. **⌘ Web Development** – High-speed, responsive, SEO-ready modern web applications.<br/>" +
        "2. **▣ Mobile App Development** – Native and cross-platform Android & iOS apps.<br/>" +
        "3. **</> Custom Software** – Scalable SaaS, microservices, and enterprise architecture.<br/>" +
        "4. **✦ UI/UX Design** – Conversion-focused, intuitive user interfaces & 3D experiences.<br/>" +
        "5. **⚙ Automation & AI** – Intelligent workflows, bots, and predictive automation.<br/>" +
        "6. **♟ IT Consulting** – Strategic technology roadmaps and cloud scaling.<br/><br/>" +
        "Which service can we build for you?";

      this.addBotMessage(response, [
        { label: '📊 Get a Quote for My Project', action: 'quote' },
        { label: '📅 Book a Free Consultation', action: 'meeting' },
        { label: '🏢 About Build4Big', action: 'company' },
      ]);

      this.speakText(
        "At Build4Big, we build high performance Web Apps, Mobile Apps, Custom Software, UI UX Design, Automation, and IT Consulting. Would you like a quote for your project?"
      );
    });
  }

  /* --------------------------------------------------------------------------
     2. "Get a Quote" Flow (Interactive Guided Wizard)
     -------------------------------------------------------------------------- */
  private startQuoteFlow(): void {
    this.quoteForm = {
      active: true,
      step: 'name',
      name: '',
      email: '',
      projectType: '',
      requirement: '',
    };

    this.simulateTyping(() => {
      const prompt =
        "I'll help you get a tailored quote for your project! 🚀<br/><br/>" +
        "First, could you please tell me your **Name**?";
      this.addBotMessage(prompt);
      this.speakText("I will help you get a tailored quote! First, what is your name?");
    });
  }

  private continueQuoteWithPreset(projectType: string): void {
    this.quoteForm.projectType = projectType;
    if (!this.quoteForm.name) {
      this.startQuoteFlow();
    } else if (!this.quoteForm.email) {
      this.quoteForm.step = 'email';
      this.simulateTyping(() => {
        this.addBotMessage(`Great, ${this.quoteForm.name}! What's your **email address** so we can send the estimate?`);
        this.speakText(`Great, ${this.quoteForm.name}! What is your email address?`);
      });
    } else {
      this.quoteForm.step = 'requirement';
      this.simulateTyping(() => {
        this.addBotMessage(`Got it! Please tell me a brief summary of what you need for this **${projectType}** project.`);
        this.speakText("Please tell me a brief summary of what you need for this project.");
      });
    }
  }

  private handleQuoteInput(input: string): boolean {
    if (!this.quoteForm.active) return false;

    if (this.quoteForm.step === 'name') {
      this.quoteForm.name = input.replace(/^(my name is|i am|i'm)\s+/i, '').trim();
      this.quoteForm.step = 'email';

      this.simulateTyping(() => {
        const msg = `Nice to meet you, **${this.quoteForm.name}**! 👋<br/><br/>What is your **Email address** so our tech leads can send you the proposal?`;
        this.addBotMessage(msg);
        this.speakText(`Nice to meet you, ${this.quoteForm.name}! What is your email address?`);
      });
      return true;
    }

    if (this.quoteForm.step === 'email') {
      const emailMatch = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch || input.includes('@')) {
        this.quoteForm.email = emailMatch ? emailMatch[0] : input.trim();
        this.quoteForm.step = 'projectType';

        this.simulateTyping(() => {
          const msg = `Got it! What type of **project** are you looking to build?`;
          this.addBotMessage(msg, [
            { label: '🌐 Web Application', action: 'quote_web' },
            { label: '📱 Mobile App (iOS/Android)', action: 'quote_mobile' },
            { label: '⚙️ AI & Automation', action: 'quote_ai' },
            { label: '💻 Custom Software / SaaS', action: 'quote_software' },
          ]);
          this.speakText("What type of project are you looking to build?");
        });
        return true;
      } else {
        this.simulateTyping(() => {
          const msg = "Please enter a valid email address (e.g., yourname@example.com):";
          this.addBotMessage(msg);
          this.speakText("Please enter a valid email address.");
        });
        return true;
      }
    }

    if (this.quoteForm.step === 'projectType') {
      this.quoteForm.projectType = input;
      this.quoteForm.step = 'requirement';

      this.simulateTyping(() => {
        const msg = `Excellent. Could you briefly describe your **key requirements** or timeline?`;
        this.addBotMessage(msg);
        this.speakText("Could you briefly describe your key requirements or timeline?");
      });
      return true;
    }

    if (this.quoteForm.step === 'requirement') {
      this.quoteForm.requirement = input;
      this.quoteForm.active = false;
      this.quoteForm.step = 'done';

      this.simulateTyping(() => {
        const confirmMsg =
          `🎉 **Thank you, ${this.quoteForm.name}!**<br/><br/>` +
          `Your project quote request has been submitted successfully to our engineering team.<br/>` +
          `We will review your requirements and get back to you at **${this.quoteForm.email}** within 24 hours.`;

        const summaryData = {
          name: this.quoteForm.name,
          email: this.quoteForm.email,
          projectType: this.quoteForm.projectType || 'General Software',
          requirement: this.quoteForm.requirement,
        };

        this.addBotMessage(
          confirmMsg,
          [
            { label: '📅 Book a Discovery Call', action: 'meeting' },
            { label: '💬 Chat on WhatsApp', action: 'whatsapp' },
            { label: '💼 View Other Services', action: 'services' },
          ],
          true,
          summaryData
        );

        this.speakText(
          `Thank you, ${this.quoteForm.name}! Your quote request has been received. Our team will review your requirements and reach out to ${this.quoteForm.email} within 24 hours.`
        );
      });
      return true;
    }

    return false;
  }

  /* --------------------------------------------------------------------------
     3. "Company Information" Flow
     -------------------------------------------------------------------------- */
  private showCompanyInfoFlow(): void {
    this.simulateTyping(() => {
      const info =
        "🏢 **About Build4Big**<br/><br/>" +
        "Build4Big is a forward-thinking software innovation company helping startups, scale-ups, and enterprises turn visionary ideas into robust digital products.<br/><br/>" +
        "• **Mission:** *Innovate Today, Build a Better Tomorrow.*<br/>" +
        "• **Headquarters:** Plot No. 2, Mahatma Gandhi 11th St, Thirunagar, Madurai, Tamil Nadu.<br/>" +
        "• **Contact Phones:** +91 96777 45205 / +91 70106 68560<br/>" +
        "• **Email:** info@build4big.com<br/>" +
        "• **Delivery Model:** Agile, transparent, 100% on-time delivery with ongoing support.";

      this.addBotMessage(info, [
        { label: '📊 Get a Quote', action: 'quote' },
        { label: '💼 Our Services', action: 'services' },
        { label: '👤 Talk to a Human', action: 'human' },
      ]);

      this.speakText(
        "Build4Big is a modern software company based in Madurai, helping businesses grow with Web, Mobile, and Automation solutions. We believe in Innovate Today, Build a Better Tomorrow."
      );
    });
  }

  /* --------------------------------------------------------------------------
     4. "Book a Meeting" Flow
     -------------------------------------------------------------------------- */
  private showMeetingFlow(): void {
    this.simulateTyping(() => {
      const text =
        "📅 **Schedule a Free 15-Minute Technical Consultation**<br/><br/>" +
        "Discuss your project scope, architecture, tech stack, and roadmap directly with our senior developers.<br/><br/>" +
        "Choose the most convenient way to connect with us:";

      this.addBotMessage(text, [
        { label: '💬 Instant WhatsApp Chat', action: 'whatsapp' },
        { label: '📝 Fill Online Contact Form', action: 'scroll_contact' },
        { label: '📊 Request an Instant Quote', action: 'quote' },
      ]);

      this.speakText(
        "Let's schedule a 15-minute consultation! You can connect instantly with us on WhatsApp or fill out our project form."
      );
    });
  }

  /* --------------------------------------------------------------------------
     5. "Talk to a Human" Flow
     -------------------------------------------------------------------------- */
  private showHumanSupportFlow(): void {
    this.simulateTyping(() => {
      const text =
        "👤 **Connect with Our Team Directly**<br/><br/>" +
        "Our business and technical representatives are available to speak with you:<br/><br/>" +
        "• ☎️ **Phone:** +91 96777 45205<br/>" +
        "• 📱 **Alternate:** +91 70106 68560<br/>" +
        "• 💬 **WhatsApp:** [Chat with Us on WhatsApp](https://wa.me/919677745205)<br/>" +
        "• ✉️ **Email:** info@build4big.com<br/>" +
        "• 📍 **Location:** Thirunagar, Madurai, India";

      this.addBotMessage(text, [
        { label: '💬 Open WhatsApp (+91 96777 45205)', action: 'whatsapp' },
        { label: '📝 Go to Contact Form', action: 'scroll_contact' },
        { label: '📊 Get a Quote Instead', action: 'quote' },
      ]);

      this.speakText(
        "You can reach our team directly at plus 91 96777 45205, or chat with us on WhatsApp."
      );
    });
  }

  private scrollToContactSection(): void {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     SMART NATURAL LANGUAGE QUERY PROCESSOR
     ========================================================================== */
  private processUserQuery(text: string): void {
    // If quote collector is currently active, route input through wizard
    if (this.handleQuoteInput(text)) {
      return;
    }

    const lower = text.toLowerCase();

    // 1. Greetings
    if (lower.match(/\b(hi|hello|hey|good morning|good evening|vanakkam|namaste)\b/)) {
      this.simulateTyping(() => {
        const reply = "Hello! 👋 Great to connect with you. How can Build4Big support your software goals today?";
        this.addBotMessage(reply, [
          { label: '💼 Our Services', action: 'services' },
          { label: '📊 Get a Quote', action: 'quote' },
          { label: '🏢 Company Info', action: 'company' },
        ]);
        this.speakText("Hello! Great to connect with you. How can Build4Big support your software goals today?");
      });
      return;
    }

    // 2. Services / Capabilities
    if (lower.match(/\b(service|services|offer|what do you do|products|develop|web|mobile|app|software|design|ui|ux)\b/)) {
      this.showServicesFlow();
      return;
    }

    // 3. Quote / Pricing / Cost
    if (lower.match(/\b(quote|pricing|cost|price|how much|budget|estimate|rate|proposal)\b/)) {
      this.startQuoteFlow();
      return;
    }

    // 4. Company / About / Location
    if (lower.match(/\b(company|about|who are you|where are you|location|address|office|madurai|founded|team)\b/)) {
      this.showCompanyInfoFlow();
      return;
    }

    // 5. Meeting / Consultation / Call
    if (lower.match(/\b(meet|meeting|call|book|schedule|consult|consultation|appointment)\b/)) {
      this.showMeetingFlow();
      return;
    }

    // 6. Human / Phone / Contact / Email / WhatsApp
    if (lower.match(/\b(human|person|agent|talk to human|phone|contact|number|email|whatsapp|support)\b/)) {
      this.showHumanSupportFlow();
      return;
    }

    // 7. Technologies & Tech Stack
    if (lower.match(/\b(tech|stack|technologies|angular|react|node|python|ai|flutter|cloud|aws|database)\b/)) {
      this.simulateTyping(() => {
        const reply =
          "⚡ **Our Modern Tech Stack**<br/><br/>" +
          "• **Frontend:** Angular, React, Next.js, TypeScript, Tailwind, Three.js<br/>" +
          "• **Mobile:** Flutter, React Native, Swift, Kotlin<br/>" +
          "• **Backend:** Node.js, Python/FastAPI, Go, Java, Spring Boot<br/>" +
          "• **Cloud & DevOps:** AWS, Azure, GCP, Docker, Kubernetes, CI/CD<br/>" +
          "• **AI & Automation:** OpenAI APIs, LangChain, TensorFlow, custom bot workflows.";

        this.addBotMessage(reply, [
          { label: '📊 Get a Quote', action: 'quote' },
          { label: '📅 Book a Consultation', action: 'meeting' },
        ]);
        this.speakText("We use cutting edge frameworks including Angular, React, Flutter, Node.js, Python, and Cloud technologies.");
      });
      return;
    }

    // 8. General Fallback
    this.simulateTyping(() => {
      const fallback =
        "Thank you for your question! 😊<br/><br/>" +
        "I can help you explore our services, get a customized project quote, learn about Build4Big, or connect directly with our engineers. Please pick an option below or ask me anything:";

      this.addBotMessage(fallback, [
        { label: '💼 Our Services', action: 'services' },
        { label: '📊 Get a Quote', action: 'quote' },
        { label: '🏢 Company Info', action: 'company' },
        { label: '👤 Talk to a Human', action: 'human' },
      ]);
      this.speakText(
        "I can help you explore our services, calculate a quote, or connect with our engineering team."
      );
    });
  }

  /* ==========================================================================
     HELPERS
     ========================================================================== */
  private addUserMessage(text: string): void {
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      sender: 'user',
      text,
      time: this.getCurrentTimeString(),
    };
    this.messages.update((list) => [...list, newMsg]);
    this.shouldScrollToBottom = true;
  }

  private addBotMessage(
    text: string,
    chips?: { label: string; action: string }[],
    isQuoteSummary = false,
    quoteData?: any
  ): void {
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      sender: 'bot',
      text,
      time: this.getCurrentTimeString(),
      chips,
      isQuoteSummary,
      quoteData,
    };
    this.messages.update((list) => [...list, newMsg]);
    this.shouldScrollToBottom = true;
  }

  private simulateTyping(callback: () => void, delayMs = 500): void {
    this.isTyping.set(true);
    this.shouldScrollToBottom = true;
    setTimeout(() => {
      this.isTyping.set(false);
      callback();
    }, delayMs);
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainerRef) {
        const elem = this.messagesContainerRef.nativeElement;
        elem.scrollTop = elem.scrollHeight;
      }
    } catch (err) {
      // ignore
    }
  }

  private focusInput(): void {
    try {
      if (this.userInputFieldRef) {
        this.userInputFieldRef.nativeElement.focus();
      }
    } catch (err) {
      // ignore
    }
  }

  private getCurrentTimeString(): string {
    const d = new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minsStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minsStr} ${ampm}`;
  }

  formatMessageText(text: string): string {
    if (!text) return '';
    // Format markdown bold **text** to <strong>text</strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return formatted;
  }
}
