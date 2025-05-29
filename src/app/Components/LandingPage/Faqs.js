import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FaqItem = ({ title, content, isOpen, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="group relative"
  >
    <div className={`
      relative z-10 bg-white/60 backdrop-blur-xl rounded-[30px] overflow-hidden transition-all duration-300
      ${isOpen ? 'shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50' : 'hover:bg-white/70'}
    `}>
      <button
        onClick={onClick}
        className="w-full px-8 py-6 flex items-center justify-between gap-4 transition-colors"
      >
        <h3 className="text-left font-light text-xl text-slate-700 group-hover:text-slate-900">{title}</h3>
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
          transition-all duration-300
          ${isOpen 
            ? 'bg-gradient-to-r from-rose-100 to-sky-100 shadow-sm' 
            : 'bg-slate-50 group-hover:bg-slate-100'}
        `}>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-6">
              <div className="prose max-w-none">
                {content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 text-lg font-light mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
    {/* Decorative gradient orb */}
    <div className={`
      absolute -z-10 w-[200px] h-[200px] rounded-full blur-3xl transition-opacity duration-500
      bg-gradient-to-r from-rose-100/30 via-sky-100/30 to-violet-100/30
      ${isOpen ? 'opacity-100' : 'opacity-0'}
    `} 
    style={{
      top: '50%',
      transform: 'translateY(-50%)',
      left: isOpen ? '-100px' : '-50px'
    }}
    />
  </motion.div>
);

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      title: "How do I become an influencer?",
      content: "Start with passion, sprinkle consistency, and top it off with charm.\nPick a niche you love (beauty, fitness, gaming, marmalade reviews — whatever).\nPost regularly, engage with your followers, and join platforms (like ours 👋) to find brand collabs.\nYou don't need a million followers. Just a clear voice and a bit of sparkle."
    },
    {
      title: "What is influencer marketing, really?",
      content: "It's when brands partner with social media influencers (yes, that could be you) to promote their products, services or moustache wax.\nThink of it as word-of-mouth 2.0 — with better lighting."
    },
    {
      title: "What's a social media influencer?",
      content: "It's someone who's built trust with an audience online — and now has the power to make people laugh, think... or click \"add to cart.\"\nWhether you've got 1,000 followers or 1 million, if people care about what you say, you're influencing."
    },
    {
      title: "How do I become a TikTok influencer?",
      content: "Post. Dance. Educate. Share. But above all: be real.\nFind your vibe, show up often, and respond to comments. The TikTok algorithm loves consistency (and a cheeky trend or two).\nOnce you're vibing, join Grace Belgravia and get discovered by brands who want in."
    },
    {
      title: "What's a macro-influencer?",
      content: "Basically, you've made it.\nMacro-influencers typically have 100,000–1M+ followers and often work with major brands.\nBut don't stress if you're not there (yet). Micro and nano-influencers are just as powerful — especially for niche campaigns."
    },
    {
      title: "What is influencer re-targeting?",
      content: "It's when the content you helped promote follows people around the internet like a very stylish ghost.\nBrands use your content in paid ads to re-target viewers — meaning more exposure for both of you. Win-win."
    },
    {
      title: "How do I analyse influencer metrics like a pro?",
      content: "Look at engagement rate (likes/comments vs. followers), reach, saves, and click-throughs.\nIf your audience actually cares about your posts, you're golden.\nHint: On Grace Belgravia, brands see all your juicy stats without you needing a spreadsheet."
    },
    {
      title: "How do I track influencer conversions?",
      content: "Easy! We use custom links, discount codes, and trackable UTM tags.\nThat way, when someone buys a pair of socks because of your review — we all know.\nYes, even Gary from accounting."
    },
    {
      title: "What are influencer tiers (and which one am I)?",
      content: "Nano: 1K–10K followers (small but mighty)\nMicro: 10K–100K (the golden middle)\nMacro: 100K–1M (hello, PR packages)\nMega/Celebrity: 1M+ (VIP status)\nAll tiers are welcome at Grace Belgravia. Quality over quantity, always."
    },
    {
      title: "How do I audit my influencer profile?",
      content: "Step back, put on your detective hat.\nCheck your:\nBio (is it clear and clickable?)\nAesthetic (consistent or chaotic?)\nEngagement (do people respond?)\nStory highlights (branding goldmine)\nAlso: make sure your audience matches your niche. A yoga page with 90% tractor fans might raise eyebrows."
    },
    {
      title: "What are the benefits of influencer marketing for me?",
      content: "Free products\nPaid brand deals\nCreative freedom\nUGC to boost your own profile\nNetworking with brands you love\nThe occasional DM from someone who says, \"I bought it because of you\" 💅"
    },
    {
      title: "What is UGC in influencer marketing?",
      content: "UGC = User-Generated Content.\nYou create a post, story or video for a brand — they get to reuse it across ads, email, websites and socials.\nIt's content that feels real (because it is) and converts like a dream."
    },
    {
      title: "What is a micro-influencer, and is it better than macro?",
      content: "Micro-influencers (10K–100K followers) tend to have highly engaged audiences.\nThink: a loyal crew who trust your word more than a celebrity's #spon.\nBrands love micros because of that authentic connection. So yes — sometimes smaller is stronger."
    },
    {
      title: "What's influencer engagement rate, and why does it matter?",
      content: "It's the ratio of people who interact with your content versus your total followers.\nFormula: (Likes + Comments) ÷ Followers x 100\nA high engagement rate = you've got influence, not just followers.\nAnd brands? They live for this metric."
    },
    {
      title: "How do I manage influencer campaigns without losing my mind?",
      content: "Simple. Use Grace Belgravia.\nEverything lives in one place: briefs, deadlines, content submissions, chats and contracts.\nNo missed messages. No messy inboxes. Just one platform. Smooth sailing."
    }
  ];

  return (
    <div className="relative py-32 overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(83,115,212,0.1),rgba(54,128,161,0.05)_50%,rgba(255,255,255,0)_80%)]" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <div className="absolute top-20 left-[10%] w-4 h-4 rounded-full bg-rose-100/40" 
             style={{ animation: 'float 6s ease-in-out infinite' }} />
        <div className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-sky-100/40" 
             style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-20 left-[20%] w-8 h-8 rounded-full bg-violet-100/40" 
             style={{ animation: 'float 7s ease-in-out infinite' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate/5" />
        
        {/* Gradient Mesh */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-rose-50/40 via-sky-50/40 to-violet-50/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-violet-50/40 via-sky-50/40 to-rose-50/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-white text-lg font-light mb-4">Got Questions?</span>
          <h2 className="text-5xl font-light text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-white text-xl font-light max-w-2xl mx-auto">
            Everything you need to know about becoming a successful creator on Grace Belgravia
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              index={index}
              title={faq.title}
              content={faq.content}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .bg-grid-slate\/5 {
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgba(148,163,184,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(148,163,184,0.05) 1px, transparent 1px);
          mask-image: radial-gradient(circle at center, black, transparent 80%);
        }
      `}</style>
    </div>
  );
}
