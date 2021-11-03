import { Component } from "react";

import "./styles.css";

import { loadPosts } from "../../utils/load-posts";
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
  };

  async componentDidMount() {
    await this.loadPosts();
  }

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

  render() {
    const { posts, page, postPerPage, allPosts, search } = this.state;
    const hasPosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!search
      ? allPosts.filter((post) => {
          return post.titles.en.includes(search);
        })
      : posts;

    return (
      <section className="container">
        <div class="search-container">
          <Search searchValue={search} handleChange={this.handleChange} />
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
