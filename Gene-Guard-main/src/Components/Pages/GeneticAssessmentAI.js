import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { parseMarkdown } from '../../utils/formatters';
import './GeneticAssessmentAI.css';

/* ─── Gemini Model Init (reuses env key from geminiDirectService) ────────────── */
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';
let chatModel = null;

try {
  if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    chatModel = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { maxOutputTokens: 1200, temperature: 0.7 },
    });
  }
} catch (err) {
  console.warn('GeneticAssessmentAI: Gemini init failed:', err.message);
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
const formatTime = (d) => {
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ap = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m} ${ap}`;
};

/** Build a rich system prompt from all 3 context layers */
const buildSystemPrompt = (patient, agentResults) => {
  let prompt =
    'You are a personal genetic health advisor for Gene Guard. ' +
    'You have access to this patient\'s medical intake data and their DNA agent results. ' +
    'Answer their questions in a warm, clear, non-alarming way. ' +
    'Always remind them to consult a doctor for medical decisions. ' +
    'Use their specific data to give personalized answers, not generic ones.\n\n';

  // Layer 1 — Patient intake data
  if (patient) {
    prompt += '--- PATIENT INTAKE DATA ---\n';
    const fields = [
      ['Full Name', patient.fullName],
      ['Age', patient.age],
      ['Sex', patient.sex],
      ['Blood Group', patient.bloodGroup],
      ['Family History', patient.familyHistory],
      ['Family Member Count', patient.familyMemberCount],
      ['Family Member Relation', patient.familyMemberRelation],
      ['Known Disorder', patient.knownDisorder],
      ['Symptoms', patient.symptoms],
      ['Purpose', patient.purpose],
      ['Report Risk', patient.reportRisk],
      ['Sample Preference', patient.samplePreference],
      ['Fasting Status', patient.fastingStatus],
      ['Consulted Doctor', patient.consultedDoctor],
      ['Medications', patient.medications],
      ['Allergies', patient.allergies],
      ['Location', patient.location],
    ];
    fields.forEach(([label, value]) => {
      if (value) prompt += `${label}: ${value}\n`;
    });
    prompt += '\n';
  }

  // Layer 2 — DNA Agent results
  if (agentResults && Object.keys(agentResults).length > 0) {
    prompt += '--- DNA AGENT RESULTS ---\n';
    Object.entries(agentResults).forEach(([agentId, result]) => {
      prompt += `\nAgent: ${agentId}\n`;
      if (result.title) prompt += `Title: ${result.title}\n`;
      if (result.status) prompt += `Status: ${result.status}\n`;
      if (result.summary) prompt += `Summary: ${result.summary}\n`;
      if (Array.isArray(result.highlights)) {
        result.highlights.forEach((h) => {
          const label = typeof h === 'string' ? 'Insight' : h.label;
          const value = typeof h === 'string' ? h : h.value;
          prompt += `  - ${label}: ${value}\n`;
        });
      }
      if (Array.isArray(result.nextSteps)) {
        prompt += `Next Steps: ${result.nextSteps.join('; ')}\n`;
      }
    });
    prompt += '\n';
  }

  return prompt;
};

/* ─── Component ──────────────────────────────────────────────────────────────── */
const GeneticAssessmentAI = () => {
  // Patient & agent data
  const [patient, setPatient] = useState(null);
  const [agentResults, setAgentResults] = useState(null);
  const [patientLoaded, setPatientLoaded] = useState(false);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [welcomeSent, setWelcomeSent] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // ── Load context layers on mount ──
  useEffect(() => {
    // Layer 1: Patient intake from localStorage (same key as PatientDNAIntake)
    const saved = localStorage.getItem('geneGuardPatientProfile');
    if (saved) {
      try {
        setPatient(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to parse patient profile:', e);
      }
    }
    setPatientLoaded(true);

    // Layer 2: Agent results from localStorage
    const savedAgents = localStorage.getItem('geneGuardAgentResults');
    if (savedAgents) {
      try {
        setAgentResults(JSON.parse(savedAgents));
      } catch (e) {
        console.warn('Failed to parse agent results:', e);
      }
    }
  }, []);

  // ── Build welcome message ──
  const welcomeText = useMemo(() => {
    if (!patientLoaded) return '';
    const name = patient?.fullName || '';
    if (!patient) {
      return 'Please complete your health intake form first so I can give you personalized answers.';
    }
    let msg = `Hi${name ? ' ' + name : ''}, I have access to your genetic profile and test results.`;
    if (agentResults && Object.keys(agentResults).length > 0) {
      msg += ' I can also see your recent DNA agent results.';
    }
    msg += ' What would you like to know?';
    return msg;
  }, [patient, agentResults, patientLoaded]);

  // ── Send welcome message when chat opens for the first time ──
  useEffect(() => {
    if (chatOpen && !welcomeSent && welcomeText) {
      setMessages([
        {
          role: 'ai',
          text: welcomeText,
          time: new Date(),
        },
      ]);
      setWelcomeSent(true);
    }
  }, [chatOpen, welcomeSent, welcomeText]);

  // ── Auto-scroll ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // ── Focus input when chat opens ──
  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [chatOpen]);

  // ── Open / Close chat ──
  const openChat = useCallback(() => setChatOpen(true), []);

  const closeChat = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setChatOpen(false);
      setClosing(false);
    }, 250);
  }, []);

  // ── Send message ──
  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg = { role: 'user', text: trimmed, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      if (!chatModel) {
        throw new Error('Gemini API is not configured. Please add REACT_APP_GEMINI_API_KEY to your environment.');
      }

      // Build context: system prompt + last 10 messages
      const systemPrompt = buildSystemPrompt(patient, agentResults);
      const recentMessages = [...messages, userMsg].slice(-10);
      const conversationContext = recentMessages
        .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
        .join('\n\n');

      const fullPrompt = `${systemPrompt}\n--- CONVERSATION ---\n${conversationContext}\n\nAssistant:`;

      const result = await chatModel.generateContent(fullPrompt);
      const responseText = result.response.text();

      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: responseText, time: new Date() },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: `I'm sorry, I encountered an issue processing your request. ${error.message || 'Please try again in a moment.'} Remember to always consult with a healthcare professional for medical advice.`,
          time: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, messages, patient, agentResults]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const userName = patient?.fullName || 'there';
  const hasIntake = !!patient;
  const hasAgents = agentResults && Object.keys(agentResults).length > 0;

  return (
    <div className="ga-page">
      {/* ── Animated Background ── */}
      <div className="ga-bg-particles">
        <div className="ga-particle" />
        <div className="ga-particle" />
        <div className="ga-particle" />
        <div className="ga-particle" />
        <div className="ga-helix-ring" />
        <div className="ga-helix-ring" />
      </div>

      {/* ── Hero ── */}
      <section className="ga-hero">
        <div className="ga-hero-inner">
          <div className="ga-hero-text">
            <div className="ga-badge">
              <span className="ga-badge-dot" />
              Genetic Assessment AI
            </div>
            <h1>Your Personal AI Genetic Advisor</h1>
            <p>
              Ask questions about your genetic profile, DNA test results, health risks, and family history.
              Our AI advisor combines your intake data with agent analysis to deliver personalized insights.
            </p>
          </div>
          <div className="ga-hero-actions">
            <Link to="/dna/patient-intake" className="ga-outline-btn">
              ← Edit Intake Form
            </Link>
            <Link to="/dna/agents" className="ga-outline-btn">
              Open Agent Dashboard
            </Link>
            <button className="ga-primary-btn" onClick={openChat}>
              💬 Start Chat
            </button>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="ga-features">
        <div className="ga-feature-card">
          <div className="ga-feature-icon">🧬</div>
          <h3>Patient-Aware</h3>
          <p>
            Understands your age, sex, blood group, symptoms, medications, family history, and known genetic disorders from your intake form.
          </p>
        </div>
        <div className="ga-feature-card">
          <div className="ga-feature-icon">🤖</div>
          <h3>Agent-Informed</h3>
          <p>
            Integrates results from all 6 DNA agents — guidance, test suggestion, sample process, report simplifier, recommendation, and escalation.
          </p>
        </div>
        <div className="ga-feature-card">
          <div className="ga-feature-icon">💬</div>
          <h3>Conversational Memory</h3>
          <p>
            Maintains conversation context across messages so you can ask follow-up questions naturally without repeating yourself.
          </p>
        </div>
      </section>

      {/* ── Context Status Strip ── */}
      <section className="ga-context-strip">
        <div className="ga-context-inner">
          <div className={`ga-context-chip ${hasIntake ? 'active' : 'inactive'}`}>
            <span className={`ga-chip-dot ${hasIntake ? 'green' : 'gray'}`} />
            {hasIntake ? `Patient: ${patient.fullName || 'Loaded'}` : 'No intake data'}
          </div>
          <div className={`ga-context-chip ${hasAgents ? 'active' : 'inactive'}`}>
            <span className={`ga-chip-dot ${hasAgents ? 'green' : 'gray'}`} />
            {hasAgents
              ? `${Object.keys(agentResults).length} agent result${Object.keys(agentResults).length > 1 ? 's' : ''} loaded`
              : 'No agent results yet'}
          </div>
          <div className={`ga-context-chip ${chatModel ? 'active' : 'inactive'}`}>
            <span className={`ga-chip-dot ${chatModel ? 'green' : 'amber'}`} />
            {chatModel ? 'Gemini AI ready' : 'Gemini not configured'}
          </div>
        </div>
      </section>

      {/* ── Personalized Greeting ── */}
      <section className="ga-greeting">
        <h2>Welcome, {userName} 👋</h2>
        <p>
          {hasIntake
            ? 'Your genetic profile is loaded. Click the chat bubble or "Start Chat" to begin.'
            : 'Complete your patient intake form to unlock personalized AI advice.'}
        </p>
      </section>

      {/* ── Disclaimer ── */}
      <section className="ga-disclaimer">
        <p>
          ⚕️ Gene Guard AI provides educational information only and is not a substitute for professional medical advice.
          Always consult a qualified healthcare provider for diagnosis, treatment, and medical decisions.
        </p>
      </section>

      {/* ── Floating Chat Bubble ── */}
      <button
        className={`ga-chat-bubble ${chatOpen ? 'hidden' : ''}`}
        onClick={openChat}
        aria-label="Open AI Chat"
        id="ga-chat-bubble"
      >
        💬
        {hasIntake && !welcomeSent && <span className="ga-bubble-badge">1</span>}
      </button>

      {/* ── Chat Panel ── */}
      {chatOpen && (
        <div className="ga-chat-overlay">
          <div className={`ga-chat-panel ${closing ? 'closing' : ''}`}>
            {/* Header */}
            <div className="ga-chat-header">
              <div className="ga-chat-header-left">
                <div className="ga-chat-avatar">🧬</div>
                <div className="ga-chat-header-info">
                  <h4>Gene Guard AI</h4>
                  <span>Personal Genetic Advisor</span>
                </div>
              </div>
              <button className="ga-chat-close" onClick={closeChat} aria-label="Close chat">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="ga-chat-messages" id="ga-chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`ga-msg ${msg.role}`}>
                  <div
                    className="ga-msg-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        msg.role === 'ai'
                          ? parseMarkdown(msg.text)
                          : msg.text.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
                    }}
                  />
                  <span className="ga-msg-time">{formatTime(msg.time)}</span>
                </div>
              ))}

              {isTyping && (
                <div className="ga-typing">
                  <div className="ga-typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ga-chat-input-area">
              <div className="ga-chat-input-row">
                <textarea
                  ref={inputRef}
                  className="ga-chat-input"
                  placeholder="Ask about your genetic profile…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  id="ga-chat-input"
                />
                <button
                  className="ga-chat-send"
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  id="ga-chat-send"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneticAssessmentAI;
