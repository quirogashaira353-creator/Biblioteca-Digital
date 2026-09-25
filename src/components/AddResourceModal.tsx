import React, { useState } from 'react';
import { X, Plus, BookOpen, Link as LinkIcon, User, GraduationCap, Building } from 'lucide-react';
import { EducationalResource } from '../data/resources';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource: (resource: EducationalResource) => void;
}

export const AddResourceModal: React.FC<AddResourceModalProps> = ({
  isOpen,
  onClose,
  onAddResource,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<EducationalResource['category']>('lenguaje');
  const [gradeLevel, setGradeLevel] = useState('Secundaria');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState<EducationalResource['fileType']>('Libro Digital');
  const [publisher, setPublisher] = useState('I.E. Marco Fidel Suárez');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !url.trim() || !description.trim()) {
      setError('Por favor completa todos los campos requeridos (*)');
      return;
    }

    let validUrl = url.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = 'https://' + validUrl;
    }

    const categoryLabels: Record<EducationalResource['category'], string> = {
      lenguaje: 'Lenguaje y Literatura',
      matematicas: 'Matemáticas',
      ciencias: 'Ciencias Naturales',
      sociales: 'Ciencias Sociales',
      tecnologia: 'Tecnología e Informática',
      ingles: 'Inglés',
    };

    const newResource: EducationalResource = {
      id: 'res-custom-' + Date.now(),
      title: title.trim(),
      author: author.trim(),
      category,
      categoryLabel: categoryLabels[category],
      gradeLevel: gradeLevel.trim() || 'General',
      url: validUrl,
      description: description.trim(),
      fileType,
      publisher: publisher.trim() || 'Institucional',
      year: new Date().getFullYear().toString(),
      isFeatured: false,
    };

    onAddResource(newResource);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#102d54] via-[#173b6c] to-[#245b9b] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <Plus className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Agregar Recurso al Catálogo</h3>
              <p className="text-xs text-blue-100">Para docentes y administradores de la I.E.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Título del libro o recurso *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ej. Cien Años de Soledad, Guía de Fracciones, etc."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 pl-9 text-slate-800 focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <BookOpen className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Autor o Entidad *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Ej. Gabriel García Márquez, MEN..."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 pl-9 text-slate-800 focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <User className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Editorial / Publicador
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ej. Colombia Aprende, Santillana..."
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 pl-9 text-slate-800 focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <Building className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Área de Consulta *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EducationalResource['category'])}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-800 focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
              >
                <option value="lenguaje">Lenguaje y Literatura</option>
                <option value="matematicas">Matemáticas</option>
                <option value="ciencias">Ciencias Naturales</option>
                <option value="sociales">Ciencias Sociales</option>
                <option value="tecnologia">Tecnología e Informática</option>
                <option value="ingles">Inglés</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Formato del Recurso
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as EducationalResource['fileType'])}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-800 focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
              >
                <option value="Libro Digital">Libro Digital</option>
                <option value="Guía de Aprendizaje">Guía de Aprendizaje</option>
                <option value="Portal Web">Portal Web</option>
                <option value="PDF">Documento PDF</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Grado / Nivel
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ej. Grados 6° a 9°"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 pl-8 text-slate-800 focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <GraduationCap className="h-4 w-4 text-slate-400 absolute left-2.5 top-3" />
              </div>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Enlace Web (URL del recurso o documento) *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="https://colombiaaprende.edu.co/... o enlace de Drive/Google"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 pl-9 text-slate-800 focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100 font-mono text-[11px]"
              />
              <LinkIcon className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Puede ser un PDF en Google Drive público, una página de Colombia Aprende o cualquier portal educativo.
            </p>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Descripción o sinopsis del recurso *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe brevemente de qué trata este recurso y cómo ayuda a los estudiantes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-800 focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#173b6c] px-5 py-2 font-bold text-white hover:bg-[#245b9b] transition-colors shadow-sm"
            >
              Guardar en el Catálogo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
