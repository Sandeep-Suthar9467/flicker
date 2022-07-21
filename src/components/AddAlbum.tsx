import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import Tooltip from '@mui/material/Tooltip';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import DoneIcon from '@mui/icons-material/Done';
const albumMock = [{
    name: 'Album 1',
    photos: [{
        id: '1',
        url: 'https://picsum.photos/200/400',
        author: 'User0789'
    },
    {
        id: '2',
        url: 'https://picsum.photos/200/500',
        author: 'User0789'
    }]
}, {
    name: 'Album 2',
    photos: [{
        id: '3',
        url: 'https://picsum.photos/200/200',
        author: 'User0789'
    },

    {
        id: '4',
        url: 'https://picsum.photos/200/300',
        author: 'User0789'
    },
    {
        id: '5',
        url: 'https://picsum.photos/200/300',
        author: 'User0789'
    }]
}]

const Photos = () => {
    const [selected, setSelected] = useState<String[]>([]);
    const addPhoto = (id: string) => {
        if(selected.includes(id)) {
            setSelected(selected.filter(item => item !== id));
            return;
        }
        setSelected([...selected, id]);
    }
    return (
        <>
            {
                <ImageList sx={{ width: '100%', height: '200px' }} cols={3}>
                    {albumMock.map((item, idx) => (
                        item.photos.map((photo, idx) => (
                            <ImageListItem key={idx}
                                onClick={() => addPhoto(photo.id)}
                                sx={{ width: 'auto' }}>
                                <img
                                    style={{ height: '80px' }}
                                    src={`${photo.url}?w=248&fit=crop&auto=format`}
                                    srcSet={`${photo.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt=""
                                    loading="lazy"
                                />
                                {
                                    selected.includes(photo.id) && (
                                        <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}
                                            position="bottom"
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'white' }}
                                                >
                                                    <DoneIcon />
                                                </IconButton>
                                            }
                                            actionPosition="left"
                                        />
                                    )
                                }
                            </ImageListItem>
                        ))
                    ))}
                </ImageList>

            }
        </>
    )
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid grey',
    boxShadow: 24,
    p: 4,
};

const AddAlbum = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Box display={"flex"} justifyContent="end">
                <Tooltip title="Add Album">
                    <IconButton color="primary"
                        onClick={handleOpen}
                        aria-label="upload picture" component="label">
                        <PlaylistAddCircleIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="form">
                        <div className="input-container">
                            <label>Album Name </label>
                            <input type="text" name="albumName" required />
                        </div>
                        <div className="input-container">
                            <label>Description </label>
                            <input type="text" name="description" required />
                        </div>
                        <div className='input-container'>
                            <Photos />
                        </div>
                        <div className="button-container">
                            <input type="submit" />
                        </div>
                    </div>
                </Box>

            </Modal>
        </>
    )
};

export default AddAlbum;