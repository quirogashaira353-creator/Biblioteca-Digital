import React from 'react';
import { X, ExternalLink, Share2, BookOpen, Building, GraduationCap, Calendar, Check } from 'lucide-react';
import { EducationalResource } from '../data/resources';

interface ResourceDetailModalProps {
  resource: EducationalResource | null;
  onClose: () => void;
  onShare: (resource: EducationalResource) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  onShare,
}) => {
  if (!resource) return null;

  const categoryColor: Record<EducationalResource['category'], string> = {
    lenguaje: 'bg-amber-100 text-amber-800 border-amber-300',
    matematicas: 'bg-blue-100 text-blue-800 border-blue-300',
    ciencias: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    sociales: 'bg-orange-100 text-orange-800 border-orange-300',
    tecnologia: 'bg-purple-100 text-purple-800 border-purple-300',
    ingles: 'bg-rose-100 text-rose-800 border-rose-300',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#102d54] via-[#173b6c] to-[#245b9b] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider`}>
              {resource.fileType}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg border ${categoryColor[resource.category]} mb-2`}>
              {resource.categoryLabel}
            </span>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {resource.title}
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Por <strong className="text-slate-800">{resource.author}</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
            <div className="flex items-center gap-2 text-slate-600">
              <GraduationCap className="h-4 w-4 text-[#173b6c]" />
              <span>Nivel: <strong className="text-slate-800">{resource.gradeLevel}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Building className="h-4 w-4 text-[#173b6c]" />
              <span>Editorial: <strong className="text-slate-800">{resource.publisher}</strong></span>
            </div>
            {resource.year && (
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="h-4 w-4 text-[#173b6c]" />
                <span>Año: <strong className="text-slate-800">{resource.year}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-600">
              <BookOpen className="h-4 w-4 text-[#173b6c]" />
              <span>Tipo: <strong className="text-slate-800">{resource.fileType}</strong></span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Descripción y Objetivos Pedagógicos
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {resource.description}
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 border border-blue-200/70 p-3 flex items-start gap-2.5 text-xs text-blue-900">
            <Check className="h-4 w-4 text-[#173b6c] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#173b6c]">Acceso libre y seguro</p>
              <p className="text-[11px] text-blue-800 mt-0.5">
                Este recurso educativo es de consulta libre para los estudiantes de la I.E. Marco Fidel Suárez y la comunidad general.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => onShare(resource)}
            className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <Share2 className="h-4 w-4 text-slate-600" />
            Compartir recurso
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cerrar
            </button>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#173b6c] px-4 py-2 text-xs font-bold text-white hover:bg-[#245b9b] shadow-sm transition-all"
            >
              <span>Abrir Recurso</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
