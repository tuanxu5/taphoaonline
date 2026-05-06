import Link from 'next/link';

export default function Banner() {
  return (
    <section className="bg-[#d70018]">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Điện thoại chính hãng - Giá tốt nhất
            </h1>
            <p className="text-white/90 text-sm md:text-base mb-4">
              Trả góp 0% • Giao hàng 2h • Bảo hành 12 tháng
            </p>
            <Link 
              href="/deals" 
              className="inline-block bg-white text-[#d70018] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100"
            >
              Xem ưu đãi
            </Link>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop" 
              alt="Banner" 
              className="w-[300px] h-[160px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
