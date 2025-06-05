"use client";
import React, { useState, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gift, DollarSign, Camera, Users, MessageSquare, TrendingUp, Instagram, Play, CheckCircle, Star, X, Volume2, VolumeX } from 'lucide-react';
import Footer from "@/app/Components/Footer";

const stats = [
  { value: "1M+", label: "Monthly Reach" },
  { value: "50K+", label: "Active Creators" },
];

const features = [
  {
    title: "Content Growth",
    description: "Get insights and tools to grow your content reach",
    icon: "📈",
  },
  {
    title: "Brand Matching",
    description: "Get matched with brands that align with your niche",
    icon: "🎯",
  },
  {
    title: "Creator Community",
    description: "Connect and collaborate with other creators",
    icon: "🤝",
  },
];

const successStories = [
  {
    name: "Sarah Chen",
    handle: "@sarahlifestyle",
    achievement: "Made £5K in first month",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    category: "Lifestyle & Fashion"
  },
  {
    name: "Alex Rivera",
    handle: "@alexcooks",
    achievement: "100K followers in 3 months",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    category: "Food & Cooking"
  },
  {
    name: "Mia Zhang",
    handle: "@miabeauty",
    achievement: "Collab with luxury brands",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "Beauty & Wellness"
  }
];

const faqs = [
  {
    question: "How do I get started as a creator?",
    answer: "Getting started is easy! Sign up, complete your profile with your social media accounts and content niche, and start exploring opportunities with brands that match your style.",
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide 24/7 creator support, analytics tools, content strategy guidance, and access to our exclusive creator community for networking and collaboration.",
  },
  {
    question: "How do I monetize my content?",
    answer: "Through our platform, you can monetize through brand collaborations, sponsored content, merchandise sales, and exclusive content for your followers.",
  },
  {
    question: "What makes Grace Belgravia different?",
    answer: "We focus exclusively on creator growth and success. Our AI-powered platform matches you with relevant opportunities, while our creator community provides support and collaboration.",
  },
];

const brands = [
  { name: "Zoom", logo: "https://1000logos.net/wp-content/uploads/2021/06/Zoom-Logo.png" },
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" },
  { name: "Nvidia", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
  { name: "Canon", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Canon_logo_vector.svg" },
  { name: "Avast", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Avast_Antivirus_Logo.png" },
  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png" },
];

const services = [
  {
    title: "Ad Campaigns",
    description: "Launch effective campaigns with our network of trusted influencers",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2564&auto=format&fit=crop",
  },
  {
    title: "Social Media Management",
    description: "Optimize your social presence and engagement across platforms",
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=2570&auto=format&fit=crop",
  },
];

const portfolioItems = [
  {
    title: "Fashion & Lifestyle",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop",
  },
  {
    title: "Tech & Gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2574&auto=format&fit=crop",
  },
  {
    title: "Travel & Adventure",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2574&auto=format&fit=crop",
  },
];

const benefits = [
  {
    icon: "🎁",
    title: "Free Products",
    description: "Get products delivered to review and promote"
  },
  {
    icon: "💸",
    title: "Paid Campaigns",
    description: "Access paid campaigns and affiliate collabs"
  },
  {
    icon: "🧠",
    title: "Brand Briefs",
    description: "Get feedback and detailed brand briefs"
  },
  {
    icon: "🛍️",
    title: "Live Campaigns",
    description: "Access campaigns you can apply to"
  },
  {
    icon: "💬",
    title: "Direct Chat",
    description: "Chat with brands directly (no middlemen)"
  },
  {
    icon: "📈",
    title: "Portfolio Building",
    description: "Build your portfolio and content resume"
  },
  {
    icon: "📥",
    title: "Easy Submission",
    description: "Submit content straight from dashboard"
  },
  {
    icon: "📲",
    title: "Multi-Platform",
    description: "Work across Instagram, TikTok, Facebook"
  }
];

const steps = [
  {
    number: "1️⃣",
    title: "Create Your Account",
    description: "Join as an influencer or UGC creator. No agency needed. Just your socials and your sparkle."
  },
  {
    number: "2️⃣",
    title: "Complete Your Profile",
    description: "Add your platforms, content types, and niche. Connect your Instagram or TikTok. This is your creator card — let it shine."
  },
  {
    number: "3️⃣",
    title: "Apply to Campaigns",
    description: "Browse a feed of live campaigns. See who's gifting, paying, or partnering. Click apply. That's it."
  },
  {
    number: "4️⃣",
    title: "Get Invited to Exclusive Collabs",
    description: "Once you're active, brands can invite you to join private campaigns. Like being picked first in PE, but better."
  },
  {
    number: "5️⃣",
    title: "Submit Your Content",
    description: "Upload content directly, link your live posts, and let the magic begin. Everything's tracked and stored."
  },
  {
    number: "6️⃣",
    title: "Get Paid. Get Gifted. Get Seen.",
    description: "Track your performance. Download your UGC. Grow your reputation as a content creator."
  }
];

const problems = [
  "How do I get influencer jobs without 100K followers?",
  "Where are the brands that actually pay or gift stuff?",
  "I've DMed 10 brands and got ignored.",
  "My content deserves more. Where do I start?"
];

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahlifestyle",
    achievement: "Made £5K in first month",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    category: "Lifestyle & Fashion",
    rating: "4.9",
    date: "March 2024",
    review: "I was skeptical at first, but Grace Belgravia changed everything. Made £5K in my first month through brand collaborations, and the platform made it so easy to manage everything. The automated contracts and direct brand communication are game-changers!"
  },
  {
    name: "Alex Rivera",
    handle: "@alexcooks",
    achievement: "100K followers in 3 months",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    category: "Food & Cooking",
    rating: "5.0",
    date: "February 2024",
    review: "The platform's analytics helped me understand what content works best. Grew my following to 100K in just 3 months while working with amazing brands. The campaign matching is spot-on - every collaboration feels authentic to my niche."
  },
  {
    name: "Mia Zhang",
    handle: "@miabeauty",
    achievement: "Collab with luxury brands",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "Beauty & Wellness",
    rating: "4.8",
    date: "January 2024",
    review: "As a beauty creator, authenticity is everything. Grace Belgravia connects me with brands that truly align with my values. The UGC campaigns are well-paid, and the platform handles all the paperwork. It's a dream come true for creators!"
  }
];

const creatorVideos = [
  {
    title: "Fashion & Style Tips",
    creator: "@fashionista_sarah",
    views: "1.2M views",
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2570&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-the-city-1235-large.mp4"
  },
  {
    title: "Healthy Living Guide",
    creator: "@wellness_with_mia",
    views: "850K views",
    thumbnail: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-at-sunset-1235-large.mp4"
  },
  {
    title: "Tech Review Series",
    creator: "@tech_alex",
    views: "2.1M views",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4"
  },
  {
    title: "Travel Adventures",
    creator: "@wanderlust_emma",
    views: "1.5M views",
    thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2608&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-traveling-through-a-mountain-road-4220-large.mp4"
  }
];

const VideoCard = ({ video, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          await videoRef.current.pause();
        } else {
          await videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (err) {
        setError("Failed to play video. Please try again.");
        console.error("Video playback error:", err);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setError("Failed to load video");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative aspect-[9/16] rounded-[30px] overflow-hidden shadow-lg bg-gray-900">
        {/* Video Element */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          playsInline
          muted={isMuted}
          poster={video.thumbnail}
          onClick={togglePlay}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
          preload="metadata"
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-center p-4">
              <p>{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="mt-2 px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Play/Pause Overlay - Only visible when not playing */}
        {!isPlaying && !isLoading && !error && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-[#1A1A1A] ml-1" />
              </div>
            </div>
          </div>
        )}

        {/* Controls - Always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white font-medium mb-2">{video.title}</h3>
          <div className="flex items-center justify-between text-white/80 text-sm">
            <span>{video.creator}</span>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
              <span>{video.views}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InfluencerLandingPage = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-white to-[#F0FFFF]">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm text-gray font-light">Join 10K+ Growing Creators</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#1A1A1A] leading-[1.1] mb-6">
                Your All-in-One
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block mt-2">
                  UGC Creator
                </span>
                <span className="block mt-2">Platform</span>
              </h1>

              <p className="text-xl text-gray mb-8 font-light max-w-xl">
                Tired of cold-pitching brands? Done with gifting collabs that go nowhere? Welcome to Grace Belgravia — the UGC creator platform built to connect you with campaigns, content opportunities and brand deals that actually pay.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/auth/register/influencer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-light hover:opacity-90 transition-all"
                >
                  Join as Creator
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/auth/login/influencer"
                  className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-light hover:bg-slate-50 transition-all border border-primary/10"
                >
                  Apply to Campaigns
                  <Play className="w-5 h-5" />
                </Link>
              </div>

              {/* Creator Types */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <div className="bg-white shadow-sm p-4 rounded-2xl text-center">
                  <p className="font-medium text-[#1A1A1A]">UGC Creators</p>
                  <p className="text-sm text-gray">No following needed!</p>
                </div>
                <div className="bg-white shadow-sm p-4 rounded-2xl text-center">
                  <p className="font-medium text-[#1A1A1A]">Nano & Micro</p>
                  <p className="text-sm text-gray">Influencers</p>
                </div>
                <div className="bg-white shadow-sm p-4 rounded-2xl text-center">
                  <p className="font-medium text-[#1A1A1A]">Content Creators</p>
                  <p className="text-sm text-gray">All platforms</p>
                </div>
                <div className="bg-white shadow-sm p-4 rounded-2xl text-center">
                  <p className="font-medium text-[#1A1A1A]">Lifestyle & More</p>
                  <p className="text-sm text-gray">All niches</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Problems Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative h-[600px] hidden lg:block"
            >
              {/* Main Image */}
              <div className="absolute top-0 right-0 w-[80%] h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1574279606130-09958dc756f7?q=80&w=2670&auto=format&fit=crop"
                  alt="Fashion Influencer in Action"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating Success Card */}
              <div className="absolute bottom-20 left-0 w-[300px] bg-white rounded-[30px] p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                      alt="Creator"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[#1A1A1A] font-medium">Ana M.</h4>
                    <p className="text-sm text-gray">UGC Creator</p>
                  </div>
                </div>
                <p className="text-gray font-light text-sm">
                  "I got 3 collabs in my first week. One gifted, two paid. Easy application, zero chasing."
                </p>
              </div>

              {/* Floating Campaign Card */}
              <div className="absolute top-20 left-10 bg-white rounded-[20px] p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1A1A1A]">New Campaign</div>
                    <div className="text-xs text-gray">£2,000 Budget</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creator Videos Section */}
      <section className="py-24 bg-gradient-to-br from-white via-[#F0FFFF] to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 39px, rgba(54,128,161,0.05) 39px, rgba(54,128,161,0.05) 41px, transparent 41px),
            linear-gradient(180deg, transparent 39px, rgba(54,128,161,0.05) 39px, rgba(54,128,161,0.05) 41px, transparent 41px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.5
        }} />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-30 mix-blend-multiply" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl opacity-30 mix-blend-multiply" />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
              Featured Creator Content 🎥
            </h2>
            <p className="text-xl text-gray font-light">
              Get inspired by our top creators and their amazing content.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {creatorVideos.map((video, index) => (
              <VideoCard key={index} video={video} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Notebook Pattern Background */}
        <div className="absolute inset-0 bg-[#F8F9FA]" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 39px, #E8E8E8 39px, #E8E8E8 41px, transparent 41px),
            linear-gradient(180deg, transparent 39px, #E8E8E8 39px, #E8E8E8 41px, transparent 41px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4
        }} />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
              What's In It for You 💡
            </h2>
            <p className="text-xl text-gray font-light">
              Everything you need to succeed as a creator, all in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-[30px] shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl text-[#1A1A1A] font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray font-light">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-white via-white to-[#F0FFFF] relative overflow-hidden">
        {/* Notebook Pattern Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 39px, rgba(216,180,254,0.1) 39px, rgba(216,180,254,0.1) 41px, transparent 41px),
            linear-gradient(180deg, transparent 39px, rgba(216,180,254,0.1) 39px, rgba(216,180,254,0.1) 41px, transparent 41px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.5
        }} />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
              How It Works 🔧
            </h2>
            <p className="text-xl text-gray font-light">
              Your journey from creator to paid influencer starts here.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 bg-white/90 backdrop-blur-sm rounded-[30px] shadow-sm hover:shadow-lg transition-all"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xl font-light">
                  {step.number}
                </div>
                <h3 className="text-xl text-[#1A1A1A] font-medium mb-4 mt-4">{step.title}</h3>
                <p className="text-gray font-light">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-12 md:py-24 overflow-hidden bg-gradient-to-b from-gray/5 via-white to-primary/5">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Gradient Orbs - Responsive sizes */}
        <div className="absolute top-1/4 right-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
        <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-secondary/5 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl opacity-30 mix-blend-multiply" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          {/* Header */}
          <div className="mb-2 relative text-center md:text-left">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                What Creators Say About Us
              </h2>
            </div>
          </div>

          {/* Timeline Reviews */}
          <div className="max-w-4xl mx-auto relative">
            <div className="relative flex flex-col md:flex-row min-h-[200px] md:min-h-[250px]">
              {/* Profile Images Column */}
              <div className="relative md:w-[200px] flex-shrink-0 h-[60px] md:h-auto mb-2 md:mb-0">
                <div className="flex md:block justify-center">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`${
                        index === 0 ? "z-10" : "z-0"
                      } transition-all duration-700 ease-in-out
                      ${getMobilePosition(index, 0)}
                      ${getDesktopPosition(index, 0, testimonials.length)}`}
                    >
                      <div className={`relative transition-all duration-700 cursor-pointer ${
                        index === 0 ? "scale-110" : "scale-90 opacity-50 hover:opacity-75 hover:scale-95"
                      }`}>
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden relative">
                          <Image
                            src={testimonial.img}
                            alt={testimonial.name}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Reviews Column */}
              <div className="flex-grow md:pl-8 relative py-8 md:py-0">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={`${
                      index === 0
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8 pointer-events-none"
                    } md:absolute md:top-1/2 md:-translate-y-1/2 w-full transition-all duration-700`}
                  >
                    {index === 0 && (
                      <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-xs text-gray-500">
                              {testimonial.rating} • {testimonial.category}
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="relative z-10 bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-[0_0_1px_rgba(0,0,0,0.05)]">
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {testimonial.review}
                            </p>
                            <div className="mt-2 text-sm text-gray-500">
                              {testimonial.handle} • {testimonial.achievement}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === 0 
                      ? "bg-primary w-4" 
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-white via-white to-[#F0FFFF]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
              Time to Monetise Your Influence 🎯
            </h2>
            <p className="text-xl text-gray font-light mb-8">
              Stop waiting for brand DMs. Start working with real companies that need your content now.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/auth/register/influencer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-light hover:opacity-90 transition-all"
              >
                Join as Creator
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Custom Grid Pattern */}
      <style jsx>{`
        .bg-grid-primary\/5 {
          background-size: 20px 20px;
          @media (min-width: 768px) {
            background-size: 30px 30px;
          }
          background-image: linear-gradient(to right, rgba(54,128,161,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(54,128,161,0.05) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

export default InfluencerLandingPage;

// Add these helper functions at the bottom of the file
const getMobilePosition = (index, activeIndex) => {
  return `md:hidden absolute left-1/2 transform -translate-x-1/2 
    ${index === activeIndex ? "opacity-100" : "opacity-50"}`;
};

const getDesktopPosition = (index, activeIndex, total) => {
  const positions = {
    top: "md:top-[25%]",
    middle: "md:top-[50%]",
    bottom: "md:top-[75%]"
  };

  let position = (index - activeIndex + total) % total;
  
  if (position === 0) return `hidden ${positions.middle} md:block md:absolute`;
  if (position === 1 || position === -3) return `hidden ${positions.bottom} md:block md:absolute`;
  return `hidden ${positions.top} md:block md:absolute`;
};
