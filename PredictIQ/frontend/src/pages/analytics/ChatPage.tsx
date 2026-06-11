import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageSquare, Send, Bot, User, Loader2, Database, Settings, CheckCircle, XCircle, Eye, EyeOff, Wifi, ChevronDown, ChevronRight, Info } from 'lucide-react';
import type { ChatMessage, ColumnMeta } from '@/types';
import { supabase } from '@/services/supabase';
import api, { testConnection } from '@/services/api';

interface LocalData { rows: any[]; meta: ColumnMeta[]; fileName: string; }

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [datasetName, setDatasetName] = useState('');
  const [rowCount, setRowCount] = useState(0);
  const [colMeta, setColMeta] = useState<ColumnMeta[]>([]);
  const [localRows, setLocalRows] = useState<any[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showColInfo, setShowColInfo] = useState(false);
  const [provider, setProvider] = useState('auto');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [openrouterKey, setOpenrouterKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [openrouterModel, setOpenrouterModel] = useState('');
  const [groqModel, setGroqModel] = useState('');
  const [keyStatus, setKeyStatus] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const numCols = colMeta.filter(c => c.type === 'numeric');
  const catCols = colMeta.filter(c => c.type === 'categorical');

  const suggestions = [
    `Summarize this dataset`,
    numCols.length > 0 ? `What is the total ${numCols[0].name}?` : null,
    catCols.length > 0 ? `Show me top ${catCols[0].name}` : null,
    `What trends or patterns do you see?`,
    `Any pricing or growth opportunities?`,
    numCols.filter(c => /download|install|free/i.test(c.name)).length > 0 ? `Which products have the most free downloads?` : null,
  ].filter(Boolean) as string[];

  useEffect(() => {
    if (!id) return;
    loadDataset();
    const savedOr = sessionStorage.getItem('predictiq_or_key');
    const savedG = sessionStorage.getItem('predictiq_g_key');
    const savedOrM = sessionStorage.getItem('predictiq_or_model');
    const savedGm = sessionStorage.getItem('predictiq_g_model');
    if (savedOr) setOpenrouterKey(savedOr);
    if (savedG) setGroqKey(savedG);
    if (savedOrM) setOpenrouterModel(savedOrM);
    if (savedGm) setGroqModel(savedGm);
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function loadDataset() {
    setLoading(true);
    try {
      if (id?.startsWith('local-')) {
        const stored = sessionStorage.getItem(id);
        if (stored) {
          const parsed: LocalData = JSON.parse(stored);
          setDatasetName(parsed.fileName || 'local dataset');
          setRowCount(parsed.rows?.length || 0);
          setColMeta(parsed.meta || []);
          setLocalRows(parsed.rows || []);
        }
        setLoading(false);
        return;
      }
      const { data: ds } = await supabase.from('datasets').select('*').eq('id', id).single();
      if (ds) {
        setDatasetName(ds.file_name || 'dataset');
        setRowCount(ds.row_count || 0);
        setColMeta(ds.columns_meta || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function testKey(which: 'openrouter'|'groq') {
    setKeyStatus(prev => ({ ...prev, [which]: 'testing' }));
    const key = which === 'openrouter' ? openrouterKey : groqKey;
    const model = which === 'openrouter' ? openrouterModel : groqModel;
    try {
      const res = await testConnection(which, key, model);
      setKeyStatus(prev => ({ ...prev, [which]: res.success ? 'ok' : 'err', [`${which}_msg`]: res.error || '' }));
    } catch {
      setKeyStatus(prev => ({ ...prev, [which]: 'err', [`${which}_msg`]: 'Request failed' }));
    }
  }

  function saveSetting(key: string, val: string) {
    const setters: Record<string, any> = {
      'predictiq_or_key': setOpenrouterKey,
      'predictiq_g_key': setGroqKey,
      'predictiq_or_model': setOpenrouterModel,
      'predictiq_g_model': setGroqModel,
    };
    if (setters[key]) setters[key](val);
    sessionStorage.setItem(key, val);
  }

  async function sendMessage(content: string) {
    if (!content.trim() || !id) return;
    const userMsg: ChatMessage = { role: 'user', content: content.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setShowSuggestions(false);
    setSending(true);

    const history = messages.slice(-10);
    const isLocal = id.startsWith('local-');
    try {
      const res = await api.post(`/api/datasets/${id}/chat`, {
        message: content.trim(), history, provider,
        openrouter_key: openrouterKey, groq_key: groqKey,
        openrouter_model: openrouterModel, groq_model: groqModel,
        local_rows: isLocal ? localRows : [],
        local_meta: isLocal ? colMeta : [],
      }, { timeout: 180000 });
      const reply = res.data.reply || 'No response from AI.';
      const provUsed = res.data.provider_tried || provider;
      setMessages(prev => [...prev, { role: 'assistant', content: reply + (provUsed !== 'auto' ? `\n\n_(via ${provUsed})_` : '') }]);
    } catch (err: any) {
      console.error('Chat error:', err);
      let detail = err?.response?.data?.detail;
      if (!detail) {
        if (err.code === 'ERR_NETWORK') detail = `Network error — cannot reach backend at ${import.meta.env.VITE_API_URL || 'localhost:8014 (via Vite proxy)'}`;
        else if (err.code === 'ECONNABORTED') detail = 'Request timed out (180s). Free AI models can be slow — try again.';
        else detail = err.message || 'Failed to get response. Check if backend is running.';
      }
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${detail}` }]);
    } finally {
      setSending(false);
    }
  }

  function handleSuggestion(text: string) {
    sendMessage(text);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  if (loading) {
    return (
      <div className="empty-state">
        <div style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }}></div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>Loading dataset...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      <div className="section-title" style={{ marginTop: 0, flexShrink: 0 }}>
        <MessageSquare size={18} /> AI Chat
        <span style={{ marginLeft: 10, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 400 }}>
          <Database size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          {datasetName} · {rowCount} rows · {colMeta.length} cols
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 11, color: 'var(--muted)' }}>AI:</label>
          <select value={provider} onChange={e => setProvider(e.target.value)}
            style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}>
            <option value="auto">Auto</option>
            <option value="openrouter">OpenRouter</option>
            <option value="groq">Groq</option>
            <option value="mock">Mock</option>
          </select>
          <button className="btn btn-sm" onClick={() => setSettingsOpen(!settingsOpen)}
            style={{ padding: '2px 6px', background: settingsOpen ? 'var(--accent)' : 'var(--surface)', color: settingsOpen ? '#0a0e1a' : 'var(--text)', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Settings size={12} />
          </button>
        </div>
      </div>

      {/* Dataset Context Card */}
      {colMeta.length > 0 && (
        <div style={{ marginBottom: 12, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--surface)', overflow: 'hidden', flexShrink: 0 }}>
          <div
            onClick={() => setShowColInfo(!showColInfo)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', cursor: 'pointer', userSelect: 'none' }}
          >
            <Info size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>
              Dataset columns ({numCols.length} numeric · {catCols.length} categorical)
            </span>
            {showColInfo ? <ChevronDown size={14} style={{ color: 'var(--muted)' }} /> : <ChevronRight size={14} style={{ color: 'var(--muted)' }} />}
          </div>
          {showColInfo && (
            <div style={{ borderTop: '1px solid var(--border)', padding: '6px 12px 10px', fontSize: 11, maxHeight: 200, overflowY: 'auto' }}>
              {colMeta.map((col, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
                  <span style={{
                    display: 'inline-block', width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    background: col.type === 'numeric' ? 'var(--accent2)' : 'var(--accent3)',
                  }}></span>
                  <span style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{col.name}</span>
                  <span style={{ color: 'var(--muted)' }}>({col.type})</span>
                  <span style={{ color: 'var(--dim)', marginLeft: 'auto' }}>
                    {col.type === 'numeric'
                      ? `${col.nulls || 0} nulls · ${col.min ?? '?'}–${col.max ?? '?'} · avg ${typeof col.mean === 'number' ? col.mean.toFixed(1) : '?'}`
                      : `${col.unique ?? '?'} unique · top: "${col.top_value ?? '?'}"`
                    }
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {settingsOpen && (
        <div style={{ marginBottom: 12, padding: 10, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--surface)', fontSize: 12, flexShrink: 0 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 11, color: 'var(--muted)' }}>AI PROVIDER SETTINGS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: 8, border: '1px solid var(--border)', borderRadius: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 12 }}>OpenRouter</span>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>openrouter.ai</span>
              </div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                <input type={showKeys ? 'text' : 'password'} value={openrouterKey}
                  onChange={e => saveSetting('predictiq_or_key', e.target.value)}
                  placeholder="API Key (sk-or-v1-...)" style={{ flex: 1, fontSize: 11, padding: '4px 6px' }} />
                <button className="btn btn-sm" onClick={() => setShowKeys(!showKeys)}
                  style={{ padding: '3px 6px', fontSize: 11 }}>
                  {showKeys ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                <input type="text" value={openrouterModel}
                  onChange={e => saveSetting('predictiq_or_model', e.target.value)}
                  placeholder="Model (e.g. gpt-4o-mini, claude-3-haiku)" style={{ flex: 1, fontSize: 11, padding: '4px 6px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button className="btn btn-sm" onClick={() => testKey('openrouter')}
                  disabled={keyStatus.openrouter === 'testing' || !openrouterKey}
                  style={{ padding: '3px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {keyStatus.openrouter === 'testing' ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Wifi size={12} />}
                  Test Connection
                </button>
                {keyStatus.openrouter === 'ok' && <span style={{ color: 'var(--positive)', fontSize: 11 }}>✅ Connected</span>}
                {keyStatus.openrouter === 'err' && <span style={{ color: 'var(--danger)', fontSize: 11 }}>❌ {keyStatus.openrouter_msg || 'Failed'}</span>}
              </div>
            </div>
            <div style={{ padding: 8, border: '1px solid var(--border)', borderRadius: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 12 }}>Groq</span>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>groq.com</span>
              </div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                <input type={showKeys ? 'text' : 'password'} value={groqKey}
                  onChange={e => saveSetting('predictiq_g_key', e.target.value)}
                  placeholder="API Key (gsk_...)" style={{ flex: 1, fontSize: 11, padding: '4px 6px' }} />
                <button className="btn btn-sm" onClick={() => setShowKeys(!showKeys)}
                  style={{ padding: '3px 6px', fontSize: 11 }}>
                  {showKeys ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                <input type="text" value={groqModel}
                  onChange={e => saveSetting('predictiq_g_model', e.target.value)}
                  placeholder="Model (e.g. llama-3.3-70b-versatile)" style={{ flex: 1, fontSize: 11, padding: '4px 6px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button className="btn btn-sm" onClick={() => testKey('groq')}
                  disabled={keyStatus.groq === 'testing' || !groqKey}
                  style={{ padding: '3px 10px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {keyStatus.groq === 'testing' ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Wifi size={12} />}
                  Test Connection
                </button>
                {keyStatus.groq === 'ok' && <span style={{ color: 'var(--positive)', fontSize: 11 }}>✅ Connected</span>}
                {keyStatus.groq === 'err' && <span style={{ color: 'var(--danger)', fontSize: 11 }}>❌ {keyStatus.groq_msg || 'Failed'}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{
        flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12,
        padding: '12px 0', marginBottom: 12,
      }}>
        {messages.length === 0 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'var(--muted)' }}>
            <Bot size={40} style={{ opacity: 0.3 }} />
            <div style={{ fontSize: 13 }}>Ask anything about <strong>{datasetName}</strong></div>
            <div style={{ fontSize: 11, color: 'var(--dim)' }}>
              {rowCount} rows · {numCols.length} numeric columns · {catCols.length} categorical columns
            </div>
            {showSuggestions && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, width: '100%', maxWidth: 400 }}>
                {suggestions.map(s => (
                  <button key={s} className="btn btn-sm" onClick={() => handleSuggestion(s)}
                    style={{ textAlign: 'left', fontSize: 12, color: 'var(--text)', opacity: 0.8 }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', gap: 8,
            flexDirection: msg.role === 'user' ? 'row-reverse' as const : 'row',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              background: msg.role === 'user' ? 'var(--accent)' : 'var(--surface)',
              border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
            }}>
              {msg.role === 'user' ? <User size={14} color="#0a0e1a" /> : <Bot size={14} color="var(--accent)" />}
            </div>
            <div style={{
              maxWidth: '75%', padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              background: msg.role === 'user' ? 'var(--accent)' : 'var(--surface)',
              color: msg.role === 'user' ? '#0a0e1a' : 'var(--text)',
              border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
              borderBottomRightRadius: msg.role === 'user' ? 4 : 12,
              borderBottomLeftRadius: msg.role === 'user' ? 12 : 4,
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {sending && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface)', border: '1px solid var(--border)', flexShrink: 0,
            }}>
              <Bot size={14} color="var(--accent)" />
            </div>
            <div style={{
              padding: '10px 14px', borderRadius: 12, fontSize: 13,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderBottomLeftRadius: 4,
            }}>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: 8, flexShrink: 0, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your data..."
          disabled={sending}
          style={{ flex: 1 }}
        />
        <button className="btn" onClick={() => sendMessage(input)} disabled={sending || !input.trim()}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Send size={14} /> Send
        </button>
      </div>
    </div>
  );
}
