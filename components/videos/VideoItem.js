import React from "react"
import { Box, Grid, Paper, Typography } from "@material-ui/core"
import Image from "next/image"
import Skeleton from "@mui/material/Skeleton"

const VideoItem = ({ video }) => {
  return (
    <Grid item xs={12}>
      <Paper
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "0.25rem",
        }}
      >
        <Box style={{ width: 250, height: 200 }}>
          <Image
            // style={{ marginRight: "20px" }}
            alt="thumbnail"
            src={video.thumbnailUrl}
            height="150px"
            layout="fill"
          />
        </Box>
        <Skeleton variant="rectangular" width={250} height={200} />
        <Typography variant="subtitle1">
          <b>{video.title}</b>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default VideoItem
