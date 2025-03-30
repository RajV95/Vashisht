// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Loader2, ImagePlus } from "lucide-react";

// const AddItems = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const messOptions = [
//     "Sheila",
//     "Sai"
//   ];

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
    
//     try {
//       // Create FormData for file upload
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('price', data.price);
//       formData.append('messName', data.messName);
//       if (data.image[0]) formData.append('image', data.image[0]);

//       // Replace with your actual API endpoint
//       const response = await fetch('/api/items', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) throw new Error('Failed to add item');

//       toast.success('Item added successfully!');
//       reset();
//       setPreviewImage(null);
//     } catch (error) {
//       toast.error(error.message || 'Failed to add item');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 sm:p-6 max-w-2xl">
//       <Card className="shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-xl sm:text-2xl">Add New Item</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Image Upload (Optional) */}
//             <div className="space-y-2">
//               <Label htmlFor="image">Item Image (Optional)</Label>
//               <div className="flex items-center gap-4">
//                 <label
//                   htmlFor="image"
//                   className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
//                 >
//                   {previewImage ? (
//                     <img 
//                       src={previewImage} 
//                       alt="Preview" 
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   ) : (
//                     <div className="flex flex-col items-center p-2 text-gray-500">
//                       <ImagePlus className="w-6 h-6" />
//                       <span className="text-xs mt-1">Upload</span>
//                     </div>
//                   )}
//                   <input
//                     id="image"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     {...register("image")}
//                     onChange={handleImageChange}
//                   />
//                 </label>
//                 <p className="text-sm text-gray-500">
//                   Recommended size: 500x500px
//                 </p>
//               </div>
//             </div>

//             {/* Item Name */}
//             <div className="space-y-2">
//               <Label htmlFor="name">Item Name *</Label>
//               <Input
//                 id="name"
//                 placeholder="e.g., Chicken Biryani"
//                 {...register("name", { required: "Item name is required" })}
//               />
//               {errors.name && (
//                 <p className="text-sm text-red-500">{errors.name.message}</p>
//               )}
//             </div>

//             {/* Price */}
//             <div className="space-y-2">
//               <Label htmlFor="price">Price (₹) *</Label>
//               <Input
//                 id="price"
//                 type="number"
//                 placeholder="e.g., 120"
//                 {...register("price", { 
//                   required: "Price is required",
//                   min: { value: 1, message: "Price must be at least ₹1" }
//                 })}
//               />
//               {errors.price && (
//                 <p className="text-sm text-red-500">{errors.price.message}</p>
//               )}
//             </div>

//             {/* Mess Selection */}
//             <div className="space-y-2">
//               <Label htmlFor="messName">Mess Name *</Label>
//               <select
//                 id="messName"
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                 {...register("messName", { required: "Please select a mess" })}
//               >
//                 <option value="">Select Mess</option>
//                 {messOptions.map((mess) => (
//                   <option key={mess} value={mess}>
//                     {mess}
//                   </option>
//                 ))}
//               </select>
//               {errors.messName && (
//                 <p className="text-sm text-red-500">{errors.messName.message}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4">
//               <Button 
//                 type="submit" 
//                 className="w-full sm:w-auto bg-[#1E307B] hover:bg-[#16255e]"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Adding...
//                   </>
//                 ) : (
//                   "Add Item"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddItems;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, Loader2 } from "lucide-react";
import axiosInstance from "../../axios.js";

// Schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  messName: z.string().min(1, "Please select a mess"),
  image: z.any().optional(),
});

const messOptions = ["Sheila", "Sai"];

export default function AddItems() {
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // price: 0,
      messName: "",
      image: undefined,
    },
  });

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  // Submit handler
  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("item_name", values.name);
      formData.append("file", values.image); // File upload
      // formData.append("price", values.price);
      // formData.append("messName", values.messName);

      const response = await axiosInstance.post("/api/admin/add-item", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Important for file uploads
      });

      if (response.status !== 200) throw new Error("Failed to add item");

      toast.success("Item added successfully!");
      form.reset();
      setPreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Upload */}
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Item Image (Optional)</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer">
                          <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                            {preview ? (
                              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-center p-2 text-gray-500">
                                <ImagePlus className="mx-auto h-6 w-6" />
                                <span className="text-xs">Upload</span>
                              </div>
                            )}
                          </div>
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <p className="text-sm text-muted-foreground">Recommended: 500×500px</p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Chicken Biryani" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Field */}
              {/* <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Mess Select */}
              <FormField
                control={form.control}
                name="messName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mess Name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a mess" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {messOptions.map((mess) => (
                          <SelectItem key={mess} value={mess}>
                            {mess}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#1E307B]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Item"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
