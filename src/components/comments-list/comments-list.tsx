import * as React from 'react';
import classNames from 'classnames';
import { usePostComments } from 'context/comments-context';
import { Loader } from 'components/loader';
import { NonIdealState } from 'components/non-ideal-state';
import { Comment } from 'components/comment';
import styles from './comments-list.module.css';

export type CommentsListProps = {
  className?: string;
  accessToken: string;
  pagePostId: string;
};

export function CommentsList({
  className,
  accessToken,
  pagePostId,
}: CommentsListProps) {
  const {
    isLoading,
    isError,
    isSuccess,
    postComments,
    postCommentsLoadError,
  } = usePostComments(accessToken, pagePostId);

  let content = null;
  if (isLoading) {
    content = <Loader>Загрузка комментариев...</Loader>;
  } else if (isError) {
    content = (
      <NonIdealState title="Не удалось загрузить комментарии">
        {postCommentsLoadError?.response?.data.error.error_user_msg}
      </NonIdealState>
    );
  } else if (isSuccess) {
    content = postComments.length ? (
      <div className={styles.comments}>
        {postComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    ) : (
      <NonIdealState title="Комментарии отсутствуют" />
    );
  }

  return (
    <div className={classNames(className, styles.container)}>{content}</div>
  );
}