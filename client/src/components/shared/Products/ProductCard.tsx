import { Link } from "react-router-dom";

import { Product } from "@/types";
import { IMAGE_BASE_URL } from "@/constants";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="relative min-h-[260px] bg-gray">
        <img
          className="absolute w-full h-full object-contain p-8"
          src={IMAGE_BASE_URL + product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="mt-4">
        <h4 className="text-[18px] md:text-[20px] font-semibold mb-3 truncate">
          {product.name}
        </h4>
        <p className="text-[15px] md:text-[18px] truncate">
          {product.description}
        </p>
        <span className="text-[15px] md:text-[18px] ">${product.price}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
