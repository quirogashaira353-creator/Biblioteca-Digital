import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  Smartphone, 
  ExternalLink, 
  MessageCircle, 
  Globe, 
  QrCode,
  Laptop
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url }) => {
  const [copied, setCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setCopyFeedback('¡Enlace copiado al portapapeles!');
      setTimeout(() => {
        setCopied(false);
        setCopyFeedback(null);
      }, 3000);
    } catch {
      setCopyFeedback('No se pudo copiar automáticamente. Por favor copia manualmente.');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Biblioteca Digital | I.E. Marco Fidel Suárez',
          text: 'Accede a la Biblioteca Digital y recursos académicos de la Institución Educativa Marco Fidel Suárez de Gualanday:',
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const shareText = encodeURIComponent(
    `📚 *Biblioteca Digital | I.E. Marco Fidel Suárez (Gualanday, Coello)*\nAccede a libros, guías y recursos educativos gratuitos desde tu celular o computador:\n${url}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#102d54] via-[#173b6c] to-[#245b9b] px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                <QrCode className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold leading-tight">Enlace Público & Código QR</h3>
                <p className="text-xs text-blue-100">Acceso libre en cualquier dispositivo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Instructions banner */}
          <div className="rounded-xl bg-amber-50 border border-amber-200/80 p-3.5 flex items-start gap-3">
            <Globe className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-semibold block text-amber-950 mb-0.5">Esta URL ya es pública en la web:</span>
              Cualquier estudiante, docente, padre de familia o directivo puede ingresar inmediatamente sin necesidad de registro ni contraseñas.
            </div>
          </div>

          {/* QR Code Card */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 p-5 text-center">
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200">
              <QRCodeSVG
                value={url}
                size={180}
                level="M"
                includeMargin={false}
                className="rounded-lg"
              />
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Smartphone className="h-4 w-4 text-[#173b6c]" />
              Apunta la cámara de tu celular a este código
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Funciona con Android, iPhone y lectores de código QR
            </p>
          </div>

          {/* Public URL Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Dirección Web Oficial (URL Pública)
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  readOnly
                  value={url}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-mono text-slate-800 focus:outline-none select-all"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#173b6c] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#245b9b] active:scale-95 transition-all shadow-sm shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-300" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar
                  </>
                )}
              </button>
            </div>
            {copyFeedback && (
              <p className="text-xs text-emerald-600 font-medium animate-in fade-in">
                {copyFeedback}
              </p>
            )}
          </div>

          {/* Quick Share Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar por WhatsApp
            </a>

            {typeof navigator !== 'undefined' && 'share' in navigator ? (
              <button
                onClick={handleNativeShare}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm"
              >
                <Share2 className="h-4 w-4 text-slate-600" />
                Compartir en el dispositivo
              </button>
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm"
              >
                <ExternalLink className="h-4 w-4 text-slate-600" />
                Abrir en nueva pestaña
              </a>
            )}
          </div>

          {/* Device compatibility badge */}
          <div className="pt-2 text-center">
            <div className="inline-flex items-center gap-2 text-[11px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              <Smartphone className="h-3.5 w-3.5" /> Teléfonos
              <span>•</span>
              <TabletIcon className="h-3.5 w-3.5" /> Tablets
              <span>•</span>
              <Laptop className="h-3.5 w-3.5" /> Computadores
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const TabletIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
