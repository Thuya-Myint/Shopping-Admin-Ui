import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/category.service";
import { getAllUnit } from "../services/unit.service";
import { IoClose } from "react-icons/io5";

import { createProduct, updateProduct } from "../services/product.service";

const ProductModal = ({ open, onClose, onSuccess, productToEdit }) => {
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);

    const isUpdate = !!productToEdit;

    const [form, setForm] = useState({
        name: "",
        modelNo: "",
        category: "",
        gender: "Unisex",
        discount: 0,
        size: [],
        variants: []
    });

    const [images, setImages] = useState([]);

    // ✅ Load data when editing product
    useEffect(() => {
        if (productToEdit) {
            console.log(" p to e", productToEdit)
            const normalizedSizes = (() => {
                if (!productToEdit.size) return [];

                // If backend returned: ["[{\"price\":\"1000\"}]"]
                if (typeof productToEdit.size[0] === "string") {
                    try {
                        return JSON.parse(productToEdit.size[0]); // correct nested JSON
                    } catch (e) {
                        console.log("Failed to parse size JSON:", e);
                        return [];
                    }
                }

                // If backend returned correct object array
                return productToEdit.size.map((s) => ({
                    price: s.price ?? s.sizeNo ?? "",
                    unit: s.unit ?? ""
                }));
            })();

            // ✅ Normalize VARIANTS
            const normalizedVariants = (() => {
                if (!productToEdit.variants) return [];

                if (typeof productToEdit.variants[0] === "string") {
                    try {
                        return JSON.parse(productToEdit.variants[0]);
                    } catch (e) {
                        console.log("Failed to parse variants JSON:", e);
                        return [];
                    }
                }

                return productToEdit.variants.map((v) => ({
                    color: v.color ?? "",
                    price: v.price ?? ""
                }));
            })();

            setForm({
                name: productToEdit.name,
                modelNo: productToEdit.modelNo,
                category: productToEdit.category,
                gender: productToEdit.gender,
                discount: productToEdit.discount,
                size: normalizedSizes,
                variants: normalizedVariants
            });
        }
    }, [productToEdit]);

    // ✅ Fetch categories + units
    useEffect(() => {
        if (!open) return;

        const fetchData = async () => {
            const c = await getAllCategories();
            const u = await getAllUnit();
            setCategories(c.data || []);
            setUnits(u.data || []);
        };

        fetchData();
    }, [open]);

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Add size
    const handleAddSize = () => {
        setForm({
            ...form,
            size: [...form.size, { price: "", unit: "" }]
        });
    };

    // ✅ Remove size
    const handleRemoveSize = (index) => {
        const updated = [...form.size];
        updated.splice(index, 1);
        setForm({ ...form, size: updated });
    };

    // ✅ Edit size
    const handleSizeChange = (index, field, value) => {
        const updated = [...form.size];
        updated[index][field] = value;
        setForm({ ...form, size: updated });
    };

    // ✅ Add variant
    const handleAddVariant = () => {
        setForm({
            ...form,
            variants: [...form.variants, { color: "", price: "" }]
        });
    };

    // ✅ Remove variant
    const handleRemoveVariant = (index) => {
        const updated = [...form.variants];
        updated.splice(index, 1);
        setForm({ ...form, variants: updated });
    };

    // ✅ Edit variant
    const handleVariantChange = (index, field, value) => {
        const updated = [...form.variants];
        updated[index][field] = value;
        setForm({ ...form, variants: updated });
    };

    const handleImageUpload = (e) => {
        setImages([...images, ...e.target.files]);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const fd = new FormData();
            console.log("form", form)
            Object.entries(form).forEach(([key, val]) => {
                if (typeof val === "object") fd.append(key, JSON.stringify(val));
                else fd.append(key, val);
            });

            images.forEach((img) => fd.append("images", img));

            let response;

            if (isUpdate) {

                response = await updateProduct(fd, productToEdit._id);
                console.log("Update not implemented yet!");
                response = { data: { message: "Update placeholder" } };
            } else {
                response = await createProduct(fd);
            }

            onSuccess(response.data);
            onClose();
        } catch (error) {
            console.log("Submit error:", error);
            alert("Failed");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6 relative">

                {/* Title */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {isUpdate ? "Update Product" : "Create New Product"}
                    </h2>
                    <button onClick={onClose}>
                        <IoClose size={28} className="text-gray-600 hover:text-black" />
                    </button>
                </div>

                {/* FORM GRID */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="font-medium text-sm">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleInput}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium text-sm">Model No</label>
                        <input
                            type="text"
                            name="modelNo"
                            value={form.modelNo}
                            onChange={handleInput}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium text-sm">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleInput}
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="">Select category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-medium text-sm">Gender</label>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleInput}
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-medium text-sm">Discount (%)</label>
                        <input
                            type="number"
                            name="discount"
                            value={form.discount}
                            onChange={handleInput}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium text-sm">Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>
                </div>

                {/* ✅ SIZES */}
                <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Sizes</h3>
                        <button onClick={handleAddSize} className="text-blue-600 font-medium">
                            + Add Size
                        </button>
                    </div>

                    {form.size.map((s, idx) => (
                        <div key={idx} className="grid grid-cols-3 gap-4 mt-3 p-3 border rounded-lg">

                            <input
                                type="number"
                                placeholder="Price"
                                value={s.price}
                                onChange={(e) => handleSizeChange(idx, "price", e.target.value)}
                                className="border p-2 rounded-lg"
                            />

                            <select
                                value={s.unit}
                                onChange={(e) => handleSizeChange(idx, "unit", e.target.value)}
                                className="border p-2 rounded-lg"
                            >
                                <option value="">Unit</option>
                                {units.map((u) => (
                                    <option key={u._id} value={u.name}>{u.name}</option>
                                ))}
                            </select>

                            {/* ✅ delete */}
                            <button
                                onClick={() => handleRemoveSize(idx)}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* ✅ VARIANTS */}
                <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Variants</h3>
                        <button onClick={handleAddVariant} className="text-blue-600 font-medium">
                            + Add Variant
                        </button>
                    </div>

                    {form.variants.map((v, idx) => (
                        <div key={idx} className="grid grid-cols-3 gap-4 mt-3 p-3 border rounded-lg">

                            <input
                                type="text"
                                placeholder="Color"
                                value={v.color}
                                onChange={(e) => handleVariantChange(idx, "color", e.target.value)}
                                className="border p-2 rounded-lg"
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                value={v.price}
                                onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
                                className="border p-2 rounded-lg"
                            />

                            {/* ✅ delete */}
                            <button
                                onClick={() => handleRemoveVariant(idx)}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* SUBMIT */}
                <div className="mt-6 flex justify-end">
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {loading ? "Saving..." : isUpdate ? "Update Product" : "Create Product"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductModal;