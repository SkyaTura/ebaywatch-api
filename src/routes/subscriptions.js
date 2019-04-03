import { list, subscribe, update } from '../services/subscriptions'

export default {
  routes: [
    {
      method: 'GET',
      path: '/api/subscriptions',
      async handler() {
        const subscriptions = await list()
        return subscriptions
      },
    },
    {
      method: 'POST',
      path: '/api/subscriptions',
      async handler(req) {
        try {
          await subscribe(req.payload)
          return true
        } catch (e) {
          console.error(e)
          return false
        }
      },
    },
    {
      method: 'PUT',
      path: '/api/subscriptions',
      async handler(req) {
        try {
          await update(req.payload)
          return true
        } catch (e) {
          console.error(e)
          return false
        }
      },
    },
  ],
}
