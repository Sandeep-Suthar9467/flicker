import { call, put, takeLatest, all } from 'redux-saga/effects'
import { FLICKER_API_KEY } from '../constant';
import { fetchImage, fetchImages, onSuccessImage, onSuccessImages } from "../reducer";
import { Explore, FlickerList, Photos } from '../types/flicker';

const callApi = (page: string): Promise<FlickerList> => {
   return fetch(
      `https://api.flickr.com/services/rest?extras=can_comment%2Ccan_print%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_sq%2Curl_q%2Curl_t%2Curl_s%2Curl_n%2Curl_w%2Curl_m%2Curl_z%2Curl_c%2Curl_l&per_page=50&page=${page}&method=flickr.interestingness.getList&csrf=&api_key=${FLICKER_API_KEY}&format=json&nojsoncallback=1`)
      .then((res) => res.json())
      .then((json) => {
         console.log(json);
         return json;
      });
}
const callImageApi = (id: string): Promise<Photos> => {
   return fetch(
      `https://api.flickr.com/services/rest?extras=sizes,icon_urls,comment,og:title,og:description&photo_id=${id}&method=flickr.photos.getInfo&api_key=${FLICKER_API_KEY}&format=json&nojsoncallback=1`)
      .then((res) => res.json())
      .then((json) => {
         return json;
      });
}
function* fetchImagesSaga(action: Explore) {
   try {
      const user: FlickerList = yield call(callApi, action.payload);
      yield put(onSuccessImages(user));
   } catch (e) {
      console.log(e);
   }
}
function* fetchImageSaga(action: Explore) {
   try {
      const photo: Photos = yield call(callImageApi, action.payload);
      yield put(onSuccessImage(photo));
   } catch (e) {
      console.log(e);
   }
}
function* mySaga() {
   yield all([takeLatest(fetchImages.type, fetchImagesSaga),
   takeLatest(fetchImage.type, fetchImageSaga)
   ]);
}

export default mySaga;
