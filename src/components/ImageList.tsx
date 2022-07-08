import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { FLICKER_API_KEY } from '../constant';
import { FlickerList } from '../types/flicker';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  const [itemData, setItemData] = useState<FlickerList>();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  useEffect(() => {
    fetch(
      `https://api.flickr.com/services/rest?extras=can_comment%2Ccan_print%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_sq%2Curl_q%2Curl_t%2Curl_s%2Curl_n%2Curl_w%2Curl_m%2Curl_z%2Curl_c%2Curl_l&per_page=50&page=1&date=2022-07-04&viewerNSID=&method=flickr.interestingness.getList&csrf=&api_key=${FLICKER_API_KEY}&format=json&hermes=1&hermesClient=1&reqId=e3ac1f6f-c3a5-463f-8ce0-8c6fc9b94433&nojsoncallback=1`)
                  .then((res) => res.json())
                  .then((json) => {
                    setItemData(json)
      });
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
