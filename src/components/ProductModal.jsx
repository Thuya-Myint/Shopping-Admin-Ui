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

    /* ---------------------- LOAD PRODUCT DATA ---------------------- */
    useEffect(() => {
        if (productToEdit) {
            setForm({
                name: productToEdit.name || "",
                modelNo: productToEdit.modelNo || "",
                category: productToEdit.category || "",
                gender: productToEdit.gender || "Unisex",
                discount: productToEdit.discount || 0,
                size: productToEdit.size || [],
                variants: (productToEdit.variants || []).map((v) => ({
                    color: v.color || "#000000",
                    price: v.price || ""
                }))
            });
        }
    }, [productToEdit]);

    /* ---------------------- FETCH CATEGORY/UNIT ---------------------- */
    useEffect(() => {
        if (!open) return;

        (async () => {
            const c = await getAllCategories();
            const u = await getAllUnit();
            setCategories(c.data || []);
            setUnits(u.data || []);
        })();
    }, [open]);

    /* ---------------------- HANDLERS ---------------------- */
    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddSize = () => setForm({ ...form, size: [...form.size, { price: "", unit: "" }] });
    const handleRemoveSize = (idx) => {
        const updated = [...form.size];
        updated.splice(idx, 1);
        setForm({ ...form, size: updated });
    };
    const handleSizeChange = (idx, field, value) => {
        const updated = [...form.size];
        updated[idx][field] = value;
        setForm({ ...form, size: updated });
    };

    const handleAddVariant = () => setForm({ ...form, variants: [...form.variants, { color: "#000000", price: "" }] });
    const handleRemoveVariant = (idx) => {
        const updated = [...form.variants];
        updated.splice(idx, 1);
        setForm({ ...form, variants: updated });
    };
    const handleVariantChange = (idx, field, value) => {
        const updated = [...form.variants];
        if (field === "color") updated[idx][field] = value || "#000000"; // fallback to black
        else updated[idx][field] = value;
        setForm({ ...form, variants: updated });
    };

    const handleImageUpload = (e) => setImages([...images, ...e.target.files]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const fd = new FormData();

            Object.entries(form).forEach(([key, val]) => {
                if (Array.isArray(val)) fd.append(key, JSON.stringify(val));
                else fd.append(key, val);
            });

            images.forEach((img) => fd.append("images", img));

            let response;
            if (isUpdate) response = await updateProduct(fd, productToEdit._id);
            else response = await createProduct(fd);

            onSuccess(response.data);
            onClose();
            setForm({
                name: "",
                modelNo: "",
                category: "",
                gender: "Unisex",
                discount: 0,
                size: [],
                variants: []
            });
            setImages([]);
        } catch (error) {
            console.log("Submit error:", error);
            alert("Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white max-h-[90vh] overflow-auto w-full max-w-3xl rounded-xl shadow-lg p-6 relative">

                {/* HEADER */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-lg font-semibold tracking-tight">
                        {isUpdate ? "Update Product" : "Create Product"}
                    </h2>
                    <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded">
                        <IoClose size={24} className="text-gray-600" />
                    </button>
                </div>

                {/* FORM GRID */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-600">Product Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleInput} className="w-full mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md px-2.5 py-1.5 text-sm" />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-600">Model No</label>
                        <input type="text" name="modelNo" value={form.modelNo} onChange={handleInput} className="w-full mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md px-2.5 py-1.5 text-sm" />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-600">Category</label>
                        <select name="category" value={form.category} onChange={handleInput} className="w-full mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-2.5 py-1.5 text-sm">
                            <option value="">Select</option>
                            {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-600">Gender</label>
                        <select name="gender" value={form.gender} onChange={handleInput} className="w-full mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-2.5 py-1.5 text-sm">
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-600">Discount (%)</label>
                        <input type="number" name="discount" value={form.discount} onChange={handleInput} className="w-full mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-2.5 py-1.5 text-sm" />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-600">Images</label>
                        <input type="file" multiple onChange={handleImageUpload} className="w-full mt-1 border border-gray-300 rounded-md px-2.5 py-1.5 text-sm" />
                    </div>
                </div>

                {/* SIZES */}
                <div className="mt-6">
                    <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-semibold">Sizes</h3>
                        <button onClick={handleAddSize} className="text-blue-600 text-sm hover:underline">+ Add</button>
                    </div>
                    {form.size.map((s, idx) => (
                        <div key={idx} className="grid grid-cols-3 gap-3 p-3 border border-gray-200 rounded-md bg-gray-50 mt-2">
                            <input type="number" placeholder="Price" value={s.price} onChange={(e) => handleSizeChange(idx, "price", e.target.value)} className="border border-gray-300 rounded-md px-2 py-1.5 text-sm" />
                            <select value={s.unit} onChange={(e) => handleSizeChange(idx, "unit", e.target.value)} className="border border-gray-300 rounded-md px-2 py-1.5 text-sm">
                                <option value="">Unit</option>
                                {units.map((u) => <option key={u._id} value={u.name}>{u.name}</option>)}
                            </select>
                            <button onClick={() => handleRemoveSize(idx)} className="bg-red-500 hover:bg-red-600 text-white rounded-md text-sm">Remove</button>
                        </div>
                    ))}
                </div>

                {/* VARIANTS */}
                <div className="mt-6">
                    <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-semibold">Variants</h3>
                        <button onClick={handleAddVariant} className="text-blue-600 text-sm hover:underline">+ Add</button>
                    </div>
                    {form.variants.map((v, idx) => (
                        <div key={idx} className="grid grid-cols-3 gap-3 p-3 border border-gray-200 rounded-md bg-gray-50 mt-2">
                            <div className="flex items-center gap-3">
                                <input type="color" value={v.color} onChange={(e) => handleVariantChange(idx, "color", e.target.value)} className="h-9 w-12 rounded-md cursor-pointer" />
                                <span className="text-xs text-gray-700">{v.color}</span>
                            </div>
                            <input type="number" placeholder="Price" value={v.price} onChange={(e) => handleVariantChange(idx, "price", e.target.value)} className="border border-gray-300 rounded-md px-2 py-1.5 text-sm" />
                            <button onClick={() => handleRemoveVariant(idx)} className="bg-red-500 hover:bg-red-600 text-white rounded-md text-sm">Remove</button>
                        </div>
                    ))}
                </div>

                {/* SUBMIT */}
                <div className="mt-6 flex justify-end">
                    <button disabled={loading} onClick={handleSubmit} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">
                        {loading ? "Saving..." : isUpdate ? "Update Product" : "Create Product"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductModal;