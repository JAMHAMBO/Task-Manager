import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Body from './components/Body.jsx';

function App() {

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then(response => response.json())
      .then(data => console.log(data));

  }, [])


  return (
    <>
    <Header/>
    <Body/>
    </>
  )
}

export default App
