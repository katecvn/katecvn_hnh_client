"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Users, Clock, TrendingUp, Star, Bot } from "lucide-react"

interface ChatStats {
  totalConversations: number
  activeUsers: number
  averageResponseTime: number
  satisfactionRate: number
  botResolutionRate: number
  agentHandoffs: number
  topQuestions: Array<{ question: string; count: number }>
  hourlyStats: Array<{ hour: number; conversations: number }>
}

export function ChatAnalyticsDashboard() {
  const [stats, setStats] = useState<ChatStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setStats({
        totalConversations: 1247,
        activeUsers: 89,
        averageResponseTime: 2.3,
        satisfactionRate: 4.6,
        botResolutionRate: 78,
        agentHandoffs: 156,
        topQuestions: [
          { question: "Báo giá sản phẩm ERP", count: 234 },
          { question: "Thông tin về dịch vụ", count: 189 },
          { question: "Hỗ trợ kỹ thuật", count: 156 },
          { question: "Đặt lịch hẹn", count: 134 },
          { question: "Liên hệ sales", count: 98 },
        ],
        hourlyStats: [
          { hour: 8, conversations: 45 },
          { hour: 9, conversations: 67 },
          { hour: 10, conversations: 89 },
          { hour: 11, conversations: 78 },
          { hour: 14, conversations: 92 },
          { hour: 15, conversations: 76 },
          { hour: 16, conversations: 54 },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <div className="p-6">Đang tải analytics...</div>
  }

  if (!stats) return null

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Chat Analytics Dashboard</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng cuộc trò chuyện</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Người dùng hoạt động</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Đang online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thời gian phản hồi</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageResponseTime}s</div>
            <p className="text-xs text-muted-foreground">Trung bình</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đánh giá hài lòng</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.satisfactionRate}/5</div>
            <p className="text-xs text-muted-foreground">Điểm trung bình</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              Hiệu suất Bot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tỷ lệ giải quyết tự động</span>
                <span>{stats.botResolutionRate}%</span>
              </div>
              <Progress value={stats.botResolutionRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Chuyển giao cho agent</span>
                <span>{stats.agentHandoffs} lượt</span>
              </div>
              <Progress value={(stats.agentHandoffs / stats.totalConversations) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Câu hỏi phổ biến
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topQuestions.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{item.question}</span>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động theo giờ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end space-x-2 h-32">
            {stats.hourlyStats.map((stat) => (
              <div key={stat.hour} className="flex flex-col items-center">
                <div
                  className="bg-blue-500 w-8 rounded-t"
                  style={{ height: `${(stat.conversations / 100) * 100}px` }}
                />
                <span className="text-xs mt-1">{stat.hour}h</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
