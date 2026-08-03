import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import $ from "jquery";

(window).$ = $;
(window).jQuery = $;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
