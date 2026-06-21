const express = require('express')
const router = express.Router()
const Lead = require('../models/Lead')
const nodemailer = require('nodemailer')


const sendAlert = async (lead) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject:`New Lead: ${lead.name} (${lead.source})`,
    text: `
      Name: ${lead.name}
      Email: ${lead.email}
      Phone: ${lead.phone}
      Source: ${lead.source}
      Service: ${lead.service}
    `
  })
}

// Website lead
router.post('/website', async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      source: 'website'
    })
    sendAlert(lead)
    res.json({ success: true, lead })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Meta leads
router.post('/meta', async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      source: 'meta'
    })
    sendAlert(lead)
    res.json({ success: true, lead })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Google leads 
router.post('/google', async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      source: 'google'
    })
    sendAlert(lead)
    res.json({ success: true, lead })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router;