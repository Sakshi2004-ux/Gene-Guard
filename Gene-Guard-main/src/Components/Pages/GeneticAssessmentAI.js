import './Home.css';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GeneticAssessmentAI.css';

/* ─── Footer Component (matches About.js pattern) ─────────────────────────── */
const Footer = ({ t }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="ga-main-footer">
      <div className="ga-footer-container">
        <div className="ga-footer-top">
          <div className="ga-footer-brand-section">
            <Link to="/" className="ga-footer-logo" style={{ textDecoration: 'none' }}>
              <div className="ga-footer-logo-circle"></div>
              <span className="ga-footer-logo-text">GeneGuard</span>
            </Link>
            <p className="ga-footer-tagline">{t.footerTagline}</p>
            <div className="ga-footer-social">
            </div>
          </div>
          <div className="ga-footer-links-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="ga-footer-column">
              <h3 className="ga-footer-column-title">{t.footerPlatform}</h3>
              <ul className="ga-footer-links">
                <li><Link to="/learn-genetics">{t.navLinks.learnGenetics}</Link></li>
                <li><Link to="/genetic-disorders">{t.navLinks.geneticDisorders}</Link></li>
                <li><Link to="/counselling">{t.navLinks.counselling}</Link></li>
                <li><Link to="/genetic-assessment">{t.navLinks.geneticAssessment}</Link></li>
              </ul>
            </div>
            <div className="ga-footer-column">
              <h3 className="ga-footer-column-title">{t.footerServices}</h3>
              <ul className="ga-footer-links">
                <li><Link to="/dna">{t.navLinks.dnaTesting}</Link></li>
                <li><Link to="/counselling">Consultations</Link></li>
                <li><Link to="/learn-genetics">Research</Link></li>
              </ul>
            </div>
            <div className="ga-footer-column">
              <h3 className="ga-footer-column-title">{t.footerCompany}</h3>
              <ul className="ga-footer-links">
                <li><Link to="/about">{t.navLinks.aboutUs}</Link></li>
                <li><Link to="/about">Our Team</Link></li>
                <li><Link to="/about">Careers</Link></li>
                <li><Link to="/about">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ga-footer-divider"><div className="ga-divider-glow"></div></div>
        <div className="ga-footer-bottom">
          <p className="ga-footer-copyright">© {currentYear} GeneGuard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

/* ─── Translations ─────────────────────────────────────────────────────────── */
const translations = {
  en: {
    navLinks: {
      learnGenetics: 'Learn Genetics',
      geneticDisorders: 'Genetic Disorders',
      counselling: 'Counselling',
      geneticAssessment: 'Genetic Assessment AI',
      dnaTesting: 'DNA Testing',
      aboutUs: 'About Us',
      login: 'Login',
      signup: 'Sign Up'
    },
    hero: {
      title: 'GeneGuard',
      subtitle: 'Your Guide to Genetic Awareness.',
      getStarted: 'Get Started',
      learnMore: 'Learn More'
    },
    animation: {
      impactTitle: 'IMPACT THROUGH\nAWARENESS',
      impactSubtitle: 'Genetic literacy is the first step toward precision medicine. By understanding the code, individuals make 40% more informed healthcare decisions regarding hereditary risks.',
      artScience: 'The art and science\nof being',
      paragraph: 'Within every cell lies a map of our history and a hint of our future. We are more than just biology; we are a sequence of stories waiting to be decoded. Through understanding, we reclaim our health, protect our heritage, and bridge the gap between science and soul',
      blueprint: 'The Blueprint',
      circles: {
        lineage: 'Decoding your lineage.',
        risks: 'Predicting hereditary risks.',
        insights: 'Personalized genetic insights.',
        storage: 'DNA as information storage.',
        decisions: 'Informed medical decisions.',
        community: 'Building a conscious community.'
      },
      finalText: 'Your DNA,\nExplained.'
    },
    about: {
      title: 'About GeneGuard',
      para1: 'Genetics is often perceived as a complex and technical subject, creating a gap between scientific knowledge and public understanding. GeneGuard bridges that gap with a comprehensive, user-friendly platform designed to make genetic information accessible to everyone.',
      para2: 'From simplified educational content about genetic concepts to detailed information on genetic disorders, from guidance on genetic counseling to AI-powered genetic risk assessments—we provide the knowledge you need to make informed decisions about your genetic health.'
    },
    footer: {
      tagline: 'Empowering genetic awareness through accessible education, advanced AI assessment, and personalized insights.',
      platform: 'PLATFORM',
      services: 'SERVICES',
      company: 'COMPANY',
      legal: 'LEGAL',
      learnGenetics: 'Learn Genetics',
      geneticDisorders: 'Genetic Disorders',
      geneticCounseling: 'Genetic Counseling',
      aiAssessment: 'AI Assessment',
      dnaTesting: 'DNA Testing',
      reportsInsights: 'Reports & Insights',
      consultations: 'Consultations',
      research: 'Research',
      aboutUs: 'About Us',
      ourTeam: 'Our Team',
      careers: 'Careers',
      contact: 'Contact',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      hipaaCompliance: 'HIPAA Compliance',
      cookiePolicy: 'Cookie Policy',
      copyright: '© 2026 GeneGuard. All rights reserved.',
    }
  },
  hi: {
    navLinks: {
      learnGenetics: 'आनुवंशिकी सीखें',
      geneticDisorders: 'आनुवंशिक विकार',
      counselling: 'परामर्श',
      geneticAssessment: 'आनुवंशिक मूल्यांकन AI',
      dnaTesting: 'DNA परीक्षण',
      aboutUs: 'हमारे बारे में',
      login: 'लॉगिन',
      signup: 'साइन अप'
    },
    hero: {
      title: 'जीनगार्ड',
      subtitle: 'आनुवंशिक जागरूकता के लिए आपका मार्गदर्शक।',
      getStarted: 'शुरू करें',
      learnMore: 'और जानें'
    },
    animation: {
      impactTitle: 'जागरूकता के माध्यम से\nप्रभाव',
      impactSubtitle: 'आनुवंशिक साक्षरता सटीक चिकित्सा की दिशा में पहला कदम है। कोड को समझकर, व्यक्ति वंशानुगत जोखिमों के बारे में 40% अधिक सूचित स्वास्थ्य देखभाल निर्णय लेते हैं।',
      artScience: 'होने की कला\nऔर विज्ञान',
      paragraph: 'प्रत्येक कोशिका के भीतर हमारे इतिहास का एक नक्शा और हमारे भविष्य का संकेत निहित है। हम केवल जीव विज्ञान से अधिक हैं; हम कहानियों का एक क्रम हैं जो डिकोड होने की प्रतीक्षा कर रहे हैं। समझ के माध्यम से, हम अपने स्वास्थ्य को पुनः प्राप्त करते हैं, अपनी विरासत की रक्षा करते हैं, और विज्ञान और आत्मा के बीच की खाई को पाटते हैं',
      blueprint: 'खाका',
      circles: {
        lineage: 'आपकी वंशावली को डिकोड करना।',
        risks: 'वंशानुगत जोखिमों की भविष्यवाणी।',
        insights: 'व्यक्तिगत आनुवंशिक अंतर्दृष्टि।',
        storage: 'सूचना भंडारण के रूप में DNA।',
        decisions: 'सूचित चिकित्सा निर्णय।',
        community: 'जागरूक समुदाय का निर्माण।'
      },
      finalText: 'आपका DNA,\nसमझाया गया।'
    },
    about: {
      title: 'जीनगार्ड के बारे में',
      para1: 'आनुवंशिकी को अक्सर एक जटिल और तकनीकी विषय के रूप में माना जाता है, जो वैज्ञानिक ज्ञान और सार्वजनिक समझ के बीच एक अंतर पैदा करता है। जीनगार्ड एक व्यापक, उपयोगकर्ता-अनुकूल मंच के साथ उस अंतर को पाटता है जो आनुवंशिक जानकारी को सभी के लिए सुलभ बनाने के लिए डिज़ाइन किया गया है।',
      para2: 'आनुवंशिक अवधारणाओं के बारे में सरलीकृत शैक्षिक सामग्री से लेकर आनुवंशिक विकारों पर विस्तृत जानकारी तक, आनुवंशिक परामर्श पर मार्गदर्शन से लेकर AI-संचालित आनुवंशिक जोखिम मूल्यांकन तक—हम आपके आनुवंशिक स्वास्थ्य के बारे में सूचित निर्णय लेने के लिए आवश्यक ज्ञान प्रदान करते हैं।'
    },
    footer: {
      tagline: 'सुलभ शिक्षा, उन्नत AI मूल्यांकन और व्यक्तिगत अंतर्दृष्टि के माध्यम से आनुवंशिक जागरूकता को सशक्त बनाना।',
      platform: 'प्लेटफ़ॉर्म', services: 'सेवाएं', company: 'कंपनी', legal: 'कानूनी',
      learnGenetics: 'आनुवंशिकी सीखें', geneticDisorders: 'आनुवंशिक विकार',
      geneticCounseling: 'आनुवंशिक परामर्श', aiAssessment: 'AI मूल्यांकन',
      dnaTesting: 'DNA परीक्षण', reportsInsights: 'रिपोर्ट और अंतर्दृष्टि',
      consultations: 'परामर्श', research: 'अनुसंधान',
      aboutUs: 'हमारे बारे में', ourTeam: 'हमारी टीम', careers: 'करियर', contact: 'संपर्क',
      privacyPolicy: 'गोपनीयता नीति', termsOfService: 'सेवा की शर्तें',
      hipaaCompliance: 'HIPAA अनुपालन', cookiePolicy: 'कुकी नीति',
      copyright: '© 2026 GeneGuard. सर्वाधिकार सुरक्षित।',
    }
  },
  mr: {
    navLinks: {
      learnGenetics: 'अनुवांशिकी शिका',
      geneticDisorders: 'अनुवांशिक विकार',
      counselling: 'समुपदेशन',
      geneticAssessment: 'अनुवांशिक मूल्यांकन AI',
      dnaTesting: 'DNA चाचणी',
      aboutUs: 'आमच्याबद्दल',
      login: 'लॉगिन',
      signup: 'साइन अप'
    },
    hero: {
      title: 'जीनगार्ड',
      subtitle: 'अनुवांशिक जागरूकतेसाठी तुमचा मार्गदर्शक.',
      getStarted: 'सुरू करा',
      learnMore: 'अधिक जाणून घ्या'
    },
    animation: {
      impactTitle: 'जागरूकतेद्वारे\nप्रभाव',
      impactSubtitle: 'अनुवांशिक साक्षरता ही अचूक औषधाच्या दिशेने पहिले पाऊल आहे. कोड समजून घेऊन, व्यक्ती वंशपरंपरागत जोखमींबद्दल 40% अधिक माहितीपूर्ण आरोग्य निर्णय घेतात.',
      artScience: 'असण्याची कला\nआणि विज्ञान',
      paragraph: 'प्रत्येक पेशीमध्ये आपल्या इतिहासाचा नकाशा आणि आपल्या भविष्याचा इशारा आहे. आपण केवळ जीवशास्त्रापेक्षा अधिक आहोत; आपण कथांचा एक क्रम आहोत जो डीकोड होण्याची प्रतीक्षा करीत आहे. समजून घेण्याद्वारे, आपण आपले आरोग्य पुन्हा मिळवतो, आपल्या वारशाचे रक्षण करतो आणि विज्ञान आणि आत्मा यांच्यातील अंतर कमी करतो',
      blueprint: 'आराखडा',
      circles: {
        lineage: 'तुमची वंशावळ डीकोड करणे.',
        risks: 'वंशपरंपरागत जोखमींचा अंदाज.',
        insights: 'वैयक्तिक अनुवांशिक अंतर्दृष्टी.',
        storage: 'माहिती साठवण म्हणून DNA.',
        decisions: 'माहितीपूर्ण वैद्यकीय निर्णय.',
        community: 'जागरूक समुदाय तयार करणे.'
      },
      finalText: 'तुमचा DNA,\nस्पष्ट केला.'
    },
    about: {
      title: 'जीनगार्ड बद्दल',
      para1: 'अनुवांशिकता हा अनेकदा एक जटिल आणि तांत्रिक विषय म्हणून समजला जातो, ज्यामुळे वैज्ञानिक ज्ञान आणि सार्वजनिक समज यांच्यात अंतर निर्माण होते. जीनगार्ड एका सर्वसमावेशक, वापरकर्ता-अनुकूल प्लॅटफॉर्मसह ते अंतर भरून काढते जे अनुवांशिक माहिती प्रत्येकासाठी सुलभ करण्यासाठी डिझाइन केले आहे.',
      para2: 'अनुवांशिक संकल्पनांबद्दल सरलीकृत शैक्षणिक सामग्रीपासून ते अनुवांशिक विकारांवरील तपशीलवार माहितीपर्यंत, अनुवांशिक समुपदेशनावरील मार्गदर्शनापासून ते AI-चालित अनुवांशिक जोखीम मूल्यांकनापर्यंत—आम्ही तुमच्या अनुवांशिक आरोग्याबद्दल माहितीपूर्ण निर्णय घेण्यासाठी आवश्यक ज्ञान प्रदान करतो.'
    },
    footer: {
      tagline: 'सुलभ शिक्षण, प्रगत AI मूल्यमापन आणि वैयक्तिक अंतर्दृष्टीद्वारे अनुवांशिक जागरूकता सशक्त करणे.',
      platform: 'प्लॅटफॉर्म', services: 'सेवा', company: 'कंपनी', legal: 'कायदेशीर',
      learnGenetics: 'अनुवंशशास्त्र शिका', geneticDisorders: 'अनुवांशिक विकार',
      geneticCounseling: 'अनुवांशिक समुपदेशन', aiAssessment: 'AI मूल्यमापन',
      dnaTesting: 'DNA चाचणी', reportsInsights: 'अहवाल आणि अंतर्दृष्टी',
      consultations: 'सल्लामसलत', research: 'संशोधन',
      aboutUs: 'आमच्याबद्दल', ourTeam: 'आमची टीम', careers: 'करिअर', contact: 'संपर्क',
      privacyPolicy: 'गोपनीयता धोरण', termsOfService: 'सेवेच्या अटी',
      hipaaCompliance: 'HIPAA अनुपालन', cookiePolicy: 'कुकी धोरण',
      copyright: '© 2026 GeneGuard. सर्व हक्क राखीव.',
    }
  },
  te: {
    navLinks: {
      learnGenetics: 'జన్యుశాస్త్రం నేర్చుకోండి',
      geneticDisorders: 'జన్యు రుగ్మతలు',
      counselling: 'కౌన్సెలింగ్',
      geneticAssessment: 'జన్యు అంచనా AI',
      dnaTesting: 'DNA పరీక్ష',
      aboutUs: 'మా గురించి',
      login: 'లాగిన్',
      signup: 'సైన్ అప్'
    },
    hero: {
      title: 'జీన్‌గార్డ్',
      subtitle: 'జన్యు అవగాహన కోసం మీ మార్గదర్శి.',
      getStarted: 'ప్రారంభించండి',
      learnMore: 'మరింత తెలుసుకోండి'
    },
    animation: {
      impactTitle: 'అవగాహన ద్వారా\nప్రభావం',
      impactSubtitle: 'జన్యు అక్షరాస్యత అనేది ఖచ్చితమైన వైద్యం వైపు మొదటి అడుగు. కోడ్‌ను అర్థం చేసుకోవడం ద్వారా, వ్యక్తులు వంశపారంపర్య ప్రమాదాల గురించి 40% ఎక్కువ సమాచార ఆరోగ్య సంరక్షణ నిర్ణయాలు తీసుకుంటారు.',
      artScience: 'ఉనికి యొక్క కళ\nమరియు శాస్త్రం',
      paragraph: 'ప్రతి కణంలో మన చరిత్ర యొక్క మ్యాప్ మరియు మన భవిష్యత్తు యొక్క సూచన ఉంది. మనం కేవలం జీవశాస్త్రం కంటే ఎక్కువ; మనం డీకోడ్ చేయడానికి వేచి ఉన్న కథల క్రమం. అవగాహన ద్వారా, మేము మా ఆరోగ్యాన్ని తిరిగి పొందుతాము, మా వారసత్వాన్ని రక్షిస్తాము మరియు శాస్త్రం మరియు ఆత్మ మధ్య అంతరాన్ని తగ్గిస్తాము',
      blueprint: 'బ్లూప్రింట్',
      circles: {
        lineage: 'మీ వంశావళిని డీకోడ్ చేయడం.',
        risks: 'వంశపారంపర్య ప్రమాదాలను అంచనా వేయడం.',
        insights: 'వ్యక్తిగత జన్యు అంతర్దృష్టులు.',
        storage: 'సమాచార నిల్వగా DNA.',
        decisions: 'సమాచార వైద్య నిర్ణయాలు.',
        community: 'అవగాహన సమాజాన్ని నిర్మించడం.'
      },
      finalText: 'మీ DNA,\nవివరించబడింది.'
    },
    about: {
      title: 'జీన్‌గార్డ్ గురించి',
      para1: 'జన్యుశాస్త్రం తరచుగా సంక్లిష్టమైన మరియు సాంకేతిక విషయంగా గుర్తించబడుతుంది, ఇది శాస్త్రీయ జ్ఞానం మరియు ప్రజల అవగాహన మధ్య అంతరాన్ని సృష్టిస్తుంది. జీన్‌గార్డ్ ఒక సమగ్ర, వినియోగదారు-స్నేహపూర్వక వేదికతో ఆ అంతరాన్ని తగ్గిస్తుంది, ఇది జన్యు సమాచారాన్ని అందరికీ అందుబాటులో ఉంచడానికి రూపొందించబడింది.',
      para2: 'జన్యు భావనల గురించి సరళీకృత విద్యా కంటెంట్ నుండి జన్యు రుగ్మతలపై వివరణాత్మక సమాచారం వరకు, జన్యు కౌన్సెలింగ్‌పై మార్గదర్శకత్వం నుండి AI-ఆధారిత జన్యు ప్రమాద అంచనాల వరకు—మేము మీ జన్యు ఆరోగ్యం గురించి సమాచార నిర్ణయాలు తీసుకోవడానికి అవసరమైన జ్ఞానాన్ని అందిస్తాము.'
    },
    footer: {
      tagline: 'అందుబాటులో ఉన్న విద్య, అధునాతన AI మూల్యాంకనం మరియు వ్యక్తిగత అంతర్దృష్టుల ద్వారా జన్యు అవగాహనను శక్తివంతం చేయడం.',
      platform: 'ప్లాట్‌ఫారమ్', services: 'సేవలు', company: 'కంపెనీ', legal: 'చట్టపరమైన',
      learnGenetics: 'జెనెటిక్స్ నేర్చుకోండి', geneticDisorders: 'జన్యు వ్యాధులు',
      geneticCounseling: 'జన్యు కౌన్సెలింగ్', aiAssessment: 'AI మూల్యాంకనం',
      dnaTesting: 'DNA పరీక్ష', reportsInsights: 'నివేదికలు & అంతర్దృష్టి',
      consultations: 'సంప్రదింపులు', research: 'పరిశోధన',
      aboutUs: 'మా గురించి', ourTeam: 'మా బృందం', careers: 'కెరీర్లు', contact: 'సంప్రదించండి',
      privacyPolicy: 'గోప్యతా విధానం', termsOfService: 'సేవా నిబంధనలు',
      hipaaCompliance: 'HIPAA అనుసరణ', cookiePolicy: 'కుకీ విధానం',
      copyright: '© 2026 GeneGuard. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    }
  }
};

/* ─── Main Component ───────────────────────────────────────────────────────── */
const GeneticAssessmentAI = () => {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  // Navbar states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Data from localStorage
  const [patientData, setPatientData] = useState(null);
  const [agentResults, setAgentResults] = useState(null);

  // Load localStorage data
  useEffect(() => {
    try {
      const saved = localStorage.getItem('geneGuardPatientProfile');
      if (saved) setPatientData(JSON.parse(saved));
    } catch (e) {
      console.warn('Failed to parse patient profile:', e);
    }
    try {
      const savedAgents = localStorage.getItem('geneGuardAgentResults');
      if (savedAgents) setAgentResults(JSON.parse(savedAgents));
    } catch (e) {
      console.warn('Failed to parse agent results:', e);
    }
  }, []);

  // Navbar scroll / click-outside
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

  // Mobile menu body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  // Botpress injection
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2026/05/26/12/20260526120300-AH3YHEZD.js';
    script2.defer = true;

    const script3 = document.createElement('script');
    script3.type = 'text/javascript';
    script3.innerHTML = `
      window.botpressWebChat && window.botpressWebChat.onEvent(
        function (event) {
          if (event.type === 'LIFECYCLE.LOADED') {
            window.botpressWebChat.sendEvent({ type: 'show' })
          }
        },
        ['LIFECYCLE.LOADED']
      )
    `;

    document.body.appendChild(script1);

    script1.onload = function () {
      document.body.appendChild(script2);
      document.body.appendChild(script3);
    };

    return () => {
      if (document.body.contains(script1)) document.body.removeChild(script1);
      if (document.body.contains(script2)) document.body.removeChild(script2);
      if (document.body.contains(script3)) document.body.removeChild(script3);
      const widget = document.getElementById('bp-web-widget-container');
      if (widget) widget.remove();
      const overlay = document.querySelector('.bpw-layout');
      if (overlay) overlay.remove();
      const bubble = document.querySelector('.bp-widget-web');
      if (bubble) bubble.remove();
    };
  }, []);

  // Derived state
  const hasProfile = !!patientData;
  const hasAgents = agentResults && Object.keys(agentResults).length > 0;
  const agentCount = hasAgents ? Object.keys(agentResults).length : 0;
  const firstName = patientData?.fullName?.split(' ')[0] || patientData?.firstName || '';

  const openBotpress = () => {
    if (window.botpress) {
      window.botpress.open();
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="ga-page">

      {/* ─── Navbar (matches About.js) ─────────────────────────────────── */}
      <nav className={`home-main-navbar ${isScrolled ? 'home-navbar-scrolled' : ''}`}>
        <div className="home-nav-content">
          <div className="home-nav-logo">
            <div className="home-logo-circle"></div>
            <span className="home-logo-brand">Gene Guard</span>
          </div>

          <div className="home-nav-right-section">
            <div className="home-nav-links">
              <Link to="/learn-genetics" className="home-nav-link">{t.navLinks.learnGenetics}</Link>
              <Link to="/genetic-disorders" className="home-nav-link">{t.navLinks.geneticDisorders}</Link>
              <Link to="/counselling" className="home-nav-link">{t.navLinks.counselling}</Link>
              <Link to="/genetic-assessment" className="home-nav-link">{t.navLinks.geneticAssessment}</Link>
              <Link to="/dna" className="home-nav-link">{t.navLinks.dnaTesting}</Link>
              <Link to="/about" className="home-nav-link">{t.navLinks.aboutUs}</Link>
            </div>

            <div className="home-language-buttons">
              <button className={`home-lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
              <button className={`home-lang-btn ${language === 'hi' ? 'active' : ''}`} onClick={() => setLanguage('hi')}>हिं</button>
              <button className={`home-lang-btn ${language === 'mr' ? 'active' : ''}`} onClick={() => setLanguage('mr')}>मर</button>
              <button className={`home-lang-btn ${language === 'te' ? 'active' : ''}`} onClick={() => setLanguage('te')}>తె</button>
            </div>

            <button
              className={`home-hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="home-hamburger-line"></span>
              <span className="home-hamburger-line"></span>
              <span className="home-hamburger-line"></span>
            </button>

            <div className="home-profile-container" ref={dropdownRef}>
              <button
                className={`home-profile-trigger ${isProfileOpen ? 'active' : ''}`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="User Profile"
              >
                <svg className="home-profile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {isProfileOpen && (
                <div className="home-profile-dropdown">
                  <div className="home-dropdown-glow"></div>
                  <Link to="/login" className="home-dropdown-item home-signup-special">{t.navLinks.login}</Link>
                  <Link to="/register" className="home-dropdown-item home-signup-special">{t.navLinks.signup}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="home-mobile-menu-overlay">
          <Link to="/learn-genetics" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.learnGenetics}</Link>
          <Link to="/genetic-disorders" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.geneticDisorders}</Link>
          <Link to="/genetic-counseling" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.counselling}</Link>
          <Link to="/genetic-assessment" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.geneticAssessment}</Link>
          <Link to="/dna-testing" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.dnaTesting}</Link>
          <Link to="/about" className="home-nav-link" onClick={handleLinkClick}>{t.navLinks.aboutUs}</Link>
        </div>
      )}

      {/* ─── Hero Section ──────────────────────────────────────────────── */}
      <section className="ga-hero" id="ga-hero">
        {/* Animated background orbs */}
        <div className="ga-hero-orb ga-hero-orb--1"></div>
        <div className="ga-hero-orb ga-hero-orb--2"></div>
        <div className="ga-hero-orb ga-hero-orb--3"></div>
        <div className="ga-hero-orb ga-hero-orb--4"></div>

        <div className="ga-hero-inner">
          {firstName && (
            <p className="ga-hero-greeting">Hello, <span className="ga-accent-text">{firstName}</span></p>
          )}
          <h1 className="ga-hero-title">
            Your Personal <span className="ga-gradient-text">AI Genetic Advisor</span>
          </h1>
          <p className="ga-hero-subtitle">
            Ask anything about your genetic profile, DNA results, and health risks — powered by AI
          </p>
          <div className="ga-hero-buttons">
            <button className="ga-btn-primary" onClick={openBotpress} id="ga-start-conversation">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              Start Conversation
            </button>
            
          </div>
        </div>
      </section>

      {/* ─── Context Status Bar ────────────────────────────────────────── */}
      <section className="ga-status-bar" id="ga-status-bar">
        
        {!hasProfile && (
          <p className="ga-status-prompt">
            Complete your <Link to="/dna/patient-intake">intake form</Link> for personalized answers
          </p>
        )}
      </section>

      {/* ─── Feature Highlights ────────────────────────────────────────── */}
      <section className="ga-features" id="ga-features">
        <h2 className="ga-section-label">What Makes It Special</h2>
        <div className="ga-features-grid">
          <div className="ga-feature-card" id="ga-feature-profile">
            <div className="ga-feature-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                <path d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3>Profile-Aware</h3>
            <p>Understands your age, conditions, and family history</p>
          </div>
          <div className="ga-feature-card" id="ga-feature-agents">
            <div className="ga-feature-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
              </svg>
            </div>
            <h3>Agent-Informed</h3>
            <p>Draws from your DNA agent analysis results</p>
          </div>
          <div className="ga-feature-card" id="ga-feature-available">
            <div className="ga-feature-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <h3>Always Available</h3>
            <p>Ask questions anytime, get instant personalized answers</p>
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────────────────── */}
      <section className="ga-how" id="ga-how-it-works">
        <h2 className="ga-section-label">How It Works</h2>
        <div className="ga-how-steps">
          <div className="ga-how-step">
            <div className="ga-step-number">1</div>
            <h3>Complete Health Intake</h3>
            <p>Fill in your patient profile with personal, family, and health details</p>
          </div>
          <div className="ga-how-connector" aria-hidden="true">
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
              <path d="M0 6h32m0 0l-6-5m6 5l-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="ga-how-step">
            <div className="ga-step-number">2</div>
            <h3>Run DNA Agents</h3>
            <p>Get analysis from 6 specialized genetic assessment agents</p>
          </div>
          <div className="ga-how-connector" aria-hidden="true">
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
              <path d="M0 6h32m0 0l-6-5m6 5l-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="ga-how-step">
            <div className="ga-step-number">3</div>
            <h3>Chat with AI Advisor</h3>
            <p>Ask questions and get personalized genetic health insights</p>
          </div>
        </div>
      </section>

      {/* ─── Disclaimer ────────────────────────────────────────────────── */}
      <section className="ga-disclaimer">
        <p>
          ⚕️ Gene Guard AI provides educational information only and is not a substitute for professional medical advice.
          Always consult a qualified healthcare provider for diagnosis, treatment, and medical decisions.
        </p>
      </section>


      {/* ─── Footer (matches About.js) ─────────────────────────────────── */}
      <Footer t={t} />
    </div>
  );
};

export default GeneticAssessmentAI;