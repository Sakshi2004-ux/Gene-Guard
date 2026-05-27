const cityCoordinates = {
  mumbai: { lat: 19.076, lng: 72.8777 },
  pune: { lat: 18.5204, lng: 73.8567 },
  delhi: { lat: 28.6139, lng: 77.209 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
  bengaluru: { lat: 12.9716, lng: 77.5946 },
  hyderabad: { lat: 17.385, lng: 78.4867 },
  chennai: { lat: 13.0827, lng: 80.2707 },
  kolkata: { lat: 22.5726, lng: 88.3639 },
  ahmedabad: { lat: 23.0225, lng: 72.5714 },
};

const normalize = (value) => (value ?? '').toString().trim();
export const titleCase = (key) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase());

export const getCoords = (location = '') => {
  const lower = location.toLowerCase();
  const match = Object.keys(cityCoordinates).find((city) => lower.includes(city));
  return match ? cityCoordinates[match] : { lat: 19.076, lng: 72.8777 };
};

export const dnaAgentConfigs = [
  {
    id: 'guidance-agent',
    name: 'User Guidance Agent',
    shortName: 'Guidance',
    icon: '🧭',
    subtitle: 'Screens need, family history, and current testing readiness.',
    purpose: 'Helps the patient start with the most suitable DNA testing journey.',
    quickPoints: ['Screening path', 'Need analysis', 'Safer direction'],
    inputs: [
      { name: 'age', label: 'Age', type: 'number', min: 1, max: 100, placeholder: 'Enter age' },
      { name: 'sex', label: 'Sex', type: 'select', options: ['Female', 'Male', 'Other'] },
      { name: 'familyHistory', label: 'Family history of genetic disorder?', type: 'select', options: ['No', 'Yes'] },
      { name: 'knownDisorder', label: 'Known disorder in family', type: 'text', placeholder: 'Example: Thalassemia, BRCA history' },
      { name: 'symptoms', label: 'Current concern level', type: 'select', options: ['No symptoms', 'Mild symptoms', 'Recurring symptoms', 'Severe'] },
      { name: 'purpose', label: 'Purpose of test', type: 'select', options: ['General awareness', 'Health risk check', 'Inherited disease concern', 'Family planning'] },
    ],
  },
  {
    id: 'test-suggestion-agent',
    name: 'Test Suggestion Agent',
    shortName: 'Test Suggestion',
    icon: '🧪',
    subtitle: 'Recommends the most suitable DNA test category.',
    purpose: 'Reduces confusion and suggests the next best testing lane.',
    quickPoints: ['Smart path', 'Reduced confusion', 'Action ready'],
    inputs: [
      { name: 'familyHistory', label: 'Family history present?', type: 'select', options: ['No', 'Yes'] },
      { name: 'goal', label: 'Primary goal', type: 'select', options: ['General awareness', 'Health risk screening', 'Inherited disease check', 'Pregnancy / family planning', 'Lifestyle / wellness'] },
      { name: 'urgency', label: 'How urgent is this?', type: 'select', options: ['Routine', 'Need clarity soon', 'High concern'] },
      { name: 'bloodGroup', label: 'Blood group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
      { name: 'reportAvailable', label: 'Do you already have a report?', type: 'select', options: ['No', 'Yes'] },
    ],
  },
  {
    id: 'sample-process-agent',
    name: 'Sample Process Agent',
    shortName: 'Sample Process',
    icon: '📦',
    subtitle: 'Explains sample type, precautions, and collection timeline.',
    purpose: 'Makes the real sample collection process easier and less confusing.',
    quickPoints: ['Step guidance', 'Precautions', 'Timeline clarity'],
    inputs: [
      { name: 'testType', label: 'Selected test type', type: 'select', options: ['Health risk screening', 'Carrier screening', 'Hereditary disorder testing', 'Lifestyle / wellness'] },
      { name: 'samplePreference', label: 'Preferred sample type', type: 'select', options: ['Saliva', 'Blood', 'Not sure'] },
      { name: 'fastingStatus', label: 'Followed food restriction?', type: 'select', options: ['Yes', 'No'] },
      { name: 'shippingMode', label: 'Sample submission mode', type: 'select', options: ['Home kit pickup', 'Self courier', 'Hospital / clinic visit'] },
      { name: 'familyMemberRelation', label: 'Family member relation if comparative test is needed', type: 'text', placeholder: 'Example: Mother, Father, Sibling' },
    ],
  },
  {
    id: 'report-simplifier-agent',
    name: 'Report Simplifier Agent',
    shortName: 'Report Simplifier',
    icon: '📊',
    subtitle: 'Converts complex findings into simple language.',
    purpose: 'Summarizes marker, mutation, and gene findings in user-friendly form.',
    quickPoints: ['Plain language', 'Risk summary', 'User friendly'],
    inputs: [
      { name: 'riskLevel', label: 'Observed report risk level', type: 'select', options: ['Low', 'Moderate', 'High'] },
      { name: 'findingType', label: 'Main finding type', type: 'select', options: ['Gene variation', 'Mutation marker', 'Carrier status', 'No major finding'] },
      { name: 'geneName', label: 'Gene / marker name', type: 'text', placeholder: 'Example: BRCA1, HBB, MTHFR' },
      { name: 'clinicalNote', label: 'Short note from report', type: 'textarea', placeholder: 'Paste one short line from the report...' },
    ],
  },
  {
    id: 'recommendation-agent',
    name: 'Recommendation Agent',
    shortName: 'Recommendation',
    icon: '💡',
    subtitle: 'Suggests practical next steps after the report.',
    purpose: 'Guides the patient on next actions without replacing a doctor or lab.',
    quickPoints: ['Next steps', 'Safer plan', 'No final diagnosis'],
    inputs: [
      { name: 'riskLevel', label: 'Current risk level', type: 'select', options: ['Low', 'Moderate', 'High'] },
      { name: 'consultedDoctor', label: 'Already consulted a doctor?', type: 'select', options: ['No', 'Yes'] },
      { name: 'familyHistory', label: 'Family history present?', type: 'select', options: ['No', 'Yes'] },
      { name: 'goal', label: 'What do you want help with?', type: 'select', options: ['Understand next steps', 'Lifestyle guidance', 'Need specialist direction', 'Regular screening plan'] },
      { name: 'medications', label: 'Current medications', type: 'text', placeholder: 'Example: Iron, folic acid, none' },
    ],
  },
  {
    id: 'escalation-agent',
    name: 'Escalation Agent',
    shortName: 'Escalation',
    icon: '🚨',
    subtitle: 'Creates alerts, opens map guidance, and starts emergency contact actions.',
    purpose: 'Flags high-risk profiles and prepares rapid support actions.',
    quickPoints: ['High-risk alert', 'Map support', 'Emergency contact'],
    inputs: [
      { name: 'riskLevel', label: 'Current risk level', type: 'select', options: ['Low', 'Moderate', 'High'] },
      { name: 'location', label: 'Current city / area', type: 'text', placeholder: 'Example: Mumbai Central' },
      { name: 'emergencyContact', label: 'Emergency contact number', type: 'text', placeholder: 'Example: 9876543210' },
      { name: 'emergencyContactName', label: 'Emergency contact name', type: 'text', placeholder: 'Example: Asha Singh' },
      { name: 'symptoms', label: 'Urgency symptoms', type: 'select', options: ['Stable', 'Concerning', 'Severe'] },
    ],
  },
];

export const getAgentById = (id) => dnaAgentConfigs.find((agent) => agent.id === id);

export const buildTimelineSeries = (patient = {}, evaluation = null) => {
  const computed = evaluation || evaluatePatient(patient);
  const base = computed.charts.find((item) => item.label === 'Risk score')?.value || 35;
  const historyBoost = normalize(patient.familyHistory) === 'Yes' ? 12 : 0;
  const symptomBoost = ['Recurring symptoms', 'Severe'].includes(normalize(patient.symptoms)) ? 10 : 0;
  const reportBoost = normalize(patient.reportRisk) === 'High' ? 14 : normalize(patient.reportRisk) === 'Moderate' ? 8 : 0;
  const values = [
    Math.max(8, base - 22 - historyBoost),
    Math.max(12, base - 8),
    Math.min(98, base + historyBoost + symptomBoost - 4),
    Math.min(98, base + reportBoost + symptomBoost + 8),
    Math.min(98, base + historyBoost + reportBoost + symptomBoost),
  ];
  return [
    { label: 'Intake', value: values[0] },
    { label: 'History', value: values[1] },
    { label: 'Sampling', value: values[2] },
    { label: 'Report', value: values[3] },
    { label: 'Follow-up', value: values[4] },
  ];
};

export const evaluatePatient = (patient = {}) => {
  const age = Number(patient.age || 0);
  const familyHistory = normalize(patient.familyHistory);
  const symptoms = normalize(patient.symptoms);
  const purpose = normalize(patient.purpose || patient.goal);
  const reportRisk = normalize(patient.reportRisk || patient.riskLevel);
  const bloodGroup = normalize(patient.bloodGroup);
  const consultedDoctor = normalize(patient.consultedDoctor);
  const knownDisorder = normalize(patient.knownDisorder);
  const familyMemberCount = Number(patient.familyMemberCount || 0);

  let riskScore = 16;
  if (age >= 35) riskScore += 8;
  if (age >= 45) riskScore += 8;
  if (familyHistory === 'Yes') riskScore += 22;
  if (familyMemberCount >= 2) riskScore += 8;
  if (knownDisorder) riskScore += 6;
  if (symptoms === 'Recurring symptoms') riskScore += 16;
  if (symptoms === 'Severe') riskScore += 28;
  if (purpose === 'Inherited disease concern') riskScore += 18;
  if (purpose === 'Family planning') riskScore += 10;
  if (reportRisk === 'Moderate') riskScore += 14;
  if (reportRisk === 'High') riskScore += 26;
  if (bloodGroup === 'O-' || bloodGroup === 'AB-') riskScore += 2;

  riskScore = Math.min(96, Math.max(8, riskScore));
  const urgencyScore = Math.min(100, Math.round(riskScore * 0.86 + (familyHistory === 'Yes' ? 10 : 0) + (symptoms === 'Severe' ? 8 : 0)));
  const readinessScore = Math.max(24, 100 - Math.round(riskScore * 0.42) + (consultedDoctor === 'Yes' ? 8 : 0));
  const adherenceScore = Math.min(98, consultedDoctor === 'Yes' ? 84 : 54 + (patient.emergencyContact ? 6 : 0));
  const inheritanceScore = Math.min(96, 12 + (familyHistory === 'Yes' ? 38 : 10) + familyMemberCount * 6 + (knownDisorder ? 8 : 0));

  const level = riskScore >= 72 ? 'High' : riskScore >= 42 ? 'Moderate' : 'Low';
  const lane = level === 'High' ? 'Priority clinical review' : level === 'Moderate' ? 'Guided testing workflow' : 'Awareness and routine follow-up';

  const charts = [
    { label: 'Risk score', value: riskScore },
    { label: 'Urgency score', value: urgencyScore },
    { label: 'Testing readiness', value: readinessScore },
    { label: 'Family inheritance index', value: inheritanceScore },
    { label: 'Follow-up adherence', value: adherenceScore },
  ];

  return {
    level,
    lane,
    alertActive: level === 'High' || symptoms === 'Severe',
    charts,
    timeline: buildTimelineSeries(patient, { charts }),
    summary: `${level} profile detected. Recommended care lane: ${lane}.`,
  };
};

export const buildOpenMapUrl = (location, coords) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location || `${coords.lat},${coords.lng}`)}`;

export const buildSmsUrl = (phone, message) => `sms:${phone}?body=${encodeURIComponent(message)}`;
export const buildTelUrl = (phone) => `tel:${phone}`;

export const runAgent = (agentId, formData = {}, patient = {}) => {
  const safe = (key) => normalize(formData[key] ?? patient[key]);
  const mergedPatient = { ...patient, ...formData };
  const evaluation = evaluatePatient(mergedPatient);
  const preferredName = safe('fullName') || 'the patient';

  if (agentId === 'guidance-agent') {
    const purpose = safe('purpose');
    const pathway =
      purpose === 'Family planning'
        ? 'Carrier screening with counselling'
        : purpose === 'Inherited disease concern'
        ? 'Hereditary disorder testing'
        : purpose === 'Health risk check'
        ? 'Health risk screening'
        : 'General awareness DNA testing';

    return {
      title: 'Initial Guidance Summary',
      status: `${evaluation.level} attention`,
      summary: `${preferredName} is best suited for ${pathway.toLowerCase()} with ${evaluation.level.toLowerCase()} monitoring priority.`,
      highlights: [
        { label: 'Recommended lane', value: pathway },
        { label: 'Family history', value: safe('familyHistory') || 'Not provided' },
        { label: 'Known disorder', value: safe('knownDisorder') || 'Not provided' },
        { label: 'Concern level', value: safe('symptoms') || 'Not provided' },
      ],
      nextSteps: [
        `Begin with ${pathway}.`,
        safe('familyHistory') === 'Yes' ? 'Keep previous family medical history and reports ready.' : 'Keep basic health details ready for first consultation.',
        'Move to the Test Suggestion Agent for the next specific category.',
      ],
    };
  }

  if (agentId === 'test-suggestion-agent') {
    const goal = safe('goal');
    const urgency = safe('urgency');
    const familyHistory = safe('familyHistory');
    let recommendation = 'Lifestyle / wellness DNA test';
    if (goal === 'Health risk screening') recommendation = 'Health risk screening';
    if (goal === 'Inherited disease check') recommendation = 'Hereditary disorder testing';
    if (goal === 'Pregnancy / family planning') recommendation = 'Carrier screening';
    if (familyHistory === 'Yes' && goal !== 'Lifestyle / wellness') recommendation = 'Hereditary disorder testing';

    return {
      title: 'Suggested DNA Test Path',
      status: recommendation,
      summary: `The system suggests ${recommendation.toLowerCase()} based on the selected goal, urgency, and family profile.`,
      highlights: [
        { label: 'Primary goal', value: goal || 'Not provided' },
        { label: 'Urgency', value: urgency || 'Not provided' },
        { label: 'Blood group', value: safe('bloodGroup') || 'Not provided' },
        { label: 'Report available', value: safe('reportAvailable') || 'Not provided' },
      ],
      nextSteps: [
        `Proceed with ${recommendation}.`,
        safe('reportAvailable') === 'Yes' ? 'Open the Report Simplifier Agent with the report note.' : 'Review the Sample Process Agent before collection.',
        evaluation.level === 'High' ? 'Keep a doctor or counsellor in loop from the beginning.' : 'Use standard intake and routine pre-test guidance.',
      ],
    };
  }

  if (agentId === 'sample-process-agent') {
    const samplePreference = safe('samplePreference');
    const fastingStatus = safe('fastingStatus');
    const shippingMode = safe('shippingMode');
    const testType = safe('testType');
    const sampleType = samplePreference === 'Not sure' ? 'Saliva for home use, or blood if advised by lab' : samplePreference;

    return {
      title: 'Sample Collection Guide',
      status: sampleType,
      summary: `For ${testType.toLowerCase() || 'this test'}, the current recommended sample path is ${sampleType.toLowerCase()}.`,
      highlights: [
        { label: 'Collection mode', value: shippingMode || 'Not provided' },
        { label: 'Restriction followed', value: fastingStatus || 'Not provided' },
        { label: 'Family comparison relation', value: safe('familyMemberRelation') || 'Not required now' },
        { label: 'Recommended sample', value: sampleType },
      ],
      nextSteps: [
        fastingStatus === 'No' ? 'Wait and follow the pre-collection food restriction before saliva collection.' : 'You are ready for standard collection precautions.',
        'Seal, label, and verify the patient ID before dispatch.',
        shippingMode === 'Hospital / clinic visit' ? 'Carry ID and any prior reports during the visit.' : 'Track pickup or courier until the lab confirms receipt.',
      ],
    };
  }

  if (agentId === 'report-simplifier-agent') {
    const riskLevel = safe('riskLevel') || evaluation.level;
    const findingType = safe('findingType');
    const geneName = safe('geneName') || 'the selected gene';
    const clinicalNote = safe('clinicalNote');
    const interpretation = {
      'Gene variation': `${geneName} shows a variation. It means the pattern is different from common reference values and does not directly confirm disease.`,
      'Mutation marker': `${geneName} is marked as a mutation-related marker. It may need clinical review with symptoms and family history.`,
      'Carrier status': `${geneName} suggests carrier status, meaning the person may carry a trait without always showing symptoms.`,
      'No major finding': `${geneName} does not show a major flagged issue in the current note.`,
    };

    return {
      title: 'Simplified Report Output',
      status: `${riskLevel} risk`,
      summary: interpretation[findingType] || 'The report needs more context for a clearer explanation.',
      highlights: [
        { label: 'Detected level', value: `${riskLevel} risk` },
        { label: 'Finding type', value: findingType || 'Not provided' },
        { label: 'Gene / marker', value: geneName },
        { label: 'Short report note', value: clinicalNote || 'Not provided' },
      ],
      nextSteps: [
        riskLevel === 'High' ? 'Consult a doctor or genetic counsellor with the original report.' : 'Review this summary with family history and current symptoms.',
        'Use this output for understanding only, not as a final diagnosis.',
        'Open the Recommendation Agent for next-step planning.',
      ],
    };
  }

  if (agentId === 'recommendation-agent') {
    const riskLevel = safe('riskLevel') || evaluation.level;
    const consultedDoctor = safe('consultedDoctor');
    const familyHistory = safe('familyHistory');
    const goal = safe('goal');
    const needsDoctor = riskLevel === 'High' || familyHistory === 'Yes';

    return {
      title: 'Recommended Next Steps',
      status: needsDoctor ? 'Clinical follow-up advised' : 'Awareness follow-up advised',
      summary: needsDoctor
        ? 'A doctor or genetic counsellor follow-up is recommended because the current profile suggests elevated concern.'
        : 'Current details suggest monitoring and awareness-based follow-up rather than urgent action.',
      highlights: [
        { label: 'Risk level', value: riskLevel },
        { label: 'Doctor consulted', value: consultedDoctor || 'Not provided' },
        { label: 'Support goal', value: goal || 'Not provided' },
        { label: 'Medications', value: safe('medications') || 'Not provided' },
      ],
      nextSteps: [
        needsDoctor && consultedDoctor !== 'Yes' ? 'Book a consultation and carry the original report.' : 'Maintain a record of results and follow-up notes.',
        goal === 'Lifestyle guidance' ? 'Track sleep, food, exercise, and screenings as supportive habits.' : 'Prepare questions before meeting any specialist.',
        'This module supports awareness and guidance only, not final medical diagnosis.',
      ],
    };
  }

  if (agentId === 'escalation-agent') {
    const riskLevel = safe('riskLevel') || evaluation.level;
    const location = safe('location') || patient.location || 'Mumbai';
    const emergencyContact = safe('emergencyContact') || patient.emergencyContact || 'Not provided';
    const emergencyContactName = safe('emergencyContactName') || patient.emergencyContactName || 'Emergency contact';
    const symptoms = safe('symptoms') || patient.symptoms;
    const coords = getCoords(location);
    const emergency = riskLevel === 'High' || symptoms === 'Severe';
    const message = `Gene Guard alert for ${preferredName}. Risk level: ${riskLevel}. Current location: ${location}. Please respond immediately.`;

    return {
      title: 'Escalation and Alert Plan',
      status: emergency ? 'Emergency escalation active' : 'Monitoring support ready',
      summary: emergency
        ? 'High-priority follow-up triggered. Emergency contact and nearest response location should be used now.'
        : 'No active emergency trigger yet. Keep support contact ready and monitor closely.',
      highlights: [
        { label: 'Location tracked', value: location },
        { label: 'Emergency contact', value: `${emergencyContactName} · ${emergencyContact}` },
        { label: 'Symptoms state', value: symptoms || 'Not provided' },
        { label: 'Escalation status', value: emergency ? 'Immediate action' : 'Standby mode' },
      ],
      nextSteps: [
        emergency ? 'Call the emergency contact and arrange immediate medical review.' : 'Keep the emergency contact informed if symptoms worsen.',
        'Share the current summary with the attending clinician.',
        'Use the map button to guide the nearest response point.',
      ],
      emergency: {
        active: emergency,
        contact: emergencyContact,
        contactName: emergencyContactName,
        location,
        coords,
        mapUrl: buildOpenMapUrl(location, coords),
        telUrl: buildTelUrl(emergencyContact),
        smsUrl: buildSmsUrl(emergencyContact, message),
      },
    };
  }

  return {
    title: 'Agent Output',
    status: `${evaluation.level} profile`,
    summary: evaluation.summary,
    highlights: Object.entries(mergedPatient).slice(0, 4).map(([key, value]) => ({ label: titleCase(key), value: value || 'Not provided' })),
    nextSteps: ['Use backend API for full workflow processing.'],
  };
};
