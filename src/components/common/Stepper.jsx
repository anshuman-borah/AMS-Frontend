import { Check } from "lucide-react";

export default function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="flex items-center mb-10">
      {steps.map((step, idx) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <button
              onClick={() => onStepClick(step.number)}
              className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all ${
                currentStep === step.number
                  ? "bg-blue-600 border-blue-600 text-white"
                  : currentStep > step.number
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {currentStep > step.number ? <Check size={20} /> : step.number}
            </button>
            <span className={`text-xs mt-1 ${currentStep === step.number ? "text-gray-800 font-semibold" : "text-gray-400"}`}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`h-0.5 w-32 mx-1 mb-5 ${currentStep > step.number ? "bg-green-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}