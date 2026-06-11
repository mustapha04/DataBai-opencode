import axios from 'axios';
import type { Dataset, KpiMetric, ChartData, ProductRow, OpportunityItem, AIInsight, ChatMessage } from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 180000,
});

export async function uploadDataset(file: File): Promise<Dataset> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post('/api/datasets/upload', form);
  return data;
}

export async function listDatasets(): Promise<Dataset[]> {
  const { data } = await api.get('/api/datasets');
  return data.datasets || [];
}

export async function getDataset(id: string): Promise<Dataset> {
  const { data } = await api.get(`/api/datasets/${id}`);
  return data;
}

export async function deleteDataset(id: string): Promise<void> {
  await api.delete(`/api/datasets/${id}`);
}

export async function getKpis(id: string): Promise<KpiMetric[]> {
  const { data } = await api.get(`/api/datasets/${id}/kpis`);
  return data.kpis || [];
}

export async function getCharts(id: string): Promise<Record<string, ChartData>> {
  const { data } = await api.get(`/api/datasets/${id}/charts`);
  return data.charts || {};
}

export async function getProducts(id: string, sortBy = 'revenue', limit = 50): Promise<ProductRow[]> {
  const { data } = await api.get(`/api/datasets/${id}/products`, { params: { sort_by: sortBy, limit } });
  return data.products || [];
}

export async function getOpportunities(id: string): Promise<OpportunityItem[]> {
  const { data } = await api.get(`/api/datasets/${id}/opportunities`);
  return data.opportunities || [];
}

export async function generateInsights(
  id: string, type = 'full',
  localRows: any[] = [], localMeta: any[] = []
): Promise<AIInsight> {
  const { data } = await api.post(`/api/datasets/${id}/insights`, {
    analysis_type: type,
    local_rows: localRows,
    local_meta: localMeta,
  });
  return data;
}

export async function getInsights(id: string): Promise<AIInsight[]> {
  const { data } = await api.get(`/api/datasets/${id}/insights`);
  return data.insights || [];
}

export async function getForecastColumns(id: string): Promise<any> {
  try {
    const { data } = await api.get(`/api/datasets/${id}/forecast/columns`);
    return data;
  } catch {
    return null;
  }
}

export async function runForecast(id: string, dateCol: string, valueCol: string, periods = 30, includeHistory = true): Promise<any> {
  try {
    const { data } = await api.post(`/api/datasets/${id}/forecast`, {
      date_col: dateCol, value_col: valueCol, periods, seasonality: 'auto', include_history: includeHistory,
    });
    return data;
  } catch (err: any) {
    return { error: err?.response?.data?.detail || err.message || 'Forecast failed' };
  }
}

export async function getDatasetData(
  id: string, page = 1, perPage = 50, search = '', sortBy = 'product_name', sortDir = 'asc'
): Promise<{ data: any[]; columns: string[]; total: number; page: number; per_page: number }> {
  const { data } = await api.get(`/api/datasets/${id}/data`, {
    params: { page, per_page: perPage, search, sort_by: sortBy, sort_dir: sortDir },
  });
  return data;
}

export async function sendChatMessage(
  id: string, message: string, history: ChatMessage[] = [], provider = 'auto',
  openrouterKey = '', groqKey = '', openrouterModel = '', groqModel = ''
): Promise<{ reply: string; model_used: string; tokens_used: number; provider_tried: string }> {
  const { data } = await api.post(`/api/datasets/${id}/chat`, {
    message, history, provider,
    openrouter_key: openrouterKey, groq_key: groqKey,
    openrouter_model: openrouterModel, groq_model: groqModel,
  });
  return data;
}

export async function testConnection(
  provider: string, apiKey: string, modelId = ''
): Promise<{ success: boolean; error?: string; model_used?: string }> {
  const { data } = await api.post('/api/test-connection', {
    message: '', history: [], provider,
    openrouter_key: provider === 'openrouter' ? apiKey : '',
    groq_key: provider === 'groq' ? apiKey : '',
    openrouter_model: provider === 'openrouter' ? modelId : '',
    groq_model: provider === 'groq' ? modelId : '',
  });
  return data;
}

export default api;
