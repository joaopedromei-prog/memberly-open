'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Menu,
  Play,
  X,
} from 'lucide-react';
import {
  course,
  getAllLessons,
  getLessonById,
  getLessonNavigation,
} from '@/data/course';
import { notFound } from 'next/navigation';
import Timer from '@/components/Timer';
import Patente from '@/components/Patente';
import { STORAGE_KEYS, safeRead, safeWrite } from '@/lib/progress';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompleted(
      new Set(safeRead<string[]>(STORAGE_KEYS.completed, []))
    );
  }, []);

  const persist = (next: Set<string>) => {
    safeWrite(STORAGE_KEYS.completed, [...next]);
  };

  const toggleComplete = () => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      persist(next);
      return next;
    });
  };

  const markCompleteAndNext = () => {
    if (!completed.has(id)) {
      setCompleted((prev) => {
        const next = new Set(prev);
        next.add(id);
        persist(next);
        return next;
      });
    }
  };

  const isCompleted = completed.has(id);
  const totalLessons = getAllLessons().length;

  return (
    <div className="flex h-screen overflow-hidden bg-dark-bg text-white">
      <CourseSidebar
        currentLessonId={id}
        completed={completed}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-dark-border bg-dark-surface px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menu"
            className="p-2 text-text-muted hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="hidden lg:block">
            <span className="text-xs uppercase tracking-widest text-text-muted hover:text-white transition-colors">
              Área de Membros
            </span>
          </Link>

          <Patente completedCount={completed.size} totalCount={totalLessons} compact />
        </header>

        <main className="scrollbar-dark flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-neutral-500">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-neutral-300"
                  >
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

            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-dark-card">
              <iframe
                src={`https://www.youtube.com/embed/${lesson.videoId}?rel=0&modestbranding=1`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                title={lesson.title}
              />
            </div>

            <h1 className="mt-6 text-[28px] font-bold leading-tight text-white md:text-[32px]">
              {lesson.title}
            </h1>

            {lesson.durationMinutes && (
              <div className="mt-1 text-sm text-neutral-500">
                {lesson.durationMinutes} min
              </div>
            )}

            {lesson.description && (
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-200">
                {renderDescription(lesson.description)}
              </div>
            )}

            <div className="mt-8">
              <Timer />
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-dark-border pt-6 sm:flex-row sm:items-center">
              <button
                onClick={toggleComplete}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isCompleted
                    ? 'bg-accent-success/15 text-accent-success hover:bg-accent-success/25'
                    : 'border border-dark-border bg-dark-surface text-white hover:bg-dark-card'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Aula concluída
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Marcar como concluída
                  </>
                )}
              </button>

              {nav.next ? (
                <Link
                  href={`/lessons/${nav.next.id}`}
                  onClick={markCompleteAndNext}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:ml-auto"
                >
                  Próxima aula
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderDescription(text: string) {
  const blocks = text.trim().split(/\n\s*\n/);
  return blocks.map((block, bi) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const isList = lines.length > 0 && lines.every((l) => l.startsWith('- '));

    if (isList) {
      return (
        <ul key={bi} className="list-disc space-y-1.5 pl-5 marker:text-primary">
          {lines.map((l, i) => (
            <li key={i}>{renderInline(l.replace(/^-\s+/, ''))}</li>
          ))}
        </ul>
      );
    }

    return <p key={bi}>{renderInline(block)}</p>;
  });
}

function CourseSidebar({
  currentLessonId,
  completed,
  isOpen,
  onClose,
}: {
  currentLessonId: string;
  completed: Set<string>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const availableModules = course.modules.filter((m) => m.lessons.length > 0);
  const allLessons = getAllLessons();
  const doneCount = allLessons.filter((l) => completed.has(l.id)).length;
  const progress = allLessons.length
    ? Math.round((doneCount / allLessons.length) * 100)
    : 0;

  const content = (
    <>
      <div className="shrink-0 border-b border-dark-border p-4">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-text-muted hover:text-white transition-colors lg:hidden"
          onClick={onClose}
        >
          ← Voltar
        </Link>
        <h2 className="mt-2 text-lg font-semibold text-white lg:mt-0">
          {course.title}
        </h2>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Progresso</span>
            <span>
              {doneCount}/{allLessons.length}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-dark-card">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="scrollbar-dark flex-1 overflow-y-auto">
        {availableModules.map((mod) => (
          <ModuleSection
            key={mod.id}
            mod={mod}
            currentLessonId={currentLessonId}
            completed={completed}
            onNavigate={onClose}
          />
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-80 shrink-0 flex-col border-r border-dark-border bg-dark-surface lg:flex">
        {content}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-80 max-w-[85vw] flex-col border-r border-dark-border bg-dark-surface transition-transform duration-200 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="absolute right-2 top-2 rounded p-2 text-text-muted hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          {content}
        </aside>
      </div>
    </>
  );
}

function ModuleSection({
  mod,
  currentLessonId,
  completed,
  onNavigate,
}: {
  mod: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      durationMinutes: number | null;
    }[];
  };
  currentLessonId: string;
  completed: Set<string>;
  onNavigate: () => void;
}) {
  const containsCurrent = mod.lessons.some((l) => l.id === currentLessonId);
  const [open, setOpen] = useState(containsCurrent);
  const doneInMod = mod.lessons.filter((l) => completed.has(l.id)).length;

  return (
    <div className="border-b border-dark-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-dark-card/40 transition-colors"
      >
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">
            {mod.title}
          </div>
          <div className="mt-0.5 text-xs text-text-muted">
            {doneInMod}/{mod.lessons.length} aulas
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          {mod.lessons.map((lesson, index) => {
            const isCurrent = lesson.id === currentLessonId;
            const isDone = completed.has(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                onClick={onNavigate}
                aria-current={isCurrent ? 'page' : undefined}
                className={`relative flex min-h-[44px] items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isCurrent
                    ? 'bg-dark-card text-white'
                    : 'text-neutral-400 hover:bg-dark-card/40 hover:text-neutral-200'
                }`}
              >
                {isCurrent && (
                  <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary" />
                )}
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-accent-success" />
                  ) : isCurrent ? (
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
                    {lesson.durationMinutes}m
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
