import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "Who is this for?", a: "We partner with ambitious B2B SaaS, E-commerce (DTC), and funded startups looking to scale aggressively. If you have product-market fit and need a growth engine, we're for you." },
  { q: "What industries do you work with?", a: "While our methodology is industry-agnostic, we have deep expertise in Tech/SaaS, Health & Wellness, Fintech, and high-ticket E-commerce." },
  { q: "What is the minimum engagement?", a: "Our standard engagements start at $5,000/month. We don't do one-off projects; we build long-term growth partnerships." },
  { q: "How quickly can we start?", a: "Typically, we can begin the discovery phase within 7 days of signing. Full campaign launches usually happen within 14-21 days depending on asset requirements." },
  { q: "Do you offer guarantees?", a: "We guarantee our process, execution, and communication. We don't guarantee specific ROI numbers out of the gate because every market and offer is different, but our track record speaks for itself." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#111111] tracking-tight">
            Frequently Asked <span className="text-brand">Questions.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-lg text-[#111111]">{faq.q}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${openIndex === index ? 'bg-brand text-white' : 'bg-orange-100 text-brand'}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-black/60 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
