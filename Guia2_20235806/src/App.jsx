import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Footer} from './Components/Footer'
import { Header } from './Components/Header'
import { db } from './data/db'
import { Guitar } from './Components/Guitar'

function App() {

  const [data, setData]=useState(db)
  const [cart, setCar]=useState([])

  return (
    <>

    <Header/>
    <main className="container-xl mt-5">
        <h2 className=" text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=> <Guitar guitar={guitar} key={guitar.id} setCar={setCar}/>)}
            
        </div>
    </main>
    <Footer/>
    </>
  )
}

export default App
