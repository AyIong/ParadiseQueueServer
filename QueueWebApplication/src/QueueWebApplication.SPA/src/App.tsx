import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header, Page, Servers } from './components';

export function App() {
  return (
    <Page>
      <Header title={`Добро пожаловать на SS220!`} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Servers />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Page>
  );
}
