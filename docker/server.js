
const multer = require('multer')
const express = require('express')
const app = express()
require('dotenv').config() // this is for the api calls. the dotenv is so the api calls can access the env file
const token =
  process.env.PAPERLESS_TOKEN || '0b13f96a4e449884afdbb4cf6ea6a999a86ba7bc'
const URL =
  process.env.PAPERLESS_API_URL ||
  'http://localhost:8000/api/documents/?custom_field_query=["reciept", "exact", "berry"]'

const upload = multer({
  dest: 'uploads/',
})
app.use(express.static('.'))
const path = require('path')
app.use(express.static(path.join(__dirname, '.'))) // 
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.json({
    message: 'File received',
    file: req.file,
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
// making a request to the paperless URL
const headers = {
  "Authorization" : `Token ${token}`,
 "Accept": "application/json"
}

fetch(URL, { method: 'GET', headers: headers })
   .then(response => {
    if (!response.ok) {
      throw new Error (' I didnt make connection with the server')
    }
    return response.json()
   })