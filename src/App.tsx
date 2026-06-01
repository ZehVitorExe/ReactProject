//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import pokeApiLogo from './assets/pokeapiLogo.png'
import RMApiLogo from './assets/RickAndMortyAPILogo.png'
 
import './App.css'

function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Lista de APIs</h1>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="pokeApi">
          <img className="logo" src={pokeApiLogo} alt="" />
          <h2>PokeAPI</h2>
          <p>APi de Pokemon </p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
          </ul>
        </div>
        <div id="RMApi">
          <img className="logo" src={RMApiLogo} alt="" />
          <h2>Rick and Morty API</h2>
          <p>APi de Rick and Morty </p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
