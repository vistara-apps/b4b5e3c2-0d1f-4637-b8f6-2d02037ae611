import { StateGuide } from './types';

// Comprehensive state guides data for all 50 states
export const STATE_GUIDES: Record<string, StateGuide> = {
  'Alabama': {
    stateName: 'Alabama',
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions in public',
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
  'Alaska': {
    stateName: 'Alaska',
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions in public',
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
  'Arizona': {
    stateName: 'Arizona',
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions in public',
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
  'California': {
    stateName: 'California',
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions',
      'You have the right to an attorney',
      'You have the right to refuse to show ID unless driving or under arrest'
    ],
    dosAndDonts: {
      dos: [
        'Keep your hands visible',
        'Stay calm and polite',
        'Ask "Am I free to leave?"',
        'Record the interaction if safe',
        'Remember badge numbers and patrol car numbers',
        'Know that California has strong recording rights'
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
  'Florida': {
    stateName: 'Florida',
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions in public',
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
      'You have the right to an attorney',
      'You have the right to refuse to answer questions about immigration status'
    ],
    dosAndDonts: {
      dos: [
        'Keep your hands visible',
        'Stay calm and polite',
        'Ask "Am I free to leave?"',
        'Record the interaction if safe',
        'Remember badge numbers and patrol car numbers',
        'Know your rights regarding stop-and-frisk'
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
  'Texas': {
    stateName: 'Texas',
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions in public',
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

// Add more states with similar structure
const additionalStates = [
  'Arkansas', 'Colorado', 'Connecticut', 'Delaware', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Generate basic state guides for remaining states
additionalStates.forEach(stateName => {
  STATE_GUIDES[stateName] = {
    stateName,
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions in public',
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
  };
});
