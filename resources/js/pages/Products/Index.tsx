import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    href: '/products',
  },
];

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image1?: string | null;
  image1_url?: string | null;
}

interface PageProps {
  flash: {
    message?: string;
  };
  products: Product[];
}

export default function Products() {
  const { products, flash } = usePage<PageProps>().props;

  const { processing, delete: destroy } = useForm();

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete the product: ${name} (ID: ${id})?`)) {
      destroy(route('products.destroy', id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <div className="m-4">
        <Link href={route('products.create')}>
          <Button>Create a product</Button>
        </Link>
      </div>

      <div className="m-4">
        {flash.message && (
          <Alert>
            <Megaphone className="h-4 w-4" />
            <AlertTitle>Notification</AlertTitle>
            <AlertDescription>{flash.message}</AlertDescription>
          </Alert>
        )}
      </div>

      {products.length > 0 && (
        <div className="m-4">
          <Table>
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Image URL</TableHead>
                <TableHead>Store Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>

                  <TableCell>
                    {product.image1_url ? (
                      <img
                        src={product.image1_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-no-image.png'; // fallback
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        No image
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="max-w-xs truncate">
                    {product.image1_url || 'No image'}
                  </TableCell>

                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>

                  <TableCell className="text-center space-x-2">
                    <Link href={route('products.edit', product.id)}>
                      <Button className="bg-slate-600 hover:bg-slate-700">Edit</Button>
                    </Link>
                    <Button
                      disabled={processing}
                      onClick={() => handleDelete(product.id, product.name)}
                      className="bg-red-500 hover:bg-red-700"
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