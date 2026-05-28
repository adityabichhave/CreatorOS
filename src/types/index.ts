// ============================================
// TYPE DEFINITIONS FOR CREATOROS
// ============================================

export interface GeneratedContent {
  youtubeTitles: YouTubeTitle[];
  youtubeDescription: string;
  tags: string[];
  instagramCaptions: InstagramCaption[];
  hashtags: HashtagSet;
  shortsHooks: ShortsHook[];
  thumbnailIdeas: ThumbnailIdea[];
  viralityAnalysis?: ViralityData;
  keywordSuggestions?: string[];
}

export interface YouTubeTitle {
  title: string;
  ctrScore: number;
  seoScore: number;
  reason: string;
}

export interface InstagramCaption {
  style: string;
  caption: string;
  hookFirst: boolean;
}

export interface HashtagSet {
  trending: string[];
  category: string[];
  viral: string[];
  niche: string[];
}

export interface ShortsHook {
  hook: string;
  type: 'question' | 'statement' | 'challenge' | 'secret';
  firstThreeSeconds: string;
}

export interface ThumbnailIdea {
  title: string;
  text: string;
  emotion: string;
  colors: string[];
  composition: string;
  style: string;
}

export interface ViralityData {
  overallScore: number;
  hookStrength: number;
  retentionPotential: number;
  emotionalImpact: number;
  clickability: number;
  trendPotential: number;
  engagementPotential: number;
  audienceType: string;
  bestUploadTiming: string;
  platformSuitability: PlatformScore[];
  improvements: string[];
  thumbnailCTR: number;
}

export interface PlatformScore {
  platform: string;
  score: number;
  reason: string;
}

export interface TrendingTopic {
  topic: string;
  growth: number;
  niche: string;
  viralTitles: string[];
  relatedSearches: string[];
  contentIdeas: string[];
  searchVolume: 'low' | 'medium' | 'high' | 'explosive';
  competition: 'low' | 'medium' | 'high';
}

export interface ThumbnailConcept {
  concept: string;
  prompt: string;
  textOverlay: string;
  emotion: string;
  colorPalette: string[];
  composition: string;
  style: string;
  mood: string;
}

export interface CompetitorAnalysis {
  videoTitle: string;
  titlePsychology: string;
  thumbnailStrategy: string;
  seoKeywords: string[];
  audienceTargeting: string;
  hookTechniques: string[];
  whyItPerformed: string;
  improvements: string[];
  similarIdeas: string[];
}

export interface GeneratorInput {
  videoTitle: string;
  topic: string;
  script: string;
  niche: string;
  tone: string;
  platform: string;
}

export type AppPage =
  | 'dashboard'
  | 'generator'
  | 'trends'
  | 'thumbnail'
  | 'virality'
  | 'competitor'
  | 'history'
  | 'settings';

export interface HistoryItem {
  id: string;
  title: string;
  niche: string;
  platform: string;
  createdAt: string;
  content: GeneratedContent;
}
