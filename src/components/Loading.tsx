import { Backdrop, CircularProgress } from '@mui/material';
import React, { ReactNode } from 'react'
import { useAppSelector } from 'store';

export const Loading = () => {
  const loading = useAppSelector((state) => state.loading.loading)
  return (
    <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
  )
}
