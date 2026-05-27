import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DNA.css';
import { dnaAgentConfigs } from '../../data/dnaAgents';

// ─── Translations ────────────────────────────────────────────────────────────
const translations = {
  en: {
    nav: {
      learnGenetics: 'Learn Genetics',
      geneticDisorders: 'Genetic Disorders',
      counselling: 'Counselling',
      geneticAssessment: 'Genetic Assessment AI',
      dnaTesting: 'DNA Testing',
      aboutUs: 'About Us',
      login: 'Login',
      signUp: 'Sign Up',
    },
    hero: {
      badge: 'Your Genetic Journey Begins',
      title: 'DNA Testing',
      subtitle:
        'Unlock the secrets within your DNA. Discover your health risks, trace your ancestry, and make informed decisions about your future with comprehensive genetic testing.',
      stat1Number: '20,000+',
      stat1Label: 'Genes Analyzed',
      stat2Number: '99.9%',
      stat2Label: 'Accuracy Rate',
      stat3Number: '150+',
      stat3Label: 'Health Insights',
    },
    testingSection: {
      sectionLabel: 'Explore Options',
      title: 'Types of DNA Testing',
      description: 'Choose the type of genetic testing that aligns with your goals and interests',
      tabMedical: 'Medical Predictions',
      tabGenealogical: 'Genealogical Studies',
      keyBenefits: 'Key Benefits:',
    },
    testingTypes: {
      medical: {
        title: 'Medical Predictions',
        icon: '🏥',
        description: 'Discover potential health risks and make informed decisions about your healthcare',
        tests: [
          {
            name: 'Cancer Risk Screening',
            details: 'Identifies genetic mutations linked to breast, ovarian, colorectal, and other cancers',
            genes: 'BRCA1, BRCA2, TP53, MLH1',
            benefits: ['Early detection', 'Preventive measures', 'Family planning'],
          },
          {
            name: 'Cardiovascular Health',
            details: 'Assesses genetic predisposition to heart disease, hypertension, and stroke',
            genes: 'APOE, PCSK9, LDLR',
            benefits: ['Lifestyle modifications', 'Medication planning', 'Risk monitoring'],
          },
          {
            name: 'Pharmacogenomics',
            details: 'Determines how your genes affect your response to medications',
            genes: 'CYP2D6, CYP2C19, TPMT',
            benefits: ['Personalized dosing', 'Avoid adverse reactions', 'Optimal drug selection'],
          },
          {
            name: 'Metabolic Disorders',
            details: 'Screens for genetic conditions affecting metabolism and nutrient processing',
            genes: 'HFE, G6PD, MTHFR',
            benefits: ['Dietary adjustments', 'Supplement guidance', 'Condition management'],
          },
        ],
      },
      genealogical: {
        title: 'Genealogical Studies',
        icon: '🌍',
        description: 'Trace your ancestry and discover your genetic heritage across the globe',
        tests: [
          {
            name: 'Ethnic Origins',
            details: 'Breakdown of your ancestral origins across different regions and populations',
            genes: 'Autosomal DNA markers',
            benefits: ['Cultural connection', 'Heritage discovery', 'Family history'],
          },
          {
            name: 'DNA Matching',
            details: 'Connect with genetic relatives and build your family tree',
            genes: 'Shared DNA segments',
            benefits: ['Find relatives', 'Confirm relationships', 'Expand family tree'],
          },
          {
            name: 'Haplogroup Analysis',
            details: 'Trace maternal and paternal lineages through deep ancestral history',
            genes: 'mtDNA, Y-DNA',
            benefits: ['Ancient origins', 'Migration patterns', 'Historical context'],
          },
          {
            name: 'Traits & Characteristics',
            details: 'Discover genetic traits inherited from your ancestors',
            genes: 'Various trait markers',
            benefits: ['Physical traits', 'Taste preferences', 'Ancestry insights'],
          },
        ],
      },
    },
    procedures: {
      sectionLabel: 'How It Works',
      title: 'Step-by-Step Testing Process',
      description: 'A simple, secure process from sample collection to receiving your comprehensive results',
      steps: [
        {
          step: 1,
          title: 'Order Your Kit',
          description: 'Select the type of DNA test that matches your goals. The kit will be delivered to your home with all necessary materials.',
          icon: '📦',
          details: ['Choose test type', 'Provide shipping info', 'Receive kit in 3-5 days'],
        },
        {
          step: 2,
          title: 'Collect Sample',
          description: 'Follow the simple instructions to collect your DNA sample using the provided saliva collection tube or cheek swab.',
          icon: '🧪',
          details: ['Read instructions', 'Collect saliva/swab', 'Seal sample tube'],
        },
        {
          step: 3,
          title: 'Mail Sample',
          description: 'Use the prepaid shipping label to send your sample to the laboratory for analysis. Track your kit online.',
          icon: '📮',
          details: ['Activate kit online', 'Place in return bag', 'Drop at post office'],
        },
        {
          step: 4,
          title: 'Lab Analysis',
          description: 'Your DNA is extracted and analyzed using advanced sequencing technology. The process typically takes 3-6 weeks.',
          icon: '🔬',
          details: ['DNA extraction', 'Genetic sequencing', 'Quality control'],
        },
        {
          step: 5,
          title: 'Receive Results',
          description: 'Get comprehensive results through a secure online portal with detailed reports and personalized insights.',
          icon: '📊',
          details: ['Online dashboard', 'Detailed reports', 'Expert consultation'],
        },
      ],
    },
    ethics: {
      sectionLabel: 'Important Information',
      title: 'Ethical Considerations',
      description: 'Understanding the privacy, legal, and personal implications of genetic testing',
      keyConcerns: 'Key Concerns:',
      protections: 'Protections & Guidelines:',
      items: [
        {
          category: 'Privacy & Data Security',
          image: 'https://static.vecteezy.com/system/resources/thumbnails/005/419/403/small/data-protection-personal-data-security-concept-on-virtual-screen-protected-folder-icon-cyber-security-internet-privacy-and-safety-wireframe-hand-touching-digital-interface-illustration-vector.jpg',
          concerns: [
            'How is your genetic data stored and protected?',
            'Who has access to your DNA information?',
            'Can your data be used for research without consent?',
            'What happens to your sample after testing?',
          ],
          protections: [
            'Encryption and secure servers',
            'Opt-in research participation',
            'Right to delete data',
            'HIPAA compliance for medical tests',
          ],
        },
        {
          category: 'Discrimination Risks',
          image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4WU7Of7-8Gxp94ZMbE-pTLggicl7utAm5Mfi4od-OBNkmOUiXDyScF7wxDxzlg0VNUo54St-7D7G4UIOO8lzXulz_qAeP0jEPADVYjWJTLoO_EAKZHX4Rjo9Up5nlJjNmF7Er4XVsJ-Nj9ORdMXZjkrT9ATze14X7GBqEWF1s6xxf7Au1Qu2Xb2G7W9s/w640-h438/2151998174.jpg',
          concerns: [
            'Can employers access your genetic information?',
            'Will insurance companies use your results?',
            'Could results affect life or disability insurance?',
            'Are there legal protections in place?',
          ],
          protections: [
            'GINA prevents genetic discrimination in employment and health insurance',
            "State laws vary for life insurance",
            "Don't share results with insurers unless required",
            'Consult genetic counselor before testing',
          ],
        },
        {
          category: 'Family Implications',
          image: 'https://img.freepik.com/free-photo/family-home_23-2148166850.jpg',
          concerns: [
            'Should you tell family members about genetic risks?',
            'What if you discover unexpected relatives?',
            'How might results affect family relationships?',
            "Are children's genetic tests ethical?",
          ],
          protections: [
            'Genetic counseling services available',
            'Consider family impact before testing',
            'Age-appropriate testing guidelines',
            'Support for unexpected findings',
          ],
        },
        {
          category: 'Psychological Impact',
          image: 'https://media.licdn.com/dms/image/v2/C4D12AQFprtBMwSsGDQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1590110680056?e=2147483647&v=beta&t=D0ufNFcbqM6X2JrCGTZoSRbqn_WlSaaUtXNkddhFvvI',
          concerns: [
            'How will you handle unexpected health risks?',
            'Can you cope with uncertain predictions?',
            'What if results cause anxiety or distress?',
            'Are you prepared for life-changing information?',
          ],
          protections: [
            'Pre-test counseling recommended',
            'Mental health support available',
            'Understand limitations of testing',
            "Results don't determine destiny",
          ],
        },
      ],
    },
    impacts: {
      sectionLabel: 'Life-Changing Benefits',
      title: 'Impact of DNA Testing',
      description: 'Discover how genetic testing can transform your healthcare, identity, and future',
      items: [
        {
          title: 'Improved Healthcare Decisions',
          icon: '🏥',
          description: 'Make proactive choices based on your genetic predispositions',
          benefits: ['Early screening and detection', 'Personalized treatment plans', 'Preventive lifestyle changes', 'Informed medication choices', 'Reduced healthcare costs', 'Better health outcomes'],
        },
        {
          title: 'Understanding Genetic Lineage',
          icon: '🌳',
          description: 'Connect with your roots and discover your family history',
          benefits: ['Ethnic heritage breakdown', 'Connection with distant relatives', 'Historical migration patterns', 'Cultural identity exploration', 'Family medical history', 'Genealogical research'],
        },
        {
          title: 'Family Planning Insights',
          icon: '👶',
          description: 'Understand genetic risks for future generations',
          benefits: ['Carrier screening for conditions', 'Reproductive decision support', 'Prenatal testing guidance', 'Risk assessment for children', 'Genetic counseling access', 'Informed family choices'],
        },
        {
          title: 'Scientific Contribution',
          icon: '🔬',
          description: 'Advance medical research and genetic understanding',
          benefits: ['Contribute to disease research', 'Help develop new treatments', 'Improve genetic databases', 'Support rare disease studies', 'Enable precision medicine', 'Benefit future generations'],
        },
      ],
    },
    faq: {
      sectionLabel: 'Questions & Answers',
      title: 'Frequently Asked Questions',
      description: 'Get answers to common questions about DNA testing',
      items: [
        { question: 'How accurate are DNA tests?', answer: 'Medical DNA tests from certified labs have 99%+ accuracy for detecting specific genetic markers. Ancestry tests are generally 90-95% accurate for major ethnic groups, with lower accuracy for more specific regional breakdowns. Accuracy depends on the size of the reference database and the specific test type.' },
        { question: 'How long does it take to get results?', answer: 'Typical turnaround time is 3-6 weeks from when the lab receives your sample. Medical diagnostic tests may take 2-4 weeks, while ancestry tests usually take 4-6 weeks. Expedited options may be available for an additional fee.' },
        { question: 'Can I delete my DNA data?', answer: 'Most reputable companies allow you to request deletion of your DNA data and physical sample. However, policies vary by company. Data shared with third parties or used in published research typically cannot be deleted. Always review the privacy policy before testing.' },
        { question: 'Will my insurance cover DNA testing?', answer: 'Medical DNA tests ordered by a physician may be covered by insurance if deemed medically necessary. Ancestry and direct-to-consumer tests are typically not covered. Check with your insurance provider and get pre-authorization for medical tests.' },
        { question: 'Should I consult a genetic counselor?', answer: 'Yes, genetic counseling is highly recommended before medical DNA testing, especially for cancer or serious disease risk screening. Counselors help you understand results, implications for family members, and next steps. Many testing companies offer counseling services.' },
        { question: "What's the difference between clinical and consumer tests?", answer: "Clinical tests are ordered by healthcare providers, performed in certified diagnostic labs (CLIA-certified), and used for medical decisions. Consumer tests are direct-to-consumer, provide health insights, but shouldn't replace medical diagnosis. Clinical tests are more comprehensive and accurate." },
      ],
    },
    footer: {
      tagline: 'Empowering genetic awareness through accessible education, advanced AI assessment, and personalized insights.',
      platform: 'Platform',
      services: 'Services',
      company: 'Company',
      legal: 'Legal',
      platformLinks: ['Learn Genetics', 'Genetic Disorders', 'Genetic Counseling', 'AI Assessment'],
      servicesLinks: ['DNA Testing', 'Reports & Insights', 'Consultations', 'Research'],
      companyLinks: ['About Us', 'Our Team', 'Careers', 'Contact'],
      legalLinks: ['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Cookie Policy'],
      copyright: 'GeneGuard. All rights reserved.',
    },
  },

  // ── HINDI ──────────────────────────────────────────────────────────────────
  hi: {
    nav: {
      learnGenetics: 'आनुवंशिकी सीखें',
      geneticDisorders: 'आनुवंशिक विकार',
      counselling: 'परामर्श',
      geneticAssessment: 'जेनेटिक AI मूल्यांकन',
      dnaTesting: 'डीएनए परीक्षण',
      aboutUs: 'हमारे बारे में',
      login: 'लॉगिन',
      signUp: 'साइन अप',
    },
    hero: {
      badge: 'आपकी आनुवंशिक यात्रा शुरू होती है',
      title: 'डीएनए परीक्षण',
      subtitle: 'अपने डीएनए के रहस्यों को उजागर करें। अपने स्वास्थ्य जोखिमों की खोज करें, अपने वंश का पता लगाएं, और व्यापक आनुवंशिक परीक्षण के साथ अपने भविष्य के बारे में सूचित निर्णय लें।',
      stat1Number: '20,000+',
      stat1Label: 'विश्लेषित जीन',
      stat2Number: '99.9%',
      stat2Label: 'सटीकता दर',
      stat3Number: '150+',
      stat3Label: 'स्वास्थ्य अंतर्दृष्टि',
    },
    testingSection: {
      sectionLabel: 'विकल्प खोजें',
      title: 'डीएनए परीक्षण के प्रकार',
      description: 'अपने लक्ष्यों और रुचियों के अनुरूप आनुवंशिक परीक्षण का प्रकार चुनें',
      tabMedical: 'चिकित्सा भविष्यवाणियां',
      tabGenealogical: 'वंशावली अध्ययन',
      keyBenefits: 'मुख्य लाभ:',
    },
    testingTypes: {
      medical: {
        title: 'चिकित्सा भविष्यवाणियां',
        icon: '🏥',
        description: 'संभावित स्वास्थ्य जोखिमों की खोज करें और अपनी स्वास्थ्य सेवा के बारे में सूचित निर्णय लें',
        tests: [
          { name: 'कैंसर जोखिम स्क्रीनिंग', details: 'स्तन, डिम्बग्रंथि, कोलोरेक्टल और अन्य कैंसर से जुड़े आनुवंशिक उत्परिवर्तन की पहचान करता है', genes: 'BRCA1, BRCA2, TP53, MLH1', benefits: ['शीघ्र पहचान', 'निवारक उपाय', 'परिवार नियोजन'] },
          { name: 'हृदय स्वास्थ्य', details: 'हृदय रोग, उच्च रक्तचाप और स्ट्रोक के प्रति आनुवंशिक प्रवृत्ति का आकलन करता है', genes: 'APOE, PCSK9, LDLR', benefits: ['जीवनशैली में बदलाव', 'दवा योजना', 'जोखिम निगरानी'] },
          { name: 'फार्माकोजेनोमिक्स', details: 'यह निर्धारित करता है कि आपके जीन दवाओं के प्रति आपकी प्रतिक्रिया को कैसे प्रभावित करते हैं', genes: 'CYP2D6, CYP2C19, TPMT', benefits: ['व्यक्तिगत खुराक', 'प्रतिकूल प्रतिक्रियाओं से बचें', 'इष्टतम दवा चयन'] },
          { name: 'चयापचय विकार', details: 'चयापचय और पोषक तत्व प्रसंस्करण को प्रभावित करने वाली आनुवंशिक स्थितियों की जांच करता है', genes: 'HFE, G6PD, MTHFR', benefits: ['आहार समायोजन', 'पूरक मार्गदर्शन', 'स्थिति प्रबंधन'] },
        ],
      },
      genealogical: {
        title: 'वंशावली अध्ययन',
        icon: '🌍',
        description: 'अपने पूर्वजों का पता लगाएं और दुनिया भर में अपनी आनुवंशिक विरासत की खोज करें',
        tests: [
          { name: 'जातीय उत्पत्ति', details: 'विभिन्न क्षेत्रों और आबादी में आपकी पैतृक उत्पत्ति का विवरण', genes: 'ऑटोसोमल डीएनए मार्कर', benefits: ['सांस्कृतिक संबंध', 'विरासत की खोज', 'पारिवारिक इतिहास'] },
          { name: 'डीएनए मिलान', details: 'आनुवंशिक रिश्तेदारों से जुड़ें और अपना पारिवारिक वृक्ष बनाएं', genes: 'साझा डीएनए खंड', benefits: ['रिश्तेदार खोजें', 'संबंधों की पुष्टि करें', 'पारिवारिक वृक्ष विस्तार'] },
          { name: 'हैप्लोग्रुप विश्लेषण', details: 'गहरे पैतृक इतिहास के माध्यम से मातृ और पितृ वंश का पता लगाएं', genes: 'mtDNA, Y-DNA', benefits: ['प्राचीन उत्पत्ति', 'प्रवासन पैटर्न', 'ऐतिहासिक संदर्भ'] },
          { name: 'लक्षण और विशेषताएं', details: 'अपने पूर्वजों से विरासत में मिले आनुवंशिक लक्षणों की खोज करें', genes: 'विभिन्न लक्षण मार्कर', benefits: ['शारीरिक लक्षण', 'स्वाद प्राथमिकताएं', 'वंशावली अंतर्दृष्टि'] },
        ],
      },
    },
    procedures: {
      sectionLabel: 'यह कैसे काम करता है',
      title: 'चरण-दर-चरण परीक्षण प्रक्रिया',
      description: 'नमूना संग्रह से लेकर व्यापक परिणाम प्राप्त करने तक एक सरल, सुरक्षित प्रक्रिया',
      steps: [
        { step: 1, title: 'किट ऑर्डर करें', description: 'अपने लक्ष्यों से मेल खाने वाले डीएनए परीक्षण का प्रकार चुनें। किट सभी आवश्यक सामग्री के साथ आपके घर पहुंचाई जाएगी।', icon: '📦', details: ['परीक्षण प्रकार चुनें', 'शिपिंग जानकारी प्रदान करें', '3-5 दिनों में किट प्राप्त करें'] },
        { step: 2, title: 'नमूना संग्रह', description: 'दिए गए लार संग्रह ट्यूब या गाल स्वाब का उपयोग करके अपना डीएनए नमूना एकत्र करने के लिए सरल निर्देशों का पालन करें।', icon: '🧪', details: ['निर्देश पढ़ें', 'लार/स्वाब इकट्ठा करें', 'नमूना ट्यूब सील करें'] },
        { step: 3, title: 'नमूना मेल करें', description: 'प्रीपेड शिपिंग लेबल का उपयोग करके अपना नमूना विश्लेषण के लिए प्रयोगशाला में भेजें। अपनी किट को ऑनलाइन ट्रैक करें।', icon: '📮', details: ['किट ऑनलाइन सक्रिय करें', 'रिटर्न बैग में रखें', 'पोस्ट ऑफिस में छोड़ें'] },
        { step: 4, title: 'प्रयोगशाला विश्लेषण', description: 'आपके डीएनए को उन्नत अनुक्रमण तकनीक का उपयोग करके निकाला और विश्लेषण किया जाता है। प्रक्रिया में आमतौर पर 3-6 सप्ताह लगते हैं।', icon: '🔬', details: ['डीएनए निष्कर्षण', 'आनुवंशिक अनुक्रमण', 'गुणवत्ता नियंत्रण'] },
        { step: 5, title: 'परिणाम प्राप्त करें', description: 'विस्तृत रिपोर्ट और व्यक्तिगत अंतर्दृष्टि के साथ एक सुरक्षित ऑनलाइन पोर्टल के माध्यम से व्यापक परिणाम प्राप्त करें।', icon: '📊', details: ['ऑनलाइन डैशबोर्ड', 'विस्तृत रिपोर्ट', 'विशेषज्ञ परामर्श'] },
      ],
    },
    ethics: {
      sectionLabel: 'महत्वपूर्ण जानकारी',
      title: 'नैतिक विचार',
      description: 'आनुवंशिक परीक्षण के गोपनीयता, कानूनी और व्यक्तिगत निहितार्थों को समझना',
      keyConcerns: 'मुख्य चिंताएं:',
      protections: 'सुरक्षा और दिशानिर्देश:',
      items: [
        { category: 'गोपनीयता और डेटा सुरक्षा', image: 'https://static.vecteezy.com/system/resources/thumbnails/005/419/403/small/data-protection-personal-data-security-concept-on-virtual-screen-protected-folder-icon-cyber-security-internet-privacy-and-safety-wireframe-hand-touching-digital-interface-illustration-vector.jpg', concerns: ['आपका आनुवंशिक डेटा कैसे संग्रहीत और संरक्षित किया जाता है?', 'आपकी डीएनए जानकारी तक किसकी पहुंच है?', 'क्या आपके डेटा का उपयोग बिना सहमति के शोध के लिए किया जा सकता है?', 'परीक्षण के बाद आपके नमूने का क्या होता है?'], protections: ['एन्क्रिप्शन और सुरक्षित सर्वर', 'ऑप्ट-इन शोध भागीदारी', 'डेटा हटाने का अधिकार', 'चिकित्सा परीक्षणों के लिए HIPAA अनुपालन'] },
        { category: 'भेदभाव जोखिम', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4WU7Of7-8Gxp94ZMbE-pTLggicl7utAm5Mfi4od-OBNkmOUiXDyScF7wxDxzlg0VNUo54St-7D7G4UIOO8lzXulz_qAeP0jEPADVYjWJTLoO_EAKZHX4Rjo9Up5nlJjNmF7Er4XVsJ-Nj9ORdMXZjkrT9ATze14X7GBqEWF1s6xxf7Au1Qu2Xb2G7W9s/w640-h438/2151998174.jpg', concerns: ['क्या नियोक्ता आपकी आनुवंशिक जानकारी तक पहुंच सकते हैं?', 'क्या बीमा कंपनियां आपके परिणामों का उपयोग करेंगी?', 'क्या परिणाम जीवन या विकलांगता बीमा को प्रभावित कर सकते हैं?', 'क्या कानूनी सुरक्षा मौजूद है?'], protections: ['GINA रोजगार और स्वास्थ्य बीमा में भेदभाव रोकता है', 'जीवन बीमा के लिए राज्य कानून अलग-अलग हैं', 'जब तक आवश्यक न हो बीमाकर्ताओं के साथ परिणाम साझा न करें', 'परीक्षण से पहले आनुवंशिक परामर्शदाता से परामर्श करें'] },
        { category: 'पारिवारिक निहितार्थ', image: 'https://img.freepik.com/free-photo/family-home_23-2148166850.jpg', concerns: ['क्या आपको परिवार के सदस्यों को आनुवंशिक जोखिमों के बारे में बताना चाहिए?', 'यदि आपको अप्रत्याशित रिश्तेदार मिले तो क्या होगा?', 'परिणाम पारिवारिक संबंधों को कैसे प्रभावित कर सकते हैं?', 'क्या बच्चों के आनुवंशिक परीक्षण नैतिक हैं?'], protections: ['आनुवंशिक परामर्श सेवाएं उपलब्ध हैं', 'परीक्षण से पहले परिवार पर प्रभाव पर विचार करें', 'आयु-उपयुक्त परीक्षण दिशानिर्देश', 'अप्रत्याशित निष्कर्षों के लिए सहायता'] },
        { category: 'मनोवैज्ञानिक प्रभाव', image: 'https://media.licdn.com/dms/image/v2/C4D12AQFprtBMwSsGDQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1590110680056?e=2147483647&v=beta&t=D0ufNFcbqM6X2JrCGTZoSRbqn_WlSaaUtXNkddhFvvI', concerns: ['आप अप्रत्याशित स्वास्थ्य जोखिमों से कैसे निपटेंगे?', 'क्या आप अनिश्चित भविष्यवाणियों का सामना कर सकते हैं?', 'यदि परिणाम चिंता या परेशानी का कारण बनते हैं?', 'क्या आप जीवन बदलने वाली जानकारी के लिए तैयार हैं?'], protections: ['परीक्षण पूर्व परामर्श अनुशंसित', 'मानसिक स्वास्थ्य सहायता उपलब्ध', 'परीक्षण की सीमाओं को समझें', 'परिणाम नियति नहीं निर्धारित करते'] },
      ],
    },
    impacts: {
      sectionLabel: 'जीवन-परिवर्तनकारी लाभ',
      title: 'डीएनए परीक्षण का प्रभाव',
      description: 'जानें कि आनुवंशिक परीक्षण आपकी स्वास्थ्य सेवा, पहचान और भविष्य को कैसे बदल सकता है',
      items: [
        { title: 'बेहतर स्वास्थ्य सेवा निर्णय', icon: '🏥', description: 'अपनी आनुवंशिक प्रवृत्तियों के आधार पर सक्रिय विकल्प बनाएं', benefits: ['शीघ्र जांच और पहचान', 'व्यक्तिगत उपचार योजनाएं', 'निवारक जीवनशैली परिवर्तन', 'सूचित दवा विकल्प', 'कम स्वास्थ्य सेवा लागत', 'बेहतर स्वास्थ्य परिणाम'] },
        { title: 'आनुवंशिक वंश को समझना', icon: '🌳', description: 'अपनी जड़ों से जुड़ें और अपने पारिवारिक इतिहास की खोज करें', benefits: ['जातीय विरासत विवरण', 'दूर के रिश्तेदारों से संबंध', 'ऐतिहासिक प्रवासन पैटर्न', 'सांस्कृतिक पहचान खोज', 'पारिवारिक चिकित्सा इतिहास', 'वंशावली शोध'] },
        { title: 'परिवार नियोजन अंतर्दृष्टि', icon: '👶', description: 'भावी पीढ़ियों के लिए आनुवंशिक जोखिमों को समझें', benefits: ['स्थितियों के लिए वाहक स्क्रीनिंग', 'प्रजनन निर्णय समर्थन', 'प्रसव पूर्व परीक्षण मार्गदर्शन', 'बच्चों के लिए जोखिम मूल्यांकन', 'आनुवंशिक परामर्श पहुंच', 'सूचित पारिवारिक विकल्प'] },
        { title: 'वैज्ञानिक योगदान', icon: '🔬', description: 'चिकित्सा अनुसंधान और आनुवंशिक समझ को आगे बढ़ाएं', benefits: ['रोग अनुसंधान में योगदान', 'नए उपचार विकसित करने में मदद', 'आनुवंशिक डेटाबेस सुधारें', 'दुर्लभ रोग अध्ययन का समर्थन', 'सटीक चिकित्सा सक्षम करें', 'भावी पीढ़ियों को लाभ'] },
      ],
    },
    faq: {
      sectionLabel: 'प्रश्न और उत्तर',
      title: 'अक्सर पूछे जाने वाले प्रश्न',
      description: 'डीएनए परीक्षण के बारे में सामान्य प्रश्नों के उत्तर पाएं',
      items: [
        { question: 'डीएनए परीक्षण कितने सटीक हैं?', answer: 'प्रमाणित प्रयोगशालाओं से चिकित्सा डीएनए परीक्षण विशिष्ट आनुवंशिक मार्करों का पता लगाने के लिए 99%+ सटीकता रखते हैं। वंशावली परीक्षण आम तौर पर प्रमुख जातीय समूहों के लिए 90-95% सटीक होते हैं।' },
        { question: 'परिणाम प्राप्त करने में कितना समय लगता है?', answer: 'लैब को आपका नमूना मिलने के बाद सामान्य टर्नअराउंड समय 3-6 सप्ताह है। चिकित्सा परीक्षणों में 2-4 सप्ताह और वंशावली परीक्षणों में आमतौर पर 4-6 सप्ताह लगते हैं।' },
        { question: 'क्या मैं अपना डीएनए डेटा हटा सकता हूं?', answer: 'अधिकांश प्रतिष्ठित कंपनियां आपको अपने डीएनए डेटा और भौतिक नमूने को हटाने का अनुरोध करने की अनुमति देती हैं। हालांकि, नीतियां कंपनी के अनुसार भिन्न होती हैं।' },
        { question: 'क्या मेरा बीमा डीएनए परीक्षण को कवर करेगा?', answer: 'चिकित्सकीय रूप से आवश्यक माने जाने पर चिकित्सक द्वारा आदेशित चिकित्सा डीएनए परीक्षण बीमा द्वारा कवर किए जा सकते हैं। वंशावली परीक्षण आमतौर पर कवर नहीं किए जाते।' },
        { question: 'क्या मुझे आनुवंशिक परामर्शदाता से परामर्श करना चाहिए?', answer: 'हां, चिकित्सा डीएनए परीक्षण से पहले आनुवंशिक परामर्श की अत्यधिक अनुशंसा की जाती है, विशेष रूप से कैंसर या गंभीर रोग जोखिम स्क्रीनिंग के लिए।' },
        { question: 'नैदानिक और उपभोक्ता परीक्षणों में क्या अंतर है?', answer: 'नैदानिक परीक्षण स्वास्थ्य सेवा प्रदाताओं द्वारा आदेशित, प्रमाणित नैदानिक प्रयोगशालाओं में किए जाते हैं और चिकित्सा निर्णयों के लिए उपयोग किए जाते हैं। उपभोक्ता परीक्षण प्रत्यक्ष उपभोक्ता होते हैं लेकिन चिकित्सा निदान की जगह नहीं ले सकते।' },
      ],
    },
    footer: {
      tagline: 'सुलभ शिक्षा, उन्नत AI मूल्यांकन और व्यक्तिगत अंतर्दृष्टि के माध्यम से आनुवंशिक जागरूकता को सशक्त बनाना।',
      platform: 'प्लेटफ़ॉर्म',
      services: 'सेवाएं',
      company: 'कंपनी',
      legal: 'कानूनी',
      platformLinks: ['आनुवंशिकी सीखें', 'आनुवंशिक विकार', 'आनुवंशिक परामर्श', 'AI मूल्यांकन'],
      servicesLinks: ['डीएनए परीक्षण', 'रिपोर्ट और अंतर्दृष्टि', 'परामर्श', 'अनुसंधान'],
      companyLinks: ['हमारे बारे में', 'हमारी टीम', 'करियर', 'संपर्क'],
      legalLinks: ['गोपनीयता नीति', 'सेवा की शर्तें', 'HIPAA अनुपालन', 'कुकी नीति'],
      copyright: 'GeneGuard. सर्वाधिकार सुरक्षित।',
    },
  },

  // ── MARATHI ────────────────────────────────────────────────────────────────
  mr: {
    nav: {
      learnGenetics: 'अनुवंशशास्त्र शिका',
      geneticDisorders: 'अनुवांशिक विकार',
      counselling: 'समुपदेशन',
      geneticAssessment: 'अनुवांशिक AI मूल्यांकन',
      dnaTesting: 'डीएनए चाचणी',
      aboutUs: 'आमच्याबद्दल',
      login: 'लॉगिन',
      signUp: 'साइन अप',
    },
    hero: {
      badge: 'तुमचा अनुवांशिक प्रवास सुरू होतो',
      title: 'डीएनए चाचणी',
      subtitle: 'तुमच्या डीएनएमधील रहस्ये उलगडा. तुमचे आरोग्य धोके शोधा, तुमचे वंश शोधा आणि सर्वसमावेशक अनुवांशिक चाचणीसह तुमच्या भविष्याबद्दल माहितीपूर्ण निर्णय घ्या.',
      stat1Number: '20,000+',
      stat1Label: 'विश्लेषित जीन्स',
      stat2Number: '99.9%',
      stat2Label: 'अचूकता दर',
      stat3Number: '150+',
      stat3Label: 'आरोग्य अंतर्दृष्टी',
    },
    testingSection: {
      sectionLabel: 'पर्याय शोधा',
      title: 'डीएनए चाचणीचे प्रकार',
      description: 'तुमच्या ध्येये आणि आवडींशी जुळणारी अनुवांशिक चाचणीचा प्रकार निवडा',
      tabMedical: 'वैद्यकीय भविष्यवाण्या',
      tabGenealogical: 'वंशावळी अभ्यास',
      keyBenefits: 'मुख्य फायदे:',
    },
    testingTypes: {
      medical: {
        title: 'वैद्यकीय भविष्यवाण्या',
        icon: '🏥',
        description: 'संभाव्य आरोग्य धोके शोधा आणि तुमच्या आरोग्यसेवेबद्दल माहितीपूर्ण निर्णय घ्या',
        tests: [
          { name: 'कर्करोग जोखीम तपासणी', details: 'स्तन, अंडाशय, कोलोरेक्टल आणि इतर कर्करोगांशी संबंधित अनुवांशिक उत्परिवर्तने ओळखते', genes: 'BRCA1, BRCA2, TP53, MLH1', benefits: ['लवकर ओळख', 'प्रतिबंधात्मक उपाय', 'कुटुंब नियोजन'] },
          { name: 'हृदय आरोग्य', details: 'हृदयरोग, उच्च रक्तदाब आणि पक्षाघाताची अनुवांशिक प्रवृत्ती मूल्यांकन करते', genes: 'APOE, PCSK9, LDLR', benefits: ['जीवनशैली बदल', 'औषध नियोजन', 'जोखीम निरीक्षण'] },
          { name: 'फार्माकोजेनोमिक्स', details: 'तुमचे जीन्स औषधांवरील प्रतिसादावर कसा परिणाम करतात हे निर्धारित करते', genes: 'CYP2D6, CYP2C19, TPMT', benefits: ['वैयक्तिक डोस', 'प्रतिकूल प्रतिक्रिया टाळा', 'इष्टतम औषध निवड'] },
          { name: 'चयापचय विकार', details: 'चयापचय आणि पोषक प्रक्रियेवर परिणाम करणाऱ्या अनुवांशिक स्थितींसाठी तपासणी करते', genes: 'HFE, G6PD, MTHFR', benefits: ['आहार समायोजन', 'पूरक मार्गदर्शन', 'स्थिती व्यवस्थापन'] },
        ],
      },
      genealogical: {
        title: 'वंशावळी अभ्यास',
        icon: '🌍',
        description: 'तुमच्या पूर्वजांचा मागोवा घ्या आणि जगभरातील तुमची अनुवांशिक वारसा शोधा',
        tests: [
          { name: 'जातीय उत्पत्ती', details: 'वेगवेगळ्या प्रदेश आणि लोकसंख्यांमध्ये तुमच्या पूर्वजांच्या उत्पत्तीचे विवरण', genes: 'ऑटोसोमल डीएनए मार्कर', benefits: ['सांस्कृतिक संबंध', 'वारसा शोध', 'कुटुंब इतिहास'] },
          { name: 'डीएनए जुळवणी', details: 'अनुवांशिक नातेवाईकांशी जोडा आणि तुमचे कौटुंबिक झाड तयार करा', genes: 'सामायिक डीएनए विभाग', benefits: ['नातेवाईक शोधा', 'नातेसंबंध पुष्टी करा', 'कौटुंबिक झाड वाढवा'] },
          { name: 'हॅप्लोग्रुप विश्लेषण', details: 'खोल पूर्वजांच्या इतिहासातून मातृ आणि पितृ वंश शोधा', genes: 'mtDNA, Y-DNA', benefits: ['प्राचीन उत्पत्ती', 'स्थलांतर नमुने', 'ऐतिहासिक संदर्भ'] },
          { name: 'वैशिष्ट्ये आणि गुणधर्म', details: 'तुमच्या पूर्वजांकडून वारशाने मिळालेले अनुवांशिक गुणधर्म शोधा', genes: 'विविध वैशिष्ट्य मार्कर', benefits: ['शारीरिक वैशिष्ट्ये', 'चव पसंती', 'वंशावळी अंतर्दृष्टी'] },
        ],
      },
    },
    procedures: {
      sectionLabel: 'हे कसे कार्य करते',
      title: 'चरण-दर-चरण चाचणी प्रक्रिया',
      description: 'नमुना संकलनापासून ते सर्वसमावेशक निकाल मिळण्यापर्यंत एक सोपी, सुरक्षित प्रक्रिया',
      steps: [
        { step: 1, title: 'किट ऑर्डर करा', description: 'तुमच्या ध्येयांशी जुळणाऱ्या डीएनए चाचणीचा प्रकार निवडा. किट सर्व आवश्यक साहित्यासह तुमच्या घरी पोहोचेल.', icon: '📦', details: ['चाचणी प्रकार निवडा', 'शिपिंग माहिती द्या', '3-5 दिवसांत किट मिळवा'] },
        { step: 2, title: 'नमुना गोळा करा', description: 'दिलेल्या लाळ संग्रह ट्यूब किंवा गाल स्वाब वापरून तुमचा डीएनए नमुना गोळा करण्यासाठी सोप्या सूचनांचे पालन करा.', icon: '🧪', details: ['सूचना वाचा', 'लाळ/स्वाब गोळा करा', 'नमुना ट्यूब सील करा'] },
        { step: 3, title: 'नमुना मेल करा', description: 'प्रीपेड शिपिंग लेबल वापरून तुमचा नमुना विश्लेषणासाठी प्रयोगशाळेत पाठवा. तुमची किट ऑनलाइन ट्रॅक करा.', icon: '📮', details: ['किट ऑनलाइन सक्रिय करा', 'परत बॅगेत ठेवा', 'पोस्ट ऑफिसमध्ये सोडा'] },
        { step: 4, title: 'प्रयोगशाळा विश्लेषण', description: 'तुमचा डीएनए प्रगत अनुक्रमण तंत्रज्ञान वापरून काढला आणि विश्लेषण केला जातो. या प्रक्रियेस साधारणतः 3-6 आठवडे लागतात.', icon: '🔬', details: ['डीएनए काढणे', 'अनुवांशिक अनुक्रमण', 'गुणवत्ता नियंत्रण'] },
        { step: 5, title: 'निकाल मिळवा', description: 'तपशीलवार अहवाल आणि वैयक्तिक अंतर्दृष्टीसह सुरक्षित ऑनलाइन पोर्टलद्वारे सर्वसमावेशक निकाल मिळवा.', icon: '📊', details: ['ऑनलाइन डॅशबोर्ड', 'तपशीलवार अहवाल', 'तज्ञ सल्लामसलत'] },
      ],
    },
    ethics: {
      sectionLabel: 'महत्त्वाची माहिती',
      title: 'नैतिक विचार',
      description: 'अनुवांशिक चाचणीचे गोपनीयता, कायदेशीर आणि वैयक्तिक परिणाम समजून घेणे',
      keyConcerns: 'मुख्य चिंता:',
      protections: 'संरक्षण आणि मार्गदर्शक तत्त्वे:',
      items: [
        { category: 'गोपनीयता आणि डेटा सुरक्षा', image: 'https://static.vecteezy.com/system/resources/thumbnails/005/419/403/small/data-protection-personal-data-security-concept-on-virtual-screen-protected-folder-icon-cyber-security-internet-privacy-and-safety-wireframe-hand-touching-digital-interface-illustration-vector.jpg', concerns: ['तुमचा अनुवांशिक डेटा कसा संग्रहित आणि संरक्षित केला जातो?', 'तुमच्या डीएनए माहितीवर कोणाचा प्रवेश आहे?', 'संमतीशिवाय तुमचा डेटा संशोधनासाठी वापरला जाऊ शकतो का?', 'चाचणीनंतर तुमच्या नमुन्याचे काय होते?'], protections: ['एन्क्रिप्शन आणि सुरक्षित सर्व्हर', 'ऑप्ट-इन संशोधन सहभाग', 'डेटा हटवण्याचा अधिकार', 'वैद्यकीय चाचण्यांसाठी HIPAA अनुपालन'] },
        { category: 'भेदभाव जोखीम', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4WU7Of7-8Gxp94ZMbE-pTLggicl7utAm5Mfi4od-OBNkmOUiXDyScF7wxDxzlg0VNUo54St-7D7G4UIOO8lzXulz_qAeP0jEPADVYjWJTLoO_EAKZHX4Rjo9Up5nlJjNmF7Er4XVsJ-Nj9ORdMXZjkrT9ATze14X7GBqEWF1s6xxf7Au1Qu2Xb2G7W9s/w640-h438/2151998174.jpg', concerns: ['नियोक्ते तुमच्या अनुवांशिक माहितीवर प्रवेश करू शकतात का?', 'विमा कंपन्या तुमचे निकाल वापरतील का?', 'निकाल जीवन किंवा अपंगत्व विम्यावर परिणाम करू शकतात का?', 'कायदेशीर संरक्षण अस्तित्वात आहे का?'], protections: ['GINA रोजगार आणि आरोग्य विम्यात भेदभाव प्रतिबंधित करते', 'जीवन विम्यासाठी राज्य कायदे वेगवेगळे आहेत', 'आवश्यक असल्याशिवाय विमाकर्त्यांसह निकाल शेअर करू नका', 'चाचणीपूर्वी अनुवांशिक सल्लागाराशी सल्लामसलत करा'] },
        { category: 'कौटुंबिक परिणाम', image: 'https://img.freepik.com/free-photo/family-home_23-2148166850.jpg', concerns: ['कुटुंबातील सदस्यांना अनुवांशिक जोखमींबद्दल सांगावे का?', 'अनपेक्षित नातेवाईक आढळल्यास काय होईल?', 'निकाल कौटुंबिक नातेसंबंधांवर कसा परिणाम करू शकतात?', 'मुलांच्या अनुवांशिक चाचण्या नैतिक आहेत का?'], protections: ['अनुवांशिक समुपदेशन सेवा उपलब्ध', 'चाचणीपूर्वी कौटुंबिक परिणामाचा विचार करा', 'वयानुसार योग्य चाचणी मार्गदर्शक तत्त्वे', 'अनपेक्षित निष्कर्षांसाठी आधार'] },
        { category: 'मनोवैज्ञानिक प्रभाव', image: 'https://media.licdn.com/dms/image/v2/C4D12AQFprtBMwSsGDQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1590110680056?e=2147483647&v=beta&t=D0ufNFcbqM6X2JrCGTZoSRbqn_WlSaaUtXNkddhFvvI', concerns: ['अनपेक्षित आरोग्य जोखमींना तुम्ही कसे सामोरे जाल?', 'तुम्ही अनिश्चित भविष्यवाण्यांना सामोरे जाऊ शकता का?', 'निकालांमुळे चिंता किंवा त्रास झाल्यास काय?', 'जीवन बदलणाऱ्या माहितीसाठी तुम्ही तयार आहात का?'], protections: ['चाचणीपूर्व समुपदेशन शिफारस केले', 'मानसिक आरोग्य समर्थन उपलब्ध', 'चाचणीच्या मर्यादा समजून घ्या', 'निकाल नशीब निर्धारित करत नाहीत'] },
      ],
    },
    impacts: {
      sectionLabel: 'जीवन-परिवर्तनकारी फायदे',
      title: 'डीएनए चाचणीचा प्रभाव',
      description: 'अनुवांशिक चाचणी तुमची आरोग्यसेवा, ओळख आणि भविष्य कसे बदलू शकते ते शोधा',
      items: [
        { title: 'सुधारित आरोग्यसेवा निर्णय', icon: '🏥', description: 'तुमच्या अनुवांशिक प्रवृत्तींवर आधारित सक्रिय निवडी करा', benefits: ['लवकर तपासणी आणि शोध', 'वैयक्तिक उपचार योजना', 'प्रतिबंधात्मक जीवनशैली बदल', 'माहितीपूर्ण औषध निवडी', 'कमी आरोग्यसेवा खर्च', 'चांगले आरोग्य परिणाम'] },
        { title: 'अनुवांशिक वंश समजणे', icon: '🌳', description: 'तुमच्या मुळांशी जोडा आणि तुमचा कौटुंबिक इतिहास शोधा', benefits: ['जातीय वारसा विवरण', 'दूरच्या नातेवाईकांशी संपर्क', 'ऐतिहासिक स्थलांतर नमुने', 'सांस्कृतिक ओळख संशोधन', 'कौटुंबिक वैद्यकीय इतिहास', 'वंशावळी संशोधन'] },
        { title: 'कुटुंब नियोजन अंतर्दृष्टी', icon: '👶', description: 'भावी पिढ्यांसाठी अनुवांशिक जोखीम समजून घ्या', benefits: ['स्थितींसाठी वाहक तपासणी', 'प्रजनन निर्णय समर्थन', 'प्रसवपूर्व चाचणी मार्गदर्शन', 'मुलांसाठी जोखीम मूल्यांकन', 'अनुवांशिक समुपदेशन प्रवेश', 'माहितीपूर्ण कौटुंबिक निवडी'] },
        { title: 'वैज्ञानिक योगदान', icon: '🔬', description: 'वैद्यकीय संशोधन आणि अनुवांशिक समजूतदारपणा वाढवा', benefits: ['रोग संशोधनात योगदान', 'नवीन उपचार विकसित करण्यात मदत', 'अनुवांशिक डेटाबेस सुधारा', 'दुर्मिळ रोग अभ्यासांना समर्थन', 'अचूक औषध सक्षम करा', 'भावी पिढ्यांना फायदा'] },
      ],
    },
    faq: {
      sectionLabel: 'प्रश्न आणि उत्तरे',
      title: 'वारंवार विचारले जाणारे प्रश्न',
      description: 'डीएनए चाचणीबद्दल सामान्य प्रश्नांची उत्तरे मिळवा',
      items: [
        { question: 'डीएनए चाचण्या किती अचूक आहेत?', answer: 'प्रमाणित प्रयोगशाळांमधील वैद्यकीय डीएनए चाचण्या विशिष्ट अनुवांशिक मार्कर शोधण्यासाठी 99%+ अचूकता राखतात. वंशावळी चाचण्या साधारणत: प्रमुख जातीय गटांसाठी 90-95% अचूक असतात.' },
        { question: 'निकाल मिळण्यास किती वेळ लागतो?', answer: 'लॅबला तुमचा नमुना मिळाल्यापासून सामान्य टर्नअराउंड वेळ 3-6 आठवडे आहे. वैद्यकीय चाचण्यांना 2-4 आठवडे आणि वंशावळी चाचण्यांना साधारणत: 4-6 आठवडे लागतात.' },
        { question: 'मी माझा डीएनए डेटा हटवू शकतो का?', answer: 'बहुतेक प्रतिष्ठित कंपन्या तुम्हाला तुमचा डीएनए डेटा आणि भौतिक नमुना हटवण्याची विनंती करण्याची परवानगी देतात. तथापि, धोरणे कंपनीनुसार बदलतात.' },
        { question: 'माझा विमा डीएनए चाचणी कव्हर करेल का?', answer: 'वैद्यकीयदृष्ट्या आवश्यक मानल्यास डॉक्टरने मागवलेल्या वैद्यकीय डीएनए चाचण्या विम्याद्वारे कव्हर केल्या जाऊ शकतात. वंशावळी चाचण्या साधारणत: कव्हर केल्या जात नाहीत.' },
        { question: 'मी अनुवांशिक सल्लागाराशी सल्लामसलत करावी का?', answer: 'होय, वैद्यकीय डीएनए चाचणीपूर्वी अनुवांशिक समुपदेशन अत्यंत शिफारस केले जाते, विशेषत: कर्करोग किंवा गंभीर रोग जोखीम तपासणीसाठी.' },
        { question: 'क्लिनिकल आणि ग्राहक चाचण्यांमध्ये काय फरक आहे?', answer: 'क्लिनिकल चाचण्या आरोग्यसेवा प्रदात्यांकडून मागवल्या जातात, प्रमाणित नैदानिक प्रयोगशाळांमध्ये केल्या जातात आणि वैद्यकीय निर्णयांसाठी वापरल्या जातात. ग्राहक चाचण्या थेट ग्राहकांना उपलब्ध आहेत परंतु वैद्यकीय निदानाची जागा घेऊ शकत नाहीत.' },
      ],
    },
    footer: {
      tagline: 'सुलभ शिक्षण, प्रगत AI मूल्यांकन आणि वैयक्तिक अंतर्दृष्टीद्वारे अनुवांशिक जागरूकता सशक्त करणे.',
      platform: 'प्लॅटफॉर्म',
      services: 'सेवा',
      company: 'कंपनी',
      legal: 'कायदेशीर',
      platformLinks: ['अनुवंशशास्त्र शिका', 'अनुवांशिक विकार', 'अनुवांशिक समुपदेशन', 'AI मूल्यांकन'],
      servicesLinks: ['डीएनए चाचणी', 'अहवाल आणि अंतर्दृष्टी', 'सल्लामसलत', 'संशोधन'],
      companyLinks: ['आमच्याबद्दल', 'आमची टीम', 'करिअर', 'संपर्क'],
      legalLinks: ['गोपनीयता धोरण', 'सेवा अटी', 'HIPAA अनुपालन', 'कुकी धोरण'],
      copyright: 'GeneGuard. सर्व हक्क राखीव.',
    },
  },

  // ── TELUGU ─────────────────────────────────────────────────────────────────
  te: {
    nav: {
      learnGenetics: 'జన్యుశాస్త్రం నేర్చుకోండి',
      geneticDisorders: 'జన్యు వ్యాధులు',
      counselling: 'కౌన్సెలింగ్',
      geneticAssessment: 'జన్యు AI అంచనా',
      dnaTesting: 'డీఎన్ఏ పరీక్ష',
      aboutUs: 'మా గురించి',
      login: 'లాగిన్',
      signUp: 'సైన్ అప్',
    },
    hero: {
      badge: 'మీ జన్యు ప్రయాణం ప్రారంభమవుతుంది',
      title: 'డీఎన్ఏ పరీక్ష',
      subtitle: 'మీ డీఎన్ఏలోని రహస్యాలను వెల్లడించండి. మీ ఆరోగ్య నష్టాలను కనుగొనండి, మీ వంశాన్ని గుర్తించండి మరియు సమగ్ర జన్యు పరీక్షతో మీ భవిష్యత్తు గురించి సమాచారాత్మక నిర్ణయాలు తీసుకోండి.',
      stat1Number: '20,000+',
      stat1Label: 'విశ్లేషించిన జన్యువులు',
      stat2Number: '99.9%',
      stat2Label: 'ఖచ్చితత్వ రేటు',
      stat3Number: '150+',
      stat3Label: 'ఆరోగ్య అంతర్దృష్టులు',
    },
    testingSection: {
      sectionLabel: 'ఎంపికలు అన్వేషించండి',
      title: 'డీఎన్ఏ పరీక్ష రకాలు',
      description: 'మీ లక్ష్యాలు మరియు ఆసక్తులకు అనుగుణంగా జన్యు పరీక్ష రకాన్ని ఎంచుకోండి',
      tabMedical: 'వైద్య అంచనాలు',
      tabGenealogical: 'వంశావళి అధ్యయనాలు',
      keyBenefits: 'ముఖ్య ప్రయోజనాలు:',
    },
    testingTypes: {
      medical: {
        title: 'వైద్య అంచనాలు',
        icon: '🏥',
        description: 'సంభావ్య ఆరోగ్య నష్టాలను కనుగొనండి మరియు మీ ఆరోగ్య సంరక్షణ గురించి సమాచారాత్మక నిర్ణయాలు తీసుకోండి',
        tests: [
          { name: 'క్యాన్సర్ నష్ట పరీక్ష', details: 'రొమ్ము, అండాశయ, కొలొరెక్టల్ మరియు ఇతర క్యాన్సర్లతో సంబంధం ఉన్న జన్యు మార్పులను గుర్తిస్తుంది', genes: 'BRCA1, BRCA2, TP53, MLH1', benefits: ['ముందస్తు గుర్తింపు', 'నివారణ చర్యలు', 'కుటుంబ నియంత్రణ'] },
          { name: 'హృదయ ఆరోగ్యం', details: 'గుండె జబ్బు, రక్తపోటు మరియు స్ట్రోక్‌కు జన్యు సంసిద్ధతను అంచనా వేస్తుంది', genes: 'APOE, PCSK9, LDLR', benefits: ['జీవనశైలి మార్పులు', 'మందుల ప్రణాళిక', 'నష్ట పర్యవేక్షణ'] },
          { name: 'ఫార్మకోజెనోమిక్స్', details: 'మీ జన్యువులు మందులకు మీ ప్రతిస్పందనను ఎలా ప్రభావితం చేస్తాయో నిర్ణయిస్తుంది', genes: 'CYP2D6, CYP2C19, TPMT', benefits: ['వ్యక్తిగత డోసేజ్', 'దుష్ప్రభావాలు నివారించండి', 'సరైన మందు ఎంపిక'] },
          { name: 'జీవక్రియ వ్యాధులు', details: 'జీవక్రియ మరియు పోషక ప్రక్రియలను ప్రభావితం చేసే జన్యు పరిస్థితుల కోసం పరీక్షిస్తుంది', genes: 'HFE, G6PD, MTHFR', benefits: ['ఆహార సర్దుబాట్లు', 'సప్లిమెంట్ మార్గదర్శకత్వం', 'పరిస్థితి నిర్వహణ'] },
        ],
      },
      genealogical: {
        title: 'వంశావళి అధ్యయనాలు',
        icon: '🌍',
        description: 'మీ పూర్వీకులను గుర్తించండి మరియు ప్రపంచవ్యాప్తంగా మీ జన్యు వారసత్వాన్ని కనుగొనండి',
        tests: [
          { name: 'జాతి మూలాలు', details: 'వివిధ ప్రాంతాలు మరియు జనాభాలలో మీ పూర్వీకుల మూలాల వివరణ', genes: 'ఆటోసోమల్ డీఎన్ఏ మార్కర్లు', benefits: ['సాంస్కృతిక సంబంధం', 'వారసత్వ ఆవిష్కరణ', 'కుటుంబ చరిత్ర'] },
          { name: 'డీఎన్ఏ జత', details: 'జన్యు బంధువులతో అనుసంధానించండి మరియు మీ కుటుంబ వృక్షాన్ని నిర్మించండి', genes: 'భాగస్వామ్య డీఎన్ఏ విభాగాలు', benefits: ['బంధువులను కనుగొనండి', 'సంబంధాలను నిర్ధారించండి', 'కుటుంబ వృక్షాన్ని విస్తరించండి'] },
          { name: 'హాప్లోగ్రూప్ విశ్లేషణ', details: 'లోతైన పూర్వీకుల చరిత్ర ద్వారా మాతృ మరియు పితృ వంశాలను గుర్తించండి', genes: 'mtDNA, Y-DNA', benefits: ['ప్రాచీన మూలాలు', 'వలస నమూనాలు', 'చారిత్రక సందర్భం'] },
          { name: 'లక్షణాలు మరియు గుణాలు', details: 'మీ పూర్వీకుల నుండి వారసత్వంగా పొందిన జన్యు లక్షణాలను కనుగొనండి', genes: 'వివిధ లక్షణ మార్కర్లు', benefits: ['శారీరక లక్షణాలు', 'రుచి ప్రాధాన్యతలు', 'వంశావళి అంతర్దృష్టులు'] },
        ],
      },
    },
    procedures: {
      sectionLabel: 'ఇది ఎలా పని చేస్తుంది',
      title: 'దశ-వారీ పరీక్ష ప్రక్రియ',
      description: 'నమూనా సేకరణ నుండి సమగ్ర ఫలితాలు పొందడం వరకు సరళమైన, సురక్షిత ప్రక్రియ',
      steps: [
        { step: 1, title: 'కిట్ ఆర్డర్ చేయండి', description: 'మీ లక్ష్యాలకు అనుగుణంగా డీఎన్ఏ పరీక్ష రకాన్ని ఎంచుకోండి. అన్ని అవసరమైన పదార్థాలతో కిట్ మీ ఇంటికి డెలివరీ చేయబడుతుంది.', icon: '📦', details: ['పరీక్ష రకం ఎంచుకోండి', 'షిప్పింగ్ సమాచారం అందించండి', '3-5 రోజుల్లో కిట్ పొందండి'] },
        { step: 2, title: 'నమూనా సేకరించండి', description: 'అందించిన లాలాజల సేకరణ ట్యూబ్ లేదా చెక్కు స్వాబ్ ఉపయోగించి మీ డీఎన్ఏ నమూనా సేకరించడానికి సరళమైన సూచనలను అనుసరించండి.', icon: '🧪', details: ['సూచనలు చదవండి', 'లాలాజలం/స్వాబ్ సేకరించండి', 'నమూనా ట్యూబ్ మూసివేయండి'] },
        { step: 3, title: 'నమూనా పోస్ట్ చేయండి', description: 'ప్రీపెయిడ్ షిప్పింగ్ లేబుల్ ఉపయోగించి విశ్లేషణ కోసం మీ నమూనాను ప్రయోగశాలకు పంపండి. మీ కిట్‌ను ఆన్‌లైన్‌లో ట్రాక్ చేయండి.', icon: '📮', details: ['కిట్‌ని ఆన్‌లైన్‌లో యాక్టివేట్ చేయండి', 'రిటర్న్ బ్యాగ్‌లో ఉంచండి', 'పోస్ట్ ఆఫీసులో వదలండి'] },
        { step: 4, title: 'ల్యాబ్ విశ్లేషణ', description: 'మీ డీఎన్ఏ అధునాతన సీక్వెన్సింగ్ సాంకేతికత ఉపయోగించి సేకరించబడి విశ్లేషించబడుతుంది. ఈ ప్రక్రియ సాధారణంగా 3-6 వారాలు పడుతుంది.', icon: '🔬', details: ['డీఎన్ఏ వెలికితీత', 'జన్యు సీక్వెన్సింగ్', 'నాణ్యత నియంత్రణ'] },
        { step: 5, title: 'ఫలితాలు పొందండి', description: 'వివరణాత్మక నివేదికలు మరియు వ్యక్తిగతీకరించిన అంతర్దృష్టులతో సురక్షిత ఆన్‌లైన్ పోర్టల్ ద్వారా సమగ్ర ఫలితాలు పొందండి.', icon: '📊', details: ['ఆన్‌లైన్ డాష్‌బోర్డ్', 'వివరణాత్మక నివేదికలు', 'నిపుణుల సంప్రదింపు'] },
      ],
    },
    ethics: {
      sectionLabel: 'ముఖ్యమైన సమాచారం',
      title: 'నైతిక పరిగణనలు',
      description: 'జన్యు పరీక్ష యొక్క గోపనీయత, చట్టపరమైన మరియు వ్యక్తిగత పరిణామాలను అర్థం చేసుకోవడం',
      keyConcerns: 'ముఖ్య ఆందోళనలు:',
      protections: 'రక్షణలు & మార్గదర్శకాలు:',
      items: [
        { category: 'గోపనీయత & డేటా భద్రత', image: 'https://static.vecteezy.com/system/resources/thumbnails/005/419/403/small/data-protection-personal-data-security-concept-on-virtual-screen-protected-folder-icon-cyber-security-internet-privacy-and-safety-wireframe-hand-touching-digital-interface-illustration-vector.jpg', concerns: ['మీ జన్యు డేటా ఎలా నిల్వ చేయబడి రక్షించబడుతుంది?', 'మీ డీఎన్ఏ సమాచారానికి ఎవరికి ప్రాప్యత ఉంది?', 'అనుమతి లేకుండా మీ డేటా పరిశోధనకు ఉపయోగించబడవచ్చా?', 'పరీక్ష తర్వాత మీ నమూనాకు ఏమవుతుంది?'], protections: ['గుప్తీకరణ మరియు సురక్షిత సర్వర్లు', 'ఆప్ట్-ఇన్ పరిశోధన భాగస్వామ్యం', 'డేటా తొలగించే హక్కు', 'వైద్య పరీక్షలకు HIPAA సమ్మతి'] },
        { category: 'వివక్ష నష్టాలు', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4WU7Of7-8Gxp94ZMbE-pTLggicl7utAm5Mfi4od-OBNkmOUiXDyScF7wxDxzlg0VNUo54St-7D7G4UIOO8lzXulz_qAeP0jEPADVYjWJTLoO_EAKZHX4Rjo9Up5nlJjNmF7Er4XVsJ-Nj9ORdMXZjkrT9ATze14X7GBqEWF1s6xxf7Au1Qu2Xb2G7W9s/w640-h438/2151998174.jpg', concerns: ['యజమానులు మీ జన్యు సమాచారాన్ని యాక్సెస్ చేయగలరా?', 'బీమా కంపెనీలు మీ ఫలితాలను ఉపయోగిస్తాయా?', 'ఫలితాలు జీవిత లేదా వైకల్య బీమాను ప్రభావితం చేయవచ్చా?', 'చట్టపరమైన రక్షణలు ఉన్నాయా?'], protections: ['GINA ఉపాధి మరియు ఆరోగ్య బీమాలో జన్యు వివక్షను నిరోధిస్తుంది', 'జీవిత బీమాకు రాష్ట్ర చట్టాలు మారుతాయి', 'అవసరమైతే తప్ప బీమాదారులతో ఫలితాలు పంచుకోవద్దు', 'పరీక్షకు ముందు జన్యు సలహాదారుని సంప్రదించండి'] },
        { category: 'కుటుంబ పరిణామాలు', image: 'https://img.freepik.com/free-photo/family-home_23-2148166850.jpg', concerns: ['కుటుంబ సభ్యులకు జన్యు నష్టాల గురించి చెప్పాలా?', 'అనుకోని బంధువులు కనుగొనబడితే ఏమవుతుంది?', 'ఫలితాలు కుటుంబ సంబంధాలను ఎలా ప్రభావితం చేయవచ్చు?', 'పిల్లల జన్యు పరీక్షలు నైతికమైనవా?'], protections: ['జన్యు కౌన్సెలింగ్ సేవలు అందుబాటులో ఉన్నాయి', 'పరీక్షకు ముందు కుటుంబ ప్రభావాన్ని పరిగణించండి', 'వయసుకు తగిన పరీక్ష మార్గదర్శకాలు', 'అనుకోని ఫలితాలకు మద్దతు'] },
        { category: 'మానసిక ప్రభావం', image: 'https://media.licdn.com/dms/image/v2/C4D12AQFprtBMwSsGDQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1590110680056?e=2147483647&v=beta&t=D0ufNFcbqM6X2JrCGTZoSRbqn_WlSaaUtXNkddhFvvI', concerns: ['అనుకోని ఆరోగ్య నష్టాలను మీరు ఎలా నిర్వహిస్తారు?', 'అనిశ్చిత అంచనాలతో మీరు ఎదుర్కోగలరా?', 'ఫలితాలు ఆందోళన లేదా బాధను కలిగిస్తే ఏమి?', 'జీవితాన్ని మార్చే సమాచారానికి మీరు సిద్ధంగా ఉన్నారా?'], protections: ['పరీక్షకు ముందు కౌన్సెలింగ్ సిఫారసు', 'మానసిక ఆరోగ్య మద్దతు అందుబాటులో ఉంది', 'పరీక్ష పరిమితులను అర్థం చేసుకోండి', 'ఫలితాలు విధిని నిర్ణయించవు'] },
      ],
    },
    impacts: {
      sectionLabel: 'జీవితాన్ని మార్చే ప్రయోజనాలు',
      title: 'డీఎన్ఏ పరీక్ష ప్రభావం',
      description: 'జన్యు పరీక్ష మీ ఆరోగ్య సంరక్షణ, గుర్తింపు మరియు భవిష్యత్తును ఎలా మార్చగలదో కనుగొనండి',
      items: [
        { title: 'మెరుగైన ఆరోగ్య సంరక్షణ నిర్ణయాలు', icon: '🏥', description: 'మీ జన్యు సంసిద్ధతలపై ఆధారంగా చురుకైన ఎంపికలు చేయండి', benefits: ['ముందస్తు స్క్రీనింగ్ మరియు గుర్తింపు', 'వ్యక్తిగతీకరించిన చికిత్స ప్రణాళికలు', 'నివారణ జీవనశైలి మార్పులు', 'సమాచారాత్మక మందుల ఎంపికలు', 'తగ్గిన ఆరోగ్య సంరక్షణ ఖర్చులు', 'మెరుగైన ఆరోగ్య ఫలితాలు'] },
        { title: 'జన్యు వంశాన్ని అర్థం చేసుకోవడం', icon: '🌳', description: 'మీ మూలాలతో అనుసంధానించండి మరియు మీ కుటుంబ చరిత్రను కనుగొనండి', benefits: ['జాతి వారసత్వ వివరణ', 'దూర బంధువులతో అనుసంధానం', 'చారిత్రక వలస నమూనాలు', 'సాంస్కృతిక గుర్తింపు అన్వేషణ', 'కుటుంబ వైద్య చరిత్ర', 'వంశావళి పరిశోధన'] },
        { title: 'కుటుంబ నియంత్రణ అంతర్దృష్టులు', icon: '👶', description: 'భావి తరాలకు జన్యు నష్టాలను అర్థం చేసుకోండి', benefits: ['పరిస్థితులకు వాహక స్క్రీనింగ్', 'జనన నిర్ణయ మద్దతు', 'ప్రసవపూర్వ పరీక్ష మార్గదర్శకత్వం', 'పిల్లలకు నష్ట అంచనా', 'జన్యు కౌన్సెలింగ్ ప్రాప్యత', 'సమాచారాత్మక కుటుంబ ఎంపికలు'] },
        { title: 'శాస్త్రీయ సహకారం', icon: '🔬', description: 'వైద్య పరిశోధన మరియు జన్యు అవగాహనను అభివృద్ధి చేయండి', benefits: ['వ్యాధి పరిశోధనకు సహకరించండి', 'కొత్త చికిత్సలు అభివృద్ధి చేయడంలో సహాయం', 'జన్యు డేటాబేస్‌లను మెరుగుపరచండి', 'అరుదైన వ్యాధి అధ్యయనాలకు మద్దతు', 'ఖచ్చితమైన వైద్యాన్ని అనుమతించండి', 'భావి తరాలకు ప్రయోజనం'] },
      ],
    },
    faq: {
      sectionLabel: 'ప్రశ్నలు & సమాధానాలు',
      title: 'తరచుగా అడిగే ప్రశ్నలు',
      description: 'డీఎన్ఏ పరీక్ష గురించి సాధారణ ప్రశ్నలకు సమాధానాలు పొందండి',
      items: [
        { question: 'డీఎన్ఏ పరీక్షలు ఎంత ఖచ్చితమైనవి?', answer: 'ధ్రువీకృత ప్రయోగశాలల నుండి వైద్య డీఎన్ఏ పరీక్షలు నిర్దిష్ట జన్యు మార్కర్‌లను గుర్తించడానికి 99%+ ఖచ్చితత్వాన్ని కలిగి ఉంటాయి. వంశావళి పరీక్షలు సాధారణంగా ప్రధాన జాతి సమూహాలకు 90-95% ఖచ్చితమైనవి.' },
        { question: 'ఫలితాలు పొందడానికి ఎంత సమయం పడుతుంది?', answer: 'ల్యాబ్ మీ నమూనాను పొందిన తర్వాత సాధారణ టర్నఅరౌండ్ సమయం 3-6 వారాలు. వైద్య పరీక్షలకు 2-4 వారాలు మరియు వంశావళి పరీక్షలకు సాధారణంగా 4-6 వారాలు పడుతుంది.' },
        { question: 'నేను నా డీఎన్ఏ డేటాను తొలగించగలనా?', answer: 'చాలా ప్రతిష్ఠాత్మక కంపెనీలు మీ డీఎన్ఏ డేటా మరియు భౌతిక నమూనాను తొలగించమని అభ్యర్థించడానికి మీకు అనుమతిస్తాయి. అయినప్పటికీ, విధానాలు కంపెనీ వారీగా మారుతాయి.' },
        { question: 'నా బీమా డీఎన్ఏ పరీక్షను కవర్ చేస్తుందా?', answer: 'వైద్యపరంగా అవసరమైనట్లు పరిగణించినట్లయితే వైద్యుడు ఆదేశించిన వైద్య డీఎన్ఏ పరీక్షలు బీమా ద్వారా కవర్ చేయబడవచ్చు. వంశావళి పరీక్షలు సాధారణంగా కవర్ చేయబడవు.' },
        { question: 'నేను జన్యు సలహాదారుని సంప్రదించాలా?', answer: 'అవును, వైద్య డీఎన్ఏ పరీక్షకు ముందు జన్యు కౌన్సెలింగ్ అత్యంత సిఫారసు చేయబడింది, ముఖ్యంగా క్యాన్సర్ లేదా తీవ్రమైన వ్యాధి నష్ట స్క్రీనింగ్ కోసం.' },
        { question: 'క్లినికల్ మరియు వినియోగదారు పరీక్షల మధ్య తేడా ఏమిటి?', answer: 'క్లినికల్ పరీక్షలు ఆరోగ్య సంరక్షణ ప్రదాతలచే ఆదేశించబడతాయి, ధ్రువీకృత డయాగ్నస్టిక్ ల్యాబ్‌లలో నిర్వహించబడతాయి మరియు వైద్య నిర్ణయాలకు ఉపయోగించబడతాయి. వినియోగదారు పరీక్షలు నేరుగా వినియోగదారులకు అందుబాటులో ఉంటాయి కానీ వైద్య నిర్ధారణను భర్తీ చేయలేవు.' },
      ],
    },
    footer: {
      tagline: 'అందుబాటులో ఉన్న విద్య, అధునాతన AI అంచనా మరియు వ్యక్తిగతీకరించిన అంతర్దృష్టుల ద్వారా జన్యు అవగాహనను శక్తివంతం చేయడం.',
      platform: 'ప్లాట్‌ఫారమ్',
      services: 'సేవలు',
      company: 'కంపెనీ',
      legal: 'చట్టపరమైన',
      platformLinks: ['జన్యుశాస్త్రం నేర్చుకోండి', 'జన్యు వ్యాధులు', 'జన్యు కౌన్సెలింగ్', 'AI అంచనా'],
      servicesLinks: ['డీఎన్ఏ పరీక్ష', 'నివేదికలు & అంతర్దృష్టులు', 'సంప్రదింపులు', 'పరిశోధన'],
      companyLinks: ['మా గురించి', 'మా బృందం', 'కెరీర్స్', 'సంప్రదించండి'],
      legalLinks: ['గోపనీయతా విధానం', 'సేవా నిబంధనలు', 'HIPAA సమ్మతి', 'కుకీ విధానం'],
      copyright: 'GeneGuard. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    },
  },
};

// ─── Footer Component ─────────────────────────────────────────────────────────
const Footer = ({ t }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="dna-main-footer">
      <div className="dna-footer-container">
        <div className="dna-footer-top">
          <div className="dna-footer-brand-section">
            <div className="dna-footer-logo">
              <div className="dna-footer-logo-circle"></div>
              <span className="dna-footer-logo-text">GeneGuard</span>
            </div>
            <p className="dna-footer-tagline">{t.footer.tagline}</p>
            <div className="dna-footer-social">
              <a href="https://twitter.com" className="dna-social-link" aria-label="Twitter" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" className="dna-social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com" className="dna-social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
          <div className="dna-footer-links-grid">
            <div className="dna-footer-column">
              <h3 className="dna-footer-column-title">{t.footer.platform}</h3>
              <ul className="dna-footer-links">
                <li><Link to="/learn-genetics">{t.footer.platformLinks[0]}</Link></li>
                <li><Link to="/genetic-disorders">{t.footer.platformLinks[1]}</Link></li>
                <li><Link to="/counselling">{t.footer.platformLinks[2]}</Link></li>
                <li><Link to="/genetic-assessment">{t.footer.platformLinks[3]}</Link></li>
              </ul>
            </div>
            <div className="dna-footer-column">
              <h3 className="dna-footer-column-title">{t.footer.services}</h3>
              <ul className="dna-footer-links">
                <li><Link to="/dna">{t.footer.servicesLinks[0]}</Link></li>
                <li><a href="#reports">{t.footer.servicesLinks[1]}</a></li>
                <li><a href="#consultation">{t.footer.servicesLinks[2]}</a></li>
                <li><a href="#research">{t.footer.servicesLinks[3]}</a></li>
              </ul>
            </div>
            <div className="dna-footer-column">
              <h3 className="dna-footer-column-title">{t.footer.company}</h3>
              <ul className="dna-footer-links">
                <li><Link to="/about">{t.footer.companyLinks[0]}</Link></li>
                <li><a href="#team">{t.footer.companyLinks[1]}</a></li>
                <li><a href="#careers">{t.footer.companyLinks[2]}</a></li>
                <li><a href="#contact">{t.footer.companyLinks[3]}</a></li>
              </ul>
            </div>
            <div className="dna-footer-column">
              <h3 className="dna-footer-column-title">{t.footer.legal}</h3>
              <ul className="dna-footer-links">
                <li><a href="#privacy">{t.footer.legalLinks[0]}</a></li>
                <li><a href="#terms">{t.footer.legalLinks[1]}</a></li>
                <li><a href="#hipaa">{t.footer.legalLinks[2]}</a></li>
                <li><a href="#cookies">{t.footer.legalLinks[3]}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="dna-footer-divider"><div className="dna-divider-glow"></div></div>
        <div className="dna-footer-bottom">
          <p className="dna-footer-copyright">© {currentYear} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const DNA = () => {
  const [activeTab, setActiveTab] = useState('medical');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsProfileOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <div className="dna-testing-page">
      {/* Navbar */}
      <nav className={`dna-main-navbar ${isScrolled ? 'dna-navbar-scrolled' : ''}`}>
        <div className="dna-nav-content">
          {/* ✅ Logo now navigates to home */}
          <div className="dna-nav-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
            <div className="dna-logo-circle"></div>
            <span className="dna-logo-brand">Gene Guard</span>
          </div>

          <div className="dna-nav-right-section">
            <div className="dna-nav-links">
              <Link to="/learn-genetics" className="dna-nav-link">{t.nav.learnGenetics}</Link>
              <Link to="/genetic-disorders" className="dna-nav-link">{t.nav.geneticDisorders}</Link>
              <Link to="/counselling" className="dna-nav-link">{t.nav.counselling}</Link>
              <Link to="/genetic-assessment" className="dna-nav-link">{t.nav.geneticAssessment}</Link>
              <Link to="/dna" className="dna-nav-link active">{t.nav.dnaTesting}</Link>
              <Link to="/about" className="dna-nav-link">{t.nav.aboutUs}</Link>
            </div>

            {/* Language Buttons */}
            <div className="dna-language-buttons">
              {['en','hi','mr','te'].map((lang) => (
                <button
                  key={lang}
                  className={`dna-lang-btn ${language === lang ? 'active' : ''}`}
                  onClick={() => setLanguage(lang)}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिं' : lang === 'mr' ? 'मर' : 'తె'}
                </button>
              ))}
            </div>

            <button
              className={`dna-hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="dna-hamburger-line"></span>
              <span className="dna-hamburger-line"></span>
              <span className="dna-hamburger-line"></span>
            </button>

            <div className="dna-profile-container" ref={dropdownRef}>
              <button
                className={`dna-profile-trigger ${isProfileOpen ? 'active' : ''}`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="User Profile"
              >
                <svg className="dna-profile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {isProfileOpen && (
                <div className="dna-profile-dropdown">
                  <div className="dna-dropdown-glow"></div>
                  <Link to="/login" className="dna-dropdown-item dna-signup-special">{t.nav.login}</Link>
                  <Link to="/signup" className="dna-dropdown-item dna-signup-special">{t.nav.signUp}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="dna-mobile-menu-overlay">
          <Link to="/learn-genetics" className="dna-nav-link" onClick={handleLinkClick}>{t.nav.learnGenetics}</Link>
          <Link to="/genetic-disorders" className="dna-nav-link" onClick={handleLinkClick}>{t.nav.geneticDisorders}</Link>
          <Link to="/counselling" className="dna-nav-link" onClick={handleLinkClick}>{t.nav.counselling}</Link>
          <Link to="/genetic-assessment" className="dna-nav-link" onClick={handleLinkClick}>{t.nav.geneticAssessment}</Link>
          <Link to="/dna" className="dna-nav-link active" onClick={handleLinkClick}>{t.nav.dnaTesting}</Link>
          <Link to="/about" className="dna-nav-link" onClick={handleLinkClick}>{t.nav.aboutUs}</Link>
        </div>
      )}

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-badge">{t.hero.badge}</div>
          <h1 className="hero-title">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{t.hero.stat1Number}</div>
              <div className="stat-label">{t.hero.stat1Label}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{t.hero.stat2Number}</div>
              <div className="stat-label">{t.hero.stat2Label}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{t.hero.stat3Number}</div>
              <div className="stat-label">{t.hero.stat3Label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of DNA Testing */}
      <section className="testing-types-section">
        <div className="section-header">
          <span className="section-label">{t.testingSection.sectionLabel}</span>
          <h2>{t.testingSection.title}</h2>
          <p className="section-description">{t.testingSection.description}</p>
        </div>
        <div className="tabs-container">
          <div className="tabs">
            <button className={`tab ${activeTab === 'medical' ? 'active' : ''}`} onClick={() => setActiveTab('medical')}>
              <span className="tab-icon">🏥</span>
              <span>{t.testingSection.tabMedical}</span>
            </button>
            <button className={`tab ${activeTab === 'genealogical' ? 'active' : ''}`} onClick={() => setActiveTab('genealogical')}>
              <span className="tab-icon">🌍</span>
              <span>{t.testingSection.tabGenealogical}</span>
            </button>
          </div>
          <div className="tab-content">
            <div className="content-intro">
              <div className="intro-icon">{t.testingTypes[activeTab].icon}</div>
              <h3>{t.testingTypes[activeTab].title}</h3>
              <p>{t.testingTypes[activeTab].description}</p>
            </div>
            <div className="tests-grid">
              {t.testingTypes[activeTab].tests.map((test, index) => (
                <div key={index} className="test-card">
                  <div className="test-header">
                    <h4>{test.name}</h4>
                    <div className="gene-badge">{test.genes}</div>
                  </div>
                  <p className="test-details">{test.details}</p>
                  <div className="test-benefits">
                    <div className="benefits-label">{t.testingSection.keyBenefits}</div>
                    <ul>{test.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ethics */}
      <section className="ethics-section">
        <div className="section-header">
          <span className="section-label">{t.ethics.sectionLabel}</span>
          <h2>{t.ethics.title}</h2>
          <p className="section-description">{t.ethics.description}</p>
        </div>
        <div className="ethics-grid">
          {t.ethics.items.map((item, index) => (
            <div key={index} className="ethics-card">
              <div className="ethics-header">
                <div className="ethics-icon-img">
                  <img src={item.image} alt={item.category} loading="lazy" />
                </div>
                <h3>{item.category}</h3>
              </div>
              <div className="ethics-section-block">
                <h4>{t.ethics.keyConcerns}</h4>
                <ul className="concerns-list">{item.concerns.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>
              <div className="ethics-section-block">
                <h4>{t.ethics.protections}</h4>
                <ul className="protections-list">{item.protections.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Dynamic DNA Agents */}
      <section className="dna-agents-preview-section">
        <div className="section-header">
          <span className="section-label">Dynamic Assistance</span>
          <h2>DNA Testing Agents</h2>
          <p className="section-description">
            Open a patient intake page, generate a live risk dashboard, and run dynamic agents with visual cards, graphs, and emergency escalation support.
          </p>
        </div>
        <div className="dna-agents-intake-strip">
          <div>
            <h3>Start with patient intake</h3>
            <p>Enter patient details once and let every agent use the same data to update the dashboard dynamically.</p>
          </div>
          <Link to="/dna/patient-intake" className="dna-agent-intake-btn">Open patient intake →</Link>
        </div>
        <div className="dna-agents-preview-grid">
          {dnaAgentConfigs.map((agent, index) => (
            <Link key={agent.id} to={`/dna/agents/${agent.id}`} className="dna-agent-preview-card">
              <div className="dna-agent-preview-top">
                <div className="dna-agent-preview-icon">{agent.icon}</div>
                <div className="dna-agent-preview-number">0{index + 1}</div>
              </div>
              <h3>{agent.name}</h3>
              <p>{agent.subtitle}</p>
              <div className="dna-agent-visual-mini">
                <div className="mini-graph-bars">
                  <span style={{ height: `${55 + index * 4}%` }}></span>
                  <span style={{ height: `${35 + index * 5}%` }}></span>
                  <span style={{ height: `${72 - index * 3}%` }}></span>
                </div>
                <div className="mini-flow-line"></div>
                <div className="mini-alert-chip">{agent.id === 'escalation-agent' ? 'Alert + map' : 'Dynamic output'}</div>
              </div>
              <div className="dna-agent-preview-tags">
                {agent.quickPoints.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
              <div className="dna-agent-preview-cta">Open dashboard →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-header">
          <span className="section-label">{t.faq.sectionLabel}</span>
          <h2>{t.faq.title}</h2>
          <p className="section-description">{t.faq.description}</p>
        </div>
        <div className="faq-container">
          {t.faq.items.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            >
              <div className="faq-question">
                <h4>{faq.question}</h4>
                <span className="faq-toggle">{expandedFaq === index ? '−' : '+'}</span>
              </div>
              {expandedFaq === index && <div className="faq-answer"><p>{faq.answer}</p></div>}
            </div>
          ))}
        </div>
      </section>

      <Footer t={t} />
    </div>
  );
};

export default DNA;
