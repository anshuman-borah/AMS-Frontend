import toast from "react-hot-toast";
import FormField from "../../components/FormField";
export default function Step4({ form, update }) {
  const total =
    (Number(form.nonRecurring) || 0) +
    (Number(form.recurringContingency) || 0) +
    (Number(form.travellingAllowances) || 0) +
    (Number(form.operationalExpenses) || 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Budget Breakdown
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Non Recurring */}
        <FormField
          label="Non Recurring"
          value={form.nonRecurring}
          onChange={(value) => {
            
            if (/^\d*\.?\d*$/.test(value)){
               update("nonRecurring")(value) ;
               }   else {
                toast.error("Only Numbers are allowed ") ; 
               }         
          } }
          placeholder="Enter Amount"
        />

        {/* Recurring Contingency */}
        <FormField
          label="Recurring Contingency"
          value={form.recurringContingency}
          onChange={(value) => {

           if (/^\d*\.?\d*$/.test(value)) {
                  update("recurringContingency")(value);
          } else {
                    toast.error("Only numbers are allowed");
               }
           }}
          placeholder="Enter Amount"
        />

        {/* Travelling Allowances */}
        <FormField
          label="Travelling Allowances"
          value={form.travellingAllowances}
          onChange={(value)=>{
            if (/^\d*\.?\d*$/.test(value)) {
              update("travellingAllowances")(value) ; 
            }else {
              toast.error("Only numbers are allowed");
            }
          }
        }
          placeholder="Enter Amount"
        />

        {/* Operational Expenses */}
        <FormField
          label="Operational Expenses"
          value={form.operationalExpenses}
          onChange={(value) =>{
            if (/^\d*\.?\d*$/.test(value)) {
              update("operationalExpenses")(value) ; 
            }else {
              toast.error("Only numbers are allowed") ; 
            }
          }
        }
          placeholder="Enter Amount"
        />

        {/* Manpower */}
             <FormField
             label="Manpower"
             value={form.manpower}
             onChange={(value) => {

                  if (/^\d*\.?\d*$/.test(value)) {
               update("manpower")(value);
             } else {
               toast.error("Only numbers are allowed");
            }

           }}
           placeholder="Enter required manpower"
          />

        {/* Grand Total */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Grand Total
          </label>

          <div className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-gray-50 text-gray-700 font-medium">
            ₹{total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}