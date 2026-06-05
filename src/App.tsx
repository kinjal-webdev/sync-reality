import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Menu, X, MapPin, Phone, Clock, Mail, 
  Home, Building, Rocket, ShieldCheck, 
  Award, HeartHandshake, CheckCircle, 
  Search, Key, TrendingUp, HandCoins,
  MessageSquare
} from "lucide-react";
import { SiInstagram, SiFacebook, SiWhatsapp } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import logoPath from "./assets/logo.png";
import heroImg from "./assets/hero.png";
import residentialImg from "./assets/residential.png";
import commercialImg from "./assets/commercial.png";
import prelaunchImg from "./assets/prelaunch.png";

// Validation schema for contact form
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  requirement: z.string().min(1, "Please select a requirement"),
  message: z.string().min(10, "Please provide more details"),
});

// Validation schema for enquiry modal
const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  budget: z.string().min(1, "Please select a budget"),
  propertyType: z.string().min(1, "Property type is required"),
  message: z.string().optional(),
});

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryProperty, setEnquiryProperty] = useState("");

  // SEO & Scroll handling
  useEffect(() => {
    document.title = "Sync Realty | Real Estate Consultant in Mumbai";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Connecting To Your Dream Space. Buy, sell, lease and invest in residential, commercial, and pre-launch properties in Mumbai.');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      requirement: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const text = `Hi, I'm interested in a property.\nName: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\nRequirement: ${values.requirement}\nMessage: ${values.message}`;
    window.open(`https://wa.me/919930397877?text=${encodeURIComponent(text)}`, '_blank');
  };

  const enquiryForm = useForm<z.infer<typeof enquirySchema>>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      budget: "",
      propertyType: "",
      message: "",
    },
  });

  const openEnquiry = (propertyType: string) => {
    enquiryForm.reset();
    enquiryForm.setValue("propertyType", propertyType);
    setEnquiryProperty(propertyType);
    setEnquiryOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeEnquiry = () => {
    setEnquiryOpen(false);
    document.body.style.overflow = "";
  };

  const onEnquirySubmit = (values: z.infer<typeof enquirySchema>) => {
    const text = `Hi, I'd like to enquire about a property.\n\nName: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\nProperty Type: ${values.propertyType}\nBudget: ${values.budget}${values.message ? `\nMessage: ${values.message}` : ""}`;
    window.open(`https://wa.me/919930397877?text=${encodeURIComponent(text)}`, '_blank');
    closeEnquiry();
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Properties", id: "properties" },
    { name: "Reviews", id: "reviews" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-primary">
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => scrollTo("home")}
          >
            <img src={logoPath} alt="Sync Realty" className="h-20 md:h-32 w-auto object-contain drop-shadow-lg" style={{imageRendering: 'crisp-edges'}} />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isScrolled ? "text-primary" : "text-white"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <Button
              onClick={() => scrollTo("contact")}
              className={`font-semibold rounded-full px-6 py-2 transition-all ${
                isScrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-white/90"
              }`}
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 ${isScrolled ? "text-primary" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-border shadow-lg py-4 px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left py-2 text-primary font-medium border-b border-border/50"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("contact")}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-full"
            >
              Contact Us
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[100dvh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Luxury Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Find Your Dream Property With Sync Realty
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 mb-10 max-w-2xl mx-auto">
              Residential, Commercial and Pre-Launch Property Solutions in Mumbai.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo("properties")}
                className="bg-accent text-primary hover:bg-accent/90 w-full sm:w-auto font-bold rounded-full px-8 py-6 text-lg transition-transform hover:scale-105"
              >
                Explore Properties
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="text-white border-white hover:bg-white hover:text-primary w-full sm:w-auto font-bold rounded-full px-8 py-6 text-lg transition-transform hover:scale-105"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/20">
            <div className="flex flex-col items-center">
              <div className="flex text-accent mb-1 text-xl">★★★★★</div>
              <span className="text-sm md:text-base font-semibold">5.0 Google Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-accent mb-1">62+</span>
              <span className="text-sm md:text-base font-medium">Reviews</span>
            </div>
            <div className="flex flex-col items-center px-4">
              <Building className="mb-2 text-accent" size={24} />
              <span className="text-sm md:text-base font-medium">Residential & Commercial Expertise</span>
            </div>
            <div className="flex flex-col items-center px-4">
              <ShieldCheck className="mb-2 text-accent" size={24} />
              <span className="text-sm md:text-base font-medium">Trusted Property Consultants</span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3">Who We Are</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6">About Sync Realty</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sync Realty helps clients buy, sell, lease and invest in properties across Mumbai. The company focuses on transparency, professionalism and customer satisfaction while helping clients find their ideal property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Trust", desc: "Building lasting relationships through honesty." },
              { icon: Award, title: "Expertise", desc: "Deep knowledge of the Mumbai market." },
              { icon: Search, title: "Transparency", desc: "Clear communication at every step." },
              { icon: HeartHandshake, title: "Customer Satisfaction", desc: "Your needs are our priority." }
            ].map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 text-primary">
                  <item.icon size={32} />
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6">Premium Real Estate Services</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Home, title: "Buy Property", desc: "Helping clients find suitable residential and commercial properties that match their exact criteria and budget." },
              { icon: HandCoins, title: "Sell Property", desc: "Professional assistance with selling properties efficiently at the best market value." },
              { icon: Key, title: "Lease & Rental Services", desc: "Connecting landlords and tenants with seamless, hassle-free rental processes." },
              { icon: Building, title: "Residential Properties", desc: "Premium apartments, flats and luxury homes in prime Mumbai locations." },
              { icon: TrendingUp, title: "Commercial Properties", desc: "Strategic shops, offices and commercial spaces for business growth." },
              { icon: Rocket, title: "Pre-Launch Projects", desc: "Exclusive early access to new and upcoming premium developments." }
            ].map((service, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all group"
              >
                <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors">
                  <service.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">{service.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Why Choose Sync Realty?</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Local Market Knowledge",
              "Personalized Assistance",
              "Transparent Communication",
              "Professional Service",
              "Verified Property Options",
              "End-To-End Support"
            ].map((point, i) => (
              <div key={i} className="flex items-center space-x-4 bg-white/5 p-6 rounded-xl border border-white/10">
                <CheckCircle className="text-accent shrink-0" size={24} />
                <span className="text-lg font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3">Featured Listings</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6">Explore Properties</h3>
          </div>

          <Tabs defaultValue="residential" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-12">
              <TabsTrigger 
                value="residential" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-6 py-3 text-base"
              >
                Residential
              </TabsTrigger>
              <TabsTrigger 
                value="commercial"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-6 py-3 text-base"
              >
                Commercial
              </TabsTrigger>
              <TabsTrigger 
                value="prelaunch"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-6 py-3 text-base"
              >
                Pre-Launch
              </TabsTrigger>
            </TabsList>

            {['residential', 'commercial', 'prelaunch'].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2].map((item) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      key={item} 
                      className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 group"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={
                            category === 'residential' ? residentialImg : 
                            category === 'commercial' ? commercialImg : prelaunchImg
                          } 
                          alt="Property" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {category}
                        </div>
                        <div className="absolute bottom-4 right-4 bg-accent text-primary font-bold px-4 py-2 rounded-lg shadow-lg">
                          {category === 'residential' ? '₹2.5 Cr' : category === 'commercial' ? '₹5.5 Cr' : '₹1.8 Cr Onwards'}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-muted-foreground mb-3 text-sm">
                          <MapPin size={16} className="mr-1 text-primary" /> Borivali West, Mumbai
                        </div>
                        <h4 className="text-xl font-bold text-primary mb-3">
                          {category === 'residential' ? 'Premium 3 BHK Luxury Apartment' : 
                           category === 'commercial' ? 'Modern Glass-Front Office Space' : 
                           'Upcoming High-Rise Development'}
                        </h4>
                        <p className="text-muted-foreground mb-6 line-clamp-2">
                          Experience the pinnacle of luxury living with modern amenities, stunning views, and an unbeatable location in the heart of Mumbai.
                        </p>
                        <Button 
                          onClick={() => openEnquiry(
                            category === 'residential' ? 'Residential' :
                            category === 'commercial' ? 'Commercial' : 'Pre-Launch'
                          )}
                          className="w-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2"
                        >
                          <MessageSquare size={16} />
                          Enquire Now
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3">Client Success Stories</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary mb-4">What Our Clients Say</h3>
            <div className="inline-flex items-center justify-center space-x-2 bg-white px-6 py-2 rounded-full shadow-sm border border-slate-100">
              <span className="text-accent text-lg font-bold">5.0</span>
              <div className="flex text-accent text-sm">★★★★★</div>
              <span className="text-muted-foreground text-sm font-medium">| 62+ Reviews on Google</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100 text-center relative">
              <div className="text-6xl text-slate-100 absolute top-8 left-8 font-serif">"</div>
              
              <div className="relative h-[180px] md:h-[120px] flex items-center justify-center">
                {[
                  { text: "Excellent company with quality of service and professionalism.", author: "Esha Shah" },
                  { text: "They are absolutely genuine, customer centric and loyal to their services.", author: "Prasad Kedar" },
                  { text: "Hassle Free, Best Deals, Excellent Network.", author: "SHREE KRISHNA MOBILITY PVT LTD" },
                  { text: "Mayur has been transparent with me and genuinely understood what I was looking for.", author: "Vishwas Dhanwani" }
                ].map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: activeTestimonial === i ? 1 : 0,
                      x: activeTestimonial === i ? 0 : -20,
                      pointerEvents: activeTestimonial === i ? "auto" : "none"
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <div className="flex text-accent mb-4 text-xl">★★★★★</div>
                    <p className="text-xl md:text-2xl font-medium text-primary mb-6 italic px-8">
                      "{testimonial.text}"
                    </p>
                    <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      — {testimonial.author}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center space-x-2 mt-8">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeTestimonial === i ? "bg-accent w-8" : "bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3">Get In Touch</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6">Let's Find Your Dream Space</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Col: Info & Map */}
            <div className="space-y-10">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h4 className="text-2xl font-bold text-primary mb-6">Contact Information</h4>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">Office Address</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Office No 3, Ground Floor, Divine Banquets, Opposite Phoenix Hospital, Chikoowadi, Borivali West, Mumbai 400092
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">Phone Number</p>
                      <a href="tel:+919930397877" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                        +91 99303 97877
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">Business Hours</p>
                      <p className="text-muted-foreground text-sm">10:00 AM – 7:30 PM (Mon-Sat)</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-8 border-t border-slate-200">
                  <p className="font-semibold text-primary mb-4">Follow Us</p>
                  <div className="flex space-x-4">
                    <a href="https://www.instagram.com/syncrealty?igsh=MWE5OXJoem1qcjZtOA==" target="_blank" rel="noreferrer" aria-label="Follow Sync Realty on Instagram" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                      <SiInstagram size={18} />
                    </a>
                    <a href="https://www.facebook.com/syncrealty" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                      <SiFacebook size={18} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 h-[350px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.8!2d72.8554!3d19.2288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEzJzQ0LjciTiA3MsKwNTEnMTkuNCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{border: 0}} allowFullScreen loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Right Col: Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full -z-10" />
              <h4 className="text-2xl font-bold text-primary mb-2">Send us a message</h4>
              <p className="text-muted-foreground mb-8">Fill out the form below and we'll connect with you shortly.</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-slate-50 border-slate-200 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary font-semibold">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 99999 99999" className="bg-slate-50 border-slate-200 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary font-semibold">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="bg-slate-50 border-slate-200 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="requirement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Requirement</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-50 border-slate-200 h-12">
                              <SelectValue placeholder="Select requirement type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Buy">Buy Property</SelectItem>
                            <SelectItem value="Sell">Sell Property</SelectItem>
                            <SelectItem value="Lease">Lease / Rent</SelectItem>
                            <SelectItem value="Invest">Investment</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us what you're looking for..." 
                            className="resize-none bg-slate-50 border-slate-200 min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl">
                    Send via WhatsApp
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-20 pb-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
            <div className="space-y-6">
              <img src={logoPath} alt="Sync Realty" className="h-12 brightness-0 invert" />
              <p className="text-white/70 text-sm leading-relaxed">
                Connecting To Your Dream Space. Your trusted partner for premium real estate in Mumbai.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/syncrealty" target="_blank" rel="noreferrer" className="text-white/70 hover:text-accent transition-colors">
                  <SiInstagram size={20} />
                </a>
                <a href="https://www.facebook.com/syncrealty" target="_blank" rel="noreferrer" className="text-white/70 hover:text-accent transition-colors">
                  <SiFacebook size={20} />
                </a>
                <a href="https://wa.me/919930397877" target="_blank" rel="noreferrer" className="text-white/70 hover:text-accent transition-colors">
                  <SiWhatsapp size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollTo(link.id)} className="text-white/70 hover:text-accent transition-colors text-sm">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-6">Our Services</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>Buy Property</li>
                <li>Sell Property</li>
                <li>Lease & Rental</li>
                <li>Residential Properties</li>
                <li>Commercial Properties</li>
                <li>Pre-Launch Projects</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                  <span>Borivali West, Mumbai 400092</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone size={18} className="text-accent shrink-0 mt-0.5" />
                  <a href="tel:+919930397877" className="hover:text-accent transition-colors">+91 99303 97877</a>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                  <span>10:00 AM – 7:30 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center text-white/50 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Sync Realty. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0 text-xs">Connecting To Your Dream Space</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919930397877"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group"
        title="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
        <SiWhatsapp size={32} className="relative z-10" />
      </a>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiryOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={closeEnquiry}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto relative">
                {/* Header */}
                <div className="bg-primary text-white px-8 py-6 rounded-t-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full" />
                  <button
                    onClick={closeEnquiry}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1"
                    aria-label="Close"
                  >
                    <X size={22} />
                  </button>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <MessageSquare size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Property Enquiry</h3>
                      <p className="text-white/70 text-sm">{enquiryProperty} — Sync Realty</p>
                    </div>
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-8">
                  <p className="text-muted-foreground text-sm mb-6">
                    Fill in your details and we'll connect with you shortly via WhatsApp.
                  </p>

                  <Form {...enquiryForm}>
                    <form onSubmit={enquiryForm.handleSubmit(onEnquirySubmit)} className="space-y-5">
                      <FormField
                        control={enquiryForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary font-semibold">Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" className="bg-slate-50 border-slate-200 h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={enquiryForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">Phone *</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 98765 43210" className="bg-slate-50 border-slate-200 h-11" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={enquiryForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@email.com" className="bg-slate-50 border-slate-200 h-11" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={enquiryForm.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">Property Type *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Residential">Residential</SelectItem>
                                  <SelectItem value="Commercial">Commercial</SelectItem>
                                  <SelectItem value="Pre-Launch">Pre-Launch</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={enquiryForm.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">Budget *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                                    <SelectValue placeholder="Select budget" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Under ₹50 Lakh">Under ₹50 Lakh</SelectItem>
                                  <SelectItem value="₹50L – ₹1 Cr">₹50L – ₹1 Cr</SelectItem>
                                  <SelectItem value="₹1 Cr – ₹2 Cr">₹1 Cr – ₹2 Cr</SelectItem>
                                  <SelectItem value="₹2 Cr – ₹5 Cr">₹2 Cr – ₹5 Cr</SelectItem>
                                  <SelectItem value="Above ₹5 Cr">Above ₹5 Cr</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={enquiryForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary font-semibold">Additional Requirements</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g. 3 BHK, near school, parking required..."
                                className="resize-none bg-slate-50 border-slate-200 min-h-[90px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={closeEnquiry}
                          className="flex-1 h-12 border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-bold flex items-center justify-center gap-2"
                        >
                          <SiWhatsapp size={18} />
                          Send Enquiry
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}