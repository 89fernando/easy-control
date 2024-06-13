"use client";

import { useRouter } from "next/navigation";
import { FiRefreshCw } from "react-icons/fi";

export default function ButtonRefresh() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.refresh()}
            className="bg-green-600 px-4 py-1 rounded"
        >
            <FiRefreshCw size={24} color="#FFF"/>
        </button>
    )
}