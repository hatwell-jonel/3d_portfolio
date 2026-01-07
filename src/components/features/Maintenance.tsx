import { AlertCircle } from 'lucide-react'
import React from 'react'

const Maintenance = () => {
    return (
    <div className="w-full border-l-4 border border-yellow-800 p-6 rounded-md">
        <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
            <div>
                <h3 className="font-semibold text-yellow-800">Under Maintenance</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                        This section is currently under maintenance. We&apos;re working to bring you improvements soon.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Maintenance