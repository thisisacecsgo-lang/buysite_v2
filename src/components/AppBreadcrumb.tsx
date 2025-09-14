import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation, useParams } from "react-router-dom";
import { mockProducts, mockSellers } from "@/data/mockData";

export const AppBreadcrumb = () => {
  const location = useLocation();
  const params = useParams<{ id?: string }>();

  const buildBreadcrumbs = () => {
    const { pathname, state } = location;
    const fromProduct = state?.fromProduct as { id: string; name: string } | undefined;
    const crumbs: { name: string; path: string }[] = [];

    if (pathname.startsWith("/product/") && params.id) {
      const product = mockProducts.find((p) => p.id === params.id);
      crumbs.push({ name: product ? product.name : "Product Not Found", path: pathname });
    } else if (pathname.startsWith("/seller/") && params.id) {
      if (fromProduct) {
        crumbs.push({ name: fromProduct.name, path: `/product/${fromProduct.id}` });
      }
      const seller = mockSellers.find((s) => s.id === params.id);
      crumbs.push({ name: seller ? seller.name : "Seller Not Found", path: pathname });
    } else if (pathname === "/checkout") {
      crumbs.push({ name: "Checkout", path: "/checkout" });
    } else if (pathname === "/profile") {
      crumbs.push({ name: "My Profile", path: "/profile" });
    } else if (pathname === "/order-confirmation") {
      crumbs.push({ name: "Checkout", path: "/checkout" });
      crumbs.push({ name: "Order Confirmation", path: "/order-confirmation" });
    } else {
      crumbs.push({ name: "Page Not Found", path: pathname });
    }
    return crumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <BreadcrumbItem key={crumb.path + index}>
              <BreadcrumbSeparator />
              {isLast ? (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.path}>{crumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};