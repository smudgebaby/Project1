import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function ImagePreview({ imageUrl }) {
  return (
    <Card variant="outlined" fullWidth>
      {imageUrl ? (
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Image preview"
          sx={{
            height: "100%",
            objectFit: 'contain',
            maxHeight:140
          }}
        />
      ) : (
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 140,
          }}
        >
          <Typography variant="subtitle1" color="textSecondary">
            image preview!
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default ImagePreview;
