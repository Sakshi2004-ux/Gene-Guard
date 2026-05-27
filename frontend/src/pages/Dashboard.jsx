import { useNavigate } from "react-router-dom";
import { agents } from "../data/agents";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Background */}
      <img
        src="https://cdn.shopify.com/s/files/1/0772/4223/7207/files/Generic-Preventive.png?v=1707127515"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 p-6 text-white">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
             GeneGuard AI Dashboard
          </h1>
         <p className="mt-3 text-lg font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
   Select an AI agent to begin analysis
</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="space-y-6">
            {agents.slice(0, 3).map((agent) => (
              <div
                key={agent.id}
               className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 
hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 
transition duration-300 shadow-lg"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {agent.name}
                </h2>

                <p className="text-sm text-gray-300 mb-4">
                  {agent.description}
                </p>

                <button
                  onClick={() => navigate(`/agent/${agent.id}`)}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-400 hover:scale-105 transition shadow-md hover:shadow-purple-400/30"
                >
                  🚀 Open Agent
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {agents.slice(3, 6).map((agent) => (
              <div
                key={agent.id}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 
hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 
transition duration-300 shadow-lg"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {agent.name}
                </h2>

                <p className="text-sm text-gray-300 mb-4">
                  {agent.description}
                </p>

                <button
                  onClick={() => navigate(`/agent/${agent.id}`)}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-400 hover:scale-105 transition shadow-md hover:shadow-purple-400/30"
                >
                  🚀 Open Agent
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;