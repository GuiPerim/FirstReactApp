import "./styles.css";

import { PostCard } from "../PostCard";

export const Posts = ({ posts }) => (
  <div className="posts">
    {posts
      .filter(function (img) {
        if (img.descriptions.en) {
          img.descriptions.en = img.descriptions.en.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          );
        } else img.descriptions.en = "No despription provided";
        return true;
      })
      .map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            colors={[
              "info",
              "danger",
              "warning",
              "primary",
              "secondary",
              "blue",
              "green",
              "yellow",
              "grey",
              "brown",
            ]}
          />
        );
      })}
  </div>
);
