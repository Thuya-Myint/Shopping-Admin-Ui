import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/product.service";
import ProductModal from "../components/ProductModal";
import { IoAddCircleOutline } from "react-icons/io5";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ holds product being edited
    const [productToEdit, setProductToEdit] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts();
            setProducts(response.data || []);
        } catch (error) {
            console.log("Fetching products error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ✅ open modal for update with pre-filled data
    const openUpdateModal = (product) => {
        setProductToEdit(product);
        setIsOpen(true);
    };

    // ✅ delete handler
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.log("Delete product error:", error);
        }
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All Products</h1>

                {/* ✅ Create product button */}
                <button
                    onClick={() => {
                        setProductToEdit(null);
                        setIsOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <IoAddCircleOutline size={20} />
                    Add Product
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Model No</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Gender</th>
                            <th className="p-3">Discount</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center p-6">
                                    Loading products...
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center p-6 text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3">
                                        {p?.imageUrls?.length > 0 ? (
                                            <img
                                                src={p.imageUrls[0]}
                                                alt={p.name}
                                                className="h-12 w-12 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 bg-gray-200 rounded"></div>
                                        )}
                                    </td>

                                    <td className="p-3 font-medium">{p.name}</td>
                                    <td className="p-3">{p.modelNo}</td>
                                    <td className="p-3">{p.category}</td>

                                    <td className="p-3">
                                        <span className="px-2 py-1 text-sm rounded bg-gray-100">
                                            {p.gender}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {p.discount > 0 ? (
                                            <span className="text-red-600 font-semibold">
                                                {p.discount}%
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">0%</span>
                                        )}
                                    </td>

                                    <td className="p-3 flex gap-3">
                                        <button
                                            onClick={() => openUpdateModal(p)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Product Modal (create + update) */}
            <ProductModal
                open={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setProductToEdit(null);
                }}
                onSuccess={() => fetchProducts()}
                productToEdit={productToEdit}
            />
        </div>
    );
};

export default Product;