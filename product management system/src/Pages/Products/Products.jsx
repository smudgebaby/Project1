import {useState} from 'react';
import {
    Button,
    Card, CardMedia, CardContent, CardActions,
    Container, Box,
    Pagination,
    Grid, InputAdornment, InputLabel, MenuItem, Select, styled,
    TextField,
    Typography, useMediaQuery, useTheme,
  } from '@mui/material';

function formatPrice(price) {
return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(price);
}


function Products(){
    const [sort, setSort] = useState("low-high");
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/1.png',

        },
        {
            id: 2,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/2.png',
        },
        {
            id: 3,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/3.png',
        },
        {
            id: 4,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/4.png',

        },
        {
            id: 5,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/5.png',

        },
        {
            id: 6,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/6.png',

        },
        {
            id: 7,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/7.png',

        },
        {
            id: 8,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/8.png',

        },
        {
            id: 9,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/9.png',

        },
        {
            id: 10,
            name: 'Apple Iphone 11, 128G',
            price: 499,
            imageUrl: '/10.png',

        },
      
    ]);
    function handleAddProduct(){
        return;
    }
    
    const handleSortChange = (event) => {
        setSort(event.target.value);
    }
   
    return(
        <>
            <Container maxWidth="xl" sx={{my:5}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb:3 }}>
                    <Typography variant="h3" component="h2" gutterBottom 
                        sx={{ 
                            fontSize: '2rem', 
                            fontWeight: 'bold' 
                        }}>
                        Products
                    </Typography>
                    <Box>
                        {/* <InputLabel id="sort-price-label">Price:</InputLabel> */}
                        <Select
                        labelId="sort-price-label"
                        id="sort-price-select"
                        value={sort}
                        label="Price"
                        onChange={handleSortChange}
                        sx={{ height:40, mr: 2, minWidth: 180 }}
                        >
                        <MenuItem value="last-added">Last Added</MenuItem>
                        <MenuItem value="low-high">Price: low to high</MenuItem>
                        <MenuItem value="high-low">Price: high to low</MenuItem>
                        </Select>

                        <Button variant="contained" color="primary" sx= {{height:40, mt:-0.5}} onClick={handleAddProduct}>
                            Add Product
                        </Button>
                    </Box>
                </Box>
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={12/5} key={product.id}>
                        <Card>
                        <CardMedia
                            component="img"
                            image={product.imageUrl}
                            alt={product.name}
                            sx={{ mt: 1, mr: 1, mb: 1, ml: 1, width:'92%' }}
                            />
                        <CardContent sx={{mt: -2, mb:-2}}>
                        <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="h5" sx={{ 
                            fontWeight: 'bold' 
                        }}>
                            {formatPrice(product.price)}
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Box sx={{display: 'flex', justifyContent: 'space-between',  gap: 1, mb:1}}>
                            <Button variant="contained" sx={{width: '82px', ml:0.5} }>Add</Button>
                            <Button variant="outlined" sx={{width: '82px'}} size="small">Edit</Button>
                        </Box>
                        </CardActions>
                        </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Pagination 
                    count={5}
                    color="primary" 
                    size="large"
                    variant="outlined"
                    shape="rounded"
                    sx={{ width: 'auto' , mt:5}} 
                />
                </Box>    
            </Container>
        </>
    )
}
export default Products;