"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { colors, typography } from "@/lib/design-tokens";
import { useTheme } from "@/lib/theme-context";

interface Product {
  name: string;
  price: string;
  quantity: number;
  amount: string;
}

const products: Product[] = [
  {
    name: "ASOS Ridley High Waist",
    price: "$79.49",
    quantity: 82,
    amount: "$6,518.18",
  },
  {
    name: "Marco Lightweight Shirt",
    price: "$128.50",
    quantity: 37,
    amount: "$4,754.50",
  },
  {
    name: "Half Sleeve Shirt",
    price: "$39.99",
    quantity: 64,
    amount: "$2,559.36",
  },
  {
    name: "Lightweight Jacket",
    price: "$20.00",
    quantity: 184,
    amount: "$3,680.00",
  },
  {
    name: "Marco Shoes",
    price: "$79.49",
    quantity: 64,
    amount: "$1,965.81",
  },
];

interface ProductsTableProps {
  className?: string;
}

export function ProductsTable({ className = "" }: ProductsTableProps) {
  const { theme } = useTheme();
  const textColors = colors.getText(theme);
  const bgColors = colors.getBackground(theme);
  const borderColors = colors.getBorder(theme);

  return (
    <Card
      className={`border-none shadow-none rounded-2xl h-full w-full ${className}`}
      style={{
        backgroundColor:
          theme === "dark"
            ? colors.background.darkCard
            : colors.background.secondary,
      }}
    >
      <CardHeader>
        <CardTitle
          className="font-medium"
          style={{
            fontSize: typography.fontSize.sm,
            color: textColors.primary,
          }}
        >
          Top Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div
            className="grid grid-cols-4 gap-4 pb-2 border-b"
            style={{
              fontSize: typography.fontSize.xs,
              color: `${textColors.primary}40`,
              borderColor: borderColors.light,
            }}
          >
            <div>Name</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Amount</div>
          </div>

          {products.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 p-2 rounded transition-colors cursor-pointer"
              style={{
                fontSize: typography.fontSize.xs,
                color: textColors.primary,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = bgColors.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div>{product.name}</div>
              <div>{product.price}</div>
              <div>{product.quantity}</div>
              <div>{product.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
