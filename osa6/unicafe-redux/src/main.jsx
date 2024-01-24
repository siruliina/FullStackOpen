import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const handleClick = (type) => {
    if (type == 'good') {
      store.dispatch({
        type: 'GOOD'
      })
    }

    if (type == 'ok') {
      store.dispatch({
        type: 'OK'
      })
    }

    if (type == 'bad') {
      store.dispatch({
        type: 'BAD'
      })
    }

    if (type == 'zero') {
      store.dispatch({
        type: 'ZERO'
      })
    }
  }

  return (
    <div>
      <button onClick={() => handleClick('good')}>good</button> 
      <button onClick={() => handleClick('ok')}>ok</button> 
      <button onClick={() => handleClick('bad')}>bad</button>
      <button onClick={() => handleClick('zero')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
