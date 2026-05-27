import { useState } from "react";
import { useParams } from "react-router-dom";
import { agents } from "../data/agents";
import { runAgent } from "../services/api";

const agentImages = {
  "guidance-agent":
    "https://wallpapercave.com/wp/wp2406887.jpg",

  "test-suggestion-agent":
    "https://www.verywellhealth.com/thmb/x3i-NU6vbf1EkHJ3UNgVZnLAvcg=/5500x4125/filters:no_upscale():max_bytes(150000):strip_icc()/scientist-holding-dna-gel-in-front-of-samples-for-testing-in-laboratory-530021923-59efa7d603f40200104e9ca1.jpg",

  "sample-process-agent":
    "https://images.squarespace-cdn.com/content/v1/5cd9d220b9144961e979cbcb/1567105263167-2CJYKA57OVJGYMNJQXW4/Nurse+taking+DNA+sample+with+swab+from+little+girl.jpg",

  "report-simplifier-agent":
    "https://static.vecteezy.com/system/resources/previews/011/431/925/non_2x/microscope-and-scientists-changing-dna-structure-genetic-engineering-genetic-modification-and-genetic-manipulation-concept-on-white-background-flat-modern-illustration-vector.jpg",

  "recommendation-agent":
    "https://img.freepik.com/premium-photo/biomedical-laboratory_672709-8206.jpg",

  "escalation-agent":
    "https://oxfordhealthspan.com/cdn/shop/articles/Telomere_Shortening_Hallmarks_of_Aging_Oxford_Healthspan.png?v=1687877123&width=1200",
};

const inputStyle =
  "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400";

const textareaStyle =
  "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 h-28 resize-none text-white placeholder-gray-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400";

const AgentPage = () => {
  const { agentId } = useParams();

  const agent = agents.find(
    (a) => a.id === agentId || String(a.id) === agentId
  );

  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!agent) return <h1>Agent not found</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const patient = {
      fullName: "Test Patient",
      age: formData.age || "25",
      sex:
        formData.sex === "Male" || formData.sex === "Female"
          ? formData.sex
          : "Female",
      bloodGroup: formData.bloodGroup || "O+",
      familyHistory: formData.familyHistory || "No",
      knownDisorder: formData.knownDisorder || "None",
      symptoms: formData.symptoms || "None",
      purpose: formData.purpose || "General",
      consultedDoctor: formData.consultedDoctor || "No",
      medications: formData.medications || "None",
      location: formData.location || "Mumbai",
      emergencyContact:
        formData.emergencyContact || "9876543210",
      emergencyContactName:
        formData.emergencyContactName || "Test Contact",
    };

    const response = await runAgent(
      agentId,
      { ...formData },
      patient
    );

    setResult(response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-10 px-4">

      {/* BACKGROUND IMAGE */}
      <img
        src={agentImages[agentId]}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10">

        {/* MAIN CARD */}
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">

          {/* HEADER */}
          {/* HEADER */}
<div className="text-center py-4 px-6 border-b border-white/10">
  <h1 className="text-3xl font-bold text-white tracking-wide">
    GeneGuard
  </h1>

  <p className="text-gray-400 mt-1 text-sm">
    AI Powered Genetic Risk Assessment Platform
  </p>
</div>

          {/* TOP IMAGE */}
          <div className="p-6">
            <img
              src={agentImages[agentId]}
              className="w-full h-72 object-cover rounded-2xl opacity-90"
            />
          </div>

          {/* FORM SECTION */}
          <div className="p-8 md:p-10">

            {/* AGENT INFO */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                {agent.name}
              </h2>

              <p className="text-gray-300 mt-2">
                {agent.description}
              </p>
            </div>

            {/* FORM GRID */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* GUIDANCE AGENT */}
              {agentId === "guidance-agent" && (
                <>
                  <input
                    name="age"
                    placeholder="Age"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <select
  name="sex"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Select Sex
  </option>

  <option value="Male" className="text-black">
    Male
  </option>

  <option value="Female" className="text-black">
    Female
  </option>
</select>

                  <select
  name="familyHistory"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Family History
  </option>

  <option value="Yes" className="text-black">
    Yes
  </option>

  <option value="No" className="text-black">
    No
  </option>
</select>

                  <input
                    name="knownDisorder"
                    placeholder="Known Disorder"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <input
                    name="symptoms"
                    placeholder="Symptoms"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <input
                    name="purpose"
                    placeholder="Purpose"
                    className={inputStyle}
                    onChange={handleChange}
                  />
                </>
              )}

              {/* TEST SUGGESTION */}
              {agentId === "test-suggestion-agent" && (
                <>
                  <select
  name="familyHistory"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Family History
  </option>

  <option value="Yes" className="text-black">
    Yes
  </option>

  <option value="No" className="text-black">
    No
  </option>
</select>

                  <input
                    name="goal"
                    placeholder="Goal"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <input
                    name="urgency"
                    placeholder="Urgency"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <input
                    name="bloodGroup"
                    placeholder="Blood Group"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <select
  name="reportAvailable"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Report Available?
  </option>

  <option value="Yes" className="text-black">
    Yes
  </option>

  <option value="No" className="text-black">
    No
  </option>
</select>
                </>
              )}

              {/* SAMPLE PROCESS */}
              {agentId === "sample-process-agent" && (
                <>
                  <input
                    name="testType"
                    placeholder="Test Type"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <select
  name="samplePreference"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Sample Preference
  </option>

  <option value="Blood" className="text-black">
    Blood
  </option>

  <option value="Saliva" className="text-black">
    Saliva
  </option>

  <option value="Buccal Swab" className="text-black">
    Buccal Swab
  </option>
</select>

                  <select
  name="fastingStatus"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Fasting Required?
  </option>

  <option value="Yes" className="text-black">
    Yes
  </option>

  <option value="No" className="text-black">
    No
  </option>
</select>

                  <select
  name="shippingMode"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Shipping Mode
  </option>

  <option value="Home Kit Pickup" className="text-black">
    Home Kit Pickup
  </option>

  <option value="Visit Lab" className="text-black">
    Visit Lab
  </option>
</select>

                  <input
                    name="familyMemberRelation"
                    placeholder="Family Member Relation"
                    className={inputStyle}
                    onChange={handleChange}
                  />
                </>
              )}

              {/* REPORT SIMPLIFIER */}
              {agentId === "report-simplifier-agent" && (
                <>
                  <select
  name="riskLevel"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Risk Level
  </option>

  <option value="Low" className="text-black">
    Low
  </option>

  <option value="Moderate" className="text-black">
    Moderate
  </option>

  <option value="High" className="text-black">
    High
  </option>
</select>

                  <input
                    name="findingType"
                    placeholder="Finding Type"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <input
                    name="geneName"
                    placeholder="Gene Name"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <div className="md:col-span-2">
                    <textarea
                      name="clinicalNote"
                      placeholder="Clinical Note"
                      className={textareaStyle}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* RECOMMENDATION */}
              {agentId === "recommendation-agent" && (
                <>
                   <select
  name="riskLevel"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Risk Level
  </option>

  <option value="Low" className="text-black">
    Low
  </option>

  <option value="Moderate" className="text-black">
    Moderate
  </option>

  <option value="High" className="text-black">
    High
  </option>
</select>
                  <select
  name="consultedDoctor"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Consulted Doctor?
  </option>

  <option value="Yes" className="text-black">
    Yes
  </option>

  <option value="No" className="text-black">
    No
  </option>
</select>

                 <select
  name="familyHistory"
  defaultValue=""
  className={`${inputStyle} text-white`}
  onChange={handleChange}
>
  <option value="" disabled hidden className="text-gray-700">
    Family History
  </option>

  <option value="Yes" className="text-black">
    Yes
  </option>

  <option value="No" className="text-black">
    No
  </option>
</select>

                  <input
                    name="goal"
                    placeholder="Goal"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <input
                    name="medications"
                    placeholder="Medications"
                    className={inputStyle}
                    onChange={handleChange}
                  />
                </>
              )}

              {/* ESCALATION */}
              {agentId === "escalation-agent" && (
                <>
                  <div className="md:col-span-2 bg-red-500/20 border border-red-400 text-red-200 p-4 rounded-xl">
                    ⚠️ High-risk case detected. Immediate
                    attention recommended.
                  </div>

                  <select
                    name="riskLevel"
                    defaultValue=""
                    className={`${inputStyle} text-white`}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden className="text-gray-700">
                      Risk Level
                    </option>
                    <option value="Low" className="text-black">
                      Low
                    </option>
                    <option value="Moderate" className="text-black">
                      Moderate
                    </option>
                    <option value="High" className="text-black">
                      High
                    </option>
                  </select>

                  <input
                    name="location"
                    placeholder="Location"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <input
                    name="emergencyContactName"
                    placeholder="Emergency Contact Name"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <input
                    name="emergencyContact"
                    placeholder="Emergency Contact Number"
                    className={inputStyle}
                    onChange={handleChange}
                  />

                  <div className="md:col-span-2">
                    <textarea
                      name="symptoms"
                      placeholder="Symptoms"
                      className={textareaStyle}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="mt-8 w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/30"
            >
              Run Agent
            </button>

            {/* LOADING */}
            {loading && (
              <div className="flex justify-center mt-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RESULT CARD */}
        {result && (
          <div className="max-w-5xl mx-auto mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

            <h2 className="text-2xl font-bold text-white mb-4">
              {result.output?.title || "Result"}
            </h2>

            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
              {result.output?.summary ||
                "No response received"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentPage;