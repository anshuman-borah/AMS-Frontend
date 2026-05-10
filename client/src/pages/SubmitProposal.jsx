import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Stepper from "../components/Stepper";
import Step1 from "./proposal/Step1";
import Step2 from "./proposal/Step2";
import Step3 from "./proposal/Step3";
import Step4 from "./proposal/Step4";
import Step5 from "./proposal/Step5";
import PrintableProposal from "../components/PrintableProposal";
import useProposalForm from "../hooks/useProposalForm";
import { generateProposalPDF } from "../utils/generateProposalPDF";

const STEPS = [
  { number: 1, label: "Basic Info" },
  { number: 2, label: "Details" },
  { number: 3, label: "Objective" },
  { number: 4, label: "Budget" },
  { number: 5, label: "Review" },
];

export default function SubmitProposal({ onLogout }) {
  const printRef = useRef();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    form,
    update,
    addObjective,
    addScientist,
    removeScientist,
  } = useProposalForm();

  const handleSubmit = () => generateProposalPDF(printRef, form);

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <Sidebar onLogout={onLogout} />

      {/* ── Hidden printable area (captured by html2canvas) ── */}
      <div
        ref={printRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "794px",
          background: "#fff",
          padding: "48px 52px",
        }}
      >
        <PrintableProposal form={form} />
      </div>

      {/* ── Visible UI ── */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Submit Research Proposal
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Complete all steps to submit your proposal for review
          </p>

          <Stepper
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />

          {currentStep === 1 && <Step1 form={form} update={update} />}
          {currentStep === 2 && <Step2 form={form} update={update} />}
          {currentStep === 3 && (
            <Step3 form={form} update={update} addObjective={addObjective} />
          )}
          {currentStep === 4 && <Step4 form={form} update={update} />}
          {currentStep === 5 && (
            <Step5
              form={form}
              update={update}
              addScientist={addScientist}
              removeScientist={removeScientist}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              className="px-8 py-2 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Previous
            </button>

            {currentStep === 5 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Submit Proposal
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}
                className="px-8 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Save & Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}