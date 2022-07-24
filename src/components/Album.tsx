import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useSelector } from 'react-redux';
import { State } from '../types/redux';
import AddAlbum from './AddAlbum';
import Loading from './Loading';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { AlbumPhoto } from '../types/album';

type PhotoProps = {
    open: boolean;
    handleClose: any;
    photos: AlbumPhoto;
    name: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '48%',
    bgcolor: 'background.paper',
    border: '2px solid grey',
    boxShadow: 24,
    p: 4,
};
const ViewAlbumPhoto = ({ open, handleClose, photos, name }: PhotoProps) => {
    console.log(open)
    return (
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1>{name}</h1>
                    <Box display={'flex'} justifyContent="space-evenly" flexWrap={'wrap'}>
                    {
                        photos.map((photo) => (
                            <img
                                    src={`${photo.url}`}
                                    srcSet={`${photo.url}`}
                                    alt=""
                                    loading="lazy"
                                    style={{height: '200px', width: '300px'}}
                                />
                        ))
                    }
                    </Box>
                </Box>
            </Modal>
    )
}
const Album = () => {
    const { loading, albumsInfo } = useSelector((state: State) => state.flicker)
    const [open, setOpen] = useState('');
    const handleOpen = (idx: string) => {setOpen(idx); console.log(idx)};
    const handleClose = () => setOpen('');
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
                                <>
                                <ViewAlbumPhoto open={open === album.name} 
                                name={album.name}
                            photos={album.photos}
                            handleClose={handleClose} />
                                <ImageListItem key={idx}>
                                <img
                                    onClick={() => handleOpen(album.name)}
                                    src={`${album.photos[0].url}`}
                                    srcSet={`${album.photos[0].url}`}
                                    alt=""
                                    loading="lazy"
                                    style={{height: '200px', width: '300px'}}
                                />
                                <h1>{open}</h1>
                                <ImageListItemBar
                                    title={album.name}
                                    subtitle={`Photos: ${album.photos.length}`}
                                />
                            </ImageListItem>
                            </>
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
