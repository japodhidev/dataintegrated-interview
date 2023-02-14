import React, { useEffect, useState } from "react"
import {useSession, signIn} from "next-auth/react"
import Head from 'next/head'
// import Image from 'next/image'
import {Inter} from '@next/font/google'
import {apply_patch} from "jsonpatch"
import axios from 'axios'

const inter = Inter({subsets: ['latin']})

export default function Dashboard() {
    const {data: session} = useSession()
    const [todos, setTodos] = useState([])
    const [newValue, setNewValue] = useState('')

    // const { data, error } = useSWR('/api/data', fetcher)
    const fetchTodos = () => {
        axios.get('/api/data').then(response => setTodos(response.data.todos)).catch(error => console.log(error))
    }

    function patchTodos(id: number) {
        if (session) {
            // @ts-ignore
            axios.post('/api/data', {id, newValue}, {
                headers: {Authorization: `Bearer ${session["accessToken"] ? session["accessToken"] : ''}`}
            }).then(response => setTodos(response.data.todos)).catch(error => console.log(error))
        }
    }

    function patchValue(id: number) {
        const tempTodos = todos
        const item = tempTodos.find(el => el["id"] === id)
        let patch = [
            { "op": "replace", "path": `/value`, "value": newValue }
        ]

        let patchedObject = apply_patch(item, patch)
        const idx = todos.findIndex(e => e["id"] === id)
        // @ts-ignore
        todos[idx] = patchedObject
        // // @ts-ignore
        setTodos(tempTodos)
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    if (session) {
        return (
            <>
                <Head>
                    <title>Dashboard</title>
                    <meta name="description" content="Generated by create next app"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main>
                    <div className="w-3/4 mx-auto flex flex-col place-items-center">
                        <div className="mt-6">
                            <h1 className="text-3xl font-bold">
                                Welcome to the dashboard, {session["name"]}
                            </h1>
                        </div>
                        <div className="w-1/3 p-5 mt-4 rounded-md bg-slate-100">
                            <h4 className="text-xl font-bold text-gray-500 mb-3">Todos</h4>
                            <ul className="mb-4">
                                {todos.map(t => (
                                    <li key={t["id"]} className="flex flex-col gap-2 py-2 px-4 mb-3 bg-white rounded-md">
                                        <span className="prose">
                                            <code>{JSON.stringify(t)}</code>
                                        </span>
                                        <input value={newValue} onChange={e => patchValue(t["id"])} className="mt-2 p-2 rounded-md inset-1 bg-gray-200 ring-0 active:ring-white"/>
                                        <button onClick={() => patchTodos(t["id"])} className="py-3 px-6 bg-blue-400 text-white rounded-md">Apply patch</button>
                                    </li>
                                ))}
                            </ul>
                            {/*<button onClick={() => patchTodos(2)} className="py-3 px-6 bg-blue-400 text-white rounded-md">Apply patch</button>*/}
                        </div>
                    </div>
                </main>
            </>
        )
    }

    return (
        <div className="w-3/4 h-screen mx-auto flex flex-col">
            <div className="h-2/4 my-auto flex flex-col gap-3 place-items-center">
                <h3 className="text-2xl text-gray-600 font-medium bg-violet-50 rounded-md py-3 px-6">You are not signed in</h3>
                <button onClick={() => signIn()} className="py-3 px-6 bg-blue-400 text-lg font-medium text-white rounded-lg">Sign in</button>
            </div>
        </div>
    )
}