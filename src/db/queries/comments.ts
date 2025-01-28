import type { Comment } from "@prisma/client";
import { db } from "..";

export type CommentWithAuthour = Comment & {
  user: { name: string | null; image: string | null };
};

export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthour[]> {
  return db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}
