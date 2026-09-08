import React, { useState } from 'react';
import { ArrowRight, BookOpen, Calendar, Clock, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { PageRoute } from '../types';

interface BlogPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const activePost = BLOG_POSTS.find((p) => p.slug === selectedSlug);

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
            The MemoFigura Journal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
            Memories, Heirlooms & Meaningful Gifting
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            Thoughts on memory preservation, photography advice for 3D likeness, and thoughtful gift guides for milestones.
          </p>
        </div>

        {/* Article Reader View */}
        {activePost ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D9] shadow-sm space-y-6">
            <button
              onClick={() => setSelectedSlug(null)}
              className="text-xs font-semibold text-[#8B4513] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              ← Back to all articles
            </button>

            <span className="text-xs font-bold text-[#8B4513] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E8E2D9] inline-block">
              {activePost.category}
            </span>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1917] leading-tight">
              {activePost.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-[#78716C] pb-6 border-b border-[#F3EFEA]">
              <span>{activePost.date}</span>
              <span>•</span>
              <span>{activePost.readTime}</span>
            </div>

            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#57534E] leading-relaxed pt-4">
              <p className="font-serif text-lg text-[#1C1917] italic">
                {activePost.excerpt}
              </p>
              <p>
                When searching for a gift to commemorate life's most meaningful crossroads — a 50th wedding anniversary, the graduation of a first child, or the remembrance of a faithful dog — ordinary commercial gifts consistently fall short.
              </p>
              <p>
                A physical 3D sculpture captures weight, posture, and spatial presence in a way that two-dimensional flat screens can never match. Touching the curve of a familiar face or feeling the reassuring weight of a companion's silhouette grounds memory in the present moment.
              </p>
              <p>
                By working from your favorite photograph, our artisans translate momentary light into permanent sculpture — mounted on solid American walnut and built to be passed down through generations.
              </p>
            </div>

            {/* In-article CTA */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8E2D9] text-center space-y-3 mt-8">
              <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                Ready to Preserve Your Memory?
              </h3>
              <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                Upload your photo today. Inspect your digital 3D proof renders before we start physical production.
              </p>
              <button
                onClick={() => onNavigate('/custom-3d-figurine')}
                className="px-6 py-3 bg-[#1C1917] hover:bg-[#292524] text-white rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
              >
                <span>Create Your Figurine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Grid View of Articles */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.slug}
                onClick={() => setSelectedSlug(post.slug)}
                className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-16/9 overflow-hidden bg-stone-100 relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-black/65 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-3 text-[11px] text-[#78716C]">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] group-hover:text-[#8B4513] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-semibold text-[#8B4513]">
                  <span>Read full guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
