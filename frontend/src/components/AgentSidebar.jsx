import { motion, AnimatePresence } from "framer-motion";

const AgentSidebar = ({ isOpen, onClose, agent, onOpenFull }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[380px] bg-black/40 backdrop-blur-xl border-l border-white/20 z-50 text-white p-6"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-purple-300">
                🧬 AI Agent Panel
              </h2>

              <button
                onClick={onClose}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Agent Info */}
            {agent && (
              <div className="p-4 rounded-xl bg-white/10 border border-white/20 mb-6">
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <p className="text-sm text-white/70 mt-1">
                  {agent.description}
                </p>
              </div>
            )}

            {/* Primary Action */}
            {agent && (
              <button
                onClick={() => onOpenFull(agent)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition font-semibold"
              >
                🚀 Open Agent
              </button>
            )}

            {/* Optional hint */}
            <p className="text-xs text-white/40 mt-4 text-center">
              Full analysis & form-based execution
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AgentSidebar;