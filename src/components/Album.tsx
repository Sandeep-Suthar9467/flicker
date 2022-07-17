import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddAlbum from './AddAlbum';

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
    return (
        <>
            <AddAlbum />
            {
                <ImageList sx={{ width: 300, height: 200 }}>
                    {albumMock.map((item, idx) => (
                        <ImageListItem key={idx}>
                            <img
                                src={`${item.photos[0].url}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.photos[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt=""
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.name}
                                subtitle={`Photos: ${item.photos.length}`}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

            }
        </>
    )
}

export default Album;
