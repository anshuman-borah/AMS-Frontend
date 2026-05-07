import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Stepper from "../components/Stepper";
import FormField from "../components/FormField";
import Step1 from "./proposal/Step1";
import Step2 from "./proposal/Step2";
import Step3 from "./proposal/Step3";
import Step4 from "./proposal/Step4";

const STEPS = [
  { number: 1, label: "Basic Info" },
  { number: 2, label: "Details"   },
  { number: 3, label: "Objective" },
  { number: 4, label: "Budget"    },
  { number: 5, label: "Review"    },
];

const STATION_OPTIONS   = [{ value: "station1", label: "Station 1" }, { value: "station2", label: "Station 2" }];
const YEAR_OPTIONS      = [{ value: "2024", label: "2024" }, { value: "2025", label: "2025" }, { value: "2026", label: "2026" }];
const DISCIPLINE_OPTIONS = [
  { value: "agriculture", label: "Agriculture" },
  { value: "biology",     label: "Biology"     },
  { value: "chemistry",   label: "Chemistry"   },
  { value: "physics",     label: "Physics"     },
];

export default function SubmitProposal({onLogout}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    uniqueCode: "", station: "", year: "", teacherName: "", discipline: "",
    title: "", introduction: "", actionPlan: "",
    objectives: [""] ,
    nonRecurring: "" , recurringContingency: "",travellingAllowances: "",operationalExpenses: "", manpower: "",
  });

    const update = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

   const addObjective = () => {
    setForm((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }));
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Submit Research Proposal</h1>
          <p className="text-gray-500 mb-8 text-sm">Complete all steps to submit your proposal for review</p>

          <Stepper steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />

          {/* Step 1 — Basic Info */}
          {currentStep === 1 && (
            <Step1 form={form} update={update} />
            // <div>
            //   <h2 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h2>
            //   <div className="flex gap-4 mb-6">
            //     <FormField className="flex-1"  label="Unique Code"        value={form.uniqueCode}  onChange={update("uniqueCode")}  placeholder="Station/Year/Discipline/Serial No" />
            //     <FormField className="flex-1"  label="Stations / Colleges" type="select" value={form.station}    onChange={update("station")}    options={STATION_OPTIONS} />
            //     <FormField className="w-36"    label="Year"               type="select" value={form.year}       onChange={update("year")}       options={YEAR_OPTIONS} />
            //   </div>
            //   <FormField className="mb-6"  label="Name of the Teacher / Scientist" value={form.teacherName} onChange={update("teacherName")} placeholder="Enter your name" />
            //   <FormField className="mb-10" label="Discipline" type="select" value={form.discipline} onChange={update("discipline")} options={DISCIPLINE_OPTIONS} />
            // </div>
          )}

          {/* Step 2 — Details */}
          {currentStep === 2 && (
            <Step2 form={form} update={update} />
            // <div>
            //   <h2 className="text-xl font-bold text-gray-800 mb-6">Project Detail</h2>
            //   <FormField className="mb-6"  label="Title of the project" value={form.title}        onChange={update("title")}        placeholder="Enter project title" />
            //   <FormField className="mb-6"  label="Introduction"         type="textarea" value={form.introduction} onChange={update("introduction")} rows={3} />
            //   <FormField className="mb-10" label="Action Plan"          type="textarea" value={form.actionPlan}   onChange={update("actionPlan")}   rows={3} />
            // </div>
          )}

          {currentStep === 3 && (
             <Step3 form={form} update={update}  addObjective={addObjective} />
          )}
          {currentStep === 4 &&(
            <Step4 form={form} update={update} />

          )}
          {currentStep === 5 && <div className="text-gray-400 py-20 text-center">Step 5: Review (coming soon)</div>}

          {/* Nav Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              className="px-8 py-2 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}
              className="px-8 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Save & Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}