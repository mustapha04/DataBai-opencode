import { useToast } from '@/hooks/useToast';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle size={16} />,
  error: <AlertCircle size={16} />,
  info: <Info size={16} />,
};

const colors = {
  success: { bg: 'rgba(0,200,83,0.12)', border: 'rgba(0,200,83,0.3)', text: '#00c853', ico: '#00c853' },
  error:   { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.3)',  text: '#ef4444', ico: '#ef4444' },
  info:    { bg: 'rgba(56,132,255,0.12)', border: 'rgba(56,132,255,0.3)', text: '#3884ff', ico: '#3884ff' },
};

export default function Toaster() {
  const { toasts, dismiss } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360,
    }}>
      {toasts.map(t => {
        const c = colors[t.type];
        return (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
            borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`,
            backdropFilter: 'blur(8px)', fontSize: 13, color: c.text, animation: 'slideIn 0.25s ease',
          }}>
            <span style={{ flexShrink: 0 }}>{icons[t.type]}</span>
            <span style={{ flex: 1 }}>{t.message}</span>
            <button onClick={() => dismiss(t.id)} style={{
              background: 'none', border: 'none', color: c.text, cursor: 'pointer', padding: 2,
              opacity: 0.6, flexShrink: 0,
            }}><X size={14} /></button>
          </div>
        );
      })}
    </div>
  );
}
