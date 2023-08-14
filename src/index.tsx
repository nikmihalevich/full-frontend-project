import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import { ThemeProvider } from './app/providers/ThemeProvider';
import './shared/config/i18n/i18n';
import '@/app/styles/index.scss';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать React-приложение.');
}

const root = createRoot(container);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
