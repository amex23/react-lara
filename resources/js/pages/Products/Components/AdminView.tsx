import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import VisitorLog from './AdminView/VisitorLog';
import GeoTest from './AdminView/GeoTest';
import DeleteButton from './AdminView/DeleteButton';

interface Product {
    id: number;
    name: string;
    user_id: number;
    owner_name?: string;
    description?: string | null;
    price?: string | number | null;
    subscription?: boolean;
    image1_url?: string | null;
    image2_url?: string | null;
    image3_url?: string | null;
    image4_url?: string | null;
    image5_url?: string | null;
    image6_url?: string | null;
}

interface AdminViewProps {
    products: Product[];
    editUrlBase: string;
}

export default function AdminView({ products, editUrlBase }: AdminViewProps) {
    return (
        <>
            <VisitorLog />
            <GeoTest />

            {products.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border rounded-lg">
                    No store profiles have been created yet.
                </div>
            ) : (
                <>
                    {/* Mobile cards */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {products.map((product) => (
                            <div key={product.id} className="border rounded-xl p-4 bg-white shadow-sm space-y-3">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>ID: {product.id}</span>
                                    <span>{product.owner_name || `User #${product.user_id}`}</span>
                                </div>
                                <div className="flex gap-1.5 flex-wrap">
                                    {[1,2,3,4,5,6].map((i) => {
                                        const key = `image${i}_url` as keyof Product;
                                        return product[key] ? (
                                            <img key={i} src={product[key] as string} alt={`Image ${i}`} className="w-18 h-18 object-cover rounded border shadow-sm" />
                                        ) : null;
                                    })}
                                    {![1,2,3,4,5,6].some(i => product[`image${i}_url` as keyof Product]) && (
                                        <div className="w-18 h-18 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">no img</div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="font-semibold text-sm">{product.name}</p>
                                    {product.price != null && <p className="text-sm text-muted-foreground">${Number(product.price).toFixed(2)}</p>}
                                    {product.description && <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>}
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                    {product.subscription ? (
                                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">✓ Connected</span>
                                    ) : (
                                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">✗ Not Connected</span>
                                    )}
                                    <div className="flex gap-2">
                                        <a href={`${editUrlBase}/${product.id}/edit`}><Button size="sm" variant="outline">Edit</Button></a>
                                        <DeleteButton url={`${editUrlBase}/${product.id}`} name={product.name} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">ID</TableHead>
                                    <TableHead className="w-44">Owner</TableHead>
                                    <TableHead>My Images</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right w-36">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell className="text-sm">{product.owner_name || `User #${product.user_id}`}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1.5 flex-wrap w-full">
                                                {[1,2,3,4,5,6].map((i) => {
                                                    const key = `image${i}_url` as keyof Product;
                                                    return product[key] ? (
                                                        <img key={i} src={product[key] as string} alt={`Image ${i}`} className="w-16 h-16 object-cover rounded border shadow-sm" />
                                                    ) : null;
                                                })}
                                                {![1,2,3,4,5,6].some(i => product[`image${i}_url` as keyof Product]) && (
                                                    <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground zzz">no img</div>
                                                )}
                                            </div>
                                            
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.price != null ? `$${Number(product.price).toFixed(2)}` : '—'}</TableCell>
                                        <TableCell className="max-w-md truncate text-sm text-muted-foreground">{product.description || '—'}</TableCell>
                                        <TableCell>{product.subscription ? <span className="text-green-600 font-medium">✓ Connected</span> : <span className="text-slate-400">✗ Not Connected</span>}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <a href={`${editUrlBase}/${product.id}/edit`}><Button size="sm" variant="outline">Edit</Button></a>
                                            <DeleteButton url={`${editUrlBase}/${product.id}`} name={product.name} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </>
    );
}
