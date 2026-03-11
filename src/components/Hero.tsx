import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

// 字符级打字机效果组件
const CharacterTypewriter = ({ text }: { text: string }) => {
  const characters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.01 },
    },
  };

  return (
    <motion.span variants={containerVariants} initial="hidden" animate="visible" className="inline">
      {characters.map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// 光标组件 - 在标题完成后消失 (已移除，不再使用)

const Hero = () => {
  return (
    <AnimatedSection className="min-h-screen flex items-center bg-transparent px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status Badge - 靛青蓝呼吸灯 */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#3730A3' }}></div>
                  <div className="absolute w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#3730A3', opacity: 0.4 }}></div>
                </div>
                <span className="text-slate-700 font-medium text-sm">
                  Available for exciting AI × Legal opportunities
                </span>
              </div>
            </motion.div>

            {/* Main Heading - 字符级打字机效果 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <CharacterTypewriter text="Hi I'm Wendy, " />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent inline-block animate-text-flow">
                <CharacterTypewriter text="AI Legal Tech Builder." />
              </span>
            </h1>

            {/* Description - 自动无缝接入 */}
            <motion.p
              className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              以法律之逻辑，赋 AI 以温情。
            </motion.p>

            <motion.p
              className="text-lg text-slate-600 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              上海交通大学法学硕士（2026届）· 法律职业资格A证 ·
              Intel Impact Reward 获得者 · 莉莉丝游戏 AI 大赛唯一获奖职能部门作品
            </motion.p>

            {/* CTA Buttons - 自动无缝接入 */}
            <motion.div
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                style={{ background: 'linear-gradient(to right, #4338CA, #6366F1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #3730A3, #4F46E5)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(55, 48, 163, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #4338CA, #6366F1)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                查看项目
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-black rounded-xl font-semibold text-black hover:bg-black hover:text-white transition-all"
              >
                联系我
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Image - 添加交互效果 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl max-w-md w-full transition-transform duration-300 hover:scale-105 cursor-pointer"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 127, 255, 0.15))' }}
            >
              <img
                src="/wendy-photo.jpg"
                alt="Wendy - AI Legal Tech Builder"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Hero;
