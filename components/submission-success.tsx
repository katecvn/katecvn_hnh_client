import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { SubmissionSuccessProps } from '../pages/interface';

export default function SubmissionSuccess({
  position,
}: SubmissionSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Check className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-2 mb-6">
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Gửi thành công! ✨
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Cảm ơn bạn đã ứng tuyển vào vị trí{' '}
            <span className="font-semibold text-blue-600">
              {position?.title}
            </span>
            . Chúng tôi sẽ liên hệ trong vòng{' '}
            <span className="font-semibold">3-5 ngày làm việc</span>.
          </p>
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          </div>
          <p className="text-sm text-gray-500">Đang chuyển hướng...</p>
        </CardContent>
      </Card>
    </div>
  );
}
