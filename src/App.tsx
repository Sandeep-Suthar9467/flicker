import { ReactElement } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import ImageList from './components/ImageList'
import Pagination  from './components/Pagination';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from "react-router-dom";
import ImageInfo from './components/ImageInfo';

const App = (): ReactElement => {
  return (
    <Router>
    {/* <div className="App">
      <Navbar />
      <div style={{display: 'flex' , justifyContent: 'center'}}>
      <ImageList/>
      </div>
      <div style={{display: 'flex' , justifyContent: 'center',marginBottom: 10}}>
      <Pagination />
      </div>
    </div> */}
    <div className="App">
      <Navbar />
      
      <Routes >
       <Route path="/photos/:id/:owner" element={<ImageInfo/>}/>
          
          <Route path="/" element ={            

          
          <div><div style={{ display: 'flex', justifyContent: 'center' }}>
              <ImageList />

            </div><div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                <Pagination />
              </div>
            </div> 
            
              } />
           
        </Routes >
</div>
    </Router>

  );
}

export default App;
