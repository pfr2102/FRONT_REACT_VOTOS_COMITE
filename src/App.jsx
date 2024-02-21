import React from 'react'
import { Button } from 'semantic-ui-react'
import {ToastContainer} from 'react-toastify'
import {Navigation} from './routes'
import './App.scss'
import {ClientLayout} from './layouts'
import { AuthProvider } from './context';

export const App = () => {
  return (
    <>
    <AuthProvider>
        <Navigation />
        {/* es para los mensajes de alerta pequeños */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          //theme="colored"
        />
      </AuthProvider>
    </>
  )
}

export default App;