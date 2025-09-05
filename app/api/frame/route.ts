import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'home';

  // Generate Frame metadata based on action
  const frameMetadata = generateFrameMetadata(action);

  return NextResponse.json(frameMetadata);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData, trustedData } = body;

    // Validate Frame data (in production, verify signature)
    const buttonIndex = untrustedData?.buttonIndex || 1;
    const inputText = untrustedData?.inputText || '';
    const state = untrustedData?.state || '';

    // Handle different button actions
    let nextAction = 'home';
    let message = '';

    switch (buttonIndex) {
      case 1:
        nextAction = 'rights';
        message = 'Accessing your rights information...';
        break;
      case 2:
        nextAction = 'record';
        message = 'Starting incident recording...';
        break;
      case 3:
        nextAction = 'scripts';
        message = 'Loading scenario scripts...';
        break;
      case 4:
        nextAction = 'share';
        message = 'Generating shareable summary...';
        break;
      default:
        nextAction = 'home';
        message = 'Welcome to Guardiant';
    }

    const responseMetadata = generateFrameMetadata(nextAction, message);

    return NextResponse.json(responseMetadata);
  } catch (error) {
    console.error('Frame POST error:', error);
    return NextResponse.json(
      { error: 'Invalid frame request' },
      { status: 400 }
    );
  }
}

function generateFrameMetadata(action: string, message?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://guardiant.app';
  
  const metadata = {
    'fc:frame': 'vNext',
    'fc:frame:image': `${baseUrl}/api/frame/image?action=${action}`,
    'fc:frame:post_url': `${baseUrl}/api/frame`,
    'og:title': 'Guardiant - Your Pocket Rights Advisor',
    'og:description': 'Quick access to legal rights information, incident recording, and scenario scripts for police interactions.',
    'og:image': `${baseUrl}/api/frame/image?action=${action}`,
  };

  switch (action) {
    case 'home':
      return {
        ...metadata,
        'fc:frame:button:1': 'View Rights',
        'fc:frame:button:2': 'Start Recording',
        'fc:frame:button:3': 'Get Scripts',
        'fc:frame:button:4': 'Share Summary',
        'fc:frame:input:text': 'Enter your state (optional)'
      };

    case 'rights':
      return {
        ...metadata,
        'fc:frame:button:1': 'Back to Home',
        'fc:frame:button:2': 'Record Incident',
        'fc:frame:button:3': 'View Scripts',
        'fc:frame:button:4': 'Share Rights Info'
      };

    case 'record':
      return {
        ...metadata,
        'fc:frame:button:1': 'Stop Recording',
        'fc:frame:button:2': 'Back to Home',
        'fc:frame:button:3': 'View Rights',
        'fc:frame:button:4': 'Emergency Help'
      };

    case 'scripts':
      return {
        ...metadata,
        'fc:frame:button:1': 'Consent Scripts',
        'fc:frame:button:2': 'General Scripts',
        'fc:frame:button:3': 'Back to Home',
        'fc:frame:button:4': 'Record Incident'
      };

    case 'share':
      return {
        ...metadata,
        'fc:frame:button:1': 'Generate Summary',
        'fc:frame:button:2': 'Copy to Clipboard',
        'fc:frame:button:3': 'Share on Social',
        'fc:frame:button:4': 'Back to Home'
      };

    default:
      return {
        ...metadata,
        'fc:frame:button:1': 'Get Started',
        'fc:frame:button:2': 'Learn More',
        'fc:frame:button:3': 'View Demo',
        'fc:frame:button:4': 'Contact Support'
      };
  }
}
