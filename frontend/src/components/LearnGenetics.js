import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LearnGenetics.css';

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  en: {
    // Navbar
    nav_learn: 'Learn Genetics',
    nav_disorders: 'Genetic Disorders',
    nav_counseling: 'Genetic Counseling',
    nav_ai: 'Genetic Assessment AI',
    nav_dna: 'DNA Testing',
    nav_about: 'About Us',
    nav_login: 'Login',
    nav_signup: 'Sign Up',

    // Hero
    hero_title: 'Learn Genetics',
    hero_subtitle: 'Discover the fascinating world of genetics through beautiful visuals and clear explanations',
    animation_label: 'Binary-to-DNA Translation',

    // Section 1
    label_fundamentals: 'Fundamentals',
    s1_title: 'What is a Gene?',
    s1_lead: "A gene is like a recipe book instruction that tells your body how to build and operate. Just as a recipe tells you how to make a cake, genes tell your cells how to make proteins that determine everything from your eye color to how tall you'll grow.",
    s1_body: "Genes are made of DNA (deoxyribonucleic acid), which is a special molecule that looks like a twisted ladder - scientists call this shape a \"double helix.\" Each gene is a specific section of this DNA ladder that contains the instructions for making one particular protein.",
    s1_did_you_know: 'Did You Know?',
    s1_fact: 'Humans have about 20,000-25,000 genes, and each one has a specific job to do in your body!',

    // Section 2
    label_structure: 'Structure',
    s2_title: 'Understanding DNA Structure',
    s2_lead: 'DNA is organized in a precise hierarchical structure, from the tiny nucleotides to the visible chromosomes that contain all your genetic information.',
    s2_nucleotides_title: 'Nucleotides',
    s2_nucleotides_body: 'The basic building blocks of DNA. Each nucleotide consists of a sugar molecule, a phosphate group, and one of four nitrogen bases: Adenine (A), Thymine (T), Guanine (G), or Cytosine (C).',
    s2_helix_title: 'Double Helix',
    s2_helix_body: 'Two strands of nucleotides twist around each other like a spiral staircase. The bases pair up in specific ways: A always pairs with T, and G always pairs with C.',
    s2_chromosomes_title: 'Chromosomes',
    s2_chromosomes_body: 'DNA is packaged into structures called chromosomes. Humans have 23 pairs of chromosomes (46 total) in almost every cell, containing all the genetic instructions needed to build and maintain your body.',

    // Section 3
    label_organization: 'Organization',
    s3_title: 'From Genes to Chromosomes',
    s3_lead: 'Your genetic information is organized in a remarkably efficient way, allowing vast amounts of data to be stored in the tiny nucleus of each cell.',
    s3_body: 'Think of your genome as a library. The entire library is your genome, each book is a chromosome, each chapter is a gene, and the words are the DNA sequence made up of the four nucleotide "letters" (A, T, G, C).',
    s3_card1_title: 'Gene',
    s3_card1_body: 'A specific sequence of DNA that codes for a particular protein or RNA molecule',
    s3_card2_title: 'Chromosome',
    s3_card2_body: 'A packaged structure of DNA containing many genes, proteins, and regulatory elements',
    s3_card3_title: 'Genome',
    s3_card3_body: 'The complete set of genetic instructions - all 3 billion base pairs of human DNA',

    // Section 4
    label_function: 'Function',
    s4_title: 'How Do Genes Work?',
    s4_lead: 'Genes work through an elegant two-step process that transforms DNA instructions into functional proteins that do the work in your cells.',
    s4_step1_title: 'Transcription',
    s4_step1_body: "The gene's DNA sequence is copied into a messenger molecule called RNA (ribonucleic acid). This is like making a temporary copy of the recipe to take into the kitchen, protecting the original in the cookbook (nucleus).",
    s4_step2_title: 'Translation',
    s4_step2_body: 'The RNA message travels to cellular machines called ribosomes, which read the RNA sequence and assemble amino acids in the correct order to build a specific protein. This is like following the recipe to actually create the dish.',
    s4_dogma: 'The Central Dogma: DNA → RNA → Protein. This fundamental principle describes how genetic information flows in biological systems.',

    // Section 5
    label_impact: 'Impact',
    s5_title: 'Why Genetics Matters',
    s5_lead: 'Understanding genetics isn\'t just for scientists - it affects your everyday life in countless important ways',
    s5_card1_title: 'Healthcare & Medicine',
    s5_card1_body: 'Genetic testing helps predict disease risk, guide treatment decisions, and enable personalized medicine tailored to your unique genetic makeup.',
    s5_card2_title: 'Family Planning',
    s5_card2_body: 'Understanding genetic inheritance patterns helps families make informed decisions and prepare for potential hereditary conditions.',
    s5_card3_title: 'Personal Traits',
    s5_card3_body: 'Your genes influence physical characteristics, talents, and even how you respond to medications and environmental factors.',
    s5_card4_title: 'Agriculture',
    s5_card4_body: 'Genetic knowledge helps develop better crops that are more nutritious, disease-resistant, and sustainable for feeding the world.',
    s5_card5_title: 'Scientific Discovery',
    s5_card5_body: 'Genetics research unlocks mysteries about human evolution, biodiversity, and the fundamental mechanisms of life.',
    s5_card6_title: 'Biotechnology',
    s5_card6_body: "From developing new medicines to creating biofuels, genetic engineering is solving some of humanity's biggest challenges.",

    // Footer
    footer_tagline: 'Empowering genetic awareness through accessible education, advanced AI assessment, and personalized insights.',
    footer_platform: 'Platform',
    footer_services: 'Services',
    footer_company: 'Company',
    footer_legal: 'Legal',
    footer_learn: 'Learn Genetics',
    footer_disorders: 'Genetic Disorders',
    footer_counseling: 'Genetic Counseling',
    footer_ai: 'AI Assessment',
    footer_dna: 'DNA Testing',
    footer_reports: 'Reports & Insights',
    footer_consultations: 'Consultations',
    footer_research: 'Research',
    footer_about: 'About Us',
    footer_team: 'Our Team',
    footer_careers: 'Careers',
    footer_contact: 'Contact',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_hipaa: 'HIPAA Compliance',
    footer_cookies: 'Cookie Policy',
  },

  hi: {
    nav_learn: 'आनुवंशिकी सीखें',
    nav_disorders: 'आनुवंशिक विकार',
    nav_counseling: 'आनुवंशिक परामर्श',
    nav_ai: 'AI आनुवंशिक मूल्यांकन',
    nav_dna: 'डीएनए परीक्षण',
    nav_about: 'हमारे बारे में',
    nav_login: 'लॉगिन',
    nav_signup: 'साइन अप',

    hero_title: 'आनुवंशिकी सीखें',
    hero_subtitle: 'सुंदर दृश्यों और स्पष्ट व्याख्याओं के माध्यम से आनुवंशिकी की आकर्षक दुनिया की खोज करें',
    animation_label: 'बाइनरी-से-डीएनए अनुवाद',

    label_fundamentals: 'मूल बातें',
    s1_title: 'जीन क्या है?',
    s1_lead: 'एक जीन एक रेसिपी बुक निर्देश की तरह है जो आपके शरीर को बनाने और संचालित करने का तरीका बताता है। जैसे एक रेसिपी आपको केक बनाना सिखाती है, वैसे ही जीन आपकी कोशिकाओं को प्रोटीन बनाने का तरीका बताते हैं।',
    s1_body: 'जीन डीएनए (डीऑक्सीराइबोन्यूक्लिक एसिड) से बने होते हैं, जो एक मुड़ी हुई सीढ़ी जैसा दिखता है - वैज्ञानिक इसे "डबल हेलिक्स" कहते हैं। प्रत्येक जीन इस डीएनए सीढ़ी का एक विशिष्ट भाग है।',
    s1_did_you_know: 'क्या आप जानते हैं?',
    s1_fact: 'मनुष्यों में लगभग 20,000-25,000 जीन होते हैं, और प्रत्येक का आपके शरीर में एक विशेष काम होता है!',

    label_structure: 'संरचना',
    s2_title: 'डीएनए संरचना को समझना',
    s2_lead: 'डीएनए एक सटीक श्रेणीबद्ध संरचना में व्यवस्थित है, छोटे न्यूक्लियोटाइड से लेकर दृश्यमान गुणसूत्रों तक।',
    s2_nucleotides_title: 'न्यूक्लियोटाइड',
    s2_nucleotides_body: 'डीएनए के मूल निर्माण खंड। प्रत्येक न्यूक्लियोटाइड में एक शर्करा अणु, एक फॉस्फेट समूह और चार नाइट्रोजन क्षारों में से एक होता है: एडेनिन (A), थाइमिन (T), ग्वानिन (G), या साइटोसिन (C)।',
    s2_helix_title: 'डबल हेलिक्स',
    s2_helix_body: 'न्यूक्लियोटाइड के दो तार एक सर्पिल सीढ़ी की तरह एक-दूसरे के चारों ओर मुड़ते हैं। क्षार विशिष्ट तरीकों से जोड़ी बनाते हैं: A हमेशा T के साथ, और G हमेशा C के साथ।',
    s2_chromosomes_title: 'गुणसूत्र',
    s2_chromosomes_body: 'डीएनए को गुणसूत्र नामक संरचनाओं में पैक किया जाता है। मनुष्यों में लगभग हर कोशिका में 23 जोड़े गुणसूत्र (कुल 46) होते हैं।',

    label_organization: 'संगठन',
    s3_title: 'जीन से गुणसूत्रों तक',
    s3_lead: 'आपकी आनुवंशिक जानकारी एक उल्लेखनीय रूप से कुशल तरीके से व्यवस्थित है।',
    s3_body: 'अपने जीनोम को एक पुस्तकालय के रूप में सोचें। पूरा पुस्तकालय आपका जीनोम है, प्रत्येक किताब एक गुणसूत्र है, प्रत्येक अध्याय एक जीन है, और शब्द चार न्यूक्लियोटाइड "अक्षरों" (A, T, G, C) से बना डीएनए क्रम है।',
    s3_card1_title: 'जीन',
    s3_card1_body: 'डीएनए का एक विशिष्ट अनुक्रम जो किसी विशेष प्रोटीन या आरएनए अणु के लिए कोड करता है',
    s3_card2_title: 'गुणसूत्र',
    s3_card2_body: 'डीएनए की एक पैक संरचना जिसमें कई जीन, प्रोटीन और नियामक तत्व होते हैं',
    s3_card3_title: 'जीनोम',
    s3_card3_body: 'आनुवंशिक निर्देशों का पूरा सेट - मानव डीएनए के सभी 3 अरब बेस जोड़े',

    label_function: 'कार्य',
    s4_title: 'जीन कैसे काम करते हैं?',
    s4_lead: 'जीन एक सुंदर दो-चरण प्रक्रिया के माध्यम से काम करते हैं जो डीएनए निर्देशों को कार्यात्मक प्रोटीन में परिवर्तित करती है।',
    s4_step1_title: 'ट्रांसक्रिप्शन',
    s4_step1_body: 'जीन के डीएनए अनुक्रम को आरएनए नामक एक संदेशवाहक अणु में कॉपी किया जाता है। यह रेसिपी की एक अस्थायी प्रति बनाने जैसा है।',
    s4_step2_title: 'ट्रांसलेशन',
    s4_step2_body: 'आरएनए संदेश राइबोसोम नामक कोशिकीय मशीनों तक जाता है, जो आरएनए अनुक्रम को पढ़ते हैं और एक विशिष्ट प्रोटीन बनाने के लिए अमीनो एसिड को सही क्रम में जोड़ते हैं।',
    s4_dogma: 'केंद्रीय सिद्धांत: DNA → RNA → प्रोटीन। यह मूलभूत सिद्धांत बताता है कि जैविक प्रणालियों में आनुवंशिक जानकारी कैसे प्रवाहित होती है।',

    label_impact: 'प्रभाव',
    s5_title: 'आनुवंशिकी क्यों महत्वपूर्ण है',
    s5_lead: 'आनुवंशिकी को समझना केवल वैज्ञानिकों के लिए नहीं है - यह अनगिनत महत्वपूर्ण तरीकों से आपके रोजमर्रा के जीवन को प्रभावित करता है',
    s5_card1_title: 'स्वास्थ्य सेवा और चिकित्सा',
    s5_card1_body: 'आनुवंशिक परीक्षण रोग के जोखिम की भविष्यवाणी करने, उपचार निर्णयों का मार्गदर्शन करने और व्यक्तिगत चिकित्सा सक्षम करने में मदद करता है।',
    s5_card2_title: 'पारिवारिक योजना',
    s5_card2_body: 'आनुवंशिक विरासत पैटर्न को समझने से परिवारों को सूचित निर्णय लेने और संभावित वंशानुगत स्थितियों के लिए तैयार करने में मदद मिलती है।',
    s5_card3_title: 'व्यक्तिगत लक्षण',
    s5_card3_body: 'आपके जीन शारीरिक विशेषताओं, प्रतिभाओं और यहां तक कि दवाओं और पर्यावरणीय कारकों के प्रति आपकी प्रतिक्रिया को प्रभावित करते हैं।',
    s5_card4_title: 'कृषि',
    s5_card4_body: 'आनुवंशिक ज्ञान बेहतर फसलें विकसित करने में मदद करता है जो अधिक पौष्टिक, रोग-प्रतिरोधी और दुनिया को खिलाने के लिए टिकाऊ हैं।',
    s5_card5_title: 'वैज्ञानिक खोज',
    s5_card5_body: 'आनुवंशिकी अनुसंधान मानव विकास, जैव विविधता और जीवन के मूलभूत तंत्रों के बारे में रहस्यों को उजागर करता है।',
    s5_card6_title: 'जैव प्रौद्योगिकी',
    s5_card6_body: 'नई दवाएं विकसित करने से लेकर जैव ईंधन बनाने तक, जीन इंजीनियरिंग मानवता की कुछ सबसे बड़ी चुनौतियों को हल कर रहा है।',

    footer_tagline: 'सुलभ शिक्षा, उन्नत AI मूल्यांकन और व्यक्तिगत अंतर्दृष्टि के माध्यम से आनुवंशिक जागरूकता को सशक्त बनाना।',
    footer_platform: 'प्लेटफ़ॉर्म', footer_services: 'सेवाएं', footer_company: 'कंपनी', footer_legal: 'कानूनी',
    footer_learn: 'आनुवंशिकी सीखें', footer_disorders: 'आनुवंशिक विकार', footer_counseling: 'आनुवंशिक परामर्श',
    footer_ai: 'AI मूल्यांकन', footer_dna: 'डीएनए परीक्षण', footer_reports: 'रिपोर्ट और अंतर्दृष्टि',
    footer_consultations: 'परामर्श', footer_research: 'अनुसंधान', footer_about: 'हमारे बारे में',
    footer_team: 'हमारी टीम', footer_careers: 'करियर', footer_contact: 'संपर्क',
    footer_privacy: 'गोपनीयता नीति', footer_terms: 'सेवा की शर्तें', footer_hipaa: 'HIPAA अनुपालन', footer_cookies: 'कुकी नीति',
  },

  mr: {
    nav_learn: 'अनुवंशशास्त्र शिका',
    nav_disorders: 'अनुवांशिक विकार',
    nav_counseling: 'अनुवांशिक समुपदेशन',
    nav_ai: 'AI अनुवांशिक मूल्यमापन',
    nav_dna: 'DNA चाचणी',
    nav_about: 'आमच्याबद्दल',
    nav_login: 'लॉगिन',
    nav_signup: 'साइन अप',

    hero_title: 'अनुवंशशास्त्र शिका',
    hero_subtitle: 'सुंदर दृश्ये आणि स्पष्ट स्पष्टीकरणांद्वारे अनुवंशशास्त्राच्या आकर्षक जगाचा शोध घ्या',
    animation_label: 'बायनरी-ते-DNA भाषांतर',

    label_fundamentals: 'मूलतत्त्वे',
    s1_title: 'जीन म्हणजे काय?',
    s1_lead: 'एक जीन म्हणजे एका पाककृती पुस्तकातील सूचनेसारखे आहे जे तुमच्या शरीराला कसे बनवायचे आणि चालवायचे ते सांगते. जसे एक पाककृती तुम्हाला केक कसा बनवायचा ते सांगते, त्याचप्रमाणे जीन तुमच्या पेशींना प्रथिने कशी बनवायची ते सांगतात.',
    s1_body: 'जीन DNA (डीऑक्सीरायबोन्यूक्लिक अॅसिड) पासून बनलेले असतात, जे एका वळलेल्या शिडीसारखे दिसते - शास्त्रज्ञ याला "डबल हेलिक्स" म्हणतात. प्रत्येक जीन या DNA शिडीचा एक विशिष्ट विभाग आहे.',
    s1_did_you_know: 'तुम्हाला माहीत आहे का?',
    s1_fact: 'मानवांमध्ये सुमारे 20,000-25,000 जीन असतात आणि प्रत्येकाचे तुमच्या शरीरात एक विशिष्ट काम असते!',

    label_structure: 'रचना',
    s2_title: 'DNA रचना समजून घेणे',
    s2_lead: 'DNA एका अचूक श्रेणीबद्ध रचनेत व्यवस्थित आहे, लहान न्यूक्लियोटाइड्सपासून ते दृश्यमान गुणसूत्रांपर्यंत.',
    s2_nucleotides_title: 'न्यूक्लियोटाइड्स',
    s2_nucleotides_body: 'DNA चे मूळ बांधकाम घटक. प्रत्येक न्यूक्लियोटाइडमध्ये एक साखर रेणू, एक फॉस्फेट गट आणि चार नायट्रोजन बेसपैकी एक असतो: एडेनाइन (A), थायमिन (T), ग्वानिन (G), किंवा सायटोसिन (C).',
    s2_helix_title: 'डबल हेलिक्स',
    s2_helix_body: 'न्यूक्लियोटाइड्सच्या दोन साखळ्या सर्पिल जिन्यासारख्या एकमेकांभोवती वळतात. बेस विशिष्ट प्रकारे जोड्या बनवतात: A नेहमी T सोबत आणि G नेहमी C सोबत.',
    s2_chromosomes_title: 'गुणसूत्रे',
    s2_chromosomes_body: 'DNA ला गुणसूत्रे नावाच्या संरचनांमध्ये पॅक केले जाते. मानवांमध्ये जवळजवळ प्रत्येक पेशीमध्ये 23 जोड्या गुणसूत्रे (एकूण 46) असतात.',

    label_organization: 'संघटन',
    s3_title: 'जीनपासून गुणसूत्रांपर्यंत',
    s3_lead: 'तुमची अनुवांशिक माहिती अत्यंत कार्यक्षम पद्धतीने व्यवस्थित केली आहे.',
    s3_body: 'तुमच्या जीनोमला एक ग्रंथालय म्हणून विचार करा. संपूर्ण ग्रंथालय म्हणजे तुमचा जीनोम, प्रत्येक पुस्तक म्हणजे गुणसूत्र, प्रत्येक प्रकरण म्हणजे जीन आणि शब्द म्हणजे चार न्यूक्लियोटाइड "अक्षरांनी" (A, T, G, C) बनलेला DNA क्रम.',
    s3_card1_title: 'जीन',
    s3_card1_body: 'DNA चा एक विशिष्ट अनुक्रम जो एखाद्या विशिष्ट प्रथिने किंवा RNA रेणूसाठी कोड करतो',
    s3_card2_title: 'गुणसूत्र',
    s3_card2_body: 'DNA ची एक पॅक केलेली रचना ज्यामध्ये अनेक जीन, प्रथिने आणि नियामक घटक असतात',
    s3_card3_title: 'जीनोम',
    s3_card3_body: 'अनुवांशिक सूचनांचा संपूर्ण संच - मानवी DNA चे सर्व 3 अब्ज बेस जोड्या',

    label_function: 'कार्य',
    s4_title: 'जीन कसे काम करतात?',
    s4_lead: 'जीन एका सुंदर दोन-चरण प्रक्रियेद्वारे कार्य करतात जी DNA सूचनांना कार्यात्मक प्रथिनांमध्ये रूपांतरित करते.',
    s4_step1_title: 'ट्रान्सक्रिप्शन',
    s4_step1_body: 'जीनच्या DNA अनुक्रमाची RNA नावाच्या संदेशवाहक रेणूमध्ये प्रत मोजली जाते. हे स्वयंपाकघरात नेण्यासाठी पाककृतीची तात्पुरती प्रत बनवण्यासारखे आहे.',
    s4_step2_title: 'ट्रान्सलेशन',
    s4_step2_body: 'RNA संदेश राइबोसोम नावाच्या पेशी यंत्रांपर्यंत पोहोचतो, जे RNA अनुक्रम वाचतात आणि एक विशिष्ट प्रथिन तयार करण्यासाठी अमिनो अॅसिड योग्य क्रमाने जोडतात.',
    s4_dogma: 'केंद्रीय सिद्धांत: DNA → RNA → प्रथिन. हे मूलभूत तत्त्व जैविक प्रणालींमध्ये अनुवांशिक माहिती कशी वाहते हे सांगते.',

    label_impact: 'महत्त्व',
    s5_title: 'अनुवंशशास्त्र का महत्त्वाचे आहे',
    s5_lead: 'अनुवंशशास्त्र समजून घेणे केवळ शास्त्रज्ञांसाठी नाही - ते अनेक महत्त्वाच्या मार्गांनी तुमच्या दैनंदिन जीवनावर परिणाम करते',
    s5_card1_title: 'आरोग्यसेवा आणि वैद्यकशास्त्र',
    s5_card1_body: 'अनुवांशिक चाचणी रोगाचा धोका सांगण्यास, उपचार निर्णयांना मार्गदर्शन करण्यास आणि वैयक्तिकृत वैद्यकशास्त्र सक्षम करण्यास मदत करते.',
    s5_card2_title: 'कुटुंब नियोजन',
    s5_card2_body: 'अनुवांशिक वारसा नमुने समजून घेतल्याने कुटुंबांना माहितीपूर्ण निर्णय घेण्यास आणि संभाव्य आनुवंशिक परिस्थितींसाठी तयारी करण्यास मदत होते.',
    s5_card3_title: 'वैयक्तिक गुणधर्म',
    s5_card3_body: 'तुमचे जीन शारीरिक वैशिष्ट्ये, प्रतिभा आणि औषधे व पर्यावरणीय घटकांना तुमचा प्रतिसाद देखील प्रभावित करतात.',
    s5_card4_title: 'शेती',
    s5_card4_body: 'अनुवांशिक ज्ञान अधिक पौष्टिक, रोग-प्रतिरोधक आणि शाश्वत अशा चांगल्या पिकांच्या विकासात मदत करते.',
    s5_card5_title: 'वैज्ञानिक शोध',
    s5_card5_body: 'अनुवंशशास्त्र संशोधन मानवी उत्क्रांती, जैवविविधता आणि जीवनाच्या मूलभूत यंत्रणांबद्दलचे रहस्ये उलगडते.',
    s5_card6_title: 'जैवतंत्रज्ञान',
    s5_card6_body: 'नवीन औषधे विकसित करण्यापासून ते जैवइंधन तयार करण्यापर्यंत, जीन अभियांत्रिकी मानवतेच्या काही मोठ्या आव्हानांना सोडवत आहे.',

    footer_tagline: 'सुलभ शिक्षण, प्रगत AI मूल्यमापन आणि वैयक्तिक अंतर्दृष्टीद्वारे अनुवांशिक जागरूकता सशक्त करणे.',
    footer_platform: 'प्लॅटफॉर्म', footer_services: 'सेवा', footer_company: 'कंपनी', footer_legal: 'कायदेशीर',
    footer_learn: 'अनुवंशशास्त्र शिका', footer_disorders: 'अनुवांशिक विकार', footer_counseling: 'अनुवांशिक समुपदेशन',
    footer_ai: 'AI मूल्यमापन', footer_dna: 'DNA चाचणी', footer_reports: 'अहवाल आणि अंतर्दृष्टी',
    footer_consultations: 'सल्लामसलत', footer_research: 'संशोधन', footer_about: 'आमच्याबद्दल',
    footer_team: 'आमची टीम', footer_careers: 'करिअर', footer_contact: 'संपर्क',
    footer_privacy: 'गोपनीयता धोरण', footer_terms: 'सेवेच्या अटी', footer_hipaa: 'HIPAA अनुपालन', footer_cookies: 'कुकी धोरण',
  },

  te: {
    nav_learn: 'జెనెటిక్స్ నేర్చుకోండి',
    nav_disorders: 'జన్యు వ్యాధులు',
    nav_counseling: 'జన్యు కౌన్సెలింగ్',
    nav_ai: 'AI జన్యు మూల్యాంకనం',
    nav_dna: 'DNA పరీక్ష',
    nav_about: 'మా గురించి',
    nav_login: 'లాగిన్',
    nav_signup: 'సైన్ అప్',

    hero_title: 'జెనెటిక్స్ నేర్చుకోండి',
    hero_subtitle: 'అందమైన దృశ్యాలు మరియు స్పష్టమైన వివరణల ద్వారా జెనెటిక్స్ యొక్క ఆకర్షణీయ ప్రపంచాన్ని కనుగొనండి',
    animation_label: 'బైనరీ-నుండి-DNA అనువాదం',

    label_fundamentals: 'మూలాధారాలు',
    s1_title: 'జీన్ అంటే ఏమిటి?',
    s1_lead: 'ఒక జీన్ అంటే ఒక వంటకాల పుస్తకంలోని సూచన లాంటిది, ఇది మీ శరీరాన్ని ఎలా నిర్మించాలో మరియు నిర్వహించాలో చెప్తుంది. ఒక వంటకం మీకు కేక్ ఎలా తయారు చేయాలో చెప్పినట్లే, జీన్‌లు మీ కణాలకు ప్రొటీన్లు ఎలా తయారు చేయాలో చెప్తాయి.',
    s1_body: 'జీన్‌లు DNA (డీఆక్సీరైబోన్యూక్లిక్ యాసిడ్) తో తయారవుతాయి, ఇది ఒక వంకర నిచ్చెనలా కనిపిస్తుంది - శాస్త్రవేత్తలు దీన్ని "డబుల్ హెలిక్స్" అని పిలుస్తారు.',
    s1_did_you_know: 'మీకు తెలుసా?',
    s1_fact: 'మానవులకు సుమారు 20,000-25,000 జీన్‌లు ఉంటాయి, మరియు ప్రతి ఒక్కటి మీ శరీరంలో ఒక నిర్దిష్టమైన పని చేస్తుంది!',

    label_structure: 'నిర్మాణం',
    s2_title: 'DNA నిర్మాణాన్ని అర్థం చేసుకోవడం',
    s2_lead: 'DNA చిన్న న్యూక్లియోటైడ్‌ల నుండి కనిపించే క్రోమోసోమ్‌ల వరకు ఒక ఖచ్చితమైన శ్రేణీకృత నిర్మాణంలో నిర్వహించబడుతుంది.',
    s2_nucleotides_title: 'న్యూక్లియోటైడ్‌లు',
    s2_nucleotides_body: 'DNA యొక్క ప్రాథమిక నిర్మాణ ఖండాలు. ప్రతి న్యూక్లియోటైడ్ ఒక చక్కెర అణువు, ఒక ఫాస్ఫేట్ సమూహం మరియు నాలుగు నైట్రోజన్ బేస్‌లలో ఒకటి కలిగి ఉంటుంది: అడెనిన్ (A), థైమిన్ (T), గ్వానిన్ (G), లేదా సైటోసిన్ (C).',
    s2_helix_title: 'డబుల్ హెలిక్స్',
    s2_helix_body: 'న్యూక్లియోటైడ్‌ల రెండు తీగలు ఒక మురి మెట్ల మాదిరిగా ఒకదానిచుట్టూ మరొకటి చుట్టుకుంటాయి. బేస్‌లు నిర్దిష్ట విధాల్లో జతలు ఏర్పరుస్తాయి: A ఎప్పుడూ T తో, G ఎప్పుడూ C తో.',
    s2_chromosomes_title: 'క్రోమోసోమ్‌లు',
    s2_chromosomes_body: 'DNA ని క్రోమోసోమ్‌లు అనే నిర్మాణాలలో ప్యాక్ చేయబడుతుంది. మానవులకు దాదాపు ప్రతి కణంలో 23 జతల క్రోమోసోమ్‌లు (మొత్తం 46) ఉంటాయి.',

    label_organization: 'నిర్వహణ',
    s3_title: 'జీన్‌ల నుండి క్రోమోసోమ్‌ల వరకు',
    s3_lead: 'మీ జన్యు సమాచారం అత్యంత సమర్థవంతమైన విధంగా నిర్వహించబడుతుంది.',
    s3_body: 'మీ జీనోమ్‌ని ఒక గ్రంథాలయంగా భావించండి. మొత్తం గ్రంథాలయం మీ జీనోమ్, ప్రతి పుస్తకం ఒక క్రోమోసోమ్, ప్రతి అధ్యాయం ఒక జీన్, మరియు పదాలు నాలుగు న్యూక్లియోటైడ్ "అక్షరాలు" (A, T, G, C) తో తయారైన DNA క్రమం.',
    s3_card1_title: 'జీన్',
    s3_card1_body: 'ఒక నిర్దిష్ట ప్రొటీన్ లేదా RNA అణువు కోసం కోడ్ చేసే DNA యొక్క నిర్దిష్ట క్రమం',
    s3_card2_title: 'క్రోమోసోమ్',
    s3_card2_body: 'అనేక జీన్‌లు, ప్రొటీన్లు మరియు నియంత్రణ మూలకాలు కలిగిన DNA యొక్క ప్యాక్ చేయబడిన నిర్మాణం',
    s3_card3_title: 'జీనోమ్',
    s3_card3_body: 'జన్యు సూచనల పూర్తి సమితి - మానవ DNA యొక్క అన్ని 3 బిలియన్ బేస్ జతలు',

    label_function: 'పని',
    s4_title: 'జీన్‌లు ఎలా పని చేస్తాయి?',
    s4_lead: 'జీన్‌లు ఒక సొగసైన రెండు-దశల ప్రక్రియ ద్వారా పని చేస్తాయి, ఇది DNA సూచనలను మీ కణాలలో పనిచేసే ప్రొటీన్‌లుగా మారుస్తుంది.',
    s4_step1_title: 'ట్రాన్స్‌క్రిప్షన్',
    s4_step1_body: 'జీన్ యొక్క DNA క్రమం RNA అనే సందేశ వాహక అణువుగా కాపీ చేయబడుతుంది. ఇది వంటగదిలోకి తీసుకెళ్ళడానికి వంటకం యొక్క తాత్కాలిక కాపీ తయారు చేయడం లాంటిది.',
    s4_step2_title: 'ట్రాన్స్‌లేషన్',
    s4_step2_body: 'RNA సందేశం రైబోసోమ్‌లు అనే కణ యంత్రాలకు చేరుతుంది, ఇవి RNA క్రమాన్ని చదివి ఒక నిర్దిష్ట ప్రొటీన్ నిర్మించడానికి అమైనో ఆమ్లాలను సరైన క్రమంలో అమరుస్తాయి.',
    s4_dogma: 'కేంద్ర సిద్ధాంతం: DNA → RNA → ప్రొటీన్. ఈ ప్రాథమిక సూత్రం జీవ వ్యవస్థలలో జన్యు సమాచారం ఎలా ప్రవహిస్తుందో వివరిస్తుంది.',

    label_impact: 'ప్రభావం',
    s5_title: 'జెనెటిక్స్ ఎందుకు ముఖ్యమో',
    s5_lead: 'జెనెటిక్స్ అర్థం చేసుకోవడం కేవలం శాస్త్రవేత్తలకు మాత్రమే కాదు - ఇది అనేక ముఖ్యమైన విధాల్లో మీ రోజువారీ జీవితాన్ని ప్రభావితం చేస్తుంది',
    s5_card1_title: 'ఆరోగ్య సేవ & వైద్యం',
    s5_card1_body: 'జన్యు పరీక్ష వ్యాధి ప్రమాదాన్ని అంచనా వేయడంలో, చికిత్స నిర్ణయాలకు మార్గనిర్దేశం చేయడంలో మరియు వ్యక్తిగతీకరించిన వైద్యాన్ని సక్షమం చేయడంలో సహాయపడుతుంది.',
    s5_card2_title: 'కుటుంబ ప్రణాళిక',
    s5_card2_body: 'జన్యు వారసత్వ నమూనాలను అర్థం చేసుకోవడం కుటుంబాలు సమాచారంతో నిర్ణయాలు తీసుకోవడంలో మరియు సంభావ్య వంశపారంపర్య పరిస్థితులకు సిద్ధంగా ఉండటంలో సహాయపడుతుంది.',
    s5_card3_title: 'వ్యక్తిగత లక్షణాలు',
    s5_card3_body: 'మీ జీన్‌లు శారీరక లక్షణాలు, ప్రతిభలు మరియు మందులు మరియు పర్యావరణ కారకాలకు మీరు ఎలా స్పందిస్తారు అనే దాన్ని కూడా ప్రభావితం చేస్తాయి.',
    s5_card4_title: 'వ్యవసాయం',
    s5_card4_body: 'జన్యు జ్ఞానం మరింత పోషకమైన, వ్యాధి-నిరోధక మరియు ప్రపంచాన్ని పోషించడానికి స్థిరమైన మెరుగైన పంటలు అభివృద్ధి చేయడంలో సహాయపడుతుంది.',
    s5_card5_title: 'శాస్త్రీయ ఆవిష్కరణ',
    s5_card5_body: 'జెనెటిక్స్ పరిశోధన మానవ పరిణామం, జీవ వైవిధ్యం మరియు జీవితం యొక్క ప్రాథమిక యంత్రాంగాల గురించి రహస్యాలను వెలికితీస్తుంది.',
    s5_card6_title: 'జీవ సాంకేతికత',
    s5_card6_body: 'కొత్త మందులు అభివృద్ధి చేయడం నుండి జీవ ఇంధనాలు సృష్టించడం వరకు, జన్యు ఇంజినీరింగ్ మానవత్వం యొక్క అతి పెద్ద సవాళ్ళలో కొన్నింటిని పరిష్కరిస్తోంది.',

    footer_tagline: 'అందుబాటులో ఉన్న విద్య, అధునాతన AI మూల్యాంకనం మరియు వ్యక్తిగత అంతర్దృష్టుల ద్వారా జన్యు అవగాహనను శక్తివంతం చేయడం.',
    footer_platform: 'ప్లాట్‌ఫారమ్', footer_services: 'సేవలు', footer_company: 'కంపెనీ', footer_legal: 'చట్టపరమైన',
    footer_learn: 'జెనెటిక్స్ నేర్చుకోండి', footer_disorders: 'జన్యు వ్యాధులు', footer_counseling: 'జన్యు కౌన్సెలింగ్',
    footer_ai: 'AI మూల్యాంకనం', footer_dna: 'DNA పరీక్ష', footer_reports: 'నివేదికలు & అంతర్దృష్టి',
    footer_consultations: 'సంప్రదింపులు', footer_research: 'పరిశోధన', footer_about: 'మా గురించి',
    footer_team: 'మా బృందం', footer_careers: 'కెరీర్లు', footer_contact: 'సంప్రదించండి',
    footer_privacy: 'గోప్యతా విధానం', footer_terms: 'సేవా నిబంధనలు', footer_hipaa: 'HIPAA అనుసరణ', footer_cookies: 'కుకీ విధానం',
  },
};

// ─── Navbar Component ─────────────────────────────────────────────────────────
const Navbar = ({ language, setLanguage, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className={`main-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-content">

          {/* ✅ Logo → Home */}
          <Link to="/home" className="nav-logo" style={{ textDecoration: 'none' }}>
            <div className="logo-circle"></div>
            <span className="logo-brand">Gene Guard</span>
          </Link>

          <div className="nav-right-section">
            <div className="nav-links">
              <Link to="/learn-genetics" className="nav-link">{t('nav_learn')}</Link>
              <Link to="/genetic-disorders" className="nav-link">{t('nav_disorders')}</Link>
              <Link to="/counselling" className="nav-link">{t('nav_counseling')}</Link>
              <Link to="/genetic-assessment" className="nav-link">{t('nav_ai')}</Link>
              <Link to="/dna" className="nav-link">{t('nav_dna')}</Link>
              <Link to="/about" className="nav-link">{t('nav_about')}</Link>
            </div>

            {/* ✅ Language Buttons */}
            <div className="dna-language-buttons">
              <button className={`dna-lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
              <button className={`dna-lang-btn ${language === 'hi' ? 'active' : ''}`} onClick={() => setLanguage('hi')}>हिं</button>
              <button className={`dna-lang-btn ${language === 'mr' ? 'active' : ''}`} onClick={() => setLanguage('mr')}>मर</button>
              <button className={`dna-lang-btn ${language === 'te' ? 'active' : ''}`} onClick={() => setLanguage('te')}>తె</button>
            </div>

            <button
              className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            <div className="profile-container" ref={dropdownRef}>
              <button
                className={`profile-trigger ${isProfileOpen ? 'active' : ''}`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="User Profile"
              >
                <svg className="profile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-glow"></div>
                  <Link to="/login" className="dropdown-item signup-special">{t('nav_login')}</Link>
                  <Link to="/signup" className="dropdown-item signup-special">{t('nav_signup')}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <Link to="/learn-genetics" className="nav-link" onClick={handleLinkClick}>{t('nav_learn')}</Link>
          <Link to="/genetic-disorders" className="nav-link" onClick={handleLinkClick}>{t('nav_disorders')}</Link>
          <Link to="/counselling" className="nav-link" onClick={handleLinkClick}>{t('nav_counseling')}</Link>
          <Link to="/genetic-assessment" className="nav-link" onClick={handleLinkClick}>{t('nav_ai')}</Link>
          <Link to="/dna" className="nav-link" onClick={handleLinkClick}>{t('nav_dna')}</Link>
          <Link to="/about" className="nav-link" onClick={handleLinkClick}>{t('nav_about')}</Link>
        </div>
      )}
    </>
  );
};

// ─── Footer Component ─────────────────────────────────────────────────────────
const Footer = ({ t }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="main-footer">
      <div className="footer-bg-grid"></div>
      <div className="footer-gradient-orb"></div>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand-section">
            {/* ✅ Footer logo → Home */}
            <Link to="/" className="footer-logo" style={{ textDecoration: 'none' }}>
              <div className="footer-logo-circle"></div>
              <span className="footer-logo-text">GeneGuard</span>
            </Link>
            <p className="footer-tagline">{t('footer_tagline')}</p>
            <div className="footer-social">
              <a href="https://twitter.com" className="social-link" aria-label="Twitter" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com" className="social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h3 className="footer-column-title">{t('footer_platform')}</h3>
              <ul className="footer-links">
                <li><Link to="/learn-genetics">{t('footer_learn')}</Link></li>
                <li><Link to="/genetic-disorders">{t('footer_disorders')}</Link></li>
                <li><Link to="/counselling">{t('footer_counseling')}</Link></li>
                <li><Link to="/genetic-assessment">{t('footer_ai')}</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-column-title">{t('footer_services')}</h3>
              <ul className="footer-links">
                <li><Link to="/dna">{t('footer_dna')}</Link></li>
                <li><a href="#reports">{t('footer_reports')}</a></li>
                <li><a href="#consultation">{t('footer_consultations')}</a></li>
                <li><a href="#research">{t('footer_research')}</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-column-title">{t('footer_company')}</h3>
              <ul className="footer-links">
                <li><Link to="/about">{t('footer_about')}</Link></li>
                <li><a href="#team">{t('footer_team')}</a></li>
                <li><a href="#careers">{t('footer_careers')}</a></li>
                <li><a href="#contact">{t('footer_contact')}</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-column-title">{t('footer_legal')}</h3>
              <ul className="footer-links">
                <li><a href="#privacy">{t('footer_privacy')}</a></li>
                <li><a href="#terms">{t('footer_terms')}</a></li>
                <li><a href="#hipaa">{t('footer_hipaa')}</a></li>
                <li><a href="#cookies">{t('footer_cookies')}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-divider">
          <div className="divider-glow"></div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">© {currentYear} GeneGuard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// ─── Main LearnGenetics Component ─────────────────────────────────────────────
const LearnGenetics = () => {
  const [, setActiveSection] = useState(0);
  const [language, setLanguage] = useState('en');
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const t = (key) => translations[language][key] || key;

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Binary to DNA Animation Effect
  useEffect(() => {
    const phrases = ['Your DNA, Explained', 'Understanding Genetics', 'Decoding Life'];
    let currentPhraseIndex = 0;
    let isConverting = false;

    const convertToDNA = async (text) => {
      setIsAnimating(true);
      setDisplayText(text);
      await new Promise(resolve => setTimeout(resolve, 2000));

      const binary = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      for (let i = 0; i <= binary.length; i++) {
        setDisplayText(binary.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      await new Promise(resolve => setTimeout(resolve, 1000));

      const dnaLetters = ['A', 'T', 'C', 'G'];
      let dnaSequence = '';
      for (let i = 0; i < text.length * 4; i++) {
        dnaSequence += dnaLetters[Math.floor(Math.random() * 4)];
      }
      for (let i = 0; i <= dnaSequence.length; i++) {
        setDisplayText(dnaSequence.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      await new Promise(resolve => setTimeout(resolve, 1500));

      for (let i = dnaSequence.length; i >= 0; i--) {
        setDisplayText(dnaSequence.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 15));
      }
      for (let i = 0; i <= text.length; i++) {
        setDisplayText(text.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsAnimating(false);
    };

    const animationLoop = async () => {
      if (!isConverting) {
        isConverting = true;
        await convertToDNA(phrases[currentPhraseIndex]);
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        isConverting = false;
      }
    };

    const startDelay = setTimeout(() => {
      animationLoop();
      const interval = setInterval(animationLoop, 10000);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="learn-genetics-page-wrapper">
      {/* ✅ Pass language + setter + t to Navbar */}
      <Navbar language={language} setLanguage={setLanguage} t={t} />

      <div className="learn-genetics-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">{t('hero_title')}</h1>
            <p className="hero-subtitle">{t('hero_subtitle')}</p>
            <div className="dna-animation-container">
              <div className={`dna-text-display ${isAnimating ? 'animating' : ''}`}>
                {displayText || 'Your DNA, Explained'}
              </div>
              <div className="dna-animation-label">
                <span className="animation-dot"></span>
                {t('animation_label')}
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: What is a Gene? */}
        <section className="content-section section-image-right">
          <div className="section-container">
            <div className="text-content">
              <div className="content-wrapper">
                <span className="section-label">{t('label_fundamentals')}</span>
                <h2>{t('s1_title')}</h2>
                <p className="lead-text">{t('s1_lead')}</p>
                <p>{t('s1_body')}</p>
                <div className="highlight-box">
                  <div className="highlight-icon">💡</div>
                  <div>
                    <strong>{t('s1_did_you_know')}</strong>
                    <p>{t('s1_fact')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="image-content">
              <div className="image-wrapper">
                <img src="https://geneticeducation.co.in/wp-content/uploads/2019/09/Genetics-Basics-2.001-e1568179792143.jpeg" alt="Genetics Basics Diagram" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: DNA Structure */}
        <section className="content-section section-image-left">
          <div className="section-container">
            <div className="image-content">
              <div className="image-wrapper">
                <img src="https://nci-media.cancer.gov/pdq/media/images/761781.jpg" alt="DNA Structure Detailed Diagram" />
              </div>
            </div>
            <div className="text-content">
              <div className="content-wrapper">
                <span className="section-label">{t('label_structure')}</span>
                <h2>{t('s2_title')}</h2>
                <p className="lead-text">{t('s2_lead')}</p>
                <div className="feature-list">
                  <div className="feature-item">
                    <div className="feature-icon">🔵</div>
                    <div className="feature-content">
                      <h4>{t('s2_nucleotides_title')}</h4>
                      <p>{t('s2_nucleotides_body')}</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🧬</div>
                    <div className="feature-content">
                      <h4>{t('s2_helix_title')}</h4>
                      <p>{t('s2_helix_body')}</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">📚</div>
                    <div className="feature-content">
                      <h4>{t('s2_chromosomes_title')}</h4>
                      <p>{t('s2_chromosomes_body')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Genes & Chromosomes */}
        <section className="content-section section-image-right">
          <div className="section-container">
            <div className="text-content">
              <div className="content-wrapper">
                <span className="section-label">{t('label_organization')}</span>
                <h2>{t('s3_title')}</h2>
                <p className="lead-text">{t('s3_lead')}</p>
                <p>{t('s3_body')}</p>
                <div className="info-cards">
                  <div className="info-card">
                    <div className="card-number">01</div>
                    <h4>{t('s3_card1_title')}</h4>
                    <p>{t('s3_card1_body')}</p>
                  </div>
                  <div className="info-card">
                    <div className="card-number">02</div>
                    <h4>{t('s3_card2_title')}</h4>
                    <p>{t('s3_card2_body')}</p>
                  </div>
                  <div className="info-card">
                    <div className="card-number">03</div>
                    <h4>{t('s3_card3_title')}</h4>
                    <p>{t('s3_card3_body')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="image-content">
              <div className="image-wrapper">
                <img src="https://blog.myheritage.com/wp-content/uploads/chapter-3.jpg" alt="Genes and Chromosomes Illustration" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: How Genes Work */}
        <section className="content-section section-image-left">
          <div className="section-container">
            <div className="image-content">
              <div className="image-wrapper">
                <img src="https://my.clevelandclinic.org/-/scassets/images/org/health/articles/genes" alt="How Genes Work" />
              </div>
            </div>
            <div className="text-content">
              <div className="content-wrapper">
                <span className="section-label">{t('label_function')}</span>
                <h2>{t('s4_title')}</h2>
                <p className="lead-text">{t('s4_lead')}</p>
                <div className="process-flow">
                  <div className="process-step">
                    <div className="step-badge">Step 1</div>
                    <h3>{t('s4_step1_title')}</h3>
                    <p>{t('s4_step1_body')}</p>
                  </div>
                  <div className="process-arrow">↓</div>
                  <div className="process-step">
                    <div className="step-badge">Step 2</div>
                    <h3>{t('s4_step2_title')}</h3>
                    <p>{t('s4_step2_body')}</p>
                  </div>
                </div>
                <div className="callout-box">
                  <p>{t('s4_dogma')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Why Genetics Matters */}
        <section className="content-section section-full-width">
          <div className="section-container">
            <div className="text-content centered">
              <div className="content-wrapper">
                <span className="section-label">{t('label_impact')}</span>
                <h2>{t('s5_title')}</h2>
                <p className="lead-text centered-text">{t('s5_lead')}</p>
              </div>
            </div>
            <div className="matters-grid">
              {[
                { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8NhX5JfaYDwEiL8eErvnbTBX2wg0DlYDIgQ&s', alt: 'Healthcare', title: t('s5_card1_title'), body: t('s5_card1_body') },
                { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHT46XU0tGIN6mqfbwCBVvjPNxAaN6I2R1_g&s', alt: 'Family Planning', title: t('s5_card2_title'), body: t('s5_card2_body') },
                { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4Ck3_kDIEoQIAxRBvtR8pLoRdlvDkEJ9vU5Ws10U&s', alt: 'Personal Traits', title: t('s5_card3_title'), body: t('s5_card3_body') },
                { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCBETrpAldN9NCkD6-C0vW9cFv0QTUnM_Ka8WJC8rq&s', alt: 'Agriculture', title: t('s5_card4_title'), body: t('s5_card4_body') },
                { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-dv5q8tqJz0nKdaSJFV4WtvHvEpevpzfla7qoX1Wt3g&s', alt: 'Scientific Discovery', title: t('s5_card5_title'), body: t('s5_card5_body') },
                { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-dv5q8tqJz0nKdaSJFV4WtvHvEpevpzfla7qoX1Wt3g&s', alt: 'Biotechnology', title: t('s5_card6_title'), body: t('s5_card6_body') },
              ].map((card, idx) => (
                <div className="matter-card" key={idx}>
                  <div className="matter-icon-img">
                    <img src={card.img} alt={card.alt} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer t={t} />
    </div>
  );
};

export default LearnGenetics;
