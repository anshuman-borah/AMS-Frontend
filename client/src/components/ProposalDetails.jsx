export default function ProposalDetails({ proposal }) {
  const objectives = proposal.objectives?.length
    ? proposal.objectives
    : [
        "Develop machine learning models for disease prediction",
        "Create an intuitive interface for medical professionals",
        "Validate the system with clinical trials",
      ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 text-sm text-gray-700 space-y-4">
      <h3 className="font-semibold text-gray-800 text-base border-b pb-2">
        Proposal Details
      </h3>
      <Block label="Principal Scientist" value={proposal.principalScientist || "Dr. Sharma"} />
      <Block label="Project Title"       value={proposal.title} />
      <Block label="Discipline"          value={proposal.discipline || "Computer Science"} />
      <div>
        <p className="font-semibold text-gray-600 mb-1">Introduction & Rationale</p>
        <p className="text-gray-600 leading-relaxed">
          {proposal.introduction || "This research proposes to develop an advanced AI-based medical diagnosis system that leverages machine learning algorithms to assist healthcare professionals in making accurate diagnosis."}
        </p>
      </div>
      <div>
        <p className="font-semibold text-gray-600 mb-1">Objectives</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {objectives.map((obj, i) => <li key={i}>{obj}</li>)}
        </ul>
      </div>
      <Block label="Budget" value={proposal.budget || "₹ 45.5 Lakhs"} />
    </div>
  );
}

function Block({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-gray-600 mb-0.5">{label}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}