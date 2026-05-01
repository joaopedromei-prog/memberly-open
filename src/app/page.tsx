'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Play } from 'lucide-react';
import { course, getAllLessons } from '@/data/course';
import InstallAppButton from './components/InstallAppButton';
import Patente from '@/components/Patente';
import UpsellModal from '@/components/UpsellModal';
import { STORAGE_KEYS, safeRead } from '@/lib/progress';

const MODULE_GRADIENTS = [
  'from-[#2d1b69] to-[#1a0a3e]',
  'from-[#1b4332] to-[#0a2e1a]',
  'from-[#1a1a2e] to-[#0f3460]',
  'from-[#2e1a1a] to-[#600f1a]',
  'from-[#1a2e2e] to-[#0f4a60]',
];

export default function HomePage() {
  const [expanded, setExpanded] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const allLessons = getAllLessons();
  const firstLesson = allLessons[0];
  const totalCount = allLessons.length;

  useEffect(() => {
    const done = safeRead<string[]>(STORAGE_KEYS.completed, []);
    setCompletedCount(done.length);
  }, []);

  return (
    <div className="pb-12">
      <UpsellModal />

      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[3/2] md:aspect-[16/9] xl:aspect-[21/9] w-full overflow-hidden bg-dark-bg">
          <motion.div
            className="absolute inset-0"
            animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.03, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={course.bannerUrl}
              alt={`Banner do curso ${course.title}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-dark-bg-deep via-dark-bg-deep/60 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative z-10 -mt-24 md:-mt-36 px-4 sm:px-6 lg:px-16"
        >
          <div className="mx-auto max-w-7xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-[28px] xl:text-[40px] font-bold text-white leading-tight"
            >
              {course.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-2 mt-2"
            >
              <span className="text-[14px] text-text-muted">
                {course.modules.length} modulos · {allLessons.length} aulas
              </span>
            </motion.div>

            {course.description && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-4 max-w-2xl"
              >
                <p
                  className={`text-[14px] text-text-muted leading-relaxed whitespace-pre-line transition-all duration-200 ${
                    expanded ? '' : 'line-clamp-2'
                  }`}
                >
                  {course.description}
                </p>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-[12px] text-primary hover:text-primary-hover font-medium py-2 mt-1 inline-block"
                >
                  {expanded ? 'ver menos' : 'ver mais'}
                </button>
              </motion.div>
            )}

            {firstLesson && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/lessons/${firstLesson.id}`}
                    className="bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg px-6 h-11 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-primary/20 inline-flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    Comecar o Desafio
                  </Link>
                  <InstallAppButton />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Modules */}
      <section className="mt-10 px-4 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-[24px] font-semibold text-white">Modulos</h2>
            <Patente completedCount={completedCount} totalCount={totalCount} compact />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
          >
            {course.modules.map((mod, i) => {
              const firstModLesson = mod.lessons[0];
              const href = firstModLesson
                ? `/lessons/${firstModLesson.id}`
                : undefined;
              const gradient = MODULE_GRADIENTS[i % MODULE_GRADIENTS.length];
              const isEmpty = mod.lessons.length === 0;

              const card = (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`aspect-[5/7] rounded-xl overflow-hidden relative transition-all duration-300 ${
                    isEmpty
                      ? 'opacity-50 cursor-not-allowed'
                      : `cursor-pointer group ${!shouldReduceMotion ? 'hover:scale-105' : ''} hover:shadow-2xl hover:ring-1 hover:ring-white/15`
                  }`}
                >
                  {mod.bannerUrl ? (
                    <Image
                      src={mod.bannerUrl}
                      alt={`Banner ${mod.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 20vw"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-4 w-full z-20">
                    <h3 className="text-[18px] font-bold text-white drop-shadow-md leading-tight line-clamp-2">
                      {mod.title}
                    </h3>
                    <p className="text-[12px] text-text-muted mt-1.5">
                      {isEmpty ? 'Em breve' : `${mod.lessons.length} aulas`}
                    </p>
                  </div>
                </motion.article>
              );

              if (href) {
                return (
                  <Link key={mod.id} href={href}>
                    {card}
                  </Link>
                );
              }
              return <div key={mod.id}>{card}</div>;
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
