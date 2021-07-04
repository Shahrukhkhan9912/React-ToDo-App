import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      total: null,
      per_page: null,
      current_page: 1,
    };
  }

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }

  makeHttpRequestWithPage = async (pageNumber) => {
    const response = await fetch(
      `https://reqres.in/api/users?page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    this.setState({
      users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page,
    });
  };

  render() {
    let users, renderPageNumbers;

    if (this.state.users !== null) {
      users = this.state.users.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
          <td>{user.avatar}</td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (
        let i = 1;
        i <= Math.ceil(this.state.total / this.state.per_page);
        i++
      ) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map((number) => {
        return (
          <span
            key={number}
            onClick={() => this.makeHttpRequestWithPage(number)}
          >
            {number}
          </span>
        );
      });
    }
    return (
      <div>
        <br />
        <h1 className="text-center mb-3">
          Question 2 Dynamic Pagination with API
        </h1>
        <Table variant="dark" striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </Table>
        <div>
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
          {renderPageNumbers}
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
        </div>
      </div>
    );
  }
}
