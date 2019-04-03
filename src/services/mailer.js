/* eslint no-underscore-dangle: "off" */
import Mailgun from 'mailgun-js'
import { mailgun as mailgunOptions } from '../config/vars'
import Subscription from '../models/subscription'
import scrape from './ebay-scrapper'

const renderProducts = products =>
  products
    .map(
      product => `
<br>
<h3><a href="${product.href}">${product.title}</a></h3>
<h4>${product.subtitle}</h4>
<div><strong>Price:</strong> ${product.price}</div>
<br>
`
    )
    .join('')

const renderEmail = (subscription, products) => `
  <font face="sans-serif">
<h1>eBaywatch Tracking</h1>
<br>
<p>You are receiving this email because you've signed for the watch list on "${
  subscription._id.terms
}" search on eBay.com</p>
  <p>You can unsubscribe at anytime</p>
<br>
<h2>Top 3 products tracked</h2>
${renderProducts(products)}
</font>
`

const sendEmail = options =>
  new Promise((resolve, reject) =>
    Mailgun(mailgunOptions)
      .messages()
      .send(options, (error, body) => (error ? reject(error) : resolve(body)))
  )

export default async () => {
  const now = new Date()
  const minutes = now.getMinutes()
  const subscriptions = await Subscription.aggregate([
    { $unwind: '$people' },
    { $match: { 'people.active': true } },
    { $addFields: { _frequency: { $mod: [minutes, '$people.frequency'] } } },
    { $match: { _frequency: { $eq: 0 } } },
    {
      $group: {
        _id: { terms: '$terms' },
        people: { $push: '$people' },
      },
    },
  ])
  subscriptions.forEach(async subscription => {
    const data = await scrape(subscription._id.terms)
    const top3 = data.data.products.filter((_, i) => i < 3)
    const html = renderEmail(subscription, top3)
    subscription.people.forEach(person =>
      sendEmail({
        html,
        to: `${person.name} <${person.email}>`,
        from: `eBaywatch <ebaywatch@emiolo.com>`,
        subject: `Price tracking for "${subscription._id.terms}"`,
      })
        .then(body => console.log('email sent', body))
        .catch(error => console.error('email error', error))
    )
  })
}
