import "./styles.css";

import { loadPosts } from "../../utils/load-posts";
import { loadCategories } from "../../utils/load-categories";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { Search } from "../../components/Search";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(4);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("score");
  const [category, setCategory] = useState("#");
  const [allCategories, setAllCategories] = useState([]);

  const hasPosts = page + postPerPage >= allPosts.length;
  let filteredPosts = null;
  if (!!search || category !== "#") {
    filteredPosts = allPosts;

    if (!!search)
      filteredPosts = allPosts.filter((post) => {
        return post.titles.en.toLowerCase().includes(search.toLowerCase());
      });

    if (category !== "#") {
      filteredPosts = filteredPosts.filter((post) => {
        return post.genres.includes(category);
      });
    }

    if (order === "name") {
      filteredPosts.sort((a, b) =>
        a.titles.en > b.titles.en ? 1 : b.titles.en > a.titles.en ? -1 : 0
      );
    } else {
      filteredPosts.sort((a, b) =>
        a.score < b.score ? 1 : b.score < a.score ? -1 : 0
      );
    }
  } else filteredPosts = posts;

  const handleLoadCategories = async () => {
    const categories = await loadCategories();
    setAllCategories(categories);
  };

  const handleLoadPosts = useCallback(async (page, postPerPage) => {
    // const { page, postPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postPerPage);
    handleLoadCategories();
  }, [handleLoadPosts, postPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleOrder = (e) => {
    const { value } = e.target;
    setOrder(value);
  };

  const handleCategory = (e) => {
    const { value } = e.target;
    setCategory(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        <Search
          searchValue={search}
          searchOrder={order}
          searchCategory={category}
          allCategories={allCategories}
          handleChange={handleChange}
          handleOrder={handleOrder}
          handleCategory={handleCategory}
        />
        {search && <h1 className="search-title">Search for: {search}</h1>}
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts}></Posts>}
      {filteredPosts.length === 0 && (
        <div className="noresult"> No results found</div>
      )}

      <div className="button-container">
        {!search && (
          <Button
            text={"Load more"}
            disabled={hasPosts}
            eventClick={loadMorePosts}
          ></Button>
        )}
      </div>
    </section>
  );
};

// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postPerPage: 4,
//     search: "",
//     order: "score",
//     category: "#",
//     allCategories: [],
//   };

//   async componentDidMount() {
//     await this.loadPosts();
//     await this.loadCategories();
//   }

//   loadCategories = async () => {
//     const categories = await loadCategories();
//     this.setState({
//       allCategories: categories,
//     });
//   };

//   loadPosts = async () => {
//     const { page, postPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();

//     this.setState({
//       posts: postsAndPhotos.slice(page, postPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     const { posts, allPosts, page, postPerPage } = this.state;
//     const nextPage = page + postPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
//     posts.push(...nextPosts);
//     this.setState({ posts, page: nextPage });
//   };

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ search: value });
//   };

//   handleOrder = (e) => {
//     const { value } = e.target;
//     this.setState({ order: value });
//   };

//   handleCategory = (e) => {
//     const { value } = e.target;
//     this.setState({ category: value });
//   };

//   render() {
//     const {
//       posts,
//       page,
//       postPerPage,
//       allPosts,
//       search,
//       order,
//       category,
//       allCategories,
//     } = this.state;
//     const hasPosts = page + postPerPage >= allPosts.length;

//     let filteredPosts = null;
//     if (!!search || category !== "#") {
//       filteredPosts = allPosts;

//       if (!!search)
//         filteredPosts = allPosts.filter((post) => {
//           return post.titles.en.toLowerCase().includes(search.toLowerCase());
//         });

//       if (category !== "#") {
//         filteredPosts = filteredPosts.filter((post) => {
//           return post.genres.includes(category);
//         });
//       }

//       if (order === "name") {
//         filteredPosts.sort((a, b) =>
//           a.titles.en > b.titles.en ? 1 : b.titles.en > a.titles.en ? -1 : 0
//         );
//       } else {
//         filteredPosts.sort((a, b) =>
//           a.score < b.score ? 1 : b.score < a.score ? -1 : 0
//         );
//       }
//     } else filteredPosts = posts;

//     return (
//       <section className="container">
//         <div className="search-container">
//           <Search
//             searchValue={search}
//             searchOrder={order}
//             searchCategory={category}
//             allCategories={allCategories}
//             handleChange={handleChange}
//             handleOrder={handleOrder}
//             handleCategory={handleCategory}
//           />
//           {search && <h1 className="search-title">Search for: {search}</h1>}
//         </div>

//         {filteredPosts.length > 0 && <Posts posts={filteredPosts}></Posts>}
//         {filteredPosts.length === 0 && (
//           <div className="noresult"> No results found</div>
//         )}

//         <div className="button-container">
//           {!search && (
//             <Button
//               text={"Load more"}
//               disabled={hasPosts}
//               eventClick={loadMorePosts}
//             ></Button>
//           )}
//         </div>
//       </section>
//     );
//   }
// }
