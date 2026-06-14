'use client';;
import { Zap } from 'lucide-react';
import Image from 'next/image';
import { getHomeTeam } from '@repo/apps-config/landing/home-config';

export default function TeamSection({ isZh }: { isZh: boolean }) {
  return (
    <section id="team" className="py-32 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 animate-in fade-in duration-500">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {isZh ? '顾问团队' : 'Consultancy Faculty'}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
              {isZh ? '认识我们的专业' : 'Meet our expert'} <br />{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '策略师' : 'Strategists'}
              </span>
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium max-w-xs leading-relaxed">
            {isZh
              ? '我们经验丰富的顾问致力于为您全球过渡的每个阶段进行架构。'
              : 'Our seasoned consultants are dedicated to architecting every phase of your global transition.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {getHomeTeam(isZh).map((member, index) => (
            <div
              key={index}
              className="group relative rounded-[2.5rem] overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 transition duration-500 animate-in fade-in">
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                    {member.role}
                  </p>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[8px] font-black text-white/50 uppercase tracking-widest">
                    <Zap className="w-3 h-3 text-blue-600" />
                    {member.speciality}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
