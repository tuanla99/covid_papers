
const IpAddress = 'https://f1b3b921c13d.ngrok.io';


const loginUrl = `${IpAddress}/login`;
const search = `${IpAddress}/search`
const listManufacturer = `${IpAddress}/get-list-manufacturer`
const detail = `${IpAddress}/detail`
const sameRangeManufacturer = `${IpAddress}/get-same-range-manufacturer`
const registerUrl = `${IpAddress}/register`;

async function login(params) {
  try {
    let response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function register(params) {
  try {
    let response = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: params.username,
        password: params.password,
        email: params.email,
        first_name: "string",
        middle_name: "string",
        last_name: "string",
        gender: "female",
        birth_date: "2021-04-10",
        created_date: "2021-04-10T14:03:15.860Z",
        last_modified_date: "2021-04-10T14:03:15.860Z",
        enabled: true,
        disabled_date: "2021-04-10",
        roles: [
          "string"
        ],
        favourite: [
          "string"
        ]
      })
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function getSearch(value) {
  try {
    let response = await fetch(`${search}?text=${value}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function getSearchPageName(text, value) {
  try {
    let response = await fetch(`${search}?text=${text}&page=${value}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function getSearchFilter(value) {
  try {
    let response;
    if (value.text) {
      if (value.type_product) {
        if (value.max_price === 0) {
          if (value.manufacturer === '') {
            response = await fetch(`${search}?text=${value.text}&page=${value.page}&min-price=${value.min_price}&type=${value.type_product}`);
          } else {
            response = await fetch(`${search}?text=${value.text}&page=${value.page}&min-price=${value.min_price}&type=${value.type_product}&manufacturer=${value.manufacturer}`);
          }
        } else {
          if (value.manufacturer === '') {
            response = await fetch(`${search}?text=${value.text}&page=${value.page}&min-price=${value.min_price}&max-price=${value.max_price}&type=${value.type_product}`);
          } else {
            response = await fetch(`${search}?text=${value.text}&page=${value.page}&min-price=${value.min_price}&max-price=${value.max_price}&type=${value.type_product}&manufacturer=${value.manufacturer}`);
          }
        }
      } else {
        if (value.max_price === 0) {
          if (value.manufacturer === '') {
            response = await fetch(`${search}?text=${value.text}&page=${value.page}&min-price=${value.min_price}`);
          } else {
            response = await fetch(`${search}?text=${value.text}&page=${value.page}&min-price=${value.min_price}&manufacturer=${value.manufacturer}`);
          }
        } else {
          if (value.manufacturer === '') {
            response = await fetch(`${search}?text=${value.text}&page=${value.page}&min-price=${value.min_price}&max-price=${value.max_price}`);
          } else {
            response = await fetch(`${search}?text=${value.text}&page=${value.page}&min-price=${value.min_price}&max-price=${value.max_price}&manufacturer=${value.manufacturer}`);
          }
        }
      }
    } else {
      if (value.type_product) {
        if (value.max_price === 0) {
          if (value.manufacturer === '') {
            response = await fetch(`${search}?page=${value.page}&min-price=${value.min_price}&type=${value.type_product}`);
          } else {
            response = await fetch(`${search}?page=${value.page}&min-price=${value.min_price}&type=${value.type_product}&manufacturer=${value.manufacturer}`);
          }
        } else {
          if (value.manufacturer === '') {
            response = await fetch(`${search}?page=${value.page}&min-price=${value.min_price}&max-price=${value.max_price}&type=${value.type_product}`);
          } else {
            response = await fetch(`${search}?page=${value.page}&min-price=${value.min_price}&max-price=${value.max_price}&type=${value.type_product}&manufacturer=${value.manufacturer}`);
          }
        }
      } else {
        if (value.max_price === 0) {
          if (value.manufacturer === '') {
            response = await fetch(`${search}?page=${value.page}&min-price=${value.min_price}`);
          } else {
            response = await fetch(`${search}?page=${value.page}&min-price=${value.min_price}&manufacturer=${value.manufacturer}`);
          }
        } else {
          if (value.manufacturer === '') {
            response = await fetch(`${search}?page=${value.page}&min-price=${value.min_price}&max-price=${value.max_price}`);
          } else {
            response = await fetch(`${search}?page=${value.page}&min-price=${value.min_price}&max-price=${value.max_price}&manufacturer=${value.manufacturer}`);
          }
        }
      }
    }
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function getSearchPrice(min, max) {
  try {
    let response = await fetch(`${search}?min-price=${min}&max-price=${max}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function getSearchPage(value) {
  try {
    let response = await fetch(`${search}?page=${value}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function getListProduct() {
  try {
    let response = await fetch(`${search}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function getListManufacturer() {
  try {
    let response = await fetch(`${listManufacturer}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function getDetail(value) {
  try {
    let response = await fetch(`${detail}/${value}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function getSameRangeManufacturer(value) {
  try {
    let response = await fetch(`${sameRangeManufacturer}/${value}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
async function getType(value) {
  try {
    let response = await fetch(`${search}?type=${value}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
// async function getProductsWithCategoryFromServer(params) {
//     try {
//         const category_name = params;
//         let response = await fetch(`http://${IpAddress}:3001/list_products_with_category?category_name=${category_name}`);
//         let responseJson = await response.json();
//         return responseJson.data;
//     } catch (error) {
//         console.error(`Error is : ${error}`);
//     }
// }
// async function login(username, password) {
//     try {
//         if (!username || !password) {
//             return 'empty';
//         } else {
//             const user_name = username;
//             const pass_word = password;
//             let response = await fetch(`${IpAddress}/login?username=${user_name}&password=${pass_word}`);
//             let responseJson = await response.json();
//             return responseJson.data;
//         }
//     } catch (error) {
//         console.error(`Error is : ${error}`);
//     }
// }

export { login, register, getSearch, getListManufacturer, getDetail, getSameRangeManufacturer, getListProduct, getSearchPrice, getType, getSearchPage, getSearchFilter, getSearchPageName };