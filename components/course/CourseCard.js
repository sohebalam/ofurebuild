import { Card, Typography, Chip, Box } from "@material-ui/core"
import Link from "next/link"
import Image from "next/image"
import { currencyFormatter } from "../../utils/currency"

const CourseCard = ({ course, local }) => {
  return (
    <Link
      href={
        local === "myCourses"
          ? `/user/course/${course?.slug}`
          : `/course/${course?.slug}`
      }
    >
      <Card style={{ padding: "1rem", cursor: "pointer" }}>
        <Image
          src={course?.images ? course?.images[0]?.url : "/course.jpg"}
          height={200}
          width={400}
        />
        <Box style={{ marginBottom: "0.25rem" }}>
          <Typography variant="h5">{course?.title} </Typography>
          <Typography variant="body1">{course?.instructor?.name}</Typography>
        </Box>
        {/* <Chip
          label={category}
          color="primary"
          style={{ display: "flex", marginBottom: "0.5rem" }}
        /> */}
        <Chip
          label={
            course?.paid
              ? currencyFormatter({ amount: course?.price, currency: "gbp" })
              : "Free"
          }
          color="primary"
          style={{ display: "flex" }}
        />
      </Card>
    </Link>
  )
}

export default CourseCard
