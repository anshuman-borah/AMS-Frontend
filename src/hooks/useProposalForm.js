import { useState } from "react";

export default function useProposalForm() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    uniqueCode: "",
    stationOrCollege: "",
    year: "",
    teacherName: user?.name || "",
    discipline: "",

    title: "",
    proposalType: "",

    introduction: "",
    actionPlan: "",

    objectives: [""],

    nonRecurring: "",
    recurringContingency: "",
    travellingAllowances: "",
    operationalExpenses: "",
    manpower: "",

    expectedOutcome: "",

    scientistInvolve: [
      {
        scientistName: user?.name || "",
        nonRecurring: "",
        recurringContingency: "",
      },
    ],
  });

  const update = (field) => (value) => {
    let finalValue = value;

    if (value && typeof value === "object" && value.target) {
      finalValue = value.target.value;
    }

    setForm((prev) => ({
      ...prev,
      [field]: finalValue,
    }));
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

      return {
        ...prev,
        objectives: updated,
      };
    });
  };

  const addScientist = () => {
    setForm((prev) => ({
      ...prev,
      scientistInvolve: [
        ...prev.scientistInvolve,
        {
          scientistName: "",
          nonRecurring: "",
          recurringContingency: "",
        },
      ],
    }));
  };

  const removeScientist = (index) => {
    setForm((prev) => ({
      ...prev,
      scientistInvolve: prev.scientistInvolve.filter(
        (_, i) => i !== index
      ),
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