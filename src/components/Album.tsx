import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumDetails } from '../reducer';
import { State } from '../types/redux';
import AddAlbum from './AddAlbum';
import Loading from './Loading';

const albumMock = [{
    name: 'Album 1',
    photos: [{
        url: 'https://picsum.photos/200',
        author: 'User0789'
    },
    {
        url: 'https://picsum.photos/200',
        author: 'User0789'
    }]
}, {
    name: 'Album 2',
    photos: [{
        url: 'https://picsum.photos/200/200',
        author: 'User0789'
    },
    {
        url: 'https://picsum.photos/200/300',
        author: 'User0789'
    }]
}]

const Album = () => {
    const dispatch = useDispatch();
    const { loading, albumsInfo } = useSelector((state: State) => state.flicker)
    useEffect(() => {
        dispatch(fetchAlbumDetails());
    }, []);
    if(loading) {
        return <Loading />
    }
    return (
        <>
            <AddAlbum />
            {
                albumsInfo?.photosets?.photoset ?
                <ImageList sx={{ width: 300, height: 200 }}>
                    {
                         albumsInfo?.photosets?.photoset?.map((album, idx) => {
                            return (
                                <ImageListItem key={idx}>
                                <img
                                    src={`${album.coverphoto_url.h}?w=248&fit=crop&auto=format`}
                                    srcSet={`${album.coverphoto_url.h}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt=""
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={album.title._content}
                                    subtitle={`Photos: ${album.count_photos}`}
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
