import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Loader2, Sparkles, Video, Hash, Music, Type as TypeIcon, Languages, Play, Clapperboard } from 'lucide-react';

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

export default function App() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<ScriptOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

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
              hook: { type: Type.STRING, description: "The first 3 seconds hook" },
              script_body: { type: Type.STRING },
              visual_scenes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    scene_id: { type: Type.INTEGER },
                    description: { type: Type.STRING, description: "Visual prompt for AI image/video generator" },
                    on_screen_text: { type: Type.STRING }
                  },
                  required: ["scene_id", "description", "on_screen_text"]
                }
              },
              audio_vibe: { type: Type.STRING },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["language", "hook", "script_body", "visual_scenes", "audio_vibe", "tags"]
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text) as ScriptOutput;
        setOutput(parsed);
      } else {
        throw new Error("No response generated.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate script. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F27D26] selection:text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F27D26] flex items-center justify-center transform -rotate-6">
          <Clapperboard className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase">Viral Engine</h1>
          <p className="text-xs text-white/50 uppercase tracking-widest font-mono">Auto-Short Generator</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
                Content Idea
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 3 psychological tricks to make anyone like you..."
                className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26] transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
                Target Language
              </label>
              <div className="relative">
                <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g., English, Arabic (Egyptian), Spanish"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26] transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full bg-[#F27D26] hover:bg-[#ff8c36] text-black font-bold uppercase tracking-wider text-sm py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Script
                </>
              )}
            </button>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Output */}
        <div className="lg:col-span-8">
          {output ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Hook & Audio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Play className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-[#F27D26] mb-3">
                      <TypeIcon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">The Hook (First 3s)</span>
                    </div>
                    <p className="text-xl font-medium leading-relaxed">"{output.hook}"</p>
                  </div>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-[#F27D26] mb-3">
                    <Music className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Audio Vibe</span>
                  </div>
                  <p className="text-white/80">{output.audio_vibe}</p>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {output.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        {tag.replace('#', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Script Body */}
              <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-[#F27D26] mb-4">
                  <TypeIcon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Full Script</span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-white/90 whitespace-pre-wrap">{output.script_body}</p>
                </div>
              </div>

              {/* Visual Scenes */}
              <div>
                <div className="flex items-center gap-2 text-white/50 mb-4 px-2">
                  <Video className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Visual Orchestration</span>
                </div>
                <div className="space-y-4">
                  {output.visual_scenes.map((scene) => (
                    <div key={scene.scene_id} className="bg-[#111] border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 font-mono text-lg font-bold text-[#F27D26]">
                        {scene.scene_id}
                      </div>
                      <div className="flex-grow space-y-3">
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-widest text-white/40 block mb-1">Visual Prompt</span>
                          <p className="text-white/90">{scene.description}</p>
                        </div>
                        {scene.on_screen_text && (
                          <div className="bg-black/50 rounded-lg p-3 border border-white/5">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40 block mb-1">On-Screen Text</span>
                            <p className="font-mono text-sm text-[#F27D26]">"{scene.on_screen_text}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border border-white/5 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-lg font-medium text-white/70 mb-2">Ready to go viral?</h3>
              <p className="text-sm text-white/40 max-w-sm">
                Enter your topic and target language on the left to generate a complete short video script with visual prompts.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
