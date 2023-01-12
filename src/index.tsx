import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Container, createTheme, NextUIProvider, getDocumentTheme } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  BrowserRouter
} from "react-router-dom"
import { MapProvider } from 'react-map-gl';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green100',
      link: '#4ADE7B',

      gradient: 'linear-gradient(112deg, $green700 -25%, $green600 -10%, $green500 80%)',

    },
    fonts: {
      sans: 'Quicksand',
      mono: 'Josefin Sans'
    }
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green100',
      link: '#4ADE7B',
      selection: '$accents5'
    },
    fonts: {
      sans: 'Quicksand',
      mono: 'Josefin Sans'
    }
  }
})


root.render(
  <React.StrictMode>

    <NextUIProvider theme={lightTheme}>
      <BrowserRouter >
        <MapProvider>
          <App />
        </MapProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
