import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { csrf } from "../../services/csrf";
import qs from "qs";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const query = qs.stringify(
      {
        filters: {
          $and: [
            {
              visitor_id: req.body.visitor_id,
            },
            {
              project: req.body.project_id,
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
    console.log(j.data);
    if (rp.status == 200 && j.data.length > 0) {
      const r = await fetch(
        `${process.env.STRAPI_BASE_URL}/project-likes/${j.data[0].id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
        }
      );

      return res.status(200).json({
        success: true,
      });
    }
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
