import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header, Page, ServerCard, Servers } from './components';
import { useMockServersService } from './servers-services';

function ServersPage() {
  const { servers } = useMockServersService();
  return (
    <Servers>
      {servers.map((server) => (
        <ServerCard key={server.name} {...server} />
      ))}
    </Servers>
  );
}

export function App() {
  return (
    <Page>
      <Header title="SS220 - Лобби" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ServersPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Page>
  );
}
