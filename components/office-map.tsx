"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

interface Office {
  city: string
  address: string
  phone: string
  email: string
  hours: string
  isMain: boolean
  coordinates: { lat: number; lng: number }
}

interface OfficeMapProps {
  offices: Office[]
}

export function OfficeMap({ offices }: OfficeMapProps) {
  const [selectedOffice, setSelectedOffice] = useState(0)

  // Google Maps embed URL for the selected office
  const getMapUrl = (office: Office) => {
    const { lat, lng } = office.coordinates
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVGVjaFZpZXQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s`
  }

  return (
    <div className="space-y-6">
      {/* Office Selector */}
      <div className="flex flex-wrap gap-2">
        {offices.map((office, index) => (
          <Button
            key={index}
            variant={selectedOffice === index ? "default" : "outline"}
            onClick={() => setSelectedOffice(index)}
            className="flex items-center"
          >
            <MapPin className="h-4 w-4 mr-2" />
            {office.city}
            {office.isMain && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Chính</span>}
          </Button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative">
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={getMapUrl(offices[selectedOffice])}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Bản đồ văn phòng ${offices[selectedOffice].city}`}
          />
        </div>

        {/* Office Info Overlay */}
        <Card className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  {offices[selectedOffice].city}
                  {offices[selectedOffice].isMain && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Trụ sở chính</span>
                  )}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-2" />
                    {offices[selectedOffice].address}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-2" />
                    {offices[selectedOffice].phone}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-2" />
                    {offices[selectedOffice].hours}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline">
                  Chỉ đường
                </Button>
                <Button size="sm">
                  <Phone className="h-3 w-3 mr-1" />
                  Gọi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="flex items-center justify-center">
          <MapPin className="h-4 w-4 mr-2" />
          Chỉ đường
        </Button>
        <Button variant="outline" className="flex items-center justify-center">
          <Phone className="h-4 w-4 mr-2" />
          Gọi điện
        </Button>
        <Button variant="outline" className="flex items-center justify-center">
          <Mail className="h-4 w-4 mr-2" />
          Gửi email
        </Button>
        <Button variant="outline" className="flex items-center justify-center">
          <Clock className="h-4 w-4 mr-2" />
          Đặt lịch hẹn
        </Button>
      </div>
    </div>
  )
}
