import express from 'express'

const app = express()
const port = process.env.PORT || 4000

app.get('/', (_req, res) => {
  res.send('🎮 GameTrackr backend is running!')
})

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`)
})
