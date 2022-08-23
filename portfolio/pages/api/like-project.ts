import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { csrf } from "../../services/csrf";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const rp = await fetch(`${process.env.STRAPI_BASE_URL}/project-likes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          visitor_id: req.body.visitor_id,
          project: req.body.project_id,
          // relation: req.body.project_id,
        },
      }),
    });
    if (rp.status == 200) {
      return res.status(200).json({
        success: true,
      });
    }
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
