import React from "react"
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core"
import Image from "next/image"
import Skeleton from "@mui/material/Skeleton"
import { makeStyles } from "@material-ui/core"
import { Card } from "@mui/material"
import FileDownloadIcon from "@mui/icons-material/FileDownload"

const VideoItem = ({ video }) => {
  const useStyles = makeStyles((theme) => ({
    stretch: { height: "100%", width: "100%" },
    item: { display: "flex", flexDirection: "column", borderRadius: "999px" }, // KEY CHANGES
  }))

  const classes = useStyles()

  if (video.videoId) {
    return (
      <Grid item xs={12}>
        {!video ? (
          <Skeleton variant="rectangular" width={200} height={200} />
        ) : (
          <Card
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "0.25rem",
              height: "13vw",
              width: "20vw",
            }}
            className={classes.stretch}
          >
            {/* <Box style={{ width: 250, height: 200 }}> */}
            <Image
              // style={{ marginRight: "20px" }}
              alt="thumbnail"
              src={video.thumbnailUrl}
              // height="100px"
              layout="fill"
            />
            {/* </Box> */}

            <Typography variant="subtitle1">
              <b>{video.title}</b>
            </Typography>
          </Card>
        )}
      </Grid>
    )
  } else {
    return (
      <Grid container>
        {!video ? (
          <Skeleton variant="rectangular" width={200} height={200} />
        ) : (
          <Card
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "0.25rem",
              height: "13vw",
              width: "20vw",
            }}
            className={classes.stretch}
            // className={classes.cardStyle}
          >
            <Grid container>
              <Grid item xs={7}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {video.title}
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {video.description}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={5}>
                <CardActions>
                  <FileDownloadIcon />
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        )}
      </Grid>
    )
  }
}

export default VideoItem
