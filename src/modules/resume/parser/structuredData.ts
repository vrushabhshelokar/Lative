import { SaveParsedResumeInput } from '../types';

interface SectionMatch {
  key: keyof Omit<SaveParsedResumeInput, 'resumeId' | 'fullText'>;
  patterns: RegExp[];
}

const SECTIONS: SectionMatch[] = [
  {
    key: 'skills',
    patterns: [
      /^(?:technical\s+)?skills$/i,
      /^skills\s+&\s+languages$/i,
      /^core\s+competencies$/i,
      /^technologies$/i,
      /^areas\s+of\s+expertise$/i
    ]
  },
  {
    key: 'projects',
    patterns: [
      /^projects$/i,
      /^academic\s+projects$/i,
      /^personal\s+projects$/i,
      /^selected\s+projects$/i,
      /^key\s+projects$/i
    ]
  },
  {
    key: 'education',
    patterns: [
      /^education$/i,
      /^academic\s+credentials$/i,
      /^educational\s+background$/i,
      /^academic\s+profile$/i,
      /^educational\s+qualifications$/i
    ]
  },
  {
    key: 'experience',
    patterns: [
      /^(?:work\s+)?experience$/i,
      /^professional\s+experience$/i,
      /^employment\s+history$/i,
      /^work\s+history$/i,
      /^professional\s+background$/i
    ]
  },
  {
    key: 'achievements',
    patterns: [
      /^achievements$/i,
      /^awards$/i,
      /^accomplishments$/i,
      /^honors$/i,
      /^awards\s+&\s+achievements$/i,
      /^certifications$/i
    ]
  }
];

/**
 * Splits raw resume text into structured categories (Skills, Projects, Education, Experience, Achievements).
 * Employs heuristic keyword/regex section headers scanning, parsing bullet points, and provides clean fallbacks.
 */
export const parseStructuredData = (
  fullText: string
): Omit<SaveParsedResumeInput, 'resumeId' | 'fullText'> => {
  const result: Omit<SaveParsedResumeInput, 'resumeId' | 'fullText'> = {
    skills: [],
    projects: [],
    education: [],
    experience: [],
    achievements: []
  };

  const lines = fullText.split('\n');
  let currentSection: keyof typeof result | null = null;
  let currentBlock: string[] = [];

  const flushBlock = () => {
    if (currentSection && currentBlock.length > 0) {
      const content = currentBlock.join('\n').trim();
      if (content) {
        // Split content by bullet patterns (e.g., '-', '•', '*', or numbers like '1.')
        const items = content
          .split(/(?:^|\n)(?:\s*[-•*+]\s*|\s*\d+\.\s*)/g)
          .map((item) => item.trim())
          .filter((item) => item.length > 0);
        
        if (items.length > 0) {
          result[currentSection].push(...items);
        } else {
          result[currentSection].push(content);
        }
      }
      currentBlock = [];
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Check if line matches any section heading criteria
    let matchedSection: keyof typeof result | null = null;
    for (const sec of SECTIONS) {
      const isMatch = sec.patterns.some((pattern) => pattern.test(trimmedLine));
      if (isMatch) {
        matchedSection = sec.key;
        break;
      }
    }

    if (matchedSection) {
      flushBlock();
      currentSection = matchedSection;
    } else {
      if (currentSection) {
        currentBlock.push(trimmedLine);
      }
    }
  }

  flushBlock();

  // If no headings were identified, divide the text by double newlines as fallback paragraphs
  const totalParsedCount =
    result.skills.length +
    result.projects.length +
    result.education.length +
    result.experience.length +
    result.achievements.length;

  if (totalParsedCount === 0 && fullText.trim()) {
    const paragraphs = fullText
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    result.experience = paragraphs;
  }

  return result;
};
