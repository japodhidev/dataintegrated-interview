import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from 'next'
import {apply_patch} from "jsonpatch"

type Data = {
  email: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    let todos = [
        { id: 0, value: "Run a marathon", status: false },
        { id: 1, value: "Bake a cake", status: false },
        { id: 2, value: "Read a book", status: false },
    ]

    const patchTodos = (id: number, newValue: String) => {
        const item = todos.find(el => el.id === id)
        let patch = [
            { "op": "replace", "path": `/value`, "value": newValue }
        ]

        let patchedObject = apply_patch(item, patch)
        const idx = todos.findIndex(e => e.id === id)
        // @ts-ignore
        todos[idx] = patchedObject

        return todos
    };

    if (req.method === 'POST') {
      const body = req.body
      if (!body) {
          // @ts-ignore
        res.status(412).json({"error": "Bad request."})
      }
      console.log(body)
      
      const data = patchTodos(body.id, body.newValue)
        // @ts-ignore
      res.status(200).json({todos})
    } else if (req.method === 'GET') {
      // @ts-ignore
        res.status(200).json({todos})
    } else{
        // @ts-ignore
      res.status(405).json({"error": "Unsupported HTTP method."})
    }

  } else {
      // @ts-ignore
      res.status(403).json({"error": "Unauthorized."})
  }

}