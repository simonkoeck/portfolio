import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { csrf } from "../../services/csrf";

export default async function handler(req: any, res: any) {
  await csrf(req, res);

  if (req.method === "POST") {
    // Verify hCaptchaToken
    if (!req.body.hCaptchaToken || req.body.hCaptchaToken == "") {
      return res.status(400).json({
        message: "hCaptchaToken is required",
      });
    }
    const options = {
      url: "https://hcaptcha.com/siteverify",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: `response=${req.body.hCaptchaToken}&secret=${process.env.HCAPTCHA_SECRET}`,
    };
    const r = await axios(options);
    if (r.status == 200 && r.data.success == true) {
      const rp = await fetch(
        `${process.env.STRAPI_BASE_URL}/contact-requests`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              subject: req.body.subject,
              message: req.body.message,
              phone: req.body.phone,
              country: req.body.country,
              region: req.body.region,
              ip:
                req.headers["x-forwarded-for"] || req.connection.remoteAddress,
              useragent: req.headers["user-agent"],
            },
          }),
        }
      );
      if (rp.status == 200) {
        return res.status(200).json({
          success: true,
        });
      }
      return res.status(500).json({
        message: "Something went wrong",
      });
    } else {
      return res.status(400).json({
        message: "hCaptchaToken is invalid",
      });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
