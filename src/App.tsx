import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { 
  Loader2, Sparkles, Video, Hash, Music, Type as TypeIcon, 
  Languages, Play, Clapperboard, ChevronRight, 
  ArrowRight, CheckCircle2, DollarSign, BookOpen, 
  Home, Menu, X, Github, Twitter, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface VisualScene {
  scene_id: number;
  description: string;
  on_screen_text: string;
}

interface ScriptOutput {
  language: string;
  hook: string;
  script_body: string;
  visual_scenes: VisualScene[];
  audio_vibe: string;
  tags: string[];
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How to Go Viral on TikTok in 2026: The Ultimate Algorithm Mastery Guide",
    excerpt: "Discover the latest algorithm shifts and engagement strategies that are driving millions of views in 2026. This comprehensive guide breaks down the science of short-form virality.",
    date: "March 24, 2026",
    readTime: "45 min read",
    category: "Strategy",
    content: `The TikTok algorithm in 2026 has evolved beyond simple watch time. It now prioritizes 'meaningful interactions' and 'niche authority'. To go viral today, you need more than just a catchy song; you need a narrative arc that keeps users through the entire 60 seconds. Our data shows that videos with a 'pattern interrupt' in the first 1.5 seconds have a 400% higher retention rate.

    ### The 2026 Algorithm Pillars
    1. **Niche Authority:** The algorithm now categorizes creators into hyper-specific clusters. If you post about 'AI Tools', your content is served to a cluster of users who have interacted with similar content in the last 48 hours.
    2. **Meaningful Interactions:** A 'share' is now worth 10x more than a 'like'. The algorithm looks for content that sparks conversations or prompts users to send the video to a friend.
    3. **Retention Velocity:** It's not just about finishing the video; it's about how fast the user gets to the 50% mark.
    4. **Semantic Search Integration:** TikTok is now a search engine. Your captions and on-screen text must include keywords that users are actually searching for.

    ### The Viral Hook Blueprint
    Your hook must address a 'Pain Point' or a 'Curiosity Gap'. For example, instead of saying 'Here are 3 AI tools', try 'The 3 AI tools that are making my job obsolete'. The latter creates immediate stakes.
    - **Visual Hooks:** Use bright colors, fast movement, or text that appears and disappears quickly.
    - **Audio Hooks:** Use trending sounds but remix them to fit your specific niche.
    - **Emotional Hooks:** Evoke awe, surprise, or even a bit of healthy controversy.

    ### Technical Optimization
    In 2026, 4K resolution is the standard. Videos shot in lower quality are automatically deprioritized in the 'For You' feed. Additionally, using the platform's native editing tools for text overlays signals to the algorithm that your content is fresh and platform-native.
    
    ### The 2026 Engagement Checklist
    - [ ] Hook within 1.5 seconds
    - [ ] Subtitles are clear and high-contrast
    - [ ] Call to Action (CTA) is placed at the 75% mark
    - [ ] Keywords are included in the first 3 lines of the caption
    - [ ] Video is exported in 4K at 60fps`
  },
  {
    id: 2,
    title: "The Power of AI in Modern Content Creation: A 2026 Perspective",
    excerpt: "AI isn't just a tool; it's your co-creator. Learn how to leverage LLMs for scriptwriting, visual orchestration, and global scaling.",
    date: "March 22, 2026",
    readTime: "40 min read",
    category: "AI Technology",
    content: `Artificial Intelligence has transitioned from a novelty to a necessity. In 2026, the most successful creators are those who use AI to handle the 'heavy lifting' of ideation and scripting, allowing them to focus on high-level creative direction. By using tools like our Viral Engine, creators can generate 50+ localized versions of a single concept in minutes.

    ### Generative Scripting: The New Standard
    The key to AI scripting is 'Contextual Prompting'. Instead of asking for a 'funny script', you must provide the AI with your audience's demographics, current trending sounds, and your specific brand voice.
    - **Persona Mapping:** Tell the AI exactly who it is (e.g., "You are a sarcastic tech reviewer").
    - **Constraint Injection:** Limit the AI to specific word counts or sentence structures to maintain a fast pace.

    ### Visual Orchestration and B-Roll
    AI now allows us to describe scenes in such detail that generative video engines can produce near-perfect b-roll. This reduces production costs by 90% while maintaining a high-end cinematic feel.
    - **Prompt Engineering for Video:** Learn how to describe lighting, camera angles, and textures.
    - **Consistency Models:** Use AI to keep characters and environments consistent across multiple scenes.

    ### The Ethics of AI Content
    As AI becomes indistinguishable from human creation, transparency becomes your greatest asset. Disclosing AI assistance builds trust with your audience, which is the most valuable currency in 2026.
    
    ### Future Outlook: 2027 and Beyond
    We expect AI to move into real-time content adaptation, where the video changes its hook based on who is watching it in real-time.`
  },
  {
    id: 3,
    title: "Mastering the First 3 Seconds: Viral Hook Secrets Revealed",
    excerpt: "The first 3 seconds determine your video's fate. We analyze the top 100 viral hooks of the year to find the common patterns of success.",
    date: "March 20, 2026",
    readTime: "35 min read",
    category: "Psychology",
    content: `Psychologically, the human attention span for digital content has stabilized at roughly 2 seconds. If you haven't established value or curiosity by then, the user has already swiped. We've identified three core hook types: The 'Question of Doom', The 'Visual Paradox', and The 'Secret Reveal'. Each serves a different audience segment.

    ### The Question of Doom
    Ask a question that challenges the user's current reality. 'Why are you still using [Old Tool]?' This forces the user to stop and justify their behavior.
    - **Why it works:** It triggers the 'Loss Aversion' bias.
    - **Pro Tip:** Use a split-screen with the "old way" vs the "new way".

    ### The Visual Paradox
    Show something that shouldn't be possible. A floating object, an unexpected color, or a high-speed transition. The brain is hardwired to solve visual puzzles.
    - **Why it works:** It triggers the 'Orienting Response'.
    - **Pro Tip:** Use a bright, contrasting background to make the paradox pop.

    ### The Secret Reveal
    Start with 'Nobody is talking about this...' or 'I found a loophole in...'. Humans have an evolutionary drive to seek out 'insider information' that gives them a competitive advantage.
    - **Why it works:** It creates a 'Curiosity Gap' that can only be closed by watching the rest of the video.
    
    ### Advanced Hook Strategies
    - **The Negative Hook:** "Don't do [X] if you want [Y]."
    - **The Transformation Hook:** Show the end result first, then say "Here's how I did it."
    - **The Relatability Hook:** "Is it just me, or is [X] getting out of hand?"`
  },
  {
    id: 4,
    title: "Why Multilingual Content is the Future: 10x Your Reach in 2026",
    excerpt: "Breaking language barriers is the fastest way to 10x your reach. Here's how to localize without losing the soul of your content.",
    date: "March 18, 2026",
    readTime: "42 min read",
    category: "Global Growth",
    content: `The internet is no longer English-centric. Regional markets in MENA, LATAM, and SEA are growing at twice the rate of Western markets. Localizing your content isn't just about translation; it's about cultural adaptation. A joke that works in New York might fail in Cairo. This is where AI-driven cultural understanding becomes your secret weapon.

    ### The Localization Matrix
    1. **Translation:** Literal word-for-word conversion (The bare minimum).
    2. **Transcreation:** Re-imagining the message for a new culture while keeping the intent.
    3. **Cultural Nuance:** Adjusting references, humor, and even color palettes to match local preferences.
    4. **Dialect Adaptation:** Using specific dialects (e.g., Egyptian vs. Saudi Arabic) to build deep trust.

    ### Case Study: The Arabic Market
    The Arabic-speaking world is one of the most engaged audiences on TikTok. By using Modern Standard Arabic for broad reach or specific dialects for deep engagement, creators are seeing 5x higher ROI on their content spend.
    - **Key Insight:** Arabic speakers value storytelling and high-energy delivery.
    - **Visual Tip:** Use right-to-left text alignment for Arabic captions to improve readability.

    ### Scaling Globally with AI
    With Viral Engine, you can take a single English script and generate culturally-aware versions for 50+ markets in seconds. This is the only way to stay competitive in a globalized creator economy.`
  },
  {
    id: 5,
    title: "YouTube Shorts vs. Instagram Reels: The 2026 Platform War",
    excerpt: "A deep dive into the analytics of both platforms to help you decide where to focus your energy for maximum growth.",
    date: "March 15, 2026",
    readTime: "48 min read",
    category: "Platforms",
    content: `While both platforms look similar, their monetization and discovery engines are vastly different. YouTube Shorts is the king of long-term discovery, while Reels excels at community building and viral spikes. In 2026, the smart move is a cross-platform strategy that adapts the 'vibe' of the video to each platform's unique culture.

    ### YouTube Shorts: The SEO Powerhouse
    Shorts are now integrated into Google Search. A well-optimized Short can drive traffic for years, unlike a Reel which typically has a 48-hour lifespan.
    - **Discovery:** Driven by keywords and search intent.
    - **Monetization:** Ad revenue sharing is more stable than Meta's bonus programs.

    ### Instagram Reels: The Community Builder
    Reels are more 'social'. They are designed to be shared in DMs and posted to Stories. If your goal is to build a personal brand and sell products, Reels is your primary battlefield.
    - **Discovery:** Driven by social signals and shared interests.
    - **Monetization:** Better for direct sales, affiliate marketing, and brand deals.

    ### The 2026 Cross-Platform Strategy
    1. **Film in 4K:** High quality is non-negotiable for both.
    2. **Adapt the Hook:** Use a more search-focused hook for YouTube and a more social hook for Instagram.
    3. **Sync the Metadata:** Use relevant hashtags for each platform's specific ecosystem.`
  },
  {
    id: 6,
    title: "10 AI Tools Every Content Creator Needs in 2026: The Essential Stack",
    excerpt: "From voice cloning to automated editing, these tools are redefining the creator economy and slashing production times.",
    date: "March 12, 2026",
    readTime: "38 min read",
    category: "Tools",
    content: `The creator stack has changed. We're looking at tools that don't just edit video, but understand context. Our top picks for 2026 include real-time translation engines, AI-driven color grading, and of course, advanced script generators that understand viral triggers.

    ### The Core Stack for 2026
    1. **Viral Engine:** For high-retention scripting and visual planning.
    2. **ElevenLabs 4.0:** For indistinguishable voice cloning in 50+ languages.
    3. **Runway Gen-4:** For cinematic AI-generated b-roll.
    4. **Descript Ultra:** For text-based video editing and filler word removal.
    5. **Midjourney v8:** For hyper-realistic thumbnails and static assets.
    6. **Captions.ai:** For automated, high-engagement subtitles.

    ### Why Integration Matters
    Using these tools in isolation is a mistake. The real power comes from a workflow where your script engine feeds your voice clone, which then syncs with your generative video tool.
    - **Workflow Automation:** Use Zapier or custom scripts to move assets between tools automatically.
    - **Efficiency Gains:** A professional-grade video that used to take 10 hours now takes 45 minutes.`
  },
  {
    id: 7,
    title: "The Psychology of Viral Content: Why We Share in the Digital Age",
    excerpt: "Understanding the deep-seated emotional triggers that compel users to hit the 'share' button and spread your message.",
    date: "March 10, 2026",
    readTime: "44 min read",
    category: "Psychology",
    content: `Sharing is a social currency. When a user shares your video, they are saying something about themselves. High-arousal emotions like awe, anger, and amusement are the primary drivers. We break down the 'Social Transmission' framework and how to bake it into your scripts from the first line.

    ### The STEPPS Framework (Adapted for 2026)
    - **Social Currency:** Does sharing this make the user look smart or 'in the know'?
    - **Triggers:** Is your content associated with a common daily activity?
    - **Emotion:** Does it evoke a strong physiological response?
    - **Public:** Is the behavior you're encouraging visible to others?
    - **Practical Value:** Is the information actually useful?
    - **Stories:** Is the message wrapped in a compelling narrative?

    ### Applying Psychology to Scripts
    - **The 'Aha!' Moment:** Provide a sudden realization or a new way of looking at a problem.
    - **The 'Us vs. Them' Dynamic:** Create a sense of belonging by identifying a common enemy or challenge.
    - **The 'Vulnerability' Factor:** Sharing personal struggles makes you more human and relatable.`
  },
  {
    id: 8,
    title: "How to Monetize Your Short-Form Video Content: Beyond the Creator Fund",
    excerpt: "Building a sustainable business through shorts and reels requires a diversified revenue strategy. Here's how to do it.",
    date: "March 8, 2026",
    readTime: "46 min read",
    category: "Business",
    content: `The creator fund is a bonus, not a business model. In 2026, the real money is in direct-to-consumer products, high-ticket affiliate marketing, and brand partnerships that leverage your niche authority. We show you how to build a funnel that starts with a 15-second viral hit.

    ### The Monetization Pyramid
    1. **Direct Sales:** Selling your own digital or physical products (Highest Margin).
    2. **Brand Partnerships:** Long-term 'Ambassador' roles rather than one-off posts.
    3. **Affiliate Marketing:** Recommending tools you actually use (Passive Income).
    4. **Platform Payouts:** The baseline 'gas money' from TikTok/YouTube.

    ### Building the Funnel
    - **Top of Funnel (TOFU):** Viral shorts that build awareness.
    - **Middle of Funnel (MOFU):** Educational content that builds trust.
    - **Bottom of Funnel (BOFU):** Direct offers and sales pages.
    - **Retention:** Email lists and community groups (Discord/Slack).`
  },
  {
    id: 9,
    title: "Creating a Consistent Brand Voice with AI Scripts: The Authenticity Guide",
    excerpt: "How to train AI to sound exactly like you, every single time, without losing the human touch that builds trust.",
    date: "March 5, 2026",
    readTime: "34 min read",
    category: "Branding",
    content: `Consistency is the bedrock of trust. If your AI-generated scripts sound like a robot, your audience will disconnect. The key is in the 'Style Injection'—providing the AI with your unique catchphrases, tone of voice, and even your common grammatical quirks.

    ### Style Injection Techniques
    - **The Catchphrase Loop:** Ensure the AI knows your signature intro and outro.
    - **Tone Mapping:** Define your tone as a mix of attributes (e.g., '80% Professional, 20% Sarcastic').
    - **Vocabulary Constraints:** Give the AI a list of words you *never* use and words you *always* use.

    ### Maintaining the 'Human Touch'
    - **Manual Tweaking:** Always spend 5 minutes refining the AI's output to add your personal flair.
    - **Recording Style:** Your delivery (energy, pacing, pauses) is just as important as the script itself.`
  },
  {
    id: 10,
    title: "The Rise of the AI Influencer: Trends and Predictions for 2027",
    excerpt: "Will virtual creators replace humans? Exploring the ethics, opportunities, and future of AI-driven personalities.",
    date: "March 2, 2026",
    readTime: "52 min read",
    category: "Future Trends",
    content: `AI influencers are no longer just CGI models; they are interactive, real-time personalities. As we move further into 2026, the line between human and virtual creators is blurring. We explore how human creators can collaborate with AI personas to scale their presence across multiple platforms simultaneously.

    ### The Hybrid Creator Model
    The most successful creators of 2027 will be 'Hybrid Creators'—humans who manage a fleet of AI avatars that handle different niches or languages. This allows for 24/7 content output without burnout.
    - **Scalability:** One human can manage 10+ AI channels.
    - **Localization:** AI avatars can speak any language fluently.

    ### Ethics and Regulation
    We predict that by 2027, all AI content will require a digital watermark. This isn't a hindrance; it's a way to verify authenticity in an age of deepfakes.
    - **Transparency:** Be open about your use of AI to build long-term trust.`
  }
];

export default function App() {
  const [view, setView] = useState<'landing' | 'engine' | 'blog' | 'about' | 'contact' | 'privacy' | 'terms' | 'faq' | 'pricing' | 'casestudies' | 'help'>('landing');
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<ScriptOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const prompt = `
        You are a world-class viral content creator specializing in TikTok, Reels, and YouTube Shorts.
        Topic/Idea: ${topic}
        Target Language: ${language}
        PROCESS:
        1. Generate a high-retention 30-60 second script about the topic.
        2. Provide detailed image/video prompts for each scene.
        3. Suggest trending hashtags and titles.
        RULES:
        - Respond entirely in the requested Target Language (${language}).
        - If the language is Arabic, use "Modern Standard" unless a specific dialect is requested in the topic.
        - Ensure the tone is high-energy and engaging.
      `;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              language: { type: Type.STRING },
              hook: { type: Type.STRING },
              script_body: { type: Type.STRING },
              visual_scenes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    scene_id: { type: Type.INTEGER },
                    description: { type: Type.STRING },
                    on_screen_text: { type: Type.STRING }
                  },
                  required: ["scene_id", "description", "on_screen_text"]
                }
              },
              audio_vibe: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["language", "hook", "script_body", "visual_scenes", "audio_vibe", "tags"]
          }
        }
      });
      if (response.text) {
        setOutput(JSON.parse(response.text));
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate script.");
    } finally {
      setIsGenerating(false);
    }
  };

  const PayPalButton = () => (
    <a 
      href={`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=mahamustafa1968@hotmail.com&item_name=Viral+Engine+Pro+Subscription&amount=29.99&currency_code=USD`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[#0070ba] hover:bg-[#005ea6] text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105"
    >
      <DollarSign className="w-5 h-5" />
      Upgrade to Pro via PayPal
    </a>
  );

  const Nav = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => { setView('landing'); setSelectedPost(null); }}
        >
          <div className="w-10 h-10 rounded-xl bg-[#F27D26] flex items-center justify-center transform -rotate-6">
            <Clapperboard className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">Viral Engine</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => { setView('landing'); setSelectedPost(null); }} className={`text-sm font-medium uppercase tracking-widest ${view === 'landing' ? 'text-[#F27D26]' : 'text-white/60 hover:text-white'}`}>Home</button>
          <button onClick={() => { setView('engine'); setSelectedPost(null); }} className={`text-sm font-medium uppercase tracking-widest ${view === 'engine' ? 'text-[#F27D26]' : 'text-white/60 hover:text-white'}`}>Engine</button>
          <button onClick={() => { setView('blog'); setSelectedPost(null); }} className={`text-sm font-medium uppercase tracking-widest ${view === 'blog' ? 'text-[#F27D26]' : 'text-white/60 hover:text-white'}`}>Blog</button>
          <button onClick={() => { setView('pricing'); setSelectedPost(null); }} className={`text-sm font-medium uppercase tracking-widest ${view === 'pricing' ? 'text-[#F27D26]' : 'text-white/60 hover:text-white'}`}>Pricing</button>
          <button onClick={() => { setView('about'); setSelectedPost(null); }} className={`text-sm font-medium uppercase tracking-widest ${view === 'about' ? 'text-[#F27D26]' : 'text-white/60 hover:text-white'}`}>About</button>
          <PayPalButton />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-black border-b border-white/10 p-6 space-y-6"
          >
            <button onClick={() => { setView('landing'); setIsMenuOpen(false); setSelectedPost(null); }} className="block w-full text-left text-lg font-bold uppercase">Home</button>
            <button onClick={() => { setView('engine'); setIsMenuOpen(false); setSelectedPost(null); }} className="block w-full text-left text-lg font-bold uppercase">Engine</button>
            <button onClick={() => { setView('blog'); setIsMenuOpen(false); setSelectedPost(null); }} className="block w-full text-left text-lg font-bold uppercase">Blog</button>
            <div className="pt-4 border-t border-white/10">
              <PayPalButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  const LandingPage = () => (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F27D26] rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F27D26] text-xs font-bold uppercase tracking-[0.2em] mb-8">
              The Future of Content Creation
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
              Go Viral <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F27D26] to-[#ffb37a]">
                Every Single Time.
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Stop guessing. Our AI-powered engine crafts high-retention scripts, visual prompts, and metadata designed to dominate TikTok, Reels, and Shorts in 50+ languages.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setView('engine')}
                className="group flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#F27D26] hover:text-white transition-all"
              >
                Launch Engine
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <PayPalButton />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#F27D26]/10 flex items-center justify-center">
              <Languages className="w-6 h-6 text-[#F27D26]" />
            </div>
            <h3 className="text-2xl font-bold uppercase">Multilingual Viral Hooks</h3>
            <p className="text-white/50 leading-relaxed">
              Arabic, Spanish, French, or Mandarin. We understand the cultural nuances that make content go viral in every region.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Video className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold uppercase">Visual Orchestration</h3>
            <p className="text-white/50 leading-relaxed">
              Don't just write scripts. Get detailed AI-ready visual prompts for every scene to create stunning visuals instantly.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <Hash className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold uppercase">SEO Optimized Meta</h3>
            <p className="text-white/50 leading-relaxed">
              Trending hashtags and titles generated in real-time to ensure your content ranks at the top of search results.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-[#111] py-32 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-black text-[#F27D26] mb-2">50M+</div>
            <div className="text-xs uppercase tracking-widest text-white/40">Views Generated</div>
          </div>
          <div>
            <div className="text-5xl font-black text-[#F27D26] mb-2">50+</div>
            <div className="text-xs uppercase tracking-widest text-white/40">Languages Supported</div>
          </div>
          <div>
            <div className="text-5xl font-black text-[#F27D26] mb-2">10k+</div>
            <div className="text-xs uppercase tracking-widest text-white/40">Active Creators</div>
          </div>
          <div>
            <div className="text-5xl font-black text-[#F27D26] mb-2">98%</div>
            <div className="text-xs uppercase tracking-widest text-white/40">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F27D26] flex items-center justify-center">
              <Clapperboard className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-bold uppercase">Viral Engine</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-widest text-white/40">
            <button onClick={() => setView('about')} className="hover:text-white transition-colors">About</button>
            <button onClick={() => setView('contact')} className="hover:text-white transition-colors">Contact</button>
            <button onClick={() => setView('pricing')} className="hover:text-white transition-colors">Pricing</button>
            <button onClick={() => setView('casestudies')} className="hover:text-white transition-colors">Case Studies</button>
            <button onClick={() => setView('help')} className="hover:text-white transition-colors">Help Center</button>
            <button onClick={() => setView('faq')} className="hover:text-white transition-colors">FAQ</button>
            <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => setView('terms')} className="hover:text-white transition-colors">Terms</button>
          </div>
          <div className="flex gap-6">
            <Twitter className="w-5 h-5 text-white/40 hover:text-white cursor-pointer" />
            <Github className="w-5 h-5 text-white/40 hover:text-white cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );

  const BlogPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <motion.div 
            key="post"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            <button 
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-[#F27D26] text-xs font-bold uppercase tracking-widest mb-12 hover:translate-x-[-4px] transition-transform"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Blog
            </button>
            <span className="text-[#F27D26] text-xs font-bold uppercase tracking-widest mb-4 block">{selectedPost.category}</span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">{selectedPost.title}</h1>
            <div className="flex items-center gap-6 text-white/40 text-xs uppercase tracking-widest mb-12 border-y border-white/10 py-6">
              <span>{selectedPost.date}</span>
              <span>{selectedPost.readTime}</span>
            </div>
            <div className="prose prose-invert prose-xl max-w-none">
              <p className="text-white/80 leading-relaxed mb-8">{selectedPost.content}</p>
              <p className="text-white/80 leading-relaxed mb-8">
                In the rapidly evolving landscape of 2026, staying ahead means embracing the tools that amplify your creativity. Viral Engine is designed to be that bridge between your vision and the global audience. Whether you're a solo creator or a large-scale media house, the principles of viral growth remain the same: Hook, Value, and Retention.
              </p>
              <div className="bg-[#111] p-8 rounded-3xl border border-white/10 my-12">
                <h3 className="text-2xl font-bold uppercase mb-4">Key Takeaways</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F27D26] mt-1" />
                    <span>Always prioritize the first 1.5 seconds of your video.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F27D26] mt-1" />
                    <span>Use AI to localize content for high-growth regional markets.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F27D26] mt-1" />
                    <span>Focus on 'meaningful interactions' rather than just views.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-20">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">The Creator <br /><span className="text-[#F27D26]">Journal</span></h1>
              <p className="text-white/40 uppercase tracking-[0.3em] text-sm">Insights, Strategies & AI Secrets</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS.map((post) => (
                <div 
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group bg-[#111] border border-white/10 rounded-[32px] p-8 hover:border-[#F27D26] transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[#F27D26] text-xs font-bold uppercase tracking-widest">{post.category}</span>
                      <span className="text-white/30 text-[10px] uppercase tracking-widest">{post.readTime}</span>
                    </div>
                    <h2 className="text-3xl font-bold uppercase leading-tight mb-4 group-hover:text-[#F27D26] transition-colors">{post.title}</h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-8">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const EnginePage = () => (
    <div className="pt-32 pb-20">
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-[32px] p-8 space-y-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                Content Idea
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 3 psychological tricks to make anyone like you..."
                className="w-full h-40 bg-black border border-white/10 rounded-2xl p-5 text-sm focus:outline-none focus:border-[#F27D26] transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                Target Language
              </label>
              <div className="relative">
                <Languages className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g., English, Arabic, Spanish"
                  className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:border-[#F27D26] transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full bg-[#F27D26] hover:bg-white hover:text-black text-black font-black uppercase tracking-widest text-sm py-5 rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isGenerating ? "Analyzing..." : "Generate Script"}
            </button>
            
            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">{error}</div>}
          </div>
          
          <div className="bg-gradient-to-br from-[#F27D26] to-[#ff8c36] rounded-[32px] p-8 text-black">
            <h4 className="text-xl font-black uppercase mb-2">Go Pro</h4>
            <p className="text-sm font-medium mb-6 opacity-80">Unlock unlimited generations, custom voice clones, and 4K visual prompts.</p>
            <PayPalButton />
          </div>
        </div>

        {/* Right Column - Output */}
        <div className="lg:col-span-8">
          {output ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#111] border border-white/10 rounded-[32px] p-8">
                  <div className="flex items-center gap-2 text-[#F27D26] mb-4">
                    <TypeIcon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">The Hook</span>
                  </div>
                  <p className="text-2xl font-bold leading-tight">"{output.hook}"</p>
                </div>
                <div className="bg-[#111] border border-white/10 rounded-[32px] p-8">
                  <div className="flex items-center gap-2 text-[#F27D26] mb-4">
                    <Music className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Audio Vibe</span>
                  </div>
                  <p className="text-white/80 mb-6">{output.audio_vibe}</p>
                  <div className="flex flex-wrap gap-2">
                    {output.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        #{tag.replace('#', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-[32px] p-8">
                <div className="flex items-center gap-2 text-[#F27D26] mb-6">
                  <TypeIcon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Full Script</span>
                </div>
                <p className="text-xl leading-relaxed text-white/90 whitespace-pre-wrap">{output.script_body}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-white/30 px-4">
                  <Video className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Visual Scenes</span>
                </div>
                {output.visual_scenes.map((scene) => (
                  <div key={scene.scene_id} className="bg-[#111] border border-white/10 rounded-[32px] p-8 flex gap-8">
                    <div className="text-4xl font-black text-[#F27D26] opacity-20">{scene.scene_id.toString().padStart(2, '0')}</div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-2">Visual Prompt</span>
                        <p className="text-white/90 text-lg">{scene.description}</p>
                      </div>
                      <div className="bg-black/50 rounded-2xl p-4 border border-white/5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#F27D26] block mb-1">On-Screen Text</span>
                        <p className="font-mono text-sm">"{scene.on_screen_text}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[600px] border-2 border-white/5 border-dashed rounded-[40px] flex flex-col items-center justify-center text-center p-12">
              <Sparkles className="w-16 h-16 text-white/10 mb-6" />
              <h3 className="text-2xl font-bold uppercase mb-4">Ready to Create?</h3>
              <p className="text-white/30 max-w-sm uppercase tracking-widest text-xs leading-loose">
                Enter your idea and language to generate a high-retention viral script.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );

  const AboutPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-12">About <span className="text-[#F27D26]">Viral Engine</span></h1>
      <div className="prose prose-invert prose-xl max-w-none">
        <p className="text-white/80 leading-relaxed mb-8">
          Viral Engine was born out of a simple observation: the creator economy is moving faster than humanly possible. In 2026, the difference between a successful creator and a struggling one isn't just talent—it's the ability to leverage technology to scale.
        </p>
        <p className="text-white/80 leading-relaxed mb-8">
          Our mission is to democratize viral growth. We believe that a creator in Cairo should have the same tools and insights as a creator in Los Angeles. By combining advanced LLMs with deep cultural data, we've built an engine that doesn't just translate, but transcreates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold uppercase mb-4">Our Vision</h3>
            <p className="text-white/50 text-sm">To be the global standard for short-form content orchestration, enabling 1 billion creators to share their stories.</p>
          </div>
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold uppercase mb-4">Our Tech</h3>
            <p className="text-white/50 text-sm">Powered by Gemini 3.1 Pro and custom-trained cultural models for 50+ languages and dialects.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-12">Get in <span className="text-[#F27D26]">Touch</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <p className="text-white/60 text-lg">Have questions about our Pro plan or enterprise solutions? Our team is here to help you scale.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center">
                <Twitter className="w-5 h-5 text-[#F27D26]" />
              </div>
              <span className="text-sm uppercase tracking-widest">@ViralEngineHQ</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center">
                <Github className="w-5 h-5 text-[#F27D26]" />
              </div>
              <span className="text-sm uppercase tracking-widest">github.com/viralengine</span>
            </div>
          </div>
        </div>
        <form className="space-y-6 bg-[#111] p-8 rounded-[32px] border border-white/10">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Name</label>
            <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#F27D26] outline-none" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Email</label>
            <input type="email" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#F27D26] outline-none" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Message</label>
            <textarea className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#F27D26] outline-none h-32 resize-none" />
          </div>
          <button className="w-full bg-[#F27D26] text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all">Send Message</button>
        </form>
      </div>
    </div>
  );

  const PrivacyPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Privacy <span className="text-[#F27D26]">Policy</span></h1>
      <div className="prose prose-invert max-w-none text-white/60">
        <p className="mb-6">Last updated: March 25, 2026</p>
        <h3 className="text-white text-xl font-bold uppercase mb-4">1. Information We Collect</h3>
        <p className="mb-8">We collect information you provide directly to us, such as when you create an account, use our script engine, or contact support. This includes your email address, content ideas, and usage data.</p>
        <h3 className="text-white text-xl font-bold uppercase mb-4">2. How We Use Your Information</h3>
        <p className="mb-8">We use your information to provide and improve our services, personalize your experience, and communicate with you about updates and promotions.</p>
        <h3 className="text-white text-xl font-bold uppercase mb-4">3. Data Security</h3>
        <p className="mb-8">We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
      </div>
    </div>
  );

  const TermsPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Terms of <span className="text-[#F27D26]">Service</span></h1>
      <div className="prose prose-invert max-w-none text-white/60">
        <p className="mb-6">Last updated: March 25, 2026</p>
        <h3 className="text-white text-xl font-bold uppercase mb-4">1. Acceptance of Terms</h3>
        <p className="mb-8">By accessing or using Viral Engine, you agree to be bound by these Terms of Service.</p>
        <h3 className="text-white text-xl font-bold uppercase mb-4">2. Use of Service</h3>
        <p className="mb-8">You are responsible for the content you generate and must comply with all applicable laws and platform policies (TikTok, Instagram, YouTube).</p>
        <h3 className="text-white text-xl font-bold uppercase mb-4">3. Subscriptions and Payments</h3>
        <p className="mb-8">Pro subscriptions are billed monthly. You can cancel at any time. Payments are processed securely via PayPal.</p>
      </div>
    </div>
  );

  const FAQPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-12">Frequently Asked <span className="text-[#F27D26]">Questions</span></h1>
      <div className="space-y-6 text-left max-w-2xl mx-auto">
        {[
          { q: "How many languages do you support?", a: "We currently support over 50 languages and major regional dialects, including Arabic (all dialects), Spanish, French, Mandarin, and more." },
          { q: "Is the content copyright-free?", a: "Yes, you own 100% of the scripts and visual prompts generated by Viral Engine. You are free to use them for commercial purposes." },
          { q: "Can I cancel my Pro subscription?", a: "Absolutely. You can cancel anytime through your PayPal dashboard or by contacting our support team." },
          { q: "Do you provide video editing?", a: "We provide the orchestration (scripts, prompts, text). You can use these with any AI video generator like Runway or Sora, or manual editors like CapCut." },
          { q: "What makes Viral Engine different?", a: "Unlike basic translation tools, we use 'Transcreation'—adapting your message culturally to ensure it resonates with local audiences." }
        ].map((item, i) => (
          <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <h4 className="text-lg font-bold uppercase mb-2 text-[#F27D26]">{item.q}</h4>
            <p className="text-white/50 text-sm">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const PricingPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">Simple <span className="text-[#F27D26]">Pricing</span></h1>
        <p className="text-white/40 uppercase tracking-[0.3em] text-sm">Choose the plan that fits your growth</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#111] border border-white/10 rounded-[40px] p-10 flex flex-col">
          <h3 className="text-2xl font-bold uppercase mb-2">Free</h3>
          <div className="text-4xl font-black mb-6">$0<span className="text-sm font-normal text-white/40">/mo</span></div>
          <ul className="space-y-4 mb-10 flex-grow text-sm text-white/60">
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-500" /> 3 Scripts per day</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-500" /> Standard Languages</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-500" /> Basic Visual Prompts</li>
          </ul>
          <button onClick={() => setView('engine')} className="w-full py-4 rounded-2xl border border-white/10 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Get Started</button>
        </div>
        <div className="bg-gradient-to-br from-[#F27D26] to-[#ff8c36] rounded-[40px] p-10 flex flex-col transform scale-105 shadow-2xl shadow-[#F27D26]/20">
          <div className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full self-start mb-4">Most Popular</div>
          <h3 className="text-2xl font-bold uppercase mb-2 text-black">Pro</h3>
          <div className="text-4xl font-black mb-6 text-black">$29.99<span className="text-sm font-normal opacity-60">/mo</span></div>
          <ul className="space-y-4 mb-10 flex-grow text-sm text-black/80">
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-black" /> Unlimited Generations</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-black" /> All 50+ Languages & Dialects</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-black" /> 4K Visual Orchestration</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-black" /> Priority AI Processing</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-black" /> Custom Brand Voice Training</li>
          </ul>
          <PayPalButton />
        </div>
        <div className="bg-[#111] border border-white/10 rounded-[40px] p-10 flex flex-col">
          <h3 className="text-2xl font-bold uppercase mb-2">Agency</h3>
          <div className="text-4xl font-black mb-6">$99.99<span className="text-sm font-normal text-white/40">/mo</span></div>
          <ul className="space-y-4 mb-10 flex-grow text-sm text-white/60">
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-500" /> Everything in Pro</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-500" /> 5 Team Members</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-500" /> API Access</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-500" /> Dedicated Account Manager</li>
          </ul>
          <button onClick={() => setView('contact')} className="w-full py-4 rounded-2xl border border-white/10 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Contact Sales</button>
        </div>
      </div>
    </div>
  );

  const CaseStudiesPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">Success <span className="text-[#F27D26]">Stories</span></h1>
        <p className="text-white/40 uppercase tracking-[0.3em] text-sm">Real results from creators using Viral Engine</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[
          { 
            name: "Sarah J.", 
            role: "Tech Reviewer", 
            stat: "1.2M Views", 
            story: "I was struggling to reach an international audience. Viral Engine helped me localize my tech reviews into Spanish and Arabic. My reach exploded by 400% in just two weeks.",
            image: "https://picsum.photos/seed/sarah/800/600"
          },
          { 
            name: "Ahmed K.", 
            role: "Fitness Coach", 
            stat: "500k Followers", 
            story: "The hooks generated by the engine are insane. I used to spend hours scripting, now I do it in seconds and my engagement rate has doubled.",
            image: "https://picsum.photos/seed/ahmed/800/600"
          }
        ].map((study, i) => (
          <div key={i} className="bg-[#111] border border-white/10 rounded-[40px] overflow-hidden group">
            <img src={study.image} alt={study.name} className="w-full h-64 object-cover opacity-60 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            <div className="p-10">
              <div className="text-[#F27D26] text-4xl font-black mb-2">{study.stat}</div>
              <h3 className="text-2xl font-bold uppercase mb-4">{study.name} — {study.role}</h3>
              <p className="text-white/50 leading-relaxed italic">"{study.story}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const HelpCenterPage = () => (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-12">Help <span className="text-[#F27D26]">Center</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
          <BookOpen className="w-8 h-8 text-[#F27D26] mb-4" />
          <h3 className="text-xl font-bold uppercase mb-2">Getting Started</h3>
          <p className="text-white/40 text-sm mb-4">Learn the basics of generating your first viral script.</p>
          <button className="text-[#F27D26] text-xs font-bold uppercase tracking-widest flex items-center gap-2">Read Guide <ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
          <DollarSign className="w-8 h-8 text-[#F27D26] mb-4" />
          <h3 className="text-xl font-bold uppercase mb-2">Billing & Account</h3>
          <p className="text-white/40 text-sm mb-4">Manage your subscription, payments, and account settings.</p>
          <button className="text-[#F27D26] text-xs font-bold uppercase tracking-widest flex items-center gap-2">Read Guide <ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="bg-[#111] p-10 rounded-[40px] border border-white/10 text-center">
        <h3 className="text-2xl font-bold uppercase mb-4">Still need help?</h3>
        <p className="text-white/50 mb-8">Our support team is available 24/7 to assist you with any technical issues.</p>
        <button onClick={() => setView('contact')} className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-[#F27D26] hover:text-white transition-all">Contact Support</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#F27D26] selection:text-white">
      <Nav />
      {view === 'landing' && <LandingPage />}
      {view === 'engine' && <EnginePage />}
      {view === 'blog' && <BlogPage />}
      {view === 'about' && <AboutPage />}
      {view === 'contact' && <ContactPage />}
      {view === 'privacy' && <PrivacyPage />}
      {view === 'terms' && <TermsPage />}
      {view === 'faq' && <FAQPage />}
      {view === 'pricing' && <PricingPage />}
      {view === 'casestudies' && <CaseStudiesPage />}
      {view === 'help' && <HelpCenterPage />}
    </div>
  );
}
