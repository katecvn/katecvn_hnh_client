"use client"

import { useEffect } from "react"

interface ChatEvent {
  type: "chat_opened" | "message_sent" | "quick_reply_clicked" | "agent_requested" | "chat_closed"
  timestamp: Date
  data?: any
}

export function useChatAnalytics() {
  const trackEvent = (event: ChatEvent) => {
    // Track to analytics service (Google Analytics, Mixpanel, etc.)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.type, {
        event_category: "chat",
        event_label: event.type,
        value: 1,
      })
    }

    // Send to your backend for analysis
    fetch("/api/chat/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }).catch(console.error)
  }

  return { trackEvent }
}

// Chat Analytics Component
export function ChatAnalytics() {
  useEffect(() => {
    // Initialize chat analytics
    console.log("Chat analytics initialized")
  }, [])

  return null
}
