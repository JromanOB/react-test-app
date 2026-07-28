import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import $ from "jquery";

(window).$ = $;
(window).jQuery = $;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-table/dist/bootstrap-table.min.css";
import App from './App.jsx'
import MyTable from './modules/Product/Components/BootstrapTable/ProductsBootstrapTable'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
