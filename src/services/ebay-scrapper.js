import scrapeIt from 'scrape-it'
import queryString from 'query-string'

export default (searchString, options = {}) => {
  const baseUrl = 'https://www.ebay.com/sch/i.html'
  const params = {
    _nkw: searchString,
    _sacat: 0,
    _osaat: 0,
    _sop: 15,
    LH_TitleDesc: 0,
  }
  if (options.recallFiltering) params.recallFiltering = true
  const url = `${baseUrl}?${queryString.stringify(params)}`
  return scrapeIt(url, {
    resultCount: '.srp-controls__count',
    related: {
      listItem: '.srp-related-searches > span > a',
    },
    products: {
      listItem: '.srp-results .s-item',
      data: {
        href: {
          selector: '.s-item__link',
          attr: 'href',
        },
        title: '.s-item__title',
        subtitle: '.s-item__subtitle',
        price: '.s-item__price',
        priceTrending: '.s-item__trending-price > :last-child',
        bids: {
          selector: '.s-item__bids',
          convert: v => (!v ? null : parseInt(v.split(' ')[0], 10)),
        },
        shipping: '.s-item__shipping',
        hotness: {
          listItem:
            '.s-item__hotness > :first-child, .s-item__additionalItemHotness',
        },
        etrs: '.s-item__etrs',
        location: '.s-item__location',
        gspInfo: '.s-item__gsp-info',
        purchaseOptions: '.s-item__purchase-options',
        thumbnail: {
          selector: '.s-item__image-img',
          attr: 'src',
        },
      },
    },
  })
}
