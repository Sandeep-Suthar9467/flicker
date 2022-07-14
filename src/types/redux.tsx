import { FlickerList } from "./flicker";

export type State = {
    flicker: {
      loading: boolean;
      images: FlickerList;
    }
};
