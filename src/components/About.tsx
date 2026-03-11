import { motion } from 'framer-motion';
import { GraduationCap, Scale, Award, Rocket } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: '教育背景',
      content: '上海交通大学法学硕士（2026届）',
    },
    {
      icon: Scale,
      title: '专业资质',
      content: '法律职业资格A证',
    },
    {
      icon: Award,
      title: 'Intel 实习',
      content: 'Impact Reward 获得者',
    },
    {
      icon: Rocket,
      title: '莉莉丝游戏',
      content: 'AI 大赛唯一获奖职能部门作品',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatedSection id="about" className="min-h-screen py-20 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
            关于我
          </h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/60 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent size={40} color="#3730A3" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.content}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-2xl shadow-lg"
          >
            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-900 to-indigo-600 bg-clip-text text-transparent mb-8">
              以法律之逻辑，赋 AI 以温情。
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              作为一名行走在法律与技术边缘的跨界实践者，我始终在思考：如何用逻辑的力量解决真实世界的痛点。
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              从 Intel 的 Legal Bot 企业级合规提效，到莉莉丝游戏公司用订单喵项目斩获大奖的 AI 创新，我见证了算法从"冷冰冰的数字"进化为"有温度的助手"。这种对"重塑"的热爱贯穿始终：在《理清爱》中，我将严密的法庭质证框架引入情感调解，用 AI 裁判化解无效情绪，证明了法律逻辑亦能成为治愈的良方；而在《守护甜心 & 宝可梦性格测试》的高精度交互中，我通过自研的动态主题测试网站将儿时热爱具象化，赋予了技术跨越次元的生命力。
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              我不只在构建应用，更在构建一种链接，发挥 AI 的真实价值与无限潜力。未来已来，我愿作为那个守护逻辑、也传递温度的 Builder，让 AI 真正回归服务于人的本质。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default About;
