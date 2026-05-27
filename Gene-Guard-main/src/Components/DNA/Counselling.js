import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronDown, ChevronUp, Heart, Users, Baby, Dna, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import './Counselling.css';

const translations = {
  eng: {
    nav_counselling: 'Counselling',
    hero_title: 'Your Journey to Understanding',
    hero_title_accent: 'Genetic Health',
    hero_description: 'Expert guidance, compassionate care, and clear answers for your genetic health questions. We\'re here to support you every step of the way.',
    btn_book_session: 'Book a Session',
    btn_learn_more: 'Learn More',
    section_when_counseling: 'When Should You Consider Genetic Counseling?',
    section_when_subtitle: 'Understanding when to seek genetic counseling can help you make informed decisions about your health',
    scenario_family_history: 'Family History',
    scenario_family_question: 'Do genetic conditions run in your family?',
    scenario_family_description: 'If you have relatives with inherited conditions like cancer, heart disease, or rare genetic disorders, counseling can help assess your risk.',
    scenario_family_learn: 'Genetic counselors analyze family patterns to identify potential hereditary conditions and recommend appropriate testing.',
    scenario_pregnancy: 'Pregnancy Planning',
    scenario_pregnancy_question: 'Are you planning a pregnancy or currently pregnant?',
    scenario_pregnancy_description: 'Genetic counseling helps understand risks of passing conditions to your child and guides prenatal testing decisions.',
    scenario_pregnancy_learn: 'Counselors discuss carrier screening, prenatal diagnosis options, and help interpret test results during pregnancy.',
    scenario_personal: 'Personal Diagnosis',
    scenario_personal_question: 'Have you been diagnosed with a genetic condition?',
    scenario_personal_description: 'Understanding your diagnosis, treatment options, and implications for family members is crucial.',
    scenario_personal_learn: 'Genetic counselors explain your condition, available treatments, and help coordinate genetic testing for relatives.',
    scenario_symptoms: 'Unexplained Symptoms',
    scenario_symptoms_question: 'Do you have unexplained medical symptoms?',
    scenario_symptoms_description: 'Persistent symptoms without clear cause may have a genetic basis that counseling can help identify.',
    scenario_symptoms_learn: 'Counselors review medical history and recommend genetic tests that might explain complex or unusual symptoms.',
    btn_book_consultation: 'Book a Consultation',
    section_booking_title: 'Book Your Virtual Counseling Session',
    section_booking_subtitle: 'Connect with expert genetic counselors from the comfort of your home',
    step_concern: 'Concern',
    step_counselor: 'Counselor',
    step_schedule: 'Schedule',
    step_confirm: 'Confirm',
    booking_step1_title: 'What brings you to genetic counseling?',
    booking_step1_subtitle: 'Select the concern that best describes your situation',
    concern_family_history: 'Family History Concerns',
    concern_pregnancy: 'Pregnancy Planning',
    concern_diagnosis: 'Existing Diagnosis',
    concern_symptoms: 'Unexplained Symptoms',
    concern_cancer_risk: 'Cancer Risk Assessment',
    concern_other: 'Other',
    booking_step2_title: 'Choose Your Counselor',
    booking_step2_subtitle: 'Select a counselor based on their expertise and availability',
    counselor_1_name: 'Dr. Sarah Mitchell',
    counselor_1_specialty: 'Cancer Genetics & Hereditary Syndromes',
    counselor_2_name: 'Dr. James Chen',
    counselor_2_specialty: 'Prenatal & Pediatric Genetics',
    counselor_3_name: 'Dr. Emily Rodriguez',
    counselor_3_specialty: 'Cardiovascular & Metabolic Genetics',
    booking_step3_title: 'Select Date & Time',
    booking_step3_subtitle: 'Choose a convenient time for your counseling session',
    label_select_date: 'Select Date',
    label_select_time: 'Select Time',
    booking_step4_title: 'Review Your Appointment',
    summary_concern: 'Concern',
    summary_counselor: 'Counselor',
    summary_date: 'Date',
    summary_time: 'Time',
    btn_confirm: 'Confirm Appointment',
    confirmation_note: 'You\'ll receive a confirmation email with meeting details and preparation guidelines',
    btn_back: 'Back',
    btn_continue: 'Continue',
    prep_title: 'How to Prepare for Your Session',
    prep_1: 'Gather your medical history and records',
    prep_2: 'Document family health history (at least 3 generations)',
    prep_3: 'List current medications and supplements',
    prep_4: 'Prepare questions you want to ask',
    prep_5: 'Ensure stable internet connection for virtual session',
    faq_title: 'Frequently Asked Questions',
    faq_1_question: 'What should I bring to my genetic counseling appointment?',
    faq_1_answer: 'Bring your medical records, family health history (including ages and conditions), any previous genetic test results, and a list of medications. Having information about relatives\' health conditions is especially helpful.',
    faq_2_question: 'How long does a genetic counseling session take?',
    faq_2_answer: 'Initial sessions typically last 60-90 minutes. Follow-up appointments are usually shorter, around 30-45 minutes. Virtual sessions follow the same timeframe.',
    faq_3_question: 'Will my insurance cover genetic counseling?',
    faq_3_answer: 'Most insurance plans cover genetic counseling when medically indicated. We recommend contacting your insurance provider before your appointment to understand your coverage.',
    faq_4_question: 'Is genetic counseling confidential?',
    faq_4_answer: 'Yes, all genetic counseling sessions are completely confidential and protected under HIPAA privacy laws. Your information will not be shared without your explicit consent.',
    footer_platform: 'PLATFORM',
    footer_services: 'SERVICES',
    footer_company: 'COMPANY',
    footer_legal: 'LEGAL',
    footer_learn_genetics: 'Learn Genetics',
    footer_genetic_disorders: 'Genetic Disorders',
    footer_genetic_counseling: 'Genetic Counseling',
    footer_ai_assessment: 'AI Assessment',
    footer_dna_testing: 'DNA Testing',
    footer_reports_insights: 'Reports & Insights',
    footer_consultations: 'Consultations',
    footer_research: 'Research',
    footer_about_us: 'About Us',
    footer_our_team: 'Our Team',
    footer_careers: 'Careers',
    footer_contact: 'Contact',
    footer_privacy_policy: 'Privacy Policy',
    footer_terms_of_service: 'Terms of Service',
    footer_hipaa_compliance: 'HIPAA Compliance',
    footer_cookie_policy: 'Cookie Policy',
    footer_tagline: 'Empowering genetic awareness through accessible education, advanced AI assessment, and personalized insights.',
    footer_copyright: '© 2026 GeneGuard. All rights reserved.',
  },

  hin: {
    nav_counselling: 'परामर्श',
    hero_title: 'आपकी यात्रा समझने की ओर',
    hero_title_accent: 'आनुवंशिक स्वास्थ्य',
    hero_description: 'विशेषज्ञ मार्गदर्शन, सहानुभूतिपूर्वक देखभाल, और आपके आनुवंशिक स्वास्थ्य प्रश्नों के स्पष्ट उत्तर। हम आपके हर कदम पर आपका समर्थन करने के लिए यहाँ हैं।',
    btn_book_session: 'सत्र बुक करें',
    btn_learn_more: 'अधिक जानें',
    section_when_counseling: 'आपको आनुवंशिक परामर्श पर कब विचार करना चाहिए?',
    section_when_subtitle: 'यह समझना कि कब आनुवंशिक परामर्श लें, आपको अपने स्वास्थ्य के बारे में सूचित निर्णय लेने में मदद कर सकता है',
    scenario_family_history: 'पारिवारिक इतिहास',
    scenario_family_question: 'क्या आपके परिवार में आनुवंशिक स्थितियां चलती हैं?',
    scenario_family_description: 'यदि आपके रिश्तेदारों में कैंसर, हृदय रोग या दुर्लभ आनुवंशिक विकार जैसी विरासत में मिली स्थितियां हैं, तो परामर्श आपके जोखिम का आकलन करने में मदद कर सकता है।',
    scenario_family_learn: 'आनुवंशिक परामर्शदाता पारिवारिक पैटर्न का विश्लेषण करते हैं ताकि संभावित विरासत में मिली स्थितियों की पहचान की जा सके।',
    scenario_pregnancy: 'गर्भावस्था की योजना',
    scenario_pregnancy_question: 'क्या आप गर्भावस्था की योजना बना रहे हैं या वर्तमान में गर्भवती हैं?',
    scenario_pregnancy_description: 'आनुवंशिक परामर्श आपके बच्चे को स्थितियां हस्तांतरित करने के जोखिम को समझने में मदद करता है।',
    scenario_pregnancy_learn: 'परामर्शदाता वाहक स्क्रीनिंग, प्रसवपूर्व निदान विकल्पों पर चर्चा करते हैं।',
    scenario_personal: 'व्यक्तिगत निदान',
    scenario_personal_question: 'क्या आपको आनुवंशिक स्थिति का निदान किया गया है?',
    scenario_personal_description: 'अपने निदान, उपचार विकल्पों, और परिवार के सदस्यों के लिए प्रभाव को समझना महत्वपूर्ण है।',
    scenario_personal_learn: 'आनुवंशिक परामर्शदाता आपकी स्थिति की व्याख्या करते हैं।',
    scenario_symptoms: 'अस्पष्ट लक्षण',
    scenario_symptoms_question: 'क्या आपको अस्पष्ट चिकित्सा लक्षण हैं?',
    scenario_symptoms_description: 'स्पष्ट कारण के बिना लगातार लक्षण एक आनुवंशिक आधार हो सकते हैं।',
    scenario_symptoms_learn: 'परामर्शदाता चिकित्सा इतिहास की समीक्षा करते हैं।',
    btn_book_consultation: 'परामर्श बुक करें',
    section_booking_title: 'अपने वर्चुअल परामर्श सत्र को बुक करें',
    section_booking_subtitle: 'अपने घर से आरामदायक रूप से विशेषज्ञ आनुवंशिक परामर्शदाताओं से जुड़ें',
    step_concern: 'चिंता',
    step_counselor: 'परामर्शदाता',
    step_schedule: 'समय सारणी',
    step_confirm: 'पुष्टि करें',
    booking_step1_title: 'आपको आनुवंशिक परामर्श के लिए क्या लाता है?',
    booking_step1_subtitle: 'वह चिंता चुनें जो आपकी स्थिति को सबसे अच्छी तरह वर्णित करती है',
    concern_family_history: 'पारिवारिक इतिहास की चिंताएं',
    concern_pregnancy: 'गर्भावस्था की योजना',
    concern_diagnosis: 'मौजूदा निदान',
    concern_symptoms: 'अस्पष्ट लक्षण',
    concern_cancer_risk: 'कैंसर जोखिम मूल्यांकन',
    concern_other: 'अन्य',
    booking_step2_title: 'अपने परामर्शदाता को चुनें',
    booking_step2_subtitle: 'उनकी विशेषज्ञता और उपलब्धता के आधार पर एक परामर्शदाता चुनें',
    counselor_1_name: 'डॉ. सारा मिशेल',
    counselor_1_specialty: 'कैंसर आनुवंशिकी और विरासत में मिली सिंड्रोम',
    counselor_2_name: 'डॉ. जेम्स चेन',
    counselor_2_specialty: 'प्रसवपूर्व और बाल आनुवंशिकी',
    counselor_3_name: 'डॉ. एमिली रोड्रिग्ज',
    counselor_3_specialty: 'हृदय संबंधी और चयापचय आनुवंशिकी',
    booking_step3_title: 'तारीख और समय चुनें',
    booking_step3_subtitle: 'अपने परामर्श सत्र के लिए एक सुविधाजनक समय चुनें',
    label_select_date: 'तारीख चुनें',
    label_select_time: 'समय चुनें',
    booking_step4_title: 'अपनी नियुक्ति की समीक्षा करें',
    summary_concern: 'चिंता',
    summary_counselor: 'परामर्शदाता',
    summary_date: 'तारीख',
    summary_time: 'समय',
    btn_confirm: 'नियुक्ति की पुष्टि करें',
    confirmation_note: 'आपको बैठक विवरण और तैयारी दिशानिर्देशों के साथ एक पुष्टि ईमेल प्राप्त होगा',
    btn_back: 'वापस',
    btn_continue: 'जारी रखें',
    prep_title: 'अपने सत्र की तैयारी कैसे करें',
    prep_1: 'अपना चिकित्सा इतिहास और रिकॉर्ड एकत्र करें',
    prep_2: 'पारिवारिक स्वास्थ्य इतिहास दस्तावेज करें',
    prep_3: 'वर्तमान दवाओं और सप्लीमेंट की सूची बनाएं',
    prep_4: 'उन प्रश्नों को तैयार करें जो आप पूछना चाहते हैं',
    prep_5: 'वर्चुअल सत्र के लिए स्थिर इंटरनेट कनेक्शन सुनिश्चित करें',
    faq_title: 'अक्सर पूछे जाने वाले प्रश्न',
    faq_1_question: 'मुझे अपनी आनुवंशिक परामर्श नियुक्ति में क्या लाना चाहिए?',
    faq_1_answer: 'अपने चिकित्सा रिकॉर्ड, पारिवारिक स्वास्थ्य इतिहास, और दवाओं की सूची लाएं।',
    faq_2_question: 'एक आनुवंशिक परामर्श सत्र कितने समय तक चलता है?',
    faq_2_answer: 'प्रारंभिक सत्र आमतौर पर 60-90 मिनट तक चलते हैं।',
    faq_3_question: 'क्या मेरा बीमा आनुवंशिक परामर्श को कवर करेगा?',
    faq_3_answer: 'अधिकांश बीमा योजनाएं चिकित्सकीय रूप से संकेत मिलने पर आनुवंशिक परामर्श को कवर करती हैं।',
    faq_4_question: 'क्या आनुवंशिक परामर्श गोपनीय है?',
    faq_4_answer: 'हाँ, सभी आनुवंशिक परामर्श सत्र पूरी तरह से गोपनीय हैं।',
    footer_platform: 'प्लेटफ़ॉर्म',
    footer_services: 'सेवाएं',
    footer_company: 'कंपनी',
    footer_legal: 'कानूनी',
    footer_learn_genetics: 'आनुवंशिकी सीखें',
    footer_genetic_disorders: 'आनुवंशिक विकार',
    footer_genetic_counseling: 'आनुवंशिक परामर्श',
    footer_ai_assessment: 'AI मूल्यांकन',
    footer_dna_testing: 'डीएनए परीक्षण',
    footer_reports_insights: 'रिपोर्ट और अंतर्दृष्टि',
    footer_consultations: 'परामर्श',
    footer_research: 'अनुसंधान',
    footer_about_us: 'हमारे बारे में',
    footer_our_team: 'हमारी टीम',
    footer_careers: 'करियर',
    footer_contact: 'संपर्क',
    footer_privacy_policy: 'गोपनीयता नीति',
    footer_terms_of_service: 'सेवा की शर्तें',
    footer_hipaa_compliance: 'HIPAA अनुपालन',
    footer_cookie_policy: 'कुकी नीति',
    footer_tagline: 'सुलभ शिक्षा, उन्नत AI मूल्यांकन और व्यक्तिगत जानकारी के माध्यम से आनुवंशिक जागरूकता को सशक्त बनाना।',
    footer_copyright: '© 2026 GeneGuard। सर्वाधिकार सुरक्षित।',
  },

  // ── मराठी (Marathi) ──────────────────────────────────────────────────────────
  mar: {
    nav_counselling: 'समुपदेशन',
    hero_title: 'समजून घेण्याच्या दिशेने तुमचा प्रवास',
    hero_title_accent: 'अनुवांशिक आरोग्य',
    hero_description: 'तज्ञ मार्गदर्शन, सहानुभूतीपूर्ण काळजी आणि तुमच्या अनुवांशिक आरोग्य प्रश्नांची स्पष्ट उत्तरे. आम्ही तुमच्या प्रत्येक पावलावर तुमच्यासोबत आहोत.',
    btn_book_session: 'सत्र बुक करा',
    btn_learn_more: 'अधिक जाणून घ्या',
    section_when_counseling: 'तुम्ही अनुवांशिक समुपदेशन कधी विचारात घ्यावे?',
    section_when_subtitle: 'अनुवांशिक समुपदेशन कधी घ्यायचे हे समजून घेतल्यास तुम्हाला तुमच्या आरोग्याबाबत माहितीपूर्ण निर्णय घेण्यास मदत होते',
    scenario_family_history: 'कौटुंबिक इतिहास',
    scenario_family_question: 'तुमच्या कुटुंबात अनुवांशिक स्थिती आढळतात का?',
    scenario_family_description: 'जर तुमच्या नातेवाईकांना कर्करोग, हृदयरोग किंवा दुर्मिळ अनुवांशिक विकार असतील, तर समुपदेशन तुमच्या जोखमीचे मूल्यांकन करण्यास मदत करू शकते.',
    scenario_family_learn: 'अनुवांशिक समुपदेशक कौटुंबिक नमुन्यांचे विश्लेषण करून संभाव्य आनुवंशिक स्थिती ओळखतात आणि योग्य चाचण्या सुचवतात.',
    scenario_pregnancy: 'गर्भधारणेचे नियोजन',
    scenario_pregnancy_question: 'तुम्ही गर्भधारणेचे नियोजन करत आहात किंवा सध्या गर्भवती आहात का?',
    scenario_pregnancy_description: 'अनुवांशिक समुपदेशन मुलाला स्थिती हस्तांतरित होण्याचा धोका समजण्यास आणि प्रसवपूर्व चाचणी निर्णयांचे मार्गदर्शन करण्यास मदत करते.',
    scenario_pregnancy_learn: 'समुपदेशक वाहक स्क्रीनिंग, प्रसवपूर्व निदान पर्यायांवर चर्चा करतात आणि गर्भधारणेदरम्यान चाचणी परिणाम समजण्यास मदत करतात.',
    scenario_personal: 'वैयक्तिक निदान',
    scenario_personal_question: 'तुम्हाला अनुवांशिक स्थितीचे निदान झाले आहे का?',
    scenario_personal_description: 'तुमचे निदान, उपचार पर्याय आणि कुटुंबातील सदस्यांसाठी परिणाम समजून घेणे महत्त्वाचे आहे.',
    scenario_personal_learn: 'अनुवांशिक समुपदेशक तुमची स्थिती स्पष्ट करतात, उपलब्ध उपचार सांगतात आणि नातेवाईकांसाठी अनुवांशिक चाचणीचे समन्वय करण्यास मदत करतात.',
    scenario_symptoms: 'अस्पष्ट लक्षणे',
    scenario_symptoms_question: 'तुम्हाला अस्पष्ट वैद्यकीय लक्षणे आहेत का?',
    scenario_symptoms_description: 'स्पष्ट कारण नसलेल्या सततच्या लक्षणांचा अनुवांशिक आधार असू शकतो जो समुपदेशन ओळखण्यास मदत करू शकते.',
    scenario_symptoms_learn: 'समुपदेशक वैद्यकीय इतिहासाचे पुनरावलोकन करतात आणि जटिल किंवा असामान्य लक्षणे स्पष्ट करू शकणाऱ्या अनुवांशिक चाचण्या सुचवतात.',
    btn_book_consultation: 'सल्लामसलत बुक करा',
    section_booking_title: 'तुमचे व्हर्च्युअल समुपदेशन सत्र बुक करा',
    section_booking_subtitle: 'तुमच्या घरच्या आरामात तज्ञ अनुवांशिक समुपदेशकांशी संपर्क साधा',
    step_concern: 'चिंता',
    step_counselor: 'समुपदेशक',
    step_schedule: 'वेळापत्रक',
    step_confirm: 'पुष्टी करा',
    booking_step1_title: 'तुम्ही अनुवांशिक समुपदेशनासाठी का आलात?',
    booking_step1_subtitle: 'तुमच्या परिस्थितीचे सर्वोत्तम वर्णन करणारी चिंता निवडा',
    concern_family_history: 'कौटुंबिक इतिहासाच्या चिंता',
    concern_pregnancy: 'गर्भधारणेचे नियोजन',
    concern_diagnosis: 'विद्यमान निदान',
    concern_symptoms: 'अस्पष्ट लक्षणे',
    concern_cancer_risk: 'कर्करोग जोखीम मूल्यांकन',
    concern_other: 'इतर',
    booking_step2_title: 'तुमचा समुपदेशक निवडा',
    booking_step2_subtitle: 'त्यांच्या तज्ञतेनुसार आणि उपलब्धतेनुसार समुपदेशक निवडा',
    counselor_1_name: 'डॉ. सारा मिशेल',
    counselor_1_specialty: 'कर्करोग अनुवंशशास्त्र आणि आनुवंशिक सिंड्रोम',
    counselor_2_name: 'डॉ. जेम्स चेन',
    counselor_2_specialty: 'प्रसवपूर्व आणि बालरोग अनुवंशशास्त्र',
    counselor_3_name: 'डॉ. एमिली रॉड्रिग्ज',
    counselor_3_specialty: 'हृदय व रक्तवाहिन्यासंबंधी आणि चयापचय अनुवंशशास्त्र',
    booking_step3_title: 'तारीख आणि वेळ निवडा',
    booking_step3_subtitle: 'तुमच्या समुपदेशन सत्रासाठी सोयीस्कर वेळ निवडा',
    label_select_date: 'तारीख निवडा',
    label_select_time: 'वेळ निवडा',
    booking_step4_title: 'तुमची भेट तपासा',
    summary_concern: 'चिंता',
    summary_counselor: 'समुपदेशक',
    summary_date: 'तारीख',
    summary_time: 'वेळ',
    btn_confirm: 'भेट निश्चित करा',
    confirmation_note: 'तुम्हाला बैठकीचे तपशील आणि तयारीच्या मार्गदर्शक सूचनांसह पुष्टी ईमेल मिळेल',
    btn_back: 'मागे',
    btn_continue: 'पुढे सुरू ठेवा',
    prep_title: 'तुमच्या सत्राची तयारी कशी करावी',
    prep_1: 'तुमचा वैद्यकीय इतिहास आणि नोंदी गोळा करा',
    prep_2: 'कौटुंबिक आरोग्य इतिहास नोंदवा (किमान ३ पिढ्या)',
    prep_3: 'सध्याच्या औषधे आणि पूरकांची यादी करा',
    prep_4: 'तुम्हाला विचारायचे प्रश्न तयार करा',
    prep_5: 'व्हर्च्युअल सत्रासाठी स्थिर इंटरनेट कनेक्शन सुनिश्चित करा',
    faq_title: 'वारंवार विचारले जाणारे प्रश्न',
    faq_1_question: 'मी माझ्या अनुवांशिक समुपदेशन भेटीत काय आणावे?',
    faq_1_answer: 'तुमचे वैद्यकीय रेकॉर्ड, कौटुंबिक आरोग्य इतिहास (वय आणि स्थितींसह), मागील अनुवांशिक चाचणी परिणाम आणि औषधांची यादी आणा.',
    faq_2_question: 'अनुवांशिक समुपदेशन सत्र किती वेळ घेते?',
    faq_2_answer: 'प्रारंभिक सत्रे सामान्यतः ६०-९० मिनिटे असतात. फॉलो-अप भेटी साधारणपणे ३०-४५ मिनिटे असतात.',
    faq_3_question: 'माझा विमा अनुवांशिक समुपदेशन कव्हर करेल का?',
    faq_3_answer: 'बहुतेक विमा योजना वैद्यकीयदृष्ट्या सूचित केल्यावर अनुवांशिक समुपदेशन कव्हर करतात. भेटीपूर्वी तुमच्या विमा प्रदात्याशी संपर्क करण्याची शिफारस करतो.',
    faq_4_question: 'अनुवांशिक समुपदेशन गोपनीय आहे का?',
    faq_4_answer: 'हो, सर्व अनुवांशिक समुपदेशन सत्रे पूर्णपणे गोपनीय असतात आणि HIPAA गोपनीयता कायद्यांतर्गत संरक्षित असतात.',
    footer_platform: 'प्लॅटफॉर्म',
    footer_services: 'सेवा',
    footer_company: 'कंपनी',
    footer_legal: 'कायदेशीर',
    footer_learn_genetics: 'अनुवंशशास्त्र शिका',
    footer_genetic_disorders: 'अनुवांशिक विकार',
    footer_genetic_counseling: 'अनुवांशिक समुपदेशन',
    footer_ai_assessment: 'AI मूल्यमापन',
    footer_dna_testing: 'DNA चाचणी',
    footer_reports_insights: 'अहवाल आणि अंतर्दृष्टी',
    footer_consultations: 'सल्लामसलत',
    footer_research: 'संशोधन',
    footer_about_us: 'आमच्याबद्दल',
    footer_our_team: 'आमची टीम',
    footer_careers: 'करिअर',
    footer_contact: 'संपर्क',
    footer_privacy_policy: 'गोपनीयता धोरण',
    footer_terms_of_service: 'सेवेच्या अटी',
    footer_hipaa_compliance: 'HIPAA अनुपालन',
    footer_cookie_policy: 'कुकी धोरण',
    footer_tagline: 'सुलभ शिक्षण, प्रगत AI मूल्यमापन आणि वैयक्तिक अंतर्दृष्टीद्वारे अनुवांशिक जागरूकता सशक्त करणे.',
    footer_copyright: '© 2026 GeneGuard. सर्व हक्क राखीव.',
  },

  // ── తెలుగు (Telugu) ──────────────────────────────────────────────────────────
  tel: {
    nav_counselling: 'కౌన్సెలింగ్',
    hero_title: 'అర్థం చేసుకోవడానికి మీ ప్రయాణం',
    hero_title_accent: 'జన్యు ఆరోగ్యం',
    hero_description: 'నిపుణుల మార్గదర్శకత్వం, సానుభూతిపూర్వక సంరక్షణ మరియు మీ జన్యు ఆరోగ్య ప్రశ్నలకు స్పష్టమైన సమాధానాలు. మేము మీ ప్రతి అడుగులో మీకు మద్దతు ఇవ్వడానికి ఇక్కడ ఉన్నాము.',
    btn_book_session: 'సెషన్ బుక్ చేయండి',
    btn_learn_more: 'మరింత తెలుసుకోండి',
    section_when_counseling: 'మీరు జన్యు కౌన్సెలింగ్‌ను ఎప్పుడు పరిగణించాలి?',
    section_when_subtitle: 'జన్యు కౌన్సెలింగ్ ఎప్పుడు తీసుకోవాలో అర్థం చేసుకోవడం మీ ఆరోగ్యంపై సమాచారంతో నిర్ణయాలు తీసుకోవడంలో సహాయపడుతుంది',
    scenario_family_history: 'కుటుంబ చరిత్ర',
    scenario_family_question: 'మీ కుటుంబంలో జన్యు పరిస్థితులు ఉన్నాయా?',
    scenario_family_description: 'మీ బంధువులకు క్యాన్సర్, హృదయ వ్యాధి లేదా అరుదైన జన్యు రుగ్మతలు వంటి వంశపారంపర్య పరిస్థితులు ఉంటే, కౌన్సెలింగ్ మీ ప్రమాదాన్ని అంచనా వేయడంలో సహాయపడుతుంది.',
    scenario_family_learn: 'జన్యు కౌన్సెలర్లు సంభావ్య వంశపారంపర్య పరిస్థితులను గుర్తించడానికి కుటుంబ నమూనాలను విశ్లేషిస్తారు మరియు తగిన పరీక్షలను సిఫారసు చేస్తారు.',
    scenario_pregnancy: 'గర్భధారణ ప్రణాళిక',
    scenario_pregnancy_question: 'మీరు గర్భధారణను ప్లాన్ చేస్తున్నారా లేదా ప్రస్తుతం గర్భవతిగా ఉన్నారా?',
    scenario_pregnancy_description: 'జన్యు కౌన్సెలింగ్ మీ బిడ్డకు పరిస్థితులు అందించే ప్రమాదాలను అర్థం చేసుకోవడంలో మరియు జన్మపూర్వ పరీక్ష నిర్ణయాలను మార్గనిర్దేశం చేయడంలో సహాయపడుతుంది.',
    scenario_pregnancy_learn: 'కౌన్సెలర్లు క్యారియర్ స్క్రీనింగ్, జన్మపూర్వ నిర్ధారణ ఎంపికలు చర్చిస్తారు మరియు గర్భధారణ సమయంలో పరీక్ష ఫలితాలను అర్థం చేసుకోవడంలో సహాయపడతారు.',
    scenario_personal: 'వ్యక్తిగత నిర్ధారణ',
    scenario_personal_question: 'మీకు జన్యు పరిస్థితి నిర్ధారించబడిందా?',
    scenario_personal_description: 'మీ నిర్ధారణ, చికిత్స ఎంపికలు మరియు కుటుంబ సభ్యులకు చిక్కులను అర్థం చేసుకోవడం చాలా ముఖ్యం.',
    scenario_personal_learn: 'జన్యు కౌన్సెలర్లు మీ పరిస్థితిని వివరిస్తారు, అందుబాటులో ఉన్న చికిత్సలు చెప్పి బంధువులకు జన్యు పరీక్షలను సమన్వయం చేయడంలో సహాయపడతారు.',
    scenario_symptoms: 'వివరించలేని లక్షణాలు',
    scenario_symptoms_question: 'మీకు వివరించలేని వైద్య లక్షణాలు ఉన్నాయా?',
    scenario_symptoms_description: 'స్పష్టమైన కారణం లేకుండా నిరంతరం కొనసాగే లక్షణాలకు జన్యు ఆధారం ఉండవచ్చు, దీన్ని కౌన్సెలింగ్ గుర్తించడంలో సహాయపడుతుంది.',
    scenario_symptoms_learn: 'కౌన్సెలర్లు వైద్య చరిత్రను సమీక్షించి సంక్లిష్టమైన లేదా అసాధారణ లక్షణాలను వివరించగల జన్యు పరీక్షలను సిఫారసు చేస్తారు.',
    btn_book_consultation: 'సంప్రదింపు బుక్ చేయండి',
    section_booking_title: 'మీ వర్చువల్ కౌన్సెలింగ్ సెషన్ బుక్ చేయండి',
    section_booking_subtitle: 'మీ ఇంటి సౌకర్యం నుండి నిపుణుల జన్యు కౌన్సెలర్లతో కనెక్ట్ అవ్వండి',
    step_concern: 'ఆందోళన',
    step_counselor: 'కౌన్సెలర్',
    step_schedule: 'షెడ్యూల్',
    step_confirm: 'నిర్ధారించండి',
    booking_step1_title: 'జన్యు కౌన్సెలింగ్‌కు మీరు ఎందుకు వచ్చారు?',
    booking_step1_subtitle: 'మీ పరిస్థితిని బాగా వర్ణించే ఆందోళనను ఎంచుకోండి',
    concern_family_history: 'కుటుంబ చరిత్ర ఆందోళనలు',
    concern_pregnancy: 'గర్భధారణ ప్రణాళిక',
    concern_diagnosis: 'ఇప్పటికే ఉన్న నిర్ధారణ',
    concern_symptoms: 'వివరించలేని లక్షణాలు',
    concern_cancer_risk: 'క్యాన్సర్ ప్రమాద అంచనా',
    concern_other: 'ఇతర',
    booking_step2_title: 'మీ కౌన్సెలర్‌ను ఎంచుకోండి',
    booking_step2_subtitle: 'వారి నైపుణ్యం మరియు అందుబాటు ఆధారంగా కౌన్సెలర్‌ను ఎంచుకోండి',
    counselor_1_name: 'డా. సారా మిచెల్',
    counselor_1_specialty: 'క్యాన్సర్ జెనెటిక్స్ & వంశపారంపర్య సిండ్రోమ్‌లు',
    counselor_2_name: 'డా. జేమ్స్ చెన్',
    counselor_2_specialty: 'జన్మపూర్వ & శిశువైద్య జెనెటిక్స్',
    counselor_3_name: 'డా. ఎమిలీ రోడ్రిగెజ్',
    counselor_3_specialty: 'హృదయనాళ & జీవక్రియ జెనెటిక్స్',
    booking_step3_title: 'తేదీ & సమయం ఎంచుకోండి',
    booking_step3_subtitle: 'మీ కౌన్సెలింగ్ సెషన్‌కు సౌకర్యవంతమైన సమయాన్ని ఎంచుకోండి',
    label_select_date: 'తేదీ ఎంచుకోండి',
    label_select_time: 'సమయం ఎంచుకోండి',
    booking_step4_title: 'మీ అపాయింట్‌మెంట్ సమీక్షించండి',
    summary_concern: 'ఆందోళన',
    summary_counselor: 'కౌన్సెలర్',
    summary_date: 'తేదీ',
    summary_time: 'సమయం',
    btn_confirm: 'అపాయింట్‌మెంట్ నిర్ధారించండి',
    confirmation_note: 'మీకు మీటింగ్ వివరాలు మరియు తయారీ మార్గదర్శకాలతో నిర్ధారణ ఇమెయిల్ వస్తుంది',
    btn_back: 'వెనుకకు',
    btn_continue: 'కొనసాగించండి',
    prep_title: 'మీ సెషన్‌కు ఎలా సిద్ధం కావాలి',
    prep_1: 'మీ వైద్య చరిత్ర మరియు రికార్డులు సేకరించండి',
    prep_2: 'కుటుంబ ఆరోగ్య చరిత్రను నమోదు చేయండి (కనీసం 3 తరాలు)',
    prep_3: 'ప్రస్తుత మందులు మరియు సప్లిమెంట్ల జాబితా తయారు చేయండి',
    prep_4: 'మీరు అడగాలనుకున్న ప్రశ్నలు సిద్ధం చేయండి',
    prep_5: 'వర్చువల్ సెషన్‌కు స్థిరమైన ఇంటర్నెట్ కనెక్షన్ నిర్ధారించుకోండి',
    faq_title: 'తరచుగా అడిగే ప్రశ్నలు',
    faq_1_question: 'నా జన్యు కౌన్సెలింగ్ అపాయింట్‌మెంట్‌కు నేను ఏమి తీసుకురావాలి?',
    faq_1_answer: 'మీ వైద్య రికార్డులు, కుటుంబ ఆరోగ్య చరిత్ర (వయసులు మరియు పరిస్థితులతో సహా), మునుపటి జన్యు పరీక్ష ఫలితాలు మరియు మందుల జాబితా తీసుకురండి.',
    faq_2_question: 'జన్యు కౌన్సెలింగ్ సెషన్ ఎంత సేపు పడుతుంది?',
    faq_2_answer: 'ప్రారంభ సెషన్‌లు సాధారణంగా 60-90 నిమిషాలు ఉంటాయి. ఫాలో-అప్ అపాయింట్‌మెంట్‌లు సాధారణంగా 30-45 నిమిషాలు ఉంటాయి.',
    faq_3_question: 'నా బీమా జన్యు కౌన్సెలింగ్‌ను కవర్ చేస్తుందా?',
    faq_3_answer: 'చాలా బీమా ప్రణాళికలు వైద్యపరంగా సూచించబడినప్పుడు జన్యు కౌన్సెలింగ్‌ను కవర్ చేస్తాయి. మీ కవరేజ్ అర్థం చేసుకోవడానికి అపాయింట్‌మెంట్ ముందు మీ బీమా ప్రదాతను సంప్రదించమని సిఫారసు చేస్తున్నాము.',
    faq_4_question: 'జన్యు కౌన్సెలింగ్ గోప్యంగా ఉంటుందా?',
    faq_4_answer: 'అవును, అన్ని జన్యు కౌన్సెలింగ్ సెషన్‌లు పూర్తిగా గోప్యంగా ఉంటాయి మరియు HIPAA గోప్యతా చట్టాల ద్వారా రక్షించబడతాయి.',
    footer_platform: 'ప్లాట్‌ఫారమ్',
    footer_services: 'సేవలు',
    footer_company: 'కంపెనీ',
    footer_legal: 'చట్టపరమైన',
    footer_learn_genetics: 'జెనెటిక్స్ నేర్చుకోండి',
    footer_genetic_disorders: 'జన్యు వ్యాధులు',
    footer_genetic_counseling: 'జన్యు కౌన్సెలింగ్',
    footer_ai_assessment: 'AI మూల్యాంకనం',
    footer_dna_testing: 'DNA పరీక్ష',
    footer_reports_insights: 'నివేదికలు & అంతర్దృష్టి',
    footer_consultations: 'సంప్రదింపులు',
    footer_research: 'పరిశోధన',
    footer_about_us: 'మా గురించి',
    footer_our_team: 'మా బృందం',
    footer_careers: 'కెరీర్లు',
    footer_contact: 'సంప్రదించండి',
    footer_privacy_policy: 'గోప్యతా విధానం',
    footer_terms_of_service: 'సేవా నిబంధనలు',
    footer_hipaa_compliance: 'HIPAA అనుసరణ',
    footer_cookie_policy: 'కుకీ విధానం',
    footer_tagline: 'అందుబాటులో ఉన్న విద్య, అధునాతన AI మూల్యాంకనం మరియు వ్యక్తిగతీకరించిన అంతర్దృష్టుల ద్వారా జన్యు అవగాహనను శక్తివంతం చేయడం.',
    footer_copyright: '© 2026 GeneGuard. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
  }
};

export default function Counselling() {
  const [language, setLanguage] = useState('eng');
  const [activeScenario, setActiveScenario] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Navbar states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const t = (key) => translations[language][key] || key;

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle mobile menu body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const scenarios = [
    {
      id: 1,
      icon: <Users size={32} />,
      title: t('scenario_family_history'),
      question: t('scenario_family_question'),
      description: t('scenario_family_description'),
      learn: t('scenario_family_learn')
    },
    {
      id: 2,
      icon: <Baby size={32} />,
      title: t('scenario_pregnancy'),
      question: t('scenario_pregnancy_question'),
      description: t('scenario_pregnancy_description'),
      learn: t('scenario_pregnancy_learn')
    },
    {
      id: 3,
      icon: <Heart size={32} />,
      title: t('scenario_personal'),
      question: t('scenario_personal_question'),
      description: t('scenario_personal_description'),
      learn: t('scenario_personal_learn')
    },
    {
      id: 4,
      icon: <Dna size={32} />,
      title: t('scenario_symptoms'),
      question: t('scenario_symptoms_question'),
      description: t('scenario_symptoms_description'),
      learn: t('scenario_symptoms_learn')
    }
  ];

  const counselors = [
    {
      id: 1,
      name: t('counselor_1_name'),
      specialty: t('counselor_1_specialty'),
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: t('counselor_2_name'),
      specialty: t('counselor_2_specialty'),
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: t('counselor_3_name'),
      specialty: t('counselor_3_specialty'),
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop'
    }
  ];

  const faqs = [
    { question: t('faq_1_question'), answer: t('faq_1_answer') },
    { question: t('faq_2_question'), answer: t('faq_2_answer') },
    { question: t('faq_3_question'), answer: t('faq_3_answer') },
    { question: t('faq_4_question'), answer: t('faq_4_answer') }
  ];

  const concerns = [
    t('concern_family_history'),
    t('concern_pregnancy'),
    t('concern_diagnosis'),
    t('concern_symptoms'),
    t('concern_cancer_risk'),
    t('concern_other')
  ];

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedConcern('');
    setSelectedCounselor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className="counselling-page-wrapper">
    {/* ─── Navbar ─────────────────────────────────────────────────────── */}
         <nav className={`dna-main-navbar ${isScrolled ? 'dna-navbar-scrolled' : ''}`}>
           <div className="dna-nav-content">
   
             {/* Logo links to home page */}
             <Link to="/home" className="dna-nav-logo" style={{ textDecoration: 'none' }}>
               <div className="dna-logo-circle"></div>
               <span className="dna-logo-brand">Gene Guard</span>
             </Link>
          
          <div className="dna-nav-right-section">
            <div className="dna-nav-links">
              <Link to="/learn-genetics" className="dna-nav-link">Learn Genetics</Link>
              <Link to="/genetic-disorders" className="dna-nav-link">Genetic Disorders</Link>
              <Link to="/counselling" className="dna-nav-link active">Counselling</Link>
              <Link to="/genetic-assessment" className="dna-nav-link">Genetic Assessment AI</Link>
              <Link to="/dna" className="dna-nav-link">DNA Testing</Link>
              <Link to="/about" className="dna-nav-link">About Us</Link>
            </div>

            {/* Language Buttons */}
            <div className="dna-language-buttons">
              <button 
                className={`dna-lang-btn ${language === 'eng' ? 'active' : ''}`}
                onClick={() => setLanguage('eng')}
              >EN</button>
              <button 
                className={`dna-lang-btn ${language === 'hin' ? 'active' : ''}`}
                onClick={() => setLanguage('hin')}
              >हिं</button>
              <button 
                className={`dna-lang-btn ${language === 'mar' ? 'active' : ''}`}
                onClick={() => setLanguage('mar')}
              >मर</button>
              <button 
                className={`dna-lang-btn ${language === 'tel' ? 'active' : ''}`}
                onClick={() => setLanguage('tel')}
              >తె</button>
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
                  <Link to="/login" className="dna-dropdown-item dna-signup-special">Login</Link>
                  <Link to="/signup" className="dna-dropdown-item dna-signup-special">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="dna-mobile-menu-overlay">
          <Link to="/learn-genetics" className="dna-nav-link" onClick={handleLinkClick}>Learn Genetics</Link>
          <Link to="/genetic-disorders" className="dna-nav-link" onClick={handleLinkClick}>Genetic Disorders</Link>
          <Link to="/counselling" className="dna-nav-link active" onClick={handleLinkClick}>Counselling</Link>
          <Link to="/genetic-assessment" className="dna-nav-link" onClick={handleLinkClick}>Genetic Assessment AI</Link>
          <Link to="/dna" className="dna-nav-link" onClick={handleLinkClick}>DNA Testing</Link>
          <Link to="/about" className="dna-nav-link" onClick={handleLinkClick}>About Us</Link>
        </div>
      )}

      <div className="counselling-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                {t('hero_title')}
                <span className="accent-text"> {t('hero_title_accent')}</span>
              </h1>
              <p className="hero-description">{t('hero_description')}</p>
              <div className="hero-cta">
                <button className="btn-primary" onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}>
                  {t('btn_book_session')}
                </button>
                <button className="btn-secondary" onClick={() => document.getElementById('scenarios').scrollIntoView({ behavior: 'smooth' })}>
                  {t('btn_learn_more')}
                </button>
              </div>
            </div>
            <div className="hero-image">
              <img src="https://images.ctfassets.net/67wivm6jm6qo/3OvDULo4haCHr4Pc0oWLAR/2c91ddbfa0facc8960b70605dd7dc108/Cortica_Research_Study_Ads.png" alt="Genetic counseling" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Scenarios Section */}
        <section className="scenarios-section" id="scenarios">
          <div className="section-header">
            <h2 className="section-title">{t('section_when_counseling')}</h2>
            <p className="section-subtitle">{t('section_when_subtitle')}</p>
          </div>
          <div className="scenarios-grid">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`scenario-card ${activeScenario === scenario.id ? 'active' : ''}`}
                onClick={() => setActiveScenario(activeScenario === scenario.id ? null : scenario.id)}
              >
                <div className="scenario-header">
                  <div className="scenario-icon">{scenario.icon}</div>
                  <h3 className="scenario-title">{scenario.title}</h3>
                </div>
                <p className="scenario-question">{scenario.question}</p>
                <p className="scenario-description">{scenario.description}</p>
                {activeScenario === scenario.id && (
                  <div className="scenario-expanded">
                    <div className="divider"></div>
                    <p className="scenario-learn-more">{scenario.learn}</p>
                    <button className="learn-more-btn" onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}>
                      {t('btn_book_consultation')}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Booking Section */}
        <section className="booking-section" id="booking">
          <div className="section-header">
            <h2 className="section-title">{t('section_booking_title')}</h2>
            <p className="section-subtitle">{t('section_booking_subtitle')}</p>
          </div>

          <div className="booking-container">
            {/* Progress Indicator */}
            <div className="progress-indicator">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="progress-step-wrapper">
                  <div className={`progress-step ${bookingStep >= step ? 'active' : ''} ${bookingStep > step ? 'completed' : ''}`}>
                    {bookingStep > step ? <CheckCircle size={20} /> : step}
                  </div>
                  <span className="progress-label">
                    {step === 1 && t('step_concern')}
                    {step === 2 && t('step_counselor')}
                    {step === 3 && t('step_schedule')}
                    {step === 4 && t('step_confirm')}
                  </span>
                  {step < 4 && <div className={`progress-line ${bookingStep > step ? 'completed' : ''}`}></div>}
                </div>
              ))}
            </div>

            {/* Booking Content */}
            <div className="booking-content">
              {/* Step 1 */}
              {bookingStep === 1 && (
                <div className="booking-step">
                  <h3 className="step-title">{t('booking_step1_title')}</h3>
                  <p className="step-description">{t('booking_step1_subtitle')}</p>
                  <div className="concern-grid">
                    {concerns.map((concern, idx) => (
                      <button
                        key={idx}
                        className={`concern-card ${selectedConcern === concern ? 'selected' : ''}`}
                        onClick={() => setSelectedConcern(concern)}
                      >
                        <AlertCircle size={24} className="concern-icon" />
                        <span>{concern}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {bookingStep === 2 && (
                <div className="booking-step">
                  <h3 className="step-title">{t('booking_step2_title')}</h3>
                  <p className="step-description">{t('booking_step2_subtitle')}</p>
                  <div className="counselor-grid">
                    {counselors.map((counselor) => (
                      <div
                        key={counselor.id}
                        className={`counselor-card ${selectedCounselor?.id === counselor.id ? 'selected' : ''}`}
                        onClick={() => setSelectedCounselor(counselor)}
                      >
                        <img src={counselor.image} alt={counselor.name} className="counselor-image" loading="lazy" />
                        <div className="counselor-info">
                          <h4 className="counselor-name">{counselor.name}</h4>
                          <p className="counselor-specialty">{counselor.specialty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {bookingStep === 3 && (
                <div className="booking-step">
                  <h3 className="step-title">{t('booking_step3_title')}</h3>
                  <p className="step-description">{t('booking_step3_subtitle')}</p>
                  <div className="datetime-container">
                    <div className="date-picker">
                      <label className="input-label">
                        <Calendar size={20} className="label-icon" />
                        {t('label_select_date')}
                      </label>
                      <input type="date" className="date-input" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                    </div>
                    <div className="time-picker">
                      <label className="input-label">
                        <Clock size={20} className="label-icon" />
                        {t('label_select_time')}
                      </label>
                      <div className="time-slots">
                        {timeSlots.map((time, idx) => (
                          <button key={idx} className={`time-slot ${selectedTime === time ? 'selected' : ''}`} onClick={() => setSelectedTime(time)}>
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {bookingStep === 4 && (
                <div className="booking-step">
                  <div className="confirmation-card">
                    <div className="confirmation-icon">
                      <CheckCircle size={48} />
                    </div>
                    <h3 className="step-title">{t('booking_step4_title')}</h3>
                    <div className="appointment-summary">
                      <div className="summary-item">
                        <span className="summary-label">{t('summary_concern')}:</span>
                        <span className="summary-value">{selectedConcern}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">{t('summary_counselor')}:</span>
                        <span className="summary-value">{selectedCounselor?.name}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">{t('summary_date')}:</span>
                        <span className="summary-value">{selectedDate}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">{t('summary_time')}:</span>
                        <span className="summary-value">{selectedTime}</span>
                      </div>
                    </div>
                    <button className="btn-confirm" onClick={resetBooking}>
                      {t('btn_confirm')}
                    </button>
                    <p className="confirmation-note">{t('confirmation_note')}</p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="booking-navigation">
                {bookingStep > 1 && (
                  <button className="btn-back" onClick={() => setBookingStep(bookingStep - 1)}>
                    {t('btn_back')}
                  </button>
                )}
                {bookingStep < 4 && (
                  <button
                    className="btn-next"
                    onClick={() => setBookingStep(bookingStep + 1)}
                    disabled={
                      (bookingStep === 1 && !selectedConcern) ||
                      (bookingStep === 2 && !selectedCounselor) ||
                      (bookingStep === 3 && (!selectedDate || !selectedTime))
                    }
                  >
                    {t('btn_continue')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preparation */}
          <div className="preparation-section">
            <h3 className="preparation-title">
              <FileText size={28} className="preparation-icon" />
              {t('prep_title')}
            </h3>
            <div className="checklist">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="checklist-item">
                  <CheckCircle size={20} className="checklist-icon" />
                  <span>{t(`prep_${i}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="faq-section">
            <h3 className="faq-title">{t('faq_title')}</h3>
            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  >
                    <span>{faq.question}</span>
                    {expandedFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedFaq === idx && <div className="faq-answer">{faq.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="main-footer">
          <div className="footer-container">
            <div className="footer-top">
              {/* Brand Section */}
              <div className="footer-brand-section">
                {/* Logo links to home */}
                <Link to="/" className="footer-logo" style={{ textDecoration: 'none' }}>
                  <div className="footer-logo-circle"></div>
                  <span className="footer-logo-text">GeneGuard</span>
                </Link>
                <p className="footer-tagline">{t('footer_tagline')}</p>
                <div className="footer-social">
                  <a href="https://twitter.com" className="social-link" aria-label="Twitter" target="_blank" rel="noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com" className="social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Links Grid */}
              <div className="footer-links-grid">
                <div className="footer-column">
                  <h4 className="footer-column-title">{t('footer_platform')}</h4>
                  <ul className="footer-links">
                    <li><Link to="/learn-genetics">{t('footer_learn_genetics')}</Link></li>
                    <li><Link to="/genetic-disorders">{t('footer_genetic_disorders')}</Link></li>
                    <li><Link to="/counselling">{t('footer_genetic_counseling')}</Link></li>
                    <li><Link to="/genetic-assessment">{t('footer_ai_assessment')}</Link></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h4 className="footer-column-title">{t('footer_services')}</h4>
                  <ul className="footer-links">
                    <li><Link to="/dna">{t('footer_dna_testing')}</Link></li>
                    <li><a href="#reports">{t('footer_reports_insights')}</a></li>
                    <li><a href="#consultations">{t('footer_consultations')}</a></li>
                    <li><a href="#research">{t('footer_research')}</a></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h4 className="footer-column-title">{t('footer_company')}</h4>
                  <ul className="footer-links">
                    <li><Link to="/about">{t('footer_about_us')}</Link></li>
                    <li><a href="#team">{t('footer_our_team')}</a></li>
                    <li><a href="#careers">{t('footer_careers')}</a></li>
                    <li><a href="#contact">{t('footer_contact')}</a></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h4 className="footer-column-title">{t('footer_legal')}</h4>
                  <ul className="footer-links">
                    <li><a href="#privacy">{t('footer_privacy_policy')}</a></li>
                    <li><a href="#terms">{t('footer_terms_of_service')}</a></li>
                    <li><a href="#hipaa">{t('footer_hipaa_compliance')}</a></li>
                    <li><a href="#cookies">{t('footer_cookie_policy')}</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="footer-bottom">
              <p className="footer-copyright">{t('footer_copyright')}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
