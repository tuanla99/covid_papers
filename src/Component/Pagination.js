/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { range, findPage } from '../static/js/templateCode';

export default class Pagination extends Component {
  next = (item, pagination) => {
    const { changePage } = this.props;

    if (item < pagination.length) changePage(item + 1);
  };

  pre = item => {
    const { changePage } = this.props;

    if (item > 1) changePage(item - 1);
  };

  render() {
    const { changePage, total, current, pageSize } = this.props;
    const { startPage, endPage, totalPages } = findPage(total, pageSize, current);
    const pagination = range(startPage, endPage);
    return (
      <nav aria-label="Page navigation">
        {pagination && pagination.length > 1 && (
          <ul className="pagination justify-content-center floatleft">
            <li className="page-item" onClick={() => this.pre(current)}>
              <a className={current === 1 ? "disable-btn page-link" : "page-link"}>
                <i className="fas fa-chevron-left icon" />
              </a>
            </li>
            {pagination.map((item, index) => (
              <li className="page-item" onClick={() => changePage(index + 1)}>
                <a className={parseInt(current, 10) === index + 1 && "page-link page-active" || "page-link"}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="page-item" onClick={() => this.next(current, pagination)}>
              <a className={current === pagination.length ? "disable-btn page-link" : "page-link"}>
                <i className="fas fa-chevron-right" />
              </a>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}
