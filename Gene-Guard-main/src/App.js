import { BrowserRouter, Routes, Route } from "react-router-dom";
import LearnGenetics from "./Components/Pages/LearnGenetics";
import DNA from "./Components/DNA/DNA";
import About from "./Components/Pages/About";
import Home from "./Components/Pages/Home";
import Counselling from "./Components/DNA/Counselling";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import DNAAgentsDashboard from "./Components/DNA/DNAAgentsDashboard";
import PatientDNAIntake from "./Components/DNA/PatientDNAIntake";
import GeneticAssessmentAI from "./Components/Pages/GeneticAssessmentAI";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/learn-genetics" element={<LearnGenetics />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dna" element={<DNA />} />
        <Route path="/dna/agents/:agentId" element={<DNAAgentsDashboard />} />
        <Route path="/dna/agents" element={<DNAAgentsDashboard />} />
        <Route path="/dna/patient-intake" element={<PatientDNAIntake />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/counselling" element={<Counselling />} />
        <Route path="/genetic-assessment" element={<GeneticAssessmentAI />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
