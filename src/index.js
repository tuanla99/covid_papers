import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Appmain from './Appmain';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../src/page/Categories/main.c1a099c8.chunk.css'
// import '../src/static/css/article.css'
// import '../src/static/css/cart.css'
// import '../src/static/css/checkout.min.css'
// import '../src/static/css/detailproduct.css'
// import '../src/static/css/footer.css'
// import '../src/static/css/header.css'
// import '../src/static/css/home.css'
// import '../src/static/css/main.css'
// import '../src/static/css/product.css'
// import '../src/static/css/responsive_lib.css'
// import '../src/static/css/responsive.css'
// import '../src/static/css/stores.css'

ReactDOM.render(
    <Router>
        <Appmain />
    </Router>
    ,

    document.getElementById('root'),
);
registerServiceWorker();
