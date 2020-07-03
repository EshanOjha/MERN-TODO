import axios from 'axios'

const api = ({ headers = {}, ...options }) => {

  return axios({
    ...options,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept":"application/json"
    },
  })
}

export default api
