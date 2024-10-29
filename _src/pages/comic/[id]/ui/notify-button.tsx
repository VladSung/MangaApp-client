'use client';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from '@src/shared/lib/i18n/client';
import { IconBellRinging } from '@tabler/icons-react';
import { useState } from 'react';

export const NotifyButton = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'comic/id');

    const [notificationEnabled, setNotificationEnabled] = useState(false);

    const handleNotificationToggle = () => {
        setNotificationEnabled(!notificationEnabled);

        notifications.show({
            title: notificationEnabled ? t('notification.disabled') : t('notification.enabled'),
            message: notificationEnabled
                ? t('notification.disabled.message')
                : t('notification.enabled.message'),
            color: notificationEnabled ? 'red' : 'green',
        });
    };

    return (
        <Button
            style={{ flexGrow: 1 }}
            size="sm"
            leftSection={<IconBellRinging size={16} />}
            variant={'filled'}
            color={notificationEnabled ? 'green' : undefined}
            onClick={handleNotificationToggle}
        >
            {notificationEnabled ? t('notification.on') : t('notification.off')}
        </Button>
    );
};
