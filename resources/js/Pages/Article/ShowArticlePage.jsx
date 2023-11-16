import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import React, {useEffect, useState} from "react";
import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'

export default function ShowArticlePage({ auth, article, _token }) {
    const [title, setTitle]= useState("Dashboard");
    useEffect(()=>{
        if (!article) {
            router.visit(route("admin.dashboard"));
        }
    },[]);

    const deleteArticle = async (id) => {
        let payload = new FormData();
        payload.append("id", id);
        payload.append("_token", _token);

        await fetch(route("admin.article.destroy"),{
            headers: {
                "Accepts": "application/json"
            },
            method: "POST",
            body: payload
        })
            .then(res=> res.json())
            .then(onDeleted)
            .catch(console.error)
    }
    const onDeleted = async (res) => {
        console.log(res)

        router.visit(route("admin.dashboard"));
    }
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-0 border border-gray-200 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto">

                            <nav class="bg-gray-700 text-white p-2 mb-2 w-full rounded-md">
                                <ol class="list-reset flex">
                                    <li>
                                        <Link href={route("dashboard")} class="text-blue-200 pl-3 text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                                            Go Back
                                        </Link>
                                    </li>
                                    <li>
                                        <span class="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
                                    </li>
                                    <li class="text-neutral-500 dark:text-neutral-400">
                                        { article?.title }
                                    </li>
                                </ol>
                            </nav>

                            <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                <div className="flex justify-between border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                                    <h1>{ article?.title }</h1>
                                </div>
                                <div className="border-b-2 border-neutral-100 px-6 py-1 dark:border-neutral-600 dark:text-neutral-50">
                                    {
                                        article?.keywords.map((keyword, index) => {
                                                    return (
                                                    <>
                                                        <span id={keyword.id} key={index} className="keyword text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                            #{keyword.name}
                                                        </span>
                                                    </>
                                            )
                                        })
                                    }
                                </div>
                                <div className="p-6">
                                    <h6 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                        { article?.description }
                                    </h6>
                                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                        { article?.body }
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
