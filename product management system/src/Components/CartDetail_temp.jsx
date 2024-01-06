            <Grid item xs={9} 
              // sx={{ display: 'flex', justifyContent: 'space-between', flexWrap:'wrap'}}
              >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 'auto', height: 50, mt:-2, mb:3 }}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="subtitle1">{`$${item.price.toFixed(2)}`}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 'auto', height: 50, }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} size="small">
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    size="small"
                    value={item.quantity}
                    inputProps={{ min: 1, style: { textAlign: 'center' } }}
                    onChange={(event) => handleUpdateQuantity(item.id, parseInt(event.target.value))}
                    sx={{ width: '40px' }}
                  />
                  <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button variant="text" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </Box>

        
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1">$400.00</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">Tax:</Typography>
          <Typography variant="body1">$49.90</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">Discount:</Typography>
          <Typography variant="body1">-$20.00</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h6">Estimated total:</Typography>
          <Typography variant="h6">$429.90</Typography>
        </Box>