'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Settings } from 'lucide-react';

interface ChatSettings {
  notifications: boolean;
  sound: boolean;
  language: string;
  theme: string;
  autoGreeting: boolean;
  workingHours: boolean;
}

export function ChatSettings() {
  const [settings, setSettings] = useState<ChatSettings>({
    notifications: true,
    sound: true,
    language: 'vi',
    theme: 'light',
    autoGreeting: true,
    workingHours: true,
  });

  const updateSetting = (key: keyof ChatSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Cài đặt Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full">Lưu cài đặt</Button>
      </CardContent>
    </Card>
  );
}
