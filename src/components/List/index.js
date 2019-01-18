import React from "react";
import { handleResponse, renderChangePercent } from "../../helpers";
import { API_URL } from "../../config.js";
import Loading from "../common/Loading";
import Table from "../Table";
import Pagination from "../Pagination";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.fetchCurrencies();
  }

  fetchCurrencies = () => {
    const { page } = this.state;
    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then(data => {
        console.log("Success", data);

        const { currencies, totalPages } = data;
        this.setState({
          currencies,
          totalPages,
          loading: false
        });
      })
      .catch(error => {
        console.log("Error", error);

        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  };

  handlePaginationClick = direction => {
    let nextPage = this.state.page;
    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
  };

  render() {
    const { loading, currencies, error, totalPages, page } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          {" "}
          <Loading />
        </div>
      );
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
    return (
      <div>
        <Table currencies={currencies} />
        <Pagination
          totalPages={totalPages}
          page={page}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default List;
