import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImage } from "../reducer";
import { State } from "../types/redux";
import { useParams } from "react-router-dom";

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
            src={itemData?.sizes?.size[8].source}
            alt="travel"
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
                alt=""
              />
            </div>
            <div className="user_title">
              <div>{itemData.owner.username}</div>
              <div>{itemData.title?._content}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
