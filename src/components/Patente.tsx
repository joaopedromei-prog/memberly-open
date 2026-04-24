'use client';

import { Shield, ChevronsUp, Award, Star, Crown } from 'lucide-react';
import { getPatente } from '@/lib/progress';

const PATENTE_META: Record<
  string,
  { Icon: typeof Shield; color: string; bg: string }
> = {
  Recruta: {
    Icon: Shield,
    color: 'text-neutral-400',
    bg: 'bg-dark-card',
  },
  Soldado: {
    Icon: ChevronsUp,
    color: 'text-white',
    bg: 'bg-primary/70',
  },
  Cabo: {
    Icon: Award,
    color: 'text-white',
    bg: 'bg-primary',
  },
  Sargento: {
    Icon: Star,
    color: 'text-white',
    bg: 'bg-primary',
  },
  Tenente: {
    Icon: Crown,
    color: 'text-accent-success',
    bg: 'bg-accent-success/20',
  },
};

export default function Patente({
  completedCount,
  totalCount,
  compact = false,
}: {
  completedCount: number;
  totalCount: number;
  compact?: boolean;
}) {
  const patente = getPatente(completedCount, totalCount);
  const meta = PATENTE_META[patente.name] ?? PATENTE_META.Recruta;
  const Icon = meta.Icon;

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${meta.bg}`}
        title={`Patente: ${patente.name}`}
      >
        <Icon className={`h-3.5 w-3.5 ${meta.color}`} />
        <span className={`text-xs font-semibold uppercase tracking-wider ${meta.color}`}>
          {patente.name}
        </span>
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${meta.bg}`}
      >
        <Icon className={`h-5 w-5 ${meta.color}`} />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-text-muted">
          Patente
        </div>
        <div className="text-base font-bold text-white">{patente.name}</div>
      </div>
    </div>
  );
}
