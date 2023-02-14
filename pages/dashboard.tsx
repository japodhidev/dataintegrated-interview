import React, { useEffect, useState } from "react"
import {useSession, signIn} from "next-auth/react"
import Head from 'next/head'
import {Inter} from '@next/font/google'
import {apply_patch} from "jsonpatch"
import axios from 'axios'

const inter = Inter({subsets: ['latin']})

export default function Dashboard() {
    const {data: session, status} = useSession()
    const [todos, setTodos] = useState([])
    // const [newValue, setNewValue] = useState('')
    const [newPatch, setPatch] = useState('')

    // const fetchTodos = () => {
    //     // @ts-ignore
    //     let token = session["accessToken"] ? session["accessToken"] : ''
    //     axios.get('/api/data', {
    //         headers: {Authorization: `Bearer ${token}`}
    //     }).then(response => setTodos(response.data.todos))
    //         .catch(error => console.log(error.message))
    // }

    function patchTodos(id: number) {
        if (session) {
            // @ts-ignore
            let token = session["accessToken"] ? session["accessToken"] : ''
            axios.post('/api/data', {id, newPatch}, {
                headers: {Authorization: `Bearer ${token}`}
            }).then((response) => {
                setTodos(response.data.todos)
            }).catch(error => console.log(error.message))
        }
    }

    function patchValue(event: React.ChangeEvent<HTMLInputElement>) {
        // setNewValue(event.target.value)
        setPatch(JSON.stringify({ "op": "replace", "path": `/value`, "value": event.target.value }))
    }

    useEffect(() => {
         const fetchTodos = () => {
            // @ts-ignore
            let token = session["accessToken"] ? session["accessToken"] : ''
            axios.get('/api/data', {
                headers: {Authorization: `Bearer ${token}`}
            }).then(response => setTodos(response.data.todos))
                .catch(error => console.log(error.message))
        }
        fetchTodos()
    }, [session])

    if (status === 'authenticated') {
        return (
            <>
                <Head>
                    <title>Dashboard</title>
                    <meta name="description" content="Generated by create next app"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main className={inter.className}>
                    <div className="w-3/4 mx-auto flex flex-col place-items-center">
                        <div className="my-12 text-center">
                            <h1 className="text-4xl font-bold text-gray-700 mb-4">
                                Welcome to the dashboard.
                            </h1>
                            <p className="text-xl font-medium text-gray-500">
                                Start by typing in any of the input fields. Click the patch button to commit the change/s you have made.
                            </p>
                        </div>
                        <div className="w-2/3 p-5 mt-4 rounded-md bg-slate-100">
                            <h4 className="text-2xl font-bold text-gray-600 mb-3">Todos</h4>
                            <ul className="mb-4">
                                <li className="w-full flex flex-col place-items-center gap-3 py-6 px-4 mb-3 text-white bg-gray-700 rounded-md">
                                    <h4 className="font-medium text-xl">Current patch operation</h4>
                                    <p className="font-medium text-lg text-gray-500">The current JSON pointer</p>
                                    <span className="prose">
                                        <code>{newPatch}</code>
                                    </span>
                                </li>
                                {todos.map(t => (
                                    <li key={t["id"]} className="w-full flex flex-col place-items-center gap-3 py-6 px-4 mb-3 bg-white rounded-md">
                                        <span className="prose">
                                            <code>{JSON.stringify(t)}</code>
                                        </span>
                                        <input onChange={e => patchValue(e)}
                                               className="mt-2 p-2 rounded-md inset-1 bg-gray-200 text-gray-700 border-0 focus:bg-white"
                                        />
                                        <button onClick={() => patchTodos(t["id"])} className="w-1/4 py-3 px-6 bg-blue-400 text-white rounded-md">Apply patch</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
            </>
        )
    }
    if (status === 'unauthenticated') {
        return (
            <>
                <Head>
                    <title>Dashboard</title>
                    <meta name="description" content="Generated by create next app"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <div className="w-3/4 h-screen mx-auto flex flex-col">
                    <div className="h-2/4 my-auto flex flex-col gap-3 place-items-center">
                        <h3 className="text-2xl text-gray-600 font-medium bg-violet-50 rounded-md py-3 px-6">You are not signed in</h3>
                        <button onClick={() => signIn()} className="py-3 px-6 bg-blue-400 text-lg font-medium text-white rounded-lg">Sign in</button>
                    </div>
                </div>
            </>
        )
    }

}

Dashboard.auth = true