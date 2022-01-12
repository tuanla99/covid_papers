import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { scrollTop } from '../static/js/templateCode';
import logo from '../static/icon/logo.svg'
import cart from '../static/icon/Icon feather-shopping-cart.png'
import search from '../static/icon/Icon feather-search.png'
// import { formatNumber, getLinkProduct, getNameProduct } from '@/utils/utils';

// @connect(({ cart, webs: { dataAd } }) => ({
//   cart,
//   dataAd,
//   dataCart: cart.dataCart,
//   showCart: cart.showCart,
// }))

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickMenu: false,
      menu: false,
      newMenu: [],
      ads: {}
    }
  }

  scrollTop = (id) => {
    const top = id ? ($(`#${id}`).offset().top - 10) : 0
    $('html, body').animate({
      scrollTop: top
    }, 500);
  }


  // componentDidMount() {
  //   const { dispatch, dataAd } = this.props
  //   const { list } = dataAd || [];
  //   // console.log(list)
  //   const ads = list.find((item) => item.adsPositionsId === '33');
  //   this.setState({
  //     ads
  //   })
  //   dispatch({
  //     type: 'cart/createCart',
  //     listProducts: [],
  //     cartName: 'cart'
  //   });

  //   window.addEventListener('scroll', () => {
  //     const sticky = window.pageYOffset;
  //     const { stickMenu } = this.state;
  //     if (sticky >= 250 && !stickMenu) {
  //       this.toggleStickyMenu();
  //     }
  //     else if (sticky < 250 && stickMenu) {
  //       this.toggleStickyMenu();
  //     }
  //   });

  //   const { menuCategories } = this.props;
  //   const newMenu = menuCategories.map((item) => ({
  //     ...item,
  //     isOpened: false
  //   }))
  //   this.setState({
  //     newMenu
  //   })
  // }

  // toggleStickyMenu = () => {
  //   const { stickMenu } = this.state;
  //   this.setState({
  //     stickMenu: !stickMenu
  //   })
  // }

  // toggleChildMenu = (index) => {
  //   const { newMenu } = this.state;
  //   const status = newMenu[index].isOpened;
  //   const handledMenu = [
  //     ...newMenu.slice(0, index),
  //     {
  //       ...newMenu[index],
  //       isOpened: !status
  //     },
  //     ...newMenu.slice(index + 1)
  //   ];

  //   this.setState({
  //     newMenu: handledMenu
  //   })
  // }
  // toggleMenu = () => {
  //   const { menu } = this.state;
  //   this.setState({
  //     menu: !menu
  //   })
  // }

  // toggleCart = () => {
  //   // console.log("check");
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: "cart/showCart",
  //     showCart: false,
  //   });
  // };

  render() {
    const { asPath, dataCart, dataSite, menuCategories, showCart } = this.props;
    // console.log(menuCategories)
    const { stickMenu, menu, newMenu, ads } = this.state;
    // console.log(ads)
    const isHome = asPath === '/';
    let checkActiveMenu = false;
    // // // console.log(dataSite)
    // const { siteProfiles } = dataSite;
    const cartQuantity = dataCart && dataCart.reduce((sum, item) => {
      return sum + item.qty
    }, 0);
    // const total = dataCart.reduce((sum, item) => sum + parseInt(item.dealPrice, 10) * item.qty, 0)
    // console.log('newMenu-menu: ', newMenu)
    return (
      <>

        {/* <div className='scroll-top' onClick={() => scrollTop()}>
          <i className="fas fa-chevron-up"></i>
        </div> */}
        <div className="overlay" style={{ display: menu ? 'block' : 'none' }} onClick={this.toggleMenu} />
        <div className={menu ? "side_menu active" : 'side_menu'}>
          <span className="close-menu-btn" onClick={this.toggleMenu}>
            <i className="fas fa-times" />
          </span>
          {
            newMenu && newMenu.length > 0 &&
            <ul className="menu-categories">
              <li className={"menu-categories-item active"} id="menu-categories-item1">
                <span className="horizontal" />
                <a className="menu-title hover-orange" style={{ cursor: 'initial' }}>Danh mục</a>
              </li>
              {
                newMenu.map((item, index) => {
                  // if (index < newMenu.length - 2) {
                  const { children } = item;
                  const { isOpened } = item;
                  if (children) {
                    item.children.forEach(item2 => {
                      if (`/${item2.urlSlugs}` === asPath) {
                        checkActiveMenu = index;
                      }
                    })
                  }
                  if (item.urlSlugs === asPath || `/${item.urlSlugs}` === asPath) {
                    checkActiveMenu = index
                  }
                  return (
                    <li className={(isOpened || checkActiveMenu === index) && "menu-categories-item active" || "menu-categories-item"}>
                      {/* {
                          (isOpened || checkActiveMenu === index) &&
                          <span className="horizontal" />
                        } */}
                      <a href={`/${item.urlSlugs}`} className="menu-title hover-orange">{item.name}</a>
                      {
                        children && children.length > 0 &&
                        <ul className="categories-child-menu">
                          {
                            children.map((itemChild, indexChild) => {
                              return (
                                <li className="categories-child-item">
                                  <a href={`/${itemChild.urlSlugs}`}>
                                    {itemChild.name}
                                  </a>
                                </li>
                              )
                            })
                          }
                        </ul>
                      }
                      {
                        children && children.length > 0 && !isOpened && checkActiveMenu !== index &&
                        <i className="fas fa-plus" onClick={() => this.toggleChildMenu(index)}></i>
                        ||
                        children && children.length > 0 && isOpened && checkActiveMenu !== index &&
                        <i className="fas fa-minus" onClick={() => this.toggleChildMenu(index)}></i>
                      }
                    </li>
                  )
                  // }
                  // return null
                })
              }
            </ul>
          }
          {/* <div style={{ marginBottom: '20px' }}>
            <a href={`/${newMenu && newMenu[newMenu.length - 2] && newMenu[newMenu.length - 2].urlSlugs}`} className='store-system'>
              <i className="fas fa-plus" />
              {newMenu && newMenu[newMenu.length - 2] && newMenu[newMenu.length - 2].name}
            </a>
          </div>
          <div>
            <a href={`/${newMenu && newMenu[newMenu.length - 1] && newMenu[newMenu.length - 1].urlSlugs}`} className='store-system'>
              <i className="fas fa-plus" />
              {newMenu && newMenu[newMenu.length - 1] && newMenu[newMenu.length - 1].name}
            </a>
          </div> */}
        </div>


        <div className="header home" style={{ display: isHome ? 'none' : 'block' }}>
          <div className="header_container home">
            <div className="header-top_container home">
              <div className=" container header-top_content  home">
                <div className="menu-btn-block home">
                  <Link to="/">
                    <a onClick={() => this.scrollTop('top')} className="menu-btn-container home" onClick={this.toggleMenu}>
                      {/* <i className="fas fa-bars header-menu-icon home" /> */}
                      {/* <img className="header-menu-icon home" aria-hidden="true" src={logo} /> */}
                    </a>
                  </Link>
                </div>
                {/* <div className="logo-block home">
                  <a href="/">
                    <img className="header-logo" src={dataSite && dataSite.logo} />
                  </a>
                </div> */}
                <div className="header-top-right home">
                  {/* <a href={`/${newMenu && newMenu[newMenu.length - 2] && newMenu[newMenu.length - 2].urlSlugs}`}>
                    <span className="menu-header1" style={{ marginRight: '40px', font: 'normal normal bold 16px/22px Lato', color: '#FFFFFF' }}>Tin Tức</span>
                  </a>
                  <a href={`/${newMenu && newMenu[newMenu.length - 1] && newMenu[newMenu.length - 1].urlSlugs}`}>
                    <span className="menu-header1" style={{ marginRight: '40px', font: 'normal normal bold 16px/22px Lato', color: '#FFFFFF' }}>Liên hệ</span>
                  </a> */}
                  <div className="header-search home">
                    <form action="/SearchCar" className="header-search-form home">
                      <input
                        className="search-input"
                        style={{ background: '#04193f' }}
                        placeholder="Tìm kiếm paper"
                        name="searchname"
                        required
                      />
                      <div className="search-submit home">
                        <button className="header-search-btn home">
                          <img src={search} />
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <div className="header-cart home">
                    <div className='cart-popup' style={{ display: showCart ? 'flex' : 'none' }}>
                      <i className="fas fa-minus hide-icon" onClick={this.toggleCart}></i>
                      <i className="fas fa-check"></i>
                      <p>Thêm sản phẩm thành công!</p>
                    </div>
                    <div className="cart-quantity home">{cartQuantity}</div>
                    <a href='/cart' title={cartQuantity == 0 && 'Giỏ hàng trống!'}>
                      <img
                        className="header-logo home"
                        src={cart}
                      />
                    </a>
                  </div> */}
                </div>
                {/* <div className="header-cart responsive">
                  <div className='cart-popup' style={{ display: showCart ? 'flex' : 'none' }}>
                    <i className="fas fa-minus hide-icon" onClick={this.toggleCart}></i>
                    <i className="fas fa-check"></i>
                    <p>Thêm sản phẩm thành công!</p>
                  </div>
                  <div className="cart-quantity">{cartQuantity}</div>
                  <a href='/cart' title={cartQuantity == 0 && 'Giỏ hàng trống!'}>
                    <img
                      classname="header-logo"
                      src={cart}
                    />
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {
          isHome &&
          <div className={stickMenu ? "header home sticky on" : "header home sticky"}>
            <div className="header_container home">
              <div className="header-top_container home">
                <div className=" container header-top_content  home">
                  <div className="menu-btn-block home">
                    <a className="menu-btn-container home" onClick={this.toggleMenu}>
                      {/* <i className="fas fa-bars header-menu-icon home" /> */}
                      <img className="header-menu-icon home" aria-hidden="true" src={logo} />
                    </a>
                  </div>
                  <div className="logo-block home">
                    <a href="/">
                      {/* <img className="header-logo home" src={getResponsiveImage(dataSite.logo.split(',')[2])} /> */}
                      <img className="header-logo" src={dataSite && dataSite.logo} />
                    </a>
                  </div>
                  <div className="header-top-right home">
                    {/* <a href={`/${newMenu && newMenu[newMenu.length - 2] && newMenu[newMenu.length - 2].urlSlugs}`}>
                      <span className="menu-header1" style={{ marginRight: '40px', font: 'normal normal bold 16px/22px Lato', color: '#FFFFFF' }}>Tin Tức</span>
                    </a>
                    <a href={`/${newMenu && newMenu[newMenu.length - 1] && newMenu[newMenu.length - 1].urlSlugs}`}>
                      <span className="menu-header1" style={{ marginRight: '40px', font: 'normal normal bold 16px/22px Lato', color: '#FFFFFF' }}>Liên hệ</span>
                    </a> */}
                    <div className="header-search home">
                      <form action="/SearchCar" className="header-search-form home">
                        <input
                          className="search-input"
                          style={{ background: '#04193f' }}
                          placeholder="Tìm kiếm sản phẩm hoặc thương hiệu"
                          name="byname"
                          required
                        />
                        <div className="search-submit home">
                          <button className="header-search-btn home">
                            <img src={search} />
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* <div className="header-cart home">
                      <div className='cart-popup' style={{ display: showCart ? 'flex' : 'none' }}>
                        <i className="fas fa-minus hide-icon" onClick={this.toggleCart}></i>
                        <i className="fas fa-check"></i>
                        <p>Thêm sản phẩm thành công!</p>
                      </div>
                      <div className="cart-quantity home">{cartQuantity}</div>
                      <a href='/cart' title={cartQuantity == 0 && 'Giỏ hàng trống!'}>
                        <img
                          className="header-logo home"
                          src={cart}
                        />
                      </a>
                    </div> */}
                  </div>
                  {/* <div className="header-cart responsive">
                    <div className='cart-popup' style={{ display: showCart ? 'flex' : 'none' }}>
                      <i className="fas fa-minus hide-icon" onClick={this.toggleCart}></i>
                      <i className="fas fa-check"></i>
                      <p>Thêm sản phẩm thành công!</p>
                    </div>
                    <div className="cart-quantity">{cartQuantity}</div>
                    <a href='/cart' title={cartQuantity == 0 && 'Giỏ hàng trống!'}>
                      <img
                        classname="header-logo"
                        src={cart}
                      />
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        }

        <div className="header" style={{ display: isHome ? 'block' : 'none' }}>
          <div className="header_container">

            <div className="header-top_container">
              <div className=" container header-top_content ">
                <div className="menu-btn-block">
                  <a className="menu-btn-container" onClick={this.toggleMenu}>
                    {/* <i className="fas fa-bars header-menu-icon" aria-hidden="true" /> */}
                    <img className="header-menu-icon" aria-hidden="true" src={logo} />
                  </a>
                </div>
                <div className="logo-block">
                  <a href="/">
                    {/* <img classname="header-logo" src={getResponsiveImage(dataSite.logo.split(',')[1])} /> */}
                    <img classname="header-logo" src={dataSite && dataSite.logo} />
                  </a>
                </div>
                <div className="header-top-right">
                  {/* <a href={`/${newMenu && newMenu[newMenu.length - 2] && newMenu[newMenu.length - 2].urlSlugs}`}>
                    <span className="menu-header1" style={{ marginRight: '40px', font: 'normal normal bold 16px/22px Lato', color: '#FFFFFF' }}>Tin Tức</span>
                  </a>
                  <a href={`/${newMenu && newMenu[newMenu.length - 1] && newMenu[newMenu.length - 1].urlSlugs}`}>
                    <span className="menu-header1" style={{ marginRight: '40px', font: 'normal normal bold 16px/22px Lato', color: '#FFFFFF' }}>Liên hệ</span>
                  </a> */}
                  <div className="header-search">
                    <form action="/SearchCar" className="header-search-form">
                      <input
                        className="search-input"
                        placeholder="Tìm kiếm sản phẩm hoặc thương hiệu"
                        name="byname"
                        required
                      />
                      <div className="search-submit">
                        <button className="header-search-btn">
                          <img src={search} />
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <div className="header-cart">
                    <div className="cart-quantity">{cartQuantity}</div>
                    <a href='/cart' title={cartQuantity == 0 && 'Giỏ hàng trống!'}>
                      <img
                        classname="header-logo"
                        src={cart}
                      />
                    </a>
                  </div> */}
                </div>
                {/* <div className="header-cart responsive">
                  <div className="cart-quantity">{cartQuantity}</div>
                  <a href='/cart' title={cartQuantity == 0 && 'Giỏ hàng trống!'}>
                    <img
                      classname="header-logo"
                      src={cart}
                    />
                  </a>
                </div> */}
              </div>
              <div className="container ads-banner">
                <div className="header_ads_text display_mobile">
                  <h1 className="ads_text_title hover-orange">
                    {ads && ads.title || ''}
                  </h1>
                  <p className="ads_text_desc">
                    {ads && ads.descriptions || ''}
                  </p>
                  <button className="button-detail">
                    <span className="text-detail">Xem chi tiết</span>
                  </button>
                </div>
                <div className="header_ads_img">
                  <img src={ads && ads.contents && ads.contents.split(',')[0]} className="adsImg" />
                </div>
                <div className="header_ads_box display_desktop">
                  <div className="header_ads_text" style={{ width: 'auto' }}>
                    <h1 className="ads_text_title hover-orange ads_text_title-mobile">
                      {ads && ads.title || ''}
                    </h1>
                    <p className="ads_text_desc">
                      {ads && ads.descriptions || ''}
                    </p>
                    <button className="button-detail">
                      <span className="text-detail">Xem chi tiết</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }
}

export default Header;