import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { getResponsiveImage } from "@/componentWebs/NbmImageNew";

// @connect(({ webs, cart }) => ({
//   webs, cart
// }))

class BreadCumb extends Component {
  render() {
    const { node1, node2, node1Slugs, link } = this.props
    return (
      <div className="breadcumb"
        style={{ backgroundImage: `/static/images.breadcumb.png` }}
      >
        <div className='overlay-breadcumb'>
          <div className="breadcumb-info">
            <h1 className="title">{node1}</h1>
            <div className="links">
              <a href='/'>
                <span className="home">
                  <i className="fas fa-home" />
                Trang chủ
              </span>
              </a>
              <a href={node1Slugs && `/${node1Slugs}` || '#'}>
                <span className="home">
                  <i className="fas fa-angle-right" />
                  {node1}
                </span>
              </a>
              {
                node2 &&
                <a>
                  <span className="home">
                    <i className="fas fa-angle-right" />
                    {node2}
                  </span>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BreadCumb;