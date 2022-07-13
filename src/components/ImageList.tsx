/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../reducer';
import { State } from '../types/redux';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  const itemData = useSelector((state:State) => state.flicker.images)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchImages('1'));
  }, []); 

  if( !itemData || !itemData.photos?.photo?.length) return <><h1>no Data</h1></>;
  return (
    <ImageList
      sx={{ width: '80%'  }}
      variant="quilted"
      cols={matches ? 4 : 2}
      rowHeight={121}
      
    >
      {itemData.photos.photo?.map((item) => (
        <ImageListItem key={item.title} cols={1} rows={1} className="containerImg">
          <img
            {...srcset(item.url_w, 121)}
            alt={item.title}
            loading="lazy"
          />
          <div className="middle">
            <div className="text">
              <Box display={"flex"} alignItems="center" color={"#fff"}>
                <StarBorderIcon htmlColor="#fff"/>
                <div>{item.count_faves}</div>
              </Box>
              <Box display={"flex"} alignItems="center" color={"#fff"} marginLeft="5px">
                <CommentIcon htmlColor="#fff"/>
                <div>{item.count_comments}</div>
              </Box>
            </div>
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
