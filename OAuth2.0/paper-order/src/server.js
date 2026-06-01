
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis') 

const app = express()


app.use(cors())
app.use(express.json()) /


app.post('/api/download-attachments', async (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(400).json({ error: 'Access token is required' })
  }

  try {

    const oAuth2Client = new google.auth.OAuth2()
    oAuth2Client.setCredentials({ access_token: token })

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })

  
    await DownloadAttachments(gmail)

    res.status(200).json({ status: 'Success' })
  } catch (error) {
    console.error('Processing error:', error)
    res.status(500).json({ error: error.message })
  }
})

async function DownloadAttachments(gmail) {
  try {
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'has:attachment',
    })

    const messages = res.data.messages || []
    if (messages.length === 0) {
      console.log('No messages with attachments found.')
      return
    }

    for (const msg of messages) {
      const messageResponse = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
      })
      const message = messageResponse.data
      const headers = message.payload.headers || []

      const fromHeader = headers.find((header) => header.name === 'From')
      const senderInfo = fromHeader ? fromHeader.value : 'Unknown Sender'

      if (message.payload.parts) {
        // FIXED: Capitalized msg.id to match the loop item
        await parseParts(gmail, msg.id, message.payload.parts, senderInfo)
      }
    }
  } catch (error) {
    console.error('Error listing messages:', error)
    throw error
  }
}

async function parseParts(gmail, messageId, parts, senderInfo) {
  for (const part of parts) {
    const filename = part.filename
    const attachmentId = part.body && part.body.attachmentId

    // Process file if both exist
    if (filename && attachmentId) {
      console.log(`Found a file: ${filename} from ${senderInfo}`)

      try {
        const attachRes = await gmail.users.messages.attachments.get({
          userId: 'me',
          messageId: messageId, 
          id: attachmentId,
        })

        const base64Data = attachRes.data.data
        const base64Standard = base64Data.replace(/_/g, '/').replace(/-/g, '+')
        const fileBuffer = Buffer.from(base64Standard, 'base64')

        fs.writeFileSync(path.join(__dirname, filename), fileBuffer)
        console.log(`Successfully saved: ${filename}`)
      } catch (err) {
        console.error(`Failed to download attachment ${filename}:`, err)
      }
    }


    if (part.parts) {
      await parseParts(gmail, messageId, part.parts, senderInfo)
    }
  }
}


app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000')
})
