import { useEffect, useMemo, useState } from 'react';
import {
  ExternalLink,
  FileText,
  Info,
  Settings,
  Smartphone,
  Download,
} from 'lucide-react';

type Page = 'form' | 'settings';

const FORM_URL =
  'https://forms.monday.com/forms/embed/e72857ae9227d7f23bf3c445252a7de5?r=euc1';

function App() {
  const [page, setPage] = useState<Page>(() =>
    location.hash === '#settings' ? 'settings' : 'form',
  );
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const onHashChange = () => setPage(location.hash === '#settings' ? 'settings' : 'form');
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
    };
  }, []);

  const formConfigured = useMemo(() => !FORM_URL.includes('REPLACE_WITH_YOUR_FORM_URL'), []);

  const go = (next: Page) => {
    location.hash = next === 'settings' ? 'settings' : '';
    setPage(next);
  };

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    setInstallPrompt(null);
  };

  return (
    <div className="app-shell">
      <main className="content">
        {page === 'form' ? (
          <section className="form-page" aria-label="Lead form">
            {!formConfigured ? (
              <div className="configuration-warning">
                <strong>Form URL not configured</strong>
                <p>Add <code>VITE_FORM_URL</code> in Cloudflare Pages or replace the placeholder in <code>src/App.tsx</code>.</p>
              </div>
            ) : null}
            <iframe
              className="form-frame"
              src={FORM_URL}
              title="JKS New Leads form"
              loading="eager"
              allow="camera; microphone; clipboard-read; clipboard-write"
            />
          </section>
        ) : (
          <section className="settings-page">
            <header className="brand-header">
              <h1>JKS Group Leads</h1>
              <p>Version 1.0.0</p>
            </header>

            <div className="settings-card">
              <div className="card-title"><Download size={22} /> Install app</div>
              <p>Your browser will prompt when the app is ready to install. On Chrome or Edge, you can also use the browser menu and choose “Install app”.</p>
              {installPrompt ? (
                <button className="primary-button" onClick={install}><Smartphone size={18} /> Install app</button>
              ) : (
                <p className="hint">On iPhone: open in Safari, tap Share, then “Add to Home Screen”.</p>
              )}
            </div>

            <div className="settings-card">
              <div className="card-title"><ExternalLink size={22} /> Form fallback</div>
              <p>If the embedded form is not loading, open it directly in your browser.</p>
              <a className="secondary-button wide" href={FORM_URL} target="_blank" rel="noreferrer">
                <ExternalLink size={18} /> Open form directly
              </a>
            </div>

            <div className="settings-card">
              <div className="card-title"><Info size={22} /> About</div>
              <p>JKS Group Leads is a lightweight wrapper around the official JKS monday.com lead form. All submissions go directly to monday.com. This app does not store, copy or process submitted lead data.</p>
            </div>
          </section>
        )}
      </main>

      <nav className="bottom-nav" aria-label="Primary navigation">
        <button className={page === 'form' ? 'active' : ''} onClick={() => go('form')}>
          <FileText size={26} />
          <span>Form</span>
        </button>
        <button className={page === 'settings' ? 'active' : ''} onClick={() => go('settings')}>
          <Settings size={26} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
