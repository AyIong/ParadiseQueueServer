import { createRoot, type Root } from 'react-dom/client';
import './styles/main.scss';
import { App } from './App.tsx';

let reactRoot: Root | null = null;

document.onreadystatechange = () => {
  if (document.readyState !== 'complete') return;

  if (!reactRoot) {
    const root = document.getElementById('react-root');
    reactRoot = createRoot(root!);
  }

  reactRoot.render(<App />);
};
