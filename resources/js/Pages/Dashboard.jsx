import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import React, {useEffect, useRef, useState} from "react";
import Overlay from "@/Pages/Overlay.jsx";
export default function DashboardPage({ auth, _token, articles }) {
    const inputField = useRef();
    const [showOverlay, setShowOverlay] = useState(false);
    const [visibleArticles, setVisibleArticles] = useState(articles);
    const searchArticle = async (e) => {
        if ( e.code != "Enter" ) return;
        let payload = new FormData();
        payload.append("query", inputField.current.value);
        payload.append("_token", _token);
        setShowOverlay(true);
        await fetch(route("article.search"), {
            headers: {
                "Accepts": "application/json"
            },
            method: "POST",
            body: payload
        })
        .then(res=> res.json())
        .then(res => {
            if ( res.msg == "success" ) {
                setVisibleArticles(res.articles);
            }
        })
        setShowOverlay(false);
    }
    useEffect(() => {
        setShowOverlay(false);
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            {
                showOverlay ? <Overlay /> : ""
            }

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid gap-6 mb-6 md:grid-cols-1">
                            <input ref={inputField} onKeyUp={searchArticle} type="text" id="first_name" className="border border-lime-500 text-gray-900 text-sm rounded-0 block w-full p-0.5  dark:border-lime-600 dark:placeholder-gray-400 dark:text-gray-950" placeholder="John" required />
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <strong>Suggested Articles</strong>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <ul className="mt-3 max-w-md space-y-1 text-xs dark:text-green-950 list-none list-inside dark:text-gray-900">
                            {
                                visibleArticles.map(article => {
                                    return (
                                        <li key={article.id}>
                                            <Link href={route("article.show", { id: article.id })}>{ article.title }</Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
