import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'home';
  const state = searchParams.get('state') || '';
  const message = searchParams.get('message') || '';

  // Generate SVG image based on action
  const svg = generateFrameImage(action, state, message);

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function generateFrameImage(action: string, state: string, message: string): string {
  const width = 1200;
  const height = 630;
  
  // Base gradient background
  const background = `
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#06B6D4;stop-opacity:1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
  `;

  let content = '';
  let title = 'Guardiant';
  let subtitle = 'Your Pocket Rights Advisor';
  let icon = '🛡️';

  switch (action) {
    case 'home':
      title = 'Guardiant';
      subtitle = 'Your Pocket Rights Advisor & Incident Recorder';
      icon = '🛡️';
      content = `
        <text x="600" y="400" text-anchor="middle" fill="white" font-size="24" opacity="0.9">
          Quick access to legal rights • Discreet recording • Scenario scripts
        </text>
        <text x="600" y="440" text-anchor="middle" fill="white" font-size="20" opacity="0.8">
          Protecting your rights during police interactions
        </text>
      `;
      break;

    case 'rights':
      title = 'Know Your Rights';
      subtitle = state ? `Legal Rights in ${state}` : 'State-Specific Legal Information';
      icon = '⚖️';
      content = `
        <text x="600" y="400" text-anchor="middle" fill="white" font-size="24" opacity="0.9">
          • Right to remain silent • Refuse consent to search
        </text>
        <text x="600" y="440" text-anchor="middle" fill="white" font-size="24" opacity="0.9">
          • Ask if you're free to leave • Record interactions
        </text>
        <text x="600" y="480" text-anchor="middle" fill="white" font-size="20" opacity="0.8">
          ${state ? `Specific to ${state} law` : 'Location-based legal guidance'}
        </text>
      `;
      break;

    case 'record':
      title = 'Incident Recording';
      subtitle = 'Discreet Evidence Collection';
      icon = '🎙️';
      content = `
        <text x="600" y="400" text-anchor="middle" fill="white" font-size="24" opacity="0.9">
          Secure • Timestamped • Location-tagged
        </text>
        <text x="600" y="440" text-anchor="middle" fill="white" font-size="20" opacity="0.8">
          One-tap recording with automatic incident logging
        </text>
        <text x="600" y="480" text-anchor="middle" fill="white" font-size="18" opacity="0.7">
          Your safety and evidence protection in one tool
        </text>
      `;
      break;

    case 'scripts':
      title = 'Scenario Scripts';
      subtitle = 'Pre-written Phrases for Clear Communication';
      icon = '💬';
      content = `
        <text x="600" y="400" text-anchor="middle" fill="white" font-size="24" opacity="0.9">
          English & Spanish • Consent • Identification • Search
        </text>
        <text x="600" y="440" text-anchor="middle" fill="white" font-size="20" opacity="0.8">
          Reduce anxiety with ready-to-use phrases
        </text>
        <text x="600" y="480" text-anchor="middle" fill="white" font-size="18" opacity="0.7">
          Clear communication for better outcomes
        </text>
      `;
      break;

    case 'share':
      title = 'Share Summary';
      subtitle = 'Generate Incident Reports';
      icon = '📤';
      content = `
        <text x="600" y="400" text-anchor="middle" fill="white" font-size="24" opacity="0.9">
          Automatic summary generation • Shareable format
        </text>
        <text x="600" y="440" text-anchor="middle" fill="white" font-size="20" opacity="0.8">
          Send to trusted contacts or legal aid
        </text>
        <text x="600" y="480" text-anchor="middle" fill="white" font-size="18" opacity="0.7">
          Professional incident documentation
        </text>
      `;
      break;

    default:
      content = `
        <text x="600" y="400" text-anchor="middle" fill="white" font-size="24" opacity="0.9">
          Empowering citizens with knowledge and tools
        </text>
        <text x="600" y="440" text-anchor="middle" fill="white" font-size="20" opacity="0.8">
          For safer police interactions
        </text>
      `;
  }

  // Add message if provided
  if (message) {
    content += `
      <rect x="200" y="520" width="800" height="60" rx="30" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <text x="600" y="555" text-anchor="middle" fill="white" font-size="18" opacity="0.9">
        ${message}
      </text>
    `;
  }

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${background}
      
      <!-- Main content area -->
      <rect x="100" y="100" width="1000" height="430" rx="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      
      <!-- Icon -->
      <text x="600" y="200" text-anchor="middle" font-size="80" filter="url(#glow)">
        ${icon}
      </text>
      
      <!-- Title -->
      <text x="600" y="280" text-anchor="middle" fill="white" font-size="48" font-weight="bold" filter="url(#glow)">
        ${title}
      </text>
      
      <!-- Subtitle -->
      <text x="600" y="320" text-anchor="middle" fill="white" font-size="28" opacity="0.9">
        ${subtitle}
      </text>
      
      ${content}
      
      <!-- Footer -->
      <text x="600" y="600" text-anchor="middle" fill="white" font-size="16" opacity="0.6">
        Guardiant • Base Mini App • Your Rights, Your Safety
      </text>
    </svg>
  `;
}
