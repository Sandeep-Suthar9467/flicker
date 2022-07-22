import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import ImageList from '../components/ImageList'
import Pagination  from '../components/Pagination';
import { State } from '../types/redux';

const Explore = (): ReactElement => {
  const itemData = useSelector((state:State) => state.flicker.images)
  return (
    <>
      <div style={{display: 'flex' , justifyContent: 'center'}}>
      <ImageList/>

      </div>
      <div style={{display: 'flex' , justifyContent: 'center',marginBottom: 10}}>

      {
        !itemData || !itemData.photos?.photo?.length ?
        null : <Pagination />
      }
      </div>

    </>
  );
}

export default Explore;
