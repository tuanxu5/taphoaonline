import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MegaMart - Siêu thị trực tuyến',
    short_name: 'MegaMart',
    description: 'Mua sắm thông minh với hàng ngàn sản phẩm chính hãng',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#d70018',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
