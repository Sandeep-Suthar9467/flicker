import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useSelector } from 'react-redux';
import { State } from '../types/redux';
import AddAlbum from './AddAlbum';
import Loading from './Loading';

const Album = () => {
    const { loading, albumsInfo } = useSelector((state: State) => state.flicker)
    if(loading) {
        return <Loading />
    }
    return (
        <>
            <AddAlbum />
            {
                albumsInfo?.length ?
                <ImageList style={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                         albumsInfo?.map((album, idx) => {
                            return (
                                <ImageListItem key={idx}>
                                <img
                                    src={`${album.photos[0].url}`}
                                    srcSet={`${album.photos[0].url}`}
                                    alt=""
                                    loading="lazy"
                                    style={{height: '200px', width: '300px'}}
                                />
                                <ImageListItemBar
                                    title={album.name}
                                    subtitle={`Photos: ${album.photos.length}`}
                                />
                            </ImageListItem>
                            )
                        })
                    }
                </ImageList>
                : <div>Create a new Album</div>
            }
        </>
    )
}

export default Album;
