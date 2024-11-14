const commentRepository = require('../repositories/comment')

class CommentService {
  constructor(commentRepository) {
    this.commentRepository = commentRepository
  }
  getComments(offset, limit) {
    try {
      return this.commentRepository.getComments(offset, limit)
    } catch (error) {
      throw new Error('что-то пошло не так')
    }
  }
  getCommentById(id) {
    try {
      const comment = commentRepository.getCommentById(id)
      if (!comment) {
        throw new Error('Комментария с таким ID не существует')
      }
      return comment
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось получит комментарий по его ID')
    }
  }

  createComment(data) {
    try {
      const { username, postId, text } = data
      return this.commentRepository.createComment(username, postId, text)
    } catch (error) {
      console.log(error);
      throw new Error('Не удалось создать комментарии')
    }
  }
  updateComment(data) {
    try {
      const { text, id } = data
      const comment = commentRepository.getCommentById(id)
      if (!comment) {
        throw new Error('Комментария с таким ID не существует')
      }
      return this.commentRepository.updateComment(text, id)
    } catch (error) {
      if (error.message) {
        throw error
      }
      throw new Error('Не удалось обновить комментарий')
    }
  }
  deleteComment(id) {
    try {
      const comment = commentRepository.getCommentById(id)
      if (!comment) {
        throw new Error('Комментария с таким ID не существует')
      }
      return commentRepository.deleteComment(id)
    } catch (error) {
      if (error.message) {
        throw error
      }
    }
  }
}
module.exports = new CommentService(commentRepository)