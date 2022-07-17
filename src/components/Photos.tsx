import { Box } from "@mui/material"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const albumMock = [{
    name: 'Album 1',
    photos: [{
        url: 'https://picsum.photos/200/400',
        author: 'User0789'
    },
    {
        url: 'https://picsum.photos/200/500',
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

const Photos = () => {
    return (
        <>
            <Box display={"flex"} justifyContent="end">
                <Tooltip title="Upload Photo">
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <FileUploadIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
            {
                <ImageList sx={{ width: '100%', height: '200px' }} cols={4}>
                    {albumMock.map((item, idx) => (
                        item.photos.map((photo, idx) => (
                            <ImageListItem key={idx} sx={{ width: 260 }}>
                                <img
                                    style={{ height: '200px' }}
                                    src={`${photo.url}?w=248&fit=crop&auto=format`}
                                    srcSet={`${photo.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt=""
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))
                    ))}
                </ImageList>

            }
        </>
    )
}

export default Photos;
