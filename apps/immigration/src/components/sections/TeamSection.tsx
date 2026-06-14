'use client';;
import { cn } from '@repo/domain';
import Image from 'next/image';
import { getHomeTeam } from '@repo/apps-config/immigration/home-config';

export default function TeamSection({
  isZh,
  isDark,
}: {
  isZh: boolean;
  isDark: boolean;
}) {
  return (
    <section id="team" className="py-24">
      <div className="container mx-auto px-4">
        <div className="animate-in fade-in duration-500">
          <h2
            className={cn(
              'text-4xl font-bold text-center mb-4 text-[#010022] dark:text-white',
            )}
          >
            {isZh ? '认识我们的移民专家' : 'Meet Our Immigration Experts'}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p
            className={cn(
              'text-center max-w-2xl mx-auto mb-16',
              isDark ? 'text-gray-400' : 'text-gray-600',
            )}
          >
            {isZh
              ? '我们经验丰富的顾问团队致力于为您家庭的全球流动性和财富保值制定量身定制的策略。'
              : "Our experienced counsel are dedicated to architecting bespoke strategies for your family's global mobility and wealth preservation."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {getHomeTeam(isZh).map((member, index) => (
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
