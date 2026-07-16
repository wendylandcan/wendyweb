import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import ProjectModal from './ProjectModal';
import AnimatedSection from './AnimatedSection';

// 数字滚动动画组件 - 数字会动画递增；非数字内容直接以徽章风格静态展示
const AnimatedNumber = ({ value }: { value: string }) => {
  const isNumeric = /^\d+\.?\d*%?$/.test(value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isNumeric) return;
    if (isInView) {
      const numericValue = parseInt(value.replace('%', ''));
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, value, isNumeric]);

  useEffect(() => {
    if (!isNumeric) return;
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest) + (value.includes('%') ? '%' : ''));
    });
    return unsubscribe;
  }, [springValue, value, isNumeric]);

  if (!isNumeric) {
    // 非数字内容：以醒目的徽章文字风格静态展示
    return (
      <span ref={ref} className="text-3xl font-bold leading-tight inline-block" style={{ color: '#3730A3' }}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className="text-5xl font-bold" style={{ color: '#3730A3' }}>
      {displayValue}
    </span>
  );
};

const projects = [
  {
    id: 'jobpilot',
    category: '法律垂类 AI',
    title: '职引 Pilot',
    description: '劳动者 / 用工单位 / 律师三端通用的「全主体 · 全场景 · 可溯源」劳动法 AI 咨询系统',
    impact: '🏆 iCourt 第二届全国法律人 AI 应用大赛 律所赛道 二等奖（173 支律所队伍中前三名）｜ 410 支队伍、26w+ 观看人次，阿里云/百度智能云/火山引擎联合主办 ｜ 覆盖 24 个劳动法争议场景，让法律服务从「少数律师的效率工具」升级为「大多数人的可及性基础设施」',
    tech: ['三段式 Agent 自主编排', '北大法宝实时法条溯源', '323 城规则计算器'],
    gradient: 'from-blue-600 to-blue-700',
    featured: true,
    metric: '二等奖',
    metricLabel: 'iCourt 全国法律人 AI 大赛（律所赛道，173 进 3）',
    links: [
      { label: '查看演示 PPT', url: '/jobpilot-ppt.pdf', color: '#5A56E0' },
      { label: '观看演示视频 (B站)', url: 'https://www.bilibili.com/video/BV1e3L164Ed8/', color: '#5A56E0' },
    ],
    details: {
      problem: [
        '劳动法咨询的真实体量远超想象：据人社部统计，2024 年全国劳动人事争议调解 + 仲裁机构共办理案件 425.7 万件、涉及劳动者 454.9 万人 —— 而这只是"冰山一角"。全国 7.34 亿就业人员，按每人每年仅 5 次相关问询估算，一年就是 36.7 亿次咨询需求，其中进入诉讼的仅 0.12%，绝大多数问题止步于咨询、从未进入法律程序。',
        '三类用户都被同一套传统工具卡住了：劳动者不知道自己有什么权利，情绪化表达、事实陈述碎片化；用工单位合规意识薄弱，等纠纷爆发才找律师、成本倍增；律师则被"追问客户事实 / 计算赔偿 / 检索法条"等高频重复劳动持续消耗。',
        '现有劳动法 AI 工具几乎只面向"供给侧"：传统检索能找到法条但"不会追问"，通用大模型在未获得完整背景信息时就急于作答、编造不存在的法条、给出看似专业实则误导的建议；而市面上为数不多的垂类工具，本质仍是"帮专业人士更快写文书、更准算赔偿金" —— 是少数律师的效率工具，而非大多数人的法律可及性方案。',
      ],
      solution: [
        '三种困境，三套对策：劳动者不会整理事实 → 系统主动追问补全；用工单位不知合规边界 → 系统扫描风险并量化违法成本；律师被重复劳动消耗 → 系统完成检索、计算与初步分析，把律师精力留给真正需要专业判断的环节。',
        '三段式 Agent 自主编排，每一步用户都看得见：① ControllerAgent 识别用户身份、匹配 24 个争议场景之一、评估信息完整度（C0–C4），信息不足时先追问而非强行交付，达到置信阈值才通过 handoff 移交；② ScenarioAgent 配套场景专属 Prompt 模板与角色变体，平均 3–5 轮追问后整理出结构化案情摘要；③ LegalAnalysisAgent 在前两步确认的基础上，通过最多 8 轮工具调用循环，按需调用法条检索 / 案例检索 / 规则计算器 / RAG 知识库，最终输出带置信度、风险定级与完整溯源的法律报告。',
        '"三端同服务，三套响应逻辑" — 与所有竞品的核心差异：同一个"违法解除"问题，劳动者侧得到「安抚情绪 → 梳理事实 → 计算赔偿金 → 维权路径 → 证据保全提示」；用工单位侧得到「合规风险评估 → 成本测算 → 替代方案 → 程序合法性 Checklist」；律师侧得到「争议焦点提炼 → 法条检索 → 类案推送 → 证据链分析 → 策略灵感」—— 是三种完全不同的分析框架，而非换了称呼的同一份回答。',
        '推理过程全程透明 + 多模态输入：每次 Agent 控制权移交（handoff）以横幅 + 进度指示器（controller → scenario → legal → done）实时展示，每次法条检索均以工具结果卡片呈现并附原文与出处链接；支持 PDF / DOCX / 图片 / Excel / 语音多模态输入，附件元数据纳入 Agent 上下文，完整分析结果一键导出 Word —— 用户不是在看黑箱吐出结论，而是在看一个可验证的推理过程。',
      ],
      tech: [
        '多 Agent 自主编排核心架构：ControllerAgent + ScenarioAgent + LegalAnalysisAgent 三段式接力，所有控制权移交（handoff）作为一等事件输出并在前端实时可视化 —— 这在法律 AI 领域不是加分项、是刚需：法律结论必须可验证。',
        '6 类纯规则计算器（LLM 零参与）：经济补偿金、加班费、未签合同双倍工资、年休假折算、违法解除赔偿等场景全部由确定性规则引擎完成，杜绝"算错"风险；内置全国 289 个设区市 + 30 个自治州 + 4 个不设区地级市（共 323 城）最新社平工资数据，自动匹配封顶逻辑与地区特殊规定，结果同步展示明细清单与对应法律依据。',
        'MCP 协议 + RAG 知识库双重底座：通过 MCP 协议接入北大法宝法条与案例库，所有法律依据来自实时检索而非模型生成；RAG 知识库收录红圈所劳动法专业文章，支持语义检索与策略灵感提取。',
        '三层风险管理护栏：① 法条幻觉防控 —— 引用强制来自北大法宝实时检索、未命中则明确告知"未检索到相关法条"、绝不编造；② 数据安全 —— 用户对话数据不上传公共训练服务器、会话隔离、支持本地部署以满足律所合规要求；③ 风险衔接 —— 所有输出标注"AI 辅助分析，不构成法律意见"，劳动者端附法律援助渠道指引。',
        'Vibe Coding 全流程开发：整套系统（FastAPI 后端 + React/Vite 前端 + 77 项自动化测试）在 Alpha GPT + Claude Code + Codex 辅助下完成需求拆解、代码生成、测试与调试，本身就是"AI 赋能法律人 × AI 赋能开发者"的双向落地范式。',
      ],
      impact: [
        '🏆 iCourt 第二届全国法律人 AI 应用大赛 律所赛道 二等奖：经专业评委评审，从 410 支参赛队伍（律所赛道 173 支队伍）中脱颖而出，荣获律所赛道二等奖（前三名）。大赛由 iCourt 法律 AI 研究院联合中国人民大学、中国政法大学、华东政法大学、阿里云、百度智能云、火山引擎共同主办，70 余家律所/企业/高校联名协办，全网直播观看人次超 26 万。作品由北京德恒律师事务所「被告五人队」完成，由"法律 + 产品 + 技术 + 合规"五种能力深度融合 —— 我（曹嘉璇）在团队中负责产品设计与项目展示，将复杂咨询抽象为 24 个标准业务场景、设计三端产品形态并主导路演。',
        '可迁移的通用法律 AI 框架 —— 推广价值远超劳动法本身：「多 Agent 追问补全 + MCP 实时检索 + 规则计算器」与劳动法业务逻辑解耦：替换知识库即可适配婚姻家事 / 民间借贷 / 物业纠纷等高频法律场景；替换计算器即可适配房产税费 / 交通事故 / 工伤赔偿等需要精确计算的领域；替换 MCP 数据源即可适配企业合规 / 知识产权等垂直数据库。一套架构验证成功，意味着整个高频民事法律服务领域有了可参照的 AI 基础设施模板。',
        '实际运行效果：Scenario Agent 平均 3–5 轮追问即可完成事实补全 —— 简单场景（如未签合同双倍工资）约 3 轮覆盖入职时间、签约时间等核心要素，复杂场景（如工伤叠加违法解除）5 轮以上逐步确认劳动关系、伤残等级、社保缴纳等多维事实；Legal Agent 单次分析平均触发 4–8 次工具调用，最终输出平均引用 5–10 条可溯源法条 + 2–4 个真实案例。',
        '商业化路径已成型：阶段一（0–6 月）律所内部部署、收集真实咨询数据持续迭代；阶段二（6–12 月）面向中小律所与 HR 服务机构提供 SaaS 订阅，向法律科技平台开放 API；阶段三（12 月+）定位"劳动法 AI 基础设施"，深化北大法宝 / 威科先行等 MCP 合作，与法援中心、工会公益版合作，向 iCourt 生态贡献劳动法 Agent 框架组件。',
        '核心价值定位：职引 Pilot 解决的不是「少数律师的效率问题」，而是「大多数人的法律可及性问题」—— 这个问题的规模与社会价值，决定了它的推广基础远超任何仅服务律师的工具。',
      ],
    },
  },
  {
    id: 'dingdangmiao',
    category: '企业级提效',
    title: '叮当喵',
    description: 'AI Legal Bot - 效率提升 600%',
    impact: '将法律文书审核从 2 小时缩短至 20 分钟',
    tech: ['Dify 工作流', '逻辑检验算法', 'RAG 检索增强'],
    gradient: 'from-blue-500 to-blue-600',
    featured: false,
    links: [
      { label: '查看项目详情', url: '/dingdangmiao.pdf', color: '#5A56E0' },
      { label: '观看演示视频 (B站)', url: 'https://www.bilibili.com/video/BV1GLL169Eka/', color: '#5A56E0' },
    ],
    silhouetteImage: '/liqingai-silhouette.png',
  },
  {
    id: 'liqingai',
    category: '高复杂度 AI',
    title: '理清爱',
    description: '引入具备"程序正义"的 AI 法官，构建异地情侣双端实时同步的专属模拟法庭',
    impact: '双端状态同步延迟达毫秒级，通过模型分发调度与哈希缓存优化，API 成本降低 60%+',
    tech: ['双端并发控制与状态锁', '大小模型双轨制分发', '基于哈希校验的智能缓存'],
    gradient: 'from-blue-600 to-blue-700',
    featured: false,
    link: 'https://liqingai.zeabur.app/',
    metric: '60%',
    metricLabel: 'API 成本降低',
    silhouetteImage: '/liqingai-heart-gavel.png',
    slogan: '清官爱断家务事，AI专理意难平。',
    details: {
      problem: [
        '通用 AI 判官极易"倒戈"：伴侣尝试用通用对话 AI 评理时，AI 往往缺乏严谨的程序正义，"谁先发言就偏向谁"，无法提供公平的举证质证环节，难以服众。',
        '沟通极易情绪化且缺乏语境：双方各执一词，极易陷入无效的"翻旧账"。传统的聊天记录截屏或单方面诉苦无法降解冲突，急需一个中立且带有"情绪缓冲"作用的裁判。',
        '异地或冷战状态难以沟通：处于异地恋或冷战期的伴侣，很难面对面坐下来理智梳理矛盾，导致问题无限期搁置。',
      ],
      solution: [
        '首创"拟真诉讼流程"与远程联机：深度参考真实法庭程序，打破物理空间限制，支持双方异地远程接入。将枯燥的吵架转化为结构化的【双方陈述 ➡️ 多模态举证 ➡️ 交叉质证 ➡️ 自由辩论 ➡️ AI 判决】的完整闭环，确保程序绝对公平。',
        '原生多模态证据解析 (Multimodal Vision/Audio)：允许原被告直接上传微信聊天截图、转账记录甚至是"电话录音"，AI 能够自动听懂语音情绪、提取图片关键信息，并与双方口供进行客观比对。',
        '灵活的"缺席判决"机制：充分考虑真实产品场景，若一方（被告）因冷战或异地无法实时出庭，原告单方仍可提交观点与证据，AI 将基于已知线索独立完成客观的"缺席审理"。',
        '差异化 AI 法官与"破冰"判决：提供具有不同倾向性的人设（如注重逻辑的"严肃狗狗"、擅长共情的"傲娇猫咪"）。最终生成的专属情感判决书不仅定分止争，还内置了定制化的"情感回温小游戏"或趣味惩罚，帮助关系真正破冰。',
      ],
      tech: [
        '基础技术栈：React + TypeScript + Tailwind CSS (前端) / Node.js (后端) / Supabase (实时数据库) / Google Gemini 3.1 家族原生多模态 API。',
        '双端并发控制与状态锁 (State Lock)：针对多人联机场景，基于 Supabase Realtime 订阅机制实现了"抢锁与结果共享"。单端触发判决后立即冻结全局 UI 并广播状态，彻底解决了多端并发导致的"API 重复调用"与"状态撕裂"死锁问题。',
        '大小模型双轨制分发 (Model Cascading)：自研智能路由中间件。将极其复杂的"证据质证/判决生成"强制路由至高智商大模型（Gemini Pro/Flash）；将"摘要/标题生成"等轻量任务平滑降级至微型模型（Flash-Lite），在保障逻辑严密性的同时，将服务器算力成本压至极致。',
        '全链路流式渲染 (SSE Streaming)：摒弃传统的阻塞等待请求，采用原生 Fetch 配合 ReadableStream 实现毫秒级响应的"打字机"逐字渲染。通过严谨的 CSS 预设高度，彻底解决了长文本流式输出时的 DOM 重绘抖动 (Jitter) 痛点。',
        '基于哈希校验的智能缓存 (Smart Caching)：将案情参数与多模态文件特征序列化为专属 Hash 指纹（verdict_hash）。在用户频繁点击重审时，通过精准的缓存命中拦截大模型请求，配合 800ms 骨架屏动画，实现了 0 API 消耗的秒级结果回放。',
      ],
      impact: [
        '成功落地了一款低延迟、高可用的全栈联机应用，双端状态同步延迟达到毫秒级，有效支持异地情侣的低延迟互动。',
        '通过严密的 try...catch 隔离与优雅降级（Graceful Degradation）策略，边缘任务即使遇到网络超时报错，也绝对不阻塞核心主流程，实现了前端应用的高鲁棒性防崩溃。',
        '依靠模型分发调度与哈希指纹缓存机制，将单次复杂案件的 API 请求成本整体降低了 60% 以上。',
      ],
    },
  },
  {
    id: 'interactive-engine',
    category: '沉浸式互动',
    title: '守护甜心 & 宝可梦高精度性格测试',
    description: '智能换肤 + 激活码防盗',
    impact: '根据测试结果自动切换主题配色，激活码绑定设备防止盗用。内测码：888888',
    tech: ['动态主题引擎', 'bound_device_id', 'SQL 事务控制'],
    gradient: 'from-blue-400 to-blue-500',
    featured: false,
    links: [
      { label: '宝可梦性格测试 Demo', url: 'https://pokemontest.zeabur.app', color: '#5A56E0' },
      { label: '守护甜心性格测试 Demo', url: 'https://sweethearttest.zeabur.app', color: '#5A56E0' },
    ],
    silhouetteImage: '/pokemon-pikachu.png',
    details: {
      problem: [
        '商业流失：优质题库缺乏准入控制，极易被爬取或无限制白嫖。',
        '交互单调：纯静态页面缺乏即时反馈，用户难以进入深度测试状态，导致结果偏差。',
        '分享受限：移动端（尤其是 iOS）无法方便地截取长图，严重阻碍了社交媒体的二次传播。',
      ],
      solution: [
        '"卡密"准入体系：独创激活码核销与设备唯一性绑定逻辑，确保商业资源的安全分发。',
        '多维沉浸体验：引入舒缓 BGM 与按键音效反馈，配合"高压题+普通题"交替的科学逻辑，显著提升测试精度与用户心流。',
        '一键视觉生成：UI 随结果动态变色（如阿夜紫、奇迹金），并支持"结果直接保存为图片"，完美解决移动端截屏痛点。',
      ],
      tech: [
        '前端堆栈：基于 React 框架，利用 Web Audio API 优化视听体验，并集成 html2canvas 实现结果图本地无损导出。',
        '后端驱动：采用 Supabase 进行毫秒级卡密核销，通过 SQL 事务（Transaction）确保高并发下的数据原子性。',
        '工程化部署：基于 Zeabur 的 CI/CD 流程，并针对移动端执行了严格的字体压缩与 WebP 图像适配。',
        '体验提示：访问 Demo 时可输入内测码 888888 进行体验。',
      ],
      impact: [
        '商业全自动化：成功对接阿奇索等发货平台，实现"下单-领码-核销-绑定"的全流程无人值守。',
        '高参与与留存：通过"入学考号"系统与沉浸式交互，用户完赛率与口碑反馈远超同类竞品。',
        '零冗余架构：极简的 SQL 脚本支持卡密池快速迭代，适应多种灵活的商业运营场景。',
      ],
    },
  },
];

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <AnimatedSection
      id="projects"
      className="min-h-screen py-20 px-6 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4"
          >
            核心项目
          </h2>
          <p className="text-center text-slate-600 mb-16 text-lg">
            三维矩阵：AI × 法律 × 技术
          </p>

          {/* Featured Project - Full Width */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12"
            aria-label={`特色项目: ${projects[0].title}`}
          >
            <div
              className="bg-white rounded-3xl overflow-hidden transition-all duration-400 relative group neumorphic-card active:scale-[0.98] outline-none"
              style={{
                borderLeft: '6px solid #3730A3'
              }}
              tabIndex={0}
              role="article"
              onMouseEnter={() => setHoveredProjectId(projects[0].id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              {/* Hover 剪影背景层 - 心形法槌 */}
              <div
                className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundColor: '#3730A3',
                  maskImage: `url('${projects[0].silhouetteImage}')`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url('${projects[0].silhouetteImage}')`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  opacity: hoveredProjectId === projects[0].id ? 0.15 : 0,
                }}
              />

              <div className="p-8 md:p-10 relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 text-sm font-semibold rounded-full" style={{ backgroundColor: 'rgba(55, 48, 163, 0.08)', color: '#3730A3' }}>
                        ⭐ 主打案例
                      </span>
                      <span className="text-sm font-semibold" style={{ color: '#3730A3' }}>
                        {projects[0].category}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      {projects[0].title}
                    </h3>
                    <p className="text-xl text-slate-800 mb-3 font-semibold">
                      {projects[0].description}
                    </p>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {projects[0].impact}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {projects[0].tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-900 border border-blue-100"
                          style={{ color: '#4338CA' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-48 flex items-center justify-center">
                    <div className="text-center p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(55, 48, 163, 0.06), rgba(55, 48, 163, 0.12))' }}>
                      <div className="mb-2">
                        <AnimatedNumber value={projects[0].metric!} />
                      </div>
                      <div className="text-sm text-slate-700 font-medium">{projects[0].metricLabel}</div>
                    </div>
                  </div>
                </div>
                {(projects[0].link || projects[0].links || projects[0].details) && (
                  <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                    {/* 单链接模式 */}
                    {projects[0].link && !projects[0].links && (
                      <motion.a
                        href={projects[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300"
                        style={{ background: 'linear-gradient(to right, #4338CA, #6366F1)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to right, #3730A3, #4F46E5)';
                          e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to right, #4338CA, #6366F1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        aria-label={`查看 ${projects[0].title} 在线演示`}
                      >
                        <span>查看在线 Demo</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.a>
                    )}
                    {/* 多链接模式 */}
                    {projects[0].links && projects[0].links.map((linkItem) => (
                      <motion.a
                        key={linkItem.url}
                        href={linkItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300"
                        style={{ background: 'linear-gradient(to right, #4338CA, #6366F1)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to right, #3730A3, #4F46E5)';
                          e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to right, #4338CA, #6366F1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        aria-label={`查看 ${linkItem.label}`}
                      >
                        <span>{linkItem.label}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </motion.a>
                    ))}
                    {/* 项目详情按钮 */}
                    {projects[0].details && (
                      <motion.button
                        onClick={() => openModal(projects[0])}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-black rounded-lg font-medium bg-transparent text-black transition-colors duration-300 hover:bg-black hover:text-white"
                        aria-label={`查看 ${projects[0].title} 项目详情`}
                      >
                        <span>项目详情</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.article>

          {/* Secondary Projects - Responsive Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(1).map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: (index + 1) * 0.15 }}
                className="h-full"
                aria-label={`项目: ${project.title}`}
              >
                <div
                  className="bg-white rounded-2xl overflow-hidden transition-all duration-400 h-full flex flex-col neumorphic-card relative group active:scale-[0.98] outline-none"
                  tabIndex={0}
                  role="article"
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  {/* Hover 剪影背景层 */}
                  {project.silhouetteImage && (
                    <div
                      className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none"
                      style={{
                        backgroundColor: '#3730A3',
                        maskImage: `url('${project.silhouetteImage}')`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: `url('${project.silhouetteImage}')`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        opacity: hoveredProjectId === project.id ? 0.15 : 0,
                      }}
                    />
                  )}
                  <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                    <div className="text-sm font-semibold mb-2" style={{ color: '#3730A3' }}>
                      {project.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-slate-800 mb-3 font-semibold">
                      {project.description}
                    </p>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                      {project.impact}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-900 border border-blue-100"
                          style={{ color: '#4338CA' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Single Link */}
                    {project.link && !project.links && (
                      <div className="flex flex-col gap-2 mt-auto">
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg transition-all duration-300"
                          style={{ background: 'linear-gradient(to right, #4338CA, #6366F1)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(to right, #3730A3, #4F46E5)';
                            e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(to right, #4338CA, #6366F1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                          aria-label={`查看 ${project.title} 详情`}
                        >
                          <span>查看在线 Demo</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.a>
                        {project.details && (
                          <motion.button
                            onClick={() => openModal(project)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-black rounded-lg font-medium bg-transparent text-black transition-colors duration-300 hover:bg-black hover:text-white"
                            aria-label={`查看 ${project.title} 项目详情`}
                          >
                            <span>项目详情</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </motion.button>
                        )}
                      </div>
                    )}
                    {/* Only Details (no external link) */}
                    {!project.link && !project.links && project.details && (
                      <motion.button
                        onClick={() => openModal(project)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg transition-all duration-300 mt-auto"
                        style={{ background: 'linear-gradient(to right, #4338CA, #6366F1)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to right, #3730A3, #4F46E5)';
                          e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to right, #4338CA, #6366F1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        aria-label={`查看 ${project.title} 项目详情`}
                      >
                        <span>项目详情</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.button>
                    )}
                    {/* Multiple Links */}
                    {project.links && (
                      <div className="flex flex-col gap-2 mt-auto">
                        {project.links.map((linkItem) => (
                          <motion.a
                            key={linkItem.url}
                            href={linkItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-lg transition-all duration-300"
                            style={{ background: 'linear-gradient(to right, #5A56E0, #6366F1)', color: 'white' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(to right, #4F46E5, #7C3AED)';
                              e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(to right, #5A56E0, #6366F1)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            aria-label={`查看 ${linkItem.label}`}
                          >
                            <span>{linkItem.label}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.a>
                        ))}
                        {project.details && (
                          <motion.button
                            onClick={() => openModal(project)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-black rounded-lg font-medium bg-transparent text-black transition-colors duration-300 hover:bg-black hover:text-white"
                            aria-label={`查看 ${project.title} 项目详情`}
                          >
                            <span>项目详情</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject?.details && (
        <ProjectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedProject.title}
          content={selectedProject.details}
        />
      )}
    </AnimatedSection>
  );
};

export default Projects;
