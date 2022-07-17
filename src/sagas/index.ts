import { call, put, takeLatest,all } from 'redux-saga/effects'
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
   console.log(id)
   return fetch(
// `https://api.flickr.com/services/rest?photo_id=${id}&viewerNSID=&method=flickr.photos.getHtmlMeta&csrf=&api_key=0809600f91ad7cc31a42f27af432152a&format=json&hermes=1&hermesClient=1&reqId=ef66d6cb-4ad0-4983-bad6-f889fbf76fc0&nojsoncallback=1`)                   
`https://api.flickr.com/services/rest?datecreate=1&extras=sizes%2Cicon_urls%2Cignored%2Crev_ignored%2Crev_contacts%2Cvenue%2Cdatecreate%2Ccan_addmeta%2Ccan_comment%2Ccan_download%2Ccan_print%2Ccan_share%2Ccontact%2Ccount_comments%2Ccount_faves%2Ccount_views%2Cdate_taken%2Cdate_upload%2Cdescription%2Cicon_urls_deep%2Cisfavorite%2Cispro%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cowner_datecreate%2Cpath_alias%2Cperm_print%2Crealname%2Crotation%2Csafety_level%2Csecret_k%2Csecret_h%2Curl_sq%2Curl_q%2Curl_t%2Curl_s%2Curl_n%2Curl_w%2Curl_m%2Curl_z%2Curl_c%2Curl_l%2Curl_h%2Curl_k%2Curl_3k%2Curl_4k%2Curl_f%2Curl_5k%2Curl_6k%2Curl_o%2Cvisibility%2Cvisibility_source%2Co_dims%2Cpubliceditability%2Csystem_moderation%2Cstatic_maps&photo_id=${id}&static_map_zoom=3%2C6%2C14&static_map_width=245&static_map_height=100&viewerNSID=&method=flickr.photos.getInfo&csrf=&api_key=0809600f91ad7cc31a42f27af432152a&format=json&hermes=1&hermesClient=1&reqId=3ad917d3-2f9f-4164-90c6-70e4db553875&nojsoncallback=1`)
.then((res) => res.json())
                   .then((json) => {
                       console.log(json);
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
      const photo:Photos = yield call(callImageApi, action.payload);
      yield put(onSuccessImage(photo));
   } catch (e) {
      console.log(e);
   }
}
function* mySaga() {
  yield all ([takeLatest(fetchImages.type, fetchImagesSaga),
      takeLatest(fetchImage.type,fetchImageSaga)
]);
}

export default mySaga;

//https://api.flickr.com/services/rest?photo_id=52218443144&viewerNSID=&method=flickr.photos.getHtmlMeta&csrf=&api_key=0809600f91ad7cc31a42f27af432152a&format=json&hermes=1&hermesClient=1&reqId=ef66d6cb-4ad0-4983-bad6-f889fbf76fc0&nojsoncallback=1