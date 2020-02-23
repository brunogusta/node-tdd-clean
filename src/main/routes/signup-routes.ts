import { Router } from 'express'

export default (router: Router): void => {
  router.get('/signup', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
