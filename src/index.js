import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import VerbDrillContainer from './Components/VerbDrillContainer'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<VerbDrillContainer dataUrl='https://frenchverbs.firebaseio.com/'/>, document.getElementById('root'))
registerServiceWorker()
