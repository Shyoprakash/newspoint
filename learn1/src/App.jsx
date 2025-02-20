//import React, { useEffect } from 'react'
import Navbar from './Componets/Navbar'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import '@mantine/core/styles.css';
import Reg from './pages/Reg';
//import { useSelector, useDispatch } from 'react-redux';
import Preferences from './pages/Preferences';
import { Toaster } from 'sonner';
// import { increment } from '../src/redux/slice/counterSlice';
//import { fetchProduct } from './redux/slice/productSlice';

function App() {
  // const {loading , products} = useSelector((state)=>state.product)
  // console.log(loading,products)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchProduct());
  // }, []);

  // const {count} = useSelector((state)=>state.count);
  //const dispatch = useDispatch() ;
  
  return (
    <div>
      <Navbar/>

      
      <Toaster/>
      <Preferences/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Reg/>}/>
      </Routes>
      {/* <p>{count}</p>
      <button onClick={()=> dispatch(increment())}>increment</button> */}

    </div>
  )
}

export default App   


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// import React, { useEffect } from 'react'
// import Navbar from './Componets/Navbar'
// import { Routes, Route } from 'react-router-dom'
// import Login from './pages/Login'
// import '@mantine/core/styles.css'
// import Reg from './pages/Reg'
// import { useSelector } from 'react-redux'
// import ColorChanger from './pages/ColorChanger'

// function App() {
//   // ✅ Default color agar Redux state empty ho
//   const color = useSelector((state) => state.color?.color || "white") 

//   useEffect(() => {
//     document.body.style.backgroundColor = color // ✅ Direct `body` ka background change ho raha hai
//   }, [color])

//   return (
//     <>
//       <Navbar />
//       <ColorChanger />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Reg />} />
//       </Routes>
//     </>
//   )
// }

// export default App


