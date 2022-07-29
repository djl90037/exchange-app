import React, { useEffect, useState } from 'react'
import './Table.css'
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'

const Table = () => {

  const [posts, setPosts] = useState({ blogs: [] })

  useEffect(() => {
    const fetchPostList = async () => {
      const { data } = await axios(`https://altexchangerateapi.herokuapp.com/latest`)

      setPosts({ blogs: data })
      console.log(data);

    }
    fetchPostList()
  }, [setPosts])

  return (
    <div>
      <h2>Exchange Rates</h2>
    </div>
  )
}

const TableHeadItem = ({ item }) => <th>{item.heading}</th>



export default Table