import { ArrowLeft, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function ProposalDetails({ proposal, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProposal, setEditedProposal] = useState(proposal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const objectives = proposal.objectives?.length
    ? proposal.objectives
    : [
        "Develop machine learning models for disease prediction",
        "Create an intuitive interface for medical professionals",
        "Validate the system with clinical trials",
      ];

  // Determine if reviewer details should be shown
  const shouldShowReviewer = ["UNDER_REVIEW", "APPROVED", "REJECTED", "REVISION_REQUIRED"].includes(proposal.status);
  
  // Determine if final decision should be shown
  const isFinalDecision = ["APPROVED", "REJECTED", "REVISION_REQUIRED"].includes(proposal.status);
  
  // Check if editing is allowed (only for REVISION_REQUIRED status)
  const canEdit = proposal.status === "REVISION_REQUIRED";

  // Handle edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setEditedProposal(proposal);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProposal(proposal);
    setError("");
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditedProposal(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle objective changes
  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...(editedProposal.objectives || [])];
    newObjectives[index] = value;
    setEditedProposal(prev => ({
      ...prev,
      objectives: newObjectives
    }));
  };

  // Add new objective
  const addObjective = () => {
    setEditedProposal(prev => ({
      ...prev,
      objectives: [...(prev.objectives || []), ""]
    }));
  };

  // Remove objective
  const removeObjective = (index) => {
    const newObjectives = [...(editedProposal.objectives || [])];
    newObjectives.splice(index, 1);
    setEditedProposal(prev => ({
      ...prev,
      objectives: newObjectives
    }));
  };

  // Handle budget change
  const handleBudgetChange = (field, value) => {
    setEditedProposal(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        [field]: parseFloat(value) || 0
      }
    }));
  };

  // Submit revised proposal
  const handleResubmit = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      
      // First update the project
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/scientist/project/${proposal.id}`,
        editedProposal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Then resubmit
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/scientist/project/${proposal.id}/submit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Refresh the page or update proposal
      window.location.reload();
      
    } catch (error) {
      console.error("Error resubmitting proposal:", error);
      setError(error.response?.data?.message || "Failed to resubmit proposal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Proposal Details
        </h1>
        
        {/* Edit Button - Only show when revision required */}
        {canEdit && !isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Edit size={16} />
            Edit Proposal
          </button>
        )}
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-1 text-blue-500 text-sm mb-6"
      >
        <ArrowLeft size={16} />
        Back to list
      </button>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Layout */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT SECTION */}
        <div className="col-span-9 space-y-6">

          {/* Proposal Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-sm text-gray-700 shadow-sm">

            <h3 className="font-semibold text-gray-800 text-base border-b pb-3 mb-5">
              Proposal Details
            </h3>

            <div className="space-y-7">
              {isEditing ? (
                // Edit Mode
                <>
                  {/* Title - Editable */}
                  <div>
                    <label className="font-semibold text-gray-600 mb-1 block">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={editedProposal.title || ""}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Discipline - Editable */}
                  <div>
                    <label className="font-semibold text-gray-600 mb-1 block">
                      Discipline
                    </label>
                    <select
                      value={editedProposal.discipline || ""}
                      onChange={(e) => handleInputChange("discipline", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select Discipline</option>
                      <option value="COMPUTER_SCIENCE">Computer Science</option>
                      <option value="AGRICULTURE">Agriculture</option>
                      <option value="BIOTECHNOLOGY">Biotechnology</option>
                      <option value="MECHANICAL">Mechanical</option>
                      <option value="CIVIL">Civil</option>
                      <option value="Soil Science">Soil Science</option>
                      <option value="Crop Science">Crop Science</option>
                      <option value="Forestry">Forestry</option>
                      <option value="Food Technology">Food Technology</option>
                    </select>
                  </div>

                  {/* Introduction - Editable */}
                  <div>
                    <label className="font-semibold text-gray-600 mb-1 block">
                      Introduction & Rationale
                    </label>
                    <textarea
                      value={editedProposal.introduction || ""}
                      onChange={(e) => handleInputChange("introduction", e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Objectives - Editable */}
                  <div>
                    <label className="font-semibold text-gray-600 mb-1 block">
                      Objectives
                    </label>
                    {(editedProposal.objectives || []).map((obj, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={obj}
                          onChange={(e) => handleObjectiveChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                          onClick={() => removeObjective(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addObjective}
                      className="text-blue-500 text-sm hover:underline mt-2"
                    >
                      + Add Objective
                    </button>
                  </div>

                  {/* Budget - Editable */}
                  <div>
                    <label className="font-semibold text-gray-600 mb-2 block">
                      Budget Details
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Non Recurring</label>
                          <input
                            type="number"
                            value={editedProposal.budget?.nonRecurring || 0}
                            onChange={(e) => handleBudgetChange("nonRecurring", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Recurring Contingency</label>
                          <input
                            type="number"
                            value={editedProposal.budget?.recurringContingency || 0}
                            onChange={(e) => handleBudgetChange("recurringContingency", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Travelling Allowances</label>
                          <input
                            type="number"
                            value={editedProposal.budget?.travellingAllowances || 0}
                            onChange={(e) => handleBudgetChange("travellingAllowances", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Operational Expenses</label>
                          <input
                            type="number"
                            value={editedProposal.budget?.operationalExpenses || 0}
                            onChange={(e) => handleBudgetChange("operationalExpenses", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Manpower</label>
                        <input
                          type="number"
                          value={editedProposal.budget?.manpower || 0}
                          onChange={(e) => handleBudgetChange("manpower", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Edit Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleResubmit}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      <Save size={16} />
                      {loading ? "Resubmitting..." : "Resubmit Proposal"}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                // View Mode
                <>
                  <Block label="Principal Scientist" value={proposal.submittedBy?.name || "N/A"} />
                  <Block label="Project Title" value={proposal.title || "N/A"} />
                  <Block label="Discipline" value={proposal.discipline?.replaceAll("_", " ") || "N/A"} />
                  
                  <div>
                    <p className="font-semibold text-gray-600 mb-2">Introduction & Rationale</p>
                    <p className="text-gray-700 leading-7">{proposal.introduction || "No introduction available"}</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-600 mb-2">Objectives</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Block label="Budget" value={`₹ ${proposal.budget?.grandTotal || 0}`} />
                </>
              )}
            </div>
          </div>

          {/* Review Section - Only show when review is available */}
          {isFinalDecision && proposal.finalComment && !isEditing && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 text-base mb-4">
                Review Decision
              </h3>
              <div className={`mb-4 inline-block text-xs px-3 py-1 rounded-full font-medium ${
                proposal.status === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : proposal.status === "REJECTED"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {proposal.status?.replaceAll("_", " ") || "PENDING"}
              </div>
              <textarea
                value={proposal.finalComment || "No review comment available"}
                readOnly
                className="w-full h-40 border border-gray-200 rounded-lg p-4 resize-none focus:outline-none bg-gray-50"
              />
            </div>
          )}

          {/* Revision Required Message with Edit Prompt */}
          {proposal.status === "REVISION_REQUIRED" && !isEditing && (
            <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 shadow-sm">
              <h3 className="font-semibold text-yellow-800 text-base mb-2">
                Revision Required
              </h3>
              <p className="text-yellow-700 text-sm mb-4">
                The reviewer has requested changes to your proposal. Please review their comments and make necessary revisions.
              </p>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Edit size={16} />
                Edit and Resubmit
              </button>
            </div>
          )}

          {/* Under Review Message */}
          {proposal.status === "UNDER_REVIEW" && (
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 shadow-sm">
              <h3 className="font-semibold text-blue-800 text-base mb-2">
                Under Review
              </h3>
              <p className="text-blue-700 text-sm">
                Your proposal is currently being reviewed by the assigned reviewer. 
                You will be notified once the review is complete.
              </p>
            </div>
          )}

          {/* Submitted Message */}
          {proposal.status === "SUBMITTED" && (
            <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 shadow-sm">
              <h3 className="font-semibold text-yellow-800 text-base mb-2">
                Awaiting Reviewer Assignment
              </h3>
              <p className="text-yellow-700 text-sm">
                Your proposal has been submitted and is waiting for an admin to assign a reviewer.
              </p>
            </div>
          )}

        </div>

        {/* RIGHT SECTION - Same as before */}
        <div className="col-span-3 space-y-6">
          {/* Similarity Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">Similarity Analysis</h3>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">Similarity Score</span>
              <span className={`font-semibold ${
                proposal.similarityScore >= 70 
                  ? "text-red-500" 
                  : proposal.similarityScore >= 40 
                  ? "text-yellow-500" 
                  : "text-green-500"
              }`}>
                {proposal.similarityScore || 0}%
              </span>
            </div>
            <div className={`text-xs px-3 py-2 rounded-full ${
              proposal.similarityScore >= 70
                ? "bg-red-100 text-red-700"
                : proposal.similarityScore >= 40
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}>
              {proposal.similarityScore >= 70
                ? "⚠ High Similarity Detected"
                : proposal.similarityScore >= 40
                ? "⚠ Moderate Similarity Detected"
                : "✓ No Significant Similarity"}
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">Proposal Status</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                  proposal.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : proposal.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : proposal.status === "REVISION_REQUIRED"
                    ? "bg-yellow-100 text-yellow-700"
                    : proposal.status === "UNDER_REVIEW"
                    ? "bg-blue-100 text-blue-700"
                    : proposal.status === "SUBMITTED"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {proposal.status?.replaceAll("_", " ") || "DRAFT"}
                </div>

                {shouldShowReviewer && proposal.assignedReviewer && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Assigned Reviewer</p>
                    <p className="font-semibold text-sm text-gray-800">{proposal.assignedReviewer.name}</p>
                    <p className="text-xs text-gray-500">{proposal.assignedReviewer.email}</p>
                    {proposal.assignedReviewer.institution && (
                      <p className="text-xs text-gray-500 mt-1">{proposal.assignedReviewer.institution}</p>
                    )}
                  </div>
                )}

                {proposal.status === "UNDER_REVIEW" && proposal.assignedReviewer && (
                  <p className="text-xs text-blue-600 mt-3">Review in progress...</p>
                )}

                {proposal.submittedAt && (
                  <p className="text-xs text-gray-400 mt-3">Submitted: {new Date(proposal.submittedAt).toLocaleDateString()}</p>
                )}
                {proposal.approvedAt && (
                  <p className="text-xs text-green-600 mt-1">Approved: {new Date(proposal.approvedAt).toLocaleDateString()}</p>
                )}
                {proposal.rejectedAt && (
                  <p className="text-xs text-red-600 mt-1">Rejected: {new Date(proposal.rejectedAt).toLocaleDateString()}</p>
                )}
                {proposal.revisionRequestedAt && (
                  <p className="text-xs text-yellow-600 mt-1">Revision Requested: {new Date(proposal.revisionRequestedAt).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-gray-600 mb-1">{label}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}