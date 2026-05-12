import { useState } from "react";

export default function useProposalForm() {
  const [form, setForm] = useState({
    uniqueCode: "",
    station: "",
    year: "",
    teacherName: "",
    discipline: "",
    title: "",
    introduction: "",
    actionPlan: "",
    objectives: [""],
    nonRecurring: "",
    recurringContingency: "",
    travellingAllowances: "",
    operationalExpenses: "",
    manpower: "",
    expectedOutcome: "",
    scientists: [{ principal: "", coPrincipal: "" }],
  });

  const update = (field) => (value) => {
    let finalValue = value;
    if (value && typeof value === "object" && value.target) {
      finalValue = value.target.value;
    }
    setForm((prev) => ({ ...prev, [field]: finalValue }));
  };

  const addObjective = () => {
    setForm((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }));
  };

  const updateObjective = (index, value) => {
    setForm((prev) => {
      const updated = [...prev.objectives];
      updated[index] = value;
      return { ...prev, objectives: updated };
    });
  };

  const addScientist = () => {
    setForm((prev) => ({
      ...prev,
      scientists: [...prev.scientists, { principal: "", coPrincipal: "" }],
    }));
  };

  const removeScientist = (index) => {
    setForm((prev) => ({
      ...prev,
      scientists: prev.scientists.filter((_, i) => i !== index),
    }));
  };

  return {
    form,
    update,
    addObjective,
    updateObjective,
    addScientist,
    removeScientist,
  };
}