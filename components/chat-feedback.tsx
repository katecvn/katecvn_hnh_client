"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Star } from "lucide-react"

interface ChatFeedbackProps {
  messageId: string
  sessionId: string
  onFeedbackSubmitted?: () => void
}

export function ChatFeedback({ messageId, sessionId, onFeedbackSubmitted }: ChatFeedbackProps) {
  const [rating, setRating] = useState<number>(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitFeedback = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          messageId,
          rating,
          feedback,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        onFeedbackSubmitted?.()
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-green-600">Cảm ơn bạn đã đánh giá!</p>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">Đánh giá cuộc trò chuyện</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Star Rating */}
        <div className="flex justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button key={star} variant="ghost" size="sm" onClick={() => setRating(star)} className="p-1">
              <Star className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            </Button>
          ))}
        </div>

        {/* Quick Feedback */}
        <div className="flex justify-center space-x-2">
          <Button
            variant={rating >= 4 ? "default" : "outline"}
            size="sm"
            onClick={() => setRating(5)}
            className="flex items-center"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Hữu ích
          </Button>
          <Button
            variant={rating <= 2 ? "default" : "outline"}
            size="sm"
            onClick={() => setRating(2)}
            className="flex items-center"
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            Cần cải thiện
          </Button>
        </div>

        {/* Detailed Feedback */}
        <Textarea
          placeholder="Chia sẻ thêm về trải nghiệm của bạn (tùy chọn)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={3}
        />

        <Button onClick={handleSubmitFeedback} disabled={rating === 0 || isSubmitting} className="w-full">
          {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
        </Button>
      </CardContent>
    </Card>
  )
}
