import App from './App';
import './css/App.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ConfigProvider direction="rtl">
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </StrictMode>,
);
