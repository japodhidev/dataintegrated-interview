import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from 'next'
import { apply_patch } from "jsonpatch"
import { isEqual, keysIn } from 'lodash-es'

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

    const patchTodos = (id: number, newValue: String, patch: String) => {
      const tempTodos = todos
        const item = tempTodos.find(el => el.id === id)
        let patchArr = [JSON.parse(patch)]

        console.log(patch)

        let patchedObject = apply_patch(item, patchArr)
        const idx = tempTodos.findIndex(e => e.id === id)
        // @ts-ignore
        tempTodos[idx] = patchedObject

        return tempTodos
    };

    // Reject post requests without the authorization header
    if (req.method === 'POST') {
        const headers = req.headers
        if (!headers.authorization) {
            // @ts-ignore
            res.status(401).json({"error": "Unauthorized."})
        }
      const body = req.body
      if (!body) {
          // @ts-ignore
        res.status(412).json({"error": "Bad request."})
      }
      // Simple validation using lodash
        const keys = keysIn(body)
        console.log(keys)
      if (!isEqual(keys, ['id', 'newValue', "newPatch"])) {
          // @ts-ignore
          res.status(412).json({"error": "Invalid arguments supplied."})
      }
      
      const data = patchTodos(body.id, body.newValue, body.newPatch)
        // @ts-ignore
      res.status(200).json({"todos": data})
    } else if (req.method === 'GET') {
      // @ts-ignore
        res.status(200).json({todos})
    } else{
        // @ts-ignore
      res.status(405).json({"error": "Unsupported HTTP method."})
    }

  } else {
      // @ts-ignore
      res.status(403).json({"error": "Forbidden."})
  }

}