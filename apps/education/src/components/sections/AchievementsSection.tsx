'use client';

import { motion } from 'framer-motion';
import { cn } from '@repo/domain';

export default function AchievementsSection({ isZh, isDark }: { isZh: boolean; isDark: boolean }) {
  return (
    <section
      id="about"
      className="py-24 bg-linear-to-b from-transparent to-gray-50 dark:to-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2
            className={cn(
              'text-4xl font-bold text-center mb-16',
              'bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent',
            )}
          >
            {isZh ? '我们的全球影响力' : 'Our Global Impact'}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              number: '1000+',
              label: isZh ? '成功案例' : 'Success Stories',
              description: isZh
                ? '帮助学生进入全球顶尖学府'
                : 'Students placed in top institutions worldwide',
            },
            {
              number: '50+',
              label: isZh ? '合作大学' : 'Partner Universities',
              description: isZh
                ? '与领先院校直接建立合作关系'
                : 'Direct partnerships with leading institutions',
            },
            {
              number: '98%',
              label: isZh ? '成功率' : 'Success Rate',
              description: isZh
                ? '签证和入学申请的成功保证'
                : 'Visa and admission application success',
            },
            {
              number: '10+',
              label: isZh ? '年经验' : 'Years Experience',
              description: isZh
                ? '十余年卓越教育咨询经验'
                : 'Decade of excellence in education consulting',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                'text-center p-8 rounded-2xl transition-all duration-300 border',
                'hover:transform hover:-translate-y-1',
                isDark
                  ? 'bg-[#1A1A1A] hover:bg-[#222] border-white/5 hover:border-white/10'
                  : 'bg-white hover:bg-white border-gray-100 shadow-sm hover:shadow-xl',
              )}
            >
              <div className="text-4xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <p
                className={cn(
                  'text-sm',
                  isDark ? 'text-gray-400' : 'text-gray-600',
                )}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
