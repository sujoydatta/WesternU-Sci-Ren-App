const axios = require('axios').default;

export const getAllEvents = async () => {
  await axios.get('https://western-sciren-server.vercel.app/api/data/getAllEvents')
    .then(res => {
      return res.body
    })
    .catch(error => {
      console.error(error);
    });
}
