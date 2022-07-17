import { ReactElement } from 'react';
import ImageList from '../components/ImageList'
import Pagination  from '../components/Pagination';

const Explore = (): ReactElement => {
  return (
    <>
      <div style={{display: 'flex' , justifyContent: 'center'}}>
      <ImageList/>

      </div>
      <div style={{display: 'flex' , justifyContent: 'center',marginBottom: 10}}>

      <Pagination />
      </div>

    </>
  );
}

export default Explore;
