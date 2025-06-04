'use client';

import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function MaintenanceToggle() {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleToggle = async (checked: boolean) => {
        setIsEnabled(checked);
        // TODO: Implement maintenance mode toggle with your backend
        console.log('Maintenance mode:', checked);
    };

    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={isEnabled}
                onCheckedChange={handleToggle}
                aria-label="Toggle maintenance mode"
            />
            <span className="text-sm text-gray-600">
                Mode maintenance
            </span>
        </div>
    );
} 