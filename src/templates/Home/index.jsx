import { Component } from "react";

import "./styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 4,
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

  render() {
    const { posts, page, postPerPage, allPosts } = this.state;
    const hasPosts = page + postPerPage >= allPosts.length;
    console.log("Teste: " + hasPosts);

    return (
      <section className="container">
        <Posts posts={posts}></Posts>

        <div className="button-container">
          <Button
            text={"Load more"}
            disabled={hasPosts}
            eventClick={this.loadMorePosts}
          ></Button>
        </div>
      </section>
    );
  }
}
