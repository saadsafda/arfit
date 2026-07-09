import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAdmin } from '../../context/adminContext';
import { adminService, AdminProduct, CreateProductData } from '../../services/admin.service';

const ProductManagement: React.FC = () => {
  const { state, dispatch } = useAdmin();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState<CreateProductData>({
    categoryId: '',
    name: '',
    brand: '',
    price: '',
    currency: 'GBP',
    description: '',
    lensId: '',
    gender: '',
    colors: [],
    sizes: [],
    imageUrls: [],
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Dynamic form state for colors and sizes
  const [newColor, setNewColor] = useState({ color: '', colorHex: '#000000' });
  const [newSize, setNewSize] = useState('');
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  // Helper function to get selected category
  const getSelectedCategory = () => {
    return state.categories.find(cat => cat.id === formData.categoryId);
  };

  // Helper function to check if category is apparel (show sizes)
  const isApparelCategory = () => {
    const category = getSelectedCategory();
    return category?.type === 'apparel';
  };

  // Helper function to check if category is cosmetics (show colors)
  const isCosmeticsCategory = () => {
    const category = getSelectedCategory();
    return category?.type === 'cosmetics';
  };

  // Function to add a new color
  const addColor = () => {
    if (newColor.color.trim()) {
      setFormData({
        ...formData,
        colors: [...(formData.colors || []), { ...newColor }]
      });
      setNewColor({ color: '', colorHex: '#000000' });
    }
  };

  // Function to remove a color
  const removeColor = (index: number) => {
    const updatedColors = formData.colors?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, colors: updatedColors });
  };

  // Function to add a new size
  const addSize = () => {
    if (newSize.trim()) {
      setFormData({
        ...formData,
        sizes: [...(formData.sizes || []), newSize.trim()]
      });
      setNewSize('');
    }
  };

  // Function to remove a size
  const removeSize = (index: number) => {
    const updatedSizes = formData.sizes?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, sizes: updatedSizes });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const products = await adminService.getProducts();
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch products' });
      setAlert({ type: 'error', message: 'Failed to fetch products' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await adminService.getCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      categoryId: '',
      name: '',
      brand: '',
      price: '',
      currency: 'GBP',
      description: '',
      lensId: '',
      gender: '',
      colors: [],
      sizes: [],
      imageUrls: [],
    });
    setNewColor({ color: '', colorHex: '#000000' });
    setNewSize('');
    setOpenDialog(true);
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({
      categoryId: product.category?.id || '',
      name: product.name || '',
      brand: product.brand || '',
      price: product.price || '',
      currency: product.currency || 'GBP',
      description: product.description || '',
      lensId: product.lens_id || '',
      gender: product.gender || '',
      colors: product.colors?.map(c => ({ color: c.color, colorHex: c.color_hex })) || [],
      sizes: product.sizes?.map(s => s.size) || [],
      imageUrls: product.imageUrls?.map(img => img.image_url) || [],
    });
    setOpenDialog(true);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminService.deleteProduct(productId);
        dispatch({ type: 'DELETE_PRODUCT', payload: productId });
        setAlert({ type: 'success', message: 'Product deleted successfully' });
      } catch (error) {
        setAlert({ type: 'error', message: 'Failed to delete product' });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const payload: CreateProductData = {
        ...formData,
        gender: formData.gender ? formData.gender : null,
      };
      if (editingProduct) {
        const updatedProduct = await adminService.updateProduct(editingProduct.id, payload);
        dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
        setAlert({ type: 'success', message: 'Product updated successfully' });
      } else {
        const newProduct = await adminService.createProduct(payload);
        dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
        
        // Upload image if one was selected for new product
        if (selectedImage) {
          try {
            await adminService.uploadProductImage(newProduct.id, selectedImage);
            console.log('Image uploaded successfully');
            setAlert({ type: 'success', message: 'Product created and image uploaded successfully' });
            // Refresh products to get updated data with image
            fetchProducts();
          } catch (imageError) {
            setAlert({ type: 'error', message: 'Product created but failed to upload image' });
          }
        } else {
          setAlert({ type: 'success', message: 'Product created successfully' });
        }
      }
      setOpenDialog(false);
      setEditingProduct(null);
      setSelectedImage(null);
      setImagePreviewUrl(null);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save product' });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData({
      categoryId: '',
      name: '',
      brand: '',
      price: '',
      currency: 'GBP',
      description: '',
      lensId: '',
      gender: '',
      colors: [],
      sizes: [],
      imageUrls: [],
    });
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setNewColor({ color: '', colorHex: '#000000' });
    setNewSize('');
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    
    try {
      setUploadingImage(true);
      
      if (editingProduct) {
        // Upload image for existing product
        await adminService.uploadProductImage(editingProduct.id, selectedImage);
        setAlert({ type: 'success', message: 'Image uploaded successfully' });
        // Refresh products to get updated data
        fetchProducts();
      } else {
        // For new products, we'll store the image temporarily and upload it after product creation
        setAlert({ type: 'success', message: 'Image selected. It will be uploaded when you create the product.' });
      }
      
      setSelectedImage(null);
      setImagePreviewUrl(null);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to upload image' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageDelete = async () => {
    if (!editingProduct) return;
    
    try {
      await adminService.deleteProductImage(editingProduct.id);
      setAlert({ type: 'success', message: 'Image deleted successfully' });
      // Refresh products to get updated data
      fetchProducts();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete image' });
    }
  };

  const formatPrice = (price: string, currency: string) => {
    return `${currency} ${parseFloat(price).toFixed(2)}`;
  };

  const formatGenderLabel = (value?: string | null) => {
    if (!value) return 'Any';
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  if (state.loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h2">
          Product Management
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Button
            variant={viewMode === 'table' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('table')}
            size="small"
          >
            Table View
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('grid')}
            size="small"
          >
            Grid View
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {alert && (
        <Alert
          severity={alert.type}
          onClose={() => setAlert(null)}
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      )}

      {viewMode === 'table' ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Target Gender</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Colors</TableCell>
                <TableCell>Sizes</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {product.name}
                      </Typography>
                      {product.description && (
                        <Typography variant="caption" color="text.secondary">
                          {product.description}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {product.category?.name || 'N/A'}
                  </TableCell>
                  <TableCell>{formatGenderLabel(product.gender)}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {formatPrice(product.price, product.currency)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={0.5} flexWrap="wrap">
                      {product.colors?.map((color) => (
                        <Chip
                          key={color.id}
                          label={color.color}
                          size="small"
                          sx={{ backgroundColor: color.color_hex, color: 'white' }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={0.5} flexWrap="wrap">
                      {product.sizes?.map((size) => (
                        <Chip key={size.id} label={size.size} size="small" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(product)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(product.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={3}>
          {state.products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                 <CardMedia
                   component="img"
                   height="200"
                   image={product.imageUrls?.[0]?.image_url ? `${process.env.REACT_APP_NODE_BACKEND_BASE_URL || ''}/product_images/${product.imageUrls[0].image_url}` : '/placeholder-product.jpg'}
                   alt={product.name}
                 />
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    For: {formatGenderLabel(product.gender)}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {formatPrice(product.price, product.currency)}
                  </Typography>
                  <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                    {product.colors?.slice(0, 3).map((color) => (
                      <Chip
                        key={color.id}
                        label={color.color}
                        size="small"
                        sx={{ backgroundColor: color.color_hex, color: 'white' }}
                      />
                    ))}
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                fullWidth
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  label="Currency"
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.categoryId}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  {state.categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="product-gender-label" shrink>Target Gender</InputLabel>
                <Select
                  labelId="product-gender-label"
                  value={formData.gender || ''}
                  label="Target Gender"
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  displayEmpty
                  notched
                >
                  <MenuItem value="">
                    <em>Any / Not specified</em>
                  </MenuItem>
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
             <Grid item xs={12}>
               <TextField
                 label="Lens ID"
                 value={formData.lensId}
                 onChange={(e) => setFormData({ ...formData, lensId: e.target.value })}
                 fullWidth
               />
             </Grid>

             {/* Dynamic Colors Section - Show for cosmetics categories */}
             {isCosmeticsCategory() && (
               <Grid item xs={12}>
                 <Typography variant="h6" gutterBottom>
                   Product Colors
                 </Typography>
                 
                 {/* Add Color Form */}
                 <Box display="flex" gap={2} mb={2} alignItems="center">
                   <TextField
                     label="Color Name"
                     value={newColor.color}
                     onChange={(e) => setNewColor({ ...newColor, color: e.target.value })}
                     size="small"
                     sx={{ flexGrow: 1 }}
                   />
                   <TextField
                     type="color"
                     value={newColor.colorHex}
                     onChange={(e) => setNewColor({ ...newColor, colorHex: e.target.value })}
                     size="small"
                     sx={{ width: 60 }}
                   />
                   <Button
                     variant="outlined"
                     onClick={addColor}
                     disabled={!newColor.color.trim()}
                     startIcon={<AddIcon />}
                   >
                     Add Color
                   </Button>
                 </Box>

                 {/* Display Added Colors */}
                 {formData.colors && formData.colors.length > 0 && (
                   <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                     {formData.colors.map((color, index) => (
                       <Chip
                         key={index}
                         label={color.color}
                         onDelete={() => removeColor(index)}
                         sx={{ backgroundColor: color.colorHex, color: 'white' }}
                       />
                     ))}
                   </Box>
                 )}
               </Grid>
             )}

             {/* Dynamic Sizes Section - Show for apparel categories */}
             {isApparelCategory() && (
               <Grid item xs={12}>
                 <Typography variant="h6" gutterBottom>
                   Product Sizes
                 </Typography>
                 
                 {/* Add Size Form */}
                 <Box display="flex" gap={2} mb={2} alignItems="center">
                   <TextField
                     label="Size"
                     value={newSize}
                     onChange={(e) => setNewSize(e.target.value)}
                     size="small"
                     sx={{ flexGrow: 1 }}
                     placeholder="e.g., S, M, L, XL"
                   />
                   <Button
                     variant="outlined"
                     onClick={addSize}
                     disabled={!newSize.trim()}
                     startIcon={<AddIcon />}
                   >
                     Add Size
                   </Button>
                 </Box>

                 {/* Display Added Sizes */}
                 {formData.sizes && formData.sizes.length > 0 && (
                   <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                     {formData.sizes.map((size, index) => (
                       <Chip
                         key={index}
                         label={size}
                         onDelete={() => removeSize(index)}
                       />
                     ))}
                   </Box>
                 )}
               </Grid>
             )}
             
             {/* Image Upload Section - Show for both new and existing products */}
             <Grid item xs={12}>
                 <Typography variant="h6" gutterBottom>
                   Product Image
                 </Typography>
                 
                 {/* Current Image Display - Only show if there's an image */}
                 {editingProduct && editingProduct.imageUrls && editingProduct.imageUrls.length > 0 && (
                   <Box mb={3}>
                     <Typography variant="subtitle2" gutterBottom>
                       Current Image:
                     </Typography>
                     <Box 
                       sx={{ 
                         display: 'flex', 
                         justifyContent: 'center',
                         border: '2px dashed #ccc',
                         borderRadius: 2,
                         p: 2,
                         backgroundColor: '#f9f9f9',
                         minHeight: '200px',
                         alignItems: 'center'
                       }}
                     >
                       <img
                         src={`${process.env.REACT_APP_NODE_BACKEND_BASE_URL || ''}/product_images/${editingProduct?.imageUrls?.[0]?.image_url}`}
                         alt={editingProduct?.name || 'Product'}
                         style={{
                           maxWidth: '200px',
                           maxHeight: '200px',
                           objectFit: 'contain',
                           borderRadius: '8px'
                         }}
                       />
                     </Box>
                   </Box>
                 )}
                 
                 {/* Image Upload */}
                 <Box mb={2}>
                   <Typography variant="subtitle2" gutterBottom>
                     {editingProduct ? 'Upload New Image:' : 'Upload Product Image:'}
                   </Typography>
                   <input
                     accept="image/*"
                     style={{ display: 'none' }}
                     id="image-upload"
                     type="file"
                     onChange={handleImageSelect}
                   />
                   <label htmlFor="image-upload">
                     <Button variant="outlined" component="span" startIcon={<AddIcon />}>
                       {editingProduct ? 'Select New Image' : 'Select Image'}
                     </Button>
                   </label>
                 </Box>
                 
                 {/* Image Preview */}
                 {imagePreviewUrl && (
                   <Box mb={2}>
                     <Typography variant="subtitle2" gutterBottom>
                       {editingProduct ? 'New Image Preview:' : 'Image Preview:'}
                     </Typography>
                     <Box 
                       sx={{ 
                         display: 'flex', 
                         justifyContent: 'center',
                         border: '2px dashed #4caf50',
                         borderRadius: 2,
                         p: 2,
                         backgroundColor: '#f1f8e9',
                         minHeight: '150px',
                         alignItems: 'center'
                       }}
                     >
                       <img
                         src={imagePreviewUrl}
                         alt="Preview"
                         style={{
                           maxWidth: '150px',
                           maxHeight: '150px',
                           objectFit: 'contain',
                           borderRadius: '8px'
                         }}
                       />
                     </Box>
                     <Box mt={1} display="flex" gap={2}>
                       {editingProduct ? (
                         <>
                           <Button
                             variant="contained"
                             onClick={handleImageUpload}
                             disabled={uploadingImage}
                             startIcon={uploadingImage ? <CircularProgress size={20} /> : <AddIcon />}
                           >
                             {uploadingImage ? 'Uploading...' : 'Upload Image'}
                           </Button>
                           <Button
                             variant="outlined"
                             onClick={() => {
                               setSelectedImage(null);
                               setImagePreviewUrl(null);
                             }}
                           >
                             Cancel
                           </Button>
                         </>
                       ) : (
                         <Button
                           variant="outlined"
                           onClick={() => {
                             setSelectedImage(null);
                             setImagePreviewUrl(null);
                           }}
                         >
                           Remove Image
                         </Button>
                       )}
                     </Box>
                   </Box>
                 )}
                 
                 {/* Delete Current Image Button - Only for existing products */}
                 {editingProduct && editingProduct.imageUrls && editingProduct.imageUrls.length > 0 && (
                   <Box>
                     <Button
                       variant="outlined"
                       color="error"
                       onClick={handleImageDelete}
                       startIcon={<DeleteIcon />}
                     >
                       Delete Current Image
                     </Button>
                   </Box>
                 )}
               </Grid>
           </Grid>
         </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProduct ? 'Update Product' : 'Create Product'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
