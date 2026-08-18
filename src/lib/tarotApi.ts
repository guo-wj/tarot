import type { DrawnCard, InterpretBlock } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export interface TarotCardPayload {
  name: string;
  en_name: string;
  is_reversed: boolean;
  position: string;
  upright: string;
  reversed_meaning: string;
}

export interface TarotChatTurn {
  role: 'user' | 'assistant';
  text: string;
}

export interface TarotInterpretBody {
  question: string;
  master_name: string;
  master_style: string;
  spread_title: string;
  cards: TarotCardPayload[];
}

export interface TarotChatBody extends TarotInterpretBody {
  history: TarotChatTurn[];
  user_message: string;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function parseDetail(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const detail = (data as { detail?: unknown }).detail;
  if (typeof detail === 'string') return detail;
  return null;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError('网络请求失败，请确认 yi-back-end 已启动', 0);
  }

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new ApiError(parseDetail(data) ?? `请求失败（${res.status}）`, res.status);
  }
  return data as T;
}

/** 把抽出的牌转成后端 /api/tarot 入参 */
export function toTarotCards(cards: DrawnCard[], positions: string[]): TarotCardPayload[] {
  return cards.map((card, i) => ({
    name: card.name,
    en_name: card.enName,
    is_reversed: card.isReversed,
    position: positions[i] ?? `第${i + 1}张`,
    upright: card.upright,
    reversed_meaning: card.reversed,
  }));
}

/** AI 牌阵解读 */
export async function postTarotInterpret(body: TarotInterpretBody): Promise<string> {
  const data = await postJson<{ interpretation?: unknown }>('/api/tarot/interpret', body);
  if (typeof data.interpretation !== 'string' || !data.interpretation.trim()) {
    throw new ApiError('返回数据格式异常', 200);
  }
  return data.interpretation.trim();
}

/** 解读后的多轮追问 */
export async function postTarotChat(body: TarotChatBody): Promise<string> {
  const data = await postJson<{ reply?: unknown }>('/api/tarot/chat', body);
  if (typeof data.reply !== 'string' || !data.reply.trim()) {
    throw new ApiError('返回数据格式异常', 200);
  }
  return data.reply.trim();
}

/**
 * 把后端 Markdown 解读拆成现有解读区块。
 * 「开场」无小标题，其余 ## 作为 heading。
 */
export function parseInterpretation(markdown: string): InterpretBlock[] {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\r\n/g, '\n')
    .trim();
  if (!text) return [];

  const startsWithHeading = /^##\s+/.test(text);
  const chunks = text.split(/^##\s+/m);
  const blocks: InterpretBlock[] = [];

  chunks.forEach((chunk, index) => {
    const trimmed = chunk.trim();
    if (!trimmed) return;

    const isBareLead = index === 0 && !startsWithHeading;
    if (isBareLead) {
      blocks.push({
        type: 'paragraph',
        segments: [{ text: trimmed.replace(/\n+/g, '').replace(/\*+/g, '') }],
      });
      return;
    }

    const nl = trimmed.indexOf('\n');
    const heading = (nl === -1 ? trimmed : trimmed.slice(0, nl)).trim();
    const body = (nl === -1 ? '' : trimmed.slice(nl + 1)).trim().replace(/\n+/g, '');
    const isOpening = heading === '开场' || heading.startsWith('开场');

    if (!isOpening && heading) {
      blocks.push({ type: 'heading', text: heading.replace(/\*+/g, '') });
    }
    const paragraph = isOpening ? (body || heading.replace(/^开场\s*/, '')) : body;
    if (paragraph) {
      blocks.push({
        type: 'paragraph',
        segments: [{ text: paragraph.replace(/\*+/g, '') }],
      });
    }
  });

  if (blocks.length === 0) {
    blocks.push({ type: 'paragraph', segments: [{ text }] });
  }
  return blocks;
}
