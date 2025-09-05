import { StateGuide, Script } from './types';

// Sample state guides data
export const STATE_GUIDES: Record<string, StateGuide> = {
  'California': {
    stateName: 'California',
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions',
      'You have the right to an attorney'
    ],
    dosAndDonts: {
      dos: [
        'Keep your hands visible',
        'Stay calm and polite',
        'Ask "Am I free to leave?"',
        'Record the interaction if safe',
        'Remember badge numbers and patrol car numbers'
      ],
      donts: [
        'Don\'t resist, even if you believe the stop is unfair',
        'Don\'t argue or become confrontational',
        'Don\'t consent to searches',
        'Don\'t lie or provide false information',
        'Don\'t reach for anything without permission'
      ]
    },
    scripts: []
  },
  'New York': {
    stateName: 'New York',
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions',
      'You have the right to an attorney'
    ],
    dosAndDonts: {
      dos: [
        'Keep your hands visible',
        'Stay calm and polite',
        'Ask "Am I free to leave?"',
        'Record the interaction if safe',
        'Remember badge numbers and patrol car numbers'
      ],
      donts: [
        'Don\'t resist, even if you believe the stop is unfair',
        'Don\'t argue or become confrontational',
        'Don\'t consent to searches',
        'Don\'t lie or provide false information',
        'Don\'t reach for anything without permission'
      ]
    },
    scripts: []
  }
};

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
  totalRecordings: 1247,
  activeUsers: 8934,
  statesSupported: 50,
  scriptsAvailable: 24,
  monthlyGrowth: 15.2
};
