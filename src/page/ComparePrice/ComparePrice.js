// import { formatNumber, getProfileAfterPrd, getLinkProduct, getInfoOptions, getImageHeight } from '@/utils/utils';
// import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
// import { connect } from 'react-redux';
import moment from "moment";
import React, { Component } from "react";
import BreadCumb from "../../Component/Breadcumb";
import Header from "../../Component/Header";
import ZoomImage from "../../Component/ZoomImage";
import {
  getDetail,
  getSameRangeManufacturer,
  getSearchPrice,
} from "../../networking/Server";
import dots from "../../static/images/dots.png";
// import OwlCarousel from '../../Component/OwlCarousel'
// const ZoomImage = dynamic(() => import('../../Component/ZoomImage'), {
//   ssr: false,
//   loading: () => null,
// });

const productPageSize = 3;

// const OwlCarousel = dynamic(() => import(`../../../componentWebs/Global/OwlCarousel`), {
//   ssr: false,
//   loading: () => null,
// });

export default class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      itemHeight: null,
      itemHeight1: null,
      quantity: 1,
      products: [],
      imageList: [],
      mainImage: "",
      currentTab: 1,
      price: null,
      dealPrice: null,
      feedback: null,
      ecommerceProductClassify1: {},
      ecommerceProductClassify2: {},
      checkIndex: 0,
      activeIndex: 0,
      productsDetail: {},
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      productsMathching: [],
      productsManufacturer: [],
      productsPrice: [],
    };
  }

  componentDidMount() {
    getDetail(localStorage.getItem("detailId")).then((res) => {
      console.log("getDetail: ", res);
      this.setState({
        productsDetail: (res && res.data) || {},
        productsMathching: (res && res.list_data_matching) || [res.data] || [],
        productsSameSource: (res && res.list_product_same_source) || [],
        mainImage:
          res &&
            res.data &&
            res.data.image &&
            JSON.parse(res && res.data.image) &&
            JSON.parse(res && res.data.image)[0] &&
            JSON.parse(res && res.data.image)[0].indexOf("http") >= 0
            ? JSON.parse(res && res.data && res.data.image)[0]
            : `${res && res.data && res.data.base_url}${JSON.parse(res && res.data && res.data.image)[0]
            }`,
        image1:
          res &&
            res.data &&
            res.data.image &&
            JSON.parse(res && res.data.image) &&
            JSON.parse(res && res.data.image)[1] &&
            JSON.parse(res && res.data.image)[1].indexOf("http") >= 0
            ? JSON.parse(res && res.data && res.data.image)[1]
            : `${res && res.data && res.data.base_url}${JSON.parse(res && res.data && res.data.image)[1]
            }`,
        image2:
          res &&
            res.data &&
            res.data.image &&
            JSON.parse(res && res.data.image) &&
            JSON.parse(res && res.data.image)[2] &&
            JSON.parse(res && res.data.image)[2].indexOf("http") >= 0
            ? JSON.parse(res && res.data && res.data.image)[2]
            : `${res && res.data && res.data.base_url}${JSON.parse(res && res.data && res.data.image)[2]
            }`,
        image3:
          res &&
            res.data &&
            res.data.image &&
            JSON.parse(res && res.data.image) &&
            JSON.parse(res && res.data.image)[3] &&
            JSON.parse(res && res.data.image)[3].indexOf("http") >= 0
            ? JSON.parse(res && res.data && res.data.image)[3]
            : `${res && res.data && res.data.base_url}${JSON.parse(res && res.data && res.data.image)[3]
            }`,
        image4:
          res &&
            res.data &&
            res.data.image &&
            JSON.parse(res && res.data.image) &&
            JSON.parse(res && res.data.image)[4] &&
            JSON.parse(res && res.data.image)[4].indexOf("http") >= 0
            ? JSON.parse(res && res.data && res.data.image)[4]
            : `${res && res.data && res.data.base_url}${JSON.parse(res && res.data && res.data.image)[4]
            }`,
      });
    });
    getSameRangeManufacturer(localStorage.getItem("manufacturer")).then(
      (res) => {
        this.setState({
          productsManufacturer: (res && res.data) || [],
        });
      }
    );
    getSearchPrice(
      localStorage.getItem("price"),
      localStorage.getItem("price")
    ).then((res) => {
      this.setState({
        productsPrice: (res && res.data) || [],
      });
    });
  }

  increase = () => {
    const { quantity } = this.state;
    this.setState({
      quantity: quantity + 1,
    });
  };

  decrease = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState({
        quantity: quantity - 1,
      });
    }
  };

  formatNumber = (value) => {
    if (!value) {
      return "0";
    }
    // eslint-disable-next-line no-param-reassign
    value += "";
    const list = value.split(".");
    const prefix = list[0].charAt(0) === "-" ? "-" : "";
    let num = prefix ? list[0].slice(1) : list[0];
    let result = "";
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
  };

  render() {
    // const { data } = this.props;
    // console.log(data)
    // const {
    //   // ecommerceProductClassify1,
    //   // ecommerceProductClassify2,
    //   // ecommerceProductsModelList,
    // } = data;

    const {
      itemHeight,
      feedback,
      price,
      dealPrice,
      currentTab,
      products,
      quantity,
      infoOptions,
      optionId1,
      optionId2,
      imageList,
      mainImage,
      ecommerceProductClassify1,
      ecommerceProductClassify2,
      checkIndex,
      activeIndex,
      productsDetail,
      image1,
      image2,
      image3,
      image4,
      productsMathching,
      productsManufacturer,
      productsPrice,
      productsSameSource,
    } = this.state;
    // const infoProduct = infoOptions || data;
    // console.log('infoProduct: ', image1,
    //   image2,
    //   image3,
    //   image4)
    // const total = parseInt(infoProduct.stock || 1);
    const feedbackList = feedback && feedback.list;
    return (
      <>
        <Header />
        <BreadCumb node1={productsDetail.name || ""} />
        <div className="body product detail">
          <div className="container">
            <div className="product-info-top">
              <div className="main_image">
                <h3
                  style={{
                    fontWeight: "700",
                    fontSize: "24px",
                    marginBottom: "10px",
                  }}
                >
                  {productsDetail.name}
                </h3>
                <ZoomImage
                  id="img_01"
                  className="img-responsive restyle_large_img_product"
                  // alt={data.name}
                  src={mainImage}
                  data-zoom-image="//bizweb.dktcdn.net/100/364/767/products/70589264-400878850631068-192375588097359872-n.jpg?v=1571390161147"
                  style={{ position: "absolute" }}
                  lensSize={200}
                  zoomStyle={{
                    border: "2px solid rgb(136, 136, 136)",
                    width: "420px",
                    height: "500px",
                    marginLeft: 10,
                  }}
                />
                <div className="image_list" style={{ marginTop: "10px" }}>
                  {/* {imageList && imageList.length > 1 && (
                    <ul style={{ display: "flex" }}>
                      <OwlCarousel nav margin={0} responsive={{
                        1201: { items: 4 },
                        992: { items: 4 },
                        768: { items: 4 },
                        576: { items: 4 },
                        0: { items: 2 }
                      }}>
                        {imageList.map((item, index) =>
                          <li style={{ border: index === checkIndex ? '1px solid #D92B2E' : 'none' }} onClick={() => this.setState({ mainImage: item, checkIndex: index })}>
                            <img src={getResponsiveImage(item)} alt="" style={{ height: 85, objectFit: 'cover', margin: 0 }} />
                          </li>
                        )}
                      </OwlCarousel>
                    </ul>
                  )} */}
                  <ul style={{ display: "flex" }}>
                    {/* <OwlCarousel nav margin={0} responsive={{
                      1201: { items: 4 },
                      992: { items: 4 },
                      768: { items: 4 },
                      576: { items: 4 },
                      0: { items: 2 }
                    }}>
                      {imageList.map((item, index) => */}
                    <li
                      style={{
                        border: 0 === checkIndex ? "1px solid #D92B2E" : "none",
                      }}
                      onClick={() =>
                        this.setState({ mainImage: image1, checkIndex: 0 })
                      }
                    >
                      <img
                        src={image1}
                        alt=""
                        style={{ height: 85, objectFit: "cover", margin: 0 }}
                      />
                    </li>
                    {/* )} */}
                    <li
                      style={{
                        border: 1 === checkIndex ? "1px solid #D92B2E" : "none",
                      }}
                      onClick={() =>
                        this.setState({ mainImage: image2, checkIndex: 1 })
                      }
                    >
                      <img
                        src={image2}
                        alt=""
                        style={{ height: 85, objectFit: "cover", margin: 0 }}
                      />
                    </li>
                    <li
                      style={{
                        border: 2 === checkIndex ? "1px solid #D92B2E" : "none",
                      }}
                      onClick={() =>
                        this.setState({ mainImage: image3, checkIndex: 2 })
                      }
                    >
                      <img
                        src={image3}
                        alt=""
                        style={{ height: 85, objectFit: "cover", margin: 0 }}
                      />
                    </li>
                    <li
                      style={{
                        border: 3 === checkIndex ? "1px solid #D92B2E" : "none",
                      }}
                      onClick={() =>
                        this.setState({ mainImage: image4, checkIndex: 3 })
                      }
                    >
                      <img
                        src={image4}
                        alt=""
                        style={{ height: 85, objectFit: "cover", margin: 0 }}
                      />
                    </li>
                    {/* </OwlCarousel> */}
                  </ul>
                </div>
              </div>
              <div style={{ height: "400px" }}>
                <ul style={{ display: "flex" }}>
                  {productsMathching?.map(
                    (item, index) =>
                      index < 4 && (
                        <li style={{ margin: "0px 10px" }}>
                          <a
                            target="_blank"
                            href={item.source}
                            style={{
                              border: "1px solid #bdbdbd",
                              padding: "25px",
                              margin: "0px 10px",
                              display: "block",
                            }}
                          >
                            <img
                              src={
                                JSON.parse(item.image) &&
                                  JSON.parse(item.image)[0] &&
                                  JSON.parse(item.image)[0].indexOf("http") >= 0
                                  ? JSON.parse(item.image)[0]
                                  : `${item.base_url}${JSON.parse(item.image)[0]
                                  }`
                              }
                              alt=""
                              style={{
                                width: 100,
                                objectFit: "cover",
                                margin: 0,
                                border: "1px solid #bdbdbd",
                                height: "70px",
                              }}
                            />
                            <div
                              style={{
                                textAlign: "center",
                                margin: "18px 0 0",
                              }}
                              className="limit_5"
                            >
                              {this.formatNumber(item.price)}đ
                            </div>
                            <span
                              style={{
                                display: "block",
                                margin: "20px 0 0",
                                background: "#ff6535 none",
                                borderRadius: "3px",
                                padding: "9px",
                                textAlign: "center",
                                fontSize: "14px",
                                lineHeight: "16px",
                                color: "#fff",
                              }}
                            >
                              Xem ngay
                            </span>
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>
            <div className="body detail">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-lg-12 col-xl-8 article-detail">
                    <div className="detail-container">
                      <div className="detail-title">
                        <div className="news-catalog">
                          <div className="price-comparing">
                            <span className="price-comparing-title">
                              So sánh giá
                            </span>
                          </div>
                          <ul>
                            {productsMathching?.map((item, index) => (
                              <li
                                style={{
                                  borderBottom: "1px solid #bdbdbd",
                                  marginTop: "20px",
                                }}
                              >
                                <div className="cate-article-item">
                                  <div
                                    className="cata-article-thumb detail_item2"
                                    style={{ height: "100%" }}
                                  >
                                    <a href={item.source} target="_blank">
                                      <img
                                        style={{ height: "73px" }}
                                        src={
                                          JSON.parse(item.image) &&
                                            JSON.parse(item.image)[0] &&
                                            JSON.parse(item.image)[0].indexOf(
                                              "http"
                                            ) >= 0
                                            ? JSON.parse(item.image)[0]
                                            : `${item.base_url}${JSON.parse(item.image)[0]
                                            }`
                                        }
                                      />
                                    </a>
                                  </div>
                                  <div
                                    className="cata-article-info"
                                    style={{ width: "70%" }}
                                  >
                                    <a href={item.source} target="_blank">
                                      <div className="cata-article-title limit_3">
                                        {item.name}
                                      </div>
                                    </a>
                                    <div>
                                      <a href={item.base_url} target="_blank">
                                        <span style={{ color: "#207bc1" }}>
                                          {item.base_url}
                                        </span>
                                      </a>
                                      &nbsp;Địa chỉ:{" "}
                                      {item.info_contact?.address}
                                    </div>
                                    <span className="limit_4">
                                      {this.formatNumber(item.price)}đ
                                    </span>
                                    <span>
                                      Màu: {item.color}&nbsp;-&nbsp;Tình trạng:{" "}
                                      {item.type}
                                    </span>
                                  </div>
                                  <a target="_blank" href={item.source}>
                                    <span
                                      style={{
                                        display: "block",
                                        margin: "0 0 20px",
                                        background: "#ff6535 none",
                                        borderRadius: "3px",
                                        padding: "9px",
                                        textAlign: "center",
                                        fontSize: "14px",
                                        lineHeight: "16px",
                                        color: "#fff",
                                      }}
                                    >
                                      Tới nơi bán
                                    </span>
                                  </a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12 col-xl-4 categories-container">
                    <div className="news-catalog">
                      <div className="news-catalog-container">
                        <div
                          className="news-cata-title"
                          style={{ display: "flex" }}
                        >
                          <h1>Sản phẩm cùng hãng</h1>
                          <hr
                            style={{
                              width: "40%",
                              background: "#1185C4",
                              marginLeft: "1rem",
                            }}
                          />
                        </div>
                        <div className="article-list">
                          <ul>
                            {productsManufacturer?.map((item) => (
                              <li>
                                <div className="cate-article-item">
                                  <div className="cata-article-thumb detail_item2">
                                    <a href={item.source} target="_blank">
                                      <img
                                        src={
                                          JSON.parse(item.image) &&
                                            JSON.parse(item.image)[0] &&
                                            JSON.parse(item.image)[0].indexOf(
                                              "http"
                                            ) >= 0
                                            ? JSON.parse(item.image)[0]
                                            : `${item.base_url}${JSON.parse(item.image)[0]
                                            }`
                                        }
                                      />
                                    </a>
                                  </div>
                                  <div className="cata-article-info">
                                    <a href={item.source} target="_blank">
                                      <h1 className="cata-article-title limit_3">
                                        {item.name}
                                      </h1>
                                    </a>
                                    <div>{item.base_url}</div>
                                    <span className="limit_4">
                                      {this.formatNumber(item.price)}đ
                                    </span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-info-bottom">
              <ul className="tabs">
                <li
                  className={
                    currentTab === 1 ? "hover-orange active" : "hover-orange"
                  }
                  onClick={() => {
                    this.setState({ currentTab: 1 });
                  }}
                >
                  Thông số sản phẩm
                </li>
                {/* <li className={currentTab === 2 ? "hover-orange active" : "hover-orange"} onClick={() => { this.setState({ currentTab: 2 }) }}>Đánh giá sản phẩm</li> */}
                <li
                  className={
                    currentTab === 3 ? "hover-orange active" : "hover-orange"
                  }
                  onClick={() => {
                    this.setState({ currentTab: 3 });
                  }}
                >
                  Sản Phẩm đáng quan tâm
                </li>
                {/* <li className={currentTab === 4 ? "hover-orange active" : "hover-orange"} onClick={() => { this.setState({ currentTab: 4 }) }}>Sản phẩm kết hợp</li> */}
              </ul>
              <div
                className="detail-info-bottom intro"
                style={{ display: currentTab === 1 ? "block" : "none" }}
              >
                {/* <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="description-container"
                  dangerouslySetInnerHTML={{ __html: "Đang cập nhật..." }}
                ></div> */}
                <table className="detail-info-bottom-table" style={{ width: '50%' }}>

                  <tr>
                    <td>Xuất xứ:</td>
                    <td>{productsDetail?.origin || ''}</td>
                  </tr>
                  <tr>
                    <td>Năm sản xuất:</td>
                    <td>{productsDetail?.mfg || ''}</td>
                  </tr>
                  <tr>
                    <td>Tình trạng:</td>
                    <td>{productsDetail?.type || ''}</td>
                  </tr>
                  <tr>
                    <td>Số chỗ ngồi:</td>
                    <td>{productsDetail?.seat || ''}</td>
                  </tr>
                  <tr>
                    <td>Động cơ:</td>
                    <td>{productsDetail?.engine || ''}</td>
                  </tr>
                  <tr>
                    <td>Hộp số:</td>
                    <td>{productsDetail?.transmission || ''}</td>
                  </tr>
                  <tr>
                    <td>Tiêu thụ nhiên liệu:</td>
                    <td>{productsDetail?.fuel_consumption || ''}</td>
                  </tr>
                </table>
              </div>
              <div
                className="detail-info-bottom rates"
                style={{ display: currentTab === 2 ? "block" : "none" }}
              >
                {(feedbackList && feedbackList.length > 0 && (
                  <div className="row">
                    <div className="total-rate-container">
                      <div className="total-rate">
                        <div className="rate-mark">4.0</div>
                        <div className="rate-qty">
                          <div>
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                          </div>
                          <p>1200 đánh giá</p>
                        </div>
                      </div>
                      <div className="detail-rate">
                        <span>Kết quả đánh giá sản phẩm</span>
                        <div className="detail-rate-star_board">
                          <div className="detail-rate-star_field">
                            <div>
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                            <span className="rate-percent">
                              <div className="percent" />
                            </span>
                          </div>
                          <div className="detail-rate-star_field">
                            <div>
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                            <span className="rate-percent">
                              <div className="percent" />
                            </span>
                          </div>
                          <div className="detail-rate-star_field">
                            <div>
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                            <span className="rate-percent">
                              <div className="percent" />
                            </span>
                          </div>
                          <div className="detail-rate-star_field">
                            <div>
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                            <span className="rate-percent">
                              <div className="percent" />
                            </span>
                          </div>
                          <div className="detail-rate-star_field">
                            <div>
                              <i className="fas fa-star" />
                            </div>
                            <span className="rate-percent">
                              <div className="percent" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="total-rate-comments-container">
                      <ul className="comments-list">
                        {feedbackList.map((item, index) => (
                          <li>
                            <div className="detail-comment-container">
                              <a className="comment-avt">
                                <img src="/static/vga_sport/images/commentavt.png" />
                              </a>
                              <div className="comment-content">
                                <div className="content-top">
                                  <span className="comment-user">
                                    {item.customerName}
                                  </span>
                                  <div className="comment-star">
                                    {new Array(5)
                                      .fill(0)
                                      .map((rating, index) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <i
                                          className={`${index < item.rated ? "fas" : "far"
                                            } fa-star`}
                                          key={`id-index-${index}`}
                                        />
                                      ))}
                                  </div>
                                  <span className="comment-date">{`Updated ${moment(
                                    item.createDate
                                  ).fromNow()}`}</span>
                                </div>
                                <p className="comment-content-content">
                                  {item.comments}
                                </p>
                              </div>
                            </div>
                          </li>
                        )) || (
                            <div className="alert alert-warning" role="alert">
                              Chưa có bình luận cho sản phẩm này
                            </div>
                          )}
                      </ul>
                      {/* <p className="see_more_rate">
                      <a>xem thêm đánh giá sản phẩm</a>
                    </p> */}
                    </div>
                  </div>
                )) || (
                    <div
                      class="alert alert-warning"
                      role="alert"
                      style={{ marginTop: 32 }}
                    >
                      Chưa có đánh giá cho sản phẩm này.
                    </div>
                  )}
              </div>
              <div
                className="detail-info-bottom parameter"
                style={{ display: currentTab === 3 ? "block" : "none" }}
              >
                <div className="hot-items">
                  <div className="row">
                    {productsSameSource?.map((item, index) => {
                      if (index < 4) {
                        return (
                          <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                            <div
                              className="sale-item-container"
                              style={{ boxShadow: "none" }}
                            >
                              <div
                                className="sale-item-thumb productitem_search"
                                style={{ position: "relative" }}
                              >
                                <div className="add-to-cart">
                                  <i
                                    className="fas fa-directions"
                                    style={{ marginRight: 8 }}
                                  ></i>
                                </div>
                                <a
                                  href={item.source}
                                  target="_blank"
                                  className="item-image-container"
                                >
                                  <img
                                    src={
                                      JSON.parse(item.image) &&
                                        JSON.parse(item.image)[0] &&
                                        JSON.parse(item.image)[0].indexOf(
                                          "http"
                                        ) >= 0
                                        ? JSON.parse(item.image)[0]
                                        : `${item.base_url}${JSON.parse(item.image)[0]
                                        }`
                                    }
                                    style={{
                                      width: "100%",
                                      height: "207px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </a>
                              </div>
                              <div className="sale-item-info">
                                <div className="sale-price-title hover-orange">
                                  <a href={item.source} target="_blank">
                                    <span className="limit_2">{item.name}</span>
                                  </a>
                                </div>
                                <div className="sale-price-title hover-orange">
                                  <span className="limit_4">
                                    {this.formatNumber(item.price)}đ
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  {products && products.length > 0 && (
                    // (
                    //   <OwlCarousel autoplay loop items={5} margin={30} responsive={{
                    //     1201: { items: 4 },
                    //     992: { items: 3 },
                    //     768: { items: 2 },
                    //     0: { items: 1 }
                    //   }}>
                    //     {products.map(item => (
                    //       <div className="sale-item-container" style={{ boxShadow: 'none' }}>
                    //         <div className="sale-item-thumb product_item1">
                    //           {
                    //             item.dealPrice !== item.price &&
                    //             <div className="discount_112">-{Math.round(item && ((item.price - item.dealPrice) * 100 / (item.price)))}%</div>
                    //           }
                    //           <div className='add-to-cart' onClick={(e) => this.addToCart(item, e)}>
                    //             <i class="fas fa-shopping-cart" style={{ marginRight: 8 }}></i>
                    //           </div>
                    //           <a href={`/product/san-pham/${item.id}`} className="item-image-container">
                    //             <img src={getResponsiveImage(item.images.split(',')[0])} style={{ width: '100%', height: itemHeight || 'auto', objectFit: 'cover', padding: '20px' }} />
                    //           </a>
                    //         </div>
                    //         <div className="sale-item-info">
                    //           {/* <div className="sale-price-box">
                    //             <div className="price">{formatNumber(item.dealPrice)}đ</div>
                    //             {
                    //               item.dealPrice !== item.price &&
                    //               <span className="old-price">{formatNumber(item.price)}đ</span>
                    //             }
                    //           </div> */}
                    //           <div className="sale-price-title hover-orange">
                    //             <a href={`/product/san-pham/${item.id}`}>
                    //               <span className='limit_2'>{item.color ? `${item.name} ${item.color}`: item.name}</span>
                    //             </a>
                    //           </div>
                    //           <div className="sale-price-rate">
                    //             <i className="fas fa-star" />
                    //             <i className="fas fa-star" />
                    //             <i className="fas fa-star" />
                    //             <i className="fas fa-star" />
                    //             <i className="fas fa-star" />
                    //           </div>
                    //           <div className="sale-price-title hover-orange">
                    //             <span className='limit_4'>{formatNumber(item && item.dealPrice)}đ</span>
                    //             {
                    //               item.dealPrice !== item.price &&
                    //               <span className="old-price">{formatNumber(item.price)}đ</span>
                    //             }
                    //           </div>
                    //         </div>
                    //       </div>

                    //     ))
                    //       ||
                    //       <div class="alert alert-warning" role="alert">
                    //         Đang cập nhật...!
                    //       </div>
                    //     }
                    //   </OwlCarousel> ||
                    //   <div className='row'>
                    //     <div className="my_col-xm-12 my_col-sm-2 my_col-lg-3 my_col-5 ">
                    //       <div className="sale-item-container">
                    //         <div className="sale-item-thumb product_item1">
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>
                    // )
                    <div className="row">
                      <div className="my_col-xm-12 my_col-sm-2 my_col-lg-3 my_col-5 ">
                        <div className="sale-item-container">
                          <div className="sale-item-thumb product_item1"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="detail-info-bottom combine" style={{ display: currentTab === 4 ? "block" : "none" }}>
                <div className="catalogs2">
                  <div className="container">
                    <div className="hot-items">
                      {products && products.length > 0 && (
                        <OwlCarousel items={5} margin={30}>
                          {products.map(item => (
                            <div className="sale-item-container">
                              <div className="sale-item-thumb">
                                <a
                                  href={`product/${item.categories.urlSlugs}/${item.id}`}
                                  className="item-image-container"
                                >
                                  <img src={getResponsiveImage(item.images.split(',')[0])} />
                                </a>
                              </div>
                              <div className="sale-item-info">
                                <div className="sale-price-box">
                                  <div className="price">100,000đ</div>
                                  <span className="old-price">100,000đ</span>
                                </div>
                                <div className="sale-price-title hover-orange">
                                  <a>
                                    <span>Giải quyết khó khăn cùng doanh nghiệp với thế</span>
                                  </a>
                                </div>
                                <div className="sale-price-rate">
                                  <i className="fas fa-star" aria-hidden="true" />
                                  <i className="fas fa-star" aria-hidden="true" />
                                  <i className="fas fa-star" aria-hidden="true" />
                                  <i className="fas fa-star" aria-hidden="true" />
                                  <i className="fas fa-star" aria-hidden="true" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </OwlCarousel>
                      )}
                    </div>
                  </div>
                </div>
              </div>
             */}
            </div>
            <div className="catalogs2">
              <div className="container">
                <div className="sale-header">
                  <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-3 sm-col-3 col-md-3 col-lg-4 col-xl-4 dots">
                      <img src={dots} />
                    </div>
                    <div className="col-6 sm-col-6 col-md-6 col-lg-4 col-xl-4 hot-title hover-orange">
                      Sản Phẩm Cùng Mức giá
                    </div>
                    <div className="col-3 sm-col-3 col-md-3 col-lg-4 col-xl-4 dots">
                      <img src={dots} />
                    </div>
                  </div>
                </div>
                <div className="hot-items">
                  <div className="row">
                    {productsPrice?.map((item, index) => {
                      if (index < 4) {
                        return (
                          <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                            <div
                              className="sale-item-container"
                              style={{ boxShadow: "none" }}
                            >
                              <div
                                className="sale-item-thumb productitem_search"
                                style={{ position: "relative" }}
                              >
                                <div className="add-to-cart">
                                  <i
                                    className="fas fa-directions"
                                    style={{ marginRight: 8 }}
                                  ></i>
                                </div>
                                <a
                                  href={item.source}
                                  target="_blank"
                                  className="item-image-container"
                                >
                                  <img
                                    src={
                                      JSON.parse(item.image) &&
                                        JSON.parse(item.image)[0] &&
                                        JSON.parse(item.image)[0].indexOf(
                                          "http"
                                        ) >= 0
                                        ? JSON.parse(item.image)[0]
                                        : `${item.base_url}${JSON.parse(item.image)[0]
                                        }`
                                    }
                                    style={{
                                      width: "100%",
                                      height: "207px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </a>
                              </div>
                              <div className="sale-item-info">
                                <div className="sale-price-title hover-orange">
                                  <a href={item.source} target="_blank">
                                    <span className="limit_2">{item.name}</span>
                                  </a>
                                </div>
                                <div>{item.base_url}</div>
                                <div className="sale-price-title hover-orange">
                                  <span className="limit_4">
                                    {this.formatNumber(item.price)}đ
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  {products && products.length > 0 && (
                    // (
                    //   <OwlCarousel autoplay loop items={4} margin={30} responsive={{
                    //     1201: { items: 4 },
                    //     992: { items: 3 },
                    //     768: { items: 2 },
                    //     0: { items: 1 }
                    //   }}>
                    //     {products.map(item => (
                    //       <div className="sale-item-container" style={{ boxShadow: 'none' }}>
                    //         <div className="sale-item-thumb product_item">
                    //           {
                    //             item.dealPrice !== item.price &&
                    //             <div className="discount_112">-{Math.round(item && ((item.price - item.dealPrice) * 100 / (item.price)))}%</div>
                    //           }
                    //           <div className='add-to-cart' onClick={(e) => this.addToCart(item, e)}>
                    //             <i class="fas fa-shopping-cart" style={{ marginRight: 8 }}></i>
                    //           </div>
                    //           <a href={`/product/san-pham/${item.id}`} className="item-image-container">
                    //             <img src={getResponsiveImage(item.images.split(',')[0])} style={{ width: '100%', height: itemHeight || 'auto', objectFit: 'cover', padding: '20px' }} />
                    //           </a>
                    //         </div>
                    //         <div className="sale-item-info">
                    //           {/* <div className="sale-price-box">
                    //             <div className="price">{formatNumber(item.dealPrice)}đ</div>
                    //             {
                    //               item.dealPrice !== item.price &&
                    //               <span className="old-price">{formatNumber(item.price)}đ</span>
                    //             }
                    //           </div> */}
                    //           <div className="sale-price-title hover-orange">
                    //             <a href={`/product/san-pham/${item.id}`}>
                    //               <span className='limit_2'>{item.color ? `${item.name} ${item.color}`: item.name}</span>
                    //             </a>
                    //           </div>
                    //           <div className="sale-price-rate">
                    //             <i className="fas fa-star" />
                    //             <i className="fas fa-star" />
                    //             <i className="fas fa-star" />
                    //             <i className="fas fa-star" />
                    //             <i className="fas fa-star" />
                    //           </div>
                    //           <div className="sale-price-title hover-orange">
                    //             <span className='limit_4'>{formatNumber(item && item.dealPrice)}đ</span>
                    //             {
                    //               item.dealPrice !== item.price &&
                    //               <span className="old-price">{formatNumber(item.price)}đ</span>
                    //             }
                    //           </div>
                    //         </div>
                    //       </div>

                    //     ))}
                    //   </OwlCarousel> ||
                    //   <div className='row'>
                    //     <div className="my_col-xm-12 my_col-sm-2 my_col-lg-3 my_col-5 ">
                    //       <div className="sale-item-container">
                    //         <div className="sale-item-thumb product_item">
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>
                    // )
                    <div className="row">
                      <div className="my_col-xm-12 my_col-sm-2 my_col-lg-3 my_col-5 ">
                        <div className="sale-item-container">
                          <div className="sale-item-thumb product_item"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <div className="see_more">
                    <a>
                      <span className="see_more-link">Xem Tất Cả Sản Phẩm</span>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
