import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import FirebaseImageUpload from './UploadPage/Uploadpage'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
    <ToastContainer/>
  </BrowserRouter>
)
