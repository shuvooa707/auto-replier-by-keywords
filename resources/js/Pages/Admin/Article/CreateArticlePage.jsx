import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import React, {useRef, useState} from "react";
import CreatableSelect from 'react-select/creatable';

export default function DashboardPage({ auth, _token }) {
    const title = useRef();
    const description = useRef();
    const body = useRef();
    let keywords = [];

    const createArticle = async () => {
        const payload = new FormData();
        payload.append("_token", _token)
        payload.append("title", title.current.value);
        payload.append("description", description.current.value);
        payload.append("body", body.current.value);

        await fetch(route("admin.article.store"),{
            method: "POST",
            headers: {
                "Accepts": "application/json"
            },
            body: payload
        }).then(res=> res.json())
        .then(res => {
            if (res.msg == "success") {
                router.visit(route("admin.dashboard"));
            }
        })
    }

    const handleChange = (e) => {
        let options = window.event.target.options;
        console.log(window.event.target);
        return;
        let values = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        keywords = values;
    }

    let colourOptions = [];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={"Create Article"} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-0 border border-gray-200 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto">
                            <nav className="bg-blue-200 text-white p-2 mb-2 w-full rounded-md">
                                <ol className="list-reset flex">
                                    <li>
                                        <Link href={route("admin.dashboard")} class="text-blue-800 pl-3 text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                                            All Articles
                                        </Link>
                                    </li>
                                    <li>
                                        <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
                                    </li>
                                    <li className="text-neutral-700">
                                        Create New Article
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        <div className="bg-gray-900 border border-gray-500 p-2 rounded rounded-sm">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-100">Title</label>
                            <textarea ref={title} id="title" rows="1" className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Article Title"></textarea>

                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-100">Description</label>
                            <textarea ref={description} id="description" rows="4" className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Description"></textarea>

                            <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-100">Body</label>
                            <textarea ref={body} id="body" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Body"></textarea>

                            <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-100">Body</label>
                            {/*<CreatableSelect onChange={handleChange} isMulti options={colourOptions} />*/}

                            <button onClick={createArticle} type="button" className="my-4 w-48 p-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                CREATE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
