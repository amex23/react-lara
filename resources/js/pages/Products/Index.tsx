import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';
import { usePage, useForm } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: number;
  name: string;
  user_id: number;
  owner_name?: string;
  price?: number | null;
  description?: string | null;
  subscription?: boolean;
  image1_url?: string | null;
  image2_url?: string | null;
  image3_url?: string | null;
  image4_url?: string | null;
  image5_url?: string | null;
  image6_url?: string | null;
}

interface AuthUser {
  id: number;
  name: string;
  user_type: 'user' | 'admin';
}

interface PageProps {
  flash?: { message?: string };
  products: Product[];
  authUser: AuthUser;
}

export default function Products() {
  const { products, flash, authUser } = usePage<PageProps>().props;

  const isAdmin = authUser?.user_type === 'admin';

  const { processing, delete: destroy } = useForm();

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Delete "${name}" (ID: ${id})?`)) {
      destroy(route('products.destroy', id));
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Products', href: '/products' }]}>
      <Head title="Products" />

      <div className="m-4 flex items-center justify-between">
        <Link href={route('products.create')}>
          <Button>Create product</Button>
        </Link>

        {isAdmin && products.length > 0 && (
          <span className="text-sm text-muted-foreground">
            Showing all {products.length} products from all stores
          </span>
        )}
      </div>

      {flash?.message && (
        <div className="m-4">
          <Alert>
            <Megaphone className="h-4 w-4" />
            <AlertTitle>Notification</AlertTitle>
            <AlertDescription>{flash.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {products.length === 0 ? (
        <div className="m-8 text-center text-muted-foreground py-10">
          {isAdmin
            ? "No products exist in the system yet."
            : "You haven't created any products yet."}
        </div>
      ) : (
        <div className="m-4 overflow-x-auto">
          <Table>
            <TableCaption>
              {isAdmin ? 'All products (all stores)' : 'Your products'}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                {isAdmin && <TableHead className="w-36">Store Owner</TableHead>}
                <TableHead>Images</TableHead>
                <TableHead>Store Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead className="text-center w-44">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>

                  {isAdmin && (
                    <TableCell className="text-sm">
                      {product.owner_name || `User #${product.user_id}`}
                    </TableCell>
                  )}

                  <TableCell>
                    <div className="flex flex-wrap gap-1.5 max-w-[160px]">
                      {[1,2,3,4,5,6].map((i) => {
                        const key = `image${i}_url` as keyof Product;
                        return product[key] ? (
                          <img
                            key={i}
                            src={product[key] as string}
                            alt={`Store image ${i}`}
                            className="w-9 h-9 object-cover rounded border"
                          />
                        ) : null;
                      })}

                      {![1,2,3,4,5,6].some(i => product[`image${i}_url` as keyof Product]) && (
                        <div className="w-9 h-9 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                          no img
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">{product.name}</TableCell>

                  {/* Always show real price (no isAdmin check) */}
                  <TableCell>
                    {product.price != null
                      ? `$${Number(product.price).toFixed(2)}`
                      : '—'}
                  </TableCell>

                  {/* Always show real description */}
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {product.description || '—'}
                  </TableCell>

                  {/* Always show real subscription */}
                  <TableCell>
                    {product.subscription ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </TableCell>

                  <TableCell className="text-center space-x-2">
                    <Link href={route('products.edit', product.id)}>
                      <Button size="sm" variant="outline">Edit</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={processing}
                      onClick={() => handleDelete(product.id, product.name)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AppLayout>
  );
}