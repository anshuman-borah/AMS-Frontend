import FormField from "../../../components/common/FormField";

export default function Step2({ form, update }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Project Detail
      </h2>

      <FormField
        className="mb-6"
        label="Title of the project"
        value={form.title}
        onChange={update("title")}
        placeholder="Enter project title"
      />

      <FormField
        className="mb-6"
        label="Introduction"
        type="textarea"
        value={form.introduction}
        onChange={update("introduction")}
        rows={3}
        placeholder="Write a brief introduction"
      />

      <FormField
        className="mb-10"
        label="Action Plan"
        type="textarea"
        value={form.actionPlan}
        onChange={update("actionPlan")}
        rows={3}
        placeholder="Describe the action plan"
      />
    </div>
  );
}