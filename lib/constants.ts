import { StateGuide, Script } from './types';
import { STATE_GUIDES } from './state-guides';

// Re-export STATE_GUIDES for backward compatibility
export { STATE_GUIDES };

// Sample scripts
export const SCRIPTS: Script[] = [
  {
    id: 'consent-search',
    scenario: 'When asked to consent to a search',
    title: 'Refusing Consent to Search',
    content: {
      en: 'I do not consent to any searches. I am exercising my constitutional rights.',
      es: 'No consiento a ninguna búsqueda. Estoy ejerciendo mis derechos constitucionales.'
    },
    category: 'consent'
  },
  {
    id: 'am-i-free',
    scenario: 'Determining if you can leave',
    title: 'Am I Free to Leave?',
    content: {
      en: 'Officer, am I free to leave? If not, I would like to know why I am being detained.',
      es: 'Oficial, ¿soy libre de irme? Si no, me gustaría saber por qué me están deteniendo.'
    },
    category: 'general'
  },
  {
    id: 'remain-silent',
    scenario: 'Exercising right to remain silent',
    title: 'Invoking Right to Silence',
    content: {
      en: 'I am exercising my right to remain silent. I would like to speak to an attorney.',
      es: 'Estoy ejerciendo mi derecho a permanecer en silencio. Me gustaría hablar con un abogado.'
    },
    category: 'general'
  },
  {
    id: 'recording-notice',
    scenario: 'Informing officer of recording',
    title: 'Recording Notice',
    content: {
      en: 'Officer, I am recording this interaction for my safety and yours.',
      es: 'Oficial, estoy grabando esta interacción por mi seguridad y la suya.'
    },
    category: 'general'
  }
];

// Add scripts to state guides
Object.keys(STATE_GUIDES).forEach(state => {
  STATE_GUIDES[state].scripts = SCRIPTS;
});

// Sample statistics for dashboard
export const SAMPLE_STATS = {
  totalRecordings: 12847,
  activeUsers: 28934,
  statesSupported: 50,
  scriptsAvailable: SCRIPTS.length,
  monthlyGrowth: 23.7,
  incidentsRecorded: 8456,
  summariesGenerated: 6234,
  rightsAccessedDaily: 1523
};
