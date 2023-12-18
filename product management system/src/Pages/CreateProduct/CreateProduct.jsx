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
  const [category, setCategory] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("...");
  };

  return (
    <>
      <Container sx={{my:5}}>
        <Typography variant="h5" gutterBottom>
          Create Product
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
                  value={category}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value={'10'}>Ten</MenuItem>
                  <MenuItem value={'20'}>Twenty</MenuItem>
                  <MenuItem value={'30'}>Thirty</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="price-label" sx={{mb: 1}}>Product Description</InputLabel>
                <TextField
                  required
                  labelId="price-label"
                  id="price"
                  name="price"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <InputLabel id="quantity-label" sx={{mb: 1}}>In Stock Qcuantity</InputLabel>
                <TextField
                  required
                  labelId="quantity-label"
                  id="quantity"
                  name="quantity"
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
                <ImagePreview imageUrl="" />
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