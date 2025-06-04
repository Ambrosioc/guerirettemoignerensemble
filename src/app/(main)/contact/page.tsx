'use client';

import AnimatedPage from '@/components/AnimatedPage';
import FadeIn from '@/components/FadeIn';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin } from 'lucide-react';
// import { Select } from '@radix-ui/themes';

export default function Contact() {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   subject: '',
  //   message: ''
  // });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const handleSubjectChange = (value: string) => {
  //   setFormData({
  //     ...formData,
  //     subject: value
  //   });
  // };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-[#faf7f2] pt-60">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact</h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-xl text-gray-600">
                  Une question ? Une proposition ? N&apos;hésitez pas à me contacter.
                  Je serai ravie d&apos;échanger avec vous.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <FadeIn delay={0.3}>
                  <motion.div
                    className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <Mail className="w-8 h-8 text-[#d4af37] mx-auto mb-4" />
                    <h3 className="font-serif text-xl mb-2">Email</h3>
                    <a
                      href="mailto:merveillegrace-helene@outlook.com"
                      className="text-gray-600 hover:text-[#d4af37] transition-colors"
                    >
                      merveillegrace-helene@outlook.com
                    </a>
                  </motion.div>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <motion.div
                    className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <MapPin className="w-8 h-8 text-[#d4af37] mx-auto mb-4" />
                    <h3 className="font-serif text-xl mb-2">Localisation</h3>
                    <p className="text-gray-600">Paris, France</p>
                  </motion.div>
                </FadeIn>

                <FadeIn delay={0.5}>
                  <motion.div
                    className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex justify-center gap-4 text-[#d4af37] mb-4">
                      <motion.a
                        href="#"
                        className="hover:text-[#b39030] transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Instagram className="w-8 h-8" />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="hover:text-[#b39030] transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Facebook className="w-8 h-8" />
                      </motion.a>
                    </div>
                    <h3 className="font-serif text-xl mb-2">Réseaux sociaux</h3>
                    <p className="text-gray-600">Suivez mon actualité</p>
                  </motion.div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        {/* <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <FadeIn delay={0.6}>
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-serif text-2xl mb-6 text-center">Envoyez-moi un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                          required
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                          required
                        />
                      </motion.div>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Sujet
                      </label>
                      <Select.Root 
                        value={formData.subject}
                        onValueChange={handleSubjectChange}
                      >
                        <Select.Trigger 
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent bg-white text-left"
                          placeholder="Sélectionnez un sujet"
                        />
                        <Select.Content>
                          <Select.Group>
                            <Select.Label>Choisissez un sujet</Select.Label>
                            <Select.Item value="general">Question générale</Select.Item>
                            <Select.Item value="books">À propos des livres</Select.Item>
                            <Select.Item value="events">Événements & dédicaces</Select.Item>
                            <Select.Item value="press">Presse & médias</Select.Item>
                            <Select.Item value="other">Autre</Select.Item>
                          </Select.Group>
                        </Select.Content>
                      </Select.Root>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        required
                      ></textarea>
                    </motion.div>
                    <div className="text-center">
                      <motion.button
                        type="submit"
                        className="inline-flex items-center px-8 py-3 bg-[#d4af37] text-white rounded-full hover:bg-[#b39030] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Send size={18} className="mr-2" />
                        Envoyer le message
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </section> */}
      </div>
    </AnimatedPage>
  );
} 