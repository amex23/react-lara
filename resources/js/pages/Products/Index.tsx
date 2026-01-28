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

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  subscription: boolean;
  image1?: string | null;
  image1_url?: string | null;
  image2?: string | null;
  image2_url?: string | null;
  image3?: string | null;
  image3_url?: string | null;
  image4?: string | null;
  image4_url?: string | null;
  image5?: string | null;
  image5_url?: string | null;
  image6?: string | null;
  image6_url?: string | null;
}

interface PageProps {
  flash: { message?: string };
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
    <AppLayout breadcrumbs={[{ title: 'Products', href: '/products' }]}>
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
                <TableHead>Images</TableHead>
                <TableHead>Image URLs</TableHead>
                <TableHead>Store Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {product.image1_url && (
                        <img src={product.image1_url} alt="Image 1" className="w-12 h-12 object-cover rounded" />
                      )}
                      {product.image2_url && (
                        <img src={product.image2_url} alt="Image 2" className="w-12 h-12 object-cover rounded" />
                      )}
                      {product.image3_url && (
                        <img src={product.image3_url} alt="Image 3" className="w-12 h-12 object-cover rounded" />
                      )}
                      {product.image4_url && (
                        <img src={product.image4_url} alt="Image 4" className="w-12 h-12 object-cover rounded" />
                      )}
                      {product.image5_url && (
                        <img src={product.image5_url} alt="Image 5" className="w-12 h-12 object-cover rounded" />
                      )}
                      {product.image6_url && (
                        <img src={product.image6_url} alt="Image 6" className="w-12 h-12 object-cover rounded" />
                      )}
                      {!product.image1_url && !product.image2_url && !product.image3_url &&
                       !product.image4_url && !product.image5_url && !product.image6_url && (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          No images
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="max-w-xs truncate">
                    {product.image1_url || product.image2_url || product.image3_url ||
                     product.image4_url || product.image5_url || product.image6_url
                      ? 'Multiple images'
                      : 'No images'}
                  </TableCell>

                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.subscription ? 'Yes' : 'No'}</TableCell>

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