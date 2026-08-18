import { NavigationProvider } from './context/NavigationContext';
import { ReadingProvider } from './context/ReadingContext';
import { HistoryProvider } from './context/HistoryContext';
import { Starfield } from './components/layout/Starfield';
import { TopBar } from './components/layout/TopBar';
import { MobileNav } from './components/layout/MobileNav';
import { Screen } from './components/layout/Screen';
import { HomeScreen } from './screens/HomeScreen';
import { AskScreen } from './screens/AskScreen';
import { SpreadScreen } from './screens/SpreadScreen';
import { DrawScreen } from './screens/DrawScreen';
import { ResultScreen } from './screens/ResultScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import styles from './App.module.css';

export default function App() {
  return (
    <NavigationProvider>
      <ReadingProvider>
        <HistoryProvider>
          <Starfield />
          <div className={styles.app}>
            <TopBar />

            <Screen id="home">
              <HomeScreen />
            </Screen>
            <Screen id="ask">
              <AskScreen />
            </Screen>
            <Screen id="spread">
              <SpreadScreen />
            </Screen>
            <Screen id="draw">
              <DrawScreen />
            </Screen>
            <Screen id="result">
              <ResultScreen />
            </Screen>
            <Screen id="library">
              <LibraryScreen />
            </Screen>
            <Screen id="history">
              <HistoryScreen />
            </Screen>
          </div>
          <MobileNav />
        </HistoryProvider>
      </ReadingProvider>
    </NavigationProvider>
  );
}
