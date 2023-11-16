import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import React, {useState} from "react";

export default function DashboardPage({ auth, articles }) {
    const [title, setTitle]= useState("Dashboard");
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-0 border border-gray-200 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto">
                            <a href={route("admin.article.create")} type="button" className="ml-4 p-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                + Create Article
                            </a>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Articles
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Keywords
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    articles.map((article, index) => {
                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    { article.title }
                                                </th>
                                                <td className="px-6 py-4" style={{ maxWidth: "200px" }}>
                                                    {
                                                        article.keywords.map((keyword, index) => {
                                                            return (
                                                                <>
                                                                    <span id={keyword.id} key={index} className="keyword text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                                        #{keyword.name}
                                                                    </span>
                                                                    <br/>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={route("admin.article.show", { "id": article.id } )} type="button" className="p-0 text-white bg-write-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-1.5 py-0 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                        view
                                                    </Link>
                                                    <button type="button" className="p-0 text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-1.5 py-0 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800">
                                                        edit
                                                    </button>
                                                    <button type="button" className="p-0 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-1.5 py-0 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800">
                                                        delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
