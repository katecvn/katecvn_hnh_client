'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Send, Star } from 'lucide-react';

import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { RatingDialogProps } from '@/pages/interface';
// import form của bạn
export default function RatingDialog({
  open,
  onOpenChange,
}: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !name || !content) {
      toast.warning('Vui lòng điền đầy đủ thông tin và chọn số sao');
      return;
    }

    setLoading(true);
    try {
      // gọi API nếu có
      toast.success('Cảm ơn bạn đã đánh giá!');
      setRating(0);
      setName('');
      setContent('');
    } catch (err) {
      toast.error('Không thể gửi đánh giá');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Chia sẻ trải nghiệm của bạn</DialogTitle>
          <DialogDescription>
            Đánh giá của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Tên <span className="text-red-500">*</span>
            </label>
            <Input
              required
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Đánh giá của bạn <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    (hoverRating || rating) >= star
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Nội dung đánh giá
            </label>
            <Textarea
              rows={5}
              placeholder="Bạn nghĩ gì về sản phẩm này?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Gửi */}
          <div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full hover:from-blue-600 hover:to-purple-700"
            >
              {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
              {!loading && <Send className="ml-2 w-4 h-4" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
