import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "../../layout/AppLayout";
import Typography from "../../lib/components/atoms/Typography";
import { MinusIcon, PlusIcon } from "../../icons";
import { useTranslation } from "react-i18next";
import Label from "../../lib/components/atoms/Label";
import Input from "../../lib/components/atoms/Input";
import TextArea from "../../lib/components/atoms/TextArea";
import Button from "../../lib/components/atoms/Button";

interface FAQItem {
  question: string;
  answer: string;
}

const Help = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqItems: FAQItem[] = [
    {
      question: "How long until we deliver your first blog post?",
      answer:
        "We typically deliver the first blog post within 5-7 business days after receiving your requirements and completing the onboarding process.",
    },
    {
      question: "What type of content do you create?",
      answer:
        "We create various types of content including blog posts, articles, technical documentation, and more.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply click the 'Get Started' button and follow our easy onboarding process.",
    },
    {
      question: "How long until we deliver your first blog post?",
      answer:
        "We typically deliver the first blog post within 5-7 business days after receiving your requirements and completing the onboarding process.",
    },
    {
      question: "How long until we deliver your first blog post?",
      answer:
        "We typically deliver the first blog post within 5-7 business days after receiving your requirements and completing the onboarding process.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full flex-col lg:flex-row gap-12 px-4 lg:px-10 mx-auto"
      >
        <div className="w-full lg:w-1/2">
          <Typography className="mb-8" size="xl_2" weight="extrabold">
            {t("frequently_asked_questions")}
          </Typography>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-light-10 hover:shadow-light-20 transition-shadow"
              >
                <button
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center gap-3 sm:gap-5"
                  onClick={() => toggleQuestion(index)}
                >
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedIndex === index ? <MinusIcon /> : <PlusIcon />}
                  </motion.div>
                  <Typography
                    size="base"
                    weight="bold"
                    element="span"
                    className="text-secondary-100"
                  >
                    {item.question}
                  </Typography>
                </button>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography
                        size="sm"
                        weight="normal"
                        className="px-4 sm:px-6 pb-4 text-secondary-100"
                      >
                        {item.answer}
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex w-full flex-col sm:flex-row gap-2 items-center sm:items-baseline">
            <Typography
              className="text-secondary-100 text-center sm:text-left"
              weight="normal"
              size="xl_2"
            >
              {t("still_have_query")}
            </Typography>
            <span className="text-secondary-100 font-bold text-xl sm:text-2xl">
              {t("contact_us")}
            </span>
          </div>
          <motion.form
            className="pt-6 flex flex-col gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                className="bg-white w-full"
                id="email"
                name="email"
              />
            </div>

            <div>
              <Label htmlFor="subject">{t("subject")}</Label>
              <Input
                type="text"
                placeholder={t("subject_of_your_message")}
                className="bg-white w-full"
                id="subject"
                name="subject"
              />
            </div>
            <div>
              <Label htmlFor="message">{t("message")}</Label>
              <TextArea
                id="message"
                placeholder={t("type_your_message_or_question_here")}
                className="w-full"
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="primary"
                className="py-3 px-6 w-full sm:w-fit"
                type="button"
              >
                {t("submit")}
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default Help;
