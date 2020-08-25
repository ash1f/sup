
import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { retrieveAS, storeAS } from '../constants/Service'
import { userkey, userBlogList } from '../constants/AppConfig'
import { API_DOMAIN } from '../constants/Service'

const SaveBlogParams = {
  img: null,
  title: "",
  description: "",
}

// export const SaveBlogs = async (params = SaveBlogParams) => {
//   return await retrieveAS(userkey).then(
//     async (user) => {
//       if (user && params.text && params.title) {
//         let currentList = await retrieveAS(userBlogList) || [];
//         currentList.push({
//           ...params,
//           user,
//           date: Date.now(),
//           id: Math.floor(Math.random() * 1000000000)
//         });
//         await storeAS(userBlogList, currentList);
//         const newlist = await retrieveAS(userBlogList);
//         return true;
//       }
//       return { status: false, body: null }
//     })
// }
export const SaveBlogs = async (params = SaveBlogParams) => {
  let p = new FormData()
  p.append("title", params.title);
  p.append("description", params.description);

  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    const h =  {
      headers: {
        'AUTH-API-KEY': token,
      },
    }
    return await axios.post(API_DOMAIN + 'startup_community_api/blog/save', p, h).then(async (response) => {
        const id = response.data.result.blog_id || "";
        console.log({res: response.data});
        
        let imgp = new FormData()
        imgp.append("file", params.img);
        imgp.append("blog_id", id);

        await axios.post(API_DOMAIN + 'startup_community_api/blog/save_blog_image',imgp, h).then((imgres) => {
            console.log({ imgres, img: params.img });
          });
          return { success: true, body: re, message: "SaveBlogs success !" }
      }).catch((err) => {
        console.warn("Error in SaveBlogs :", err);
        return { success: false, body: null, message: "SaveBlogs failed !" }
      });
  } else {
    return { success: false, body: null, message: "SaveBlogs failed !" }
  }
}

export const getAllBlogs = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    return await axios.get(API_DOMAIN + 'startup_community_api/blog/all',
      {
        headers: {
          'AUTH-API-KEY': token,
        },
      }).then((response) => {
        const re = response.data.result;
        return { success: true, body: re, message: "getAllBlogs success !" }
      }).catch((err) => {
        console.warn("Error in getAllBlogs :", err);
        return { success: false, body: null, message: "getAllBlogs failed !" }
      });
  } else {
    return { success: false, body: null, message: "Token is invalid" }
  }
}

export const getUserBloglist = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    return await axios.get(API_DOMAIN + 'startup_community_api/blog/by_user',
      {
        headers: {
          'AUTH-API-KEY': token,
        },
      }).then((response) => {
        const re = response.data.result;
        return { success: true, body: re, message: "getUserBloglist success !" }
      }).catch((err) => {
        console.warn("Error in getAllBlogs :", err);
        return { success: false, body: null, message: "getUserBloglist failed !" }
      });
  } else {
    return { success: false, body: null, message: "Token is invalid" }
  }
}