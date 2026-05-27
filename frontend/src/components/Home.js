import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Translation data
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

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const t = translations[language];

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
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <>
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
    </>
  );
};

// ─── BreathworkAnimation ──────────────────────────────────────────────────────
const BreathworkAnimation = ({ language }) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const scrollAccumulatorRef = useRef(0);
  const animationStartY = useRef(null);

  const t = translations[language];

  useEffect(() => {
    const handleWheel = (e) => {
      if (!animationRef.current) return;
      const rect = animationRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      if (isInView && !isAnimating && internalProgress === 0) {
        setIsAnimating(true);
        animationStartY.current = window.scrollY;
      }
      if (isAnimating) {
        e.preventDefault();
        scrollAccumulatorRef.current += e.deltaY;
        const scrollNeeded = 3000;
        const newProgress = Math.min(Math.max(scrollAccumulatorRef.current / scrollNeeded, 0), 1);
        setInternalProgress(newProgress);
        if (newProgress >= 1) {
          setIsAnimating(false);
          setTimeout(() => { window.scrollBy({ top: 100, behavior: 'smooth' }); }, 100);
        }
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isAnimating, internalProgress]);

  useEffect(() => {
    const handleScroll = () => {
      if (!animationRef.current) return;
      const rect = animationRef.current.getBoundingClientRect();
      if (rect.top > window.innerHeight && internalProgress > 0) {
        setInternalProgress(0);
        setIsAnimating(false);
        scrollAccumulatorRef.current = 0;
        animationStartY.current = null;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [internalProgress]);

  const progress = internalProgress;
  const titleProgress = Math.min(progress / 0.18, 1);
  const titleBlur = 15 * (1 - titleProgress);
  const titleOpacity = Math.max(0, 1 - Math.max(0, (progress - 0.18) / 0.12));
  const paragraphFadeIn = Math.max(0, Math.min((progress - 0.25) / 0.15, 1));
  const zoomProgress = Math.max(0, Math.min((progress - 0.45) / 0.2, 1));
  const paragraphScale = 1 + zoomProgress * 2;
  const paragraphOpacity = Math.max(0, paragraphFadeIn - zoomProgress * 1.5);
  const frequencyScale = 0.3 + zoomProgress * 0.7;
  const frequencyOpacity = zoomProgress;
  const circlesProgress = Math.max(0, Math.min((progress - 0.55) / 0.25, 1));
  const fadeOutProgress = Math.max(0, (progress - 0.8) / 0.15);
  const frequencyFade = Math.max(0, 1 - fadeOutProgress);
  const finalTextProgress = Math.max(0, Math.min((progress - 0.88) / 0.12, 1));

  const radius = 250;
  const circles = [
    { label: t.animation.circles.lineage, angle: -90 },
    { label: t.animation.circles.risks, angle: -30 },
    { label: t.animation.circles.insights, angle: 30 },
    { label: t.animation.circles.storage, angle: 90 },
    { label: t.animation.circles.decisions, angle: 150 },
    { label: t.animation.circles.community, angle: 210 },
  ];

  return (
    <div className="home-breathwork-container">
      <div className="home-spacer"></div>
      <div className="home-hero-section-animation">
        <h1 className="home-hero-title-animation" style={{ whiteSpace: 'pre-line' }}>{t.animation.impactTitle}</h1>
        <p className="home-hero-subtitle-animation">{t.animation.impactSubtitle}</p>
      </div>
      <div className="home-animation-section" ref={animationRef}>
        <div className="home-sticky-container">
          <svg className="home-breathing-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <g className="home-rotate-circle" style={{ transformOrigin: '500px 500px' }}>
              <circle cx="500" cy="500" r={220 + progress * 330} stroke="#1a2744" strokeWidth="3" fill="none" opacity="0.8" />
            </g>
          </svg>
          <div className="home-content-wrapper">
            <div className="home-stage-title-container" style={{ opacity: titleOpacity, filter: `blur(${titleBlur}px)` }}>
              <h2 className="home-stage-title" style={{ whiteSpace: 'pre-line' }}>{t.animation.artScience}</h2>
            </div>
            <div className="home-paragraph-container" style={{ opacity: paragraphOpacity, transform: `scale(${paragraphScale})` }}>
              <p className="home-paragraph">{t.animation.paragraph}</p>
            </div>
            <div className="home-frequency-container" style={{ opacity: frequencyOpacity * frequencyFade, transform: `scale(${frequencyScale})` }}>
              <div className="home-frequency-inner">
                <h6 className="home-frequency-title">{t.animation.blueprint}</h6>
                {circles.map((circle, idx) => {
                  const angle = (circle.angle * Math.PI) / 180;
                  const x = Math.cos(angle) * radius * circlesProgress;
                  const y = Math.sin(angle) * radius * circlesProgress;
                  const itemOpacity = Math.min(circlesProgress * 2, 1);
                  return (
                    <div key={idx} className="home-circle-item" style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, opacity: itemOpacity }}>
                      <div className="home-circle-group">
                        <div className="home-circle-badge"></div>
                        <span className="home-circle-label">{circle.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="home-final-text-container" style={{ opacity: finalTextProgress }}>
              <h2 className="home-final-text" style={{ whiteSpace: 'pre-line' }}>{t.animation.finalText}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ language }) => {
  const tf = translations[language].footer;

  return (
    <footer className="home-footer">
      <div className="home-footer-container">

        {/* Top: brand + links */}
        <div className="home-footer-top">

          {/* Brand */}
          <div className="home-footer-brand">
            <div className="home-footer-logo">
              <div className="home-footer-logo-circle"></div>
              <span className="home-footer-logo-text">GeneGuard</span>
            </div>
            <p className="home-footer-tagline">{tf.tagline}</p>
            <div className="home-footer-social">
              {/* Twitter / X */}
              <a href="https://twitter.com" className="home-social-link" aria-label="Twitter" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" className="home-social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com" className="home-social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links grid — 4 columns */}
          <div className="home-footer-links-grid">
            <div className="home-footer-col">
              <h4 className="home-footer-col-title">{tf.platform}</h4>
              <ul className="home-footer-ul">
                <li><Link to="/learn-genetics">{tf.learnGenetics}</Link></li>
                <li><Link to="/genetic-disorders">{tf.geneticDisorders}</Link></li>
                <li><Link to="/counselling">{tf.geneticCounseling}</Link></li>
                <li><Link to="/genetic-assessment">{tf.aiAssessment}</Link></li>
              </ul>
            </div>
            <div className="home-footer-col">
              <h4 className="home-footer-col-title">{tf.services}</h4>
              <ul className="home-footer-ul">
                <li><Link to="/dna">{tf.dnaTesting}</Link></li>
                <li><a href="#reports">{tf.reportsInsights}</a></li>
                <li><a href="#consultations">{tf.consultations}</a></li>
                <li><a href="#research">{tf.research}</a></li>
              </ul>
            </div>
            <div className="home-footer-col">
              <h4 className="home-footer-col-title">{tf.company}</h4>
              <ul className="home-footer-ul">
                <li><Link to="/about">{tf.aboutUs}</Link></li>
                <li><a href="#team">{tf.ourTeam}</a></li>
                <li><a href="#careers">{tf.careers}</a></li>
                <li><a href="#contact">{tf.contact}</a></li>
              </ul>
            </div>
            <div className="home-footer-col">
              <h4 className="home-footer-col-title">{tf.legal}</h4>
              <ul className="home-footer-ul">
                <li><a href="#privacy">{tf.privacyPolicy}</a></li>
                <li><a href="#terms">{tf.termsOfService}</a></li>
                <li><a href="#hipaa">{tf.hipaaCompliance}</a></li>
                <li><a href="#cookies">{tf.cookiePolicy}</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="home-footer-divider" />

        {/* Bottom: copyright */}
        <div className="home-footer-bottom">
          <p className="home-footer-copyright">{tf.copyright}</p>
        </div>

      </div>
    </footer>
  );
};

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  return (
    <div className="home-wrapper">
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="home-biotech-container">

        {/* Hero */}
        <section className="home-hero-section">
          <div className="home-video-background-container">
            <video autoPlay muted loop playsInline className="home-video-background" onEnded={(e) => e.target.play()}>
              <source src="https://cdn.builder.io/o/assets%2F3104472283a54edd8900e01b2e68a4cf%2F859e1906349c48f19e102ddbf7b40660?alt=media&token=c9147d49-d3b4-4b7c-a5c8-e92214fa6977&apiKey=3104472283a54edd8900e01b2e68a4cf" type="video/mp4" />
            </video>
            <div className="home-gradient-overlay"></div>
          </div>
          <div className="home-hero-content">
            <h1 className="home-hero-title">{t.hero.title}</h1>
            <p className="home-hero-subtitle">{t.hero.subtitle}</p>
            <div className="home-button-group">
              <Link to="/learn-genetics" className="home-btn home-btn-primary">{t.hero.getStarted}</Link>
              <Link to="/about" className="home-btn home-btn-secondary">{t.hero.learnMore}</Link>
            </div>
          </div>
        </section>

        <BreathworkAnimation language={language} />

        {/* About */}
        <section className="home-about-section home-obsidian-section">
          <div className="home-about-container">
            <h2 className="home-about-heading">{t.about.title}</h2>
            <div className="home-about-description">
              <p>{t.about.para1}</p>
              <p>{t.about.para2}</p>
            </div>
          </div>
        </section>

        {/* ✅ Footer */}
        <Footer language={language} />

      </div>
    </div>
  );
}
