import {
  MessageCircle,
  ThumbsUp,
  Smile,
  Image,
  Link2,
  Send,
  TrendingUp,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Comment, UserInfo } from '@/types/interface';
import { memo, useEffect, useState } from 'react';
import { localStorageUtil } from '@/utils/localStorage';
import { toast } from 'sonner';
import api from '@/utils/axios';
import { RequestLogin } from './request-login';

interface CommentsSectionProps {
  comments: Comment[];
  postId: number;
  onCommentSubmitted?: () => void;
}

const ReplyInput = memo(function ReplyInput({
  replyingToName,
  value,
  onChange,
  onCancel,
  onSubmit,
}: {
  replyingToName: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="mt-3">
      <textarea
        autoFocus
        value={value}
        onChange={onChange}
        placeholder={`Phản hồi ${replyingToName}...`}
        className="w-full p-3 border rounded"
      />
      <div className="flex justify-end gap-2 mt-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Hủy
        </Button>
        <Button size="sm" onClick={onSubmit} disabled={!value.trim()}>
          <Send className="h-4 w-4 mr-1" />
          Gửi
        </Button>
      </div>
    </div>
  );
});

export default function CommentsSection({
  comments,
  postId,
  onCommentSubmitted,
}: CommentsSectionProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [token, setToken] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    setToken(localStorageUtil.getToken() ?? '');
    setUserInfo(localStorageUtil.getUser());
  }, []);

  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-pink-500',
  ];
  const getColor = (id: number) => colors[id % colors.length];

  const getInitials = (name: string): string => {
    const words = name.trim().split(' ');
    return (words[0][0] + (words[words.length - 1][0] || '')).toUpperCase();
  };

  const handleSubmitComment = async () => {
    if (!token || !userInfo) return toast.error('Vui lòng đăng nhập.');

    const content = replyTo ? replyContent.trim() : commentContent.trim();
    if (!content) return toast.error('Nội dung không được để trống.');

    try {
      await api.post(
        '/comment/post/create',
        {
          content,
          ableId: postId,
          replyTo,
          parentId: replyTo || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success('Đã gửi bình luận.');
      setCommentContent('');
      setReplyContent('');
      setReplyTo(null);
      onCommentSubmitted?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gửi bình luận thất bại.');
    }
  };

  const renderReplies = (parentId: number) => {
    return comments
      .filter((c) => c.parentId === parentId)
      .map((reply) => (
        <div key={reply.id} className="ml-8 mt-4">
          <CommentItem comment={reply} />
        </div>
      ));
  };

  const CommentItem = ({ comment }: { comment: Comment }) => (
    <div className="flex flex-col sm:flex-row gap-4 text-[0.9rem] ">
      <Avatar className="ring-2 flex-shrink-0">
        <AvatarFallback
          className={`${getColor(comment.user.id)} text-white font-semibold`}
        >
          {getInitials(comment.user.full_name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-gray-900">
            {comment.user.full_name}
          </span>
        </div>
        <p className="text-gray-700">{comment.content}</p>
        <div className="flex gap-4 ">
          <div className="flex items-center p-0 text-gray-600 hover:text-blue-700">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {Math.floor(Math.random() * 10) + 1}
          </div>
          <button
            className="p-0 text-gray-600 hover:text-green-600 hover:underline"
            onClick={() => {
              setReplyTo(comment.id);
              setReplyContent('');
            }}
          >
            Trả lời
          </button>
        </div>
        {replyTo === comment.id ? (
          <ReplyInput
            key={`reply-${comment.id}`}
            replyingToName={comment.user.full_name}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            onCancel={() => {
              setReplyTo(null);
              setReplyContent('');
            }}
            onSubmit={handleSubmitComment}
          />
        ) : null}

        {renderReplies(comment.id)}
      </div>
    </div>
  );

  return (
    <Card className="mt-4 sm:mt-6 md:mt-8 rounded-sm shadow-lg">
      <CardHeader className=" p-3 sm:p-4 md:p-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <MessageCircle className="h-4 w-4 md:h-6 md:w-6 text-green-cyan-500" />
          Bình luận ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className=" p-3 sm:p-4 md:p-6 pt-0">
        {comments
          .filter((c) => !c.parentId)
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}

        <div className="border-t border-gray-200">
          {userInfo ? (
            <div className="flex gap-2 md:gap-4 pt-3">
              <Avatar className="ring-2">
                <AvatarFallback className="bg-lime-600 text-white font-semibold">
                  {getInitials(userInfo?.full_name || 'K')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <textarea
                  placeholder="Chia sẻ suy nghĩ..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="w-full min-h-[80px] md:min-h-[100px] text-sm md:text-base p-3 border rounded-lg"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmitComment}
                    disabled={!commentContent.trim()}
                    className="flex justify-center items-center text-sm md:text-base rounded-sm px-2 py-1 md:px-4 md:py-2 text-white bg-green-600 hover:bg-green-500 hover:scale-105"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Gửi bình luận
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <RequestLogin message="tiếp tục bình luận" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
