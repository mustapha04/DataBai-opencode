import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Table } from 'lucide-react';
import { supabase } from '@/services/supabase';
import { getDatasetData } from '@/services/api';

export default function DataTablePage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(50);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('product_name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [dsName, setDsName] = useState('');
  const [isLocal, setIsLocal] = useState(false);
  const totalPages = Math.ceil(total / perPage);

  const loadLocal = useCallback(() => {
    try {
      const raw = sessionStorage.getItem(id!);
      if (!raw) return;
      const ds = JSON.parse(raw);
      setDsName(ds.fileName || id!);
      setIsLocal(true);
      let all: any[] = ds.rows || [];
      const meta: any[] = ds.meta || [];
      setColumns(meta.map((c: any) => c.name));
      setTotal(all.length);

      if (search) {
        const q = search.toLowerCase();
        all = all.filter((r: any) =>
          Object.values(r).some((v: any) => String(v).toLowerCase().includes(q))
        );
      }

      const si = meta.findIndex((c: any) => c.name === sortBy);
      if (si >= 0) {
        all.sort((a: any, b: any) => {
          const va = Object.values(a)[si];
          const vb = Object.values(b)[si];
          if (typeof va === 'number' && typeof vb === 'number') return sortDir === 'asc' ? va - vb : vb - va;
          return sortDir === 'asc'
            ? String(va).localeCompare(String(vb))
            : String(vb).localeCompare(String(va));
        });
      }

      const start = (page - 1) * perPage;
      setRows(all.slice(start, start + perPage));
    } catch { setRows([]); }
  }, [id, page, search, sortBy, sortDir, perPage]);

  const loadRemote = useCallback(async () => {
    try {
      const { data: ds } = await supabase.from('datasets').select('file_name').eq('id', id).single();
      setDsName(ds?.file_name || id!);
      const result = await getDatasetData(id!, page, perPage, search, sortBy, sortDir);
      setRows(result.data);
      setColumns(result.columns);
      setTotal(result.total);
    } catch { setRows([]); }
  }, [id, page, perPage, search, sortBy, sortDir]);

  useEffect(() => {
    setLoading(true);
    if (id?.startsWith('local-')) {
      loadLocal();
    } else {
      loadRemote();
    }
    setLoading(false);
  }, [id, loadLocal, loadRemote]);

  function toggleSort(col: string) {
    if (sortBy === col) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
    setPage(1);
  }

  const colHeaders: Record<string, string> = {
    product_name: 'Product', category: 'Category', price: 'Price',
    units_sold: 'Units Sold', revenue: 'Revenue', earnings: 'Earnings',
    downloads: 'Downloads', refunds: 'Refunds', rating: 'Rating',
  };

  function fmt(val: any): string {
    if (val === null || val === undefined) return '—';
    if (typeof val === 'number') {
      if (Number.isInteger(val)) return val.toLocaleString();
      return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return String(val);
  }

  if (loading) {
    return (
      <div className="empty-state">
        <div style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }}></div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>Loading data...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{dsName}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            <Table size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            {total.toLocaleString()} row{total !== 1 ? 's' : ''} · {columns.length} column{columns.length !== 1 ? 's' : ''}
            {isLocal && <span style={{ color: '#f59e0b', marginLeft: 8 }}>local</span>}
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: 12 }}>
        <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search across all columns..."
          style={{
            width: '100%', padding: '8px 12px 8px 34px', borderRadius: 6,
            border: '1px solid var(--border)', background: 'var(--surface)',
            color: 'var(--text)', fontSize: 13, outline: 'none',
          }}
        />
      </div>

      <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              <th style={thStyle}>#</th>
              {columns.map(col => (
                <th key={col} style={{ ...thStyle, cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => toggleSort(col)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                    {colHeaders[col] || col}
                    {sortBy === col ? (
                      sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    ) : <span style={{ width: 12 }} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: 24, color: 'var(--muted)' }}>
                  No matching rows found
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ ...tdStyle, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                    {(page - 1) * perPage + i + 1}
                  </td>
                  {columns.map(col => (
                    <td key={col} style={tdStyle}>{fmt(row[col])}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 }}>
          <button className="btn btn-sm" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ChevronLeft size={14} /> Prev
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let p: number;
            if (totalPages <= 7) {
              p = i + 1;
            } else if (page <= 4) {
              p = i + 1;
            } else if (page >= totalPages - 3) {
              p = totalPages - 6 + i;
            } else {
              p = page - 3 + i;
            }
            return (
              <button key={p} className="btn btn-sm"
                onClick={() => setPage(p)}
                style={p === page ? { background: 'var(--accent)', color: '#0a0e1a', borderColor: 'var(--accent)' } : {}}>
                {p}
              </button>
            );
          })}
          <button className="btn btn-sm" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            Next <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '8px 10px', textAlign: 'left', fontWeight: 600,
  fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5,
  borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '7px 10px', whiteSpace: 'nowrap',
};
