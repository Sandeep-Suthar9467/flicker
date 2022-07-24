export interface Album {
    photosets: Photosets;
    stat: string;
  }
  export interface Photosets {
    cancreate: number;
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photoset?: (PhotosetEntity)[] | null;
  }
  export interface PhotosetEntity {
    id: string;
    owner: string;
    username: string;
    primary: string;
    secret: string;
    server: string;
    farm: number;
    count_views: string;
    count_comments: string;
    count_photos: number;
    count_videos: number;
    title: TitleOrDescription;
    description: TitleOrDescription;
    can_comment: number;
    date_create: string;
    date_update: string;
    photos: number;
    videos: number;
    public_primary: string;
    coverphoto_server: string;
    coverphoto_farm: number;
    auto_upload: string;
    visibility_can_see_set: number;
    needs_interstitial: number;
    primary_photo_extras: PrimaryPhotoExtras;
    coverphoto_url: CoverphotoUrl;
    count_photos_public: number;
    count_photos_friend: number;
    count_photos_family: number;
    count_photos_all: number;
  }
  export interface TitleOrDescription {
    _content: string;
  }
  export interface PrimaryPhotoExtras {
    ownername: string;
  }
  export interface CoverphotoUrl {
    h: string;
    l: string;
    s: string;
    t: string;
  }
  export type AlbumPhoto = {
    url: string;
    author: string;
}[];
  export type AlbumMock = {
    name: string;
    photos: AlbumPhoto
}[]
