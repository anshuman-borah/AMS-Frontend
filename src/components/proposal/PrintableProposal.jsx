// PrintableProposal.jsx
// Hidden off-screen component captured by html2canvas for PDF generation.
// Never visible to the user — positioned at -9999px via parent ref div.

export default function PrintableProposal({ form }) {
  const totalBudget = [
    form.nonRecurring,
    form.recurringContingency,
    form.travellingAllowances,
    form.operationalExpenses,
    form.manpower,
  ]
    .reduce((sum, v) => sum + (parseFloat(v) || 0), 0)
    .toFixed(2);

  return (
    <div style={{ fontFamily: "Georgia, serif", color: "#111", lineHeight: 1.6 }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px", borderBottom: "2px solid #1a3c6e", paddingBottom: "16px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "bold", margin: 0, color: "#1a3c6e" }}>
          RESEARCH PROPOSAL
        </h1>
        <p style={{ fontSize: "12px", color: "#555", margin: "4px 0 0" }}>
          Submitted for Review
        </p>
      </div>

      {/* Basic Information */}
      <Section title="1. Basic Information">
        <TwoColRow label="Unique Code" value={form.uniqueCode} />
        <TwoColRow
          label="Station"
          value={form.stationOrCollege}
        />
        <TwoColRow label="Year" value={form.year} />
        <TwoColRow label="Teacher Name" value={form.teacherName} />
        <TwoColRow label="Discipline" value={form.discipline} />
      </Section>

      {/* Details */}
      <Section title="2. Proposal Details">
        <TwoColRow label="Title" value={form.title} />
        <BlockRow label="Introduction" value={form.introduction} />
        <BlockRow label="Action Plan" value={form.actionPlan} />
      </Section>

      {/* Objectives */}
      <Section title="3. Objectives">
        {form.objectives.length > 0 ? (
          form.objectives.map((obj, i) => (
            <p key={i} style={{ margin: "4px 0", fontSize: "13px" }}>
              {i + 1}. {obj || <em style={{ color: "#999" }}>—</em>}
            </p>
          ))
        ) : (
          <p style={{ color: "#999", fontSize: "13px" }}>No objectives listed.</p>
        )}
      </Section>

      {/* Budget */}
      <Section title="4. Budget Breakdown">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ backgroundColor: "#1a3c6e", color: "#fff" }}>
              <th style={thStyle}>Scientist Name</th>
              <th style={thStyle}>Non Recurring</th>
              <th style={thStyle}>Recurring Contingency</th>
            </tr>
          </thead>

          <tbody>
            {form.scientistInvolve.map((s, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "#fff" : "#f5f7fa",
                }}
              >
                <td style={tdStyle}>
                  {s.scientistName || "—"}
                </td>

                <td style={tdStyle}>
                  ₹ {s.nonRecurring || 0}
                </td>

                <td style={tdStyle}>
                  ₹ {s.recurringContingency || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Outcome */}
      <Section title="5. Expected Outcome">
        <BlockRow label="" value={form.expectedOutcome} />
      </Section>

    
      {/* Scientists */}
      <Section title="6. Scientists Involved">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#1a3c6e",
                color: "#fff",
              }}
            >
              <th style={thStyle}>Scientist Name</th>

              <th style={thStyle}>Non Recurring</th>

              <th style={thStyle}>
                Recurring Contingency
              </th>
            </tr>
          </thead>

          <tbody>
            {form.scientistInvolve.map((s, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "#fff" : "#f5f7fa",
                }}
              >
                <td style={tdStyle}>
                  {s.scientistName || "—"}
                </td>

                <td style={tdStyle}>
                  ₹ {s.nonRecurring || 0}
                </td>

                <td style={tdStyle}>
                  ₹ {s.recurringContingency || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Footer */}
      <div style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "12px", fontSize: "11px", color: "#888", textAlign: "center" }}>
        Generated on {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2 style={{
        fontSize: "14px",
        fontWeight: "bold",
        color: "#1a3c6e",
        borderBottom: "1px solid #c0cfe8",
        paddingBottom: "4px",
        marginBottom: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function TwoColRow({ label, value }) {
  return (
    <div style={{ display: "flex", marginBottom: "5px", fontSize: "13px" }}>
      <span style={{ fontWeight: "600", width: "200px", flexShrink: 0, color: "#444" }}>
        {label}:
      </span>
      <span style={{ color: "#222" }}>{value || "—"}</span>
    </div>
  );
}

function BlockRow({ label, value }) {
  return (
    <div style={{ marginBottom: "10px", fontSize: "13px" }}>
      {label && (
        <p style={{ fontWeight: "600", marginBottom: "3px", color: "#444" }}>{label}:</p>
      )}
      <p style={{ color: "#222", paddingLeft: label ? "12px" : "0", margin: 0, whiteSpace: "pre-wrap" }}>
        {value || "—"}
      </p>
    </div>
  );
}

function BudgetRow({ label, value, shade }) {
  return (
    <tr style={{ backgroundColor: shade ? "#f5f7fa" : "#fff" }}>
      <td style={tdStyle}>{label}</td>
      <td style={{ ...tdStyle, textAlign: "right" }}>
        ₹ {parseFloat(value || 0).toFixed(2)}
      </td>
    </tr>
  );
}

const thStyle = {
  padding: "8px 12px",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "12px",
};

const tdStyle = {
  padding: "7px 12px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "13px",
};