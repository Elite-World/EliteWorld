'use client';;
import { cn } from '@repo/domain';
import Image from 'next/image';

export default function TeamSection({
  isZh,
  isDark,
  showHiddenElements,
}: {
  isZh: boolean;
  isDark: boolean;
  showHiddenElements: boolean;
}) {
  if (!showHiddenElements) return null;

  return (
    <section id="team" className="py-24">
      <div className="container mx-auto px-4">
        <div className="animate-in fade-in duration-500">
          <h2
            className={cn(
              'text-4xl font-bold text-center mb-4 text-[#010022] dark:text-white',
            )}
          >
            {isZh ? '认识我们的教育专家' : 'Meet Our Education Experts'}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p
            className={cn(
              'text-center max-w-2xl mx-auto mb-16',
              isDark ? 'text-gray-400' : 'text-gray-600',
            )}
          >
            {isZh
              ? '我们经验丰富的顾问致力于在您教育之旅的每一步提供指导。'
              : 'Our experienced consultants are dedicated to guiding you through every step of your educational journey.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Dr. Evelyn Vance',
              role: isZh ? '学术总监' : 'Academic Director',
              image: '/images/team/evelyn-vance.png',
              speciality: isZh
                ? '战略规划与研究'
                : 'Strategic Planning & Research',
            },
            {
              name: 'James Miller',
              role: isZh ? '招生专家' : 'Admissions Specialist',
              image: '/images/team/james-miller.png',
              speciality: isZh
                ? '常春藤盟校与牛剑'
                : 'Ivy League & Oxbridge',
            },
            {
              name: 'Grace Tan',
              role: isZh ? '写作顾问' : 'Writing Consultant',
              image: '/images/team/grace-tan.png',
              speciality: isZh
                ? '个人陈述与文书'
                : 'Personal Statements & Essays',
            },
          ].map((member, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col rounded-2xl overflow-hidden transition duration-300',
                'hover:transform hover:-translate-y-1',
                isDark ? 'bg-gray-800' : 'bg-white shadow-lg',
                'h-full',
              )}>
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-t-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p
                  className={cn(
                    'text-sm mb-2 font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400',
                  )}
                >
                  {member.role}
                </p>
                <p
                  className={cn(
                    'text-sm',
                    isDark ? 'text-gray-400' : 'text-gray-500',
                  )}
                >
                  {member.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
