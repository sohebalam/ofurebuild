import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { signOut } from "next-auth/react"
import PersonIcon from "@material-ui/icons/Person"
// import Link from "next/link"
import { useSession } from "next-auth/react"
import { Link } from "@material-ui/core"
import { useSelector } from "react-redux"
const MenuButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile
  const { data: session } = useSession()
  // console.log(dbUser)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
    handleClose()
    // router.push("/user/login")
  }
  useEffect(() => {}, [dbUser])
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "white" }}
      >
        <PersonIcon style={{ marginRight: "0.25rem" }} />
        {dbUser?.name || session?.user.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {dbUser && dbUser.role && dbUser.role.includes("instructor") ? (
          <div>
            {/* <Link href="/user/instructor/create">
              <MenuItem onClick={handleClose}>Create Course</MenuItem>
            </Link> */}
          </div>
        ) : (
          dbUser &&
          dbUser.isAllowed === true && (
            <div>
              <Link href="/user/instructor/new">
                <MenuItem onClick={handleClose}>Become instructor</MenuItem>
              </Link>
            </div>
          )
        )}
        {dbUser?.role === "admin" && (
          <div>
            <Link href="/">
              <MenuItem onClick={handleClose}>Rooms</MenuItem>
            </Link>

            <Link href="/">
              <MenuItem onClick={handleClose}>Courses</MenuItem>
            </Link>
            <Link href="/">
              <MenuItem onClick={handleClose}>Users</MenuItem>
            </Link>
          </div>
        )}

        <Link href="/user/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link href={`/user/student/myCourses`}>
          <MenuItem onClick={handleClose}>My Courses</MenuItem>
        </Link>

        <Link>
          <MenuItem onClick={handleSignout}>SignOut</MenuItem>
        </Link>
      </Menu>
    </div>
  )
}

export default MenuButton
