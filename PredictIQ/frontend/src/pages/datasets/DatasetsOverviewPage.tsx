import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Plus, Search, BarChart3, Brain, TrendingUp, Trash2, Table } from 'lucide-react';
import { supabase } from '@/services/supabase';
import { useToast } from '@/hooks/useToast';
import type { Dataset } from '@/types';

interface LocalEntry {
  id: string;
  fileName: string;
  rowCount: number;
  colCount: number;
  quality: number;
}

export default function DatasetsOverviewPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [localDatasets, setLocalDatasets] = useState<LocalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from('datasets').select('*').order('created_at', { ascending: false });
      setDatasets(data || []);
    } catch { /* offline */ }

    const locals: LocalEntry[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k?.startsWith('local-')) {
        try {
          const v = JSON.parse(sessionStorage.getItem(k) || '{}');
          locals.push({
            id: k,
            fileName: v.fileName || k,
            rowCount: v.rows?.length || 0,
            colCount: v.meta?.length || 0,
            quality: v.quality || 0,
          });
        } catch { /* skip */ }
      }
    }
    setLocalDatasets(locals);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this dataset?')) return;
    try {
      await supabase.from('datasets').delete().eq('id', id);
      setDatasets(prev => prev.filter(d => d.id !== id));
      toast('Dataset deleted', 'success');
    } catch (err) {
      toast('Failed to delete dataset', 'error');
    }
  }

  function handleDeleteLocal(id: string) {
    if (!confirm('Delete this local dataset?')) return;
    sessionStorage.removeItem(id);
    setLocalDatasets(prev => prev.filter(d => d.id !== id));
    toast('Local dataset deleted', 'success');
  }

  const filterText = search.toLowerCase();
  const filteredSupabase = datasets.filter(d =>
    d.file_name.toLowerCase().includes(filterText)
  );
  const filteredLocal = localDatasets.filter(d =>
    d.fileName.toLowerCase().includes(filterText)
  );

  if (loading) {
    return (
      <div className="empty-state">
        <div style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }}></div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>Loading datasets...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>My Datasets</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            {filteredSupabase.length + filteredLocal.length} dataset{(filteredSupabase.length + filteredLocal.length) !== 1 ? 's' : ''}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/upload')}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={16} /> New Upload
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search datasets..."
          style={{
            width: '100%', padding: '10px 14px 10px 38px', borderRadius: 8,
            border: '1px solid var(--border)', background: 'var(--surface)',
            color: 'var(--text)', fontSize: 13, outline: 'none',
          }}
        />
      </div>

      {filteredSupabase.length === 0 && filteredLocal.length === 0 ? (
        <div className="empty-state" style={{ padding: '60px 20px' }}>
          <Database size={48} style={{ opacity: 0.2, marginBottom: 12 }} />
          <div style={{ fontWeight: 600, marginBottom: 4 }}>No datasets yet</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>Upload your first dataset to get started</div>
          <button className="btn btn-primary" onClick={() => navigate('/upload')}>
            <Plus size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Upload Dataset
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {filteredSupabase.map(ds => (
            <DatasetCard
              key={ds.id}
              name={ds.file_name}
              rows={ds.row_count}
              cols={ds.column_count}
              quality={ds.data_quality_score}
              onDashboard={() => navigate(`/dashboard/${ds.id}`)}
              onInsights={() => navigate(`/insights/${ds.id}`)}
              onForecast={() => navigate(`/forecast/${ds.id}`)}
              onData={() => navigate(`/data/${ds.id}`)}
              onDelete={() => handleDelete(ds.id)}
            />
          ))}
          {filteredLocal.map(ds => (
            <DatasetCard
              key={ds.id}
              name={ds.fileName}
              rows={ds.rowCount}
              cols={ds.colCount}
              quality={ds.quality}
              isLocal
              onDashboard={() => navigate(`/dashboard/${ds.id}`)}
              onInsights={() => navigate(`/insights/${ds.id}`)}
              onForecast={() => navigate(`/forecast/${ds.id}`)}
              onData={() => navigate(`/data/${ds.id}`)}
              onDelete={() => handleDeleteLocal(ds.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DatasetCard({
  name, rows, cols, quality, isLocal,
  onDashboard, onInsights, onForecast, onData, onDelete,
}: {
  name: string; rows: number; cols: number; quality: number; isLocal?: boolean;
  onDashboard: () => void; onInsights: () => void; onForecast: () => void; onData: () => void; onDelete: () => void;
}) {
  const qColor = quality >= 80 ? 'var(--accent)' : quality >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: qColor }}></div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
            {rows.toLocaleString()} rows · {cols} columns
            {isLocal && <span style={{ color: '#f59e0b', marginLeft: 8 }}>local</span>}
          </div>
        </div>
        <div style={{ textAlign: 'right', marginLeft: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', color: qColor }}>{quality}</div>
          <div style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Quality</div>
        </div>
      </div>
      <div style={{ height: 4, background: 'var(--surface)', borderRadius: 2, marginBottom: 14, overflow: 'hidden' }}>
        <div style={{ width: `${quality}%`, height: '100%', background: qColor, borderRadius: 2 }}></div>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={onDashboard} style={{ flex: 1 }}>
          <BarChart3 size={12} style={{ marginRight: 3, verticalAlign: 'middle' }} /> Dashboard
        </button>
        <button className="btn btn-sm" onClick={onInsights} style={{ flex: 1 }}>
          <Brain size={12} style={{ marginRight: 3, verticalAlign: 'middle' }} /> Insights
        </button>
        <button className="btn btn-sm" onClick={onForecast} style={{ flex: 1 }}>
          <TrendingUp size={12} style={{ marginRight: 3, verticalAlign: 'middle' }} /> Forecast
        </button>
        <button className="btn btn-sm" onClick={onData} style={{ flex: 1 }}>
          <Table size={12} style={{ marginRight: 3, verticalAlign: 'middle' }} /> Data
        </button>
        <button className="btn btn-sm" onClick={onDelete} title="Delete"
          style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', padding: '6px 10px' }}>
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}
