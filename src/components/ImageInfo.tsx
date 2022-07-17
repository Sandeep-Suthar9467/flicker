import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImage } from "../reducer";
import { State } from "../types/redux";
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from "react-router-dom";
// import { Card, CardHeader } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import photo from "./imagedetails";
export default function ImageInfo() {
  const itemData = useSelector((state:State) => state.flicker.imageInfo).photo
  // const itemData = photo[0].photo;
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  // const owner = params.owner
  useEffect(() => {
    dispatch(fetchImage(id));
  }, []);
  console.log(itemData);
  if (!itemData || !Object.keys(itemData).length )
    return (
      <>
        <h1>no Data</h1>
      </>
    );
  return (
    <>
      <section className="slider">
        <div className="slide active">
          <img
            src={itemData?.HTMLMETA["og:image"]}
            alt="travel image"
            className="image"
          />
        </div>
      </section>
      <section>
        <div className="user">
          <div className="userdetails">
            <div className="profile">
              <img
                src={itemData.owner.iconurls.retina}
                height={40}
                width={40}
                className="profile_img"
              />
            </div>
            <div className="user_title">
              <div>{itemData.owner.username}</div>
              <div>{itemData.HTMLMETA["og:title"]}</div>
              <p className="description">
                {itemData.HTMLMETA["og:description"]}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
