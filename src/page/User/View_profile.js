// View profile of an user
import React, { Component } from 'react'
import { myAccount } from './UserFunction';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { update_user } from './UserFunction'
import Header from '../../Component/Header';
import ZoomImage from '../../Component/ZoomImage'
import dots from '../../static/images/dots.png'

class View_profile extends Component{

    constructor(props) {
        super(props)
        this.state = {
          username :  sessionStorage.getItem('user_login'),
          first_name : '',
          middle_name : '',
          last_name : '',
          email : '',
          mainImage: 'https://image.flaticon.com/icons/png/512/147/147144.png',
          gender : '',
          birth_date : '',
          roles : '',
          favourite : '',
          currentTab : 1,
        }
      }
    
    refreshDataFromServer = () => {
        myAccount(sessionStorage.getItem('user_login')).then((userFromServer) => {
          this.setState({
            gender: userFromServer[0].gender,
            first_name:userFromServer[0].first_name,
            middle_name :userFromServer[0].middle_name,
            last_name :userFromServer[0].last_name,
            email :userFromServer[0].email,
            mainImage: 'https://image.flaticon.com/icons/png/512/147/147144.png',
            gender :userFromServer[0].gender,
            birth_date :userFromServer[0].birth_date,
            roles :userFromServer[0].roles,
            favourite :userFromServer[0].favourite,
            currentTab : 1,
          });
          console.log(this.state.gender)
    }).catch((error) => {
    console.error(error);
    });
    }
    render(){
      const {
        first_name,
        middle_name,
        last_name,
        email,
        mainImage,
        gender,
        birth_date,
        roles,
        favourite,
        currentTab,
  
      } = this.state;

        return(
            <>
            <Header/>
            <div className="body product detail">
                <div className="container">
                    <div className="product-info-top">
                      <div style={{ height: '400px', marginTop:'150px'}}>
                        <img src={this.state.mainImage} style={{ height: '300px',  width: '300px', borderRadius:'50%',marginLeft:'50px'}}></img>
                        <h3 style={{ fontWeight: '700', fontSize: '30px', marginTop: "50px",marginLeft:'100px' }}>DUY QUANG</h3>
                      </div>
                      <div style={{ height: '400px', marginTop:'180px'}} >
                        <table>
                          <tr>
                            <td>
                              <span style={{ width: '135px', marginTop: '30px', paddingRight:'20px',paddingLeft:'40px' }}>Tài khoản:</span>
                            </td>
                            <td>
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="dia_chi"
                                  placeholder="Địa chỉ"
                                  type="text"
                                  id="dia_chi"
                                  value={this.state.dia_chi}
                                  onChange={this.onChange}
                                />
                            </td>
                            <td>
                              <span style={{ width: '135px', marginTop: '30px',paddingRight:'20px',paddingLeft:'40px' }}>Giới tính:</span>
                            </td>
                            <td>
                              <RadioGroup value={this.state.gender} horizontal>
                              <RadioButton value="Nam">Nam</RadioButton>
                              <RadioButton value="Nữ">Nữ</RadioButton>
                              </RadioGroup>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span style={{ width: '135px', marginTop: '30px', paddingRight:'20px',paddingLeft:'40px' }}>Tên:</span>
                            </td>
                            <td>
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="dia_chi"
                                  placeholder="Địa chỉ"
                                  type="text"
                                  id="dia_chi"
                                  value={this.state.first_name}
                                  onChange={this.onChange}
                                />
                            </td>
                            <td>
                              <span style={{ width: '135px', marginTop: '30px',paddingRight:'20px',paddingLeft:'40px' }}>Tên đệm:</span>
                            </td>
                            <td>
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="dia_chi"
                                  placeholder="Địa chỉ"
                                  type="text"
                                  id="dia_chi"
                                  value={this.state.middle_name}
                                  onChange={this.onChange}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span style={{ width: '135px', marginTop: '30px', paddingRight:'20px',paddingLeft:'40px' }}>Tên họ:</span>
                            </td>
                            <td>
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="dia_chi"
                                  placeholder="Địa chỉ"
                                  type="text"
                                  id="dia_chi"
                                  value={this.state.last_name}
                                  onChange={this.onChange}
                                />
                            </td>
                            <td>
                              <span style={{ width: '135px', marginTop: '30px',paddingRight:'20px',paddingLeft:'40px' }}>Vai trò:</span>
                            </td>
                            <td>
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="dia_chi"
                                  placeholder="vai trò"
                                  type="text"
                                  id="dia_chi"
                                  value={this.state.roles}
                                  onChange={this.onChange}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span style={{ width: '135px', marginTop: '30px', paddingRight:'20px',paddingLeft:'40px' }}>Email:</span>
                            </td>
                            <td>
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="dia_chi"
                                  placeholder="Địa chỉ"
                                  type="text"
                                  id="dia_chi"
                                  value={this.state.email}
                                  onChange={this.onChange}
                                />
                            </td>
                            <td>
                              <span style={{ width: '135px', marginTop: '30px',paddingRight:'20px',paddingLeft:'40px' }}>Ngày sinh:</span>
                            </td>
                            <td>
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="dia_chi"
                                  placeholder="Địa chỉ"
                                  type="text"
                                  id="dia_chi"
                                  value={this.state.birth_date}
                                  onChange={this.onChange}
                                />
                            </td>
                          </tr>
                        </table>
              </div>
            </div>
                    <div className="product-info-bottom">
                        <ul className="tabs">
                          <li className={currentTab === 1 ? "hover-orange active" : "hover-orange"} onClick={() => { this.setState({ currentTab: 1 }) }}>Sản Phẩm đang quan tâm</li>
                          <li className={currentTab === 2 ? "hover-orange active" : "hover-orange"} onClick={() => { this.setState({ currentTab: 2 }) }}>About</li>
                        </ul>
                        <div className="detail-info-bottom parameter" style={{ display: currentTab === 1 ? "block" : "none" }}>
                          <div className="hot-items">
                            <div className="row">
                              <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                <div className="sale-item-container" style={{ boxShadow: 'none' }}>
                                  <div className="sale-item-thumb productitem_search" style={{ position: "relative" }}>
                                    <div className='add-to-cart'>
                                      <i className="fas fa-directions" style={{ marginRight: 8 }}></i>
                                    </div>
                                    <a className="item-image-container">
                                      <img src='https://img1.oto.com.vn/crop/458x344/2021/04/12/20210412105439-62f1_wm.jpg' style={{ width: '100%', height: '207px', objectFit: 'cover' }} />
                                    </a>
                                  </div>
                                  <div className="sale-item-info">
                                    <div className="sale-price-title hover-orange">
                                      <a >
                                        <span className='limit_2'>VinFast Lux SA 2.0</span>
                                      </a>
                                    </div>
                                    <div className="sale-price-title hover-orange">
                                      <span className='limit_4'>Giá từ 1 tỉ 226 tr</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                <div className="sale-item-container" style={{ boxShadow: 'none' }}>
                                  <div className="sale-item-thumb productitem_search" style={{ position: "relative" }}>
                                    <div className='add-to-cart'>
                                      <i className="fas fa-directions" style={{ marginRight: 8 }}></i>
                                    </div>
                                    <a className="item-image-container">
                                      <img src='https://img1.oto.com.vn/crop/458x344/2021/04/12/20210412105439-62f1_wm.jpg' style={{ width: '100%', height: '207px', objectFit: 'cover' }} />
                                    </a>
                                  </div>
                                  <div className="sale-item-info">
                                    <div className="sale-price-title hover-orange">
                                      <a >
                                        <span className='limit_2'>VinFast Lux SA 2.0</span>
                                      </a>
                                    </div>
                                    <div className="sale-price-title hover-orange">
                                      <span className='limit_4'>Giá từ 1 tỉ 226 tr</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                <div className="sale-item-container" style={{ boxShadow: 'none' }}>
                                  <div className="sale-item-thumb productitem_search" style={{ position: "relative" }}>
                                    <div className='add-to-cart'>
                                      <i className="fas fa-directions" style={{ marginRight: 8 }}></i>
                                    </div>
                                    <a className="item-image-container">
                                      <img src='https://img1.oto.com.vn/crop/458x344/2021/04/12/20210412105439-62f1_wm.jpg' style={{ width: '100%', height: '207px', objectFit: 'cover' }} />
                                    </a>
                                  </div>
                                  <div className="sale-item-info">
                                    <div className="sale-price-title hover-orange">
                                      <a >
                                        <span className='limit_2'>VinFast Lux SA 2.0</span>
                                      </a>
                                    </div>
                                    <div className="sale-price-title hover-orange">
                                      <span className='limit_4'>Giá từ 1 tỉ 226 tr</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                <div className="sale-item-container" style={{ boxShadow: 'none' }}>
                                  <div className="sale-item-thumb productitem_search" style={{ position: "relative" }}>
                                    <div className='add-to-cart'>
                                      <i className="fas fa-directions" style={{ marginRight: 8 }}></i>
                                    </div>
                                    <a className="item-image-container">
                                      <img src='https://img1.oto.com.vn/crop/458x344/2021/04/12/20210412105439-62f1_wm.jpg' style={{ width: '100%', height: '207px', objectFit: 'cover' }} />
                                    </a>
                                  </div>
                                  <div className="sale-item-info">
                                    <div className="sale-price-title hover-orange">
                                      <a >
                                        <span className='limit_2'>VinFast Lux SA 2.0</span>
                                      </a>
                                    </div>
                                    <div className="sale-price-title hover-orange">
                                      <span className='limit_4'>Giá từ 1 tỉ 226 tr</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {
                            // products && products.length > 0 &&
                              <div className='row'>
                                <div className="my_col-xm-12 my_col-sm-2 my_col-lg-3 my_col-5 ">
                                  <div className="sale-item-container">
                                    <div className="sale-item-thumb product_item1">
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                        <div className="detail-info-bottom rates" style={{ display: currentTab === 2 ? "block" : "none" }}>
                          {
                            // feedbackList && feedbackList.length > 0 &&
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
                            </div>
                          }
                        </div>
                        </div>
                  </div>
                  </div>   
            
            
            </>
    )
    }
}
export default View_profile