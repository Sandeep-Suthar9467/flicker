import { call, put, takeLatest, all } from 'redux-saga/effects'
import { FLICKER_API_KEY } from '../constant';
import { fetchImage, fetchImages, onSuccessImage,
   onSuccessImages, fetchAlbumDetails,
   onSuccessAlbumDetails, fetchPhotos, onSuccessPhotos, onSuccessAlbumPhotos, fetchAlbumPhotos} from "../reducer";
import { Album, APhoto, PhotosetEntity } from '../types/album';
import { Explore, FlickerList, Photos } from '../types/flicker';

const callApi = (page: string): Promise<FlickerList> => {
   return fetch(
      `https://api.flickr.com/services/rest?extras=can_comment%2Ccan_print%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_sq%2Curl_q%2Curl_t%2Curl_s%2Curl_n%2Curl_w%2Curl_m%2Curl_z%2Curl_c%2Curl_l&per_page=50&page=${page}&method=flickr.interestingness.getList&csrf=&api_key=${FLICKER_API_KEY}&format=json&nojsoncallback=1`)
      .then((res) => res.json())
      .then((json) => {
         return json;
      });
}
const callImageApi = (id: string): Promise<Photos> => {
   return fetch(
`https://api.flickr.com/services/rest?datecreate=1&extras=sizes%2Cicon_urls%2Cignored%2Crev_ignored%2Crev_contacts%2Cvenue%2Cdatecreate%2Ccan_addmeta%2Ccan_comment%2Ccan_download%2Ccan_print%2Ccan_share%2Ccontact%2Ccount_comments%2Ccount_faves%2Ccount_views%2Cdate_taken%2Cdate_upload%2Cdescription%2Cicon_urls_deep%2Cisfavorite%2Cispro%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cowner_datecreate%2Cpath_alias%2Cperm_print%2Crealname%2Crotation%2Csafety_level%2Csecret_k%2Csecret_h%2Curl_sq%2Curl_q%2Curl_t%2Curl_s%2Curl_n%2Curl_w%2Curl_m%2Curl_z%2Curl_c%2Curl_l%2Curl_h%2Curl_k%2Curl_3k%2Curl_4k%2Curl_f%2Curl_5k%2Curl_6k%2Curl_o%2Cvisibility%2Cvisibility_source%2Co_dims%2Cpubliceditability%2Csystem_moderation%2Cstatic_maps&photo_id=${id}&static_map_zoom=3%2C6%2C14&static_map_width=245&static_map_height=100&viewerNSID=&method=flickr.photos.getInfo&csrf=&api_key=${FLICKER_API_KEY}&format=json&hermes=1&hermesClient=1&reqId=3ad917d3-2f9f-4164-90c6-70e4db553875&nojsoncallback=1`)
.then((res) => res.json())
                   .then((json) => {
                     return json;
       });
}
const callCommentApi = (id: string): Promise<Photos> => {
   return fetch(
`https://api.flickr.com/services/rest?photo_id=${id}&sort=date-posted-desc&extras=icon_urls&expand_bbml=1&use_text_for_links=1&secure_image_embeds=1&bbml_need_all_photo_sizes=1&primary_photo_longest_dimension=405&offset=0&limit=20&viewerNSID=&method=flickr.photos.comments.getList&csrf=&api_key=${FLICKER_API_KEY}&format=json&nojsoncallback=1`)
.then((res) => res.json())
                   .then((json) => {
                     return json;
       });
};

const fetchAlbums = (): Promise<Album> => {
   return fetch(
`https://www.flickr.com/services/rest?get_user_info=1&jump_to=&primary_photo_extras=url_o&user_id=196011922@N07&method=flickr.photosets.getList&csrf=1658835091%3A5enjyidx5m%3A736591fb88a0dede1329dbb3f09ccd40&api_key=${FLICKER_API_KEY}&format=json&hermes=1&hermesClient=1&nojsoncallback=1`)
.then((res) => res.json())
                   .then((json) => {
                       console.log(json);
                     return json?.photosets?.photoset;
       });
};

const fetchAlbumsPhoto = (id: string): Promise<APhoto[]> => {
   return fetch(
`https://www.flickr.com/services/rest?photoset_id=${id}&extras=url_o&method=flickr.photosets.getPhotos&csrf=1658835091%3A5enjyidx5m%3A736591fb88a0dede1329dbb3f09ccd40&api_key=${FLICKER_API_KEY}&format=json&hermes=1&hermesClient=1&nojsoncallback=1`)
.then((res) => res.json())
                   .then((json) => {
                       console.log(json);
                     return json?.photoset?.photo;
       });
};

const fetchPhotosApi = (): Promise<APhoto> => {
   return fetch(
`https://www.flickr.com/services/rest?extras=url_l&get_user_info=1&jump_to=&user_id=196011922%40N07&view_as=use_pref&sort=use_pref&method=flickr.people.getPhotos&csrf=1658844848%3Awfh4890fpaj%3A79f83d23d3e8ebcafe5938145fd122dd&api_key=${FLICKER_API_KEY}&format=json&hermes=1&hermesClient=1&nojsoncallback=1`)
.then((res) => res.json())
                   .then((json) => {
                       console.log(json);
                     return json?.photos?.photo;
       });
};

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
      const comments:Photos = yield call(callCommentApi, action.payload);
      yield put(onSuccessImage({'photo':photo,'comments':comments}));
   } catch (e) {
      console.log(e);
   }
}
function* fetchAlbumSaga(action: Explore) {
   try {
      const result: PhotosetEntity[] = yield call(fetchAlbums);
      const mapped = result?.map((r) => ({
         id: r.id,
         title: r.title._content,
         desc: r.description._content,
         photos: r.photos,
         url: r?.primary_photo_extras?.url_o
      }))
      yield put(onSuccessAlbumDetails(mapped));
   } catch (e) {
      console.log(e);
   }
};

function* fetchAlbumphotoSaga(action: Explore) {
   try {
      const result: APhoto[] = yield call(fetchAlbumsPhoto, action.payload);
      yield put(onSuccessAlbumPhotos(result));
   } catch (e) {
      console.log(e);
   }
};
function* fetchPhotoSaga(action: Explore) {
   try {
      const result: APhoto[] = yield call(fetchPhotosApi);
      yield put(onSuccessPhotos(result));
   } catch (e) {
      console.log(e);
   }
};

function* mySaga() {
   yield all([takeLatest(fetchImages.type, fetchImagesSaga),
   takeLatest(fetchImage.type, fetchImageSaga),
   takeLatest(fetchAlbumDetails.type, fetchAlbumSaga),
   takeLatest(fetchPhotos.type, fetchPhotoSaga),
   takeLatest(fetchAlbumPhotos.type, fetchAlbumphotoSaga),
   ]);
}

export default mySaga;
