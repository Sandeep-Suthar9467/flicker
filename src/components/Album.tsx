import { Box } from "@mui/material"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import Tooltip from '@mui/material/Tooltip';

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
            <Box display={"flex"} justifyContent="end">
                <Tooltip title="Add Album">
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <PlaylistAddCircleIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
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
