import ebayScrapper from '../services/ebay-scrapper'

export default {
  routes: [
    {
      method: 'GET',
      path: '/api/ebay/search',
      async handler(req) {
        const { q } = req.query
        const { data } = await ebayScrapper(q)
        return data
      },
    },
  ],
}
