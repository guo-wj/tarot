import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { ChatMessage, DrawnCard } from '../../types';
import { useReading } from '../../context/ReadingContext';
import { useHistory } from '../../context/HistoryContext';
import { useTypewriter } from '../../hooks/useTypewriter';
import { masterStyle } from '../../data/masters';
import { positionsOf, spreadByCount } from '../../data/spreads';
import { postTarotChat, toTarotCards } from '../../lib/tarotApi';
import { TIMING } from '../../lib/constants';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import styles from './FollowUpChat.module.css';

interface FollowUpChatProps {
  cards: DrawnCard[];
}

const QUICK_ASKS = ['我现在最该做的一件事是什么?', '这张牌的逆位是什么意思?'];

/** 解读后的追问对话区 */
export function FollowUpChat({ cards }: FollowUpChatProps) {
  const { question, masterName, spread } = useReading();
  const { addRecord } = useHistory();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** 正在逐字打字的助手回复；为 null 时无待打字内容 */
  const [pendingReply, setPendingReply] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const { display, done } = useTypewriter(pendingReply ?? '', TIMING.chatChar);
  const bottomRef = useRef<HTMLDivElement>(null);
  const busy = loading || pendingReply !== null;

  // 打字完成后，将回复正式并入消息列表
  useEffect(() => {
    if (pendingReply !== null && done) {
      setMessages((prev) => [...prev, { role: 'assistant', text: pendingReply }]);
      setPendingReply(null);
    }
  }, [pendingReply, done]);

  // 新消息滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, display, loading]);

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const history = messages;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setError(null);
    setLoading(true);

    void postTarotChat({
      question,
      master_name: masterName,
      master_style: masterStyle(masterName),
      spread_title: spreadByCount(spread).title,
      cards: toTarotCards(cards, positionsOf(spread)),
      history,
      user_message: trimmed,
    })
      .then((reply) => setPendingReply(reply))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : '回复失败，请稍后再试');
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const handleSave = () => {
    setSaved(true);
    addRecord({ question, masterName, cardCount: cards.length, date: '刚刚' });
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', text: '✨ 已保存到你的解读历史,我会记住这个主题。' },
    ]);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.msg} ${styles[msg.role]}`}>
            <div className={styles.bubble}>{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className={`${styles.msg} ${styles.assistant}`}>
            <div className={`${styles.bubble} ${styles.loading}`}>
              让我再看一眼牌面
              <span className={styles.cursor} />
            </div>
          </div>
        )}
        {pendingReply !== null && (
          <div className={`${styles.msg} ${styles.assistant}`}>
            <div className={styles.bubble}>
              {display}
              <span className={styles.cursor} />
            </div>
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
        <div ref={bottomRef} />
      </div>

      <form className={styles.bar} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="继续追问,例如:那我该主动一点吗?"
          disabled={busy}
        />
        <Button type="submit" small disabled={busy}>
          发送
        </Button>
      </form>

      <div className={styles.quick}>
        {QUICK_ASKS.map((q) => (
          <Chip key={q} onClick={() => ask(q)} disabled={busy}>
            {q === QUICK_ASKS[0] ? '我最该做的一件事?' : '逆位是什么意思?'}
          </Chip>
        ))}
        <Chip onClick={handleSave} disabled={saved || busy}>
          💾 {saved ? '已保存' : '保存这次解读'}
        </Chip>
      </div>
    </div>
  );
}
