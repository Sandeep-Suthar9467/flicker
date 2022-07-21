import { Album } from "./album";
import { FlickerList } from "./flicker";

export type State = {
    flicker: {
      loading: boolean;
      images: FlickerList;
      imageInfo: any;
      isLoggedIn: boolean;
      comments: any;
      albumsInfo: Album | undefined
    }
};
