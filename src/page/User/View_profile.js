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
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Row, Col } from 'antd';

class View_profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: sessionStorage.getItem('user_login'),
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      mainImage: 'https://image.flaticon.com/icons/png/512/147/147144.png',
      gender: '',
      birth_date: '',
      roles: '',
      favourite: '',
      currentTab: 1,
    }
  }

  refreshDataFromServer = () => {
    myAccount(sessionStorage.getItem('user_login')).then((userFromServer) => {
      this.setState({
        gender: userFromServer[0].gender,
        first_name: userFromServer[0].first_name,
        middle_name: userFromServer[0].middle_name,
        last_name: userFromServer[0].last_name,
        email: userFromServer[0].email,
        mainImage: 'https://image.flaticon.com/icons/png/512/147/147144.png',
        gender: userFromServer[0].gender,
        birth_date: userFromServer[0].birth_date,
        roles: userFromServer[0].roles,
        favourite: userFromServer[0].favourite,
        currentTab: 1,
      });
      console.log(this.state.gender)
    }).catch((error) => {
      console.error(error);
    });
  }
  render() {
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
                  <input id="id_global_search_input" autocomplete="off" name="text" class="global-search ui-autocomplete-input" type="search" placeholder="Search" />
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
              <li class="nav-item">
                <a class="nav-link" href="/statistic">Statistic</a>
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
        <Row gutter={16} style={{marginTop:"16px"}}>
          <Col span={12}>
        <HighchartsReact
          // allowChartUpdate={keyCounting}
          highcharts={Highcharts}
          options={{
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
            },
            title: {
              text: 'Number of papers'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            accessibility: {
              point: {
                valueSuffix: '%'
              }
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.y}'
                }
              }
            },
            series: [{
              name: 'Value',
              colorByPoint: true,
              data: [{
                name: 'Cv',
                y: 117,
              }, {
                name: 'NLP',
                y: 284
              }, {
                name: 'Covid',
                y: 173
              }]
            }]
          }}
        />
        </Col>
        <Col span={12}>
        <HighchartsReact
          // allowChartUpdate={keyCounting}
          highcharts={Highcharts}
          options={{
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
            },
            title: {
              text: 'Number of accesses'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            accessibility: {
              point: {
                valueSuffix: '%'
              }
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.y}'
                }
              }
            },
            series: [{
              name: 'Value',
              colorByPoint: true,
              data: [{
                name: 'Cv',
                y: 317,
              }, {
                name: 'NLP',
                y: 163
              }, {
                name: 'Covid',
                y: 257
              }]
            }]
          }}
        />
        </Col>
        </Row>
        <div style={{padding:'16px'}}>
        <HighchartsReact
          // allowChartUpdate={keyCounting}
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'column'
            },
            title: {
              text: 'Top 10 most visited papers January 2021'
            },
            xAxis: {
              categories: [
                'Est est consectetur cupiditate explicabo facilis. Enim dolorem laboriosam id accusamus',
                'Maiores et officiis qui ut. Esse voluptatem odio aut deserunt et. Maxime dolores fuga ad possimus',
                'Omnis iure quo laboriosam quis eos. Architecto est libero aliquam officiis dolorem',
                'Rem voluptas similique aperiam in nisi eos. Non et voluptates mollitia facere atque et eius id',
                'Et deleniti laudantium qui velit explicabo error voluptatem. Et dolores ipsa sint et facere alias',
                'Dolore dolores similique sint quia qui harum temporibus. Laboriosam quia voluptatem dolore numquam',
                'Occaecati quisquam voluptatem non. Recusandae voluptas quas consectetur voluptate soluta possimus',
                'Omnis iure quo laboriosam quis eos. Architecto est libero aliquam officiis dolorem',
                'Est sequi itaque nulla. Autem iusto velit qui repellendus. Quo blanditiis autem aut non',
                'Qui ullam qui vero ipsam iure sint nemo. Deleniti magni eum modi provident quo ut',
              ],
              crosshair: true
            },
            yAxis: {
              min: 0,
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0
              }
            },
            series: [{
              showInLegend: false,
              name: 'Value',
              data: [71, 65, 63, 59, 52, 45, 41, 40, 37, 26]

            }]
          }}
        />
        </div>
      </>
    )
  }
}
export default View_profile