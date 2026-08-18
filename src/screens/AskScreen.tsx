import { useNavigation } from '../context/NavigationContext';
import { useReading } from '../context/ReadingContext';
import { MASTERS } from '../data/masters';
import { QUESTION_CHIPS, stripEmoji } from '../data/questionChips';
import { Button } from '../components/ui/Button';
import { BackLink } from '../components/ui/BackLink';
import { Chip } from '../components/ui/Chip';
import { Panel } from '../components/ui/Panel';
import { Steps } from '../components/ui/Steps';
import { SectionTitle } from '../components/ui/SectionTitle';
import { MasterOption } from '../components/tarot/MasterOption';
import styles from './AskScreen.module.css';

export function AskScreen() {
  const { navigate } = useNavigation();
  const { question, setQuestion, masterName, setMaster } = useReading();

  return (
    <>
      <Steps total={4} current={1} />
      <SectionTitle center subtitle="越具体的问题,越能得到清晰的指引">
        此刻,你想问些什么?
      </SectionTitle>

      <Panel className={styles.panel}>
        <textarea
          className={styles.textarea}
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如:我该接受这份新的工作机会吗?我和 TA 的关系会走向何方?"
        />

        <div className={styles.chips}>
          {QUESTION_CHIPS.map((chip) => (
            <Chip key={chip} onClick={() => setQuestion(stripEmoji(chip))}>
              {chip}
            </Chip>
          ))}
        </div>

        <h4 className={styles.masterTitle}>选择你的塔罗师</h4>
        <div className={styles.masters}>
          {MASTERS.map((m) => (
            <MasterOption
              key={m.name}
              master={m}
              selected={masterName === m.name}
              onSelect={() => setMaster(m.name)}
            />
          ))}
        </div>
      </Panel>

      <div className={styles.actions}>
        <BackLink onClick={() => navigate('home')}>← 返回</BackLink>
        <Button onClick={() => navigate('spread')}>下一步:选择牌阵 →</Button>
      </div>
    </>
  );
}
