import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    problem: string | string[];
    solution: string | string[];
    tech: string[];
    impact: string[];
  };
}

const ProjectModal = ({ isOpen, onClose, title, content }: ProjectModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="关闭"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="px-8 py-6 space-y-8">
                {/* Problem */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    痛点 (Problem)
                  </h3>
                  {Array.isArray(content.problem) ? (
                    <ul className="space-y-2">
                      {content.problem.map((item, index) => (
                        <li key={index} className="text-gray-700 leading-relaxed flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{content.problem}</p>
                  )}
                </section>

                {/* Solution */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    解决方案 (Solution)
                  </h3>
                  {Array.isArray(content.solution) ? (
                    <ul className="space-y-2">
                      {content.solution.map((item, index) => (
                        <li key={index} className="text-gray-700 leading-relaxed flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{content.solution}</p>
                  )}
                </section>

                {/* Tech Details */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🛠️</span>
                    技术细节 (Tech)
                  </h3>
                  <div className="space-y-4">
                    {content.tech.map((item, index) => (
                      <div key={index} className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                        <p className="text-gray-800 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Impact */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    成果 (Impact)
                  </h3>
                  <ul className="space-y-3">
                    {content.impact.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-indigo-600 mt-1">✓</span>
                        <span className="text-gray-700 leading-relaxed flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 px-8 py-4 border-t border-gray-200 rounded-b-2xl">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
                  style={{ backgroundColor: '#3730A3', color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2D1F7F'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3730A3'}
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
