'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, Play, BarChart3, Shield, Image as ImageIcon, MessageSquare } from 'lucide-react';
import Footer from '@/app/Components/Footer';

const BrandLandingPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const problems = [
    "We spent £1,000 and got one blurry story post.",
    "This campaign had zero measurable return.",
    "We're chasing DMs like it's our full-time job.",
    "Where's the contract? The post? The actual results?"
  ];

  const solutions = [
    "No more manual outreach — influencers apply to you",
    "No vague results — you'll see clicks, reach, saves and ROI",
    "No missing content — everything's logged, time-stamped, and downloadable",
    "No legal grey areas — we auto-generate contracts with usage rights"
  ];

  const steps = [
    {
      number: "1",
      title: "Create Your Brand Account",
      description: "Quick, easy, GDPR-compliant. No credit card faff until you're ready."
    },
    {
      number: "2",
      title: "Build a Campaign Brief",
      description: "Tell creators what you want: format, vibe, deliverables, payment (or gifts). Set deadlines. Done."
    },
    {
      number: "3",
      title: "Discover & Filter Influencers",
      description: "Browse by niche, social platform, audience demographics, and more. Filter by country, language, style, and brand tone."
    },
    {
      number: "4",
      title: "Invite, Approve, Chat",
      description: "Add influencers to your campaign bucket. Invite them. Message them. Keep everything tidy."
    },
    {
      number: "5",
      title: "Auto Contracts + Submission Tracking",
      description: "Influencers accept → contracts trigger → work begins → you stay compliant. Track what's posted, submitted, and what's still pending."
    },
    {
      number: "6",
      title: "Access UGC Vault + Analytics",
      description: "All submitted content goes into your UGC library. Use it in paid ads, email campaigns, landing pages, social media… anywhere."
    }
  ];

  const benefits = [
    {
      icon: <ImageIcon className="w-6 h-6" />,
      title: "User-Generated Content (UGC)",
      description: "Authentic, high-performing creator content — made for TikTok, Instagram, Facebook and beyond."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance-Driven Campaigns",
      description: "Built-in analytics let you track conversions, influencer ROI, and campaign ROE (return on effort)."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Influencer Marketing Strategy",
      description: "Run multiple campaigns. Target niche audiences. A/B test content types. You're in control — no middlemen, no fluff."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "More for Less",
      description: "We keep costs low. You scale campaigns, not overhead. Launch with gifted collabs, paid posts, or affiliate incentives."
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-white to-[#F0FFFF]">
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
                <span className="text-sm text-gray font-light">1.8M+ Active Users</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#1A1A1A] leading-[1.1] mb-6">
                The Influencer Marketing
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block mt-2">
                  That Delivers Results
                </span>
              </h1>

              <p className="text-xl text-gray mb-8 font-light max-w-xl">
                Get UGC, reach real creators, track results & own your content.
                No faff, just fast, effective marketing.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/brand/signup"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-light hover:opacity-90 transition-all"
                >
                  Start Your First Campaign
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/brand/demo"
                  className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-light hover:bg-slate-50 transition-all border border-primary/10"
                >
                  Book a Demo
                  <Play className="w-5 h-5" />
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-3xl font-light text-[#1A1A1A] mb-1">85%</div>
                  <div className="text-sm text-gray font-light">Campaign Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-[#1A1A1A] mb-1">20K+</div>
                  <div className="text-sm text-gray font-light">Brand Campaigns</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-[#1A1A1A] mb-1">50M+</div>
                  <div className="text-sm text-gray font-light">Creator Earnings</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Image Grid */}
            <motion.div
              className="relative h-[600px] hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Main Image */}
              <div className="absolute top-0 right-0 w-[80%] h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2787&auto=format&fit=crop"
                  alt="Campaign Management"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <div className="absolute bottom-20 left-0 w-[300px] bg-white rounded-[30px] p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop"
                      alt="Brand Manager"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[#1A1A1A] font-medium">Sarah Wilson</h4>
                    <p className="text-sm text-gray">Brand Manager</p>
                  </div>
                </div>
                <p className="text-gray font-light text-sm">
                  "The ROI from our influencer campaigns has been incredible. Best platform we've used."
                </p>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute top-20 left-10 bg-white rounded-[20px] p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1A1A1A]">Campaign Stats</div>
                    <div className="text-xs text-gray">+127% This Month</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section with Visual */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
              First, Let's Talk About the Problem
            </h2>
            <p className="text-xl text-gray font-light">
              You're busy building your business. Influencer marketing should help — not leave you crying into a spreadsheet.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
            <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
                alt="Frustrated Marketing Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="grid gap-8">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-[30px] relative group hover:shadow-lg border border-primary/5 hover:border-primary/10 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-xl text-[#1A1A1A] font-light">"{problem}"</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section with Interactive Elements */}
      <section className="py-24 bg-gradient-to-br from-white via-white to-[#F0FFFF] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
              What Grace Belgravia Solves
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="grid gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white rounded-[30px] border border-primary/5 hover:border-primary/10 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <XCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="text-xl text-[#1A1A1A] font-light">{solution}</div>
                </motion.div>
              ))}
            </div>
            <div className="relative">
              <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                  alt="Campaign Management Dashboard"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-2xl overflow-hidden shadow-lg transform rotate-12">
                <Image
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
                  alt="Analytics"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section with Visual Flow */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray font-light">
              The Brand Journey
            </p>
          </motion.div>

          <div className="relative">
            {/* Visual Process Flow */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 to-secondary/20 transform -translate-y-1/2 hidden lg:block" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative p-8 bg-white rounded-[30px] border border-primary/5 hover:border-primary/10 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xl font-light">
                    {step.number}
                  </div>
                  <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                    <Image
                      src={
                        index === 0 ? "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d" :
                        index === 1 ? "https://images.unsplash.com/photo-1512314889357-e157c22f938d" :
                        index === 2 ? "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" :
                        index === 3 ? "https://images.unsplash.com/photo-1600880292203-757bb62b4baf" :
                        index === 4 ? "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4" :
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                      }
                      alt={step.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl text-[#1A1A1A] font-medium mb-4">{step.title}</h3>
                  <p className="text-gray font-light">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Visual Cards */}
      <section className="py-24 bg-gradient-to-br from-white via-white to-[#F0FFFF] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
              The Real Benefits for Brands
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group p-8 bg-white rounded-[30px] border border-primary/5 hover:border-primary/10 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
                  <Image
                    src={
                      index === 0 ? "https://images.unsplash.com/photo-1559136555-9303baea8ebd" :
                      index === 1 ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f" :
                      index === 2 ? "https://images.unsplash.com/photo-1552664730-d307ca884978" :
                      "https://images.unsplash.com/photo-1553729459-efe14ef6055d"
                    }
                    alt={benefit.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                  {React.cloneElement(benefit.icon, { className: 'w-6 h-6 text-[#1A1A1A]' })}
                </div>
                <h3 className="text-xl text-[#1A1A1A] font-medium mb-4">{benefit.title}</h3>
                <p className="text-gray font-light">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978"
            alt="Campaign Success"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
        </div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-8">
              Ready to Build Your Campaign?
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/brand/signup"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-light hover:opacity-90 transition-all"
              >
                Start Your First Campaign
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/brand/features"
                className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-light hover:bg-slate-50 transition-all border border-primary/10"
              >
                See Platform Features
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
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgba(54,128,161,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(54,128,161,0.05) 1px, transparent 1px);
          mask-image: radial-gradient(circle at center, black, transparent 80%);
        }
      `}</style>
    </div>
  );
};

export default BrandLandingPage;