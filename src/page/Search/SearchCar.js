import { notification, Pagination } from "antd";
import "antd/dist/antd.css";
import $ from "jquery";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import BreadCumb from "../../Component/Breadcumb";
import Header from "../../Component/Header";
import { getSearch, getSearchPageName } from "../../networking/Server";
import "./SearchCar.css";

const pageSize = 8;
const productPageSize = 24;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: "",
      itemHeight: null,
      products: [],
      current: 1,
      total: 0,
      byname: null,
      searchName: "",
      currentPageProduct: 1,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // console.log('window.location: ', decodeURI(window.location?.search)?.split("=")?.[1]?.split("+")?.join(' '));
    this.setState({
      searchName: decodeURI(window.location?.search)?.split("=")?.[1]?.split("+")?.join(' ') || "",
    });
    getSearch(decodeURI(window.location?.search)?.split("=")?.[1]?.split("+")?.join(' ') || "").then((res) => {
      console.log("res: ", res);
      this.setState({
        products: (res && res.data) || [],
        total: (res && res.total) || 0,
      });
    });
  }

  scrollTop = (id) => {
    const top = id ? $(`#${id}`).offset().top - 10 : 0;
    $("html, body").animate(
      {
        scrollTop: top,
      },
      500
    );
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    getSearch().then((res) => {
      console.log("res: ", res);
      // if (res == 'empty') {
      //   this.setState({ errors: 'Tài khoản hoặc mật khẩu trống' })
      // } else
      if (res && res.access_token) {
        // console.log('res: ', res)
        notification["success"]({
          message: "Đăng nhập thành công",
          placement: "bottomRight",
        });
        // sessionStorage.setItem("user_login", this.state.username);
        // this.props.history.push(`/`)
      } else {
        notification["error"]({
          message: "Tài khoản hoặc mật khẩu sai",
          placement: "bottomRight",
        });
        // message.error('Tài khoản hoặc mật khẩu sai');
        // this.setState({ errors: 'Tài khoản hoặc mật khẩu sai' })
      }
    });
  }

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

  changePage = (current, pageSize) => {
    console.log("page: ", current, pageSize);
    this.scrollTop("topCategory");
    getSearchPageName(
      window.location.search?.split("=")?.[1] || "",
      current - 1
    ).then((res) => {
      this.setState({
        products: (res && res.data) || [],
        total: (res && res.total) || 0,
        currentPageProduct: current,
      });
    });
  };

  render() {
    const {
      total,
      itemHeight,
      current,
      products,
      byname,
      searchValue,
      searchName,
      currentPageProduct,
    } = this.state;
    // console.log('window.location: ', window.location.search?.split('=')?.[1] || '');
    return (
      <>
        <Header />
        <BreadCumb node1={searchName || ""} />
        <div className="body product search">
          <div
            className="container"
            style={{ marginBottom: "30px" }}
            id="topCategory"
          >
            <div className="row">
              <div className="search-container col-12" id="top">
                <div
                  className="alert alert-info"
                  role="alert"
                  style={{ width: "100%" }}
                >
                  {`Kết quả tìm kiếm cho '${searchName}':`}
                </div>
                {/* <div className="list-head">
                  <div className="quantities">
                    <p>
                      Hiển thị:{' '}
                      <span className="active-orange product-qty">{`${products &&
                        products.length}/${total}`}
                      </span>{' '}
                      sản phẩm
                    </p>
                  </div>
                </div> */}
                <div className="product-list-container">
                  <div className="row">
                    {products && products.length > 0 ? (
                      products.map(
                        (item, index) => {
                          // if (index < pageSize) {
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
                                  {/* {
                                    item.dealPrice !== item.price &&
                                    <div className="discount_112">-{Math.round(item && ((item.price - item.dealPrice) * 100 / (item.price)))}%</div>
                                  } */}
                                  <a href={item.source} target="_blank">
                                    <div className="add-to-cart">
                                      <i
                                        className="fas fa-directions"
                                        style={{ marginRight: 8 }}
                                      ></i>
                                    </div>
                                  </a>
                                  <Link to="/compare-price">
                                    <a
                                      // href={item.source}
                                      onClick={() => {
                                        localStorage.setItem(
                                          "detailId",
                                          item.id
                                        );
                                        this.scrollTop("top");
                                      }}
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
                                  </Link>
                                </div>
                                <div className="sale-item-info">
                                  {/* <div className="sale-price-box">
                            <div className="price">{formatNumber(item.dealPrice)}đ</div>
                            {
                              item.dealPrice !== item.price &&
                              <span className="old-price">{formatNumber(item.price)}đ</span>
                            }
                          </div> */}
                                  <div className="sale-price-title hover-orange">
                                    <Link to="/compare-price">
                                      <a
                                        // href={item.source}
                                        onClick={() => {
                                          localStorage.setItem(
                                            "detailId",
                                            item.id
                                          );
                                          this.scrollTop("top");
                                        }}
                                      >
                                        <span className="limit_2">
                                          {item.color
                                            ? `${item.name} ${item.color}`
                                            : item.name}
                                        </span>
                                      </a>
                                    </Link>
                                  </div>
                                  <div>
                                    {item.base_url}&nbsp;-&nbsp;Tình trạng:{" "}
                                    {item.type}
                                  </div>
                                  {/* <div className="sale-price-rate" style={{ marginBottom: '17px' }}>
                                    <i className="fas fa-star" style={{ margin: '0px 2px' }} />
                                    <i className="fas fa-star" style={{ margin: '0px 2px' }} />
                                    <i className="fas fa-star" style={{ margin: '0px 2px' }} />
                                    <i className="fas fa-star" style={{ margin: '0px 2px' }} />
                                    <i className="fas fa-star" style={{ margin: '0px 2px' }} />
                                  </div> */}
                                  <div className="sale-price-title hover-orange">
                                    <span className="limit_4">
                                      {this.formatNumber(item.price)}đ
                                    </span>
                                    {/* {
                                      item.dealPrice !== item.price &&
                                      <span className="old-price">{this.formatNumber(item.price)}đ</span>
                                    } */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        // }
                      )
                    ) : (
                      <>
                        {/* <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                          <div
                            className="sale-item-container"
                            style={{ visibility: 'hidden' }}
                          >
                            <div className="sale-item-thumb productitem_search" />

                          </div>
                        </div>
                        <div className="col-12 alert alert-warning" role="alert">
                          Không có sản phẩm trong danh mục này!
                        </div> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Pagination
              style={{ textAlign: "end" }}
              onChange={this.changePage}
              // changePage={this.changePage}
              total={total}
              current={currentPageProduct}
              pageSize={productPageSize}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Login;
