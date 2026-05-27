import React, { useState } from 'react';
import './Disorders.css';

const Disorders = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showGlossary, setShowGlossary] = useState(false);

  // Disorder Categories Data
  const disorderCategories = [
    {
      id: 1,
      title: 'SINGLE-GENE DISORDERS',
      image: 'https://cdn5.slideserve.com/9344131/single-gene-disorders-n.jpg',
      overlay: 'rgba(138, 43, 226, 0.65)',
      description: 'Single-gene disorders, also known as Mendelian disorders, are caused by mutations in a single gene. These conditions follow predictable inheritance patterns and can be passed from parents to children through autosomal dominant, autosomal recessive, or X-linked inheritance.',
      basicCharacteristics: 'Caused by changes in one specific gene; follows clear hereditary patterns; can often be detected through genetic testing.',
      examples: [
        {
          name: 'Cystic Fibrosis',
          info: 'Autosomal recessive disorder affecting the lungs and digestive system, causing thick mucus buildup that can lead to respiratory and digestive complications'
        },
        {
          name: 'Sickle Cell Disease',
          info: 'Red blood cells become crescent-shaped, leading to pain crises, organ damage, and increased infection risk'
        },
        {
          name: 'Huntington\'s Disease',
          info: 'Progressive autosomal dominant brain disorder affecting movement, cognition, and behavior, typically appearing in mid-adulthood'
        },
        {
          name: 'Hemophilia',
          info: 'X-linked blood clotting disorder that can cause excessive bleeding even from minor injuries'
        },
        {
          name: 'Marfan Syndrome',
          info: 'Connective tissue disorder affecting the heart, blood vessels, bones, and eyes'
        }
      ]
    },
    {
      id: 2,
      title: 'CHROMOSOMAL DISORDERS',
      image: 'https://image.slidesharecdn.com/geneticspresenatation-151026053323-lva1-app6892/95/chromosomal-disorders-1-638.jpg?cb=1445837805',
      overlay: 'rgba(46, 125, 50, 0.65)',
      description: 'Chromosomal disorders occur when there are abnormalities in chromosome number or structure. These can result from errors during cell division and often affect multiple body systems. They can be numerical (too many or too few chromosomes) or structural (missing, extra, or rearranged chromosome parts).',
      basicCharacteristics: 'Involves entire chromosomes or large chromosome segments; often occurs spontaneously; typically affects multiple organ systems.',
      examples: [
        {
          name: 'Down Syndrome (Trisomy 21)',
          info: 'Extra copy of chromosome 21, causing characteristic facial features, developmental delays, and increased risk of certain medical conditions'
        },
        {
          name: 'Turner Syndrome',
          info: 'Missing or incomplete X chromosome in females, affecting growth, heart development, and fertility'
        },
        {
          name: 'Klinefelter Syndrome',
          info: 'Extra X chromosome in males (XXY), affecting testosterone production, physical development, and fertility'
        },
        {
          name: 'Edwards Syndrome (Trisomy 18)',
          info: 'Extra copy of chromosome 18, causing severe developmental issues and multiple organ abnormalities'
        },
        {
          name: 'Cri-du-chat Syndrome',
          info: 'Deletion of part of chromosome 5, characterized by a distinctive cat-like cry in infancy and intellectual disability'
        }
      ]
    },
    {
      id: 3,
      title: 'MULTIFACTORIAL DISORDERS',
      image: 'https://tse2.mm.bing.net/th/id/OIP.3nQRDa3pryQ9oA0S5mEEfwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
      overlay: 'rgba(211, 47, 47, 0.65)',
      description: 'Multifactorial disorders, also called complex disorders, result from a combination of genetic predisposition and environmental factors. Multiple genes interact with lifestyle, diet, environmental exposures, and other external factors to influence disease development. These are among the most common genetic conditions.',
      basicCharacteristics: 'Result from multiple genes plus environmental factors; risk can be modified by lifestyle; tend to run in families but without clear inheritance patterns.',
      examples: [
        {
          name: 'Type 2 Diabetes',
          info: 'Metabolic disorder affecting blood sugar regulation, influenced by genetics, diet, exercise, and body weight'
        },
        {
          name: 'Heart Disease',
          info: 'Various cardiovascular conditions influenced by genetic factors, diet, exercise, smoking, and stress'
        },
        {
          name: 'Alzheimer\'s Disease',
          info: 'Progressive neurodegenerative disorder affecting memory and cognition, with both genetic and environmental risk factors'
        },
        {
          name: 'Certain Cancers',
          info: 'Some cancers have both genetic predisposition and environmental triggers such as radiation, chemicals, or lifestyle factors'
        },
        {
          name: 'Asthma',
          info: 'Respiratory condition influenced by genetic susceptibility and environmental allergens, pollution, and infections'
        }
      ]
    }
  ];

  // Enhanced Symptoms Checker Data
  const symptomSteps = [
    {
      step: 1,
      question: 'What primary area of concern are you experiencing?',
      instruction: 'Select the category that best matches your main symptoms',
      options: [
        { id: 's1', label: 'Respiratory Issues', icon: '🫁', description: 'Breathing difficulties, chronic cough' },
        { id: 's2', label: 'Developmental Concerns', icon: '👶', description: 'Growth delays, learning difficulties' },
        { id: 's3', label: 'Blood/Circulation Problems', icon: '❤️', description: 'Anemia, clotting issues' },
        { id: 's4', label: 'Neurological Symptoms', icon: '🧠', description: 'Memory, movement, coordination issues' }
      ]
    },
    {
      step: 2,
      question: 'How long have you been experiencing these symptoms?',
      instruction: 'Duration can help identify the nature of the condition',
      options: [
        { id: 'd1', label: 'Less than 1 week', icon: '📅', description: 'Recent onset' },
        { id: 'd2', label: '1-4 weeks', icon: '📅', description: 'Short-term duration' },
        { id: 'd3', label: '1-6 months', icon: '📅', description: 'Medium-term duration' },
        { id: 'd4', label: 'More than 6 months', icon: '📅', description: 'Long-term or chronic' }
      ]
    },
    {
      step: 3,
      question: 'Is there a family history of genetic disorders?',
      instruction: 'Family history is an important factor in genetic conditions',
      options: [
        { id: 'f1', label: 'Yes, confirmed', icon: '👨‍👩‍👧‍👦', description: 'Documented family cases' },
        { id: 'f2', label: 'Possibly/Uncertain', icon: '❓', description: 'Some family health issues' },
        { id: 'f3', label: 'No known history', icon: '✓', description: 'No apparent family cases' },
        { id: 'f4', label: 'Adopted/Unknown', icon: '🤷', description: 'Family history unavailable' }
      ]
    },
    {
      step: 4,
      question: 'Have symptoms worsened or changed recently?',
      instruction: 'Changes in symptoms can provide important diagnostic clues',
      options: [
        { id: 'w1', label: 'Yes, getting worse', icon: '📈', description: 'Progressive worsening' },
        { id: 'w2', label: 'Stable/unchanged', icon: '📊', description: 'Consistent symptoms' },
        { id: 'w3', label: 'Improving', icon: '📉', description: 'Getting better' },
        { id: 'w4', label: 'Fluctuating', icon: '〰️', description: 'Varies over time' }
      ]
    }
  ];

  // Glossary Data
  const glossaryTerms = [
    {
      term: 'Autosomal',
      definition: 'Refers to any chromosome that is not a sex chromosome (X or Y). Humans have 22 pairs of autosomes.'
    },
    {
      term: 'Dominant',
      definition: 'A genetic trait that appears when only one copy of the gene is present.'
    },
    {
      term: 'Recessive',
      definition: 'A genetic trait that requires two copies of the gene to be expressed.'
    },
    {
      term: 'Mutation',
      definition: 'A change in the DNA sequence that can lead to altered gene function.'
    },
    {
      term: 'Carrier',
      definition: 'Someone who has one copy of a recessive gene mutation but shows no symptoms.'
    },
    {
      term: 'Genetic Counselor',
      definition: 'Healthcare professional trained to help people understand genetic conditions and testing.'
    }
  ];

  // Prevention Tips Data
  const preventionTips = [
    {
      id: 1,
      title: 'Genetic Counseling',
      description: 'Consult with genetic counselors before family planning to understand potential hereditary risks and available testing options',
      icon: '🧬'
    },
    {
      id: 2,
      title: 'Prenatal Testing',
      description: 'Screen for genetic disorders during pregnancy through amniocentesis, CVS, or non-invasive prenatal testing (NIPT)',
      icon: '🤰'
    },
    {
      id: 3,
      title: 'Carrier Screening',
      description: 'Test prospective parents to identify if they carry genes for certain genetic disorders, especially for recessive conditions',
      icon: '🔬'
    },
    {
      id: 4,
      title: 'Healthy Lifestyle',
      description: 'Maintain balanced diet, regular exercise, and avoid harmful substances to reduce risk of multifactorial disorders',
      icon: '🥗'
    },
    {
      id: 5,
      title: 'Regular Checkups',
      description: 'Schedule routine medical examinations and genetic health assessments, especially if you have a family history',
      icon: '⚕️'
    },
    {
      id: 6,
      title: 'Family History',
      description: 'Document and share complete family medical history with healthcare providers to identify potential genetic risks',
      icon: '📋'
    }
  ];

  // Modal Handlers
  const openModal = (category) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  // Symptom Checker Handlers
  const openSymptomChecker = () => {
    setShowSymptomChecker(true);
    setCurrentStep(1);
    setSelectedSymptoms([]);
  };

  const closeSymptomChecker = () => {
    setShowSymptomChecker(false);
    setCurrentStep(1);
    setSelectedSymptoms([]);
    setShowGlossary(false);
  };

  const handleSymptomSelection = (option) => {
    setSelectedSymptoms([...selectedSymptoms, option]);
    if (currentStep < 4) {
      setTimeout(() => setCurrentStep(currentStep + 1), 400);
    }
  };

  const resetSymptomChecker = () => {
    setCurrentStep(1);
    setSelectedSymptoms([]);
    setShowGlossary(false);
  };

  const toggleGlossary = () => {
    setShowGlossary(!showGlossary);
  };

  return (
    <div className="disorders-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">Genetic Disorders</h1>
            <p className="hero-subtitle">
              Understanding genetic conditions to empower informed health decisions
              and provide compassionate support for affected individuals and families
            </p>
          </div>
          <div className="hero-right">
            <div className="image-frame">
              <img 
                src="https://th.bing.com/th/id/R.d20277cd43f537dfe56ce9a49f2732cc?rik=oTitnvg9vD%2fc7w&riu=http%3a%2f%2fcameronhgenetics.weebly.com%2fuploads%2f5%2f1%2f6%2f5%2f51654883%2f1432079956.png&ehk=NzSUjhbSWlQZOII1AIjTZ5JHBY8LeuBNxzLAdnX6fRA%3d&risl=&pid=ImgRaw&r=0" 
                alt="DNA Structure Illustration"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Disorder Classification Section */}
      <section className="classification-section">
        <div className="section-header">
          <h2 className="section-title">Types of Genetic Disorders</h2>
          <p className="section-description bold-description">
            Explore the three main categories of genetic disorders and learn about their basic characteristics
          </p>
        </div>
        
        <div className="category-grid">
          {disorderCategories.map((category) => (
            <div 
              key={category.id}
              className="category-tile"
              onClick={() => openModal(category)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && openModal(category)}
              aria-label={`Learn more about ${category.title}`}
            >
              <div 
                className="category-image"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div 
                  className="category-overlay"
                  style={{ background: category.overlay }}
                >
                  <h3 className="category-title">{category.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Symptoms Checker Section */}
      <section className="symptoms-section">
        <div className="section-header">
          <h2 className="section-title">Interactive Symptoms Checker</h2>
          <p className="section-description">
            An educational tool to help you understand various symptoms and imply basic medical insights
          </p>
        </div>
        
        <div className="symptoms-cta">
          <button 
            className="symptoms-button"
            onClick={openSymptomChecker}
            aria-label="Start symptom assessment"
          >
            <span className="button-icon">🩺</span>
            Start Symptom Assessment
          </button>
          <p className="symptoms-disclaimer">
            <strong>Important:</strong> This tool is for educational purposes only and provides basic insights.
            It does not replace professional medical diagnosis. Please consult a healthcare professional for accurate medical advice.
          </p>
        </div>
      </section>

      {/* Prevention Tips Section */}
      <section className="prevention-section">
        <div className="section-header">
          <h2 className="section-title">Prevention & Awareness</h2>
          <p className="section-description">
            Proactive steps you can take to understand and manage genetic health risks
          </p>
        </div>
        
        <div className="tips-grid">
          {preventionTips.map((tip) => (
            <div key={tip.id} className="tip-diamond">
              <div className="tip-content">
                <span className="tip-icon">{tip.icon}</span>
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-description">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Modal */}
      {selectedCategory && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              ✕
            </button>
            <h2 className="modal-title">{selectedCategory.title}</h2>
            
            <div className="modal-section">
              <h3 className="modal-section-title">Overview</h3>
              <p className="modal-description">{selectedCategory.description}</p>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title">Basic Characteristics</h3>
              <p className="modal-characteristics">{selectedCategory.basicCharacteristics}</p>
            </div>
            
            <div className="examples-section">
              <h3 className="examples-title">Common Examples & Subtypes:</h3>
              <div className="examples-grid">
                {selectedCategory.examples.map((example, index) => (
                  <div key={index} className="example-card">
                    <h4 className="example-name">{example.name}</h4>
                    <p className="example-info">{example.info}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Symptom Checker Modal */}
      {showSymptomChecker && (
        <div className="modal-overlay" onClick={closeSymptomChecker}>
          <div className="symptom-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeSymptomChecker} aria-label="Close symptom checker">
              ✕
            </button>
            
            <div className="symptom-header">
              <h2 className="symptom-title">Symptom Assessment Tool</h2>
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  ></div>
                </div>
                <p className="step-indicator">Step {currentStep} of 4</p>
              </div>
            </div>

            {currentStep <= 4 ? (
              <div className="symptom-step">
                <h3 className="step-question">
                  {symptomSteps[currentStep - 1].question}
                </h3>
                <p className="step-instruction">
                  {symptomSteps[currentStep - 1].instruction}
                </p>
                <div className="options-grid">
                  {symptomSteps[currentStep - 1].options.map((option) => (
                    <button
                      key={option.id}
                      className="option-button"
                      onClick={() => handleSymptomSelection(option)}
                      aria-label={`Select ${option.label}`}
                    >
                      <span className="option-icon">{option.icon}</span>
                      <span className="option-label">{option.label}</span>
                      <span className="option-description">{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="symptom-result">
                <div className="result-icon">✓</div>
                <h3 className="result-title">Assessment Complete</h3>
                <p className="result-message">
                  Thank you for completing the symptom assessment. Based on your responses,
                  we recommend consulting with a healthcare professional or genetic counselor
                  for personalized advice, proper medical evaluation, and accurate diagnosis.
                </p>
                <div className="result-summary">
                  <h4 className="summary-title">Your Selected Responses:</h4>
                  <ul className="summary-list">
                    {selectedSymptoms.map((symptom, index) => (
                      <li key={index} className="summary-item">
                        <span className="summary-icon">{symptom.icon}</span>
                        <span className="summary-text">{symptom.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="result-actions">
                  <button className="primary-button" onClick={closeSymptomChecker}>
                    Close Assessment
                  </button>
                  <button className="secondary-button" onClick={resetSymptomChecker}>
                    Start Over
                  </button>
                </div>
              </div>
            )}

            {/* Glossary Section */}
            <div className="glossary-section">
              <button 
                className="glossary-toggle"
                onClick={toggleGlossary}
                aria-expanded={showGlossary}
              >
                <span className="glossary-icon">📚</span>
                {showGlossary ? 'Hide' : 'Show'} Medical Glossary
              </button>
              
              {showGlossary && (
                <div className="glossary-content">
                  <h4 className="glossary-title">Common Terms Explained</h4>
                  <div className="glossary-grid">
                    {glossaryTerms.map((item, index) => (
                      <div key={index} className="glossary-item">
                        <strong className="glossary-term">{item.term}:</strong>
                        <span className="glossary-definition"> {item.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Disorders;
