import { Col, Pagination, Row, Slider } from "antd";
import DOMPurify from 'isomorphic-dompurify';
import $ from "jquery";
import { Component, default as React } from "react";
import { Link } from "react-router-dom";
import BreadCumb from "../../Component/Breadcumb";
import Header from "../../Component/Header";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { message, Input } from 'antd';
import {
  getListManufacturer,
  getListProduct,
  getSameRangeManufacturer,
  getSearchPage,
  getSearchPrice,
  getType,
  addFavoriteProduct,
  removeFavoriteProduct,
  getSearchFilter,
  listFavoriteProduct,
  getListHome,
  getSearchPaper
} from "../../networking/Server";
const productPageSize = 24;
const { Search } = Input;

let dataFilter = {
  text: '',
  page: 0,
  min_price: 0,
  max_price: 0,
  type_product: '',
  manufacturer: ''
}

class SearchCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemHeight: null,
      filterMobile: false,
      childrenCategories: [],
      products: [],
      originProducts: [],
      totalPageProduct: 0,
      currentPageProduct: 1,
      dataProducer: [],
      idProducer: "all",
      categoriesId: "all",
      toggleFilter: 0,
      sortMenu: false,
      filter: {
        value: null,
        limit: null,
      },
      currentFilter: {
        effects: 0,
        list: [],
      },
      filterPrice: {
        fromValue: null,
        toValue: 20000000000,
      },
      sort: {
        type: null,
        value: null,
      },
      selectActive: {
        category: null,
        trademark: null,
        price: null,
      },
      producerMore: false,
      check: true,
      manufacturer: [],
      total: 0,
      dataFavorite: [],
      searchName: '',
      dataPaperSearch: []
    };
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    console.log('window.location: ', decodeURI(window.location?.search)?.split("=")?.[1]?.split("+")?.join(' '));
    this.setState({
      searchName: decodeURI(window.location?.search)?.split("=")?.[1]?.split("+")?.join(' ') || "",
    });
    getSearchPaper({ search: decodeURI(window.location?.search)?.split("=")?.[1]?.split("+")?.join(' ') }).then((res) => {
      console.log('res: ', res);
      this.setState({
        dataPaperSearch: res?.hits || [],
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

  onChangeManufacturer = (value, index) => {
    dataFilter.manufacturer = value
    getSearchFilter(dataFilter).then((res) => {
      this.setState({
        products: (res && res.data) || [],
        idProducerIndex: index,
        total: (res && res.total) || 0,
      });
    });
  };

  onChangeType = (value, index) => {
    getSearchFilter(dataFilter).then((res) => {
      this.setState({
        products: (res && res.data) || [],
        idProducerIndex: index,
        total: (res && res.total) || 0,
      });
    });
  };

  toggleSortMenu = () => {
    this.setState({
      sortMenu: !this.state.sortMenu,
    });
  };

  changePage = (current, pageSize) => {
    const { data, dispatch, dataSite } = this.props;
    const { filterPrice, categoriesId, idProducer, sort } = this.state;
    const { type, value } = sort;
    console.log("page: ", current, pageSize);
    this.scrollTop("topCategory");
    dataFilter.page = current - 1
    getSearchFilter(dataFilter).then((res) => {
      this.setState({
        products: (res && res.data) || [],
        total: (res && res.total) || 0,
        currentPageProduct: current,
      });
    });
  };

  toggleFilterBtn(num) {
    if (this.state.toggleFilter === num) {
      this.setState({
        toggleFilter: 0,
      });
    } else {
      this.setState({
        toggleFilter: num,
      });
    }
  }

  toggleFilterMobile = () => {
    const { filterMobile } = this.state;
    this.setState({
      filterMobile: !filterMobile,
    });
  };

  filterByProduce = async (producerId, index) => {
    await this.setState({
      idProducer: producerId,
      idProducerIndex: index,
    });
    this.filterByCategory(null, null);
  };

  producerMore = (value) => {
    this.setState({
      producerMore: value,
    });
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

  filterByPrice = (value, limit) => {
    this.toggleFilterBtn(0);
    const { filter } = this.state;
    this.setState({
      filterPrice: {
        fromValue: value,
        toValue: limit,
      },
    });
  };

  onFilter = () => {
    const { webs, data, dispatch, dataSite } = this.props;
    const { filterPrice, sort, idProducer, categoriesId, currentPageProduct } =
      this.state;
    const { type, value } = sort;
    const minPrice = filterPrice.fromValue;
    const maxPrice = filterPrice.toValue;
    dataFilter.min_price = minPrice
    dataFilter.max_price = maxPrice
    getSearchFilter(dataFilter).then((res) => {
      this.setState({
        products: (res && res.data) || [],
        total: (res && res.total) || 0,
      });
    });
  };

  onSearch = value => {
    dataFilter.text = value
    getSearchFilter(dataFilter).then((res) => {
      this.setState({
        products: (res && res.data) || [],
        total: (res && res.total) || 0,
      });
    });
  };

  render() {
    const { data, dataSite } = this.props;
    const {
      itemHeight,
      sortMenu,
      filterMobile,
      products,
      toggleFilter,
      filter,
      selectActive,
      childrenCategories,
      currentFilter,
      currentPageProduct,
      totalPageProduct,
      filterPrice,
      sort,
      saleTime,
      dataProducer,
      idProducer,
      idProducerIndex,
      producerMore,
      check,
      manufacturer,
      total,
      dataFavorite,
      searchName,
      dataPaperSearch
    } = this.state;
    const { toValue, fromValue } = filterPrice;
    const sortType =
      currentFilter.list.length > 0 &&
      currentFilter.list.filter(
        (e) =>
          e.type === "dealPrice" || e.type === "createDate" || e.type === "name"
      )[0] &&
      currentFilter.list.filter(
        (e) =>
          e.type === "dealPrice" || e.type === "createDate" || e.type === "name"
      )[0].value;
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-light header">
          <a class="navbar-brand" href="/">

            <span class=" icon-wrapper" data-name="pwc"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M88 128h48v256H88zm144 0h48v256h-48zm-72 16h48v224h-48zm144 0h48v224h-48zm72-16h48v256h-48z"></path><path d="M104 104V56H16v400h88v-48H64V104zm304-48v48h40v304h-40v48h88V56z"></path></svg></span>

          </a>

          <div class="navbar-mobile-twitter d-lg-none">
            <a rel="noreferrer" href="https://twitter.com/paperswithcode">
              <span class=" icon-wrapper icon-fa icon-fa-brands" data-name="twitter"><svg viewBox="0 0 512.001 515.25" xmlns="http://www.w3.org/2000/svg"><path d="M459.37 152.016c.326 4.548.326 9.097.326 13.645 0 138.72-105.583 298.558-298.559 298.558C101.685 464.22 46.457 447 0 417.114c8.447.973 16.568 1.298 25.34 1.298 49.054 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.113-72.772 6.499.975 12.996 1.624 19.819 1.624 9.42 0 18.843-1.3 27.613-3.573-48.08-9.747-84.142-51.98-84.142-102.984v-1.3c13.968 7.798 30.213 12.67 47.43 13.32-28.263-18.843-46.78-51.006-46.78-87.391 0-19.492 5.196-37.36 14.294-52.954 51.654 63.674 129.3 105.258 216.364 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.827 46.782-104.934 104.934-104.934 30.214 0 57.502 12.67 76.671 33.136 23.715-4.548 46.455-13.319 66.599-25.34-7.798 24.367-24.366 44.834-46.132 57.828 21.117-2.274 41.584-8.122 60.426-16.244-14.292 20.791-32.161 39.309-52.628 54.253z"></path></svg></span>
            </a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-bs-toggle="collapse" data-target="#top-menu" data-bs-target="#top-menu" aria-controls="top-menu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="top-menu">
            <ul class="navbar-nav mr-auto navbar-nav__left light-header">
              <li class="nav-item header-search">
                <form action="/search" method="get" id="id_global_search_form" autocomplete="off">
                  {/* <input type="text" name="q_meta" style={{ display: 'none' }} id="q_meta" /> */}
                  {/* <input type="hidden" name="q_type" id="q_type" /> */}
                  <input defaultValue={searchName} id="id_global_search_input" autocomplete="off" name="text" class="global-search ui-autocomplete-input" type="search" placeholder="Search" />
                  <button type="submit" class="icon"><span class=" icon-wrapper icon-fa icon-fa-light" data-name="search"><svg viewBox="0 0 512.025 520.146" xmlns="http://www.w3.org/2000/svg"><path d="M508.5 482.6c4.7 4.7 4.7 12.3 0 17l-9.9 9.9c-4.7 4.7-12.3 4.7-17 0l-129-129c-2.2-2.3-3.5-5.3-3.5-8.5v-10.2C312 396 262.5 417 208 417 93.1 417 0 323.9 0 209S93.1 1 208 1s208 93.1 208 208c0 54.5-21 104-55.3 141.1H371c3.2 0 6.2 1.2 8.5 3.5zM208 385c97.3 0 176-78.7 176-176S305.3 33 208 33 32 111.7 32 209s78.7 176 176 176z"></path></svg></span></button>
                </form>
              </li>





              <li class="nav-item">
                <a class="nav-link" href="/sota">
                  Browse State-of-the-Art
                </a>
              </li>

              {/*         
          <li class="nav-item">
            <a class="nav-link" href="/datasets"> Datasets </a>
          </li> */}



              <li class="nav-item">
                <a class="nav-link" href="/methods">Methods</a>
              </li>


              {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" id="navbarDropdownRepro" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            More
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownRepro">
        
            <a class="dropdown-item" href="/newsletter">Newsletter</a>
            <a class="dropdown-item" href="/rc2021">RC2021</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/about">About</a>
            <a class="dropdown-item" href="/trends">Trends</a>
              
                  <a class="dropdown-item" href="https://portal.paperswithcode.com/">
                      Portals
                  </a>
              
              
                  <a class="dropdown-item" href="/libraries"> Libraries </a>
              
          </div>
        </li> */}

              {/* <li class="nav-item we-are-hiring">
              <a class="nav-link" href="/careers"><span>We are hiring!</span></a>
          </li> */}




            </ul>

            <ul class="navbar-nav ml-auto navbar-nav__right navbar-subscribe justify-content-center align-items-center">


              {/* <li class="nav-item">
        <a class="nav-link" rel="noreferrer" href="https://twitter.com/paperswithcode">
          <span class="nav-link-social-icon icon-wrapper icon-fa icon-fa-brands" data-name="twitter"><svg viewBox="0 0 512.001 515.25" xmlns="http://www.w3.org/2000/svg"><path d="M459.37 152.016c.326 4.548.326 9.097.326 13.645 0 138.72-105.583 298.558-298.559 298.558C101.685 464.22 46.457 447 0 417.114c8.447.973 16.568 1.298 25.34 1.298 49.054 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.113-72.772 6.499.975 12.996 1.624 19.819 1.624 9.42 0 18.843-1.3 27.613-3.573-48.08-9.747-84.142-51.98-84.142-102.984v-1.3c13.968 7.798 30.213 12.67 47.43 13.32-28.263-18.843-46.78-51.006-46.78-87.391 0-19.492 5.196-37.36 14.294-52.954 51.654 63.674 129.3 105.258 216.364 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.827 46.782-104.934 104.934-104.934 30.214 0 57.502 12.67 76.671 33.136 23.715-4.548 46.455-13.319 66.599-25.34-7.798 24.367-24.366 44.834-46.132 57.828 21.117-2.274 41.584-8.122 60.426-16.244-14.292 20.791-32.161 39.309-52.628 54.253z"></path></svg></span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" rel="noreferrer" href="https://join.slack.com/t/paperswithcode/shared_invite/zt-trydl2sw-m56OB~HGzjQQuP2Z~KVbVA">
          <span class="nav-link-social-icon nav-link-social-icon-slack icon-wrapper" data-name="slack"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 270"><path d="M99.4 151.2c0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9v-32.3z" fill="#e01e5a"></path><path d="M118.8 99.4c-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v12.9h-12.9zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H86.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path><path d="M170.6 118.8c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9h-12.9v-12.9zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9V86.5c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path><path d="M151.2 170.6c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9v-12.9h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9h-32.3z" fill="#ecb22e"></path></svg></span>
        </a>
      </li>

      
        <li class="nav-item">
          <a id="signin-link" class="nav-link" href="/accounts/login?next=/">Sign In</a>
        </li> */}

            </ul>
          </div>
        </nav>
        <div class="container content content-buffer ">
          <div class="title home-page-header">
            <div class="row">
              <div class="col-lg-6 left-header">
                <div class="badges-navbar ">

                  <a href="/" class="">
                    <div class="badge badge-trending badge-active">
                      <span class=" icon-wrapper icon-ion" data-name="trending-up-outline"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 144h112v112"></path><path d="M48 368l121.37-121.37a32 32 0 0 1 45.26 0l50.74 50.74a32 32 0 0 0 45.26 0L448 160" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path></svg></span> Top
                    </div>
                  </a>



                  <a class="trending-option " href="./top-social">
                    <div class="badge badge-trending">
                      <span class=" icon-wrapper icon-ion" data-name="flame-outline"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M112 320c0-93 124-165 96-272 66 0 192 96 192 272a144 144 0 0 1-288 0z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M320 368c0 57.71-32 80-64 80s-64-22.29-64-80 40-86 32-128c42 0 96 70.29 96 128z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path></svg></span> Hot
                    </div>
                  </a>



                  <a href="./latest" class="">
                    <div class="badge badge-trending">
                      <span class=" icon-wrapper icon-ion" data-name="sparkles-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path d="M259.92 262.91L216.4 149.77a9 9 0 0 0-16.8 0l-43.52 113.14a9 9 0 0 1-5.17 5.17L37.77 311.6a9 9 0 0 0 0 16.8l113.14 43.52a9 9 0 0 1 5.17 5.17l43.52 113.14a9 9 0 0 0 16.8 0l43.52-113.14a9 9 0 0 1 5.17-5.17l113.14-43.52a9 9 0 0 0 0-16.8l-113.14-43.52a9 9 0 0 1-5.17-5.17zM108 68L88 16 68 68 16 88l52 20 20 52 20-52 52-20-52-20zm318.67 49.33L400 48l-26.67 69.33L304 144l69.33 26.67L400 240l26.67-69.33L496 144l-69.33-26.67z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32">
                          </path>
                        </svg>
                      </span> New
                    </div>
                  </a>


                  <a href="./greatest" class="">
                    <div class="badge badge-trending">
                      <span class=" icon-wrapper icon-ion" data-name="trophy-outline">
                        <svg viewBox="0 0 384 513.795" xmlns="http://www.w3.org/2000/svg"><path d="M369.9 98.88c9 9 14.1 21.3 14.1 34v332.1c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48v-416c0-26.5 21.5-48 48-48.1h204.1c12.7 0 24.9 5.1 33.9 14.1zm-37.8 30.1L256 52.88v76.1h76.1zM48 464.98h288v-288H232c-13.3 0-24-10.7-24-24v-104H48v416z"></path></svg>                    </span> CV
                    </div>
                  </a>
                  <a href="./greatest" class="">
                    <div class="badge badge-trending">
                      <span class=" icon-wrapper icon-ion" data-name="trophy-outline">
                        <svg viewBox="0 0 384 513.795" xmlns="http://www.w3.org/2000/svg"><path d="M369.9 98.88c9 9 14.1 21.3 14.1 34v332.1c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48v-416c0-26.5 21.5-48 48-48.1h204.1c12.7 0 24.9 5.1 33.9 14.1zm-37.8 30.1L256 52.88v76.1h76.1zM48 464.98h288v-288H232c-13.3 0-24-10.7-24-24v-104H48v416z"></path></svg>                    </span> NLP
                    </div>
                  </a>
                  <a href="./greatest" class="">
                    <div class="badge badge-trending">
                      <span class=" icon-wrapper icon-ion" data-name="trophy-outline">
                        <svg viewBox="0 0 384 513.795" xmlns="http://www.w3.org/2000/svg"><path d="M369.9 98.88c9 9 14.1 21.3 14.1 34v332.1c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48v-416c0-26.5 21.5-48 48-48.1h204.1c12.7 0 24.9 5.1 33.9 14.1zm-37.8 30.1L256 52.88v76.1h76.1zM48 464.98h288v-288H232c-13.3 0-24-10.7-24-24v-104H48v416z"></path></svg>                    </span> Covid
                    </div>
                  </a>

                </div>
                <h2 class="home-page-title">
                  Search: {searchName}

                </h2>

              </div>



              <div class="col-lg-6 index-group">
                <div style={{ float: 'right' }} class="btn-group btn-group-sm pull-right home-page-navigation" role="group">





                  {/* <span class="list-button-subscribe">
                  <a href="" class="list-button " data-toggle="modal" data-target="#emailModal"><span class=" icon-wrapper icon-fa icon-fa-regular" data-name="envelope"><svg viewBox="0 0 512 513.795" xmlns="http://www.w3.org/2000/svg"><path d="M464 64.98c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h416zm0 48H48v40.804c22.425 18.263 58.18 46.66 134.587 106.49 16.834 13.242 50.205 45.076 73.413 44.701 23.212.372 56.572-31.454 73.413-44.7 76.42-59.84 112.165-88.231 134.587-106.49V112.98zm-416 288h416V215.379c-22.915 18.252-55.419 43.869-104.947 82.652-22.544 17.748-60.336 55.178-103.053 54.947-42.928.231-81.205-37.75-103.062-54.955-49.53-38.784-82.024-64.395-104.938-82.646V400.98z"></path></svg></span> Subscribe</a>
                </span> */}

                </div>
              </div>

            </div>
          </div>


          <div class="infinite-container text-center home-page">







            {dataPaperSearch?.map(item => (
              <div class="row infinite-item item paper-card">


                <div class="col-lg-3 item-image-col">


                  <a href="/paper/wantwords-an-open-source-online-reverse">
                    <div class="item-image" style={{ backgroundImage: "url('https://production-media.paperswithcode.com/thumbnails/papergithubrepo/0bf9dda8-65b9-49cb-85bf-c9d04aec870c.jpg')" }}> </div>
                  </a>


                </div>


                <div class="col-lg-9 item-col">
                  <div class="row">
                    <div class="col-lg-9 item-content">
                      <h1>
                        <Link to={`/paper?id=${item?._source?.id}`}>
                          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.highlight?.title) }} />
                        </Link>
                      </h1>
                      <p class="author-section" style={{ paddingTop: '2px' }}>
                        <span class="item-github-link">
                          {item?._source?.author}
                        </span>
                      </p>
                      <p class="item-strip-abstract">
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.highlight?.abstract?.[0]) }} />
                      </p>
                      <div class="sota">
                      </div>
                      <p>
                      </p>
                    </div>
                    <div class="col-lg-3 item-interact text-center">
                      <div class="entity" style={{ marginBottom: '20px' }}>
                        <Link to={`/paper?id=${item?._source?.id}`} class="badge badge-light ">
                          <span class=" icon-wrapper icon-ion" data-name="document"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M428 224H288a48 48 0 0 1-48-48V36a4 4 0 0 0-4-4h-92a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h224a64 64 0 0 0 64-64V228a4 4 0 0 0-4-4z"></path><path d="M419.22 188.59L275.41 44.78a2 2 0 0 0-3.41 1.41V176a16 16 0 0 0 16 16h129.81a2 2 0 0 0 1.41-3.41z"></path></svg></span> Paper
                        </Link>
                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class="loading" style={{ display: "none" }}>
            <div class="loader-ellips infinite-scroll-request">
              <span class="loader-ellips__dot"></span>
              <span class="loader-ellips__dot"></span>
              <span class="loader-ellips__dot"></span>
              <span class="loader-ellips__dot"></span>
            </div>
          </div>


          <a class="infinite-more-link" href="?page=2"></a>






        </div>
      </>
    );
  }
}
export default SearchCar;
