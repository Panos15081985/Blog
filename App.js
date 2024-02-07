import './App.css';
import Blog from './components/Blog';
import Article from './components/Article';
import Admin from './components/Admin';
import Adminpage from './components/Adminpage';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Blog/>}/>
      <Route path='Article' element={<Article/>}/>
      <Route path='Admin' element={<Admin/>}/>
      <Route path='Adminpage' element={<Adminpage/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
