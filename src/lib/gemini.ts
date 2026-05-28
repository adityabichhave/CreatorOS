import { GoogleGenerativeAI } from '@google/generative-ai';
import { safeParseJSON } from '@/lib/utils';
import type {
  GeneratedContent,
  GeneratorInput,
  ViralityData,
  TrendingTopic,
  ThumbnailConcept,
  CompetitorAnalysis,
} from '@/types';

// ============================================
// GEMINI CLIENT INITIALIZATION
// ============================================

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');
  return new GoogleGenerativeAI(apiKey);
};

const getModel = () => {
  const genAI = getGeminiClient();
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

// ============================================
// CONTENT GENERATION
// ============================================

export async function generateCreatorContent(
  input: GeneratorInput
): Promise<GeneratedContent> {
  const model = getModel();

  const prompt = `You are CreatorOS — an expert AI growth copilot for content creators.

A creator needs a COMPLETE social media content package. Analyze the following:

VIDEO TITLE: ${input.videoTitle}
TOPIC: ${input.topic}
NICHE: ${input.niche}
TONE: ${input.tone}
TARGET PLATFORM: ${input.platform}
SCRIPT/CONTENT:
${input.script || 'No script provided — generate based on title and topic.'}

Generate a comprehensive, VIRAL-OPTIMIZED content package. Return a JSON object with this EXACT structure:

{
  "youtubeTitles": [
    {
      "title": "SEO-optimized YouTube title",
      "ctrScore": 85,
      "seoScore": 90,
      "reason": "Why this title works"
    }
  ],
  "youtubeDescription": "Full SEO-rich YouTube description with timestamps placeholder, hashtags, and call to actions (minimum 500 words). Include keywords naturally.",
  "tags": ["tag1", "tag2", "tag3"],
  "instagramCaptions": [
    {
      "style": "Hook-First Emotional",
      "caption": "Full Instagram caption with hook, body, and CTA",
      "hookFirst": true
    }
  ],
  "hashtags": {
    "trending": ["#trending1", "#trending2"],
    "category": ["#category1", "#category2"],
    "viral": ["#viral1", "#viral2"],
    "niche": ["#niche1", "#niche2"]
  },
  "shortsHooks": [
    {
      "hook": "Attention-grabbing hook text",
      "type": "question",
      "firstThreeSeconds": "The first 3 seconds script"
    }
  ],
  "thumbnailIdeas": [
    {
      "title": "Thumbnail concept name",
      "text": "Text overlay for thumbnail",
      "emotion": "Shock/Curiosity/Fear/Joy",
      "colors": ["#color1", "#color2"],
      "composition": "Person reacting on left, text on right with bold overlay",
      "style": "Contrast high-energy"
    }
  ],
  "keywordSuggestions": ["keyword1", "keyword2"]
}

Rules:
- Generate exactly 5 YouTube titles, ranked by CTR potential
- YouTube description must be 500+ words, SEO-rich
- Generate exactly 30 tags (mix of broad + niche)
- Generate 3 Instagram captions with different styles (Emotional, Educational, Story)  
- Generate 25 hashtags across all 4 categories
- Generate 5 Shorts hooks with different types
- Generate 3 thumbnail concepts
- Make everything HIGHLY optimized for virality in the ${input.niche} niche
- Tone should be: ${input.tone}
- Keep scores realistic (60-95 range)

Return ONLY valid JSON. No markdown, no explanation.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const content = safeParseJSON<GeneratedContent>(text, {} as GeneratedContent);
    return content;
  } catch (error) {
    console.error('Gemini generation error:', error);
    throw new Error('Failed to generate content. Check your API key and try again.');
  }
}

// ============================================
// VIRALITY ANALYSIS
// ============================================

export async function analyzeVirality(
  input: GeneratorInput
): Promise<ViralityData> {
  const model = getModel();

  const prompt = `You are a viral content strategist and YouTube growth expert.

Analyze this content for VIRALITY POTENTIAL:

TITLE: ${input.videoTitle}
TOPIC: ${input.topic}
NICHE: ${input.niche}
TONE: ${input.tone}
PLATFORM: ${input.platform}
SCRIPT/HOOK: ${input.script?.substring(0, 500) || 'Not provided'}

Return a JSON virality analysis with this EXACT structure:

{
  "overallScore": 78,
  "hookStrength": 82,
  "retentionPotential": 75,
  "emotionalImpact": 80,
  "clickability": 85,
  "trendPotential": 70,
  "engagementPotential": 77,
  "audienceType": "Tech-savvy millennials aged 22-35 interested in AI and productivity",
  "bestUploadTiming": "Tuesday-Thursday, 2PM-6PM EST for maximum reach",
  "thumbnailCTR": 72,
  "platformSuitability": [
    { "platform": "YouTube", "score": 88, "reason": "Long-form educational content performs well" },
    { "platform": "Instagram", "score": 72, "reason": "Carousel format would work for key points" },
    { "platform": "Shorts", "score": 65, "reason": "Hook is strong but topic needs condensing" }
  ],
  "improvements": [
    "Add a stronger emotional hook in the first 15 seconds",
    "Use more power words in the title",
    "Include a controversial or surprising statistic"
  ]
}

All scores must be integers between 0-100. Be realistic and specific.
Return ONLY valid JSON.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return safeParseJSON<ViralityData>(text, {} as ViralityData);
  } catch (error) {
    console.error('Virality analysis error:', error);
    throw new Error('Failed to analyze virality');
  }
}

// ============================================
// TREND EXPLORER
// ============================================

export async function exploreTrends(category: string): Promise<TrendingTopic[]> {
  const model = getModel();

  const prompt = `You are a content trend analyst with deep knowledge of YouTube, Instagram, and TikTok.

Generate trending content opportunities for the "${category}" niche.

Return a JSON array of trending topics with this EXACT structure:

[
  {
    "topic": "Topic name",
    "growth": 145,
    "niche": "${category}",
    "viralTitles": [
      "Viral title format 1",
      "Viral title format 2",
      "Viral title format 3"
    ],
    "relatedSearches": ["search1", "search2", "search3"],
    "contentIdeas": [
      "Video idea 1",
      "Video idea 2"
    ],
    "searchVolume": "high",
    "competition": "medium"
  }
]

Generate exactly 8 trending topics. Growth is percentage growth (e.g., 145 = 145% growth).
searchVolume and competition values: "low", "medium", "high", or "explosive"
Make topics HIGHLY relevant and currently trending for ${category}.
Return ONLY valid JSON array.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return safeParseJSON<TrendingTopic[]>(text, []);
  } catch (error) {
    console.error('Trend explorer error:', error);
    throw new Error('Failed to explore trends');
  }
}

// ============================================
// THUMBNAIL STUDIO
// ============================================

export async function generateThumbnailConcepts(input: {
  topic: string;
  style: string;
  mood: string;
  hasFace: boolean;
  colorTheme: string;
  thumbnailText: string;
}): Promise<ThumbnailConcept[]> {
  const model = getModel();

  const prompt = `You are a professional thumbnail designer and YouTube growth expert.

Generate 4 thumbnail concepts for this video:

TOPIC: ${input.topic}
STYLE: ${input.style}
MOOD: ${input.mood}
FACE IN THUMBNAIL: ${input.hasFace ? 'Yes' : 'No'}
COLOR THEME: ${input.colorTheme}
TEXT OVERLAY: "${input.thumbnailText}"

Return a JSON array with this EXACT structure:

[
  {
    "concept": "Concept name",
    "prompt": "Detailed AI image generation prompt for this thumbnail",
    "textOverlay": "Exact text overlay suggestion",
    "emotion": "Primary emotion conveyed",
    "colorPalette": ["#hexcolor1", "#hexcolor2", "#hexcolor3"],
    "composition": "Detailed composition description",
    "style": "Visual style description",
    "mood": "Overall mood and feeling"
  }
]

Make the concepts HIGHLY clickable and optimized for CTR. Be specific and detailed.
Return ONLY valid JSON array.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return safeParseJSON<ThumbnailConcept[]>(text, []);
  } catch (error) {
    console.error('Thumbnail studio error:', error);
    throw new Error('Failed to generate thumbnail concepts');
  }
}

// ============================================
// COMPETITOR ANALYZER
// ============================================

export async function analyzeCompetitor(
  videoUrl: string,
  additionalContext?: string
): Promise<CompetitorAnalysis> {
  const model = getModel();

  const prompt = `You are a competitive intelligence expert for YouTube content.

Analyze this YouTube video URL and generate a deep competitive analysis:
URL: ${videoUrl}
${additionalContext ? `Additional context: ${additionalContext}` : ''}

Note: Since you cannot directly access the URL, generate a realistic analysis based on patterns of viral videos and what makes them successful. If the URL contains keywords, use them to make the analysis more relevant.

Return a JSON object with this EXACT structure:

{
  "videoTitle": "Likely or extracted title from URL",
  "titlePsychology": "Analysis of why the title is compelling",
  "thumbnailStrategy": "Thumbnail strategy analysis",
  "seoKeywords": ["keyword1", "keyword2", "keyword3"],
  "audienceTargeting": "Target audience description",
  "hookTechniques": [
    "Hook technique 1",
    "Hook technique 2"
  ],
  "whyItPerformed": "Detailed analysis of why this content performed well",
  "improvements": [
    "Improvement suggestion 1",
    "Improvement suggestion 2"
  ],
  "similarIdeas": [
    "Similar viral content idea 1",
    "Similar viral content idea 2"
  ]
}

Return ONLY valid JSON.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return safeParseJSON<CompetitorAnalysis>(text, {} as CompetitorAnalysis);
  } catch (error) {
    console.error('Competitor analysis error:', error);
    throw new Error('Failed to analyze competitor');
  }
}
