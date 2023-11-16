import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useState} from "react";

export default function DashboardPage({ auth, article }) {
    const [title, setTitle]= useState("Dashboard");
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={title} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-0 border border-gray-200 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto">
                            <button type="button" className="ml-4 p-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                + Create Article
                            </button>
                            <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                                    <h3>{ article.title }</h3>
                                </div>
                                <div className="p-6">
                                    <strong className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                        { article.description }
                                    </strong>
                                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                        { article.body }
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
