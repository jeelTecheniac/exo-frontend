import Typography from "../../lib/components/atoms/Typography";
import { motion, AnimatePresence } from "framer-motion";

export interface ProgressStep {
  id: number;
  title: string;
  status: "completed" | "current" | "pending";
}

interface RequestProgressProps {
  steps: ProgressStep[];
}

const RequestProgress: React.FC<RequestProgressProps> = ({ steps }) => {
  return (
    <div className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100/50 backdrop-blur-sm">
      <Typography
        size="lg"
        weight="bold"
        className="text-secondary-100 mb-8 tracking-tight"
      >
        Request Progress
      </Typography>

      <div className="relative">
        <AnimatePresence>
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex items-start group"
            >
              <div className="relative flex flex-col items-center mr-4">
                {/* Step Indicator */}
                <motion.div
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                  whileHover={{ scale: 1.15 }}
                >
                  {step.status === "completed" ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                      <div className="w-3 h-5 border-r-2 border-b-2 border-white transform rotate-45 translate-y-[-2px]" />
                    </div>
                  ) : step.status === "current" ? (
                    <div className="w-10 h-10 rounded-full border-4 border-orange-500 bg-white flex items-center justify-center text-orange-500 font-bold text-lg shadow-inner">
                      {step.id}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-3 border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 font-medium text-lg">
                      {step.id}
                    </div>
                  )}
                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div
                    className="w-[3px] bg-gradient-to-b from-gray-200 to-gray-300 my-2 rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: "48px" }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                    style={{ height: "48px" }}
                  />
                )}
              </div>
              <Typography
                size="sm"
                weight="semibold"
                className="text-gray-700 pt-2 pl-3 group-hover:text-gray-900 transition-colors duration-300"
              >
                {step.title}
              </Typography>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RequestProgress;
