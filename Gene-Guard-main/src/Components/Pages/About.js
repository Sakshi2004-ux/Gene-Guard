import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import rosImg from '../images/ros.jpeg';
import saksImg from '../images/saks.jpeg';
import PandaImg from '../images/Panda.jpeg';

// ─── Translations ────────────────────────────────────────────────────────────
const translations = {
  en: {
    navLinks: {
      learnGenetics: 'Learn Genetics',
      geneticDisorders: 'Genetic Disorders',
      counselling: 'Counselling',
      geneticAssessment: 'Genetic Assessment AI',
      dnaTesting: 'DNA Testing',
      aboutUs: 'About Us',
    },
    intro: `We are a genetics-focused platform dedicated to spreading awareness and understanding of
      genetic diseases and modern genetic science. Our website helps users learn about genetics,
      genetic disorders, DNA testing, and genetic counseling in a simple and reliable way.
      We also explore advanced research, GM crops, and AI-based genetic assessment to support
      informed decision-making. Through educational content, tools, and a social media hub, we aim
      to connect science with real-life health and research needs.`,
    visionTitle: 'Our Vision',
    visionText: `Our vision is to build a reliable and inclusive platform for learning and understanding
      genetics. We aim to make information about genetic diseases clear, accurate, and accessible to
      everyone. We want to reduce fear and misinformation related to genetics through education and
      awareness. By integrating modern technologies like AI and advanced genetic research, we envision
      smarter health decisions. We support ethical use of genetic data and responsible scientific
      progress. Our platform connects genetics with real-world health and agriculture applications.
      We aspire to encourage curiosity, research, and innovation in genetic science. Ultimately, our
      vision is to improve quality of life through informed genetic knowledge.`,
    missionTitle: 'Our Mission',
    missionText1: `Our mission is to simplify complex genetic concepts for students, patients, and the
      general public. We provide structured learning on genetics, genetic disorders, and DNA testing.
      We aim to guide users with information about genetic counseling and assessment tools. Our platform
      promotes awareness of GM crops and microbes for sustainable development.`,
    missionText2: `We integrate AI-based genetic assessment to support early understanding and prevention.
      We offer tools, resources, and research insights in one place. We encourage responsible discussion
      through our social media hub. Our mission is to educate, empower, and connect people with
      trustworthy genetic knowledge.`,
    teamTitle: 'Our Team',
    teamSubtitle: 'Meet the talented individuals behind our success',
    feedbackTitle: 'Share Your Feedback',
    feedbackSubtitle: "We'd love to hear from you!",
    namePlaceholder: 'Enter your name',
    nameLabel: 'Your Name',
    emailLabel: 'Your Email',
    emailPlaceholder: 'Enter your email',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Share your thoughts with us...',
    ratingLabel: 'Rate Your Experience',
    submitBtn: 'Submit Feedback',
    login: 'Login',
    signUp: 'Sign Up',
    footerTagline: 'Empowering genetic awareness through accessible education, advanced AI assessment, and personalized insights.',
    footerPlatform: 'Platform',
    footerServices: 'Services',
    footerCompany: 'Company',
    footerLegal: 'Legal',
    successMsg: 'Thank you for your feedback! We appreciate your input.',
    errorMsg: 'Failed to submit feedback. Please try again later.',
    validationMsg: 'Please fill all fields and provide a rating!',
  },
  hi: {
    navLinks: {
      learnGenetics: 'आनुवंशिकी सीखें',
      geneticDisorders: 'आनुवंशिक विकार',
      counselling: 'परामर्श',
      geneticAssessment: 'AI आनुवंशिक मूल्यांकन',
      dnaTesting: 'डीएनए परीक्षण',
      aboutUs: 'हमारे बारे में',
    },
    intro: `हम एक जेनेटिक्स-केंद्रित प्लेटफ़ॉर्म हैं जो आनुवंशिक रोगों और आधुनिक आनुवंशिक विज्ञान के बारे में
      जागरूकता फैलाने के लिए समर्पित है। हमारी वेबसाइट उपयोगकर्ताओं को सरल और विश्वसनीय तरीके से
      जेनेटिक्स, आनुवंशिक विकार, डीएनए परीक्षण और आनुवंशिक परामर्श के बारे में जानने में मदद करती है।
      हम GM फसलों और AI-आधारित आनुवंशिक मूल्यांकन पर भी शोध करते हैं।`,
    visionTitle: 'हमारी दृष्टि',
    visionText: `हमारी दृष्टि जेनेटिक्स को समझने के लिए एक विश्वसनीय और समावेशी मंच बनाना है। हम आनुवंशिक
      रोगों की जानकारी को स्पष्ट, सटीक और सभी के लिए सुलभ बनाना चाहते हैं। शिक्षा और जागरूकता के माध्यम
      से जेनेटिक्स से जुड़े डर और गलत जानकारी को कम करना हमारा लक्ष्य है। AI और उन्नत आनुवंशिक अनुसंधान
      को एकीकृत करके हम स्वास्थ्य निर्णयों को बेहतर बनाना चाहते हैं।`,
    missionTitle: 'हमारा मिशन',
    missionText1: `हमारा मिशन छात्रों, रोगियों और आम जनता के लिए जटिल आनुवंशिक अवधारणाओं को सरल बनाना है।
      हम जेनेटिक्स, आनुवंशिक विकार और डीएनए परीक्षण पर संरचित शिक्षा प्रदान करते हैं। हमारा प्लेटफ़ॉर्म
      GM फसलों और सूक्ष्मजीवों के बारे में जागरूकता को बढ़ावा देता है।`,
    missionText2: `हम शुरुआती समझ और रोकथाम के लिए AI-आधारित आनुवंशिक मूल्यांकन को एकीकृत करते हैं।
      हम एक ही स्थान पर उपकरण, संसाधन और अनुसंधान अंतर्दृष्टि प्रदान करते हैं। हमारा मिशन लोगों को
      विश्वसनीय आनुवंशिक ज्ञान से शिक्षित, सशक्त और जोड़ना है।`,
    teamTitle: 'हमारी टीम',
    teamSubtitle: 'हमारी सफलता के पीछे प्रतिभाशाली लोगों से मिलें',
    feedbackTitle: 'अपनी प्रतिक्रिया साझा करें',
    feedbackSubtitle: 'हम आपसे सुनना पसंद करेंगे!',
    namePlaceholder: 'अपना नाम दर्ज करें',
    nameLabel: 'आपका नाम',
    emailLabel: 'आपका ईमेल',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    messageLabel: 'आपका संदेश',
    messagePlaceholder: 'अपने विचार हमारे साथ साझा करें...',
    ratingLabel: 'अपना अनुभव रेट करें',
    submitBtn: 'प्रतिक्रिया सबमिट करें',
    login: 'लॉगिन',
    signUp: 'साइन अप',
    footerTagline: 'सुलभ शिक्षा, उन्नत AI मूल्यांकन और व्यक्तिगत अंतर्दृष्टि के माध्यम से आनुवंशिक जागरूकता को सशक्त बनाना।',
    footerPlatform: 'प्लेटफ़ॉर्म',
    footerServices: 'सेवाएं',
    footerCompany: 'कंपनी',
    footerLegal: 'कानूनी',
    successMsg: 'आपकी प्रतिक्रिया के लिए धन्यवाद! हम आपके इनपुट की सराहना करते हैं।',
    errorMsg: 'प्रतिक्रिया सबमिट करने में विफल। कृपया बाद में पुनः प्रयास करें।',
    validationMsg: 'कृपया सभी फ़ील्ड भरें और रेटिंग प्रदान करें!',
  },
  mr: {
    navLinks: {
      learnGenetics: 'अनुवंशशास्त्र शिका',
      geneticDisorders: 'अनुवांशिक विकार',
      counselling: 'समुपदेशन',
      geneticAssessment: 'AI अनुवांशिक मूल्यमापन',
      dnaTesting: 'DNA चाचणी',
      aboutUs: 'आमच्याबद्दल',
    },
    intro: `आम्ही एक जेनेटिक्स-केंद्रित व्यासपीठ आहोत जे अनुवांशिक रोग आणि आधुनिक अनुवांशिक विज्ञानाबद्दल
      जागरूकता पसरवण्यासाठी समर्पित आहे. आमची वेबसाइट वापरकर्त्यांना सोप्या आणि विश्वासार्ह पद्धतीने
      जेनेटिक्स, अनुवांशिक विकार, DNA चाचणी आणि अनुवांशिक समुपदेशनाबद्दल जाणून घेण्यास मदत करते.`,
    visionTitle: 'आमची दृष्टी',
    visionText: `आमची दृष्टी म्हणजे जेनेटिक्स शिकण्यासाठी आणि समजण्यासाठी एक विश्वासार्ह आणि सर्वसमावेशक
      व्यासपीठ तयार करणे. आम्हाला अनुवांशिक रोगांची माहिती स्पष्ट, अचूक आणि सर्वांसाठी सुलभ करायची आहे.
      शिक्षण आणि जागरूकतेद्वारे जेनेटिक्सशी संबंधित भीती आणि चुकीची माहिती कमी करणे हे आमचे उद्दिष्ट आहे.`,
    missionTitle: 'आमचे ध्येय',
    missionText1: `आमचे ध्येय विद्यार्थी, रुग्ण आणि सामान्य लोकांसाठी जटिल अनुवांशिक संकल्पना सोप्या करणे आहे.
      आम्ही जेनेटिक्स, अनुवांशिक विकार आणि DNA चाचणीवर संरचित शिक्षण देतो. आमचे व्यासपीठ शाश्वत
      विकासासाठी GM पिके आणि सूक्ष्मजीवांबद्दल जागरूकता वाढवते.`,
    missionText2: `आम्ही लवकर समज आणि प्रतिबंधास समर्थन देण्यासाठी AI-आधारित अनुवांशिक मूल्यमापन एकत्रित करतो.
      आम्ही एकाच ठिकाणी साधने, संसाधने आणि संशोधन अंतर्दृष्टी देतो. आमचे ध्येय लोकांना विश्वासार्ह
      अनुवांशिक ज्ञानाने शिक्षित, सशक्त आणि जोडणे आहे.`,
    teamTitle: 'आमची टीम',
    teamSubtitle: 'आमच्या यशामागील प्रतिभावान व्यक्तींना भेटा',
    feedbackTitle: 'आपला अभिप्राय द्या',
    feedbackSubtitle: 'आम्हाला तुमच्याकडून ऐकायला आवडेल!',
    namePlaceholder: 'आपले नाव प्रविष्ट करा',
    nameLabel: 'आपले नाव',
    emailLabel: 'आपला ईमेल',
    emailPlaceholder: 'आपला ईमेल प्रविष्ट करा',
    messageLabel: 'आपला संदेश',
    messagePlaceholder: 'आपले विचार आमच्यासोबत शेअर करा...',
    ratingLabel: 'आपला अनुभव रेट करा',
    submitBtn: 'अभिप्राय सादर करा',
    login: 'लॉगिन',
    signUp: 'साइन अप',
    footerTagline: 'सुलभ शिक्षण, प्रगत AI मूल्यमापन आणि वैयक्तिक अंतर्दृष्टीद्वारे अनुवांशिक जागरूकता सशक्त करणे.',
    footerPlatform: 'व्यासपीठ',
    footerServices: 'सेवा',
    footerCompany: 'कंपनी',
    footerLegal: 'कायदेशीर',
    successMsg: 'तुमच्या अभिप्रायाबद्दल धन्यवाद! आम्ही तुमच्या इनपुटचे कौतुक करतो.',
    errorMsg: 'अभिप्राय सादर करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.',
    validationMsg: 'कृपया सर्व फील्ड भरा आणि रेटिंग द्या!',
  },
  te: {
    navLinks: {
      learnGenetics: 'జెనెటిక్స్ నేర్చుకోండి',
      geneticDisorders: 'జన్యు వ్యాధులు',
      counselling: 'కౌన్సెలింగ్',
      geneticAssessment: 'AI జన్యు మూల్యాంకనం',
      dnaTesting: 'DNA పరీక్ష',
      aboutUs: 'మా గురించి',
    },
    intro: `మేము జెనెటిక్స్-కేంద్రీకృత వేదిక, జన్యు వ్యాధులు మరియు ఆధునిక జన్యు శాస్త్రం గురించి
      అవగాహన పెంచడానికి అంకితభావంతో పని చేస్తున్నాము. మా వెబ్‌సైట్ వినియోగదారులకు జెనెటిక్స్,
      జన్యు వ్యాధులు, DNA పరీక్ష మరియు జన్యు కౌన్సెలింగ్ గురించి సులభంగా నేర్చుకోవడానికి సహాయపడుతుంది.`,
    visionTitle: 'మా దృష్టి',
    visionText: `మా దృష్టి జెనెటిక్స్ అర్థం చేసుకోవడానికి విశ్వసనీయమైన మరియు సమగ్రమైన వేదికను నిర్మించడం.
      జన్యు వ్యాధుల సమాచారాన్ని స్పష్టంగా, ఖచ్చితంగా మరియు అందరికీ అందుబాటులో ఉంచాలని మేము లక్ష్యంగా పెట్టుకున్నాము.
      AI మరియు అధునాతన జన్యు పరిశోధనను అనుసంధానించడం ద్వారా మేము తెలివైన ఆరోగ్య నిర్ణయాలను
      ఊహిస్తున్నాము.`,
    missionTitle: 'మా లక్ష్యం',
    missionText1: `మా లక్ష్యం విద్యార్థులు, రోగులు మరియు సాధారణ ప్రజలకు సంక్లిష్టమైన జన్యు భావనలను సులభతరం చేయడం.
      మేము జెనెటిక్స్, జన్యు వ్యాధులు మరియు DNA పరీక్షపై నిర్మాణాత్మక అభ్యాసాన్ని అందిస్తున్నాము.`,
    missionText2: `ముందస్తు అవగాహన మరియు నివారణకు మద్దతు ఇవ్వడానికి AI-ఆధారిత జన్యు మూల్యాంకనాన్ని మేము
      అనుసంధానిస్తున్నాము. మా లక్ష్యం ప్రజలను విశ్వసనీయమైన జన్యు జ్ఞానంతో విద్యావంతులను చేయడం.`,
    teamTitle: 'మా జట్టు',
    teamSubtitle: 'మా విజయం వెనుక ఉన్న ప్రతిభావంతులను కలవండి',
    feedbackTitle: 'మీ అభిప్రాయం పంచుకోండి',
    feedbackSubtitle: 'మీ నుండి వినడానికి మేము ఇష్టపడతాము!',
    namePlaceholder: 'మీ పేరు నమోదు చేయండి',
    nameLabel: 'మీ పేరు',
    emailLabel: 'మీ ఇమెయిల్',
    emailPlaceholder: 'మీ ఇమెయిల్ నమోదు చేయండి',
    messageLabel: 'మీ సందేశం',
    messagePlaceholder: 'మీ అభిప్రాయాలు మాతో పంచుకోండి...',
    ratingLabel: 'మీ అనుభవాన్ని రేటింగ్ చేయండి',
    submitBtn: 'అభిప్రాయం సమర్పించండి',
    login: 'లాగిన్',
    signUp: 'సైన్ అప్',
    footerTagline: 'సులభ విద్య, అధునాతన AI మూల్యాంకనం మరియు వ్యక్తిగతీకరించిన అంతర్దృష్టుల ద్వారా జన్యు అవగాహనను శక్తివంతం చేయడం.',
    footerPlatform: 'వేదిక',
    footerServices: 'సేవలు',
    footerCompany: 'కంపెనీ',
    footerLegal: 'న్యాయపరమైన',
    successMsg: 'మీ అభిప్రాయానికి ధన్యవాదాలు! మేము మీ సూచనలను అభినందిస్తున్నాము.',
    errorMsg: 'అభిప్రాయం సమర్పించడం విఫలమైంది. దయచేసి తర్వాత మళ్ళీ ప్రయత్నించండి.',
    validationMsg: 'దయచేసి అన్ని ఫీల్డ్‌లు నింపండి మరియు రేటింగ్ ఇవ్వండి!',
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
            {/* ✅ Logo clicks to home */}
            <Link to="/" className="dna-footer-logo" style={{ textDecoration: 'none' }}>
              <div className="dna-footer-logo-circle"></div>
              <span className="dna-footer-logo-text">GeneGuard</span>
            </Link>
            <p className="dna-footer-tagline">{t.footerTagline}</p>
            <div className="dna-footer-social">
              <a href="https://twitter.com" className="dna-social-link" aria-label="Twitter" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" className="dna-social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com" className="dna-social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="dna-footer-links-grid">
            <div className="dna-footer-column">
              <h3 className="dna-footer-column-title">{t.footerPlatform}</h3>
              <ul className="dna-footer-links">
                <li><Link to="/learn-genetics">{t.navLinks.learnGenetics}</Link></li>
                <li><Link to="/genetic-disorders">{t.navLinks.geneticDisorders}</Link></li>
                <li><Link to="/counselling">{t.navLinks.counselling}</Link></li>
                <li><Link to="/genetic-assessment">{t.navLinks.geneticAssessment}</Link></li>
              </ul>
            </div>
            <div className="dna-footer-column">
              <h3 className="dna-footer-column-title">{t.footerServices}</h3>
              <ul className="dna-footer-links">
                <li><Link to="/dna">{t.navLinks.dnaTesting}</Link></li>
                <li><a href="#reports">Reports &amp; Insights</a></li>
                <li><a href="#consultation">Consultations</a></li>
                <li><a href="#research">Research</a></li>
              </ul>
            </div>
            <div className="dna-footer-column">
              <h3 className="dna-footer-column-title">{t.footerCompany}</h3>
              <ul className="dna-footer-links">
                <li><Link to="/about">{t.navLinks.aboutUs}</Link></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="dna-footer-column">
              <h3 className="dna-footer-column-title">{t.footerLegal}</h3>
              <ul className="dna-footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#hipaa">HIPAA Compliance</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="dna-footer-divider">
          <div className="dna-divider-glow"></div>
        </div>

        <div className="dna-footer-bottom">
          <p className="dna-footer-copyright">
            © {currentYear} GeneGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ─── Main About Component ─────────────────────────────────────────────────────
const About = () => {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', message: '', rating: 0 });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // ✅ Language state — drives all content
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  // Navbar states
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
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const developers = [
    {
      id: 1,
      name: 'Sakshi Choudhari',
      role: 'Full Stack Developer',
      image: saksImg,
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      contact: '+91 98765 43210',
      email: 'sakshichoudhari@gmail.com'
    },
    {
      id: 2,
      name: 'Utkarsha Soni',
      role: 'Frontend Developer',
      image: PandaImg,
      skills: ['React', 'CSS', 'JavaScript', 'UI/UX', 'HTML', 'React Native'],
      contact: '+91 98765 43211',
      email: 'utkarshasoni0831@gmail.com'
    },
    {
      id: 3,
      name: 'Roshani Singh',
      role: 'Backend Developer',
      image: rosImg,
      skills: ['Node.js', 'React.js', 'HTML', 'CSS', 'JavaScript'],
      contact: '+91 98765 43212',
      email: 'roshanisinghratan@gmail.com'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'UI/UX Designer',
      image: rosImg,
      skills: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop'],
      contact: '+91 98765 43213',
      email: 'sneha.reddy@example.com'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || formData.rating === 0) {
      setSubmitStatus({ type: 'error', message: t.validationMsg });
      return;
    }
    try {
      const response = await fetch('YOUR_BACKEND_API_URL/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: t.successMsg });
        setFormData({ name: '', email: '', message: '', rating: 0 });
      } else {
        throw new Error('Failed');
      }
    } catch {
      setSubmitStatus({ type: 'error', message: t.errorMsg });
    }
    setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);
  };

  return (
    <div className="about-container">
      {/* ─── Navbar ─────────────────────────────────────────────────────── */}
      <nav className={`dna-main-navbar ${isScrolled ? 'dna-navbar-scrolled' : ''}`}>
        <div className="dna-nav-content">

          {/* ✅ Logo now links to home page */}
          <Link to="/home" className="dna-nav-logo" style={{ textDecoration: 'none' }}>
            <div className="dna-logo-circle"></div>
            <span className="dna-logo-brand">Gene Guard</span>
          </Link>

          <div className="dna-nav-right-section">
            <div className="dna-nav-links">
              <Link to="/learn-genetics" className="dna-nav-link">{t.navLinks.learnGenetics}</Link>
              <Link to="/genetic-disorders" className="dna-nav-link">{t.navLinks.geneticDisorders}</Link>
              <Link to="/counselling" className="dna-nav-link">{t.navLinks.counselling}</Link>
              <Link to="/genetic-assessment" className="dna-nav-link">{t.navLinks.geneticAssessment}</Link>
              <Link to="/dna" className="dna-nav-link">{t.navLinks.dnaTesting}</Link>
              <Link to="/about" className="dna-nav-link active">{t.navLinks.aboutUs}</Link>
            </div>

            {/* ✅ Language Buttons — switching triggers full content change */}
            <div className="dna-language-buttons">
              <button
                className={`dna-lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >EN</button>
              <button
                className={`dna-lang-btn ${language === 'hi' ? 'active' : ''}`}
                onClick={() => setLanguage('hi')}
              >हिं</button>
              <button
                className={`dna-lang-btn ${language === 'mr' ? 'active' : ''}`}
                onClick={() => setLanguage('mr')}
              >मर</button>
              <button
                className={`dna-lang-btn ${language === 'te' ? 'active' : ''}`}
                onClick={() => setLanguage('te')}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {isProfileOpen && (
                <div className="dna-profile-dropdown">
                  <div className="dna-dropdown-glow"></div>
                  <Link to="/login" className="dna-dropdown-item dna-signup-special">{t.login}</Link>
                  <Link to="/signup" className="dna-dropdown-item dna-signup-special">{t.signUp}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="dna-mobile-menu-overlay">
          <Link to="/learn-genetics" className="dna-nav-link" onClick={handleLinkClick}>{t.navLinks.learnGenetics}</Link>
          <Link to="/genetic-disorders" className="dna-nav-link" onClick={handleLinkClick}>{t.navLinks.geneticDisorders}</Link>
          <Link to="/counselling" className="dna-nav-link" onClick={handleLinkClick}>{t.navLinks.counselling}</Link>
          <Link to="/genetic-assessment" className="dna-nav-link" onClick={handleLinkClick}>{t.navLinks.geneticAssessment}</Link>
          <Link to="/dna" className="dna-nav-link" onClick={handleLinkClick}>{t.navLinks.dnaTesting}</Link>
          <Link to="/about" className="dna-nav-link active" onClick={handleLinkClick}>{t.navLinks.aboutUs}</Link>
        </div>
      )}

      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="hero-section"></section>

      {/* ─── Intro ──────────────────────────────────────────────────────── */}
      <section className="intro-section animate-on-scroll" id="intro">
        <div className={`intro-container ${isVisible.intro ? 'fade-in-up' : ''}`}>
          <p className="intro-text">{t.intro}</p>
        </div>
      </section>

      {/* ─── Vision ─────────────────────────────────────────────────────── */}
      <section className="vision-section animate-on-scroll" id="vision">
        <div className={`content-wrapper ${isVisible.vision ? 'slide-in-left' : ''}`}>
          <div className="image-container">
            <div className="image-glow"></div>
            <img
              src="https://www.hrinternational.in/assets/img/vision.jpg"
              alt="Vision"
              className="section-image"
            />
          </div>
          <div className="text-container">
            <h2 className="section-title">
              <span className="title-gradient">{t.visionTitle}</span>
            </h2>
            <p className="section-text">{t.visionText}</p>
          </div>
        </div>
      </section>

      {/* ─── Mission ────────────────────────────────────────────────────── */}
      <section className="mission-section animate-on-scroll" id="mission">
        <div className={`content-wrapper reverse ${isVisible.mission ? 'slide-in-right' : ''}`}>
          <div className="text-container">
            <h2 className="section-title">
              <span className="title-gradient">{t.missionTitle}</span>
            </h2>
            <p className="section-text">{t.missionText1}</p>
            <p className="section-text">{t.missionText2}</p>
          </div>
          <div className="image-container">
            <div className="image-glow"></div>
            <img
              src="https://www.hrinternational.in/assets/img/mv.webp"
              alt="Mission"
              className="section-image"
            />
          </div>
        </div>
      </section>

      {/* ─── Team ───────────────────────────────────────────────────────── */}
      <section className="developers-section animate-on-scroll" id="developers">
        <div className={`developers-container ${isVisible.developers ? 'fade-in-up' : ''}`}>
          <h2 className="developers-title">
            <span className="title-gradient">{t.teamTitle}</span>
          </h2>
          <p className="developers-subtitle">{t.teamSubtitle}</p>
          <div className="developers-grid">
            {developers.map((dev, index) => (
              <div
                key={dev.id}
                className="developer-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="developer-image-wrapper">
                  <img src={dev.image} alt={dev.name} className="developer-image" />
                </div>
                <div className="developer-info">
                  <h3 className="developer-name">{dev.name}</h3>
                  <p className="developer-role">{dev.role}</p>
                  <div className="developer-skills">
                    {dev.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <div className="developer-contact">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                    <span>{dev.contact}</span>
                  </div>
                  <div className="developer-email">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>{dev.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Feedback Form ──────────────────────────────────────────────── */}
      <section className="feedback-form-section animate-on-scroll" id="feedback">
        <div className={`feedback-form-container ${isVisible.feedback ? 'fade-in-up' : ''}`}>
          <h2 className="feedback-form-title">{t.feedbackTitle}</h2>
          <p className="feedback-form-subtitle">{t.feedbackSubtitle}</p>

          <form className="feedback-form" onSubmit={handleSubmit}>
            {submitStatus.message && (
              <div className={submitStatus.type === 'success' ? 'success-message' : 'error-message'}>
                {submitStatus.message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name" className="form-label">{t.nameLabel}</label>
              <input
                type="text" id="name" name="name" className="form-input"
                placeholder={t.namePlaceholder}
                value={formData.name} onChange={handleInputChange} required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">{t.emailLabel}</label>
              <input
                type="email" id="email" name="email" className="form-input"
                placeholder={t.emailPlaceholder}
                value={formData.email} onChange={handleInputChange} required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">{t.messageLabel}</label>
              <textarea
                id="message" name="message" className="form-textarea"
                placeholder={t.messagePlaceholder}
                value={formData.message} onChange={handleInputChange} required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">{t.ratingLabel}</label>
              <div className="rating-group">
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star} type="button"
                      className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                      onClick={() => handleStarClick(star)}
                    >★</button>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">{t.submitBtn}</button>
          </form>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────────── */}
      <Footer t={t} />
    </div>
  );
};

export default About;
