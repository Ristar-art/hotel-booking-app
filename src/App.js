
import './App.css'
import {Routes,Route} from 'react-router-dom'
import { Navbar } from './Components/Navbar/Navbar';

import { About } from './Pages/About/About';
import SignUp from './Components/SignUp/signUp';
import Login from './Components/Login/logIn';

import RoomDescriptionPage from './Pages/RoomDiscreption/roomDiscreption';
import { Home } from './Pages/Home/Home';
import AvailableRooms from './Pages/AvaulableRoom/availableRoom';
import AdminPanel from './Pages/Admin/adminPanel';
import Success from './Pages/success';
import Cancel from './Pages/cancel';
import Gallery from './Pages/Gallery/gallery';

  function App() {
  return (
   
      <div>
      <Navbar/>
         <Routes>
           <Route path = '/' element ={<Home/>}></Route>
           <Route path = '/about' element ={<About/>}></Route>
           <Route path = '/singup' element ={<SignUp/>}></Route> 
           <Route path = '/login' element ={<Login/>}></Route>
           <Route path = '/gallery' element ={<Gallery/>}></Route>
           <Route path="/available-rooms" element={<AvailableRooms/>} />
           <Route path="/room/:roomNumber" element={<RoomDescriptionPage/>} />
           <Route path="/admin" element={<AdminPanel/>} />
           <Route path="/success" element={<Success/>} />
           <Route path="/cancel" element={<Cancel/>} />

           {/* <Route path = '/todolist' element ={<RequreAuth><TodoList/></RequreAuth>}></Route>           */} 
          </Routes>
        
      </div>
 
    
  ) 
}

export default App;