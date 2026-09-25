import React from 'react';
import { ExternalLink, BookOpen, GraduationCap, Eye, Share2 } from 'lucide-react';
import { EducationalResource } from '../data/resources';

interface ResourceCardProps {
  resource: EducationalResource;
  onSelect: (resource: EducationalResource) => void;
  onShare: (resource: EducationalResource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onSelect,
  onShare,
}) => {
  const categoryStyles: Record<
    EducationalResource['category'],
    { badge: string; border: string; iconBg: string }
  > = {
    lenguaje: {
      badge: 'bg-amber-100 text-amber-900 border-amber-200',
      border: 'hover:border-amber-400',
      iconBg: 'bg-amber-50 text-amber-700',
    },
    matematicas: {
      badge: 'bg-blue-100 text-blue-900 border-blue-200',
      border: 'hover:border-blue-400',
      iconBg: 'bg-blue-50 text-blue-700',
    },
    ciencias: {
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      border: 'hover:border-emerald-400',
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
    sociales: {
      badge: 'bg-orange-100 text-orange-900 border-orange-200',
      border: 'hover:border-orange-400',
      iconBg: 'bg-orange-50 text-orange-700',
    },
    tecnologia: {
      badge: 'bg-purple-100 text-purple-900 border-purple-200',
      border: 'hover:border-purple-400',
      iconBg: 'bg-purple-50 text-purple-700',
    },
    ingles: {
      badge: 'bg-rose-100 text-rose-900 border-rose-200',
      border: 'hover:border-rose-400',
      iconBg: 'bg-rose-50 text-rose-700',
    },
  };

  const currentStyle = categoryStyles[resource.category] || {
    badge: 'bg-slate-100 text-slate-800 border-slate-200',
    border: 'hover:border-slate-400',
    iconBg: 'bg-slate-50 text-slate-700',
  };

  return (
    <article
      className={`group flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm hover:shadow-lg transition-all duration-200 ${currentStyle.border}`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${currentStyle.badge}`}
          >
            {resource.categoryLabel}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            {resource.fileType}
          </span>
        </div>

        {/* Title & Author */}
        <h3
          onClick={() => onSelect(resource)}
          className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#173b6c] transition-colors cursor-pointer line-clamp-2"
        >
          {resource.title}
        </h3>
        <p className="text-xs text-slate-600 mt-1 line-clamp-1">
          Por <strong className="font-semibold text-slate-700">{resource.author}</strong>
        </p>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
          {resource.description}
        </p>
      </div>

      {/* Footer Info & Action */}
      <div className="mt-4 pt-3.5 border-t border-slate-100">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
          <span className="inline-flex items-center gap-1 font-medium truncate max-w-[60%]">
            <GraduationCap className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{resource.gradeLevel}</span>
          </span>
          <span className="truncate max-w-[38%] text-right font-medium">
            {resource.publisher}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(resource)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-[#173b6c] hover:text-white hover:border-[#173b6c] transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Detalles</span>
          </button>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#173b6c] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#245b9b] transition-colors shadow-sm"
            title="Abrir recurso en nueva pestaña"
          >
            <span>Abrir</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            onClick={() => onShare(resource)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Compartir enlace de este recurso"
            aria-label="Compartir enlace de este recurso"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
