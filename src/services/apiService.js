import axios from "axios";
export const API_URL = "http://localhost:3002";
// export const API_URL = "https://shiny-calf-fatigues.cyclic.app";

export const KEY_TOKEN = "bible_token"
// export const API_URL = "https://monkeys.co.il";

export const doApiGet = async (_url) => {
  try {

    const resp = await axios({
      method: "GET",
      url: _url,
      headers: {
        "x-api-key": localStorage[KEY_TOKEN]
      }
    })
    return resp.data;
  }
  catch (err) {
    // reject -> רטרן של טעות
    throw err;
  }
}
export const apiGet = async (url, body) => {
  try {
    let { data } = await axios({
      method: "GET",
      url,
      headers: {
        "x-api-key": localStorage[KEY_TOKEN],
      },
      data: body,
    });
    return data;
  } catch (err) {

    throw err;
  }
};


// post,delete,put,patch
export const doApiMethod = async (_url, _method, _body = {}) => {
  try {
    const resp = await axios({
      method: _method,
      url: _url,
      data: _body,
      headers: {
        "x-api-key": localStorage[KEY_TOKEN]
      }
    })
    return resp.data;
  }
  catch (err) {
    throw err;
  }
}