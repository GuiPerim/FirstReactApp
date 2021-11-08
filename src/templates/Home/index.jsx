import { Component } from "react";

import "./styles.css";

import { loadPosts } from "../../utils/load-posts";
import { loadCategories } from "../../utils/load-categories";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { Search } from "../../components/Search";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 4,
    search: "",
    order: "score",
    category: "#",
    allCategories: [],
  };

  async componentDidMount() {
    await this.loadPosts();
    await this.loadCategories();
  }

  loadCategories = async () => {
    const categories = await loadCategories();
    this.setState({
      allCategories: categories,
    });
  };

  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { posts, allPosts, page, postPerPage } = this.state;
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ search: value });
  };

  handleOrder = (e) => {
    const { value } = e.target;
    this.setState({ order: value });
  };

  handleCategory = (e) => {
    const { value } = e.target;
    this.setState({ category: value });
  };

  render() {
    const {
      posts,
      page,
      postPerPage,
      allPosts,
      search,
      order,
      category,
      allCategories,
    } = this.state;
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

    return (
      <section className="container">
        <div className="search-container">
          <Search
            searchValue={search}
            searchOrder={order}
            searchCategory={category}
            allCategories={allCategories}
            handleChange={this.handleChange}
            handleOrder={this.handleOrder}
            handleCategory={this.handleCategory}
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
              eventClick={this.loadMorePosts}
            ></Button>
          )}
        </div>
      </section>
    );
  }
}
