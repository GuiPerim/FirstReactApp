export const PostCard = ({ post }) => ({
  render() {
    const randomArr = [
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
    ];

    return (
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
            {/* <p className="xablau">{post.trailer_url}</p> */}
          </div>
          <hr className="divider" />
          <div className="spacingCard">
            {post.genres.slice(0, 3).map((genre) => {
              const random = Math.floor(Math.random() * randomArr.length);
              return (
                <span className={`chip ` + randomArr[random]}>{genre}</span>
              );
            })}
          </div>
        </a>
      </div>
    );
  },
});

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
