export type User = {
  name: string;
  password: string;
  posts: {
    title: string;
    content: string;
    userId: number;
  }[];
};
