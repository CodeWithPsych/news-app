import { Component } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    country: "pk",
    pagesize: 11,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  componentDidMount() {
    this.updateNews();
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async updateNews() {
    this.props.setProgress(0);
    const { country, category, apiKey } = this.props;
    const url = `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&apikey=${apiKey}`;
    this.setState({ loading: true });

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let parsedData = await response.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }

  fetchMoreData = async () => {
    this.setState((prevState) => ({ page: prevState.page + 1, loading: true }));

    const { country, category, apiKey } = this.props;
    const url = `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&apikey=${apiKey}`;

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let parsedData = await response.json();
      this.setState((prevState) => ({
        articles: prevState.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching more news:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className="text-center " style={{ marginTop: "90px" }}>
             {this.capitalizeFirstLetter(this.props.category)}{" "}
            Headlines
          </h1>
          {this.state.loading && <Spinner />}
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItems
                    title={element.title}
                    description={element.description}
                    imageUrl={element.image}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
