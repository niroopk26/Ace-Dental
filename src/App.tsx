/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
const CLINIC_INFO = {
  name: "Ace Dental Care",
  kannadaName: "ಏಸ್ ಡೆಂಟಲ್ ಕೇರ್",
  phone: "+91 98865 74540",
  address: "Viswa Vihar, C V Raman Nagar, Bengaluru, Karnataka 560093",
  hours: "Open daily – Closes at 4 PM",
  rating: 4.9,
  reviewsCount: 27,
  doctor: "Dr. Rani",
};

const SERVICES = [
  {
    title: "Tooth Extraction",
    description: "Safe and painless removal of damaged or problematic teeth.",
    when: "Severe decay or impacted wisdom teeth.",
    icon: <Sparkles className="w-6 h-6" />,
    span: "col-span-12 md:col-span-4",
    image: "https://hashtagsmilehealth.in/wp-content/uploads/2025/05/is-tooth-extraction-painful-hamilton-on.jpg"
  },
  {
    title: "Root Canal Treatment",
    description: "Advanced procedure to save a badly decayed or infected tooth.",
    when: "Deep cavities reaching the nerve.",
    icon: <ShieldCheck className="w-6 h-6" />,
    span: "col-span-12 md:col-span-8",
    image: "https://www.thesmiledesign.com/wp-content/uploads/2025/08/smile-design-blog-root-canal-vs.-tooth-extraction.png"
  },
  {
    title: "Teeth Cleaning",
    description: "Professional removal of plaque and tartar for a fresh smile.",
    when: "Every 6 months for optimal hygiene.",
    icon: <Sparkles className="w-6 h-6" />,
    span: "col-span-12 md:col-span-6",
    image: "https://desertlakedental.com/wp-content/uploads/2024/10/How-Often-Should-You-Have-a-Dental-Cleaning.jpg"
  },
  {
    title: "Dental Fillings",
    description: "Restoring decayed teeth using high-quality composite materials.",
    when: "Minor to moderate cavities.",
    icon: <CheckCircle2 className="w-6 h-6" />,
    span: "col-span-12 md:col-span-6",
    image: "https://drkopalpathak.com/wp-content/uploads/2025/11/dental-filling-2401.jpg"
  },
  {
    title: "Smile Improvement",
    description: "Cosmetic treatments to enhance the aesthetics of your teeth.",
    when: "Discolored or chipped teeth.",
    icon: <Sparkles className="w-6 h-6" />,
    span: "col-span-12 md:col-span-12",
    image: "https://www.yourdentistryguide.com/wp-content/uploads/2017/11/new-smile-min.jpg"
  },
];

const FAQS = [
  {
    question: "How often should I visit a dentist?",
    answer: "It is recommended to visit a dentist every 6 months for a routine check-up and professional cleaning to prevent major dental issues.",
  },
  {
    question: "Is tooth extraction painful?",
    answer: "With modern anesthesia and techniques, tooth extraction is virtually painless. You may feel some pressure, but no sharp pain.",
  },
  {
    question: "What is root canal treatment?",
    answer: "RCT is a procedure to remove infected pulp from inside a tooth, cleaning and sealing it to save the natural tooth from extraction.",
  },
  {
    question: "How can I prevent cavities?",
    answer: "Brush twice a day, floss daily, limit sugary snacks, and visit your dentist regularly for cleanings and fluoride treatments.",
  },
  {
    question: "How long does teeth cleaning take?",
    answer: "A professional scaling and polishing session typically takes 30 to 45 minutes, depending on the amount of tartar buildup.",
  },
];

// --- Schemas ---
const appointmentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  treatment: z.string().min(1, "Treatment type is required"),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- Components ---

const SectionHeading = ({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) => (
  <div className={cn("mb-12 md:mb-20", centered && "text-center")}>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-5xl md:text-7xl font-serif font-medium text-gray-900 mb-8 leading-[1.1] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={cn("h-px w-32 bg-accent/20 mt-12", centered && "mx-auto")} />
    </motion.div>
  </div>
);

const Navbar = ({ onBookClick }: { onBookClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[95%] max-w-7xl rounded-full",
      isScrolled ? "glass-nav py-4 px-8 shadow-2xl" : "bg-transparent py-6 px-4"
    )}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl">A</div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold text-gray-900 tracking-tight leading-none">Ace Dental</span>
            <span className="text-[8px] font-bold text-accent uppercase tracking-[0.3em] mt-1">C V Raman Nagar</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onBookClick}
            className="bg-gray-900 hover:bg-primary text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl hover:scale-105"
          >
            Book Now
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900 p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-6 pt-4 pb-10 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6">
                <button 
                  onClick={() => { onBookClick(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-accent text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AppointmentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AppointmentData>({
    resolver: zodResolver(appointmentSchema)
  });

  const onSubmit = async (data: AppointmentData) => {
    setIsSubmitting(true);
    try {
      const message = `Hello Ace Dental Care, I would like to book an appointment.\n\n` +
        `*Name:* ${data.name}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Date:* ${data.date}\n` +
        `*Time:* ${data.time}\n` +
        `*Service:* ${data.treatment}`;
      
      const whatsappUrl = `https://wa.me/${CLINIC_INFO.phone.replace(/\s+/g, '').replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card w-full max-w-2xl rounded-[4rem] overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-16">
          <button onClick={onClose} className="absolute top-10 right-10 text-gray-400 hover:text-gray-900 transition-colors">
            <X className="w-6 h-6" />
          </button>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mx-auto mb-10">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-4xl font-serif font-medium text-gray-900 mb-6 tracking-tight">Request Received</h3>
              <p className="text-xl text-gray-500 font-light leading-relaxed max-w-sm mx-auto">
                We'll contact you shortly to finalize your appointment details.
              </p>
              <button 
                onClick={() => { setIsSuccess(false); onClose(); }}
                className="mt-12 bg-gray-900 text-white px-12 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-primary transition-colors"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-16">
                <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Reservation</span>
                <h3 className="text-5xl font-serif font-medium text-gray-900 tracking-tight leading-none">Book Your <br /> <span className="italic text-primary">Visit</span></h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Full Name</label>
                    <input {...register('name')} className="w-full px-8 py-5 bg-paper/50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-light text-lg" placeholder="Your name" />
                    {errors.name && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold tracking-wider">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Phone Number</label>
                    <input {...register('phone')} className="w-full px-8 py-5 bg-paper/50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-light text-lg" placeholder="+91" />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold tracking-wider">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Preferred Date</label>
                    <input type="date" {...register('date')} className="w-full px-8 py-5 bg-paper/50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-light text-lg" />
                    {errors.date && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold tracking-wider">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Preferred Time</label>
                    <select {...register('time')} className="w-full px-8 py-5 bg-paper/50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-light text-lg appearance-none">
                      <option value="">Select Time</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                    </select>
                    {errors.time && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold tracking-wider">{errors.time.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Service Required</label>
                  <select {...register('treatment')} className="w-full px-8 py-5 bg-paper/50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-light text-lg appearance-none">
                    <option value="">Select Service</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Other">Other Consultation</option>
                  </select>
                  {errors.treatment && <p className="text-red-500 text-[10px] mt-2 uppercase font-bold tracking-wider">{errors.treatment.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 hover:bg-primary text-white py-6 rounded-full font-bold text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center disabled:opacity-70 mt-8"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ReviewCard = ({ review }: { review: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-12 rounded-[3.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]"
  >
    <div className="flex items-center mb-10">
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-serif font-bold text-2xl mr-6">
        {review.author_name.charAt(0)}
      </div>
      <div>
        <h4 className="font-serif font-medium text-gray-900 text-xl leading-none mb-2">{review.author_name}</h4>
        <div className="flex text-yellow-400 space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn("w-3 h-3 fill-current", i >= review.rating && "text-gray-100")} />
          ))}
        </div>
      </div>
    </div>
    <p className="text-gray-500 text-base leading-relaxed font-light italic">"{review.text}"</p>
    <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between items-center">
      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">{review.relative_time_description}</span>
      <div className="flex items-center text-accent">
        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verified Visit</span>
      </div>
    </div>
  </motion.div>
);

const FAQItem = ({ faq }: { faq: typeof FAQS[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-10 flex items-center justify-between text-left transition-all duration-500"
      >
        <span className="text-xl md:text-2xl font-serif font-medium text-gray-900 pr-8 leading-tight">{faq.question}</span>
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 flex-shrink-0",
          isOpen ? "bg-primary text-white rotate-180 shadow-lg shadow-primary/20" : "bg-paper text-gray-400"
        )}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10">
              <p className="text-xl text-gray-500 leading-relaxed font-light max-w-3xl">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data.reviews || []))
      .catch(err => console.error("Reviews fetch error:", err));
  }, []);

  const handleWhatsAppBooking = () => {
    const message = "Hello Ace Dental Care, I would like to book an appointment. Please let me know the available slots.";
    const whatsappUrl = `https://wa.me/${CLINIC_INFO.phone.replace(/\s+/g, '').replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-paper mesh-gradient">
      <Navbar onBookClick={handleWhatsAppBooking} />
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Floating Call Button */}
      <a 
        href={`tel:${CLINIC_INFO.phone}`}
        className="fixed bottom-6 right-6 z-40 md:hidden bg-primary text-white p-4 rounded-full shadow-2xl animate-bounce"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-8 md:pt-40 md:pb-12 lg:pt-64 lg:pb-20 overflow-hidden dot-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 relative z-10"
            >
              <div className="inline-flex items-center space-x-3 text-accent mb-10">
                <div className="h-px w-12 bg-accent/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Excellence in Dentistry</span>
              </div>
              <h1 className="text-7xl lg:text-[9rem] font-serif font-medium text-gray-900 leading-[0.85] mb-12 tracking-tighter">
                Healthy <br />
                <span className="italic text-primary">Teeth.</span> <br />
                Confident <br />
                <span className="italic text-accent">Smile.</span>
              </h1>
              <p className="text-2xl text-gray-500 mb-16 max-w-xl leading-relaxed font-light">
                Experience boutique dental care in the heart of C V Nagar. We blend artistry with advanced clinical expertise.
              </p>
              <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8">
                <button 
                  onClick={handleWhatsAppBooking}
                  className="bg-primary hover:bg-primary-dark text-white px-12 py-6 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all flex items-center justify-center"
                >
                  Book Appointment <Calendar className="ml-4 w-4 h-4" />
                </button>
                <a 
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="glass-card text-gray-900 px-12 py-6 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center"
                >
                  Call Now <Phone className="ml-4 w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] aspect-[4/5]">
                <img 
                  src="https://sandimasdentalcare.com/wp-content/uploads/2023/11/San-Dimas-Dental-Group-Bakersfield.jpg" 
                  alt="Modern Dental Clinic" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Glass Rating Card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-12 -left-12 glass-card p-10 rounded-[3rem] z-20 hidden xl:block"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl font-serif font-bold text-primary mb-2">4.9</div>
                  <div className="flex text-yellow-400 mb-4 space-x-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Google Reviews</p>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-[120px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-8 pb-20 md:pt-12 md:pb-40 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="order-2 lg:order-1 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
              >
                <img 
                  src="https://moulanahospital.com/wp-content/uploads/2021/05/Endodontis-pedodontis-orthodontis-dental-surgery.jpg" 
                  alt="Dr. Rani" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-[80px] -z-10" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-10 block">Our Philosophy</span>
              <h2 className="text-6xl md:text-8xl font-serif font-medium text-gray-900 mb-12 leading-[0.9] tracking-tighter">
                Gentle <br />
                <span className="italic text-primary">Artistry.</span> <br />
                Modern <br />
                <span className="italic text-accent">Care.</span>
              </h2>
              <p className="text-2xl text-gray-500 mb-16 leading-relaxed font-light">
                Ace Dental Care is a trusted clinic in C V Raman Nagar. Led by Dr. Rani, we focus on comfort, hygiene, and advanced results.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                {[
                  "Personalized Care",
                  "Polite Staff",
                  "Hygienic Space",
                  "Advanced Tech"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleWhatsAppBooking}
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-accent hover:text-primary transition-colors group"
              >
                Discover Our Story <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading 
            title="Curated Dental Care" 
            subtitle="We provide a refined selection of treatments tailored to your unique journey."
          />
          <div className="bento-grid">
            {SERVICES.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative rounded-[3.5rem] overflow-hidden group glass-card min-h-[400px] flex flex-col justify-end p-12 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]",
                  service.span
                )}
              >
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-transparent" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-serif font-medium text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed font-light max-w-md">{service.description}</p>
                  <div className="flex items-center space-x-3 text-accent">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{service.when}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 md:py-32 bg-primary-light/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20">
            <div>
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900">Patient Stories</h2>
            </div>
            <div className="mt-8 md:mt-0 flex items-center bg-white/50 backdrop-blur-md px-8 py-4 rounded-full border border-white/50 shadow-sm">
              <div className="flex text-yellow-400 mr-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="font-serif font-bold text-gray-900 text-xl mr-1">4.9</span>
              <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Rating</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>

          <div className="text-center">
            <a 
              href="https://www.google.com/search?sca_esv=ef50c19f60a1e6df&sxsrf=ANbL-n7SZX2PstNZ6mczNIQ2UgKjYIzK2g:1772697592136&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOcU_S05c2CIPCsOlZ4DfIfUIbM0K_nMTAXKMusGYcUHwp09e4TRDN1F7FD6Joopgd4k9sAWsf1DqX0rBgUJkcQwxMrIv&q=Ace+Dental+Care+Reviews&sa=X&ved=2ahUKEwiD4JeSpYiTAxUNRWcHHa7zI9gQ0bkNegQIKhAF&biw=1536&bih=742&dpr=1.25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-accent hover:text-primary transition-colors group"
            >
              Read More Reviews on Google <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading 
            title="Clinic Atmosphere" 
            subtitle="Explore our serene and modern facility designed for your comfort."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
            ].map((url, i) => (
              <div key={i} className={cn(
                "relative rounded-[2.5rem] overflow-hidden group h-80",
                i === 0 && "md:col-span-2 md:row-span-2 h-auto"
              )}>
                <img 
                  src={url} 
                  alt="Clinic Gallery" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-32 bg-paper">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <SectionHeading 
            title="Common Inquiries" 
            subtitle="Everything you need to know about your dental journey with us."
          />
          <div className="bg-white rounded-[3rem] p-12 card-shadow border border-gray-50">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="py-20 md:py-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 md:gap-32 items-start">
            <div className="lg:col-span-5">
              <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-10 block">Location</span>
              <h2 className="text-6xl md:text-8xl font-serif font-medium text-gray-900 mb-20 leading-[0.9] tracking-tighter">Visit Our <br /> <span className="italic text-primary">Boutique</span> <br /> Clinic</h2>
              
              <div className="space-y-16">
                <div className="flex items-start">
                  <div className="w-20 h-20 glass-card text-accent rounded-3xl flex items-center justify-center mr-8 flex-shrink-0">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-2xl text-gray-900 mb-3">Address</h4>
                    <p className="text-xl text-gray-500 font-light leading-relaxed">{CLINIC_INFO.address}</p>
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=Ace+Dental+Care+Viswa+Vihar+C+V+Raman+Nagar+Bengaluru" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mt-6 inline-flex items-center hover:text-primary transition-colors"
                    >
                      Get Directions <ArrowRight className="ml-4 w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-20 h-20 glass-card text-accent rounded-3xl flex items-center justify-center mr-8 flex-shrink-0">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-2xl text-gray-900 mb-3">Inquiries</h4>
                    <p className="text-xl text-gray-500 font-light leading-relaxed">{CLINIC_INFO.phone}</p>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mt-3">Available Daily til 4 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] h-[400px] md:h-[500px] relative group border border-white/20">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.942738214227!2d77.6657!3d12.975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae114f66666667%3A0x6666666666666666!2sAce%20Dental%20Care!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Ace Dental Care Location"
                  className="grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 pointer-events-none border-[32px] border-white/5 rounded-[4rem]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white pt-20 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex flex-col mb-8">
                <span className="text-3xl font-serif font-bold text-white tracking-tight">Ace Dental Care</span>
                <span className="text-[10px] font-medium text-primary-light/50 uppercase tracking-[0.3em] mt-1">ಏಸ್ ಡೆಂಟಲ್ ಕೇರ್</span>
              </div>
              <p className="text-primary-light/60 max-w-sm mb-10 leading-relaxed font-light">
                Your trusted partner for comprehensive dental care in Bengaluru. We combine clinical excellence with a gentle, patient-centric approach.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-xl mb-8">Navigation</h4>
              <ul className="space-y-4 text-primary-light/50 text-sm font-medium uppercase tracking-widest">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-xl mb-8">Contact</h4>
              <ul className="space-y-4 text-primary-light/50 text-sm leading-relaxed">
                <li>{CLINIC_INFO.address}</li>
                <li className="text-white font-bold">{CLINIC_INFO.phone}</li>
                <li>{CLINIC_INFO.hours}</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center text-primary-light/30 text-[10px] uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} Ace Dental Care. Crafted for healthy smiles.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
