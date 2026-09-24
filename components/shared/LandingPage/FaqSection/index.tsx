'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { FC } from 'react';

interface Props {}

const faqs = [
  {
    question: 'How long does delivery take?',
    answer:
      'Standard delivery usually takes 3–5 business days, while express shipping arrives within 1–2 business days. You will receive a tracking number as soon as your order ships.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely.',
  },
  {
    question: 'Can I return a product?',
    answer:
      'Yes! You can return any unused product within 30 days of delivery for a full refund. Simply contact our support team and we will guide you through the process.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order is shipped, we send a tracking link to your email. You can also track your order anytime from the Orders section in your account.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to over 40 countries worldwide. Shipping costs and delivery times vary by destination and are calculated at checkout.',
  },
];

const FaqSection: FC<Props> = (props) => {
  return (
    <main
      id="faq"
      className="relative isolate flex flex-col justify-center min-h-[600px] py-24 overflow-hidden ">
      <div className="relative flex max-w-[1400px] items-center py-16 lg:py-20">
        <div className="w-full max-w-[800px]">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            FAQ
          </p>
          <Title>Frequently Asked Questions.</Title>
          <Description>Everything you need to know before you shop.</Description>
        </div>
      </div>
      <div className="mx-auto w-full ">
        <Accordion className="gap-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              className="rounded-2xl border border-border bg-card px-6 shadow-sm">
              <AccordionTrigger className="py-5 text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
};

export default FaqSection;
