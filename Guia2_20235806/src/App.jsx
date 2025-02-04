import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Footer} from './Components/Footer'
import { Header } from './Components/Header'
import { db } from './data/db'
import { Guitar } from './Components/Guitar'

function App() {

  function initialCart()
  {
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart): []
  }

  const [data, setData]=useState(db)
  const [cart, setCart] = useState(initialCart);

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  function addToCart(guitar)
    {
      const itemIndex=cart.findIndex((item)=>guitar.id===item.id)
      console.log(itemIndex);
      if(itemIndex===-1)//No existe este articulo en el carrito
      {
        guitar.quantity=1;
        setCart([...cart, guitar])
      }
      else //si la guitarra ya se habia añadido al carrito
      {
        const updatedCart=[...cart] //Creando una copia de la variable state
        updatedCart[itemIndex].quantity++;
        setCart(updatedCart);

      }
    }

    function increaseQuantity(id) 
    {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  
    function decreaseQuantity(id) 
    {
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      );
    }

    function removeFromCart(id) 
    {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }

    function clearCart() 
    {
      setCart([]);
    }
    

    function calculateTotal()
    {
      /*let total=0;
      for (const guitar of cart)
      {
        total+=guitar.price*guitar.quantity;
      }*/
      let total=cart.reduce((total, item)=>total+item.price*item.quantity,0)

      return total;
    }

    return (
    <>

  <Header cart={cart} total={calculateTotal()} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} clearCart={clearCart}/>

    <main className="container-xl mt-5">
        <h2 className=" text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=> <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart}/>)}
            
        </div>
    </main>
    <Footer/>
    </>
  )
}

export default App
