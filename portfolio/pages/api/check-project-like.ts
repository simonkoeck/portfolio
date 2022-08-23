import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const query = qs.stringify(
      {
        filters: {
          $and: [
            {
              visitor_id: req.query.visitor_id,
            },
            {
              project: req.query.project_id,
            },
          ],
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const rp = await fetch(
      `${process.env.STRAPI_BASE_URL}/project-likes?${query}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );
    const j = await rp.json();

    if (rp.status == 200) {
      if (j.meta.pagination.total == 1) {
        return res.status(200).json({ liked: true });
      } else {
        return res.status(200).json({ liked: false });
      }
    }
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
