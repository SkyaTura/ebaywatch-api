import Subscription from '../models/subscription'

export const list = () => Subscription.find()

export const subscribe = async payload => {
  const { terms, person } = payload
  const subscription =
    (await Subscription.findOne({ terms })) ||
    (await Subscription.create({ terms }))
  const current = subscription.people.find(v => v.email === person.email)
  if (current) {
    Object.assign(current, person)
    await subscription.save()
    return 2
  }
  subscription.people.push(person)
  await subscription.save()
  return 1
}

export const update = async payload => {
  const { terms, email, data } = payload
  const subscription = await Subscription.findOne({ terms })
  if (!subscription) return
  const current = subscription.people.find(v => v.email === email)
  if (!current) return
  Object.assign(current, data)
  await subscription.save()
}
