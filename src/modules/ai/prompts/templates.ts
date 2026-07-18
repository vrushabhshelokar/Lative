export const PROMPT_TEMPLATES = {
  /**
   * Generates a concise professional summary of the resume context.
   */
  profileSummary: `Summarize the professional profile of the candidate based strictly on the provided resume context. Highlight core expertise, years of experience, and general background in a single, well-structured paragraph. Do not use any markdown formatting.`,

  /**
   * Generates a detailed breakdown of skills, experience, and key accomplishments.
   */
  resumeSummary: `Analyze the provided resume context and provide a structured summary. List:
1. Core Technical Skills
2. Key Experience Highlights (Company, Role, Duration, and a brief description of impact)
3. Key Achievements
Ensure all listed items are directly derived from the resume and do not use any markdown formatting.`,

  /**
   * Compares the candidate's resume context against a user-supplied Job Description (JD).
   */
  jdComparison: (jobDescription: string) => `Compare the candidate's resume context against the following Job Description:

[JOB DESCRIPTION]
${jobDescription.trim()}

Evaluate and output:
1. Overall Fit: Rate the fit (High / Medium / Low) with a brief justification.
2. Strengths: List candidate qualifications and experience that align with the job requirements.
3. Gaps: List key qualifications or experience requested in the Job Description that are absent or weak in the resume.
Ensure all listed items are directly derived from the resume and do not use any markdown formatting.`,

  /**
   * Compares the candidate's resume context against a job description to specifically extract and checklist missing skills.
   */
  missingSkills: (jobDescription: string) => `Identify any technical or soft skills requested in the Job Description that are not explicitly present or supported in the candidate's resume context.

[JOB DESCRIPTION]
${jobDescription.trim()}

Output a list of missing skills, including a brief note on why each skill is required for this role. Do not use any markdown formatting.`,

  /**
   * Compares multiple resume profiles (or evaluates the active one) to advise on suitability.
   */
  resumeAdvisor: (jobDescription: string) => `Evaluate the candidate's parsed resume details against the following Job Description to advise on suitability:

[JOB DESCRIPTION]
${jobDescription.trim()}

Provide a concise, direct recommendation on whether this candidate should apply for this role, outlining the key matching criteria and potential warning signs (lack of required stack, experience duration gaps). Do not use any markdown formatting.`,

  /**
   * Evaluates the candidate's resume context against the active webpage contents.
   */
  analyzePage: `Analyze the visible text content of the webpage the user is currently viewing in relation to their resume context. Provide:
1. Webpage Relevance: A brief statement on what this page represents (e.g. a job posting for a specific role, a company page, or unrelated content).
2. Key Highlights: List key requirements or details matching the user's skills.
3. Summary Recommendation: A 1-2 sentence advice on how this page relates to the user's profile.
Ensure all details are derived directly from the webpage and resume context, and do not use any markdown formatting.`
};
export default PROMPT_TEMPLATES;
