import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Share2, 
  QrCode, 
  Globe, 
  Smartphone, 
  ExternalLink, 
  Plus, 
  Layers, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X,
  Compass,
  Laptop,
  Check,
  RotateCcw
} from 'lucide-react';
import { EducationalResource, INITIAL_RESOURCES, CATEGORIES_CONFIG } from './data/resources';
import { ResourceCard } from './components/ResourceCard';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { ShareModal } from './components/ShareModal';
import { AddResourceModal } from './components/AddResourceModal';

export default function App() {
  // Resources state with localStorage persistence
  const [resources, setResources] = useState<EducationalResource[]>(() => {
    try {
      const saved = localStorage.getItem('mf_suarez_resources_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_RESOURCES;
  });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFileType, setSelectedFileType] = useState<string>('all');

  // Modal states
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedUrlBanner, setCopiedUrlBanner] = useState(false);

  // App public URL determination
  const publicAppUrl = useMemo(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      // If running inside standard origin or preview
      return window.location.origin;
    }
    return 'https://ais-pre-lgzoztfww7aqfg5mb6ekqa-262585239986.us-east1.run.app';
  }, []);

  // Save to localStorage when resources change
  useEffect(() => {
    try {
      localStorage.setItem('mf_suarez_resources_v1', JSON.stringify(resources));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [resources]);

  // Filtered resources
  const filteredResources = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return resources.filter((res) => {
      const matchesText =
        !query ||
        res.title.toLowerCase().includes(query) ||
        res.author.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.publisher.toLowerCase().includes(query);

      const matchesCat = selectedCategory === 'all' || res.category === selectedCategory;
      const matchesType = selectedFileType === 'all' || res.fileType === selectedFileType;

      return matchesText && matchesCat && matchesType;
    });
  }, [resources, searchTerm, selectedCategory, selectedFileType]);

  const handleAddResource = (newRes: EducationalResource) => {
    setResources((prev) => [newRes, ...prev]);
  };

  const handleResetCatalog = () => {
    if (window.confirm('¿Deseas restaurar el catálogo predeterminado de la institución?')) {
      setResources(INITIAL_RESOURCES);
      localStorage.removeItem('mf_suarez_resources_v1');
    }
  };

  const handleCopyPublicUrl = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(publicAppUrl);
      } else {
        const input = document.createElement('input');
        input.value = publicAppUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopiedUrlBanner(true);
      setTimeout(() => setCopiedUrlBanner(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fb] text-slate-800">
      {/* Institutional Topbar */}
      <aside aria-label="Información institucional y acceso público" className="bg-[#102d54] text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide">
              I.E. Marco Fidel Suárez · Gualanday, Coello, Tolima
            </span>
          </div>
          <div className="flex items-center gap-3 text-blue-200 text-[11px]">
            <span className="hidden sm:inline">Carácter Oficial y Gratuito</span>
            <span>•</span>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-amber-300 font-bold hover:underline"
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>Ver QR para celular</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Public URL Live Announcement Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-amber-500/10 border-b border-amber-200/60 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Globe className="h-4 w-4 text-[#173b6c] shrink-0" />
            <span>
              <strong>Página Web Pública:</strong> Accede desde cualquier celular, tablet o computador usando esta dirección.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPublicUrl}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1 font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 text-[11px] shadow-2xs"
            >
              {copiedUrlBanner ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <span>Copiar enlace web</span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#173b6c] px-3 py-1 font-bold text-white hover:bg-[#245b9b] text-[11px] shadow-2xs"
            >
              <Share2 className="h-3 w-3" />
              <span>Compartir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Brand */}
          <a href="#inicio" className="flex items-center gap-3 text-decoration-none group">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#173b6c] to-[#245b9b] text-white flex items-center justify-center font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
              BD
            </div>
            <div>
              <strong className="block text-base font-extrabold text-[#102d54] tracking-tight leading-tight">
                Biblioteca Digital
              </strong>
              <span className="block text-xs font-semibold text-slate-500">
                I.E. Marco Fidel Suárez
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="#inicio"
              className="px-3 py-1.5 rounded-xl font-bold text-xs text-slate-700 hover:text-[#173b6c] hover:bg-blue-50 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#biblioteca"
              className="px-3 py-1.5 rounded-xl font-bold text-xs text-slate-700 hover:text-[#173b6c] hover:bg-blue-50 transition-colors"
            >
              Biblioteca
            </a>
            <a
              href="#categorias"
              className="px-3 py-1.5 rounded-xl font-bold text-xs text-slate-700 hover:text-[#173b6c] hover:bg-blue-50 transition-colors"
            >
              Áreas
            </a>
            <a
              href="#institucion"
              className="px-3 py-1.5 rounded-xl font-bold text-xs text-slate-700 hover:text-[#173b6c] hover:bg-blue-50 transition-colors"
            >
              Institución
            </a>
            <a
              href="#uso"
              className="px-3 py-1.5 rounded-xl font-bold text-xs text-slate-700 hover:text-[#173b6c] hover:bg-blue-50 transition-colors"
            >
              Cómo Usarla
            </a>
            <a
              href="#contacto"
              className="px-3 py-1.5 rounded-xl font-bold text-xs text-slate-700 hover:text-[#173b6c] hover:bg-blue-50 transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
              title="Añadir libro o guía institucional"
            >
              <Plus className="h-3.5 w-3.5 text-[#173b6c]" />
              <span>Añadir Recurso</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#173b6c] px-4 py-2 text-xs font-bold text-white hover:bg-[#245b9b] active:scale-95 shadow-sm transition-all"
            >
              <QrCode className="h-4 w-4 text-amber-300" />
              <span>Acceder Móvil</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
            >
              Inicio
            </a>
            <a
              href="#biblioteca"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
            >
              Biblioteca Digital
            </a>
            <a
              href="#categorias"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
            >
              Áreas de Conocimiento
            </a>
            <a
              href="#institucion"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
            >
              Sobre la Institución
            </a>
            <a
              href="#uso"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
            >
              ¿Cómo utilizarla?
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
            >
              Contacto
            </a>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAddModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 py-2.5 text-xs font-bold text-slate-700 bg-slate-50"
              >
                <Plus className="h-4 w-4" />
                <span>Añadir Recurso</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-[#102d54] via-[#1c4e88] to-[#2e70a9] text-white py-16 sm:py-24 px-4 sm:px-6">
          {/* Subtle background ornamentation */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 border border-white/20 px-3.5 py-1.5 text-xs font-medium backdrop-blur-md">
                <span className="text-amber-300">📚</span>
                <span>Aprender · Investigar · Crear · Tolima</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                Tu espacio para aprender en línea.
              </h1>

              <p className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
                Biblioteca Digital pública de la <strong>Institución Educativa Marco Fidel Suárez</strong> en <strong>Gualanday, Coello, Tolima</strong>. Un espacio abierto para consultar, descubrir y compartir recursos pedagógicos desde cualquier celular o computador.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#biblioteca"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#173b6c] hover:bg-blue-50 active:scale-95 shadow-md transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Explorar Biblioteca</span>
                </a>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 backdrop-blur-md px-5 py-3 text-sm font-bold text-white hover:bg-white/20 active:scale-95 transition-all"
                >
                  <QrCode className="h-4 w-4 text-amber-300" />
                  <span>Abrir en mi Teléfono</span>
                </button>

                <a
                  href="#institucion"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-blue-200 hover:text-white transition-colors"
                >
                  <span>Conocer la institución</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Hero Quick Highlight Card */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-7 shadow-2xl text-white space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
                    Acceso Libre
                  </span>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/30"></span>
                </div>

                <div className="text-5xl font-black tracking-tight text-white">
                  24/7
                </div>

                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Disponible para toda la comunidad escolar: estudiantes de primaria, secundaria y media, docentes, padres y comunidad de Gualanday y Coello.
                </p>

                <div className="pt-4 border-t border-white/15 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-blue-200">
                    <span>Recursos cargados:</span>
                    <strong className="text-white font-bold">{resources.length} documentos</strong>
                  </div>
                  <div className="flex items-center justify-between text-blue-200">
                    <span>Compatibilidad:</span>
                    <strong className="text-white font-bold">100% Móvil y PC</strong>
                  </div>
                  <div className="flex items-center justify-between text-blue-200">
                    <span>Costo:</span>
                    <strong className="text-emerald-300 font-bold">Completamente Gratuito</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATALOG SECTION */}
        <section id="biblioteca" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#173b6c] uppercase tracking-wider mb-1">
                <BookOpen className="h-4 w-4" />
                <span>Catálogo Institucional</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Biblioteca Digital
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Busca material académico, obras literarias, guías de estudio y recursos de consulta verificados.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#173b6c] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#245b9b] shadow-sm transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>+ Agregar Recurso</span>
              </button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Search input */}
              <div className="md:col-span-6 relative">
                <input
                  type="search"
                  placeholder="Buscar por título, autor o tema (ej. Rivera, Fracciones, Tolima)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/70 p-3 pl-10 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3.5" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    Borrar
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="md:col-span-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/70 p-3 text-sm text-slate-800 focus:bg-white focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">Todas las áreas del conocimiento</option>
                  <option value="lenguaje">Lenguaje y Literatura</option>
                  <option value="matematicas">Matemáticas</option>
                  <option value="ciencias">Ciencias Naturales</option>
                  <option value="sociales">Ciencias Sociales</option>
                  <option value="tecnologia">Tecnología e Informática</option>
                  <option value="ingles">Inglés</option>
                </select>
              </div>

              {/* Format Filter */}
              <div className="md:col-span-2">
                <select
                  value={selectedFileType}
                  onChange={(e) => setSelectedFileType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/70 p-3 text-sm text-slate-800 focus:bg-white focus:border-[#245b9b] focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">Todos los formatos</option>
                  <option value="Libro Digital">Libros Digitales</option>
                  <option value="Guía de Aprendizaje">Guías escolares</option>
                  <option value="Portal Web">Portales Web</option>
                  <option value="PDF">PDFs</option>
                </select>
              </div>
            </div>

            {/* Quick Category Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 mr-2">Filtrar por área:</span>
              {CATEGORIES_CONFIG.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-xs px-3 py-1 rounded-lg font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#173b6c] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}

              {(searchTerm || selectedCategory !== 'all' || selectedFileType !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedFileType('all');
                  }}
                  className="text-xs text-rose-600 hover:underline font-semibold ml-auto flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Restablecer filtros</span>
                </button>
              )}
            </div>
          </div>

          {/* Institutional Transparency Notice */}
          <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/80 p-4 mb-8 shadow-xs">
            <div className="flex items-start gap-3 text-xs text-amber-950">
              <Sparkles className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold text-amber-950 block">
                  Catálogo institucional verificado y colaborativo
                </strong>
                <p className="text-amber-900 leading-relaxed">
                  Esta plataforma no inventa libros ni enlaces. Los recursos corresponden a bibliotecas públicas oficiales (Biblioteca Virtual Miguel de Cervantes, Proyecto Gutenberg, Colombia Aprende, CORTOLIMA, Banco de la República y Khan Academy) y materiales aportados por los docentes de la institución.
                </p>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
            <span>
              Mostrando <strong>{filteredResources.length}</strong> de {resources.length} recursos disponibles
            </span>
            {resources.length !== INITIAL_RESOURCES.length && (
              <button
                onClick={handleResetCatalog}
                className="text-[11px] text-slate-400 hover:text-slate-600 hover:underline"
              >
                Restaurar catálogo inicial
              </button>
            )}
          </div>

          {/* Catalog Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResources.map((res) => (
                <ResourceCard
                  key={res.id}
                  resource={res}
                  onSelect={(item) => setSelectedResource(item)}
                  onShare={() => setIsShareModalOpen(true)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center max-w-xl mx-auto space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#173b6c]">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No se encontraron recursos con esos criterios
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Prueba buscando con palabras más generales o selecciona &quot;Todas las áreas&quot;. También puedes agregar un recurso institucional con el botón superior.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedFileType('all');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Limpiar búsqueda</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* CATEGORIES SECTION */}
        <section id="categorias" className="bg-slate-100/70 border-y border-slate-200/80 py-16 px-4 sm:px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#173b6c] uppercase tracking-wider block mb-1">
                Estructura Curricular
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Áreas de Consulta Académica
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Organización temática para que los alumnos y maestros encuentren rápidamente lo que necesitan según el plan de estudios.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div 
                onClick={() => {
                  setSelectedCategory('lenguaje');
                  const el = document.getElementById('biblioteca');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-amber-400 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  📖
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#173b6c]">
                  Lenguaje y Literatura
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Lectura crítica, obras clásicas colombianas y universales, comprensión textual, ortografía y redacción.
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#173b6c] mt-4">
                  Ver recursos en esta área →
                </span>
              </div>

              <div 
                onClick={() => {
                  setSelectedCategory('matematicas');
                  const el = document.getElementById('biblioteca');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-blue-400 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  ➗
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#173b6c]">
                  Matemáticas
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Aritmética, geometría, álgebra elemental, trigonometría, estadística y resolución de problemas cotidianos.
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#173b6c] mt-4">
                  Ver recursos en esta área →
                </span>
              </div>

              <div 
                onClick={() => {
                  setSelectedCategory('ciencias');
                  const el = document.getElementById('biblioteca');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🔬
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#173b6c]">
                  Ciencias Naturales
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Biología, química básica, física, ecosistemas y la rica biodiversidad del departamento del Tolima.
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#173b6c] mt-4">
                  Ver recursos en esta área →
                </span>
              </div>

              <div 
                onClick={() => {
                  setSelectedCategory('sociales');
                  const el = document.getElementById('biblioteca');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-orange-400 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🌎
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#173b6c]">
                  Ciencias Sociales
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Historia de Colombia, geografía regional, constitución política, derechos humanos y convivencia escolar.
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#173b6c] mt-4">
                  Ver recursos en esta área →
                </span>
              </div>

              <div 
                onClick={() => {
                  setSelectedCategory('tecnologia');
                  const el = document.getElementById('biblioteca');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-purple-400 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  💻
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#173b6c]">
                  Tecnología e Informática
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Alfabetización digital, pensamiento computacional, internet seguro y herramientas de productividad.
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#173b6c] mt-4">
                  Ver recursos en esta área →
                </span>
              </div>

              <div 
                onClick={() => {
                  setSelectedCategory('ingles');
                  const el = document.getElementById('biblioteca');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-rose-400 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🌐
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#173b6c]">
                  Inglés
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Lecturas graduadas, vocabulario básico, gramática comunicativa y audios de práctica para los estándares nacionales.
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#173b6c] mt-4">
                  Ver recursos en esta área →
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* INSTITUTION SECTION */}
        <section id="institucion" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
          <div className="mb-10">
            <span className="text-xs font-bold text-[#173b6c] uppercase tracking-wider block mb-1">
              Comunidad Educativa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sobre la Institución
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Información oficial de la Institución Educativa Marco Fidel Suárez de Gualanday.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-blue-50 text-[#173b6c] flex items-center justify-center">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    I.E. Marco Fidel Suárez
                  </h3>
                  <p className="text-xs text-slate-500">Gualanday, Coello · Departamento del Tolima</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                La institución educativa oficial está ubicada en el corregimiento de Gualanday, en el municipio de Coello, Tolima. Brinda formación integral a niños, niñas y jóvenes desde preescolar hasta educación media, bajo principios de equidad, respeto y superación académica.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Ubicación
                  </span>
                  <strong className="text-xs text-slate-800 font-semibold block mt-0.5">
                    Gualanday · Coello · Tolima
                  </strong>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Carácter
                  </span>
                  <strong className="text-xs text-slate-800 font-semibold block mt-0.5">
                    Público / Oficial
                  </strong>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Población
                  </span>
                  <strong className="text-xs text-slate-800 font-semibold block mt-0.5">
                    Mixta
                  </strong>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Jornada
                  </span>
                  <strong className="text-xs text-slate-800 font-semibold block mt-0.5">
                    Mañana
                  </strong>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Compass className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Propósito de la Biblioteca Digital
                    </h3>
                    <p className="text-xs text-slate-500">Democratización del conocimiento</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Facilitar el acceso organizado a recursos educativos digitales que apoyen las tareas escolares, estimulen la lectura placentera e investigativa, fomenten el uso crítico de la tecnología y permitan el aprendizaje autónomo tanto en las aulas como en los hogares de Gualanday.
                </p>

                <div className="rounded-2xl bg-blue-50 border border-blue-200/80 p-4 text-xs text-blue-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#173b6c]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Compromiso de Accesibilidad Total</span>
                  </div>
                  <p className="text-blue-800/90 leading-relaxed text-[11px]">
                    Diseñada para funcionar en teléfonos móviles de gama de entrada, conexiones móviles y computadores institucionales, sin barreras de registro.
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                * Nota: Este propósito corresponde a la propuesta tecnológica de apoyo a la I.E. Marco Fidel Suárez.
              </p>
            </div>
          </div>
        </section>

        {/* HOW TO USE */}
        <section id="uso" className="bg-slate-100/70 border-t border-slate-200/80 py-16 px-4 sm:px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#173b6c] uppercase tracking-wider block mb-1">
                Guía Rápida
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ¿Cómo utilizar la Biblioteca?
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Pasos simples para estudiar e investigar desde cualquier dispositivo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-xs relative">
                <div className="h-10 w-10 rounded-2xl bg-[#173b6c] text-white flex items-center justify-center font-extrabold text-base mb-4 shadow-sm">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Busca tu tema o libro
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Escribe en la barra de búsqueda el autor, título o concepto clave que necesitas consultar para tus tareas o clases.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-xs relative">
                <div className="h-10 w-10 rounded-2xl bg-[#173b6c] text-white flex items-center justify-center font-extrabold text-base mb-4 shadow-sm">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Filtra por área o formato
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Selecciona tu asignatura (Lenguaje, Matemáticas, Ciencias, etc.) para visualizar exactamente los materiales de tu interés.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-xs relative">
                <div className="h-10 w-10 rounded-2xl bg-[#173b6c] text-white flex items-center justify-center font-extrabold text-base mb-4 shadow-sm">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Lee y consulta libremente
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Haz clic en &quot;Abrir&quot; para consultar el material completo en línea o guardarlo para tu estudio escolar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contacto" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
          <div className="rounded-3xl bg-gradient-to-br from-[#102d54] via-[#173b6c] to-[#1c4e88] text-white p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
                  Canales Oficiales
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Información Institucional & Contacto
                </h2>
                <p className="text-sm text-blue-100 leading-relaxed max-w-lg">
                  Para trámites académicos, constancias de estudio, matrícula o inquietudes oficiales, la comunidad educativa puede comunicarse a través de los canales institucionales.
                </p>

                <div className="pt-2">
                  <a
                    href="https://marcofidelsuarezcoello.edu.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#173b6c] hover:bg-blue-50 transition-colors shadow-md"
                  >
                    <span>Visitar Portal Web Oficial</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3.5 bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-7 rounded-2xl text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Dirección:</strong>
                    <span className="text-blue-100">
                      Calle 1A No. 1-13, Corregimiento de Gualanday, Coello, Tolima, Colombia.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Correo Electrónico:</strong>
                    <a
                      href="mailto:coello.iemarcofidelsuarez@sedtolima.edu.co"
                      className="text-blue-200 hover:text-white underline"
                    >
                      coello.iemarcofidelsuarez@sedtolima.edu.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Teléfono de Contacto:</strong>
                    <a href="tel:3202442996" className="text-blue-200 hover:text-white font-mono">
                      +57 320 244 2996
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Horario de Atención:</strong>
                    <span className="text-blue-100">Lunes a Viernes · Jornada de la Mañana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0b1f3a] text-slate-400 py-10 px-4 sm:px-6 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-white font-bold text-sm">
              Biblioteca Digital · I.E. Marco Fidel Suárez
            </p>
            <p className="text-slate-400 text-xs">
              Gualanday, Coello, Tolima · Acceso público en la web para todos los dispositivos
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 font-semibold text-xs">
            <a href="#inicio" className="hover:text-white transition-colors">
              Inicio
            </a>
            <a href="#biblioteca" className="hover:text-white transition-colors">
              Biblioteca
            </a>
            <a href="#institucion" className="hover:text-white transition-colors">
              Institución
            </a>
            <a
              href="https://marcofidelsuarezcoello.edu.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-200 inline-flex items-center gap-1"
            >
              <span>Sitio Oficial</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Biblioteca Digital de la Institución Educativa Marco Fidel Suárez. Desarrollado para acceso abierto de estudiantes, docentes y familias en cualquier dispositivo con conexión a internet.
        </div>
      </footer>

      {/* Floating Mobile Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center justify-around">
        <a
          href="#biblioteca"
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-600 hover:text-[#173b6c]"
        >
          <BookOpen className="h-4 w-4" />
          <span>Libros</span>
        </a>
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-[#173b6c] text-white px-4 py-2 text-xs font-bold shadow-md"
        >
          <QrCode className="h-3.5 w-3.5 text-amber-300" />
          <span>Compartir</span>
        </button>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-600 hover:text-[#173b6c]"
        >
          <Plus className="h-4 w-4" />
          <span>Agregar</span>
        </button>
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={publicAppUrl}
      />

      <AddResourceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddResource={handleAddResource}
      />

      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onShare={() => {
          setSelectedResource(null);
          setIsShareModalOpen(true);
        }}
      />
    </div>
  );
}
