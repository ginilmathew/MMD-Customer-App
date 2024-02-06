import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

// Optional, if using Reactotron:
// import Reactotron from 'reactotron-react-native';

export function useAppState() {
  const [appState, setAppState] = useState('active');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, []);

  return appState;
}