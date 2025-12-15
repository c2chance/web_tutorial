import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UseAhooksuseBoolean from './UseAhooksuseBoolean.tsx'
//import UserProfile from './UserProfile.tsx'
import AhooksuseRequestDemoFunc from './ahooks-userequest-demo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <UseAhooksuseBoolean />
    {/*<UserProfile />*/}
    <AhooksuseRequestDemoFunc />
  </StrictMode>,
)
