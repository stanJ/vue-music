import jsonp from 'common/js/jsonp'
import {commonParams, options, PROD_URL} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  // 线上环境地址
  const url = debug ? '/api/getDiscList' : PROD_URL + '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(dissid) {
  const url = debug ? '/api/songs' : PROD_URL + '/api/songs'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: dissid,
    g_tk: 1818343968,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}