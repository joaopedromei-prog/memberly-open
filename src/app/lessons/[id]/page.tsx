'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Circle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { getLessonById, getLessonNavigation, course } from '@/data/course';
import { notFound } from 'next/navigation';

export default function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const lesson = getLessonById(id);

  if (!lesson) {
    notFound();
  }

  const nav = getLessonNavigation(id);
  const currentModule = course.modules.find((m) => m.id === lesson.moduleId);
  const moduleLessons = currentModule?.lessons ?? [];

  return (
    <div className="mx-auto max-w-7xl bg-dark-bg py-4 lg:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column: video + info + navigation */}
        <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-dark-card">
              <iframe
                src={`https://www.youtube.com/embed/${lesson.videoId}?rel=0&modestbranding=1`}
                className="absolute inset-0 h-full w-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                title={lesson.title}
              />
            </div>
          </motion.div>

          <div className="px-4 pb-8 sm:px-6 lg:px-0">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mt-6 mb-4">
              <ol className="flex items-center gap-1 text-xs text-neutral-500">
                <li className="flex items-center gap-1">
                  <Link href="/" className="hover:text-neutral-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-neutral-400">{lesson.moduleName}</span>
                </li>
                <li className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-neutral-300">{lesson.title}</span>
                </li>
              </ol>
            </nav>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[32px] font-bold leading-tight text-white"
            >
              {lesson.title}
            </motion.h1>

            {lesson.durationMinutes && (
              <div className="mt-1 text-sm text-neutral-500">
                {lesson.durationMinutes} min
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex flex-col gap-4 border-t border-dark-card pt-6 sm:flex-row sm:justify-between">
              {nav.prev ? (
                <Link
                  href={`/lessons/${nav.prev.id}`}
                  className="group flex w-full flex-col items-start rounded-lg px-4 py-3 transition-colors hover:bg-dark-surface sm:w-auto"
                >
                  <span className="flex items-center gap-2 text-sm text-neutral-400 group-hover:text-white transition-colors">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Aula Anterior
                  </span>
                  <span className="mt-1 text-xs text-neutral-600">
                    {nav.prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nav.next ? (
                <Link
                  href={`/lessons/${nav.next.id}`}
                  className="group flex w-full flex-col items-end rounded-lg px-4 py-3 text-right transition-colors hover:bg-dark-surface sm:w-auto"
                >
                  <span className="flex items-center gap-2 text-sm text-neutral-400 group-hover:text-white transition-colors">
                    Proxima Aula
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-1 text-xs text-neutral-600">
                    {nav.next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>

        {/* Right column: sidebar */}
        <div className="w-full shrink-0 px-4 pb-8 sm:px-6 lg:w-[30%] lg:px-0">
          <div className="lg:sticky lg:top-[80px] lg:max-h-[calc(100vh-100px)]">
            <Sidebar
              moduleName={lesson.moduleName}
              lessons={moduleLessons}
              currentLessonId={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  moduleName,
  lessons,
  currentLessonId,
}: {
  moduleName: string;
  lessons: { id: string; title: string; durationMinutes: number | null }[];
  currentLessonId: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const listContent = (
    <div className="py-2">
      {lessons.map((lesson, index) => {
        const isCurrent = lesson.id === currentLessonId;
        return (
          <Link
            key={lesson.id}
            href={`/lessons/${lesson.id}`}
            aria-current={isCurrent ? 'page' : undefined}
            className={`relative flex min-h-[44px] items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
              isCurrent
                ? 'bg-dark-card text-white'
                : 'text-neutral-400 hover:bg-dark-surface hover:text-neutral-200'
            }`}
          >
            {isCurrent && (
              <motion.div
                layoutId="activeLesson"
                className="absolute bottom-0 left-0 top-0 w-[2px] bg-primary"
              />
            )}
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
              {isCurrent ? (
                <Play className="h-4 w-4 fill-primary text-primary" />
              ) : (
                <Circle className="h-4 w-4 text-neutral-600" />
              )}
            </span>
            <span className="flex-1 truncate">
              <span className={isCurrent ? 'text-white' : 'text-neutral-500'}>
                {index + 1}.
              </span>{' '}
              {lesson.title}
            </span>
            {lesson.durationMinutes && (
              <span className="flex-shrink-0 text-xs text-neutral-500">
                {lesson.durationMinutes} min
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <motion.nav
        aria-label="Aulas do modulo"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="hidden flex-col rounded-lg bg-dark-surface lg:flex"
      >
        <div className="shrink-0 border-b border-dark-border p-4">
          <h3 className="text-lg font-semibold text-white">{moduleName}</h3>
          <div className="mt-1 text-xs text-neutral-400">
            {lessons.length} aulas
          </div>
        </div>
        <div className="scrollbar-dark overflow-y-auto">{listContent}</div>
      </motion.nav>

      {/* Mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full min-h-[44px] items-center justify-between rounded-lg bg-dark-surface px-4 py-3 text-sm text-white"
          aria-expanded={mobileOpen}
        >
          <span>Aulas deste modulo ({lessons.length})</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              mobileOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-200 ${
            mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <nav className="rounded-b-lg bg-dark-surface">{listContent}</nav>
          </div>
        </div>
      </div>
    </>
  );
}
