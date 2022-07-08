import { ReactElement } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import ImageList from './components/ImageList'
import Pagination  from './components/Pagination';

const App = (): ReactElement => {
  return (
    <div className="App">
      <Navbar />
      <div style={{display: 'flex' , justifyContent: 'center'}}>
      <ImageList/>

      </div>
      <div style={{display: 'flex' , justifyContent: 'center',marginBottom: 10}}>

      <Pagination />
      </div>

    </div>
  );
}

export default App;
