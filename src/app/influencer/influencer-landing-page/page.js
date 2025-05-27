"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

export default function InfluencerLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">B</span>
            </div>
            <span className="text-xl font-semibold">Grace Belgravia</span>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="#how" className="text-gray hover:text-primary transition-colors">
              How it works
            </Link>
            <Link href="#features" className="text-gray hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#faq" className="text-gray hover:text-primary transition-colors">
              FAQ
            </Link>
            <button className="px-6 py-2 bg-[#18181B] text-white rounded-full flex items-center space-x-2 hover:bg-[#27272A] transition-colors">
              Join as Creator
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-lg text-gray">Create, Grow, Succeed</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h1 className="text-6xl font-bold leading-tight">
                Elevate Your
                <br />
                Creator
                <br />
                Journey
              </h1>
              <p className="text-xl text-gray max-w-md">
                Join our community of creators and turn your passion into a thriving career. Get the tools, insights, and support you need to grow.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="/auth/login/influencer" className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                  Start Creating
                </Link>
                <button className="px-8 py-3 text-primary hover:bg-primary/5 rounded-full transition-colors">
                  See How It Works
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative h-full rounded-3xl overflow-hidden bg-primary/5">
                      <Image
                        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop"
                        alt="Creator 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-12">
                    <div className="relative h-full rounded-3xl overflow-hidden bg-secondary/5">
                      <Image
                        src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2574&auto=format&fit=crop"
                        alt="Creator 2"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-16 bg-[#FEF3C7] rounded-full flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                </div>
                <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-[#DBEAFE] rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎥</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 py-12 px-8 bg-white rounded-3xl shadow-xl">
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-gray">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Grow</h2>
            <p className="text-gray text-lg max-w-2xl mx-auto">
              Tools and features designed specifically for content creators like you.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray text-lg">
              Everything you need to know about becoming a successful creator
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-3xl p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your Creator Journey?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Join our community of creators and start growing your influence today.
              </p>
              <button className="px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-colors">
                Join as Creator
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
