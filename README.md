# Guardiant - Your Pocket Rights Advisor & Incident Recorder

A production-ready Next.js Base Mini App that empowers individuals with quick access to legal rights information, discreet incident recording, and scenario-based communication scripts for police interactions.

## 🛡️ Features

### Core Functionality
- **State-Specific Rights Information**: Comprehensive legal rights data for all 50 US states
- **Discreet Incident Recording**: One-tap audio/video recording with automatic timestamping and location tagging
- **Scenario-Based Scripts**: Pre-written phrases in English and Spanish for common police interaction scenarios
- **Shareable Incident Summaries**: Automatic generation of professional incident reports for sharing with trusted contacts or legal aid

### Technical Features
- **Base Mini App Integration**: Full Farcaster Frame support with interactive buttons and actions
- **Location-Aware**: Automatic state detection and location-based rights information
- **Multi-Language Support**: English and Spanish script translations
- **Production-Ready APIs**: RESTful endpoints for all core functionality
- **Responsive Design**: Mobile-optimized UI with glassmorphism design system
- **Real-time Updates**: Live statistics and incident tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/b4b5e3c2-0d1f-4637-b8f6-2d02037ae611.git
   cd b4b5e3c2-0d1f-4637-b8f6-2d02037ae611
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   UPSTASH_REDIS_REST_URL=your-redis-url
   UPSTASH_REDIS_REST_TOKEN=your-redis-token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📱 Usage

### As a Web App
Visit the deployed URL to access the full Guardiant interface with:
- Dashboard with usage statistics
- Interactive rights information by state
- Recording functionality (requires media permissions)
- Script library with copy-to-clipboard functionality
- Incident summary generation and sharing

### As a Farcaster Frame
The app automatically generates Frame metadata for Farcaster integration:
- Interactive buttons for core actions
- Dynamic image generation based on user actions
- State-aware content delivery
- Seamless integration with Farcaster feeds

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Components**: Modular React components with TypeScript
- **State Management**: React hooks and context
- **Icons**: Lucide React icon library

### Backend APIs
- **Frame Actions**: `/api/farcaster/frame-actions` - Handles Farcaster Frame interactions
- **Location Services**: `/api/location` - Geocoding and state detection
- **Incident Management**: `/api/incidents` - CRUD operations for incident records
- **Frame Metadata**: `/api/frame` - Dynamic Frame metadata generation
- **Image Generation**: `/api/frame/image` - SVG-based Frame images

### Data Models

#### User
```typescript
interface User {
  userId: string;
  farcasterId?: string;
  walletAddress?: string;
  preferredLanguage: 'en' | 'es';
  savedStates: string[];
}
```

#### Incident
```typescript
interface Incident {
  incidentId: string;
  userId: string;
  timestamp: Date;
  location: LocationData;
  recordingUrl?: string;
  notes: string;
  rightsInfoSummary: string;
  duration?: number;
  status: 'recording' | 'completed' | 'shared';
}
```

#### StateGuide
```typescript
interface StateGuide {
  stateName: string;
  rights: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  scripts: Script[];
}
```

## 🎨 Design System

### Colors
- **Primary**: Purple to Pink gradient (`from-purple-500 to-pink-500`)
- **Background**: Purple to Cyan gradient (`from-purple-600 via-blue-600 to-cyan-500`)
- **Accent**: Blue (`hsl(210, 100%, 50%)`)
- **Success**: Green (`hsl(140, 40%, 50%)`)
- **Warning**: Orange (`hsl(25, 90%, 50%)`)

### Components
- **Glass Cards**: Glassmorphism effect with backdrop blur
- **Buttons**: Primary (gradient) and Secondary (glass) variants
- **Metrics Cards**: Hover effects with opacity transitions
- **Recording Pulse**: Animated pulse effect for active recording

### Typography
- **Display**: 3xl, bold
- **Heading**: xl, semibold
- **Body**: base, relaxed leading
- **Caption**: sm, gray-600

## 🔧 Configuration

### Tailwind Configuration
The design system is implemented through CSS variables and Tailwind utilities:

```javascript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: "var(--primary)",
      accent: "var(--accent)",
      // ... more colors
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    }
  }
}
```

### Environment Variables
- `NEXT_PUBLIC_BASE_URL`: Base URL for Frame metadata and image generation
- `UPSTASH_REDIS_REST_URL`: Redis database URL for data persistence
- `UPSTASH_REDIS_REST_TOKEN`: Redis authentication token

## 📊 API Documentation

### Frame Actions API
**Endpoint**: `POST /api/farcaster/frame-actions`

**Actions**:
- `get_rights`: Retrieve state-specific rights information
- `start_recording`: Initialize incident recording
- `stop_recording`: Complete incident recording
- `get_scripts`: Fetch scenario scripts
- `generate_summary`: Create shareable incident summary

### Location API
**Endpoint**: `POST /api/location`

**Request**:
```json
{
  "latitude": 34.0522,
  "longitude": -118.2437
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "latitude": 34.0522,
    "longitude": -118.2437,
    "state": "California",
    "city": "Los Angeles",
    "accuracy": "approximate",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### Incidents API
**Endpoint**: `POST /api/incidents`

**Actions**:
- `create`: Create new incident
- `update`: Update existing incident
- `get`: Retrieve incident by ID
- `list`: List user incidents with pagination

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Configure reverse proxy (nginx/Apache) if needed

### Environment Setup
- Set `NEXT_PUBLIC_BASE_URL` to your production domain
- Configure Redis database for data persistence
- Ensure proper CORS settings for Frame integration

## 🔒 Security Considerations

### Data Protection
- All incident data is stored securely with user consent
- Recording permissions are explicitly requested
- Location data is processed client-side when possible

### Frame Security
- Frame requests are validated for authenticity
- User input is sanitized and validated
- Rate limiting implemented on API endpoints

### Privacy
- No personal data is stored without explicit consent
- Users can delete their data at any time
- Location data is only used for rights information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use the established design system
- Write comprehensive tests for new features
- Update documentation for API changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please:
1. Check the [Issues](https://github.com/vistara-apps/b4b5e3c2-0d1f-4637-b8f6-2d02037ae611/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Frame integration with [Base](https://base.org/)
- Deployed on [Vercel](https://vercel.com/)

---

**Guardiant** - Empowering citizens with knowledge and tools for safer police interactions.
