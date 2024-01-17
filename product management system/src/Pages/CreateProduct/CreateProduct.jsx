import {
  Button,
  Card,
  Container,
  Grid, InputAdornment, InputLabel, MenuItem, Select, styled,
  TextField,
  Typography, useMediaQuery, useTheme,
} from '@mui/material';
import {useState} from 'react';
import ImagePreview from '../../Components/ImagePreview.jsx';
import {useLocation, useNavigate} from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function CreateProduct() {
  const location = useLocation();
  const existingProduct = location.state?.product;

  const [productName, setProductName] = useState(existingProduct?.name || '');
  const [productDesc, setProductDesc] = useState(existingProduct?.description || '');
  const [category, setCategory] = useState(existingProduct?.category || '');
  const [price, setPrice] = useState(existingProduct?.price || 0);
  const [quantity, setQuantity] = useState(existingProduct?.quantity || 0);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(existingProduct?.image || '');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'category':
        setCategory(event.target.value);
        break;
      case 'productName':
        setProductName(event.target.value);
        break;
      case 'productDesc':
        setProductDesc(event.target.value);
        break;
      case 'price':
        setPrice(event.target.value);
        break;
      case 'quantity':
        setQuantity(event.target.value);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDesc);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('image', file);

    try {
      let response;
      if (existingProduct) {
        response = await fetch(`http://localhost:3000/product/update/${existingProduct._id}`, {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('http://localhost:3000/product/create', {
          method: 'POST',
          body: formData,
        });
      }
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    navigate('/');
  };

  return (
    <>
      <Container sx={{my:5}}>
        <Typography variant="h5" gutterBottom>
          {existingProduct ? 'Edit Product' : 'Create Product'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Card sx={{ minWidth: 275, p: 5 }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12}>
                <InputLabel id="name-label" sx={{mb: 1}}>Product Name</InputLabel>
                <TextField
                  required
                  labelId="name-label"
                  id="productName"
                  name="productName"
                  value={productName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="description-label" sx={{mb: 1}}>Product Description</InputLabel>
                <TextField
                  required
                  labelId="description-label"
                  id="productDesc"
                  name="productDesc"
                  value={productDesc}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="category-label" sx={{mb: 1}}>Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value={'Electronics'}>Electronics</MenuItem>
                  <MenuItem value={'Computers'}>Computers</MenuItem>
                  <MenuItem value={'Pet Supplies'}>Pet Supplies</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="price-label" sx={{mb: 1}}>Price</InputLabel>
                <TextField
                  required
                  labelId="price-label"
                  id="price"
                  name="price"
                  onChange={handleChange}
                  value={price}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <InputLabel id="quantity-label" sx={{mb: 1}}>In Stock Quantity</InputLabel>
                <TextField
                  required
                  labelId="quantity-label"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <InputLabel id="image-label" sx={{mb: 1}}>Add Image Link</InputLabel>
                <TextField
                  fullWidth
                  placeholder="http://"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button component="label" edge="end">
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                          />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <ImagePreview imageUrl={imagePreviewUrl} />
              </Grid>
              <Grid item xs={12} sm={12} style={{ textAlign: isMobile ? 'center' : 'left' }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Container>
    </>
  );
}

export default CreateProduct;