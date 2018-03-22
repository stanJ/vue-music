import { commonParams, options, PROD_URL } from './config'
import { getUid } from 'common/js/uid'
import axios from 'axios'
// import { ERR_OK } from 'api/config'
import jsonp from 'common/js/jsonp'

const debug = process.env.NODE_ENV !== 'production'

export function getLyric(mid) {
  const url = debug ? '/api/lyric' : PROD_URL + '/api/lyric'
  const data = Object.assign({}, commonParams, {
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 1818343968,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getVKey(songmid, filename) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 1818343968,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid,
    filename,
    guid: getUid()
  })

  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }))
}

// export function getSongsUrl(songs) {
//   const url = debug ? '/api/getPurlUrl' : 'http://ustbhuangyi.com/music/api/getPurlUrl'

//   let mids = []
//   let types = []

//   songs.forEach((song) => {
//     mids.push(song.mid)
//     types.push(0)
//   })

//   const urlMid = genUrlMid(mids, types)

//   const data = Object.assign({}, commonParams, {
//     g_tk: 5381,
//     format: 'json',
//     platform: 'h5',
//     needNewCode: 1,
//     uin: 0
//   })

//   return new Promise((resolve, reject) => {
//     let tryTime = 3

//     function request() {
//       return axios.post(url, {
//         comm: data,
//         url_mid: urlMid
//       }).then((response) => {
//         const res = response.data
//         if (res.code === ERR_OK) {
//           let urlMid = res.url_mid
//           if (urlMid && urlMid.code === ERR_OK) {
//             const info = urlMid.data.midurlinfo[0]
//             if (info && info.purl) {
//               resolve(res)
//             } else {
//               retry()
//             }
//           } else {
//             retry()
//           }
//         } else {
//           retry()
//         }
//       })
//     }

//     function retry() {
//       if (--tryTime >= 0) {
//         request()
//       } else {
//         reject(new Error('Can not get the songs url'))
//       }
//     }

//     request()
//   })
// }

// function genUrlMid(mids, types) {
//   const guid = getUid()
//   return {
//     module: 'vkey.GetVkeyServer',
//     method: 'CgiGetVkey',
//     param: {
//       guid,
//       songmid: mids,
//       songtype: types,
//       uin: '0',
//       loginflag: 0,
//       platform: '23'
//     }
//   }
// }