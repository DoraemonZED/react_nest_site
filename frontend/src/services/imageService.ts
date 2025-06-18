import { http } from '@/utils/request';

export interface ImageResponse {
  url: string;
  filename: string;
}

export const imageService = {
  // 从网络URL下载图片
  async downloadFromUrl(imageUrl: string): Promise<ImageResponse> {
    const response = await http.post('/images/download', { url: imageUrl });
    return response.data;
  },

  // 上传本地图片
  async upload(file: File): Promise<ImageResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await http.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 验证文章中的图片并清理未使用的图片
  async validateAndCleanImages(content: string, articleId: string): Promise<void> {
    await http.post('/images/validate', {
      content,
      articleId,
    });
  },

  // 删除单个图片
  async deleteImage(filename: string): Promise<void> {
    await http.delete(`/images/${filename}`);
  }
}; 