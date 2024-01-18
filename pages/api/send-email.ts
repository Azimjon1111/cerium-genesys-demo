import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== "POST") {
  //   res.status(405).end()
  //   return
  // }

  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      phone,
      email,
      company,
      message,
      communicationForm,
      agreeToAdditionalContent,
    } = req.body

    transporter.sendMail(
      {
        from: email,
        to: process.env.NODEMAILER_RECEIVER,
        subject: `Cerium Networks Website: ${email}`,
        html: [
          `<p>First Name: ${firstName}</p>`,
          `<p>Last Name: ${lastName}</p>`,
          `<p>Phone: ${phone}</p>`,
          `<p>Email: ${email}</p>`,
          `<p>Company: ${company}</p>`,
          `<p>Preferred Communication Form: ${communicationForm}</p>`,
          `<p>Agree To Additional Content: ${
            agreeToAdditionalContent ? "Yes" : "No"
          }</p>`,
          `<p>Message: ${message}</p>`,
        ].join("\n"),
      },
      (err) => {
        if (err) console.error(err)

        res.end()
      }
    )
  }
}
