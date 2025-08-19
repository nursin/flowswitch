const keywordMap = {
  urgency: {
    high: ['asap', 'urgent', 'now', 'today', 'by end of day'],
    medium: ['soon', 'this week'],
    low: [],
  },
  interest: {
    high: ['fun', 'exciting', 'love to'],
    medium: [],
    low: ['hate', 'boring', 'have to'],
  },
  novelty: {
    high: ['new', 'first time', 'explore', 'discover'],
    medium: [],
    low: ['routine', 'again', 'daily'],
  },
  hasCompetition: ['collaboration', 'compete', 'partner', 'team', 'meeting'],
  category: {
    work: ['work', 'business', 'grant', 'application', 'report', 'email', 'meeting'],
    learning: ['learn', 'research', 'study', 'read', 'course', 'knowledge'],
    health: ['health', 'doctor', 'dentist', 'exercise', 'gym', 'meds'],
    creative: ['write', 'create', 'design', 'draw', 'plan', 'survey'],
    social: ['call', 'friend', 'family', 'party', 'collaboration'],
    personal: ['personal', 'home', 'groceries', 'chores', 'buy'],
  },
};

const analyzeByKeywords = (text, dictionary) => {
  const lowerText = text.toLowerCase();
  for (const key in dictionary) {
    if (Array.isArray(dictionary[key])) {
      for (const keyword of dictionary[key]) {
        if (lowerText.includes(keyword)) {
          return key;
        }
      }
    }
  }
  return null;
};

export const analyzeTask = (title) => {
  const lowerTitle = title.toLowerCase();
  
  let urgency = analyzeByKeywords(lowerTitle, keywordMap.urgency) || 'medium';
  let interest = analyzeByKeywords(lowerTitle, keywordMap.interest) || 'medium';
  let novelty = analyzeByKeywords(lowerTitle, keywordMap.novelty) || 'medium';
  let category = analyzeByKeywords(lowerTitle, keywordMap.category) || 'personal';

  let hasCompetition = false;
  for (const keyword of keywordMap.hasCompetition) {
    if (lowerTitle.includes(keyword)) {
      hasCompetition = true;
      break;
    }
  }
  
  // Default estimated time
  let estimatedTime = '30';
  if (urgency == 'high') {
    estimatedTime = '60';
  } else if (urgency == 'low') {
    estimatedTime = '15';
  }

  return {
    description: '',
    urgency,
    interest,
    novelty,
    hasCompetition,
    estimatedTime,
    category,
  };
};
