import React from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  makeStyles, useMediaQuery,
  useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Meta from '../../../public/meta.png';

function ProductDetail() {
  const matches = useMediaQuery("(min-width:950px)");

  return (
    <Container sx={{m: 10}}>
      <Typography variant="h5" gutterBottom>
        Product Detail
      </Typography>
      <Card sx={matches ? { display: "flex", alignItems: "center" } : {}}>
        <CardMedia
          component="img"
          image={Meta}
          title="Product Image"
          sx={matches ? {maxWidth: "50%"} : {}}
        />
        <CardContent sx={{display: "flex", flexDirection: "column", gap: 2, m: 5}}>
          <Typography variant="h5" component="h2">
            Meta Quest2 VR headset
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Hundreds of hit games, one-of-a-kind experiences, live events, new ways to stay fit and a growing community
          </Typography>
          <Typography variant="h6">
            $299
            <Chip label="Out of Stock" sx={{m: 1}}/>
          </Typography>
          <Box sx={matches ? {display: "flex", gap: 2} : {display: "flex", justifyContent: "space-evenly"}}>
            <Button variant="contained" color="primary" sx={{width: 1/3}}>
              Add To Cart
            </Button>
            <Button variant="outlined" sx={{width: 1/3}}>
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetail;
