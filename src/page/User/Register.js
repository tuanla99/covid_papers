import React, { Component } from 'react'
import { register, getDetailParper } from '../../networking/Server'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { notification } from 'antd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
//const selected = moment(isoDateStr).toDate();
// const [startDate, setStartDate] = useState(0);
class Register extends Component {
  constructor() {
    super()
    this.state = {
      dataPaperDetail: {},
    }
  }


  componentDidMount() {
    getDetailParper({ id: decodeURI(window.location?.search)?.split("=")?.[1]?.split("+")?.join(' ') }).then((res) => {
      console.log('res: ', res);
      this.setState({
        dataPaperDetail: res || {},
      });
    });
  }
  render() {
    const { dataPaperDetail } = this.state
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
                  <input type="text" name="q_meta" style={{ display: 'none' }} id="q_meta" />
                  <input type="hidden" name="q_type" id="q_type" />
                  <input id="id_global_search_input" autocomplete="off" value="" name="q" class="global-search ui-autocomplete-input" type="search" placeholder="Search" />
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
        <div class="container content content-buffer ">




          <main>
            <div class="paper-title">
              <div class="row">
                <div class="col-md-12">
                  <h1>
                    {dataPaperDetail?.title}
                  </h1>
                  <p class="author-section" style={{ paddingTop: '2px' }}>
                    <span class="item-github-link">
                      {dataPaperDetail?.author}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="paper-abstract">
              <div class="row">
                <div class="col-md-12">




                  <p>
                    {dataPaperDetail?.abstract}
                  </p>






                  <a target="_blank" href={dataPaperDetail?.url} onclick="captureOutboundLink('https://arxiv.org/pdf/2111.07624v1.pdf'); return true;" class="badge badge-light ">
                    <span class=" icon-wrapper icon-fa icon-fa-regular" data-name="file-pdf"><svg viewBox="0 0 384 513.795" xmlns="http://www.w3.org/2000/svg"><path d="M369.9 98.88c9 9 14.1 21.3 14.1 34v332.1c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48v-416c0-26.5 21.5-48 48-48.1h204.1c12.7 0 24.9 5.1 33.9 14.1zm-37.8 30.1L256 52.88v76.1h76.1zM48 464.98h288v-288H232c-13.3 0-24-10.7-24-24v-104H48v416zm250.2-143.7c10.5 10.5 8 38.7-17.5 38.7-14.8 0-36.9-6.8-55.8-17-21.6 3.6-46 12.7-68.4 20.1-50.1 86.4-79.4 47-76.1 31.2 4-20 31-35.9 51-46.2 10.5-18.4 25.4-50.5 35.4-74.4-7.4-28.6-11.4-51-7-67.1 4.8-17.7 38.4-20.3 42.6 5.9 4.7 15.4-1.5 39.9-5.4 56 8.1 21.3 19.6 35.8 36.8 46.3 17.4-2.2 52.2-5.5 64.4 6.5zm-198.1 77.8c0 .7 11.4-4.7 30.4-35-5.9 5.5-25.299 21.3-30.4 35zm81.6-190.6c-2.5 0-2.6 26.9 1.8 40.8 4.9-8.7 5.6-40.8-1.8-40.8zm-24.4 136.6c15.9-6.1 34-14.9 54.8-19.2-11.199-8.3-21.8-20.4-30.1-35.5-6.7 17.7-15 37.8-24.7 54.7zm131.6-5c3.6-2.4-2.2-10.4-37.3-7.8 32.3 13.8 37.3 7.8 37.3 7.8z"></path></svg></span>
                    <span>PDF</span>

                  </a>

                  <a target="_blank" href="https://arxiv.org/abs/2111.07624v1" onclick="captureOutboundLink('https://arxiv.org/abs/2111.07624v1'); return true;" class="badge badge-light ">
                    <span class=" icon-wrapper icon-fa icon-fa-regular" data-name="file"><svg viewBox="0 0 384 513.795" xmlns="http://www.w3.org/2000/svg"><path d="M369.9 98.88c9 9 14.1 21.3 14.1 34v332.1c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48v-416c0-26.5 21.5-48 48-48.1h204.1c12.7 0 24.9 5.1 33.9 14.1zm-37.8 30.1L256 52.88v76.1h76.1zM48 464.98h288v-288H232c-13.3 0-24-10.7-24-24v-104H48v416z"></path></svg></span>
                    <span>Abstract</span>
                  </a>



                </div>
              </div>
            </div>
          </main>
          <h2 class="home-page-title">
            Suggestions

          </h2>
          <div class="infinite-container text-center home-page">









            {dataPaperDetail?.similars?.map(item => (
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
                        <a target="_blank" href={`/paper?id=${item?.id}`}>
                          {item?.title}
                        </a>
                      </h1>
                      <p class="author-section" style={{ paddingTop: '2px' }}>
                        <span class="item-github-link">
                          {item?.author}
                        </span>
                      </p>
                      <p class="item-strip-abstract">{item?.abstract?.split('.')?.[0]}</p>
                      <div class="sota">
                      </div>
                      <p>
                      </p>
                    </div>
                    <div class="col-lg-3 item-interact text-center">
                      <div class="entity" style={{ marginBottom: '20px' }}>
                        <a target="_blank" href={`/paper?id=${item?.id}`} class="badge badge-light ">
                          <span class=" icon-wrapper icon-ion" data-name="document"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M428 224H288a48 48 0 0 1-48-48V36a4 4 0 0 0-4-4h-92a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h224a64 64 0 0 0 64-64V228a4 4 0 0 0-4-4z"></path><path d="M419.22 188.59L275.41 44.78a2 2 0 0 0-3.41 1.41V176a16 16 0 0 0 16 16h129.81a2 2 0 0 0 1.41-3.41z"></path></svg></span> Paper
                        </a>
                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default Register