import "./styles.css";

export const PostCard = ({ post, colors }) => (
  <div className="post">
    <a href={"check/" + post.id} className="link">
      <img src={post.cover_image} alt={post.titles.en}></img>
      <div className="post-content">
        <h3 alt={post.titles.en} title={post.titles.en} className="xablau">
          {post.titles.en}
        </h3>
        <p className="description" title={post.descriptions.en}>
          {post.descriptions.en}
        </p>
        <p>{post.score}</p>
      </div>
      <hr className="divider" />
      <div className="spacingCard">
        {post.genres.slice(0, 3).map((genre, index) => {
          const random = Math.floor(Math.random() * colors.length);
          return (
            <span key={index} className={`chip ` + colors[random]}>
              {genre}
            </span>
          );
        })}
      </div>
    </a>
  </div>
);

//OLD
// export const PostCard = ({ post }) => (
//   <div className="post">
//     <img src={post.cover} alt={post.title}></img>
//     <div className="post-content">
//       <h3>{post.titles.en}</h3>
//       <p>{post.body}</p>
//     </div>
//   </div>
// );
