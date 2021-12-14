export interface PostDetails {
  id?: number;
  title: string;
  username: string;
  content: string;
  likedUsers?: string[];
}
