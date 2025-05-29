"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Globe, Palette } from "lucide-react"

interface ChatSettings {
  notifications: boolean
  sound: boolean
  language: string
  theme: string
  autoGreeting: boolean
  workingHours: boolean
}

export function ChatSettings() {
  const [settings, setSettings] = useState<ChatSettings>({
    notifications: true,
    sound: true,
    language: "vi",
    theme: "light",
    autoGreeting: true,
    workingHours: true,
  })

  const updateSetting = (key: keyof ChatSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Cài đặt Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Thông báo
          </Label>
          <Switch
            id="notifications"
            checked={settings.notifications}
            onCheckedChange={(checked) => updateSetting("notifications", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sound">Âm thanh</Label>
          <Switch id="sound" checked={settings.sound} onCheckedChange={(checked) => updateSetting("sound", checked)} />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Ngôn ngữ
          </Label>
          <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Giao diện
          </Label>
          <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Sáng</SelectItem>
              <SelectItem value="dark">Tối</SelectItem>
              <SelectItem value="auto">Tự động</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="autoGreeting">Chào tự động</Label>
          <Switch
            id="autoGreeting"
            checked={settings.autoGreeting}
            onCheckedChange={(checked) => updateSetting("autoGreeting", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="workingHours">Chỉ giờ hành chính</Label>
          <Switch
            id="workingHours"
            checked={settings.workingHours}
            onCheckedChange={(checked) => updateSetting("workingHours", checked)}
          />
        </div>

        <Button className="w-full">Lưu cài đặt</Button>
      </CardContent>
    </Card>
  )
}
